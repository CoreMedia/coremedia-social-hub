Ext.define("com.coremedia.blueprint.social.channels.ChannelContainer", function(ChannelContainer) {/*package com.coremedia.blueprint.social.channels{
import com.coremedia.blueprint.social.channels.*;
import com.coremedia.blueprint.social.messages.*;
import net.jangaroo.ext.Exml;
import com.coremedia.ui.components.SwitchingContainer;
import ext.panel.Panel;
import ext.container.Container;
import com.coremedia.ui.plugins.BindVisibilityPlugin;
import ext.layout.container.VBoxLayout;
import ext.layout.container.CardLayout;
import ext.toolbar.Toolbar;
import ext.toolbar.Spacer;
import com.coremedia.ui.components.IconDisplayField;
import ext.form.field.DisplayField;
import com.coremedia.ui.components.IconButton;
import com.coremedia.ui.components.MenuIconButton;
import ext.menu.Menu;
import ext.layout.container.HBoxLayout;
public class ChannelContainer extends ChannelContainerBase{

    import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
    import com.coremedia.ui.data.ValueExpressionFactory;
    import com.coremedia.ui.skins.ButtonSkin;
    import com.coremedia.ui.skins.DisplayFieldSkin;
    import com.coremedia.ui.skins.IconDisplayFieldSkin;
    import com.coremedia.ui.skins.PanelSkin;

    import mx.resources.ResourceManager;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.channelContainer";
    public static const COMPOSER_BUTTON_ITEM_ID:String = "composerButton";
    public static const COLOR_CHOOSER_BUTTON_ITEM_ID:String = "colorChooserButton";

    public static const MESSAGE_SCHEDULED_ITEM_ID:String = "messagesScheduled";
    public static const MESSAGE_HISTORY_ITEM_ID:String = "messagesHistory";

    public*/function ChannelContainer$(config/*:ChannelContainer = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.channels.ChannelContainerBase*/ =AS3.cast(com.coremedia.blueprint.social.channels.ChannelContainerBase,{});
    var defaults_$1/*:ChannelContainer*/ =AS3.cast(ChannelContainer,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"minWidth" , 500.0);
    config_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.PanelSkin.ACCORDION.getSkin());
    var ui_SwitchingContainer_32_5_$1/*:com.coremedia.ui.components.SwitchingContainer*/ =AS3.cast(com.coremedia.ui.components.SwitchingContainer,{});
    ui_SwitchingContainer_32_5_$1.flex = 1.0;
    AS3.setBindable(ui_SwitchingContainer_32_5_$1,"activeItemValueExpression" , this.getActiveItemExpression());
    var panel_34_9_$1/*:ext.panel.Panel*/ =AS3.cast(Ext.panel.Panel,{});
    panel_34_9_$1.itemId =net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.channels.ChannelContainerBase.LOADER_ITEM_ID);
    var panel_35_9_$1/*: ext.panel.Panel*/ =AS3.cast(Ext.panel.Panel,{});
    AS3.setBindable(panel_35_9_$1,"scrollable" , true);
    panel_35_9_$1.itemId =net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.channels.ChannelContainerBase.MESSAGE_WRAPPER_ITEM_ID);
    panel_35_9_$1.flex = 1.0;
    panel_35_9_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.PanelSkin.GRID_200.getSkin());
    AS3.setBindable(panel_35_9_$1,"style" , "border-left: solid 1px #dcdbdb; top: -1px;");
    var container_38_13_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_38_13_$1,"width" , 450);
    AS3.setBindable(container_38_13_$1,"maxWidth" , 450.0);
    var messages_MessagesContainer_40_17_$1/*: com.coremedia.blueprint.social.messages.MessagesContainer*/ =AS3.cast(com.coremedia.blueprint.social.messages.MessagesContainer,{});
    AS3.setBindable(messages_MessagesContainer_40_17_$1,"adapter" , AS3.getBindable(config,"adapter"));
    messages_MessagesContainer_40_17_$1.itemId =net.jangaroo.ext.Exml.asString( ChannelContainer.MESSAGE_SCHEDULED_ITEM_ID);
    AS3.setBindable(messages_MessagesContainer_40_17_$1,"width" , "100%");
    AS3.setBindable(messages_MessagesContainer_40_17_$1,"maxWidth" , 600.0);
    AS3.setBindable(messages_MessagesContainer_40_17_$1,"messageType" ,net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES));
    AS3.setBindable(messages_MessagesContainer_40_17_$1,"title" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_queue_title')));
    var ui_BindVisibilityPlugin_47_21_$1/*:com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_47_21_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"adapter").isSchedulingSupported());
    messages_MessagesContainer_40_17_$1.plugins = [ui_BindVisibilityPlugin_47_21_$1];
    var container_51_17_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_51_17_$1,"height" , 12);
    var ui_BindVisibilityPlugin_53_21_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_53_21_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"adapter").isSchedulingSupported());
    container_51_17_$1.plugins = [ui_BindVisibilityPlugin_53_21_$1];
    var messages_MessagesContainer_57_17_$1/*: com.coremedia.blueprint.social.messages.MessagesContainer*/ =AS3.cast(com.coremedia.blueprint.social.messages.MessagesContainer,{});
    AS3.setBindable(messages_MessagesContainer_57_17_$1,"adapter" , AS3.getBindable(config,"adapter"));
    AS3.setBindable(messages_MessagesContainer_57_17_$1,"width" , "100%");
    AS3.setBindable(messages_MessagesContainer_57_17_$1,"maxWidth" , 600.0);
    messages_MessagesContainer_57_17_$1.itemId =net.jangaroo.ext.Exml.asString( ChannelContainer.MESSAGE_HISTORY_ITEM_ID);
    AS3.setBindable(messages_MessagesContainer_57_17_$1,"messageType" ,net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_SENT_MESSAGES));
    AS3.setBindable(messages_MessagesContainer_57_17_$1,"title" ,net.jangaroo.ext.Exml.asString( this.resolveHistoryTitle(AS3.getBindable(config,"adapter"))));
    container_38_13_$1.items = [messages_MessagesContainer_40_17_$1, container_51_17_$1, messages_MessagesContainer_57_17_$1];
    var layout_VBox_65_17_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_65_17_$1,"align" , "center");
    AS3.setBindable(container_38_13_$1,"layout" , layout_VBox_65_17_$1);
    panel_35_9_$1.items = [container_38_13_$1];
    var layout_VBox_70_13_$1/*: ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_70_13_$1,"align" , "center");
    AS3.setBindable(panel_35_9_$1,"layout" , layout_VBox_70_13_$1);
    ui_SwitchingContainer_32_5_$1.items = [panel_34_9_$1, panel_35_9_$1];
    var layout_Card_75_9_$1/*:ext.layout.container.CardLayout*/ =AS3.cast(Ext.layout.container.Card,{});
    layout_Card_75_9_$1.deferredRender = false;
    AS3.setBindable(ui_SwitchingContainer_32_5_$1,"layout" , layout_Card_75_9_$1);
    config_$1.items = [ui_SwitchingContainer_32_5_$1];
    var toolbar_80_5_$1/*:ext.toolbar.Toolbar*/ =AS3.cast(Ext.toolbar.Toolbar,{});
    AS3.setBindable(toolbar_80_5_$1,"height" , 44);
    AS3.setBindable(toolbar_80_5_$1,"style" , 'background-color:' + AS3.getBindable(config,"adapter").getColor());
    var tbSpacer_82_9_$1/*:ext.toolbar.Spacer*/ =AS3.cast(Ext.toolbar.Spacer,{});
    AS3.setBindable(tbSpacer_82_9_$1,"width" , 6);
    var ui_IconDisplayField_83_9_$1/*:com.coremedia.ui.components.IconDisplayField*/ =AS3.cast(com.coremedia.ui.components.IconDisplayField,{});
    ui_IconDisplayField_83_9_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.IconDisplayFieldSkin.LIGHT.getSkin());
    AS3.setBindable(ui_IconDisplayField_83_9_$1,"scale" , "medium");
    AS3.setBindable(ui_IconDisplayField_83_9_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', AS3.getBindable(config,"adapter").getType().toLowerCase())));
    var container_87_9_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    var displayField_89_13_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    displayField_89_13_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.IconDisplayFieldSkin.LIGHT.getSkin());
    AS3.setBindable(displayField_89_13_$1,"value" , AS3.getBindable(config,"adapter").getDisplayName());
    container_87_9_$1.items = [displayField_89_13_$1];
    var layout_VBox_92_13_$1/*: ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_92_13_$1,"align" , "stretch");
    AS3.setBindable(layout_VBox_92_13_$1,"pack" , "center");
    AS3.setBindable(container_87_9_$1,"layout" , layout_VBox_92_13_$1);
    var tbSpacer_95_9_$1/*: ext.toolbar.Spacer*/ =AS3.cast(Ext.toolbar.Spacer,{});
    tbSpacer_95_9_$1.flex = 1.0;
    var ui_IconButton_96_9_$1/*:com.coremedia.ui.components.IconButton*/ =AS3.cast(com.coremedia.ui.components.IconButton,{});
    AS3.setBindable(ui_IconButton_96_9_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( mx.resources.ResourceManager.getInstance().getString('com.coremedia.icons.CoreIcons', 'reload')));
    ui_IconButton_96_9_$1.ariaLabel =net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_reload'));
    AS3.setBindable(ui_IconButton_96_9_$1,"handler" ,AS3.bind( this,"forceReload"));
    ui_IconButton_96_9_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.MAIN_NAVIGATION.getSkin());
    var ui_IconButton_100_9_$1/*: com.coremedia.ui.components.IconButton*/ =AS3.cast(com.coremedia.ui.components.IconButton,{});
    AS3.setBindable(ui_IconButton_100_9_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( mx.resources.ResourceManager.getInstance().getString('com.coremedia.icons.CoreIcons', 'add')));
    ui_IconButton_100_9_$1.ariaLabel =net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'create_message'));
    ui_IconButton_100_9_$1.itemId =net.jangaroo.ext.Exml.asString( ChannelContainer.COMPOSER_BUTTON_ITEM_ID);
    AS3.setBindable(ui_IconButton_100_9_$1,"handler" ,AS3.bind( this,"composeMessage"));
    ui_IconButton_100_9_$1.enableToggle = true;
    ui_IconButton_100_9_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.MAIN_NAVIGATION.getSkin());
    var ui_BindVisibilityPlugin_107_13_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_107_13_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(!AS3.getBindable(config,"adapter").isReadOnly());
    ui_IconButton_100_9_$1.plugins = [ui_BindVisibilityPlugin_107_13_$1];
    var ui_MenuIconButton_110_9_$1/*:com.coremedia.ui.components.MenuIconButton*/ =AS3.cast(com.coremedia.ui.components.MenuIconButton,{});
    ui_MenuIconButton_110_9_$1.itemId =net.jangaroo.ext.Exml.asString( ChannelContainer.COLOR_CHOOSER_BUTTON_ITEM_ID);
    ui_MenuIconButton_110_9_$1.ariaLabel =net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'change_color'));
    ui_MenuIconButton_110_9_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.MAIN_NAVIGATION.getSkin());
    AS3.setBindable(ui_MenuIconButton_110_9_$1,"arrowVisible" , false);
    AS3.setBindable(ui_MenuIconButton_110_9_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.icons.CoreIcons','arrow_down')));
    var menu_116_13_$1/*:ext.menu.Menu*/ =AS3.cast(Ext.menu.Menu,{});
    var local_ColorChooser_118_17_$1/*: com.coremedia.blueprint.social.channels.ColorChooser*/ =AS3.cast(com.coremedia.blueprint.social.channels.ColorChooser,{});
    AS3.setBindable(local_ColorChooser_118_17_$1,"adapter" , AS3.getBindable(config,"adapter"));
    menu_116_13_$1.items = [local_ColorChooser_118_17_$1];
    ui_MenuIconButton_110_9_$1.menu = menu_116_13_$1;
    toolbar_80_5_$1.items = [tbSpacer_82_9_$1, ui_IconDisplayField_83_9_$1, container_87_9_$1, tbSpacer_95_9_$1, ui_IconButton_96_9_$1, ui_IconButton_100_9_$1, ui_MenuIconButton_110_9_$1];
    config_$1.tbar = toolbar_80_5_$1;
    var layout_HBox_127_5_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_127_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_HBox_127_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$Vdui(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.channels.ChannelContainerBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.channelContainer",
      constructor: ChannelContainer$,
      super$Vdui: function() {
        com.coremedia.blueprint.social.channels.ChannelContainerBase.prototype.constructor.apply(this, arguments);
      },
      statics: {
        COMPOSER_BUTTON_ITEM_ID: "composerButton",
        COLOR_CHOOSER_BUTTON_ITEM_ID: "colorChooserButton",
        MESSAGE_SCHEDULED_ITEM_ID: "messagesScheduled",
        MESSAGE_HISTORY_ITEM_ID: "messagesHistory"
      },
      requires: [
        "Ext.container.Container",
        "Ext.form.field.Display",
        "Ext.layout.container.Card",
        "Ext.layout.container.HBox",
        "Ext.layout.container.VBox",
        "Ext.menu.Menu",
        "Ext.panel.Panel",
        "Ext.toolbar.Spacer",
        "Ext.toolbar.Toolbar",
        "com.coremedia.blueprint.social.channels.ChannelContainerBase",
        "com.coremedia.ui.components.IconButton",
        "com.coremedia.ui.components.IconDisplayField",
        "com.coremedia.ui.components.MenuIconButton",
        "com.coremedia.ui.components.SwitchingContainer",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.plugins.BindVisibilityPlugin",
        "com.coremedia.ui.skins.ButtonSkin",
        "com.coremedia.ui.skins.IconDisplayFieldSkin",
        "com.coremedia.ui.skins.PanelSkin",
        "mx.resources.ResourceManager",
        "net.jangaroo.ext.Exml"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames",
        "com.coremedia.blueprint.social.channels.ColorChooser",
        "com.coremedia.blueprint.social.messages.MessagesContainer"
      ]
    };
});
