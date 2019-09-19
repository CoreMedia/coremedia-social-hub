Ext.define("com.coremedia.blueprint.social.composer.MessageCharacterCounter", function(MessageCharacterCounter) {/*package com.coremedia.blueprint.social.composer{
import com.coremedia.blueprint.social.composer.*;
import net.jangaroo.ext.Exml;
import ext.form.field.DisplayField;
import com.coremedia.ui.plugins.BindPropertyPlugin;
import ext.layout.container.HBoxLayout;
public class MessageCharacterCounter extends MessageCharacterCounterBase{

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.messageCharacterCounter";

    public*/function MessageCharacterCounter$(config/*:MessageCharacterCounter = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.MessageCharacterCounterBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.MessageCharacterCounterBase,{});
    var defaults_$1/*:MessageCharacterCounter*/ =AS3.cast(MessageCharacterCounter,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    var displayField_15_5_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_15_5_$1,"value" , "");
    var ui_BindPropertyPlugin_17_9_$1/*:com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_17_9_$1.componentProperty = "value";
    ui_BindPropertyPlugin_17_9_$1.bindTo = this.getMessageCounterExpression(AS3.getBindable(config,"bindTo"));
    displayField_15_5_$1.plugins = [ui_BindPropertyPlugin_17_9_$1];
    config_$1.items = [displayField_15_5_$1];
    var layout_HBox_23_5_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(config_$1,"layout" , layout_HBox_23_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$GrBS(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.MessageCharacterCounterBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.messageCharacterCounter",
      constructor: MessageCharacterCounter$,
      super$GrBS: function() {
        com.coremedia.blueprint.social.composer.MessageCharacterCounterBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.form.field.Display",
        "Ext.layout.container.HBox",
        "com.coremedia.blueprint.social.composer.MessageCharacterCounterBase",
        "com.coremedia.ui.plugins.BindPropertyPlugin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
