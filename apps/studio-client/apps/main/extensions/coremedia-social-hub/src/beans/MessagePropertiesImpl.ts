import SubBean from "@coremedia/studio-client.client-core-impl/data/impl/SubBean";
import { as, mixin } from "@jangaroo/runtime";
import Message from "./Message";
import MessageImpl from "./MessageImpl";
import MessageProperties from "./MessageProperties";

class MessagePropertiesImpl extends SubBean implements MessageProperties {

  constructor(parent: MessageImpl, basePath: string) {
    super(parent, basePath);
  }

  getMessage(): Message {
    return as(this.getParentBean(), Message);
  }
}
mixin(MessagePropertiesImpl, MessageProperties);

export default MessagePropertiesImpl;
