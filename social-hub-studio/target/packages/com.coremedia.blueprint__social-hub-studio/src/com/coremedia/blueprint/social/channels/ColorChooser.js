Ext.define("com.coremedia.blueprint.social.channels.ColorChooser", function(ColorChooser) {/*package com.coremedia.blueprint.social.channels{
import com.coremedia.blueprint.social.channels.*;
import net.jangaroo.ext.Exml;
import ext.container.Container;
import com.coremedia.ui.plugins.BindComponentsPlugin;
import com.coremedia.ui.plugins.HorizontalSpacingPlugin;
import ext.layout.container.HBoxLayout;
import ext.layout.container.VBoxLayout;
public class ColorChooser extends ColorChooserBase{

    import com.coremedia.ui.bem.SpacingBEMEntities;
    import com.coremedia.ui.skins.ContainerSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.colorChooser";

    public*/function ColorChooser$(config/*:ColorChooser = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.channels.ColorChooserBase*/ =AS3.cast(com.coremedia.blueprint.social.channels.ColorChooserBase,{});
    var defaults_$1/*:ColorChooser*/ =AS3.cast(ColorChooser,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    config_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ContainerSkin.GRID_200.getSkin());
    var container_19_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_19_5_$1.items = [];
    var ui_BindComponentsPlugin_24_9_$1/*:com.coremedia.ui.plugins.BindComponentsPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindComponentsPlugin,{});
    AS3.setBindable(ui_BindComponentsPlugin_24_9_$1,"valueExpression" , this.getColorButtonsExpression());
    AS3.setBindable(ui_BindComponentsPlugin_24_9_$1,"configBeanParameterName" , "color");
    AS3.setBindable(ui_BindComponentsPlugin_24_9_$1,"reuseComponents" , true);
    AS3.setBindable(ui_BindComponentsPlugin_24_9_$1,"clearBeforeUpdate" , false);
    var channels_ColorButton_30_13_$1/*: com.coremedia.blueprint.social.channels.ColorButton*/ =AS3.cast(com.coremedia.blueprint.social.channels.ColorButton,{});
    AS3.setBindable(channels_ColorButton_30_13_$1,"adapter" , AS3.getBindable(config,"adapter"));
    AS3.setBindable(ui_BindComponentsPlugin_24_9_$1,"template" , channels_ColorButton_30_13_$1);
    var ui_HorizontalSpacingPlugin_33_9_$1/*:com.coremedia.ui.plugins.HorizontalSpacingPlugin*/ =AS3.cast(com.coremedia.ui.plugins.HorizontalSpacingPlugin,{});
    AS3.setBindable(ui_HorizontalSpacingPlugin_33_9_$1,"modifier" , com.coremedia.ui.bem.SpacingBEMEntities.HORIZONTAL_SPACING_BLOCK);
    container_19_5_$1.plugins = [ui_BindComponentsPlugin_24_9_$1, ui_HorizontalSpacingPlugin_33_9_$1];
    var layout_HBox_36_9_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_36_9_$1,"align" , "stretch");
    AS3.setBindable(container_19_5_$1,"layout" , layout_HBox_36_9_$1);
    config_$1.items = [container_19_5_$1];
    var layout_VBox_41_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_41_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_41_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$zBB6(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.channels.ColorChooserBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.colorChooser",
      constructor: ColorChooser$,
      super$zBB6: function() {
        com.coremedia.blueprint.social.channels.ColorChooserBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.container.Container",
        "Ext.layout.container.HBox",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.channels.ColorChooserBase",
        "com.coremedia.ui.bem.SpacingBEMEntities",
        "com.coremedia.ui.plugins.BindComponentsPlugin",
        "com.coremedia.ui.plugins.HorizontalSpacingPlugin",
        "com.coremedia.ui.skins.ContainerSkin",
        "net.jangaroo.ext.Exml"
      ],
      uses: ["com.coremedia.blueprint.social.channels.ColorButton"]
    };
});
