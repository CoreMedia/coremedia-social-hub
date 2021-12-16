import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import Ext from "@jangaroo/ext-ts";
import Component from "@jangaroo/ext-ts/Component";
import ComponentManager from "@jangaroo/ext-ts/ComponentManager";
import StringUtil from "@jangaroo/ext-ts/String";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import Window from "@jangaroo/ext-ts/window/Window";
import { as, asConfig, bind, is } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
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
import trace from "@jangaroo/runtime/trace";

interface ComposerBaseConfig extends Config<Window>, Partial<Pick<ComposerBase,
  "adapter" |
  "channelContainer" |
  "bindTo"
>> {
}

class ComposerBase extends Window {
  declare Config: ComposerBaseConfig;

  static readonly COMPOSER_WINDOW_ID: string = "composerWindow";

  #scheduleDateExpression: ValueExpression = null;

  adapter: SocialHubAdapter = null;

  channelContainer: ChannelContainer = null;

  bindTo: ValueExpression = null;

  #editors: any = null;

  #errorMessagesExpression: ValueExpression = null;

  constructor(config: Config<ComposerBase> = null) {
    config.id = ComposerBase.COMPOSER_WINDOW_ID + config.adapter.getAdapterId();
    super(config);
  }

  static isOpened(adapter: SocialHubAdapter): boolean {
    const cmp = as(Ext.getCmp(ComposerBase.COMPOSER_WINDOW_ID + adapter.getAdapterId()), ComposerBase);
    return (cmp && cmp.isVisible());
  }

  override close(): void {
    this.closeComposer();
    super.close();
  }

  static scrollIntoView(): void {
    const adapters: SocialHubAdapters = socialHubService.getAdaptersExpression().getValue();
    if (adapters) {
      for (const adapter of adapters.getAdapters() as SocialHubAdapter[]) {
        const cmp = as(Ext.getCmp(ComposerBase.COMPOSER_WINDOW_ID + adapter.getAdapterId()), ComposerBase);
        if (cmp && cmp.isVisible()) {
          cmp.#scrollIntoView();
        }
      }
    }
  }

  /**
   * Should be necessary, but hide and bringToFront don't work without errors from overrides
   */
  static closeAll(): void {
    const adapters: SocialHubAdapters = socialHubService.getAdaptersExpression().getValue();
    if (adapters) {
      for (const adapter of adapters.getAdapters() as SocialHubAdapter[]) {
        const cmp = as(Ext.getCmp(ComposerBase.COMPOSER_WINDOW_ID + adapter.getAdapterId()), ComposerBase);
        if (cmp && cmp.isVisible()) {
          cmp.channelContainer.setComposerButtonState(false);
          cmp.destroy();
        }
      }
    }
  }

  protected override afterRender(): void {
    super.afterRender();
    this.getScheduledDateExpression().addChangeListener(bind(this, this.#scheduleDateChanged));

    const container = as(this.queryById(Composer.EDITOR_PANEL), Container);
    const properties = this.adapter.getMessageProperties();
    const props = properties.concat([]).reverse();

    this.#editors = {};

    for (const property of props as MessageProperty[]) {
      const propertyType = property.getPropertyType();
      const config: Record<string, any> = {};

      const xType = "com.coremedia.blueprint.social.studio.config.editor." + propertyType.toLowerCase();
      config.xtype = xType;
      config.adapter = this.adapter;
      config.property = property;
      config.bindTo = this.bindTo.extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(property.getName());

      const editor = this.#createEditor(config);
      container.insert(0, editor);

      //store editor instances for validation
      this.#editors[property.getName()] = editor;
    }
  }

  #scrollIntoView(): void {
    const x: number = this.channelContainer.getX() + (this.channelContainer.getWidth() / 2) - (450 / 2); //100px offset from left favourites toolbar?
    const y: number = this.channelContainer.getPosition()[1] + 14;
    this.setPosition(x, y);
  }

  #createEditor(config: any): Component {
    try {
      return ComponentManager.create(config);
    } catch (e) {
      if (is(e, Error)) {
        trace("[ERROR]", "Failed to create composer component \"" + config.xtype + "\" " + e);
      } else throw e;
    }
    return null;
  }

  protected getScheduledDateExpression(): ValueExpression {
    if (!this.#scheduleDateExpression) {
      this.#scheduleDateExpression = this.bindTo.extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE);
    }
    return this.#scheduleDateExpression;
  }

  protected finishComposing(): void {
    const msgs = this.#validateEditors();
    this.getErrorMessagesExpression().setValue(msgs.reverse());
    if (msgs.length === 0) {
      this.#sendMessage();
    }
  }

  protected getErrorMessagesExpression(): ValueExpression {
    if (!this.#errorMessagesExpression) {
      this.#errorMessagesExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.#errorMessagesExpression;
  }

  #validateEditors(): Array<any> {
    const result = [];
    for (const key in this.#editors) {
      const property = this.#getProperty(key);
      if (!property.isRequired()) {
        continue;
      }

      const editor: MessageFieldEditor = this.#editors[key];
      const msg = editor.getErrorMessage();
      if (msg && StringUtil.trim(msg).length > 0) {
        result.push(msg);
      }
    }
    return result;
  }

  #getProperty(name: string): MessageProperty {
    const properties = this.adapter.getMessageProperties();
    for (const property of properties as MessageProperty[]) {
      if (property.getName() === name) {
        return property;
      }
    }
    return null;
  }

  #sendMessage(): void {
    const composerModel: ComposerModel = this.bindTo.getValue();
    const a = this.adapter;

    //check if we should wait for the elastic worker or not
    const publicationDate = composerModel.getPublicationDate();
    const waitForJob: boolean = publicationDate === null || !this.adapter.isSchedulingSupported();

    //publication date messages don't need a toast
    const network = SocialHub_properties[this.adapter.getType().toLowerCase() + "_title"];
    if (waitForJob) {
      let title = SocialHub_properties.compose_job_notification_start_title;
      title = StringUtil.format(title, network);
      const msg = SocialHub_properties.compose_job_notification_start;
      const toast = StringUtil.format(msg, network);
      socialHubService.showToast(title, toast);
    }

    const c = this.channelContainer;
    const apt = this.adapter;
    composerModel.send(waitForJob, (message: Message): void => {
      this.close();
      if (c.rendered && !waitForJob) {
        c.reload(true);
      }
    }, (error: any): void => {
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

  closeComposer(): void {
    const composerModel: ComposerModel = this.bindTo.getValue();
    composerModel.reset();
    this.channelContainer.setComposerButtonState(false);
    super.close();
  }

  protected getComposerTitle(ch: SocialHubAdapter): string {
    const title = SocialHub_properties.composer_title;
    return StringUtil.format(title, ch.getDisplayName());
  }

  //-------------------- Helper ----------------------------------------------------------------------------------------

  #scheduleDateChanged(ve: ValueExpression): void {
    const btn = as(this.queryById("postBtn"), Button);

    const value: Date = ve.getValue();
    if (value) {
      btn.setText(SocialHub_properties.schedule_button_text);
    } else {
      btn.setText(SocialHub_properties.post_button_text);
    }
  }

  protected override onDestroy(): void {
    this.channelContainer.onComposerClose();
    this.getScheduledDateExpression().removeChangeListener(bind(this, this.#scheduleDateChanged));
    super.onDestroy();
  }
}

export default ComposerBase;
