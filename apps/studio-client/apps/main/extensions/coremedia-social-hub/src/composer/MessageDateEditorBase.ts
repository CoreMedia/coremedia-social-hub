import Config from "@jangaroo/runtime/Config";
import { as, asConfig, mixin } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import MessageProperty from "../beans/MessageProperty";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import MessageFieldEditor from "./MessageFieldEditor";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValidationState from "@coremedia/studio-client.ext.ui-components/mixins/ValidationState";
import ValidationStateMixin from "@coremedia/studio-client.ext.ui-components/mixins/ValidationStateMixin";
import DateTimePropertyField from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/DateTimePropertyField";
import StringUtil from "@jangaroo/ext-ts/String";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface MessageDateEditorBaseConfig extends Config<Panel>, Partial<Pick<MessageDateEditorBase,
  "bindTo" |
  "property" |
  "adapter"
>> {
}



class MessageDateEditorBase extends Panel implements MessageFieldEditor {
  declare Config: MessageDateEditorBaseConfig;

  bindTo:ValueExpression = null;

  property:MessageProperty = null;

  adapter:SocialHubAdapter = null;

  constructor(config:Config<MessageDateEditorBase> = null) {
    super(config);
    if(this.property.getDefaultOption()) {
      this.bindTo.setValue(this.property.getDefaultOption());
    }
  }

  protected override afterRender():void {
    super.afterRender();

    var dateTime =as( this.queryById("dateTimePropertyField"),  DateTimePropertyField);
    asConfig(dateTime).fieldLabel = this.property.getDisplayName();
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
    if (!this.bindTo.getValue()) {
      var msg = SocialHub_properties.messsage_property_error_empty_text;
      var message = StringUtil.format(msg, this.property.getDisplayName());
      return message;
    }
    return null;
  }

}
mixin(MessageDateEditorBase, MessageFieldEditor);

export default MessageDateEditorBase;
