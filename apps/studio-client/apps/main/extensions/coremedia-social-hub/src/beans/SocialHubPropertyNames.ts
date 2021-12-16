
class SocialHubPropertyNames {
  //message state
  static readonly STATE_SENT: string = "SENT";

  static readonly STATE_SCHEDULED: string = "SCHEDULED";

  static readonly SEND_FAILED_PERMANENTLY: string = "SEND_FAILED_PERMANENTLY";

  //channels properties
  static readonly ADAPTER_LIST: string = "adapters";

  //channel propertiy
  static readonly ADAPTER_READ_ONLY: string = "readOnly";

  static readonly ADAPTER_SCHEDULING_SUPPORTED: string = "schedulingSupported";

  static readonly ADAPTER_NATIVE_HISTORY: string = "nativeHistory";

  static readonly ADAPTER_ID: string = "adapterId";

  static readonly ADAPTER_DISPLAY_NAME: string = "displayName";

  static readonly ADAPTER_TYPE: string = "type";

  static readonly ADAPTER_MESSAGE_PROPERTIES: string = "messageProperties";

  static readonly ADAPTER_SENT_MESSAGES: string = "sentMessages";

  static readonly ADAPTER_SCHEDULED_MESSAGES: string = "scheduledMessages";

  //message properties
  static readonly MESSAGE_ID: string = "id";

  static readonly MESSAGE_CONTAINER_DESCRIPTORS: string = "messageContainerDescriptors";

  static readonly MESSAGE_PROPERTIES: string = "properties";

  static readonly MESSAGE_ADAPTER: string = "adapter";

  static readonly MESSAGE_SHARE_COUNT: string = "shareCount";

  static readonly MESSAGE_LIKE_COUNT: string = "likeCount";

  static readonly MESSAGE_DISLIKE_COUNT: string = "dislikeCount";

  static readonly MESSAGE_COMMENT_COUNT: string = "commentCount";

  static readonly MESSAGE_VIEW_COUNT: string = "viewCount";

  static readonly MESSAGE_STATE: string = "state";

  static readonly MESSAGE_URL: string = "url";

  static readonly MESSAGE_ERROR: string = "errorMessage";

  static readonly MESSAGE_PUBLICATION_DATE: string = "publicationDate";

  static readonly MESSAGE_SCHEDULED_SEND_TIME: string = "scheduledSendTime";

  //descriptor properties
  static readonly DESCRIPTOR_SCRIPTS: string = "scripts";

  static readonly DESCRIPTOR_SCRIPLETS: string = "scriplets";

  static readonly DESCRIPTOR_EXCLUDED: string = "excluded";

  static readonly DESCRIPTOR_HTML: string = "html";

  static readonly DESCRIPTOR_PROPERTY_NAME: string = "propertyName";

  //composer
  static readonly COMPOSER_PROPERTIES: string = "properties";

  static readonly COMPOSER_ATTACHMENTS: string = "attachments";

  static readonly COMPOSER_PUBLICATION_DATE: string = "publicationDate";

  static readonly COMPOSER_ADAPTER_TYPE: string = "adapterType";

  static readonly COMPOSER_ADAPTER_ID: string = "adapterId";

  static readonly COMPOSER_TYPE: string = "COMPOSE_TYPE_";

  static readonly COMPOSER_TYPE_LINK: string = SocialHubPropertyNames.COMPOSER_TYPE + "LINK";

  static readonly COMPOSER_TYPE_CONTENT: string = SocialHubPropertyNames.COMPOSER_TYPE + "CONTENT";

}

export default SocialHubPropertyNames;
