import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import StringUtil from "@jangaroo/ext-ts/String";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import { mixin } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import SocialHub_properties from "../SocialHub_properties";
import MessageProperty from "../beans/MessageProperty";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import MessageChoiceEditorBase from "./MessageChoiceEditorBase";
import MessageFieldEditor from "./MessageFieldEditor";

interface MessageLinkEditorBaseConfig extends Config<Panel>, Partial<Pick<MessageLinkEditorBase,
  "bindTo" |
  "property" |
  "adapter"
>> {
}

class MessageLinkEditorBase extends Panel implements MessageFieldEditor {
  declare Config: MessageLinkEditorBaseConfig;

  bindTo: ValueExpression = null;

  property: MessageProperty = null;

  adapter: SocialHubAdapter = null;

  constructor(config: Config<MessageChoiceEditorBase> = null) {
    super(config);
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
mixin(MessageLinkEditorBase, MessageFieldEditor);

export default MessageLinkEditorBase;
