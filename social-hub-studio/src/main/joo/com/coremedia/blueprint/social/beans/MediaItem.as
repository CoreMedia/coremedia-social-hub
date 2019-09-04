package com.coremedia.blueprint.social.beans {
import com.coremedia.blueprint.social.socialHubService;
import com.coremedia.cap.content.Content;
import com.coremedia.cms.editor.sdk.editorContext;
import com.coremedia.cms.editor.sdk.util.ImageLinkListRenderer;
import com.coremedia.ui.models.bem.BEMModifier;
import com.coremedia.ui.util.ThumbnailImage;

public class MediaItem {
  private static const THUMBNAIL_IMAGE_MODIFIER_LINK_LIST:BEMModifier = ThumbnailImage.BLOCK.createModifier("link-list");

  public static const TYPE_VIDEO:String = "video";
  public static const TYPE_IMAGE:String = "image";

  private var stateLoaded:Boolean = false;
  private var values:Object;

  public static function fromObject(values:Object):MediaItem {
    if (values is Content) {
      return fromContent(values as Content);
    }

    var item:MediaItem = new MediaItem();
    item.values = values;
    return item;
  }

  public static function fromContent(content:Content):MediaItem {
    var item:MediaItem = new MediaItem();
    item.values = {};

    item.values.content = content;

    if (content.isLoaded()) {
      item.values.url = editorContext.getThumbnailImage(content, ImageLinkListRenderer.DEFAULT_CROPPING);

      var mediaType:String = socialHubService.getMediaType(content);
      item.values.type = mediaType;
      item.stateLoaded = true;
      if (mediaType === undefined) {
        item.stateLoaded = false;
      }
    }
    return item;
  }

  public function isLoaded():Boolean {
    return stateLoaded;
  }

  public function load(callback:Function = undefined):void {
    if (values.content) {
      values.content.load(function (loadedContent:Content):void {
        values.type = socialHubService.getMediaType(loadedContent);
        values.url = editorContext.getThumbnailUri(loadedContent);
        stateLoaded = true;
        if (callback) {
          callback(this);
        }
      });
    }
    else if (callback) {
      stateLoaded = true;
      callback(this);
    }
  }

  public function render():String {
    var thumbnailImage:ThumbnailImage = editorContext.getThumbnailImage(values.content, ImageLinkListRenderer.DEFAULT_CROPPING);
    return thumbnailImage.render(THUMBNAIL_IMAGE_MODIFIER_LINK_LIST.getCSSClass());
  }

  public function getUrl():String {
    return values.url;
  }

  public function getType():String {
    return values.type;
  }

  public function getText():String {
    return values.text;
  }

  public function getId():String {
    return values.id;
  }
}
}
