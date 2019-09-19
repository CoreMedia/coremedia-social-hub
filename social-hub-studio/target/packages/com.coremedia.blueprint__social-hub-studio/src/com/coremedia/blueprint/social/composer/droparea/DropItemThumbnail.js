Ext.define("com.coremedia.blueprint.social.composer.droparea.DropItemThumbnail", function(DropItemThumbnail) {/*package com.coremedia.blueprint.social.composer.droparea{
import com.coremedia.blueprint.social.composer.droparea.*;
import net.jangaroo.ext.Exml;
import ext.container.Container;
import ext.layout.container.CenterLayout;
import ext.form.field.DisplayField;
import com.coremedia.ui.components.IconButton;
import ext.layout.container.HBoxLayout;
import ext.layout.container.VBoxLayout;
public class DropItemThumbnail extends DropItemThumbnailBase{

    import com.coremedia.ui.skins.ContainerSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.dropItemContainer";
    public static const PREVIEW_ITEM_ID:String = "preview";

    public*/function DropItemThumbnail$(config/*:DropItemThumbnail = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase,{});
    var defaults_$1/*:DropItemThumbnail*/ =AS3.cast(DropItemThumbnail,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"width" , com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase.PREVIEW_WIDTH);
    config_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ContainerSkin.GRID_100.getSkin());
    var container_18_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_18_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ContainerSkin.FRAME.getSkin());
    container_18_5_$1.itemId =net.jangaroo.ext.Exml.asString( DropItemThumbnail.PREVIEW_ITEM_ID);
    AS3.setBindable(container_18_5_$1,"style" , "background-color:#f1f1f1;");
    AS3.setBindable(container_18_5_$1,"width" , com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase.PREVIEW_WIDTH);
    AS3.setBindable(container_18_5_$1,"height" , com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase.PREVIEW_HEIGHT);
    container_18_5_$1.items = [];
    var layout_Center_26_9_$1/*:ext.layout.container.CenterLayout*/ =AS3.cast(Ext.layout.container.Center,{});
    AS3.setBindable(container_18_5_$1,"layout" , layout_Center_26_9_$1);
    var container_29_5_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    var displayField_31_9_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_31_9_$1,"value" , com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase.formatName(AS3.getBindable(config,"dropItem").getName()));
    var container_32_9_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_32_9_$1.flex = 1.0;
    var ui_IconButton_33_9_$1/*:com.coremedia.ui.components.IconButton*/ =AS3.cast(com.coremedia.ui.components.IconButton,{});
    ui_IconButton_33_9_$1.itemId = "remove";
    AS3.setBindable(ui_IconButton_33_9_$1,"hidden" , true);
    AS3.setBindable(ui_IconButton_33_9_$1,"text" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'delete_attachment_text')));
    AS3.setBindable(ui_IconButton_33_9_$1,"tooltip" , this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'delete_attachment_text'));
    AS3.setBindable(ui_IconButton_33_9_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.icons.CoreIcons', 'trash_bin')));
    AS3.setBindable(ui_IconButton_33_9_$1,"handler" ,AS3.bind( this,"removeThumbnail"));
    container_29_5_$1.items = [displayField_31_9_$1, container_32_9_$1, ui_IconButton_33_9_$1];
    var layout_HBox_41_9_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_41_9_$1,"align" , "stretch");
    AS3.setBindable(container_29_5_$1,"layout" , layout_HBox_41_9_$1);
    config_$1.items = [container_18_5_$1, container_29_5_$1];
    var layout_VBox_46_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_46_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_46_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$ng5M(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.dropItemContainer",
      constructor: DropItemThumbnail$,
      super$ng5M: function() {
        com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase.prototype.constructor.apply(this, arguments);
      },
      statics: {PREVIEW_ITEM_ID: "preview"},
      requires: [
        "Ext.container.Container",
        "Ext.form.field.Display",
        "Ext.layout.container.Center",
        "Ext.layout.container.HBox",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase",
        "com.coremedia.ui.components.IconButton",
        "com.coremedia.ui.skins.ContainerSkin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
