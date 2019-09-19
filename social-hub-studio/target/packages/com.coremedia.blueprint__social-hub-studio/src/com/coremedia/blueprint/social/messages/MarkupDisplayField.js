Ext.define("com.coremedia.blueprint.social.messages.MarkupDisplayField", function(MarkupDisplayField) {/*package com.coremedia.blueprint.social.messages{
import com.coremedia.blueprint.social.messages.*;
import net.jangaroo.ext.Exml;
import ext.form.field.DisplayField;
import com.coremedia.ui.plugins.BindVisibilityPlugin;
import com.coremedia.ui.plugins.BindPropertyPlugin;
import com.coremedia.ui.plugins.VerticalSpacingPlugin;
import ext.layout.container.VBoxLayout;
public class MarkupDisplayField extends MarkupDisplayFieldBase{

    import com.coremedia.blueprint.social.CustomStyles;
    import com.coremedia.ui.bem.SpacingBEMEntities;
    import com.coremedia.ui.data.ValueExpressionFactory;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.message.field.markup";

    public*/function MarkupDisplayField$(config/*:MarkupDisplayField = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.messages.MarkupDisplayFieldBase*/ =AS3.cast(com.coremedia.blueprint.social.messages.MarkupDisplayFieldBase,{});
    var defaults_$1/*:MarkupDisplayField*/ =AS3.cast(MarkupDisplayField,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"style" , com.coremedia.blueprint.social.CustomStyles.MESSAGE_DISPLAY_FIELD);
    var displayField_20_5_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_20_5_$1,"value" , this.localizeFieldName(AS3.getBindable(config,"messageContainerDescriptor").getPropertyName()));
    AS3.setBindable(displayField_20_5_$1,"style" , com.coremedia.blueprint.social.CustomStyles.READONLY_TITLE);
    displayField_20_5_$1.ui =net.jangaroo.ext.Exml.asString( null);
    var ui_BindVisibilityPlugin_23_9_$1/*:com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_23_9_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"messageContainerDescriptor").showLabel());
    displayField_20_5_$1.plugins = [ui_BindVisibilityPlugin_23_9_$1];
    var displayField_27_5_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_27_5_$1,"html" , true);
    displayField_27_5_$1.itemId = "markup";
    AS3.setBindable(displayField_27_5_$1,"style" , com.coremedia.blueprint.social.CustomStyles.READONLY_TEXT);
    displayField_27_5_$1.ui =net.jangaroo.ext.Exml.asString( null);
    var ui_BindPropertyPlugin_29_9_$1/*:com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_29_9_$1.bindTo = AS3.getBindable(config,"bindTo");
    displayField_27_5_$1.plugins = [ui_BindPropertyPlugin_29_9_$1];
    config_$1.items = [displayField_20_5_$1, displayField_27_5_$1];
    var ui_VerticalSpacingPlugin_34_5_$1/*:com.coremedia.ui.plugins.VerticalSpacingPlugin*/ =AS3.cast(com.coremedia.ui.plugins.VerticalSpacingPlugin,{});
    AS3.setBindable(ui_VerticalSpacingPlugin_34_5_$1,"modifier" , com.coremedia.ui.bem.SpacingBEMEntities.VERTICAL_SPACING_MODIFIER_25);
    config_$1.plugins = [ui_VerticalSpacingPlugin_34_5_$1];
    var layout_VBox_37_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_37_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_37_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$2W2I(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.messages.MarkupDisplayFieldBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.message.field.markup",
      constructor: MarkupDisplayField$,
      super$2W2I: function() {
        com.coremedia.blueprint.social.messages.MarkupDisplayFieldBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.form.field.Display",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.messages.MarkupDisplayFieldBase",
        "com.coremedia.ui.bem.SpacingBEMEntities",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.plugins.BindPropertyPlugin",
        "com.coremedia.ui.plugins.BindVisibilityPlugin",
        "com.coremedia.ui.plugins.VerticalSpacingPlugin",
        "net.jangaroo.ext.Exml"
      ],
      uses: ["com.coremedia.blueprint.social.CustomStyles"]
    };
});
