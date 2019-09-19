package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.Message;
import com.coremedia.blueprint.social.beans.MessageImpl;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import ext.container.Container;

public class MessageFooterBase extends ext.container.Container {
  [Bindable(event = "DUMMY")]
  public var message:com.coremedia.blueprint.social.beans.MessageImpl;

  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  public function MessageFooterBase(config:com.coremedia.blueprint.social.messages.MessageFooterBase = null) {
    super();
  }

  protected native function getShareLabel(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter):String;

  protected native function getShareIcon(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter):String;

  protected native function getLikesLabel(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter):String;

  protected native function getDislikesLabel(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter):String;

  protected native function getFavoritesIcon(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter):String;

  protected native function openInTab():void;

  protected native function transformDate(date:Date):String;

  protected native function getDateLabel(msg:com.coremedia.blueprint.social.beans.Message):String;

  /**
   * Removes this message from the scheduler so that is
   * disappears from the list of queued messages.
   */
  protected native function deleteFromScheduler():void;

  protected native function getStyle(msg:com.coremedia.blueprint.social.beans.Message):String;
}
}