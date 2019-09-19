Ext.define("com.coremedia.blueprint.social.composer.MessageTextareaEditor", function(MessageTextareaEditor) {/*package com.coremedia.blueprint.social.composer{
import com.coremedia.blueprint.social.composer.*;
import com.coremedia.blueprint.social.composer.richtext.*;
import net.jangaroo.ext.Exml;
import ext.form.field.DisplayField;
import ext.container.Container;
import com.coremedia.ui.components.IconButton;
import ext.layout.container.HBoxLayout;
import ext.layout.container.VBoxLayout;
public class MessageTextareaEditor extends MessageTextareaEditorBase{

    import com.coremedia.ui.data.ValueExpressionFactory;
    import com.coremedia.ui.skins.DisplayFieldSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.editor.markup";
    public static const EXTERNAL_LINK_BUTTON_ITEM_ID:String = "externalLink";
    public static const INTERNAL_LINK_BUTTON_ITEM_ID:String = "internalLink";

    public*/function MessageTextareaEditor$(config/*:MessageTextareaEditor = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.MessageTextareaEditorBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.MessageTextareaEditorBase,{});
    var defaults_$1/*:MessageTextareaEditor*/ =AS3.cast(MessageTextareaEditor,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    var displayField_21_5_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_21_5_$1,"value" , AS3.getBindable(config,"property").getDisplayName());
    displayField_21_5_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.DisplayFieldSkin.BOLD.getSkin());
    var container_22_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    var ui_IconButton_29_9_$1/*:com.coremedia.ui.components.IconButton*/ =AS3.cast(com.coremedia.ui.components.IconButton,{});
    ui_IconButton_29_9_$1.itemId =net.jangaroo.ext.Exml.asString( MessageTextareaEditor.EXTERNAL_LINK_BUTTON_ITEM_ID);
    AS3.setBindable(ui_IconButton_29_9_$1,"handler" ,AS3.bind( this,"openExternalLinkDialog"));
    AS3.setBindable(ui_IconButton_29_9_$1,"tooltip" , this.resourceManager.getString('com.coremedia.ui.ckeditor.CKEditor', 'cmlink_tooltip'));
    AS3.setBindable(ui_IconButton_29_9_$1,"iconCls" ,net.jangaroo.ext.Exml.asString( this.resourceManager.getString('com.coremedia.icons.CoreIcons', 'add_external_link')));
    var container_33_9_$1/*: ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_33_9_$1.flex = 1.0;
    var composer_MessageCharacterCounter_34_9_$1/*: com.coremedia.blueprint.social.composer.MessageCharacterCounter*/ =AS3.cast(com.coremedia.blueprint.social.composer.MessageCharacterCounter,{});
    AS3.setBindable(composer_MessageCharacterCounter_34_9_$1,"bindTo" , AS3.getBindable(config,"bindTo"));
    AS3.setBindable(composer_MessageCharacterCounter_34_9_$1,"adapter" , AS3.getBindable(config,"adapter"));
    container_22_5_$1.items = [ui_IconButton_29_9_$1, container_33_9_$1, composer_MessageCharacterCounter_34_9_$1];
    var layout_HBox_37_9_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_37_9_$1,"align" , "stretch");
    AS3.setBindable(container_22_5_$1,"layout" , layout_HBox_37_9_$1);
    var richtext_MessageRichtextArea_40_5_$1/*: com.coremedia.blueprint.social.composer.richtext.MessageRichtextArea*/ =AS3.cast(com.coremedia.blueprint.social.composer.richtext.MessageRichtextArea,{});
    richtext_MessageRichtextArea_40_5_$1.itemId = "richtextEditor";
    AS3.setBindable(richtext_MessageRichtextArea_40_5_$1,"bindTo" , AS3.getBindable(config,"bindTo"));
    config_$1.items = [displayField_21_5_$1, container_22_5_$1, richtext_MessageRichtextArea_40_5_$1];
    var layout_VBox_43_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_43_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_43_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$cR$G(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.MessageTextareaEditorBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.editor.markup",
      constructor: MessageTextareaEditor$,
      super$cR$G: function() {
        com.coremedia.blueprint.social.composer.MessageTextareaEditorBase.prototype.constructor.apply(this, arguments);
      },
      statics: {
        EXTERNAL_LINK_BUTTON_ITEM_ID: "externalLink",
        INTERNAL_LINK_BUTTON_ITEM_ID: "internalLink"
      },
      requires: [
        "Ext.container.Container",
        "Ext.form.field.Display",
        "Ext.layout.container.HBox",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.composer.MessageTextareaEditorBase",
        "com.coremedia.ui.components.IconButton",
        "com.coremedia.ui.skins.DisplayFieldSkin",
        "net.jangaroo.ext.Exml"
      ],
      uses: [
        "com.coremedia.blueprint.social.composer.MessageCharacterCounter",
        "com.coremedia.blueprint.social.composer.richtext.MessageRichtextArea"
      ]
    };
});
