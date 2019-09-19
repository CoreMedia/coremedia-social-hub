Ext.define("com.coremedia.blueprint.social.SocialHubServiceImpl", function(SocialHubServiceImpl) {/*package com.coremedia.blueprint.social {
import com.coremedia.blueprint.social.beans.SocialHubAdapters;
import com.coremedia.blueprint.social.beans.SocialHubAdaptersImpl;
import com.coremedia.blueprint.social.beans.ComposerModel;
import com.coremedia.blueprint.social.beans.ComposerModelImpl;
import com.coremedia.blueprint.social.beans.MediaItem;
import com.coremedia.cap.common.IdHelper;
import com.coremedia.cap.common.SESSION;
import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentType;
import com.coremedia.cms.editor.sdk.editorContext;
import com.coremedia.cms.editor.sdk.sites.Site;
import com.coremedia.cms.editor.sdk.sites.SitesService;
import com.coremedia.ui.data.Blob;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.data.beanFactory;
import com.coremedia.ui.data.impl.RemoteServiceMethod;
import com.coremedia.ui.data.impl.RemoteServiceMethodResponse;

import mx.resources.ResourceBundle;
import mx.resources.ResourceManager;

public class SocialHubServiceImpl implements ISocialHubService {
  private var hubExpression:ValueExpression;

  public*/ function getAdaptersExpression()/*:ValueExpression*/ {
    if (!this.hubExpression$cLGz) {
      this.hubExpression$cLGz = com.coremedia.ui.data.ValueExpressionFactory.createFromFunction(function ()/*:SocialHubAdapters*/ {
        var siteService/*:SitesService*/ = com.coremedia.cms.editor.sdk.editorContext.getSitesService();
        var preferredSite/*:Site*/ = siteService.getPreferredSite();
        if (preferredSite) {
          return AS3.as( com.coremedia.ui.data.beanFactory.getRemoteBean("socialhub/adapters/" + preferredSite.getId()),  com.coremedia.blueprint.social.beans.SocialHubAdaptersImpl);
        }

        return null;
      });
    }

    return this.hubExpression$cLGz;
  }/*


  public*/ function getMediaType(content/*:Content*/)/*:String*/ {
    var blobProperty/*:String*/ = mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHubSettings', 'social_hub_content_blob_property');
    var blob/*:Blob*/ = content.getProperties().get(blobProperty);
    if(blob) {
      if(!blob.isLoaded()) {
        blob.loadData();
        return undefined;
      }

      var contentType/*:String*/ = blob.getContentType();
      if(contentType.indexOf(com.coremedia.blueprint.social.beans.MediaItem.TYPE_IMAGE) !== -1) {
        return com.coremedia.blueprint.social.beans.MediaItem.TYPE_IMAGE;
      }

      if(contentType.indexOf(com.coremedia.blueprint.social.beans.MediaItem.TYPE_VIDEO) !== -1) {
        return com.coremedia.blueprint.social.beans.MediaItem.TYPE_VIDEO;
      }
    }

    return null;
  }/*

  public*/ function getComposerModel(adapterId/*:String*/)/*:ComposerModel*/ {
    var uriPath/*:String*/ = com.coremedia.cap.common.SESSION.getUser().getUriPath();
    var userId/*:String*/ = uriPath.substr(uriPath.lastIndexOf('/') + 1, uriPath.length);
    var model/*:ComposerModelImpl*/ =AS3.as( com.coremedia.ui.data.beanFactory.getRemoteBean('socialhub/composermodel/' + userId + '/' + adapterId),  com.coremedia.blueprint.social.beans.ComposerModelImpl);
    if (!model.isLoaded()) {
      model.load();
    }
    return model;
  }/*


  public*/ function initComposerModel(adapterId/*:String*/, contents/*:Array*/, callback/*:Function*/)/*:void*/ {var this$=this;
    var uriPath/*:String*/ = com.coremedia.cap.common.SESSION.getUser().getUriPath();
    var userId/*:String*/ = uriPath.substr(uriPath.lastIndexOf('/') + 1, uriPath.length);
    var contentIds/*:Array*/ = [];
    for/* each*/(var $1=0;$1</* in*/ contents.length;++$1) {var c/*:Content*/ =contents[$1];
      contentIds.push(com.coremedia.cap.common.IdHelper.parseContentId(c));
    }
    var idParam/*:String*/ = contentIds.join(",");
    var method/*:RemoteServiceMethod*/ = new com.coremedia.ui.data.impl.RemoteServiceMethod('socialhub/composermodel/' + userId + '/' + adapterId + '/compose', 'POST');
    method.request(
            {
              'contentIds': idParam
            },
            function (response/*:RemoteServiceMethodResponse*/)/*:void*/ {
              var result/*:String*/ = response.response.responseText;
              var cm/*:ComposerModelImpl*/ =AS3.as( this$.getComposerModel(adapterId),  com.coremedia.blueprint.social.beans.ComposerModelImpl);
              cm.invalidate(callback);
            },
            function (response/*:RemoteServiceMethodResponse*/)/*:void*/ {
              callback(response.getError());
            }
    );
  }/*
}*/function SocialHubServiceImpl$() {}/*
}

============================================== Jangaroo part ==============================================*/
    return {
      mixins: ["com.coremedia.blueprint.social.ISocialHubService"],
      hubExpression$cLGz: null,
      getAdaptersExpression: getAdaptersExpression,
      getMediaType: getMediaType,
      getComposerModel: getComposerModel,
      initComposerModel: initComposerModel,
      constructor: SocialHubServiceImpl$,
      requires: [
        "com.coremedia.blueprint.social.ISocialHubService",
        "com.coremedia.cap.common.IdHelper",
        "com.coremedia.cap.common.SESSION",
        "com.coremedia.cms.editor.sdk.editorContext",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.data.beanFactory",
        "com.coremedia.ui.data.impl.RemoteServiceMethod",
        "mx.resources.ResourceManager"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.ComposerModelImpl",
        "com.coremedia.blueprint.social.beans.MediaItem",
        "com.coremedia.blueprint.social.beans.SocialHubAdaptersImpl"
      ]
    };
});
