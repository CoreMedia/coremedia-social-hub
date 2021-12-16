
/**
 * The RemoteBean interface for a social message
 */
abstract class SocialHubAdapter {
  abstract getAdapterId(): string;

  abstract getType(): string;

  abstract getDisplayName(): string;

  abstract isReadOnly(): boolean;

  abstract isDirectPublication(): boolean;

  abstract isNativeHistory(): boolean;

  abstract isSchedulingSupported(): boolean;

  abstract getSentMessages(): Array<any>;

  abstract getScheduledMessages(): Array<any>;

  abstract setColor(color: string): void;

  abstract getColor(): string;

  abstract getHoverColor(): string;

  abstract getMessageProperties(): Array<any>;
}

export default SocialHubAdapter;
