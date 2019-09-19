Ext.define("com.coremedia.blueprint.social.messages.MessageFooter", function(MessageFooter) {/*package com.coremedia.blueprint.social.messages{
import com.coremedia.blueprint.social.messages.*;
import net.jangaroo.ext.Exml;
import ext.container.Container;
import ext.form.field.DisplayField;
import com.coremedia.ui.plugins.BindPropertyPlugin;
import com.coremedia.ui.plugins.BindVisibilityPlugin;
import ext.layout.container.VBoxLayout;
import ext.button.Button;
import ext.layout.container.HBoxLayout;
public class MessageFooter extends MessageFooterBase{

    import com.coremedia.blueprint.social.beans.Message;
    import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
    import com.coremedia.ui.data.ValueExpressionFactory;
    import com.coremedia.ui.skins.ButtonSkin;
    import com.coremedia.ui.skins.ContainerSkin;
    import com.coremedia.ui.skins.DisplayFieldSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.messageFooter";

    public*/function MessageFooter$(config/*:MessageFooter = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.messages.MessageFooterBase*/ =AS3.cast(com.coremedia.blueprint.social.messages.MessageFooterBase,{});
    var defaults_$1/*:MessageFooter*/ =AS3.cast(MessageFooter,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"dock" , "bottom");
    config_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ContainerSkin.DARK_200.getSkin());
    AS3.setBindable(config_$1,"style" , this.getStyle(AS3.getBindable(config,"message")));
    var container_24_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    var displayField_26_9_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    displayField_26_9_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.DisplayFieldSkin.BOLD.getSkin());
    AS3.setBindable(displayField_26_9_$1,"html" , true);
    AS3.setBindable(displayField_26_9_$1,"value" , "<b>" + this.getDateLabel(AS3.getBindable(config,"message")) + "<\/b>");
    var displayField_27_9_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    var ui_BindPropertyPlugin_29_13_$1/*:com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_29_13_$1.transformer =AS3.bind( this,"transformDate");
    ui_BindPropertyPlugin_29_13_$1.componentProperty = "value";
    ui_BindPropertyPlugin_29_13_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.create(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_PUBLICATION_DATE, AS3.getBindable(config,"message"));
    var ui_BindVisibilityPlugin_32_13_$1/*:com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    AS3.setBindable(ui_BindVisibilityPlugin_32_13_$1,"transformer" , function(state/*:String*/)/*:Boolean*/ {return state === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.STATE_SCHEDULED;});
    ui_BindVisibilityPlugin_32_13_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"message")).extendBy(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_STATE);
    displayField_27_9_$1.plugins = [ui_BindPropertyPlugin_29_13_$1, ui_BindVisibilityPlugin_32_13_$1];
    var displayField_37_9_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    var ui_BindPropertyPlugin_39_13_$1/*: com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_39_13_$1.transformer =AS3.bind( this,"transformDate");
    ui_BindPropertyPlugin_39_13_$1.componentProperty = "value";
    ui_BindPropertyPlugin_39_13_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"message")).extendBy(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_PUBLICATION_DATE);
    var ui_BindVisibilityPlugin_42_13_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    AS3.setBindable(ui_BindVisibilityPlugin_42_13_$1,"transformer" , function(state/*:String*/)/*:Boolean*/ {return state === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.STATE_SENT;});
    ui_BindVisibilityPlugin_42_13_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"message")).extendBy(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_STATE);
    displayField_37_9_$1.plugins = [ui_BindPropertyPlugin_39_13_$1, ui_BindVisibilityPlugin_42_13_$1];
    container_24_5_$1.items = [displayField_26_9_$1, displayField_27_9_$1, displayField_37_9_$1];
    var layout_VBox_49_9_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_49_9_$1,"align" , "stretch");
    AS3.setBindable(container_24_5_$1,"layout" , layout_VBox_49_9_$1);
    var container_52_5_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_52_5_$1,"width" , 12);
    var messages_CounterLabel_54_5_$1/*: com.coremedia.blueprint.social.messages.CounterLabel*/ =AS3.cast(com.coremedia.blueprint.social.messages.CounterLabel,{});
    AS3.setBindable(messages_CounterLabel_54_5_$1,"adapter" , AS3.getBindable(config,"adapter"));
    AS3.setBindable(messages_CounterLabel_54_5_$1,"message" , AS3.getBindable(config,"message"));
    AS3.setBindable(messages_CounterLabel_54_5_$1,"propertyName" ,net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_SHARE_COUNT));
    var messages_CounterLabel_56_5_$1/*: com.coremedia.blueprint.social.messages.CounterLabel*/ =AS3.cast(com.coremedia.blueprint.social.messages.CounterLabel,{});
    AS3.setBindable(messages_CounterLabel_56_5_$1,"adapter" , AS3.getBindable(config,"adapter"));
    AS3.setBindable(messages_CounterLabel_56_5_$1,"message" , AS3.getBindable(config,"message"));
    AS3.setBindable(messages_CounterLabel_56_5_$1,"propertyName" ,net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_LIKE_COUNT));
    var messages_CounterLabel_58_5_$1/*: com.coremedia.blueprint.social.messages.CounterLabel*/ =AS3.cast(com.coremedia.blueprint.social.messages.CounterLabel,{});
    AS3.setBindable(messages_CounterLabel_58_5_$1,"adapter" , AS3.getBindable(config,"adapter"));
    AS3.setBindable(messages_CounterLabel_58_5_$1,"message" , AS3.getBindable(config,"message"));
    AS3.setBindable(messages_CounterLabel_58_5_$1,"propertyName" ,net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_DISLIKE_COUNT));
    var messages_CounterLabel_60_5_$1/*: com.coremedia.blueprint.social.messages.CounterLabel*/ =AS3.cast(com.coremedia.blueprint.social.messages.CounterLabel,{});
    AS3.setBindable(messages_CounterLabel_60_5_$1,"adapter" , AS3.getBindable(config,"adapter"));
    AS3.setBindable(messages_CounterLabel_60_5_$1,"message" , AS3.getBindable(config,"message"));
    AS3.setBindable(messages_CounterLabel_60_5_$1,"propertyName" ,net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_VIEW_COUNT));
    var messages_CounterLabel_62_5_$1/*: com.coremedia.blueprint.social.messages.CounterLabel*/ =AS3.cast(com.coremedia.blueprint.social.messages.CounterLabel,{});
    AS3.setBindable(messages_CounterLabel_62_5_$1,"adapter" , AS3.getBindable(config,"adapter"));
    AS3.setBindable(messages_CounterLabel_62_5_$1,"message" , AS3.getBindable(config,"message"));
    AS3.setBindable(messages_CounterLabel_62_5_$1,"propertyName" ,net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_COMMENT_COUNT));
    var container_65_5_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_65_5_$1.flex = 1.0;
    var button_67_5_$1/*:ext.button.Button*/ =AS3.cast(Ext.button.Button,{});
    button_67_5_$1.itemId = "openInBrowserButton";
    button_67_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.SIMPLE.getSkin());
    button_67_5_$1.ariaLabel =net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.cms.editor.Editor', 'PreviewPanelToolbar_openInBrowser_btn_tooltip'));
    AS3.setBindable(button_67_5_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.icons.CoreIcons', 'open_in_browser')));
    AS3.setBindable(button_67_5_$1,"scale" , "small");
    AS3.setBindable(button_67_5_$1,"handler" ,AS3.bind( this,"openInTab"));
    var ui_BindVisibilityPlugin_74_9_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    AS3.setBindable(ui_BindVisibilityPlugin_74_9_$1,"transformer" , function(msg/*:Message*/)/*:Boolean*/ {return msg.getUrl() !== null && msg.getUrl() !== undefined && msg.getUrl() !== ''; });
    ui_BindVisibilityPlugin_74_9_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"message"));
    button_67_5_$1.plugins = [ui_BindVisibilityPlugin_74_9_$1];
    var button_79_5_$1/*: ext.button.Button*/ =AS3.cast(Ext.button.Button,{});
    button_79_5_$1.itemId = "deleteButton";
    button_79_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.MATERIAL_SECONDARY.getSkin());
    button_79_5_$1.ariaLabel =net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'delete_post_title'));
    AS3.setBindable(button_79_5_$1,"text" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'delete_post_title')));
    AS3.setBindable(button_79_5_$1,"scale" , "small");
    AS3.setBindable(button_79_5_$1,"handler" ,AS3.bind( this,"deleteFromScheduler"));
    var ui_BindVisibilityPlugin_86_9_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    AS3.setBindable(ui_BindVisibilityPlugin_86_9_$1,"transformer" , function(state/*:String*/)/*:Boolean*/ {return state === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.STATE_SCHEDULED;});
    ui_BindVisibilityPlugin_86_9_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"message")).extendBy(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_STATE);
    button_79_5_$1.plugins = [ui_BindVisibilityPlugin_86_9_$1];
    config_$1.items = [container_24_5_$1, container_52_5_$1, messages_CounterLabel_54_5_$1, messages_CounterLabel_56_5_$1, messages_CounterLabel_58_5_$1, messages_CounterLabel_60_5_$1, messages_CounterLabel_62_5_$1, container_65_5_$1, button_67_5_$1, button_79_5_$1];
    var ui_BindVisibilityPlugin_93_5_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_93_5_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.create(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_PUBLICATION_DATE, AS3.getBindable(config,"message"));
    config_$1.plugins = [ui_BindVisibilityPlugin_93_5_$1];
    var layout_HBox_97_5_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_97_5_$1,"align" , "bottom");
    AS3.setBindable(config_$1,"layout" , layout_HBox_97_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$kw1G(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.messages.MessageFooterBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.messageFooter",
      constructor: MessageFooter$,
      super$kw1G: function() {
        com.coremedia.blueprint.social.messages.MessageFooterBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.button.Button",
        "Ext.container.Container",
        "Ext.form.field.Display",
        "Ext.layout.container.HBox",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.messages.MessageFooterBase",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.plugins.BindPropertyPlugin",
        "com.coremedia.ui.plugins.BindVisibilityPlugin",
        "com.coremedia.ui.skins.ButtonSkin",
        "com.coremedia.ui.skins.ContainerSkin",
        "com.coremedia.ui.skins.DisplayFieldSkin",
        "net.jangaroo.ext.Exml"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames",
        "com.coremedia.blueprint.social.messages.CounterLabel"
      ]
    };
});
