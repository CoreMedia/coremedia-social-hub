package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.Message;
import com.coremedia.blueprint.social.beans.MessageImpl;
import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
import com.coremedia.blueprint.social.channels.*;
import com.coremedia.cms.editor.sdk.util.TimeUtil;
import com.coremedia.ui.components.ProgressLoadMask;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.util.EventUtil;

import ext.DateUtil;
import ext.container.Container;
import ext.form.field.DisplayField;

import mx.resources.ResourceManager;

public class MessagesContainerBase extends Container {

  [ExtConfig]
  public var adapter:SocialHubAdapterImpl;

  [ExtConfig]
  public var messageType:String;

  public var loadMask:ProgressLoadMask;

  public var activeItemExpression:ValueExpression;

  private var target:Container;

  private var lastDateString:String;

  public function MessagesContainerBase(config:MessagesContainerBase = null) {
    super(config);
    target = queryById(MessagesContainer.MESSAGES_CONTAINER_ITEM_ID) as Container;
  }

  override protected function afterRender():void {
    super.afterRender();

    //when reopening the social hub window the reloading of the messages comes BEFORE the reloading of ChannelContainer
    //then this component has no loadmask.
    //With EventUtil the problem could be solved.
    EventUtil.invokeLater(function ():void {
      reload(false);
    });
  }

  public function reload(invalidate:Boolean = true):void {
    clear();
    if (invalidate) {
      adapter.invalidate(loadMessages);
    }
    else {
      loadMessages(false);
    }
  }

  public function clear():void {
    this.lastDateString = null;
    target.removeAll();
  }

  private function loadMessages(invalidate:Boolean = true):void {
    if (invalidate) {
      invalidateMessages();
    }
    else {
      loadMsgs();
    }
  }

  private function invalidateMessages():void {
    for each(var message:MessageImpl in adapter.get(messageType)) {
      message.invalidate();
    }

    loadMsgs();
  }

  private function loadMsgs():void {
    ValueExpressionFactory.createFromFunction(function ():Array {
      var result:Array = [];
      for each(var message:MessageImpl in adapter.get(messageType)) {
        if (!message.isLoaded()) {
          message.load();
          return undefined;
        }

        result.push(message);
      }

      return result;
    }).loadValue(function (msgs:Array):void {
      for each(var message:MessageImpl in adapter.get(messageType)) {
        loadMessage(message);
      }
    });
  }

  private function loadMessage(message:MessageImpl):void {
    if (messageType === SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES) {
      renderDate(message);
    }

    var dynamicMessage:DynamicMessageContainer = DynamicMessageContainer({});
    dynamicMessage.adapter = adapter;
    dynamicMessage.message = message;
    target.add(dynamicMessage);

    if (loadMask && !loadMask.destroyed) {
      loadMask.el.dom['children'][1].setAttribute('style', 'background: transparent;');
      loadMask['messagesCount']++;
      loadMask.progress = loadMask['messagesCount'] / loadMask['messagesLength'];
      if (loadMask.progress === 1) {
        loadMask.hide();
        loadMask.destroy();
        activeItemExpression.setValue(ChannelContainerBase.MESSAGE_WRAPPER_ITEM_ID);
        target.up().updateLayout();
      }
    }

  }

  private function renderDate(message:Message):void {
    var value:String = getDateLabel(message);
    if (value !== null) {
      var conf:Object = {
        value: value,
        ui: null,
        style: "margin-left: 4px; font-size: 22px;margin-top: 12px;margin-bottom: 12px;"
      };

      var field:DisplayField = new DisplayField(DisplayField(conf));
      target.add(field);
    }
  }

  private function getDateLabel(message:Message):String {
    var publicationDate:Date = message.getPublicationDate();
    //scheduled right now
    if (!publicationDate) {
      return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_footer_scheduled_now');
    }

    var value:String = getWeekday(publicationDate) + ", " + DateUtil.format(publicationDate, ResourceManager.getInstance().getString('com.coremedia.cms.editor.Editor', 'shortDateFormat'));
    if (TimeUtil.isToday(publicationDate)) {
      value = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_queue_today');
    }

    if (value !== this.lastDateString) {
      this.lastDateString = value;
      return this.lastDateString;
    }

    return null;
  }

  protected function getEmptyLabel(msgType:String):String {
    if (msgType === SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES) {
      return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_empty_scheduled')
    }
    return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_empty_history');
  }

  //TODO
  private function getWeekday(date:Date):String {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    return weekdays[date.getDay()];
  }
}
}
