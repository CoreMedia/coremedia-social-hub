package com.coremedia.blueprint.social.messages {

public class MessagesContainer extends com.coremedia.blueprint.social.messages.MessagesContainerBase {
  public static const xtype:String = "com.coremedia.blueprint.social.studio.config.messagesContainer";

  public static const MESSAGES_CONTAINER_ITEM_ID:String = "messagesContainer";

  [Bindable(event = "DUMMY")]
  public var title:String;

  public function MessagesContainer(config:com.coremedia.blueprint.social.messages.MessagesContainer = null) {
    super();
  }
}
}