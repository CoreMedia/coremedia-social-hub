import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import Container from "@jangaroo/ext-ts/container/Container";
import Config from "@jangaroo/runtime/Config";
import SocialHub_properties from "../SocialHub_properties";
import MessageContainerDescriptor from "../beans/MessageContainerDescriptor";

interface MessageDisplayFieldBaseConfig extends Config<Container>, Partial<Pick<MessageDisplayFieldBase,
  "bindTo" |
  "messageContainerDescriptor"
>> {
}

class MessageDisplayFieldBase extends Container {
  declare Config: MessageDisplayFieldBaseConfig;

  bindTo: ValueExpression = null;

  messageContainerDescriptor: MessageContainerDescriptor = null;

  constructor(config: Config<MessageDisplayFieldBase> = null) {
    super(config);
  }

  protected localizeFieldName(name: string): string {
    const label = SocialHub_properties["message_property_" + name];
    if (label) {
      return label;
    }

    return MessageDisplayFieldBase.camelizeWithWhitespace(name);
  }

  static camelizeWithWhitespace(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter: any, index: any): string =>
      letter.toUpperCase(),
    ).replace(/\s+/g, " ");
  }
}

export default MessageDisplayFieldBase;
