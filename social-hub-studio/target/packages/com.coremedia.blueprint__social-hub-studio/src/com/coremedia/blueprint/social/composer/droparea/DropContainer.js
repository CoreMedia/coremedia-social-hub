Ext.define("com.coremedia.blueprint.social.composer.droparea.DropContainer", function(DropContainer) {/*package com.coremedia.blueprint.social.composer.droparea{
import com.coremedia.ui.plugins.*;
import com.coremedia.blueprint.social.composer.droparea.*;
import net.jangaroo.ext.Exml;
import ext.form.field.DisplayField;
import ext.container.Container;
import ext.button.Button;
import com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin;
import ext.layout.container.VBoxLayout;
import ext.layout.container.ColumnLayout;
import ext.layout.container.HBoxLayout;
import com.coremedia.cms.editor.sdk.upload.FileDropPlugin;
public class DropContainer extends DropContainerBase{

    import com.coremedia.ui.skins.ButtonSkin;
    import com.coremedia.ui.skins.ContainerSkin;
    import com.coremedia.ui.skins.DisplayFieldSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.editor.assetlist";

    public*/function DropContainer$(config/*:DropContainer = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.droparea.DropContainerBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.droparea.DropContainerBase,{});
    var defaults_$1/*:DropContainer*/ =AS3.cast(DropContainer,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"minHeight" , 160.0);
    var displayField_21_5_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_21_5_$1,"value" , AS3.getBindable(config,"property").getDisplayName());
    displayField_21_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.DisplayFieldSkin.BOLD.getSkin());
    var container_22_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_22_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ContainerSkin.FRAME_GRID_200.getSkin());
    var container_24_9_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_24_9_$1.flex = 1.0;
    var container_26_13_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_26_13_$1,"height" , 30);
    var button_27_13_$1/*:ext.button.Button*/ =AS3.cast(Ext.button.Button,{});
    AS3.setBindable(button_27_13_$1,"text" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'upload_button_text')));
    AS3.setBindable(button_27_13_$1,"handler" ,AS3.bind( this,"uploadButtonHandler"));
    AS3.setBindable(button_27_13_$1,"scale" , "small");
    button_27_13_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.INLINE.getSkin());
    var editor_BrowsePlugin_32_17_$1/*:com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin*/ =AS3.cast(com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin,{});
    AS3.setBindable(editor_BrowsePlugin_32_17_$1,"enableFileDrop" , true);
    AS3.setBindable(editor_BrowsePlugin_32_17_$1,"multiple" , true);
    AS3.setBindable(editor_BrowsePlugin_32_17_$1,"dropEl" , this.el);
    button_27_13_$1.plugins = [editor_BrowsePlugin_32_17_$1];
    var container_37_13_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_37_13_$1,"height" , 10);
    var displayField_38_13_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    displayField_38_13_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.DisplayFieldSkin.EMBEDDED.getSkin());
    AS3.setBindable(displayField_38_13_$1,"value" , this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'upload_area_text'));
    var displayField_40_13_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    displayField_40_13_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.DisplayFieldSkin.EMBEDDED.getSkin());
    AS3.setBindable(displayField_40_13_$1,"value" , this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'upload_area_text_hint'));
    container_24_9_$1.items = [container_26_13_$1, button_27_13_$1, container_37_13_$1, displayField_38_13_$1, displayField_40_13_$1];
    var ui_BindVisibilityPlugin_44_13_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_44_13_$1.bindTo = this.getItemsExpression(AS3.getBindable(config,"bindTo"));
    AS3.setBindable(ui_BindVisibilityPlugin_44_13_$1,"transformer" , function(values/*:Array*/)/*:Boolean*/ { return !values || values.length === 0; });
    container_24_9_$1.plugins = [ui_BindVisibilityPlugin_44_13_$1];
    var layout_VBox_48_13_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_48_13_$1,"align" , "center");
    AS3.setBindable(layout_VBox_48_13_$1,"pack" , "center");
    AS3.setBindable(container_24_9_$1,"layout" , layout_VBox_48_13_$1);
    var container_51_9_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_51_9_$1.flex = 1.0;
    var container_53_13_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_53_13_$1.flex = 1.0;
    var droparea_AddItemButton_56_17_$1/*: com.coremedia.blueprint.social.composer.droparea.AddItemButton*/ =AS3.cast(com.coremedia.blueprint.social.composer.droparea.AddItemButton,{});
    AS3.setBindable(droparea_AddItemButton_56_17_$1,"uploadButtonHandler" ,AS3.bind( this,"uploadButtonHandler"));
    var ui_BindVisibilityPlugin_58_21_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_58_21_$1.bindTo = this.getAddButtonVisibilityExpression(AS3.getBindable(config,"property"), this.getItemsExpression(AS3.getBindable(config,"bindTo")));
    droparea_AddItemButton_56_17_$1.plugins = [ui_BindVisibilityPlugin_58_21_$1];
    container_53_13_$1.items = [droparea_AddItemButton_56_17_$1];
    var ui_BindComponentsPlugin_64_17_$1/*: com.coremedia.ui.plugins.BindComponentsPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindComponentsPlugin,{});
    AS3.setBindable(ui_BindComponentsPlugin_64_17_$1,"addFunction" , com.coremedia.blueprint.social.composer.droparea.DropContainerBase.addThumbnails);
    AS3.setBindable(ui_BindComponentsPlugin_64_17_$1,"valueExpression" , this.getItemsExpression(AS3.getBindable(config,"bindTo")));
    AS3.setBindable(ui_BindComponentsPlugin_64_17_$1,"configBeanParameterName" , "dropItem");
    AS3.setBindable(ui_BindComponentsPlugin_64_17_$1,"reuseComponents" , true);
    AS3.setBindable(ui_BindComponentsPlugin_64_17_$1,"getKey" , com.coremedia.blueprint.social.composer.droparea.DropContainerBase.getDropItemKey);
    AS3.setBindable(ui_BindComponentsPlugin_64_17_$1,"clearBeforeUpdate" , false);
    var droparea_DropItemThumbnail_72_21_$1/*: com.coremedia.blueprint.social.composer.droparea.DropItemThumbnail*/ =AS3.cast(com.coremedia.blueprint.social.composer.droparea.DropItemThumbnail,{});
    AS3.setBindable(droparea_DropItemThumbnail_72_21_$1,"width" , 130);
    AS3.setBindable(droparea_DropItemThumbnail_72_21_$1,"height" , 130);
    AS3.setBindable(ui_BindComponentsPlugin_64_17_$1,"template" , droparea_DropItemThumbnail_72_21_$1);
    container_53_13_$1.plugins = [ui_BindComponentsPlugin_64_17_$1];
    var layout_Column_77_17_$1/*:ext.layout.container.ColumnLayout*/ =AS3.cast(Ext.layout.container.Column,{});
    AS3.setBindable(container_53_13_$1,"layout" , layout_Column_77_17_$1);
    container_51_9_$1.items = [container_53_13_$1];
    var ui_BindVisibilityPlugin_82_13_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_82_13_$1.bindTo = this.getItemsExpression(AS3.getBindable(config,"bindTo"));
    AS3.setBindable(ui_BindVisibilityPlugin_82_13_$1,"transformer" , function(values/*:Array*/)/*:Boolean*/ { return values && values.length > 0; });
    container_51_9_$1.plugins = [ui_BindVisibilityPlugin_82_13_$1];
    var layout_HBox_86_13_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_86_13_$1,"align" , "begin");
    AS3.setBindable(container_51_9_$1,"layout" , layout_HBox_86_13_$1);
    container_22_5_$1.items = [container_24_9_$1, container_51_9_$1];
    var layout_VBox_91_9_$1/*: ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_91_9_$1,"align" , "stretch");
    AS3.setBindable(container_22_5_$1,"layout" , layout_VBox_91_9_$1);
    config_$1.items = [displayField_21_5_$1, container_22_5_$1];
    var editor_FileDropPlugin_96_5_$1/*:com.coremedia.cms.editor.sdk.upload.FileDropPlugin*/ =AS3.cast(com.coremedia.cms.editor.sdk.upload.FileDropPlugin,{});
    AS3.setBindable(editor_FileDropPlugin_96_5_$1,"dropHandler" ,AS3.bind( this,"handleFileDrop"));
    AS3.setBindable(editor_FileDropPlugin_96_5_$1,"customFileWrapperFactoryMethod" ,AS3.bind( this,"createFileWrapper"));
    config_$1.plugins = [editor_FileDropPlugin_96_5_$1];
    var layout_VBox_99_5_$1/*: ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_99_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_99_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$YTa_(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.droparea.DropContainerBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.editor.assetlist",
      constructor: DropContainer$,
      super$YTa_: function() {
        com.coremedia.blueprint.social.composer.droparea.DropContainerBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.button.Button",
        "Ext.container.Container",
        "Ext.form.field.Display",
        "Ext.layout.container.Column",
        "Ext.layout.container.HBox",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.composer.droparea.DropContainerBase",
        "com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin",
        "com.coremedia.cms.editor.sdk.upload.FileDropPlugin",
        "com.coremedia.ui.plugins.BindComponentsPlugin",
        "com.coremedia.ui.plugins.BindVisibilityPlugin",
        "com.coremedia.ui.skins.ButtonSkin",
        "com.coremedia.ui.skins.ContainerSkin",
        "com.coremedia.ui.skins.DisplayFieldSkin",
        "net.jangaroo.ext.Exml"
      ],
      uses: [
        "com.coremedia.blueprint.social.composer.droparea.AddItemButton",
        "com.coremedia.blueprint.social.composer.droparea.DropItemThumbnail"
      ]
    };
});
