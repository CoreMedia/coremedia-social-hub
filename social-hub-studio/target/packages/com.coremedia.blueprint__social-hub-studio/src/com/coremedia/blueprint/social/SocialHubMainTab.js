Ext.define("com.coremedia.blueprint.social.SocialHubMainTab", function(SocialHubMainTab) {/*package com.coremedia.blueprint.social{
import com.coremedia.blueprint.social.*;
import com.coremedia.blueprint.social.channels.*;
import net.jangaroo.ext.Exml;
import com.coremedia.ui.components.SwitchingContainer;
import ext.panel.Panel;
import ext.form.field.DisplayField;
import ext.layout.container.VBoxLayout;
import ext.layout.container.CardLayout;
import ext.layout.container.FitLayout;

    [ResourceBundle('com.coremedia.blueprint.social.SocialHub')]
    [ResourceBundle('com.coremedia.icons.CoreIcons')]
public class SocialHubMainTab extends SocialHubMainTabBase{

    import com.coremedia.ui.skins.DisplayFieldSkin;
    import com.coremedia.ui.skins.PanelSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.socialNetworksMainTab";

    public*/function SocialHubMainTab$(config/*:SocialHubMainTab = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.SocialHubMainTabBase*/ =AS3.cast(com.coremedia.blueprint.social.SocialHubMainTabBase,{});
    var defaults_$1/*:SocialHubMainTab*/ =AS3.cast(SocialHubMainTab,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"title" , this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'menu_title_text'));
    AS3.setBindable(config_$1,"closable" , true);
    config_$1["id"] = com.coremedia.blueprint.social.SocialHubMainTabBase.ID;
    AS3.setBindable(config_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.icons.CoreIcons', 'social_hub')));
    config_$1.itemId =net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.SocialHubMainTabBase.ID);
    config_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.PanelSkin.EMBEDDED.getSkin());
    var ui_SwitchingContainer_32_5_$1/*:com.coremedia.ui.components.SwitchingContainer*/ =AS3.cast(com.coremedia.ui.components.SwitchingContainer,{});
    AS3.setBindable(ui_SwitchingContainer_32_5_$1,"activeItemValueExpression" , this.getActiveItemExpression());
    var panel_34_9_$1/*:ext.panel.Panel*/ =AS3.cast(Ext.panel.Panel,{});
    panel_34_9_$1.itemId =net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.SocialHubMainTabBase.LOADER_ITEM_ID);
    var panel_35_9_$1/*: ext.panel.Panel*/ =AS3.cast(Ext.panel.Panel,{});
    panel_35_9_$1.itemId =net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.SocialHubMainTabBase.EMPTY_ITEM_ID);
    var displayField_37_13_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    displayField_37_13_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.DisplayFieldSkin.EMBEDDED.getSkin());
    AS3.setBindable(displayField_37_13_$1,"value" , this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channels_empty'));
    panel_35_9_$1.items = [displayField_37_13_$1];
    var layout_VBox_41_13_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_41_13_$1,"align" , "middle");
    AS3.setBindable(layout_VBox_41_13_$1,"pack" , "center");
    AS3.setBindable(panel_35_9_$1,"layout" , layout_VBox_41_13_$1);
    var channels_ChannelsContainer_44_9_$1/*: com.coremedia.blueprint.social.channels.ChannelsContainer*/ =AS3.cast(com.coremedia.blueprint.social.channels.ChannelsContainer,{});
    channels_ChannelsContainer_44_9_$1.itemId =net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.SocialHubMainTabBase.CHANNELS_ITEM_ID);
    AS3.setBindable(channels_ChannelsContainer_44_9_$1,"adaptersExpression" , this.getAdaptersExpression());
    ui_SwitchingContainer_32_5_$1.items = [panel_34_9_$1, panel_35_9_$1, channels_ChannelsContainer_44_9_$1];
    var layout_Card_47_9_$1/*:ext.layout.container.CardLayout*/ =AS3.cast(Ext.layout.container.Card,{});
    layout_Card_47_9_$1.deferredRender = false;
    AS3.setBindable(ui_SwitchingContainer_32_5_$1,"layout" , layout_Card_47_9_$1);
    config_$1.items = [ui_SwitchingContainer_32_5_$1];
    var layout_Fit_53_5_$1/*:ext.layout.container.FitLayout*/ =AS3.cast(Ext.layout.container.Fit,{});
    AS3.setBindable(config_$1,"layout" , layout_Fit_53_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$_tZa(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.SocialHubMainTabBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.socialNetworksMainTab",
      constructor: SocialHubMainTab$,
      super$_tZa: function() {
        com.coremedia.blueprint.social.SocialHubMainTabBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.form.field.Display",
        "Ext.layout.container.Card",
        "Ext.layout.container.Fit",
        "Ext.layout.container.VBox",
        "Ext.panel.Panel",
        "com.coremedia.blueprint.social.SocialHubMainTabBase",
        "com.coremedia.blueprint.social.SocialHub_properties",
        "com.coremedia.icons.CoreIcons_properties",
        "com.coremedia.ui.components.SwitchingContainer",
        "com.coremedia.ui.skins.DisplayFieldSkin",
        "com.coremedia.ui.skins.PanelSkin",
        "net.jangaroo.ext.Exml"
      ],
      uses: ["com.coremedia.blueprint.social.channels.ChannelsContainer"]
    };
});
