Ext.define("com.coremedia.blueprint.social.beans.SocialHubPropertyNames", function(SocialHubPropertyNames) {/*package com.coremedia.blueprint.social.beans {
public class SocialHubPropertyNames {
  //message state
  public static const STATE_SENT:String = "SENT";
  public static const STATE_SCHEDULED:String = "SCHEDULED";
  public static const SEND_FAILED_PERMANENTLY:String = "SEND_FAILED_PERMANENTLY";

  //channels properties
  public static const ADAPTER_LIST:String = "adapters";

  //channel propertiy
  public static const ADAPTER_READ_ONLY:String = "readOnly";
  public static const ADAPTER_SCHEDULING_SUPPORTED:String = "schedulingSupported";
  public static const ADAPTER_NATIVE_HISTORY:String = "nativeHistory";
  public static const ADAPTER_ID:String = "adapterId";
  public static const ADAPTER_DISPLAY_NAME:String = "displayName";
  public static const ADAPTER_TYPE:String = "type";
  public static const ADAPTER_MESSAGE_PROPERTIES:String = "messageProperties";
  public static const ADAPTER_SENT_MESSAGES:String = "sentMessages";
  public static const ADAPTER_SCHEDULED_MESSAGES:String = "scheduledMessages";

  //message properties
  public static const MESSAGE_ID:String = "id";
  public static const MESSAGE_CONTAINER_DESCRIPTORS:String = "messageContainerDescriptors";
  public static const MESSAGE_PROPERTIES:String = "properties";
  public static const MESSAGE_ADAPTER:String = "adapter";
  public static const MESSAGE_SHARE_COUNT:String = "shareCount";
  public static const MESSAGE_LIKE_COUNT:String = "likeCount";
  public static const MESSAGE_DISLIKE_COUNT:String = "dislikeCount";
  public static const MESSAGE_COMMENT_COUNT:String = "commentCount";
  public static const MESSAGE_VIEW_COUNT:String = "viewCount";
  public static const MESSAGE_STATE:String = "state";
  public static const MESSAGE_URL:String = "url";
  public static const MESSAGE_PUBLICATION_DATE:String = "publicationDate";
  public static const MESSAGE_SCHEDULED_SEND_TIME:String = "scheduledSendTime";

  //descriptor properties
  public static const DESCRIPTOR_SCRIPTS:String = "scripts";
  public static const DESCRIPTOR_SCRIPLETS:String = "scriplets";
  public static const DESCRIPTOR_EXCLUDED:String = "excluded";
  public static const DESCRIPTOR_HTML:String = "html";
  public static const DESCRIPTOR_PROPERTY_NAME:String = "propertyName";

  //composer
  public static const COMPOSER_PROPERTIES:String = "properties";
  public static const COMPOSER_ATTACHMENTS:String = "attachments";
  public static const COMPOSER_PUBLICATION_DATE:String = "publicationDate";
  public static const COMPOSER_ADAPTER_TYPE:String = "adapterType";
  public static const COMPOSER_MESSAGE_TEXT:String = "messageText";
  public static const COMPOSER_MESSAGE_TITLE:String = "title";


}*/function SocialHubPropertyNames$() {}/*
}

============================================== Jangaroo part ==============================================*/
    return {
      constructor: SocialHubPropertyNames$,
      statics: {
        STATE_SENT: "SENT",
        STATE_SCHEDULED: "SCHEDULED",
        SEND_FAILED_PERMANENTLY: "SEND_FAILED_PERMANENTLY",
        ADAPTER_LIST: "adapters",
        ADAPTER_READ_ONLY: "readOnly",
        ADAPTER_SCHEDULING_SUPPORTED: "schedulingSupported",
        ADAPTER_NATIVE_HISTORY: "nativeHistory",
        ADAPTER_ID: "adapterId",
        ADAPTER_DISPLAY_NAME: "displayName",
        ADAPTER_TYPE: "type",
        ADAPTER_MESSAGE_PROPERTIES: "messageProperties",
        ADAPTER_SENT_MESSAGES: "sentMessages",
        ADAPTER_SCHEDULED_MESSAGES: "scheduledMessages",
        MESSAGE_ID: "id",
        MESSAGE_CONTAINER_DESCRIPTORS: "messageContainerDescriptors",
        MESSAGE_PROPERTIES: "properties",
        MESSAGE_ADAPTER: "adapter",
        MESSAGE_SHARE_COUNT: "shareCount",
        MESSAGE_LIKE_COUNT: "likeCount",
        MESSAGE_DISLIKE_COUNT: "dislikeCount",
        MESSAGE_COMMENT_COUNT: "commentCount",
        MESSAGE_VIEW_COUNT: "viewCount",
        MESSAGE_STATE: "state",
        MESSAGE_URL: "url",
        MESSAGE_PUBLICATION_DATE: "publicationDate",
        MESSAGE_SCHEDULED_SEND_TIME: "scheduledSendTime",
        DESCRIPTOR_SCRIPTS: "scripts",
        DESCRIPTOR_SCRIPLETS: "scriplets",
        DESCRIPTOR_EXCLUDED: "excluded",
        DESCRIPTOR_HTML: "html",
        DESCRIPTOR_PROPERTY_NAME: "propertyName",
        COMPOSER_PROPERTIES: "properties",
        COMPOSER_ATTACHMENTS: "attachments",
        COMPOSER_PUBLICATION_DATE: "publicationDate",
        COMPOSER_ADAPTER_TYPE: "adapterType",
        COMPOSER_MESSAGE_TEXT: "messageText",
        COMPOSER_MESSAGE_TITLE: "title"
      }
    };
});
