import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import RichTextArea from "@coremedia/studio-client.main.ckeditor4-components/RichTextArea";
import Config from "@jangaroo/runtime/Config";

interface MessageRichtextAreaBaseConfig extends Config<RichTextArea>, Partial<Pick<MessageRichtextAreaBase,
  "bindTo"
>> {
}

class MessageRichtextAreaBase extends RichTextArea {
  declare Config: MessageRichtextAreaBaseConfig;

  bindTo: ValueExpression = null;

  constructor(config: Config<MessageRichtextAreaBase> = null) {
    super(config);
  }
}

export default MessageRichtextAreaBase;
