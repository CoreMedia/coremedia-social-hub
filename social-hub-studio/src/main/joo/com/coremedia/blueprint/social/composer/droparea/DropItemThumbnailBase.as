package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.cms.editor.sdk.editorContext;
import com.coremedia.ui.components.IconDisplayField;
import com.coremedia.ui.components.Image;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.mixins.OverflowBehaviour;
import com.coremedia.ui.mixins.TextAlign;
import com.coremedia.ui.skins.ContainerSkin;
import com.coremedia.ui.skins.IconDisplayFieldSkin;
import com.coremedia.ui.util.EventUtil;

import ext.Ext;
import ext.button.Button;
import ext.container.Container;
import ext.dom.Element;
import ext.layout.container.CenterLayout;

import mx.resources.ResourceManager;

public class DropItemThumbnailBase extends Container {
  /**
   * Preview container for images and and documents without preview but text
   */
  public static const PREVIEW_WIDTH:int = 120;
  public static const PREVIEW_HEIGHT:int = 90;
  protected static const PREVIEW_CONTAINER_BORDER_WIDTH:int = 2;
  protected static const STANDARD_GRID_100:int = 6;


  [Bindable]
  public var dropItem:DropItem;

  public function DropItemThumbnailBase(config:DropItemThumbnailBase = null) {
    super(config);
  }

  override protected function afterRender():void {
    super.afterRender();

    this.getEl().on('mouseover', onMouseOver);
    this.getEl().on('mouseleave', onMouseLeave);

    var previewContainer:Container = queryById(DropItemThumbnail.PREVIEW_ITEM_ID) as Container;
    previewContainer.hide();
    previewContainer.setDisabled(true);

    ValueExpressionFactory.createFromFunction(function ():String {
      var url:String = editorContext.getThumbnailUri(dropItem.getContent());
      if (url === undefined) {
        return undefined;
      }

      return url;
    }).loadValue(function (url:String):void {
      var image:Image = Ext.create(Image, {});
      image.setSrc(url);
      image.setStyle("max-height:" + (PREVIEW_HEIGHT - PREVIEW_CONTAINER_BORDER_WIDTH) + "px; max-width:" + (PREVIEW_WIDTH - PREVIEW_CONTAINER_BORDER_WIDTH -2) + "px;");
      previewContainer.add(image);
      var imgEl:Element = image.getEl();
      var layout:CenterLayout = CenterLayout(previewContainer.getLayout());
      previewContainer.updateLayout();
      EventUtil.invokeLater(function ():void {
        previewContainer.show();
      });
    });
  }

  private function getRemoveButton():Button {
    return queryById('remove') as Button;
  }

  private function onMouseOver():void {
    setUI(ContainerSkin.SELECTED_100.getSkin());
    getRemoveButton().show();
  }

  private function onMouseLeave():void {
    setUI(ContainerSkin.GRID_100.getSkin());
    getRemoveButton().hide();
  }

  protected static function formatName(name:String):String {
    if (name.length > 10) {
      return name.substr(0, 9) + "...";
    }
    return name;
  }

  public function removeThumbnail():void {
    var dropContainer:DropContainer = findParentByType(DropContainer.xtype) as DropContainer;
    dropContainer.removeDropItem(dropItem);
  }

  /**
   * The UI for non-previewable upload items
   */
  private function setEmptyPreview():void {
    var previewContainer:Container = queryById('preview') as Container;
    var text:IconDisplayField = Ext.create(IconDisplayField, {});
    text.value = ResourceManager.getInstance().getString('com.coremedia.cms.editor.sdk.upload.Upload', 'Upload_mimetype_text');
    text.ui = IconDisplayFieldSkin.EMBEDDED.getSkin();
    text.maxWidth = PREVIEW_WIDTH - (STANDARD_GRID_100 * 2);
    text.textAlign = TextAlign.CENTER;
    text.overflowBehaviour = OverflowBehaviour.BREAK_WORD;
    text.scale = "medium";
    text.setFieldStyle("padding-top: 0");
    previewContainer.add(text);
    previewContainer.updateLayout();
  }

}
}