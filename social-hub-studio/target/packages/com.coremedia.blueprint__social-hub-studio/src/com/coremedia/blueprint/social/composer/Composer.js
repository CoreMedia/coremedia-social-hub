Ext.define("com.coremedia.blueprint.social.composer.Composer", function(Composer) {/*package com.coremedia.blueprint.social.composer{
import com.coremedia.blueprint.social.composer.*;
import net.jangaroo.ext.Exml;
import ext.container.Container;
import ext.form.field.DisplayField;
import ext.layout.container.HBoxLayout;
import com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField;
import com.coremedia.ui.plugins.VerticalSpacingPlugin;
import ext.layout.container.VBoxLayout;
import com.coremedia.ui.plugins.BindComponentsPlugin;
import com.coremedia.ui.plugins.BindVisibilityPlugin;
import ext.button.Button;
public class Composer extends ComposerBase{

    import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
    import com.coremedia.ui.bem.SpacingBEMEntities;
    import com.coremedia.ui.skins.ButtonSkin;
    import com.coremedia.ui.skins.ContainerSkin;
    import com.coremedia.ui.skins.DisplayFieldSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.composer";
    public static const EDITOR_PANEL:String = "editorPanel";

    public*/function Composer$(config/*:Composer = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.ComposerBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.ComposerBase,{});
    var defaults_$1/*:Composer*/ =AS3.cast(Composer,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    config_$1.header = false;
    AS3.setBindable(config_$1,"closable" , true);
    AS3.setBindable(config_$1,"width" , 460);
    config_$1.resizable = false;
    AS3.setBindable(config_$1,"minWidth" , 460.0);
    var container_28_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_28_5_$1,"style" , "padding: 8px;background-color:" + AS3.getBindable(config,"adapter").getColor());
    var displayField_30_9_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_30_9_$1,"value" , this.getComposerTitle(AS3.getBindable(config,"adapter")));
    displayField_30_9_$1.ui =net.jangaroo.ext.Exml.asString( null);
    AS3.setBindable(displayField_30_9_$1,"style" , "color:#fff;font-weight:bold;");
    var container_31_9_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_31_9_$1.flex = 1.0;
    container_28_5_$1.items = [displayField_30_9_$1, container_31_9_$1];
    var layout_HBox_38_9_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_38_9_$1,"align" , "stretch");
    AS3.setBindable(layout_HBox_38_9_$1,"pack" , "center");
    AS3.setBindable(container_28_5_$1,"layout" , layout_HBox_38_9_$1);
    var container_41_5_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_41_5_$1.itemId =net.jangaroo.ext.Exml.asString( Composer.EDITOR_PANEL);
    container_41_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ContainerSkin.GRID_200.getSkin());
    AS3.setBindable(container_41_5_$1,"autoScroll" , true);
    AS3.setBindable(container_41_5_$1,"maxHeight" , 550.0);
    AS3.setBindable(container_41_5_$1,"scrollable" , true);
    var editor_DateTimePropertyField_47_9_$1/*:com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField*/ =AS3.cast(com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField,{});
    AS3.setBindable(editor_DateTimePropertyField_47_9_$1,"bindTo" , AS3.getBindable(config,"bindTo"));
    editor_DateTimePropertyField_47_9_$1.labelSeparator = "";
    editor_DateTimePropertyField_47_9_$1.labelAlign = "top";
    AS3.setBindable(editor_DateTimePropertyField_47_9_$1,"fieldLabel" , "");
    AS3.setBindable(editor_DateTimePropertyField_47_9_$1,"propertyName" ,net.jangaroo.ext.Exml.asString( com.coremedia.blueprint.social.beans.SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE));
    container_41_5_$1.items = [editor_DateTimePropertyField_47_9_$1];
    var ui_VerticalSpacingPlugin_55_9_$1/*:com.coremedia.ui.plugins.VerticalSpacingPlugin*/ =AS3.cast(com.coremedia.ui.plugins.VerticalSpacingPlugin,{});
    AS3.setBindable(ui_VerticalSpacingPlugin_55_9_$1,"modifier" , com.coremedia.ui.bem.SpacingBEMEntities.VERTICAL_SPACING_MODIFIER_200);
    container_41_5_$1.plugins = [ui_VerticalSpacingPlugin_55_9_$1];
    var layout_VBox_58_9_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_58_9_$1,"align" , "stretch");
    AS3.setBindable(container_41_5_$1,"layout" , layout_VBox_58_9_$1);
    var container_61_5_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    AS3.setBindable(container_61_5_$1,"style" , "padding:8px;background-color:#c41313 !important;");
    var displayField_63_9_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    displayField_63_9_$1.ui =net.jangaroo.ext.Exml.asString( null);
    AS3.setBindable(displayField_63_9_$1,"style" , "color:#FFF;font-weight:bold;");
    AS3.setBindable(displayField_63_9_$1,"value" , this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error'));
    container_61_5_$1.items = [displayField_63_9_$1];
    var ui_BindComponentsPlugin_68_9_$1/*:com.coremedia.ui.plugins.BindComponentsPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindComponentsPlugin,{});
    AS3.setBindable(ui_BindComponentsPlugin_68_9_$1,"valueExpression" , this.getErrorMessagesExpression());
    AS3.setBindable(ui_BindComponentsPlugin_68_9_$1,"configBeanParameterName" , "value");
    AS3.setBindable(ui_BindComponentsPlugin_68_9_$1,"clearBeforeUpdate" , false);
    var displayField_73_13_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    displayField_73_13_$1.ui =net.jangaroo.ext.Exml.asString( null);
    AS3.setBindable(displayField_73_13_$1,"html" , true);
    AS3.setBindable(displayField_73_13_$1,"style" , "color:#FFF;");
    AS3.setBindable(ui_BindComponentsPlugin_68_9_$1,"template" , displayField_73_13_$1);
    var ui_BindVisibilityPlugin_76_9_$1/*:com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_76_9_$1.bindTo = this.getErrorMessagesExpression();
    AS3.setBindable(ui_BindVisibilityPlugin_76_9_$1,"transformer" , function(values/*:Array*/)/*:Boolean*/ {return values.length !== 0;});
    container_61_5_$1.plugins = [ui_BindComponentsPlugin_68_9_$1, ui_BindVisibilityPlugin_76_9_$1];
    var layout_VBox_80_9_$1/*: ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_80_9_$1,"align" , "stretch");
    AS3.setBindable(container_61_5_$1,"layout" , layout_VBox_80_9_$1);
    config_$1.items = [container_28_5_$1, container_41_5_$1, container_61_5_$1];
    var button_85_5_$1/*:ext.button.Button*/ =AS3.cast(Ext.button.Button,{});
    button_85_5_$1.itemId = "postBtn";
    button_85_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.FOOTER_PRIMARY.getSkin());
    AS3.setBindable(button_85_5_$1,"text" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'post_button_text')));
    AS3.setBindable(button_85_5_$1,"handler" ,AS3.bind( this,"finishComposing"));
    var button_89_5_$1/*: ext.button.Button*/ =AS3.cast(Ext.button.Button,{});
    button_89_5_$1.itemId = "cancelBtn";
    button_89_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ButtonSkin.FOOTER_SECONDARY.getSkin());
    AS3.setBindable(button_89_5_$1,"text" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'cancel_button_text')));
    AS3.setBindable(button_89_5_$1,"handler" ,AS3.bind( this,"closeComposer"));
    config_$1.buttons = [button_85_5_$1, button_89_5_$1];
    var layout_VBox_95_5_$1/*: ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_95_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_95_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$fmS_(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.ComposerBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.composer",
      constructor: Composer$,
      super$fmS_: function() {
        com.coremedia.blueprint.social.composer.ComposerBase.prototype.constructor.apply(this, arguments);
      },
      statics: {EDITOR_PANEL: "editorPanel"},
      requires: [
        "Ext.button.Button",
        "Ext.container.Container",
        "Ext.form.field.Display",
        "Ext.layout.container.HBox",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.composer.ComposerBase",
        "com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField",
        "com.coremedia.ui.bem.SpacingBEMEntities",
        "com.coremedia.ui.plugins.BindComponentsPlugin",
        "com.coremedia.ui.plugins.BindVisibilityPlugin",
        "com.coremedia.ui.plugins.VerticalSpacingPlugin",
        "com.coremedia.ui.skins.ButtonSkin",
        "com.coremedia.ui.skins.ContainerSkin",
        "net.jangaroo.ext.Exml"
      ],
      uses: ["com.coremedia.blueprint.social.beans.SocialHubPropertyNames"]
    };
});
