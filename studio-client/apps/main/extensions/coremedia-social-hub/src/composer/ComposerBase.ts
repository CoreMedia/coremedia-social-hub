import Config from "@jangaroo/runtime/Config";
import { as, asConfig, bind, is } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import ComposerModel from "../beans/ComposerModel";
import ComposerModelImpl from "../beans/ComposerModelImpl";
import Message from "../beans/Message";
import MessageProperty from "../beans/MessageProperty";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import SocialHubAdapters from "../beans/SocialHubAdapters";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import ChannelContainer from "../channels/ChannelContainer";
import socialHubService from "../socialHubService";
import Composer from "./Composer";
import MessageFieldEditor from "./MessageFieldEditor";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import Ext from "@jangaroo/ext-ts";
import Component from "@jangaroo/ext-ts/Component";
import ComponentManager from "@jangaroo/ext-ts/ComponentManager";
import StringUtil from "@jangaroo/ext-ts/String";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import Window from "@jangaroo/ext-ts/window/Window";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
import trace from "@jangaroo/runtime/trace";
interface ComposerBaseConfig extends Config<Window>, Partial<Pick<ComposerBase,
  "adapter" |
  "channelContainer" |
  "bindTo"
>> {
}



class ComposerBase extends Window {
  declare Config: ComposerBaseConfig;
  static readonly COMPOSER_WINDOW_ID:string = "composerWindow";
  #scheduleDateExpression:ValueExpression = null;

  adapter:SocialHubAdapter = null;

  channelContainer:ChannelContainer = null;

  bindTo:ValueExpression = null;

  #editors:any = null;
  #errorMessagesExpression:ValueExpression = null;

  constructor(config:Config<ComposerBase> = null) {
    config.id = ComposerBase.COMPOSER_WINDOW_ID + config.adapter.getAdapterId();
    super(config);
  }

  static isOpened(adapter:SocialHubAdapter):boolean {
    var cmp =as( Ext.getCmp(ComposerBase.COMPOSER_WINDOW_ID + adapter.getAdapterId()),  ComposerBase);
    return (cmp && cmp.isVisible());
  }

  override close():void {
    this.closeComposer();
    super.close();
  }

  static scrollIntoView():void {
    var adapters:SocialHubAdapters = socialHubService.getAdaptersExpression().getValue();
    if (adapters) {
      for(var adapter of adapters.getAdapters() as SocialHubAdapter[]) {
        var cmp =as( Ext.getCmp(ComposerBase.COMPOSER_WINDOW_ID + adapter.getAdapterId()),  ComposerBase);
        if (cmp && cmp.isVisible()) {
          cmp.#scrollIntoView();
        }
      }
    }
  }

  /**
   * Should be necessary, but hide and bringToFront don't work without errors from overrides
   */
  static closeAll():void {
    var adapters:SocialHubAdapters = socialHubService.getAdaptersExpression().getValue();
    if (adapters) {
      for(var adapter of adapters.getAdapters() as SocialHubAdapter[]) {
        var cmp =as( Ext.getCmp(ComposerBase.COMPOSER_WINDOW_ID + adapter.getAdapterId()),  ComposerBase);
        if (cmp && cmp.isVisible()) {
          cmp.channelContainer.setComposerButtonState(false);
          cmp.destroy();
        }
      }
    }
  }

  protected override afterRender():void {
    super.afterRender();
    this.getScheduledDateExpression().addChangeListener(bind(this,this.#scheduleDateChanged));

    var container =as( this.queryById(Composer.EDITOR_PANEL),  Container);
    var properties = this.adapter.getMessageProperties();
    var props = properties.concat([]).reverse();

    this.#editors = {};

    for(var property of props as MessageProperty[]) {
      var propertyType = property.getPropertyType();
      var config:Record<string,any> = {};

      var xType = "com.coremedia.blueprint.social.studio.config.editor." + propertyType.toLowerCase();
      config.xtype = xType;
      config.adapter = this.adapter;
      config.property = property;
      config.bindTo = this.bindTo.extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(property.getName());

      var editor = this.#createEditor(config);
      container.insert(0, editor);

      //store editor instances for validation
      this.#editors[property.getName()] = editor;
    }
  }

  #scrollIntoView():void {
    var x:number = this.channelContainer.getX() + (this.channelContainer.getWidth() / 2) - (450 / 2); //100px offset from left favourites toolbar?
    var y:number = this.channelContainer.getPosition()[1] + 14;
    this.setPosition(x, y);
  }

  #createEditor(config:any):Component {
    try {
      return ComponentManager.create(config);
    } catch(e){if(is (e,Error)) {
      trace("[ERROR]", 'Failed to create composer component "' + config.xtype + '" ' + e);
    }else throw e;}
    return null;
  }


  protected getScheduledDateExpression():ValueExpression {
    if (!this.#scheduleDateExpression) {
      this.#scheduleDateExpression = this.bindTo.extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE);
    }
    return this.#scheduleDateExpression;
  }

  protected finishComposing():void {
    var msgs = this.#validateEditors();
    this.getErrorMessagesExpression().setValue(msgs.reverse());
    if (msgs.length === 0) {
      this.#sendMessage();
    }
  }

  protected getErrorMessagesExpression():ValueExpression {
    if (!this.#errorMessagesExpression) {
      this.#errorMessagesExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.#errorMessagesExpression;
  }

  #validateEditors():Array<any> {
    var result = [];
    for (var key in this.#editors) {
      var property = this.#getProperty(key);
      if (!property.isRequired()) {
        continue;
      }

      var editor:MessageFieldEditor = this.#editors[key];
      var msg = editor.getErrorMessage();
      if (msg && StringUtil.trim(msg).length > 0) {
        result.push(msg);
      }
    }
    return result;
  }

  #getProperty(name:string):MessageProperty {
    var properties = this.adapter.getMessageProperties();
    for(var property of properties as MessageProperty[]) {
      if (property.getName() === name) {
        return property;
      }
    }
    return null;
  }

  #sendMessage():void {
    var composerModel:ComposerModel = this.bindTo.getValue();
    var a = this.adapter;

    //check if we should wait for the elastic worker or not
    var publicationDate = composerModel.getPublicationDate();
    var waitForJob:boolean = publicationDate === null || !this.adapter.isSchedulingSupported();

    //publication date messages don't need a toast
    var network = SocialHub_properties[this.adapter.getType().toLowerCase() + "_title"];
    if (waitForJob) {
      var title = SocialHub_properties.compose_job_notification_start_title;
      title = StringUtil.format(title, network);
      var msg = SocialHub_properties.compose_job_notification_start;
      var toast = StringUtil.format(msg, network);
      socialHubService.showToast(title, toast);
    }

    var c = this.channelContainer;
    var apt = this.adapter;
    composerModel.send(waitForJob, (message:Message):void => {
      this.close();
      if (c.rendered && !waitForJob) {
        c.reload(true);
      }
    }, (error:any):void => {
      if (waitForJob) {
        ComposerModelImpl.showResultToast(apt, error);
      }

      if (c.rendered) {
        c.reload(true);
      }
    });

    //finally, enabled the composer button again
    this.channelContainer.setComposerButtonState(false);
  }

  closeComposer():void {
    var composerModel:ComposerModel = this.bindTo.getValue();
    composerModel.reset();
    this.channelContainer.setComposerButtonState(false);
    super.close();
  }

  protected getComposerTitle(ch:SocialHubAdapter):string {
    var title = SocialHub_properties.composer_title;
    return StringUtil.format(title, ch.getDisplayName());
  }

  //-------------------- Helper ----------------------------------------------------------------------------------------

  #scheduleDateChanged(ve:ValueExpression):void {
    var btn =as( this.queryById("postBtn"),  Button);

    var value:Date = ve.getValue();
    if (value) {
      btn.setText(SocialHub_properties.schedule_button_text);
    }
    else {
      btn.setText(SocialHub_properties.post_button_text);
    }
  }

  protected override onDestroy():void {
    this.channelContainer.onComposerClose();
    this.getScheduledDateExpression().removeChangeListener(bind(this,this.#scheduleDateChanged));
    super.onDestroy();
  }
}
export default ComposerBase;
