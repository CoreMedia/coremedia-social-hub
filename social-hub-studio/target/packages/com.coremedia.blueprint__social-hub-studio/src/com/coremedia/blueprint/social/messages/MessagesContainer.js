Ext.define("com.coremedia.blueprint.social.messages.MessagesContainer", function(MessagesContainer) {/*package com.coremedia.blueprint.social.messages{
import com.coremedia.blueprint.social.messages.*;
import net.jangaroo.ext.Exml;
import ext.container.Container;
import ext.form.field.DisplayField;
import com.coremedia.ui.plugins.BindVisibilityPlugin;
import ext.layout.container.VBoxLayout;
public class MessagesContainer extends MessagesContainerBase{

    import com.coremedia.blueprint.social.CustomStyles;
    import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
    import com.coremedia.ui.data.ValueExpressionFactory;
    import com.coremedia.ui.skins.ContainerSkin;
    import com.coremedia.ui.skins.DisplayFieldSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.messagesContainer";
    public static const MESSAGES_CONTAINER_ITEM_ID:String = "messagesContainer";

    [Bindable]
    public var title:String;

    public*/function MessagesContainer$(config/*:MessagesContainer = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.messages.MessagesContainerBase*/ =AS3.cast(com.coremedia.blueprint.social.messages.MessagesContainerBase,{});
    var defaults_$1/*:MessagesContainer*/ =AS3.cast(MessagesContainer,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    var container_26_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_26_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ContainerSkin.GRID_100.getSkin());
    var displayField_28_9_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_28_9_$1,"value" , AS3.getBindable(config,"title"));
    displayField_28_9_$1.ui =net.jangaroo.ext.Exml.asString( null);
    AS3.setBindable(displayField_28_9_$1,"style" , com.coremedia.blueprint.social.CustomStyles.TITLE_MEDIUM);
    var displayField_29_9_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_29_9_$1,"value" , this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_queue_subtitle'));
    var ui_BindVisibilityPlugin_31_13_$1/*:com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_31_13_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"messageType") === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES);
    displayField_29_9_$1.plugins = [ui_BindVisibilityPlugin_31_13_$1];
    var container_34_9_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_34_9_$1,"height" , 12);
    var displayField_35_9_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    displayField_35_9_$1.ui =net.jangaroo.ext.Exml.asString( null);
    AS3.setBindable(displayField_35_9_$1,"style" , com.coremedia.blueprint.social.CustomStyles.READONLY_EMPTY_TEXT);
    AS3.setBindable(displayField_35_9_$1,"value" , this.getEmptyLabel(AS3.getBindable(config,"messageType")));
    var ui_BindVisibilityPlugin_39_13_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    AS3.setBindable(ui_BindVisibilityPlugin_39_13_$1,"transformer" , function(messages/*:Array*/)/*:Boolean*/ {return messages.length === 0;});
    ui_BindVisibilityPlugin_39_13_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"adapter")).extendBy(AS3.getBindable(config,"messageType"));
    displayField_35_9_$1.plugins = [ui_BindVisibilityPlugin_39_13_$1];
    container_26_5_$1.items = [displayField_28_9_$1, displayField_29_9_$1, container_34_9_$1, displayField_35_9_$1];
    var layout_VBox_45_9_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(container_26_5_$1,"layout" , layout_VBox_45_9_$1);
    var container_48_5_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_48_5_$1.itemId =net.jangaroo.ext.Exml.asString( MessagesContainer.MESSAGES_CONTAINER_ITEM_ID);
    AS3.setBindable(container_48_5_$1,"style" , "padding: 2px;");
    container_48_5_$1.items = [];
    var layout_VBox_53_9_$1/*: ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_53_9_$1,"align" , "stretch");
    AS3.setBindable(container_48_5_$1,"layout" , layout_VBox_53_9_$1);
    config_$1.items = [container_26_5_$1, container_48_5_$1];
    var layout_VBox_58_5_$1/*: ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_58_5_$1,"align" , "stretch");
    AS3.setBindable(layout_VBox_58_5_$1,"pack" , "center");
    AS3.setBindable(config_$1,"layout" , layout_VBox_58_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$xUbZ(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.messages.MessagesContainerBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.messagesContainer",
      constructor: MessagesContainer$,
      super$xUbZ: function() {
        com.coremedia.blueprint.social.messages.MessagesContainerBase.prototype.constructor.apply(this, arguments);
      },
      config: {title: null},
      statics: {MESSAGES_CONTAINER_ITEM_ID: "messagesContainer"},
      requires: [
        "Ext.container.Container",
        "Ext.form.field.Display",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.messages.MessagesContainerBase",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.plugins.BindVisibilityPlugin",
        "com.coremedia.ui.skins.ContainerSkin",
        "net.jangaroo.ext.Exml"
      ],
      uses: [
        "com.coremedia.blueprint.social.CustomStyles",
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames"
      ]
    };
});
