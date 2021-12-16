import RemoteBeanImpl from "@coremedia/studio-client.client-core-impl/data/impl/RemoteBeanImpl";
import RemoteServiceMethod from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethod";
import RemoteServiceMethodResponse from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethodResponse";
import SubBean from "@coremedia/studio-client.client-core-impl/data/impl/SubBean";
import { mixin } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";
import Message from "./Message";
import MessageContainerDescriptor from "./MessageContainerDescriptor";
import MessageProperties from "./MessageProperties";
import MessagePropertiesImpl from "./MessagePropertiesImpl";
import SocialHubAdapter from "./SocialHubAdapter";
import SocialHubPropertyNames from "./SocialHubPropertyNames";

class MessageImpl extends RemoteBeanImpl implements Message {
  static readonly REST_RESOURCE_URI_TEMPLATE: string = "socialhub/adapter/{adapterId:[^/]+}/message/{id:[^/]+}";

  #descriptors: Array<any> = null;

  constructor(path: string) {
    super(path);
  }

  getProperties(): MessageProperties {
    return this.get(SocialHubPropertyNames.MESSAGE_PROPERTIES);
  }

  protected override isSubObject(value: any, propertyPath: any): boolean {
    return propertyPath === SocialHubPropertyNames.MESSAGE_PROPERTIES;
  }

  protected override createSubBean(propertyPathPrefix: string): SubBean {
    return new MessagePropertiesImpl(this, propertyPathPrefix);
  }

  getMessageId(): string {
    return this.get(SocialHubPropertyNames.MESSAGE_ID);
  }

  getAdapter(): SocialHubAdapter {
    return this.get(SocialHubPropertyNames.MESSAGE_ADAPTER);
  }

  getMessageState(): string {
    return this.get(SocialHubPropertyNames.MESSAGE_STATE);
  }

  getPublicationDate(): Date {
    return this.get(SocialHubPropertyNames.MESSAGE_PUBLICATION_DATE);
  }

  getUrl(): string {
    return this.get(SocialHubPropertyNames.MESSAGE_URL);
  }

  getErrorMessage(): string {
    return this.get(SocialHubPropertyNames.MESSAGE_ERROR);
  }

  getMessageContainerDescriptors(): Array<any> {
    const dscrs: Array<any> = this.get(SocialHubPropertyNames.MESSAGE_CONTAINER_DESCRIPTORS);
    if (!this.#descriptors) {
      this.#descriptors = [];
      if (dscrs) {
        for (const descriptor of dscrs) {
          const d = new MessageContainerDescriptor(descriptor);
          this.#descriptors.push(d);
        }
      }
    }
    return this.#descriptors;
  }

  deleteMessage(callback: AnyFunction): void {
    const deleteMethod = new RemoteServiceMethod(this.getUriPath(), "DELETE");
    deleteMethod.request({},
      (response: RemoteServiceMethodResponse): void => {
        callback.call(null);
      });
  }

  retryMessage(callback: AnyFunction): void {
    const deleteMethod = new RemoteServiceMethod(this.getUriPath() + "/retry", "GET");
    deleteMethod.request({},
      (response: RemoteServiceMethodResponse): void => {
        callback.call(null);
      });
  }
}
mixin(MessageImpl, Message);

export default MessageImpl;
