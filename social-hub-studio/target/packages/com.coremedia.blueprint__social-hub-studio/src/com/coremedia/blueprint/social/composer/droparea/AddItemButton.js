Ext.define("com.coremedia.blueprint.social.composer.droparea.AddItemButton", function(AddItemButton) {/*package com.coremedia.blueprint.social.composer.droparea{
import com.coremedia.blueprint.social.composer.droparea.*;
import net.jangaroo.ext.Exml;
import com.coremedia.ui.components.IconButton;
import com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin;
import ext.layout.container.CenterLayout;
public class AddItemButton extends AddItemButtonBase{

    import com.coremedia.ui.skins.ContainerSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.addItemButton";
    public static const ITEM_ID:String = "addItemButton";
    public static const BUTTON_ITEM_ID:String = "browserFileIconButton";

    public*/function AddItemButton$(config/*:AddItemButton = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.droparea.AddItemButtonBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.droparea.AddItemButtonBase,{});
    var defaults_$1/*:AddItemButton*/ =AS3.cast(AddItemButton,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    config_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ContainerSkin.GRID_100.getSkin());
    AS3.setBindable(config_$1,"width" , 120);
    AS3.setBindable(config_$1,"height" , 90);
    config_$1.itemId =net.jangaroo.ext.Exml.asString( AddItemButton.ITEM_ID);
    AS3.setBindable(config_$1,"style" , "border-width: 3px;border-style: dashed;border-color: #ccc;margin-left: 6px; margin-right: 6px; margin-top: 6px; cursor:pointer;");
    var ui_IconButton_25_5_$1/*:com.coremedia.ui.components.IconButton*/ =AS3.cast(com.coremedia.ui.components.IconButton,{});
    AS3.setBindable(ui_IconButton_25_5_$1,"text" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'upload_button_text')));
    AS3.setBindable(ui_IconButton_25_5_$1,"handler" , AS3.getBindable(config,"uploadButtonHandler"));
    AS3.setBindable(ui_IconButton_25_5_$1,"style" , "margin-top: -3px;-webkit-text-fill-color: #ccc;");
    ui_IconButton_25_5_$1.itemId =net.jangaroo.ext.Exml.asString( AddItemButton.BUTTON_ITEM_ID);
    AS3.setBindable(ui_IconButton_25_5_$1,"scale" , "small");
    AS3.setBindable(ui_IconButton_25_5_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.icons.CoreIcons', 'add')));
    var editor_BrowsePlugin_33_9_$1/*:com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin*/ =AS3.cast(com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin,{});
    AS3.setBindable(editor_BrowsePlugin_33_9_$1,"enableFileDrop" , true);
    AS3.setBindable(editor_BrowsePlugin_33_9_$1,"multiple" , true);
    AS3.setBindable(editor_BrowsePlugin_33_9_$1,"dropEl" , this.el);
    ui_IconButton_25_5_$1.plugins = [editor_BrowsePlugin_33_9_$1];
    config_$1.items = [ui_IconButton_25_5_$1];
    var layout_Center_41_5_$1/*:ext.layout.container.CenterLayout*/ =AS3.cast(Ext.layout.container.Center,{});
    AS3.setBindable(config_$1,"layout" , layout_Center_41_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$URAI(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.droparea.AddItemButtonBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.addItemButton",
      constructor: AddItemButton$,
      super$URAI: function() {
        com.coremedia.blueprint.social.composer.droparea.AddItemButtonBase.prototype.constructor.apply(this, arguments);
      },
      statics: {
        ITEM_ID: "addItemButton",
        BUTTON_ITEM_ID: "browserFileIconButton"
      },
      requires: [
        "Ext.layout.container.Center",
        "com.coremedia.blueprint.social.composer.droparea.AddItemButtonBase",
        "com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin",
        "com.coremedia.ui.components.IconButton",
        "com.coremedia.ui.skins.ContainerSkin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
