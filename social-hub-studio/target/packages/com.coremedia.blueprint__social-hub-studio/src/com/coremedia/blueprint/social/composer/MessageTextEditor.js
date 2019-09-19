Ext.define("com.coremedia.blueprint.social.composer.MessageTextEditor", function(MessageTextEditor) {/*package com.coremedia.blueprint.social.composer{
import com.coremedia.blueprint.social.composer.*;
import net.jangaroo.ext.Exml;
import com.coremedia.ui.components.StatefulTextField;
import com.coremedia.ui.plugins.BindPropertyPlugin;
import com.coremedia.ui.plugins.BlockEnterPlugin;
import ext.layout.container.VBoxLayout;
public class MessageTextEditor extends MessageTextEditorBase{

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.editor.text";

    public*/function MessageTextEditor$(config/*:MessageTextEditor = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.MessageTextEditorBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.MessageTextEditorBase,{});
    var defaults_$1/*:MessageTextEditor*/ =AS3.cast(MessageTextEditor,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    var ui_StatefulTextField_15_5_$1/*:com.coremedia.ui.components.StatefulTextField*/ =AS3.cast(com.coremedia.ui.components.StatefulTextField,{});
    AS3.setBindable(ui_StatefulTextField_15_5_$1,"fieldLabel" ,net.jangaroo.ext.Exml.asString( AS3.getBindable(config,"property").getDisplayName()));
    ui_StatefulTextField_15_5_$1.itemId =net.jangaroo.ext.Exml.asString( AS3.getBindable(config,"property").getName());
    ui_StatefulTextField_15_5_$1.labelSeparator = "";
    ui_StatefulTextField_15_5_$1.labelAlign = "top";
    AS3.setBindable(ui_StatefulTextField_15_5_$1,"emptyText" ,net.jangaroo.ext.Exml.asString( AS3.getBindable(config,"property").getEmptyText()));
    var ui_BindPropertyPlugin_21_9_$1/*:com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_21_9_$1.bidirectional = true;
    ui_BindPropertyPlugin_21_9_$1.bindTo = AS3.getBindable(config,"bindTo");
    var ui_BlockEnterPlugin_22_9_$1/*:com.coremedia.ui.plugins.BlockEnterPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BlockEnterPlugin,{});
    ui_StatefulTextField_15_5_$1.plugins = [ui_BindPropertyPlugin_21_9_$1, ui_BlockEnterPlugin_22_9_$1];
    config_$1.items = [ui_StatefulTextField_15_5_$1];
    var layout_VBox_27_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_27_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_27_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$$tW3(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.MessageTextEditorBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.editor.text",
      constructor: MessageTextEditor$,
      super$$tW3: function() {
        com.coremedia.blueprint.social.composer.MessageTextEditorBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.composer.MessageTextEditorBase",
        "com.coremedia.ui.components.StatefulTextField",
        "com.coremedia.ui.plugins.BindPropertyPlugin",
        "com.coremedia.ui.plugins.BlockEnterPlugin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
