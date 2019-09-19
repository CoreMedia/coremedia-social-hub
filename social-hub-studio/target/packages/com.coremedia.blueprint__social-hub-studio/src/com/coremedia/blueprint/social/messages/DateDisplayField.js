Ext.define("com.coremedia.blueprint.social.messages.DateDisplayField", function(DateDisplayField) {/*package com.coremedia.blueprint.social.messages{
import com.coremedia.blueprint.social.messages.*;
import net.jangaroo.ext.Exml;
import ext.form.field.DisplayField;
import com.coremedia.ui.plugins.BindVisibilityPlugin;
import com.coremedia.ui.plugins.BindPropertyPlugin;
import com.coremedia.ui.plugins.VerticalSpacingPlugin;
import ext.layout.container.VBoxLayout;
public class DateDisplayField extends MessageDisplayFieldBase{

    import com.coremedia.blueprint.social.CustomStyles;
    import com.coremedia.ui.bem.SpacingBEMEntities;
    import com.coremedia.ui.data.ValueExpressionFactory;
    import com.coremedia.ui.util.EncodingUtil;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.message.field.date";

    public*/function DateDisplayField$(config/*:DateDisplayField = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.messages.MessageDisplayFieldBase*/ =AS3.cast(com.coremedia.blueprint.social.messages.MessageDisplayFieldBase,{});
    var defaults_$1/*:DateDisplayField*/ =AS3.cast(DateDisplayField,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"style" , com.coremedia.blueprint.social.CustomStyles.MESSAGE_DISPLAY_FIELD);
    var displayField_21_5_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_21_5_$1,"value" , this.localizeFieldName(AS3.getBindable(config,"messageContainerDescriptor").getPropertyName()));
    AS3.setBindable(displayField_21_5_$1,"style" , com.coremedia.blueprint.social.CustomStyles.READONLY_TITLE);
    displayField_21_5_$1.ui =net.jangaroo.ext.Exml.asString( null);
    var ui_BindVisibilityPlugin_24_9_$1/*:com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_24_9_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"messageContainerDescriptor").showLabel());
    displayField_21_5_$1.plugins = [ui_BindVisibilityPlugin_24_9_$1];
    var displayField_28_5_$1/*: ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_28_5_$1,"style" , com.coremedia.blueprint.social.CustomStyles.READONLY_TEXT);
    displayField_28_5_$1.ui =net.jangaroo.ext.Exml.asString( null);
    var ui_BindPropertyPlugin_30_9_$1/*:com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_30_9_$1.transformer = com.coremedia.ui.util.EncodingUtil.encodeForHTML;
    ui_BindPropertyPlugin_30_9_$1.bindTo = AS3.getBindable(config,"bindTo");
    displayField_28_5_$1.plugins = [ui_BindPropertyPlugin_30_9_$1];
    config_$1.items = [displayField_21_5_$1, displayField_28_5_$1];
    var ui_VerticalSpacingPlugin_36_5_$1/*:com.coremedia.ui.plugins.VerticalSpacingPlugin*/ =AS3.cast(com.coremedia.ui.plugins.VerticalSpacingPlugin,{});
    AS3.setBindable(ui_VerticalSpacingPlugin_36_5_$1,"modifier" , com.coremedia.ui.bem.SpacingBEMEntities.VERTICAL_SPACING_MODIFIER_25);
    config_$1.plugins = [ui_VerticalSpacingPlugin_36_5_$1];
    var layout_VBox_39_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_39_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_39_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$vzMO(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.messages.MessageDisplayFieldBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.message.field.date",
      constructor: DateDisplayField$,
      super$vzMO: function() {
        com.coremedia.blueprint.social.messages.MessageDisplayFieldBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.form.field.Display",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.messages.MessageDisplayFieldBase",
        "com.coremedia.ui.bem.SpacingBEMEntities",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.plugins.BindPropertyPlugin",
        "com.coremedia.ui.plugins.BindVisibilityPlugin",
        "com.coremedia.ui.plugins.VerticalSpacingPlugin",
        "com.coremedia.ui.util.EncodingUtil",
        "net.jangaroo.ext.Exml"
      ],
      uses: ["com.coremedia.blueprint.social.CustomStyles"]
    };
});
