import Config from "@jangaroo/runtime/Config";
import { as, bind, mixin } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import MessageProperty from "../beans/MessageProperty";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import MessageFieldEditor from "./MessageFieldEditor";
import ExternalLinkDialog from "./externallink/ExternalLinkDialog";
import InternalLinkDialog from "./internallink/InternalLinkDialog";
import RichTextPlainTextTransformer
  from "@coremedia/studio-client.cap-base-models/content/RichTextPlainTextTransformer";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import RichTextArea from "@coremedia/studio-client.main.ckeditor4-components/RichTextArea";
import ValidationState from "@coremedia/studio-client.ext.ui-components/mixins/ValidationState";
import ValidationStateMixin from "@coremedia/studio-client.ext.ui-components/mixins/ValidationStateMixin";
import Ext from "@jangaroo/ext-ts";
import StringUtil from "@jangaroo/ext-ts/String";
import ZIndexManager from "@jangaroo/ext-ts/ZIndexManager";
import Panel from "@jangaroo/ext-ts/panel/Panel";

interface MessageTextareaEditorBaseConfig extends Config<Panel>, Partial<Pick<MessageTextareaEditorBase,
  "bindTo" |
  "property" |
  "adapter"
>> {
}



class MessageTextareaEditorBase extends Panel implements MessageFieldEditor {
  declare Config: MessageTextareaEditorBaseConfig;

  bindTo:ValueExpression = null;

  property:MessageProperty = null;

  adapter:SocialHubAdapter = null;

  #ckEditorValueExpression:ValueExpression = null;
  #richTextWindowGroup:ZIndexManager = null;

  #externalLinkDialog:ExternalLinkDialog = null;
  #internalLinkDialog:InternalLinkDialog = null;

  constructor(config:Config<MessageTextareaEditorBase> = null) {
    super(config);
    if(this.property.isRequired()) {
      this.bindTo.addChangeListener(bind(this,this.#valueChanged));
    }
  }

  protected override afterRender():void {
    super.afterRender();
    var ckEditor = this.getRichtextEditor().getCKEditor();
    ckEditor.on("instanceReady", ():void => {
      ckEditor.focus();
      ckEditor.focusManager.focus();
      this.getCKEditorValueExpression().setValue(ckEditor);

    });
  }

  getRichTextWindowGroup():ZIndexManager {
    if (!this.#richTextWindowGroup) {
      this.#richTextWindowGroup = new ZIndexManager();
      this.#richTextWindowGroup["setBase"](ZIndexManager.getInstance()["zseed"] - 10000);
    }
    return this.#richTextWindowGroup;
  }

  getCKEditorValueExpression():ValueExpression {
    if (!this.#ckEditorValueExpression) {
      this.#ckEditorValueExpression = ValueExpressionFactory.createFromValue();
    }
    return this.#ckEditorValueExpression;
  }

  #valueChanged(ve:ValueExpression):void {
    var editor:any = this.getRichtextEditor();
    var statefulEditor =as( editor,  ValidationStateMixin);
    if (!ve.getValue() || StringUtil.trim(ve.getValue()).length === 0) {
      statefulEditor.validationState = ValidationState.ERROR;
    }
    else {
      statefulEditor.validationState = undefined;
    }
  }

  protected openExternalLinkDialog():void {
    this.#externalLinkDialog = Ext.create(ExternalLinkDialog, {
      messageEditor: this
    });
    this.#externalLinkDialog.show();
  }

  protected openInternalLinkDialog():void {
    if(this.#internalLinkDialog && this.#internalLinkDialog.isVisible()) {
      this.#internalLinkDialog.destroy();
    }

    const config = {
      messageEditor: this,
      renderToParent: this,
      x: this.getX() + 24,
      y: this.getY() + 48
    };
    this.#internalLinkDialog = Ext.create(InternalLinkDialog, config);
    this.#internalLinkDialog.show();
  }


  getRichtextEditor():RichTextArea {
    return as( this.queryById("richtextEditor"),  RichTextArea);
  }

  getErrorMessage():string {
    var value:string = this.bindTo.getValue();
    if (!value && this.property.isRequired()) {
      var msg = SocialHub_properties.messsage_property_error_empty_text;
      var message = StringUtil.format(msg, this.property.getDisplayName());
      return message;
    }

    var plain = RichTextPlainTextTransformer.convertToPlainText(value);
    plain = StringUtil.trim(plain);
    if(plain.length > this.property.getMaxLength() ) {
      var lengthMsg = SocialHub_properties.messsage_property_error_length_text;
      var lengthMessage = StringUtil.format(lengthMsg, this.property.getDisplayName(), this.property.getMaxLength());
      return lengthMessage;
    }

    return null;
  }

  protected override onDestroy():void {
    if(this.#externalLinkDialog !== null) {
      this.#externalLinkDialog.destroy();
    }

    if(this.#internalLinkDialog !== null) {
      this.#internalLinkDialog.destroy();
    }

    super.onDestroy();
    this.bindTo.removeChangeListener(bind(this,this.#valueChanged));
  }
}
mixin(MessageTextareaEditorBase, MessageFieldEditor);

export default MessageTextareaEditorBase;
