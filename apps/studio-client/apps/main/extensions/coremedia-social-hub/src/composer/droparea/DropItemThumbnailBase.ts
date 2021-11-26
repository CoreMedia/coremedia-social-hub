import Config from "@jangaroo/runtime/Config";
import { as, asConfig, bind, cast } from "@jangaroo/runtime";
import DropContainer from "./DropContainer";
import DropItem from "./DropItem";
import DropItemThumbnail from "./DropItemThumbnail";
import Upload_properties from "@coremedia/studio-client.cap-base-models/upload/Upload_properties";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import EventUtil from "@coremedia/studio-client.client-core/util/EventUtil";
import IconDisplayField from "@coremedia/studio-client.ext.ui-components/components/IconDisplayField";
import ImageComponent from "@coremedia/studio-client.ext.ui-components/components/ImageComponent";
import OverflowBehaviour from "@coremedia/studio-client.ext.ui-components/mixins/OverflowBehaviour";
import TextAlign from "@coremedia/studio-client.ext.ui-components/mixins/TextAlign";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import IconDisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/IconDisplayFieldSkin";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import Ext from "@jangaroo/ext-ts";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import Element from "@jangaroo/ext-ts/dom/Element";
import CenterLayout from "@jangaroo/ext-ts/layout/container/Center";
import int from "@jangaroo/runtime/int";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface DropItemThumbnailBaseConfig extends Config<Container>, Partial<Pick<DropItemThumbnailBase,
  "dropItem"
>> {
}



class DropItemThumbnailBase extends Container {
  declare Config: DropItemThumbnailBaseConfig;
  /**
   * Preview container for images and and documents without preview but text
   */
  static readonly PREVIEW_WIDTH:int = 120;
  static readonly PREVIEW_HEIGHT:int = 90;
  protected static readonly PREVIEW_CONTAINER_BORDER_WIDTH:int = 2;
  protected static readonly STANDARD_GRID_100:int = 6;


  dropItem:DropItem = null;

  constructor(config:Config<DropItemThumbnailBase> = null) {
    super(config);
  }

  protected override afterRender():void {
    super.afterRender();

    this.getEl().on("mouseover",bind( this,this.#onMouseOver));
    this.getEl().on("mouseleave",bind( this,this.#onMouseLeave));

    var previewContainer =as( this.queryById(DropItemThumbnail.PREVIEW_ITEM_ID),  Container);
    previewContainer.hide();
    previewContainer.setDisabled(true);

    ValueExpressionFactory.createFromFunction(():string => {
      var url = editorContext._.getThumbnailUri(this.dropItem.getContent());
      if (url === undefined) {
        return undefined;
      }

      return url;
    }).loadValue((url:string):void => {
      var image:ImageComponent = Ext.create(ImageComponent, {});
      image.setSrc(url);
      image.setStyle("max-height:" + (DropItemThumbnailBase.PREVIEW_HEIGHT - DropItemThumbnailBase.PREVIEW_CONTAINER_BORDER_WIDTH) + "px; max-width:" + (DropItemThumbnailBase.PREVIEW_WIDTH - DropItemThumbnailBase.PREVIEW_CONTAINER_BORDER_WIDTH -2) + "px;");
      previewContainer.add(image);
      var imgEl = image.getEl();
      var layout = cast(CenterLayout,previewContainer.getLayout());
      previewContainer.updateLayout();
      EventUtil.invokeLater(():void => {
        previewContainer.show();
      });
    });
  }

  #getRemoveButton():Button {
    return as( this.queryById("remove"),  Button);
  }

  #onMouseOver():void {
    this.setUI(ContainerSkin.SELECTED_100.getSkin());
    this.#getRemoveButton().show();
  }

  #onMouseLeave():void {
    this.setUI(ContainerSkin.GRID_100.getSkin());
    this.#getRemoveButton().hide();
  }

  protected static formatName(name:string):string {
    if (name.length > 10) {
      return name.substr(0, 9) + "...";
    }
    return name;
  }

  removeThumbnail():void {
    var dropContainer =as( this.findParentByType(DropContainer.xtype),  DropContainer);
    dropContainer.removeDropItem(this.dropItem);
  }

  /**
   * The UI for non-previewable upload items
   */
  #setEmptyPreview():void {
    var previewContainer =as( this.queryById("preview"),  Container);
    var text:IconDisplayField = Ext.create(IconDisplayField, {});
    asConfig(text).value = Upload_properties.Upload_mimetype_text;
    text.ui = IconDisplayFieldSkin.EMBEDDED.getSkin();
    asConfig(text).maxWidth = DropItemThumbnailBase.PREVIEW_WIDTH - (DropItemThumbnailBase.STANDARD_GRID_100 * 2);
    text.textAlign = TextAlign.CENTER;
    text.overflowBehaviour = OverflowBehaviour.BREAK_WORD;
    text.scale = "medium";
    text.setFieldStyle("padding-top: 0");
    previewContainer.add(text);
    previewContainer.updateLayout();
  }

}
export default DropItemThumbnailBase;
