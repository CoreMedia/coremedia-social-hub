Ext.define("com.coremedia.blueprint.social.SocialHubStudioPlugin", function(SocialHubStudioPlugin) {/*package com.coremedia.blueprint.social{
import com.coremedia.blueprint.social.*;
import net.jangaroo.ext.Exml;
import com.coremedia.cms.editor.sdk.desktop.ExtensionsMenuToolbar;
import com.coremedia.ui.plugins.AddItemsPlugin;
import ext.container.Container;
import ext.button.Button;
import com.coremedia.cms.editor.sdk.actions.OpenTabAction;
import com.coremedia.cms.editor.configuration.RegisterRestResource;
import com.coremedia.cms.editor.configuration.CopyResourceBundleProperties;
public class SocialHubStudioPlugin extends SocialHubStudioPluginBase{

    import com.coremedia.blueprint.social.beans.ComposerModelImpl;
    import com.coremedia.blueprint.social.beans.MessageImpl;
    import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
    import com.coremedia.blueprint.social.beans.SocialHubAdaptersImpl;

    import mx.resources.ResourceManager;

    public*/function SocialHubStudioPlugin$(config/*:SocialHubStudioPlugin = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.SocialHubStudioPluginBase*/ =AS3.cast(com.coremedia.blueprint.social.SocialHubStudioPluginBase,{});
    var defaults_$1/*:SocialHubStudioPlugin*/ =AS3.cast(SocialHubStudioPlugin,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    var editor_ExtensionsMenuToolbar_24_5_$1/*:com.coremedia.cms.editor.sdk.desktop.ExtensionsMenuToolbar*/ =AS3.cast(com.coremedia.cms.editor.sdk.desktop.ExtensionsMenuToolbar,{});
    var ui_AddItemsPlugin_26_9_$1/*:com.coremedia.ui.plugins.AddItemsPlugin*/ =AS3.cast(com.coremedia.ui.plugins.AddItemsPlugin,{});
    var container_28_13_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    var button_30_17_$1/*:ext.button.Button*/ =AS3.cast(Ext.button.Button,{});
    button_30_17_$1.itemId = "socialHubButton";
    AS3.setBindable(button_30_17_$1,"tooltip" , mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'menu_title_tooltip'));
    AS3.setBindable(button_30_17_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( mx.resources.ResourceManager.getInstance().getString('com.coremedia.icons.CoreIcons', 'social_hub')));
    AS3.setBindable(button_30_17_$1,"text" ,net.jangaroo.ext.Exml.asString( mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'menu_title_text')));
    var editor_OpenTabAction_35_21_$1/*:com.coremedia.cms.editor.sdk.actions.OpenTabAction*/ =AS3.cast(com.coremedia.cms.editor.sdk.actions.OpenTabAction,{});
    AS3.setBindable(editor_OpenTabAction_35_21_$1,"singleton" , true);
    var social_SocialHubMainTab_37_25_$1/*: com.coremedia.blueprint.social.SocialHubMainTab*/ =AS3.cast(com.coremedia.blueprint.social.SocialHubMainTab,{});
    AS3.setBindable(editor_OpenTabAction_35_21_$1,"tab" , social_SocialHubMainTab_37_25_$1);
    button_30_17_$1.baseAction = new com.coremedia.cms.editor.sdk.actions.OpenTabAction(editor_OpenTabAction_35_21_$1);
    container_28_13_$1.items = [button_30_17_$1];
    AS3.setBindable(ui_AddItemsPlugin_26_9_$1,"containers" , [container_28_13_$1]);
    editor_ExtensionsMenuToolbar_24_5_$1.plugins = [ui_AddItemsPlugin_26_9_$1];
    AS3.setBindable(config_$1,"rules" , [editor_ExtensionsMenuToolbar_24_5_$1]);
    var editor_RegisterRestResource_52_5_$1/*:com.coremedia.cms.editor.configuration.RegisterRestResource*/ =AS3.cast(com.coremedia.cms.editor.configuration.RegisterRestResource,{});
    AS3.setBindable(editor_RegisterRestResource_52_5_$1,"beanClass" , com.coremedia.blueprint.social.beans.SocialHubAdapterImpl);
    var editor_RegisterRestResource_53_5_$1/*: com.coremedia.cms.editor.configuration.RegisterRestResource*/ =AS3.cast(com.coremedia.cms.editor.configuration.RegisterRestResource,{});
    AS3.setBindable(editor_RegisterRestResource_53_5_$1,"beanClass" , com.coremedia.blueprint.social.beans.SocialHubAdaptersImpl);
    var editor_RegisterRestResource_54_5_$1/*: com.coremedia.cms.editor.configuration.RegisterRestResource*/ =AS3.cast(com.coremedia.cms.editor.configuration.RegisterRestResource,{});
    AS3.setBindable(editor_RegisterRestResource_54_5_$1,"beanClass" , com.coremedia.blueprint.social.beans.MessageImpl);
    var editor_RegisterRestResource_55_5_$1/*: com.coremedia.cms.editor.configuration.RegisterRestResource*/ =AS3.cast(com.coremedia.cms.editor.configuration.RegisterRestResource,{});
    AS3.setBindable(editor_RegisterRestResource_55_5_$1,"beanClass" , com.coremedia.blueprint.social.beans.ComposerModelImpl);
    var editor_CopyResourceBundleProperties_58_5_$1/*:com.coremedia.cms.editor.configuration.CopyResourceBundleProperties*/ =AS3.cast(com.coremedia.cms.editor.configuration.CopyResourceBundleProperties,{});
    AS3.setBindable(editor_CopyResourceBundleProperties_58_5_$1,"destination" , mx.resources.ResourceManager.getInstance().getResourceBundle(null, 'com.coremedia.cms.editor.ContentTypes'));
    AS3.setBindable(editor_CopyResourceBundleProperties_58_5_$1,"source" , mx.resources.ResourceManager.getInstance().getResourceBundle(null, 'com.coremedia.blueprint.social.SocialHubComposerProperties'));
    AS3.setBindable(config_$1,"configuration" , [new com.coremedia.cms.editor.configuration.RegisterRestResource(editor_RegisterRestResource_52_5_$1), new com.coremedia.cms.editor.configuration.RegisterRestResource(editor_RegisterRestResource_53_5_$1), new com.coremedia.cms.editor.configuration.RegisterRestResource(editor_RegisterRestResource_54_5_$1), new com.coremedia.cms.editor.configuration.RegisterRestResource(editor_RegisterRestResource_55_5_$1), new com.coremedia.cms.editor.configuration.CopyResourceBundleProperties(editor_CopyResourceBundleProperties_58_5_$1)]);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$wUlX(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.SocialHubStudioPluginBase",
      constructor: SocialHubStudioPlugin$,
      super$wUlX: function() {
        com.coremedia.blueprint.social.SocialHubStudioPluginBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.button.Button",
        "Ext.container.Container",
        "com.coremedia.blueprint.social.SocialHubStudioPluginBase",
        "com.coremedia.cms.editor.configuration.CopyResourceBundleProperties",
        "com.coremedia.cms.editor.configuration.RegisterRestResource",
        "com.coremedia.cms.editor.sdk.actions.OpenTabAction",
        "com.coremedia.cms.editor.sdk.desktop.ExtensionsMenuToolbar",
        "com.coremedia.ui.plugins.AddItemsPlugin",
        "mx.resources.ResourceManager",
        "net.jangaroo.ext.Exml"
      ],
      uses: [
        "com.coremedia.blueprint.social.SocialHubMainTab",
        "com.coremedia.blueprint.social.beans.ComposerModelImpl",
        "com.coremedia.blueprint.social.beans.MessageImpl",
        "com.coremedia.blueprint.social.beans.SocialHubAdapterImpl",
        "com.coremedia.blueprint.social.beans.SocialHubAdaptersImpl"
      ]
    };
});
