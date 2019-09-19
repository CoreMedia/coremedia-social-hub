Ext.define("com.coremedia.blueprint.social.composer.MessageDateEditor", function(MessageDateEditor) {/*package com.coremedia.blueprint.social.composer{
import com.coremedia.blueprint.social.composer.*;
import net.jangaroo.ext.Exml;
import com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField;
import ext.layout.container.VBoxLayout;
public class MessageDateEditor extends MessageDateEditorBase{

    import com.coremedia.ui.data.PropertyPathExpression;
    import com.coremedia.ui.data.ValueExpressionFactory;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.editor.date";

    public*/function MessageDateEditor$(config/*:MessageDateEditor = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.MessageDateEditorBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.MessageDateEditorBase,{});
    var defaults_$1/*:MessageDateEditor*/ =AS3.cast(MessageDateEditor,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    var editor_DateTimePropertyField_18_5_$1/*:com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField*/ =AS3.cast(com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField,{});
    AS3.setBindable(editor_DateTimePropertyField_18_5_$1,"bindTo" , com.coremedia.ui.data.ValueExpressionFactory.createFromValue((AS3.as(AS3.getBindable(config,"bindTo"),  com.coremedia.ui.data.PropertyPathExpression)).getBean()));
    editor_DateTimePropertyField_18_5_$1.labelSeparator = "";
    editor_DateTimePropertyField_18_5_$1.labelAlign = "top";
    editor_DateTimePropertyField_18_5_$1.itemId =net.jangaroo.ext.Exml.asString( AS3.getBindable(config,"property").getName());
    AS3.setBindable(editor_DateTimePropertyField_18_5_$1,"fieldLabel" ,net.jangaroo.ext.Exml.asString( AS3.getBindable(config,"property").getDisplayName()));
    AS3.setBindable(editor_DateTimePropertyField_18_5_$1,"propertyName" ,net.jangaroo.ext.Exml.asString( AS3.getBindable(config,"property").getName()));
    config_$1.items = [editor_DateTimePropertyField_18_5_$1];
    var layout_VBox_26_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_26_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_26_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$L7t4(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.MessageDateEditorBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.editor.date",
      constructor: MessageDateEditor$,
      super$L7t4: function() {
        com.coremedia.blueprint.social.composer.MessageDateEditorBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.composer.MessageDateEditorBase",
        "com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField",
        "com.coremedia.ui.data.PropertyPathExpression",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "net.jangaroo.ext.Exml"
      ]
    };
});
