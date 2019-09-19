Ext.define("com.coremedia.blueprint.social.composer.MessageChoiceEditor", function(MessageChoiceEditor) {/*package com.coremedia.blueprint.social.composer{
import com.coremedia.blueprint.social.composer.*;
import net.jangaroo.ext.Exml;
import com.coremedia.ui.components.LocalComboBox;
import com.coremedia.ui.plugins.BindPropertyPlugin;
import ext.layout.container.VBoxLayout;
public class MessageChoiceEditor extends MessageChoiceEditorBase{

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.editor.choice";

    public*/function MessageChoiceEditor$(config/*:MessageChoiceEditor = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.MessageChoiceEditorBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.MessageChoiceEditorBase,{});
    var defaults_$1/*:MessageChoiceEditor*/ =AS3.cast(MessageChoiceEditor,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    var ui_LocalComboBox_15_5_$1/*:com.coremedia.ui.components.LocalComboBox*/ =AS3.cast(com.coremedia.ui.components.LocalComboBox,{});
    AS3.setBindable(ui_LocalComboBox_15_5_$1,"editable" , false);
    AS3.setBindable(ui_LocalComboBox_15_5_$1,"fieldLabel" ,net.jangaroo.ext.Exml.asString( AS3.getBindable(config,"property").getDisplayName()));
    AS3.setBindable(ui_LocalComboBox_15_5_$1,"emptyText" ,net.jangaroo.ext.Exml.asString( AS3.getBindable(config,"property").getEmptyText()));
    ui_LocalComboBox_15_5_$1.labelAlign = "top";
    ui_LocalComboBox_15_5_$1.itemId =net.jangaroo.ext.Exml.asString( AS3.getBindable(config,"property").getName());
    ui_LocalComboBox_15_5_$1.labelSeparator = "";
    AS3.setBindable(ui_LocalComboBox_15_5_$1,"encodeItems" , true);
    AS3.setBindable(ui_LocalComboBox_15_5_$1,"store" , com.coremedia.blueprint.social.composer.MessageChoiceEditorBase.getStore(AS3.getBindable(config,"property")));
    var ui_BindPropertyPlugin_24_9_$1/*:com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_24_9_$1.bidirectional = true;
    ui_BindPropertyPlugin_24_9_$1.bindTo = AS3.getBindable(config,"bindTo");
    ui_LocalComboBox_15_5_$1.plugins = [ui_BindPropertyPlugin_24_9_$1];
    config_$1.items = [ui_LocalComboBox_15_5_$1];
    var layout_VBox_29_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_29_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_29_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$LCit(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.MessageChoiceEditorBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.editor.choice",
      constructor: MessageChoiceEditor$,
      super$LCit: function() {
        com.coremedia.blueprint.social.composer.MessageChoiceEditorBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.composer.MessageChoiceEditorBase",
        "com.coremedia.ui.components.LocalComboBox",
        "com.coremedia.ui.plugins.BindPropertyPlugin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
