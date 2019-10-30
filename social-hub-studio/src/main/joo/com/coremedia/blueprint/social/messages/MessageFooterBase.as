package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.ComposerModelImpl;
import com.coremedia.blueprint.social.beans.Message;
import com.coremedia.blueprint.social.beans.MessageImpl;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
import com.coremedia.blueprint.social.socialHubService;
import com.coremedia.cms.editor.sdk.util.MessageBoxUtil;

import ext.DateUtil;
import ext.StringUtil;
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
    else if (msg.getMessageState() === SocialHubPropertyNames.SEND_FAILED_PERMANENTLY) {
      return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_footer_failed');
    }
    return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_footer_scheduled_date');
  }

  /**
   * Removes this message from the scheduler so that is
   * disappears from the list of queued messages.
   */
  protected function deleteMessage():void {
    var title:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'delete_post_title');
    var msg:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'delete_post_msg');
    MessageBoxUtil.showConfirmation(title, msg, ResourceManager.getInstance().getString('com.coremedia.cms.editor.sdk.actions.Actions', 'Action_delete_buttonText'),
            function (btn:*):void {
              if (btn === 'ok') {
                var adapter:SocialHubAdapterImpl = message.getAdapter() as SocialHubAdapterImpl;
                message.deleteMessage(function ():void {
                  adapter.invalidate();

                  var parent:MessagesContainer = findParentByType(MessagesContainer.xtype) as MessagesContainer;
                  parent.reload();
                });
              }
            });
  }

  /**
   * Removes this message from the scheduler so that is
   * disappears from the list of queued messages.
   */
  protected function retryMessage():void {
    var title:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'retry_post_title');
    var msg:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'retry_post_msg');
    MessageBoxUtil.showConfirmation(title, msg, ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'retry_error_post_title'),
            function (btn:*):void {
              if (btn === 'ok') {
                var adapter:SocialHubAdapterImpl = message.getAdapter() as SocialHubAdapterImpl;
                message.retryMessage(function ():void {
                  adapter.invalidate();

                  var parent:MessagesContainer = findParentByType(MessagesContainer.xtype) as MessagesContainer;
                  parent.reload();

                  var network:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', adapter.getType().toLowerCase() + '_title');
                  var title:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'compose_job_notification_retry_title');
                  title = StringUtil.format(title, network);
                  var msg:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'compose_job_notification_retry_start');
                  var toast:String = StringUtil.format(msg, network);
                  socialHubService.showToast(title, toast);


                  ComposerModelImpl.triggerPublicationJob(message, function(error:Object):void {
                    ComposerModelImpl.showResultToast(adapter, error);

                    adapter.invalidate();
                    parent.reload();
                  })
                });
              }
            });
  }


  protected function getStyle(msg:Message):String {
    var style:String = "border-bottom: solid 1px #dcdbdb;background-color:#E6E6E6;";
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT) {
      style = "border-bottom: solid 1px #dcdbdb;background-color:#F1F1F1;";
    }
    if (msg.getMessageState() === SocialHubPropertyNames.SEND_FAILED_PERMANENTLY) {
      style = "border-bottom: solid 2px #c41313;background-color:#F1F1F1;";
    }
    return style;
  }

  protected function getDateLabelStyle(msg:Message):String {
    var style:String = "color:#000;font-weight:bold;";

    if (msg.getMessageState() === SocialHubPropertyNames.SEND_FAILED_PERMANENTLY) {
      style = style + "color:#c41313;";
    }
    return style;
  }
}
}
