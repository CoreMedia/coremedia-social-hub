import Config from "@jangaroo/runtime/Config";
import { asConfig } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import MessageContainerDescriptor from "../beans/MessageContainerDescriptor";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import Container from "@jangaroo/ext-ts/container/Container";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface MessageDisplayFieldBaseConfig extends Config<Container>, Partial<Pick<MessageDisplayFieldBase,
  "bindTo" |
  "messageContainerDescriptor"
>> {
}



class MessageDisplayFieldBase extends Container {
  declare Config: MessageDisplayFieldBaseConfig;

  bindTo:ValueExpression = null;

  messageContainerDescriptor:MessageContainerDescriptor = null;

  constructor(config:Config<MessageDisplayFieldBase> = null) {
    super(config);
  }

  protected localizeFieldName(name:string):string {
    var label = SocialHub_properties["message_property_" + name];
    if (label) {
      return label;
    }

    return MessageDisplayFieldBase.camelizeWithWhitespace(name);
  }

  static camelizeWithWhitespace(str:string):string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter:any, index:any):string => 
       letter.toUpperCase()
    ).replace(/\s+/g, " ");
  }
}
export default MessageDisplayFieldBase;
