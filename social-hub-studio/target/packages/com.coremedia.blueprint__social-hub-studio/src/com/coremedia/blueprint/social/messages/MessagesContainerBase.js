Ext.define("com.coremedia.blueprint.social.messages.MessagesContainerBase", function(MessagesContainerBase) {/*package com.coremedia.blueprint.social.messages {
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

  [Bindable]
  public var adapter:SocialHubAdapterImpl;

  [Bindable]
  public var messageType:String;

  public var loadMask:ProgressLoadMask;

  public var activeItemExpression:ValueExpression;

  private var target:Container;

  private var lastDateString:String;

  public*/ function MessagesContainerBase$(config/*:MessagesContainerBase = null*/) {if(arguments.length<=0)config=null;
    this.super$O$hK(config);
    this.target$O$hK =AS3.as( this.queryById(com.coremedia.blueprint.social.messages.MessagesContainer.MESSAGES_CONTAINER_ITEM_ID),  Ext.container.Container);
  }/*

  override protected*/ function afterRender()/*:void*/ {var this$=this;
    Ext.container.Container.prototype.afterRender.call(this);

    //when reopening the social hub window the reloading of the messages comes BEFORE the reloading of ChannelContainer
    //then this component has no loadmask.
    //With EventUtil the problem could be solved.
    com.coremedia.ui.util.EventUtil.invokeLater(function ()/*:void*/ {
      this$.reload(false);
    });
  }/*

  public*/ function reload(invalidate/*:Boolean = true*/)/*:void*/ {if(arguments.length<=0)invalidate=true;
    this.clear();
    if (invalidate) {
      AS3.getBindable(this,"adapter").invalidate(AS3.bind(this,"loadMessages$O$hK"));
    }
    else {
      this.loadMessages$O$hK(false);
    }
  }/*

  public*/ function clear()/*:void*/ {
    this.target$O$hK.removeAll();
  }/*

  private*/ function loadMessages(invalidate/*:Boolean = true*/)/*:void*/ {if(arguments.length<=0)invalidate=true;
    if (invalidate) {
      this.invalidateMessages$O$hK();
    }
    else {
      this.loadMsgs$O$hK();
    }
  }/*

  private*/ function invalidateMessages()/*:void*/ {var $2;
    for/* each*/(var $1 in $2= AS3.getBindable(this,"adapter").get(AS3.getBindable(this,"messageType"))) {var message/*:MessageImpl*/ =$2[$1];
      message.invalidate();
    }

    this.loadMsgs$O$hK();
  }/*

  private*/ function loadMsgs()/*:void*/ {var this$=this;
    com.coremedia.ui.data.ValueExpressionFactory.createFromFunction(function ()/*:Array*/ {
      var result/*:Array*/ = [];var $2;
      for/* each*/(var $1 in $2= AS3.getBindable(this$,"adapter").get(AS3.getBindable(this$,"messageType"))) {var message/*:MessageImpl*/ =$2[$1];
        if (!message.isLoaded()) {
          message.load();
          return undefined;
        }

        result.push(message);
      }

      return result;
    }).loadValue(function (msgs/*:Array*/)/*:void*/ {var $2;
      for/* each*/(var $1 in $2= AS3.getBindable(this$,"adapter").get(AS3.getBindable(this$,"messageType"))) {var message/*:MessageImpl*/ =$2[$1];
        this$.loadMessage$O$hK(message);
      }
    });
  }/*

  private*/ function loadMessage(message/*:MessageImpl*/)/*:void*/ {
    if (AS3.getBindable(this,"messageType") === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES) {
      this.renderDate$O$hK(message);
    }

    var dynamicMessage/*:DynamicMessageContainer*/ = AS3.cast(com.coremedia.blueprint.social.messages.DynamicMessageContainer,{});
    AS3.setBindable(dynamicMessage,"adapter" , AS3.getBindable(this,"adapter"));
    AS3.setBindable(dynamicMessage,"message" , message);
    this.target$O$hK.add(dynamicMessage);

    if (this.loadMask && !this.loadMask.destroyed) {
      this.loadMask.el.dom['children'][1].setAttribute('style', 'background: transparent;');
      this.loadMask['messagesCount']++;
      AS3.setBindable(this.loadMask,"progress" , this.loadMask['messagesCount'] / this.loadMask['messagesLength']);
      if (AS3.getBindable(this.loadMask,"progress","DUMMY") === 1) {
        this.loadMask.hide();
        this.loadMask.destroy();
        this.activeItemExpression.setValue(com.coremedia.blueprint.social.channels.ChannelContainerBase.MESSAGE_WRAPPER_ITEM_ID);
        this.target$O$hK.up().updateLayout();
      }
    }

  }/*

  private*/ function renderDate(message/*:Message*/)/*:void*/ {
    var value/*:String*/ = this.getDateLabel$O$hK(message);
    if (value !== null) {
      var conf/*:Object*/ = {
        value: value,
        ui: null,
        style: "margin-left: 4px; font-size: 22px;margin-top: 12px;margin-bottom: 12px;"
      };

      var field/*:DisplayField*/ = new Ext.form.field.Display(AS3.cast(Ext.form.field.Display,conf));
      this.target$O$hK.add(field);
    }
  }/*

  private*/ function getDateLabel(message/*:Message*/)/*:String*/ {
    var publicationDate/*:Date*/ = message.getPublicationDate();
    //scheduled right now
    if(!publicationDate) {
      return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_footer_scheduled_now');
    }

    var value/*:String*/ = this.getWeekday$O$hK(publicationDate) + ", " + Ext.Date.format(publicationDate, mx.resources.ResourceManager.getInstance().getString('com.coremedia.cms.editor.Editor', 'shortDateFormat'));
    if (com.coremedia.cms.editor.sdk.util.TimeUtil.isToday(publicationDate)) {
      value = this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_queue_today');
    }

    if (value !== this.lastDateString$O$hK) {
      this.lastDateString$O$hK = value;
      return this.lastDateString$O$hK;
    }

    return null;
  }/*

  protected*/ function getEmptyLabel(msgType/*:String*/)/*:String*/ {
    if (msgType === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES) {
      return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_empty_scheduled');
    }
    return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_empty_history');
  }/*

  //TODO
  private*/ function getWeekday(date/*:Date*/)/*:String*/ {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    return weekdays[date.getDay()];
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      loadMask: null,
      activeItemExpression: null,
      target$O$hK: null,
      lastDateString$O$hK: null,
      constructor: MessagesContainerBase$,
      super$O$hK: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      reload: reload,
      clear: clear,
      loadMessages$O$hK: loadMessages,
      invalidateMessages$O$hK: invalidateMessages,
      loadMsgs$O$hK: loadMsgs,
      loadMessage$O$hK: loadMessage,
      renderDate$O$hK: renderDate,
      getDateLabel$O$hK: getDateLabel,
      getEmptyLabel: getEmptyLabel,
      getWeekday$O$hK: getWeekday,
      config: {
        adapter: null,
        messageType: null
      },
      requires: [
        "Ext.Date",
        "Ext.container.Container",
        "Ext.form.field.Display",
        "com.coremedia.cms.editor.sdk.util.TimeUtil",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.util.EventUtil",
        "mx.resources.ResourceManager"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames",
        "com.coremedia.blueprint.social.channels.ChannelContainerBase",
        "com.coremedia.blueprint.social.messages.DynamicMessageContainer",
        "com.coremedia.blueprint.social.messages.MessagesContainer"
      ]
    };
});
