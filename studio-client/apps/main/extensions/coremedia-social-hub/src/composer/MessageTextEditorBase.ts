import Config from "@jangaroo/runtime/Config";
import { as, asConfig, bind, mixin } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import MessageProperty from "../beans/MessageProperty";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import MessageFieldEditor from "./MessageFieldEditor";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValidationState from "@coremedia/studio-client.ext.ui-components/mixins/ValidationState";
import ValidationStateMixin from "@coremedia/studio-client.ext.ui-components/mixins/ValidationStateMixin";
import StringUtil from "@jangaroo/ext-ts/String";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface MessageTextEditorBaseConfig extends Config<Panel>, Partial<Pick<MessageTextEditorBase,
  "bindTo" |
  "property" |
  "adapter"
>> {
}



class MessageTextEditorBase extends Panel implements MessageFieldEditor {
  declare Config: MessageTextEditorBaseConfig;

  bindTo:ValueExpression = null;

  property:MessageProperty = null;

  adapter:SocialHubAdapter = null;

  constructor(config:Config<MessageTextEditorBase> = null) {
    super(config);
    if(this.property.isRequired()) {
      this.bindTo.addChangeListener(bind(this,this.#valueChanged));
    }
  }

  #valueChanged(ve:ValueExpression):void {
    var editor:any = this.queryById(this.property.getName());
    var statefulEditor =as( editor,  ValidationStateMixin);
    if (!ve.getValue() || StringUtil.trim(ve.getValue()).length === 0) {
      statefulEditor.validationState = ValidationState.ERROR;
    }
    else {
      statefulEditor.validationState = undefined;
    }
  }

  getErrorMessage():string {
    var value:string = this.bindTo.getValue();
    if ((!value || value.length === 0) && this.property.isRequired()) {
      var msg = SocialHub_properties.messsage_property_error_empty_text;
      var message = StringUtil.format(msg, this.property.getDisplayName());
      return message;
    }

    if(value && value.length > this.property.getMaxLength() ) {
      var lengthMsg = SocialHub_properties.messsage_property_error_length_text;
      var lengthMessage = StringUtil.format(lengthMsg, this.property.getDisplayName(), this.property.getMaxLength());
      return lengthMessage;
    }
    return null;
  }

  protected override onDestroy():void {
    super.onDestroy();
    this.bindTo.removeChangeListener(bind(this,this.#valueChanged));
  }
}
mixin(MessageTextEditorBase, MessageFieldEditor);

export default MessageTextEditorBase;
