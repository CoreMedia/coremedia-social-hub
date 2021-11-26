import Config from "@jangaroo/runtime/Config";
import { as, asConfig } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import ComposerModelImpl from "../beans/ComposerModelImpl";
import Message from "../beans/Message";
import MessageImpl from "../beans/MessageImpl";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import SocialHubAdapterImpl from "../beans/SocialHubAdapterImpl";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import socialHubService from "../socialHubService";
import MessagesContainer from "./MessagesContainer";
import Editor_properties from "@coremedia/studio-client.main.editor-components/Editor_properties";
import Actions_properties from "@coremedia/studio-client.main.editor-components/sdk/actions/Actions_properties";
import MessageBoxUtil from "@coremedia/studio-client.main.editor-components/sdk/util/MessageBoxUtil";
import DateUtil from "@jangaroo/ext-ts/Date";
import StringUtil from "@jangaroo/ext-ts/String";
import Container from "@jangaroo/ext-ts/container/Container";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface MessageFooterBaseConfig extends Config<Container>, Partial<Pick<MessageFooterBase,
  "message" |
  "adapter"
>> {
}



class MessageFooterBase extends Container {
  declare Config: MessageFooterBaseConfig;

  message:MessageImpl = null;

  adapter:SocialHubAdapter = null;

  constructor(config:Config<MessageFooterBase> = null) {
    super(config);
  }

  protected openInTab():void {
    var url = this.message.getUrl();
    window.open(url, "_blank");
  }

  protected transformDate(date:Date):string {
    var format = Editor_properties.dateFormat;
    return DateUtil.format(date, format);
  }

  protected getDateLabel(msg:Message):string {
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT) {
      return SocialHub_properties.message_footer_publication_date;
    }
    else if (msg.getMessageState() === SocialHubPropertyNames.SEND_FAILED_PERMANENTLY) {
      return SocialHub_properties.message_footer_failed;
    }
    return SocialHub_properties.message_footer_scheduled_date;
  }

  /**
   * Removes this message from the scheduler so that is
   * disappears from the list of queued messages.
   */
  protected deleteMessage():void {
    var title = SocialHub_properties.delete_post_title;
    var msg = SocialHub_properties.delete_post_msg;
    MessageBoxUtil.showConfirmation(title, msg, Actions_properties.Action_delete_buttonText,
            (btn:any):void => {
              if (btn === "ok") {
                var adapter =as( this.message.getAdapter(),  SocialHubAdapterImpl);
                this.message.deleteMessage(():void => {
                  adapter.invalidate();

                  var parent =as( this.findParentByType(MessagesContainer.xtype),  MessagesContainer);
                  parent.reload();
                });
              }
            });
  }

  /**
   * Removes this message from the scheduler so that is
   * disappears from the list of queued messages.
   */
  protected retryMessage():void {
    var title = SocialHub_properties.retry_post_title;
    var msg = SocialHub_properties.retry_post_msg;
    MessageBoxUtil.showConfirmation(title, msg, SocialHub_properties.retry_error_post_title,
            (btn:any):void => {
              if (btn === "ok") {
                var adapter =as( this.message.getAdapter(),  SocialHubAdapterImpl);
                this.message.retryMessage(():void => {
                  adapter.invalidate();

                  var parent =as( this.findParentByType(MessagesContainer.xtype),  MessagesContainer);
                  parent.reload();

                  var network = SocialHub_properties[adapter.getType().toLowerCase() + "_title"];
                  var title = SocialHub_properties.compose_job_notification_retry_title;
                  title = StringUtil.format(title, network);
                  var msg = SocialHub_properties.compose_job_notification_retry_start;
                  var toast = StringUtil.format(msg, network);
                  socialHubService.showToast(title, toast);


                  ComposerModelImpl.triggerPublicationJob(this.message, (error:any):void => {
                    ComposerModelImpl.showResultToast(adapter, error);

                    adapter.invalidate();
                    parent.reload();
                  });
                });
              }
            });
  }


  protected getStyle(msg:Message):string {
    var style = "border-bottom: solid 1px #dcdbdb;background-color:#E6E6E6;";
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT) {
      style = "border-bottom: solid 1px #dcdbdb;background-color:#F1F1F1;";
    }
    if (msg.getMessageState() === SocialHubPropertyNames.SEND_FAILED_PERMANENTLY) {
      style = "border-bottom: solid 1px #dcdbdb;background-color:#c41313;";
    }
    return style;
  }

  protected getDateLabelStyle(msg:Message):string {
    var style = "color:#000;font-weight:bold;";

    if (msg.getMessageState() === SocialHubPropertyNames.SEND_FAILED_PERMANENTLY) {
      style = style + "color:#FFF;";
    }
    return style;
  }
}
export default MessageFooterBase;
