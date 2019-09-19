Ext.define("com.coremedia.blueprint.social.channels.ChannelsContainer", function(ChannelsContainer) {/*package com.coremedia.blueprint.social.channels{
import com.coremedia.blueprint.social.channels.*;
import net.jangaroo.ext.Exml;
import com.coremedia.ui.plugins.BindComponentsPlugin;
import ext.layout.container.HBoxLayout;
public class ChannelsContainer extends ChannelsContainerBase{

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.channelsContainer";

    public*/function ChannelsContainer$(config/*:ChannelsContainer = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.channels.ChannelsContainerBase*/ =AS3.cast(com.coremedia.blueprint.social.channels.ChannelsContainerBase,{});
    var defaults_$1/*:ChannelsContainer*/ =AS3.cast(ChannelsContainer,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"autoScroll" , true);
    var ui_BindComponentsPlugin_16_5_$1/*:com.coremedia.ui.plugins.BindComponentsPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindComponentsPlugin,{});
    AS3.setBindable(ui_BindComponentsPlugin_16_5_$1,"valueExpression" , AS3.getBindable(config,"adaptersExpression"));
    AS3.setBindable(ui_BindComponentsPlugin_16_5_$1,"configBeanParameterName" , "adapter");
    AS3.setBindable(ui_BindComponentsPlugin_16_5_$1,"clearBeforeUpdate" , false);
    var channels_ChannelContainer_21_9_$1/*: com.coremedia.blueprint.social.channels.ChannelContainer*/ =AS3.cast(com.coremedia.blueprint.social.channels.ChannelContainer,{});
    channels_ChannelContainer_21_9_$1.flex = 1.0;
    AS3.setBindable(ui_BindComponentsPlugin_16_5_$1,"template" , channels_ChannelContainer_21_9_$1);
    config_$1.plugins = [ui_BindComponentsPlugin_16_5_$1];
    var layout_HBox_26_5_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_26_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_HBox_26_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$o6JZ(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.channels.ChannelsContainerBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.channelsContainer",
      constructor: ChannelsContainer$,
      super$o6JZ: function() {
        com.coremedia.blueprint.social.channels.ChannelsContainerBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.layout.container.HBox",
        "com.coremedia.blueprint.social.channels.ChannelsContainerBase",
        "com.coremedia.ui.plugins.BindComponentsPlugin",
        "net.jangaroo.ext.Exml"
      ],
      uses: ["com.coremedia.blueprint.social.channels.ChannelContainer"]
    };
});
