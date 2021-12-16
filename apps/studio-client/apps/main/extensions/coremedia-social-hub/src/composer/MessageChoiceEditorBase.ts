import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValidationState from "@coremedia/studio-client.ext.ui-components/mixins/ValidationState";
import ValidationStateMixin from "@coremedia/studio-client.ext.ui-components/mixins/ValidationStateMixin";
import StringUtil from "@jangaroo/ext-ts/String";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import { as, bind, mixin } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import SocialHub_properties from "../SocialHub_properties";
import MessageProperty from "../beans/MessageProperty";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import MessageFieldEditor from "./MessageFieldEditor";

interface MessageChoiceEditorBaseConfig extends Config<Panel>, Partial<Pick<MessageChoiceEditorBase,
  "bindTo" |
  "property" |
  "adapter"
>> {
}

class MessageChoiceEditorBase extends Panel implements MessageFieldEditor {
  declare Config: MessageChoiceEditorBaseConfig;

  bindTo: ValueExpression = null;

  property: MessageProperty = null;

  adapter: SocialHubAdapter = null;

  constructor(config: Config<MessageChoiceEditorBase> = null) {
    super(config);
    if (this.property.isRequired()) {
      this.bindTo.addChangeListener(bind(this, this.#valueChanged));
    }
  }

  protected override afterRender(): void {
    super.afterRender();
    if (this.property.getDefaultOption()) {
      this.bindTo.setValue(this.property.getDefaultOption());
    }
  }

  #valueChanged(ve: ValueExpression): void {
    const editor: any = this.queryById(this.property.getName());
    const statefulEditor = as(editor, ValidationStateMixin);
    if (!ve.getValue() || StringUtil.trim(ve.getValue()).length === 0) {
      statefulEditor.validationState = ValidationState.ERROR;
    } else {
      statefulEditor.validationState = undefined;
    }
  }

  static getStore(property: MessageProperty): Array<any> {
    const localStore = [];

    for (const prop of property.getOptions() as string[]) {
      const key = prop;
      const bundleKey = "message_property_" + property.getName().toLowerCase() + "_" + key;
      let value = SocialHub_properties[bundleKey];
      if (!value) {
        value = key;
      }
      localStore.push([key, value]);
    }
    return localStore;
  }

  getErrorMessage(): string {
    if (!this.bindTo.getValue()) {
      const msg = SocialHub_properties.messsage_property_error_noValue_text;
      const message = StringUtil.format(msg, this.property.getDisplayName());
      return message;
    }
    return null;
  }

}
mixin(MessageChoiceEditorBase, MessageFieldEditor);

export default MessageChoiceEditorBase;
