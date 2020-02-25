package com.coremedia.blueprint.social {
import com.coremedia.blueprint.social.beans.ComposerModel;
import com.coremedia.blueprint.social.beans.ComposerModelImpl;
import com.coremedia.blueprint.social.beans.MediaItem;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubAdapters;
import com.coremedia.blueprint.social.beans.SocialHubAdaptersImpl;
import com.coremedia.blueprint.social.channels.ChannelContainer;
import com.coremedia.blueprint.social.channels.ChannelsContainer;
import com.coremedia.blueprint.social.notifications.SocialNotificationToast;
import com.coremedia.cap.common.IdHelper;
import com.coremedia.cap.common.SESSION;
import com.coremedia.cap.content.Content;
import com.coremedia.cms.editor.sdk.editorContext;
import com.coremedia.cms.editor.sdk.sites.Site;
import com.coremedia.cms.editor.sdk.sites.SitesService;
import com.coremedia.ui.data.Blob;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.data.beanFactory;
import com.coremedia.ui.data.impl.RemoteServiceMethod;
import com.coremedia.ui.data.impl.RemoteServiceMethodResponse;
import com.coremedia.ui.mixins.ValidationState;
import com.coremedia.ui.util.createComponentSelector;

import ext.Component;
import ext.ComponentManager;
import ext.Ext;

import mx.resources.ResourceManager;

public class SocialHubServiceImpl implements ISocialHubService {
  private var hubExpression:ValueExpression;

  public function getAdaptersExpression():ValueExpression {
    if (!hubExpression) {
      hubExpression = ValueExpressionFactory.createFromFunction(function ():SocialHubAdapters {
        var siteService:SitesService = editorContext.getSitesService();
        var preferredSite:Site = siteService.getPreferredSite();
        if (preferredSite) {
          return beanFactory.getRemoteBean("socialhub/adapters/" + preferredSite.getId()) as SocialHubAdaptersImpl;
        }

        return null;
      });
    }

    return hubExpression;
  }


  public function getMediaType(content:Content):String {
    var blobProperty:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHubSettings', 'social_hub_content_blob_property');
    var blob:Blob = content.getProperties().get(blobProperty);
    if (blob) {
      if (!blob.isLoaded()) {
        blob.loadData();
        return undefined;
      }

      var contentType:String = blob.getContentType();
      if (contentType.indexOf(MediaItem.TYPE_IMAGE) !== -1) {
        return MediaItem.TYPE_IMAGE;
      }

      if (contentType.indexOf(MediaItem.TYPE_VIDEO) !== -1) {
        return MediaItem.TYPE_VIDEO;
      }
    }

    return null;
  }

  public function getComposerModel(adapterId:String):ComposerModel {
    var uriPath:String = SESSION.getUser().getUriPath();
    var userId:String = uriPath.substr(uriPath.lastIndexOf('/') + 1, uriPath.length);
    var model:ComposerModelImpl = beanFactory.getRemoteBean('socialhub/composermodel/' + userId + '/' + adapterId) as ComposerModelImpl;
    if (!model.isLoaded()) {
      model.load();
    }
    return model;
  }


  public function initComposerModel(adapterId:String, contents:Array, composerMethod:String, callback:Function):void {
    var uriPath:String = SESSION.getUser().getUriPath();
    var userId:String = uriPath.substr(uriPath.lastIndexOf('/') + 1, uriPath.length);
    var id:Number = null;
    if (contents.length > 0) {
      id = IdHelper.parseContentId(contents[0]);
    }

    var method:RemoteServiceMethod = new RemoteServiceMethod('socialhub/composermodel/' + userId + '/' + adapterId + '/compose', 'POST');
    method.request(
            {
              'contentId': id,
              'composerMethod' : composerMethod
            },
            function (response:RemoteServiceMethodResponse):void {
              var result:String = response.response.responseText;
              var cm:ComposerModelImpl = getComposerModel(adapterId) as ComposerModelImpl;
              cm.invalidate(callback);
            },
            function (response:RemoteServiceMethodResponse):void {
              callback(response.getError());
            }
    );
  }

  public function showToast(title:String, msg:String, validationState:ValidationState = null, actionLabel:String = null, action:Function = null):void {
    var config:SocialNotificationToast = SocialNotificationToast({});
    config.notificationSource = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'menu_title_text');
    config.notificationTitle = title;
    config.notificationMessage = msg;
    config.validationState = null;
    config.notificationAction = action;
    config.notificationActionLabel = actionLabel;
    config.notificationValidationState = validationState;
    var toast:SocialNotificationToast = new SocialNotificationToast(config);
    toast.show();
  }

  public function getAdapter(adapterId:String):SocialHubAdapter {
    var adapters:SocialHubAdapters = getAdaptersExpression().getValue();
    for each(var adapter:SocialHubAdapter in adapters.getAdapters()) {
      if (adapter.getAdapterId() === adapterId) {
        return adapter;
      }
    }
    return null;
  }

  public function focusAdapter(socialHubAdataper:SocialHubAdapter, callback:Function):void {
    var channelContainer:ChannelsContainer = Ext.getCmp(ChannelsContainer.ID) as ChannelsContainer;
    channelContainer.focusAdapter(socialHubAdataper);
    callback();
  }

  public function focusAndReload(socialHubAdapter:SocialHubAdapter):void {
    var findByType:Array = editorContext.getWorkArea().query(createComponentSelector()._xtype(SocialHubMainTab.xtype, true).build());
    if (findByType.length > 0) {
      var cmp:Component = findByType[0];
      editorContext.getWorkArea().setActiveTab(cmp);

      var channelContainer:ChannelsContainer = Ext.getCmp(ChannelsContainer.ID) as ChannelsContainer;
      focusAdapter(socialHubAdapter, function ():void {
        var channelContainer:ChannelContainer = Ext.getCmp(socialHubAdapter.getAdapterId()) as ChannelContainer;
        channelContainer.reload(true);
      });
    }
    else {
      var cfg:SocialHubMainTab = SocialHubMainTab({});
      var tab:Component = ComponentManager.create(cfg);
      editorContext.getWorkArea().add(tab);
      editorContext.getWorkArea().setActiveTab(tab);
    }
  }
}
}
