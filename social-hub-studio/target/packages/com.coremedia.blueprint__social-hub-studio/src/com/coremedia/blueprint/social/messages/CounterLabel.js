Ext.define("com.coremedia.blueprint.social.messages.CounterLabel", function(CounterLabel) {/*package com.coremedia.blueprint.social.messages{
import com.coremedia.blueprint.social.messages.*;
import net.jangaroo.ext.Exml;
import com.coremedia.ui.components.IconDisplayField;
import ext.form.field.DisplayField;
import com.coremedia.ui.plugins.BindPropertyPlugin;
import ext.container.Container;
import ext.layout.container.HBoxLayout;
import com.coremedia.ui.plugins.BindVisibilityPlugin;
public class CounterLabel extends CounterLabelBase{

    import com.coremedia.ui.data.ValueExpressionFactory;
    import com.coremedia.ui.skins.DisplayFieldSkin;
    import com.coremedia.ui.skins.IconDisplayFieldSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.counterLabel";

    public*/function CounterLabel$(config/*:CounterLabel = null*/){var this$=this;if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.messages.CounterLabelBase*/ =AS3.cast(com.coremedia.blueprint.social.messages.CounterLabelBase,{});
    var defaults_$1/*:CounterLabel*/ =AS3.cast(CounterLabel,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"dock" , "bottom");
    var ui_IconDisplayField_19_5_$1/*:com.coremedia.ui.components.IconDisplayField*/ =AS3.cast(com.coremedia.ui.components.IconDisplayField,{});
    ui_IconDisplayField_19_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.IconDisplayFieldSkin.EMBEDDED.getSkin());
    AS3.setBindable(ui_IconDisplayField_19_5_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( this.getIcon(AS3.getBindable(config,"adapter"), AS3.getBindable(config,"propertyName"))));
    var displayField_21_5_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    displayField_21_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.DisplayFieldSkin.EMBEDDED.getSkin());
    var ui_BindPropertyPlugin_23_9_$1/*:com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_23_9_$1.transformer = function(count/*:Number*/)/*:String*/ {return count + ' ' + this$.getLabel(AS3.getBindable(config,"adapter"), AS3.getBindable(config,"propertyName"));};
    ui_BindPropertyPlugin_23_9_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"message")).extendBy(AS3.getBindable(config,"propertyName"));
    displayField_21_5_$1.plugins = [ui_BindPropertyPlugin_23_9_$1];
    var container_28_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_28_5_$1,"width" , 12);
    config_$1.items = [ui_IconDisplayField_19_5_$1, displayField_21_5_$1, container_28_5_$1];
    var layout_HBox_31_5_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_31_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_HBox_31_5_$1);
    var ui_BindVisibilityPlugin_34_5_$1/*:com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    AS3.setBindable(ui_BindVisibilityPlugin_34_5_$1,"transformer" , function(count/*:Number*/)/*:Boolean*/ {return count > 0;});
    ui_BindVisibilityPlugin_34_5_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"message")).extendBy(AS3.getBindable(config,"propertyName"));
    config_$1.plugins = [ui_BindVisibilityPlugin_34_5_$1];
    var layout_HBox_39_5_$1/*: ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_39_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_HBox_39_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$90JA(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.messages.CounterLabelBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.counterLabel",
      constructor: CounterLabel$,
      super$90JA: function() {
        com.coremedia.blueprint.social.messages.CounterLabelBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.container.Container",
        "Ext.form.field.Display",
        "Ext.layout.container.HBox",
        "com.coremedia.blueprint.social.messages.CounterLabelBase",
        "com.coremedia.ui.components.IconDisplayField",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.plugins.BindPropertyPlugin",
        "com.coremedia.ui.plugins.BindVisibilityPlugin",
        "com.coremedia.ui.skins.DisplayFieldSkin",
        "com.coremedia.ui.skins.IconDisplayFieldSkin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
