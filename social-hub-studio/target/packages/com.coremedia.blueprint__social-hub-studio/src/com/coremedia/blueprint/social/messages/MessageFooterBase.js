Ext.define("com.coremedia.blueprint.social.messages.MessageFooterBase", function(MessageFooterBase) {/*package com.coremedia.blueprint.social.messages {
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

  public*/ function MessageFooterBase$(config/*:MessageFooterBase = null*/) {if(arguments.length<=0)config=null;
    this.super$SdD1(config);
  }/*

  protected*/ function getShareLabel(adapter/*:SocialHubAdapter*/)/*:String*/ {
    return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'shares_' + adapter.getType().toLowerCase() + "_text");
  }/*

  protected*/ function getShareIcon(adapter/*:SocialHubAdapter*/)/*:String*/ {
    return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'shares_' + adapter.getType().toLowerCase() + "_icon");
  }/*

  protected*/ function getLikesLabel(adapter/*:SocialHubAdapter*/)/*:String*/ {
    return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'likes_' + adapter.getType().toLowerCase() + "_text");
  }/*

  protected*/ function getDislikesLabel(adapter/*:SocialHubAdapter*/)/*:String*/ {
    return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'dislikes_' + adapter.getType().toLowerCase() + "_text");
  }/*

  protected*/ function getFavoritesIcon(adapter/*:SocialHubAdapter*/)/*:String*/ {
    return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'likes_' + adapter.getType().toLowerCase() + "_icon");
  }/*

  protected*/ function openInTab()/*:void*/ {
    var url/*:String*/ = AS3.getBindable(this,"message").getUrl();
    window.open(url, "_blank");
  }/*

  protected*/ function transformDate(date/*:Date*/)/*:String*/ {
    var format/*:String*/ = mx.resources.ResourceManager.getInstance().getString('com.coremedia.cms.editor.Editor', 'dateFormat');
    return Ext.Date.format(date, format);
  }/*

  protected*/ function getDateLabel(msg/*:Message*/)/*:String*/ {
    if (msg.getMessageState() === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.STATE_SENT) {
      return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_footer_publication_date');
    }
    return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_footer_scheduled_date');
  }/*

  /**
   * Removes this message from the scheduler so that is
   * disappears from the list of queued messages.
   * /
  protected*/ function deleteFromScheduler()/*:void*/ {var this$=this;
    var title/*:String*/ = mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'delete_post_title');
    var msg/*:String*/ = mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'delete_post_msg');
    com.coremedia.cms.editor.sdk.util.MessageBoxUtil.showConfirmation(title, msg, mx.resources.ResourceManager.getInstance().getString('com.coremedia.cms.editor.sdk.actions.Actions', 'Action_delete_buttonText'),
            function (btn/*:**/)/*:void*/ {
              if (btn === 'ok') {
                var adapter/*:SocialHubAdapterImpl*/ =AS3.as( AS3.getBindable(this$,"message").getAdapter(),  com.coremedia.blueprint.social.beans.SocialHubAdapterImpl);
                AS3.getBindable(this$,"message").deleteFromScheduler(function ()/*:void*/ {
                  adapter.invalidate();
                });

                var parent/*:MessagesContainer*/ =AS3.as( this$.findParentByType(com.coremedia.blueprint.social.messages.MessagesContainer.xtype),  com.coremedia.blueprint.social.messages.MessagesContainer);
                parent.reload();
              }
            });
  }/*

  protected*/ function getStyle(msg/*:Message*/)/*:String*/ {
    var style/*:String*/ = "border-bottom: solid 1px #dcdbdb;background-color:#E6E6E6;";
    if(msg.getMessageState() === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.STATE_SENT) {
      style = "border-bottom: solid 1px #dcdbdb;background-color:#F1F1F1;";
    }
    return style;
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      constructor: MessageFooterBase$,
      super$SdD1: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      getShareLabel: getShareLabel,
      getShareIcon: getShareIcon,
      getLikesLabel: getLikesLabel,
      getDislikesLabel: getDislikesLabel,
      getFavoritesIcon: getFavoritesIcon,
      openInTab: openInTab,
      transformDate: transformDate,
      getDateLabel: getDateLabel,
      deleteFromScheduler: deleteFromScheduler,
      getStyle: getStyle,
      config: {
        message: null,
        adapter: null
      },
      requires: [
        "Ext.Date",
        "Ext.container.Container",
        "com.coremedia.cms.editor.sdk.util.MessageBoxUtil",
        "mx.resources.ResourceManager"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.SocialHubAdapterImpl",
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames",
        "com.coremedia.blueprint.social.messages.MessagesContainer"
      ]
    };
});
