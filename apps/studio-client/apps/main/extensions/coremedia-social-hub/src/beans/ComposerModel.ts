import { AnyFunction } from "@jangaroo/runtime/types";
import ComposerModelProperties from "./ComposerModelProperties";

/**
 * The RemoteBean interface for a social message
 */
abstract class ComposerModel {
  abstract getProperties(): ComposerModelProperties;

  abstract getAttachments(): Array<any>;

  abstract getPublicationDate(): Date;

  abstract getAdapterType(): string;

  abstract getAdapterId(): string;

  abstract send(doWait: boolean, savedCallback: AnyFunction, publicationCallback: AnyFunction): void;

  abstract reset(callback?: AnyFunction): void;
}

export default ComposerModel;
