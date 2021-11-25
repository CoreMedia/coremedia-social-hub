import { as, is } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";
import socialHubService from "../socialHubService";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ImageLinkListRenderer from "@coremedia/studio-client.ext.content-link-list-components/util/ImageLinkListRenderer";
import BEMModifier from "@coremedia/studio-client.ext.ui-components/models/bem/BEMModifier";
import ThumbnailImage from "@coremedia/studio-client.ext.ui-components/util/ThumbnailImage";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";


class MediaItem {
  static readonly #THUMBNAIL_IMAGE_MODIFIER_LINK_LIST:BEMModifier = ThumbnailImage.BLOCK.createModifier("link-list");

  static readonly TYPE_VIDEO:string = "video";
  static readonly TYPE_IMAGE:string = "image";

  #stateLoaded:boolean = false;
  #values:any = null;

  static fromObject(values:any):MediaItem {
    if (is(values,  Content)) {
      return MediaItem.fromContent(as(values,  Content));
    }

    var item = new MediaItem();
    item.#values = values;
    return item;
  }

  static fromContent(content:Content):MediaItem {
    var item = new MediaItem();
    item.#values = {};

    item.#values.content = content;

    if (content.isLoaded()) {
      item.#values.url = editorContext._.getThumbnailImage(content, ImageLinkListRenderer.DEFAULT_CROPPING);

      var mediaType = socialHubService.getMediaType(content);
      item.#values.type = mediaType;
      item.#stateLoaded = true;
      if (mediaType === undefined) {
        item.#stateLoaded = false;
      }
    }
    return item;
  }

  isLoaded():boolean {
    return this.#stateLoaded;
  }

  load(callback?:AnyFunction):void {const this$=this;
    if (this.#values.content) {
      this.#values.content.load(function (loadedContent:Content):void {
        this$.#values.type = socialHubService.getMediaType(loadedContent);
        this$.#values.url = editorContext._.getThumbnailUri(loadedContent);
        this$.#stateLoaded = true;
        if (callback) {
          callback(this);
        }
      });
    }
    else if (callback) {
      this.#stateLoaded = true;
      callback(this);
    }
  }

  render():string {
    var thumbnailImage = editorContext._.getThumbnailImage(this.#values.content, ImageLinkListRenderer.DEFAULT_CROPPING);
    return thumbnailImage.render(MediaItem.#THUMBNAIL_IMAGE_MODIFIER_LINK_LIST.getCSSClass());
  }

  getUrl():string {
    return this.#values.url;
  }

  getType():string {
    return this.#values.type;
  }

  getText():string {
    return this.#values.text;
  }

  getId():string {
    return this.#values.id;
  }
}
export default MediaItem;
