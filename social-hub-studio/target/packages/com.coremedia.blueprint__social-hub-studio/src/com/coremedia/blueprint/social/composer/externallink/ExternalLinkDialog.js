Ext.define("com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialog", function(ExternalLinkDialog) {/*package com.coremedia.blueprint.social.composer.externallink{
import com.coremedia.blueprint.social.composer.externallink.*;
import net.jangaroo.ext.Exml;
import ext.form.FieldContainer;
import com.coremedia.ui.components.StatefulTextField;
import com.coremedia.ui.plugins.BlockEnterPlugin;
import com.coremedia.ui.plugins.BindPropertyPlugin;
import ext.layout.container.HBoxLayout;
import ext.container.Container;
import ext.form.field.Checkbox;
import ext.layout.container.VBoxLayout;
import ext.toolbar.Toolbar;
import ext.toolbar.Fill;
import ext.button.Button;

    [ResourceBundle('com.coremedia.cms.editor.Editor')]
public class ExternalLinkDialog extends ExternalLinkDialogBase{

    import com.coremedia.ui.skins.ButtonSkin;
    import com.coremedia.ui.skins.WindowSkin;

    public*/function ExternalLinkDialog$(config/*:ExternalLinkDialog = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialogBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialogBase,{});
    var defaults_$1/*:ExternalLinkDialog*/ =AS3.cast(ExternalLinkDialog,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"title" , this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'external_link_dialog_title'));
    AS3.setBindable(config_$1,"width" , 400);
    AS3.setBindable(config_$1,"height" , 160);
    config_$1.modal = true;
    config_$1.constrainHeader = true;
    config_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.WindowSkin.GRID_200.getSkin());
    var fieldContainer_26_5_$1/*:ext.form.FieldContainer*/ =AS3.cast(Ext.form.FieldContainer,{});
    AS3.setBindable(fieldContainer_26_5_$1,"fieldLabel" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'external_link_dialog_url_text')));
    var ui_StatefulTextField_29_9_$1/*:com.coremedia.ui.components.StatefulTextField*/ =AS3.cast(com.coremedia.ui.components.StatefulTextField,{});
    ui_StatefulTextField_29_9_$1.name = "link";
    ui_StatefulTextField_29_9_$1.flex = 1.0;
    var ui_BlockEnterPlugin_31_13_$1/*:com.coremedia.ui.plugins.BlockEnterPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BlockEnterPlugin,{});
    var ui_BindPropertyPlugin_32_13_$1/*:com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_32_13_$1.bindTo = this.getUrlValueExpression();
    ui_BindPropertyPlugin_32_13_$1.ifUndefined = '';
    ui_BindPropertyPlugin_32_13_$1.bidirectional = true;
    ui_StatefulTextField_29_9_$1.plugins = [ui_BlockEnterPlugin_31_13_$1, ui_BindPropertyPlugin_32_13_$1];
    fieldContainer_26_5_$1.items = [ui_StatefulTextField_29_9_$1];
    var layout_HBox_39_9_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_39_9_$1,"align" , "stretch");
    AS3.setBindable(fieldContainer_26_5_$1,"layout" , layout_HBox_39_9_$1);
    var container_42_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_42_5_$1,"height" , 6);
    var fieldContainer_43_5_$1/*: ext.form.FieldContainer*/ =AS3.cast(Ext.form.FieldContainer,{});
    AS3.setBindable(fieldContainer_43_5_$1,"fieldLabel" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'external_link_dialog_shorten_text')));
    var checkbox_46_9_$1/*:ext.form.field.Checkbox*/ =AS3.cast(Ext.form.field.Checkbox,{});
    var ui_BindPropertyPlugin_48_13_$1/*: com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_48_13_$1.bidirectional = true;
    ui_BindPropertyPlugin_48_13_$1.ifUndefined = "false";
    ui_BindPropertyPlugin_48_13_$1.bindTo = this.getShortenLinkCheckboxExpression();
    checkbox_46_9_$1.plugins = [ui_BindPropertyPlugin_48_13_$1];
    fieldContainer_43_5_$1.items = [checkbox_46_9_$1];
    var layout_HBox_55_9_$1/*: ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_55_9_$1,"align" , "stretch");
    AS3.setBindable(fieldContainer_43_5_$1,"layout" , layout_HBox_55_9_$1);
    config_$1.items = [fieldContainer_26_5_$1, container_42_5_$1, fieldContainer_43_5_$1];
    var layout_VBox_60_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_60_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_60_5_$1);
    var toolbar_63_5_$1/*:ext.toolbar.Toolbar*/ =AS3.cast(Ext.toolbar.Toolbar,{});
    var tbFill_65_9_$1/*:ext.toolbar.Fill*/ =AS3.cast(Ext.toolbar.Fill,{});
    var button_66_9_$1/*:ext.button.Button*/ =AS3.cast(Ext.button.Button,{});
    button_66_9_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.FOOTER_PRIMARY.getSkin());
    AS3.setBindable(button_66_9_$1,"scale" , "small");
    AS3.setBindable(button_66_9_$1,"text" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.cms.editor.Editor', 'dialog_defaultSubmitButton_text')));
    AS3.setBindable(button_66_9_$1,"handler" ,AS3.bind( this,"okPressed"));
    var ui_BindPropertyPlugin_71_13_$1/*: com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_71_13_$1.componentProperty = "disabled";
    ui_BindPropertyPlugin_71_13_$1.bindTo = this.getSubmitButtonDisabledExpression();
    button_66_9_$1.plugins = [ui_BindPropertyPlugin_71_13_$1];
    var button_75_9_$1/*: ext.button.Button*/ =AS3.cast(Ext.button.Button,{});
    button_75_9_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.FOOTER_SECONDARY.getSkin());
    AS3.setBindable(button_75_9_$1,"scale" , "small");
    AS3.setBindable(button_75_9_$1,"text" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.cms.editor.Editor', 'dialog_defaultCancelButton_text')));
    AS3.setBindable(button_75_9_$1,"handler" ,AS3.bind( this,"close"));
    toolbar_63_5_$1.items = [tbFill_65_9_$1, button_66_9_$1, button_75_9_$1];
    config_$1.fbar = toolbar_63_5_$1;
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$xrAu(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialogBase",
      constructor: ExternalLinkDialog$,
      super$xrAu: function() {
        com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialogBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.button.Button",
        "Ext.container.Container",
        "Ext.form.FieldContainer",
        "Ext.form.field.Checkbox",
        "Ext.layout.container.HBox",
        "Ext.layout.container.VBox",
        "Ext.toolbar.Fill",
        "Ext.toolbar.Toolbar",
        "com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialogBase",
        "com.coremedia.cms.editor.Editor_properties",
        "com.coremedia.ui.components.StatefulTextField",
        "com.coremedia.ui.plugins.BindPropertyPlugin",
        "com.coremedia.ui.plugins.BlockEnterPlugin",
        "com.coremedia.ui.skins.ButtonSkin",
        "com.coremedia.ui.skins.WindowSkin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
