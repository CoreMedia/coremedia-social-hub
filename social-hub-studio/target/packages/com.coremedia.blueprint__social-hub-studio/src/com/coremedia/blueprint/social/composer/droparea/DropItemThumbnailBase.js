Ext.define("com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase", function(DropItemThumbnailBase) {/*package com.coremedia.blueprint.social.composer.droparea {
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
   * /
  public static const PREVIEW_WIDTH:int = 120;
  public static const PREVIEW_HEIGHT:int = 90;
  protected static const PREVIEW_CONTAINER_BORDER_WIDTH:int = 2;
  protected static const STANDARD_GRID_100:int = 6;


  [Bindable]
  public var dropItem:DropItem;

  public*/ function DropItemThumbnailBase$(config/*:DropItemThumbnailBase = null*/) {if(arguments.length<=0)config=null;
    this.super$QO57(config);
  }/*

  override protected*/ function afterRender()/*:void*/ {var this$=this;
    Ext.container.Container.prototype.afterRender.call(this);

    this.getEl().on('mouseover',AS3.bind( this,"onMouseOver$QO57"));
    this.getEl().on('mouseleave',AS3.bind( this,"onMouseLeave$QO57"));

    var previewContainer/*:Container*/ =AS3.as( this.queryById(com.coremedia.blueprint.social.composer.droparea.DropItemThumbnail.PREVIEW_ITEM_ID),  Ext.container.Container);
    previewContainer.hide();
    previewContainer.setDisabled(true);

    com.coremedia.ui.data.ValueExpressionFactory.createFromFunction(function ()/*:String*/ {
      var url/*:String*/ = com.coremedia.cms.editor.sdk.editorContext.getThumbnailUri(AS3.getBindable(this$,"dropItem").getContent());
      if (url === undefined) {
        return undefined;
      }

      return url;
    }).loadValue(function (url/*:String*/)/*:void*/ {
      var image/*:Image*/ = Ext.create(com.coremedia.ui.components.Image, {});
      image.setSrc(url);
      image.setStyle("max-height:" + (DropItemThumbnailBase.PREVIEW_HEIGHT - DropItemThumbnailBase.PREVIEW_CONTAINER_BORDER_WIDTH) + "px; max-width:" + (DropItemThumbnailBase.PREVIEW_WIDTH - DropItemThumbnailBase.PREVIEW_CONTAINER_BORDER_WIDTH -2) + "px;");
      previewContainer.add(image);
      var imgEl/*:Element*/ = image.getEl();
      var layout/*:CenterLayout*/ = AS3.cast(Ext.layout.container.Center,previewContainer.getLayout());
      previewContainer.updateLayout();
      com.coremedia.ui.util.EventUtil.invokeLater(function ()/*:void*/ {
        previewContainer.show();
      });
    });
  }/*

  private*/ function getRemoveButton()/*:Button*/ {
    return AS3.as( this.queryById('remove'),  Ext.button.Button);
  }/*

  private*/ function onMouseOver()/*:void*/ {
    this.setUI(com.coremedia.ui.skins.ContainerSkin.SELECTED_100.getSkin());
    this.getRemoveButton$QO57().show();
  }/*

  private*/ function onMouseLeave()/*:void*/ {
    this.setUI(com.coremedia.ui.skins.ContainerSkin.GRID_100.getSkin());
    this.getRemoveButton$QO57().hide();
  }/*

  protected static*/ function formatName$static(name/*:String*/)/*:String*/ {
    if (name.length > 10) {
      return name.substr(0, 9) + "...";
    }
    return name;
  }/*

  public*/ function removeThumbnail()/*:void*/ {
    var dropContainer/*:DropContainer*/ =AS3.as( this.findParentByType(com.coremedia.blueprint.social.composer.droparea.DropContainer.xtype),  com.coremedia.blueprint.social.composer.droparea.DropContainer);
    dropContainer.removeDropItem(AS3.getBindable(this,"dropItem"));
  }/*

  /**
   * The UI for non-previewable upload items
   * /
  private*/ function setEmptyPreview()/*:void*/ {
    var previewContainer/*:Container*/ =AS3.as( this.queryById('preview'),  Ext.container.Container);
    var text/*:IconDisplayField*/ = Ext.create(com.coremedia.ui.components.IconDisplayField, {});
    AS3.setBindable(text,"value" , mx.resources.ResourceManager.getInstance().getString('com.coremedia.cms.editor.sdk.upload.Upload', 'Upload_mimetype_text'));
    text.ui = com.coremedia.ui.skins.IconDisplayFieldSkin.EMBEDDED.getSkin();
    AS3.setBindable(text,"maxWidth" , DropItemThumbnailBase.PREVIEW_WIDTH - (DropItemThumbnailBase.STANDARD_GRID_100 * 2));
    AS3.setBindable(text,"textAlign" , com.coremedia.ui.mixins.TextAlign.CENTER);
    AS3.setBindable(text,"overflowBehaviour" , com.coremedia.ui.mixins.OverflowBehaviour.BREAK_WORD);
    AS3.setBindable(text,"scale" , "medium");
    text.setFieldStyle("padding-top: 0");
    previewContainer.add(text);
    previewContainer.updateLayout();
  }/*

}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      constructor: DropItemThumbnailBase$,
      super$QO57: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      getRemoveButton$QO57: getRemoveButton,
      onMouseOver$QO57: onMouseOver,
      onMouseLeave$QO57: onMouseLeave,
      removeThumbnail: removeThumbnail,
      setEmptyPreview$QO57: setEmptyPreview,
      config: {dropItem: null},
      statics: {
        PREVIEW_WIDTH: 120,
        PREVIEW_HEIGHT: 90,
        PREVIEW_CONTAINER_BORDER_WIDTH: 2,
        STANDARD_GRID_100: 6,
        formatName: formatName$static
      },
      requires: [
        "Ext",
        "Ext.button.Button",
        "Ext.container.Container",
        "Ext.layout.container.Center",
        "com.coremedia.cms.editor.sdk.editorContext",
        "com.coremedia.ui.components.IconDisplayField",
        "com.coremedia.ui.components.Image",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.mixins.OverflowBehaviour",
        "com.coremedia.ui.mixins.TextAlign",
        "com.coremedia.ui.skins.ContainerSkin",
        "com.coremedia.ui.skins.IconDisplayFieldSkin",
        "com.coremedia.ui.util.EventUtil",
        "mx.resources.ResourceManager"
      ],
      uses: [
        "com.coremedia.blueprint.social.composer.droparea.DropContainer",
        "com.coremedia.blueprint.social.composer.droparea.DropItemThumbnail"
      ]
    };
});
