import { AnyFunction } from "@jangaroo/runtime/types";
import MessageProperties from "./MessageProperties";
import SocialHubAdapter from "./SocialHubAdapter";

/**
 * The RemoteBean interface for a social message
 */
abstract class Message {
  abstract getProperties(): MessageProperties;

  abstract getMessageId(): string;

  abstract getAdapter(): SocialHubAdapter;

  abstract getMessageState(): string;

  abstract getPublicationDate(): Date;

  abstract getUrl(): string;

  abstract getErrorMessage(): string;

  abstract deleteMessage(callback: AnyFunction): void;

  abstract getMessageContainerDescriptors(): Array<any>;
}

export default Message;
