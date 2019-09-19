Ext.define("com.coremedia.blueprint.social.beans.MediaItem", function(MediaItem) {/*package com.coremedia.blueprint.social.beans {
import com.coremedia.blueprint.social.socialHubService;
import com.coremedia.cap.content.Content;
import com.coremedia.cms.editor.sdk.editorContext;
import com.coremedia.cms.editor.sdk.util.ImageLinkListRenderer;
import com.coremedia.ui.models.bem.BEMModifier;
import com.coremedia.ui.util.ThumbnailImage;

public class MediaItem {
  private static const*/var THUMBNAIL_IMAGE_MODIFIER_LINK_LIST$static/*:BEMModifier*/;/* =*/function THUMBNAIL_IMAGE_MODIFIER_LINK_LIST$static_(){THUMBNAIL_IMAGE_MODIFIER_LINK_LIST$static=( com.coremedia.ui.util.ThumbnailImage.BLOCK.createModifier("link-list"));};/*

  public static const TYPE_VIDEO:String = "video";
  public static const TYPE_IMAGE:String = "image";

  private var stateLoaded:Boolean = false;
  private var values:Object;

  public static*/ function fromObject$static(values/*:Object*/)/*:MediaItem*/ {
    if (AS3.is(values,  com.coremedia.cap.content.Content)) {
      return MediaItem.fromContent(AS3.as(values,  com.coremedia.cap.content.Content));
    }

    var item/*:MediaItem*/ = new MediaItem();
    item.values$2ZHy = values;
    return item;
  }/*

  public static*/ function fromContent$static(content/*:Content*/)/*:MediaItem*/ {
    var item/*:MediaItem*/ = new MediaItem();
    item.values$2ZHy = {};

    item.values$2ZHy.content = content;

    if (content.isLoaded()) {
      item.values$2ZHy.url = com.coremedia.cms.editor.sdk.editorContext.getThumbnailImage(content, com.coremedia.cms.editor.sdk.util.ImageLinkListRenderer.DEFAULT_CROPPING);

      var mediaType/*:String*/ = com.coremedia.blueprint.social.socialHubService.getMediaType(content);
      item.values$2ZHy.type = mediaType;
      item.stateLoaded$2ZHy = true;
      if (mediaType === undefined) {
        item.stateLoaded$2ZHy = false;
      }
    }
    return item;
  }/*

  public*/ function isLoaded()/*:Boolean*/ {
    return this.stateLoaded$2ZHy;
  }/*

  public*/ function load(callback/*:Function = undefined*/)/*:void*/ {var this$=this;
    if (this.values$2ZHy.content) {
      this.values$2ZHy.content.load(function (loadedContent/*:Content*/)/*:void*/ {
        this$.values$2ZHy.type = com.coremedia.blueprint.social.socialHubService.getMediaType(loadedContent);
        this$.values$2ZHy.url = com.coremedia.cms.editor.sdk.editorContext.getThumbnailUri(loadedContent);
        this$.stateLoaded$2ZHy = true;
        if (callback) {
          callback(this);
        }
      });
    }
    else if (callback) {
      this.stateLoaded$2ZHy = true;
      callback(this);
    }
  }/*

  public*/ function render()/*:String*/ {
    var thumbnailImage/*:ThumbnailImage*/ = com.coremedia.cms.editor.sdk.editorContext.getThumbnailImage(this.values$2ZHy.content, com.coremedia.cms.editor.sdk.util.ImageLinkListRenderer.DEFAULT_CROPPING);
    return thumbnailImage.render(THUMBNAIL_IMAGE_MODIFIER_LINK_LIST$static.getCSSClass());
  }/*

  public*/ function getUrl()/*:String*/ {
    return this.values$2ZHy.url;
  }/*

  public*/ function getType()/*:String*/ {
    return this.values$2ZHy.type;
  }/*

  public*/ function getText()/*:String*/ {
    return this.values$2ZHy.text;
  }/*

  public*/ function getId()/*:String*/ {
    return this.values$2ZHy.id;
  }/*
}*/function MediaItem$() {}/*
}

============================================== Jangaroo part ==============================================*/
    return {
      stateLoaded$2ZHy: false,
      values$2ZHy: null,
      isLoaded: isLoaded,
      load: load,
      render: render,
      getUrl: getUrl,
      getType: getType,
      getText: getText,
      getId: getId,
      constructor: MediaItem$,
      statics: {
        THUMBNAIL_IMAGE_MODIFIER_LINK_LIST: undefined,
        TYPE_VIDEO: "video",
        TYPE_IMAGE: "image",
        fromObject: fromObject$static,
        fromContent: fromContent$static,
        __initStatics__: function() {
          THUMBNAIL_IMAGE_MODIFIER_LINK_LIST$static_();
        }
      },
      requires: [
        "com.coremedia.cap.content.Content",
        "com.coremedia.cms.editor.sdk.editorContext",
        "com.coremedia.cms.editor.sdk.util.ImageLinkListRenderer",
        "com.coremedia.ui.util.ThumbnailImage"
      ],
      uses: ["com.coremedia.blueprint.social.socialHubService"]
    };
});
