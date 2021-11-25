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
interface MessageChoiceEditorBaseConfig extends Config<Panel>, Partial<Pick<MessageChoiceEditorBase,
  "bindTo" |
  "property" |
  "adapter"
>> {
}



class MessageChoiceEditorBase extends Panel implements MessageFieldEditor {
  declare Config: MessageChoiceEditorBaseConfig;

  bindTo:ValueExpression = null;

  property:MessageProperty = null;

  adapter:SocialHubAdapter = null;

  constructor(config:Config<MessageChoiceEditorBase> = null) {
    super(config);
    if(this.property.isRequired()) {
      this.bindTo.addChangeListener(bind(this,this.#valueChanged));
    }
  }

  protected override afterRender():void {
    super.afterRender();
    if(this.property.getDefaultOption()) {
      this.bindTo.setValue(this.property.getDefaultOption());
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

  static getStore(property:MessageProperty):Array<any> {
    var localStore = [];

    for(var prop of property.getOptions() as string[]) {
      var key = prop;
      var bundleKey = "message_property_" + property.getName().toLowerCase() + "_" + key;
      var value = SocialHub_properties[bundleKey];
      if(!value) {
        value = key;
      }
      localStore.push([key, value]);
    }
    return localStore;
  }

  getErrorMessage():string {
    if(!this.bindTo.getValue()) {
      var msg = SocialHub_properties.messsage_property_error_noValue_text;
      var message = StringUtil.format(msg, this.property.getDisplayName());
      return message;
    }
    return null;
  }

}
mixin(MessageChoiceEditorBase, MessageFieldEditor);

export default MessageChoiceEditorBase;
