package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.Message;
import com.coremedia.blueprint.social.beans.MessageImpl;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
import com.coremedia.cms.editor.sdk.util.MessageBoxUtil;

import ext.DateUtil;
import ext.container.Container;

import mx.resources.ResourceManager;

public class MessageFooterBase extends Container {

  [Bindable]
  public var message:MessageImpl;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function MessageFooterBase(config:MessageFooterBase = null) {
    super(config);
  }

  protected function openInTab():void {
    var url:String = message.getUrl();
    window.open(url, "_blank");
  }

  protected function transformDate(date:Date):String {
    var format:String = ResourceManager.getInstance().getString('com.coremedia.cms.editor.Editor', 'dateFormat');
    return DateUtil.format(date, format);
  }

  protected function getDateLabel(msg:Message):String {
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT) {
      return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_footer_publication_date');
    }
    return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_footer_scheduled_date');
  }

  /**
   * Removes this message from the scheduler so that is
   * disappears from the list of queued messages.
   */
  protected function deleteFromScheduler():void {
    var title:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'delete_post_title');
    var msg:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'delete_post_msg');
    MessageBoxUtil.showConfirmation(title, msg, ResourceManager.getInstance().getString('com.coremedia.cms.editor.sdk.actions.Actions', 'Action_delete_buttonText'),
            function (btn:*):void {
              if (btn === 'ok') {
                var adapter:SocialHubAdapterImpl = message.getAdapter() as SocialHubAdapterImpl;
                message.deleteFromScheduler(function ():void {
                  adapter.invalidate();
                });

                var parent:MessagesContainer = findParentByType(MessagesContainer.xtype) as MessagesContainer;
                parent.reload();
              }
            });
  }

  protected function getStyle(msg:Message):String {
    var style:String = "border-bottom: solid 1px #dcdbdb;background-color:#E6E6E6;";
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT) {
      style = "border-bottom: solid 1px #dcdbdb;background-color:#F1F1F1;";
    }
    return style;
  }
}
}
