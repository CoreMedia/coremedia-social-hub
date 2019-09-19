Ext.define("com.coremedia.blueprint.social.messages.AssetsDisplayField", function(AssetsDisplayField) {/*package com.coremedia.blueprint.social.messages{
import com.coremedia.blueprint.social.messages.*;
import net.jangaroo.ext.Exml;
import ext.form.field.DisplayField;
import com.coremedia.ui.plugins.BindVisibilityPlugin;
import com.coremedia.cms.editor.sdk.premular.fields.LinkListGridPanel;
import com.coremedia.cms.editor.sdk.util.MemoryLinkListWrapper;
import com.coremedia.ui.plugins.VerticalSpacingPlugin;
import ext.layout.container.VBoxLayout;
public class AssetsDisplayField extends AssetsDisplayFieldBase{

    import com.coremedia.blueprint.social.CustomStyles;
    import com.coremedia.ui.bem.SpacingBEMEntities;
    import com.coremedia.ui.data.ValueExpressionFactory;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.message.field.assetlist";
    public static const MEDIA_CONTAINER_ITEM_ID:String = "postMediaContainer";

    public*/function AssetsDisplayField$(config/*:AssetsDisplayField = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.messages.AssetsDisplayFieldBase*/ =AS3.cast(com.coremedia.blueprint.social.messages.AssetsDisplayFieldBase,{});
    var defaults_$1/*:AssetsDisplayField*/ =AS3.cast(AssetsDisplayField,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"style" , com.coremedia.blueprint.social.CustomStyles.MESSAGE_DISPLAY_FIELD);
    var displayField_23_5_$1/*:ext.form.field.DisplayField*/ =AS3.cast(Ext.form.field.Display,{});
    AS3.setBindable(displayField_23_5_$1,"value" , this.localizeFieldName(AS3.getBindable(config,"messageContainerDescriptor").getPropertyName()));
    AS3.setBindable(displayField_23_5_$1,"style" , com.coremedia.blueprint.social.CustomStyles.READONLY_TITLE);
    displayField_23_5_$1.ui =net.jangaroo.ext.Exml.asString( null);
    var ui_BindVisibilityPlugin_27_9_$1/*:com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    ui_BindVisibilityPlugin_27_9_$1.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(config,"messageContainerDescriptor").showLabel());
    displayField_23_5_$1.plugins = [ui_BindVisibilityPlugin_27_9_$1];
    var editor_LinkListGridPanel_31_5_$1/*:com.coremedia.cms.editor.sdk.premular.fields.LinkListGridPanel*/ =AS3.cast(com.coremedia.cms.editor.sdk.premular.fields.LinkListGridPanel,{});
    editor_LinkListGridPanel_31_5_$1.itemId = "assetLinkList";
    editor_LinkListGridPanel_31_5_$1.enableColumnMove = false;
    AS3.setBindable(editor_LinkListGridPanel_31_5_$1,"showThumbnails" , true);
    AS3.setBindable(editor_LinkListGridPanel_31_5_$1,"selectedValuesExpression" , com.coremedia.ui.data.ValueExpressionFactory.createFromValue([]));
    AS3.setBindable(editor_LinkListGridPanel_31_5_$1,"hideDropArea" , true);
    AS3.setBindable(editor_LinkListGridPanel_31_5_$1,"readOnlyValueExpression" , com.coremedia.ui.data.ValueExpressionFactory.createFromValue(true));
    var editor_MemoryLinkListWrapper_38_9_$1/*:com.coremedia.cms.editor.sdk.util.MemoryLinkListWrapper*/ =AS3.cast(com.coremedia.cms.editor.sdk.util.MemoryLinkListWrapper,{});
    AS3.setBindable(editor_MemoryLinkListWrapper_38_9_$1,"linksVE" , AS3.getBindable(config,"bindTo"));
    AS3.setBindable(editor_LinkListGridPanel_31_5_$1,"linkListWrapper" , new com.coremedia.cms.editor.sdk.util.MemoryLinkListWrapper(editor_MemoryLinkListWrapper_38_9_$1));
    config_$1.items = [displayField_23_5_$1, editor_LinkListGridPanel_31_5_$1];
    var ui_BindVisibilityPlugin_43_5_$1/*: com.coremedia.ui.plugins.BindVisibilityPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindVisibilityPlugin,{});
    AS3.setBindable(ui_BindVisibilityPlugin_43_5_$1,"transformer" , function(media/*:Array*/)/*:Boolean*/ {return media.length > 0;});
    ui_BindVisibilityPlugin_43_5_$1.bindTo = AS3.getBindable(config,"bindTo");
    var ui_VerticalSpacingPlugin_45_5_$1/*:com.coremedia.ui.plugins.VerticalSpacingPlugin*/ =AS3.cast(com.coremedia.ui.plugins.VerticalSpacingPlugin,{});
    AS3.setBindable(ui_VerticalSpacingPlugin_45_5_$1,"modifier" , com.coremedia.ui.bem.SpacingBEMEntities.VERTICAL_SPACING_MODIFIER_25);
    config_$1.plugins = [ui_BindVisibilityPlugin_43_5_$1, ui_VerticalSpacingPlugin_45_5_$1];
    config_$1["plugins$at"] = net.jangaroo.ext.Exml.APPEND;
    var layout_VBox_48_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_48_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_48_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$FQrj(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.messages.AssetsDisplayFieldBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.message.field.assetlist",
      constructor: AssetsDisplayField$,
      super$FQrj: function() {
        com.coremedia.blueprint.social.messages.AssetsDisplayFieldBase.prototype.constructor.apply(this, arguments);
      },
      statics: {MEDIA_CONTAINER_ITEM_ID: "postMediaContainer"},
      requires: [
        "Ext.form.field.Display",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.messages.AssetsDisplayFieldBase",
        "com.coremedia.cms.editor.sdk.premular.fields.LinkListGridPanel",
        "com.coremedia.cms.editor.sdk.util.MemoryLinkListWrapper",
        "com.coremedia.ui.bem.SpacingBEMEntities",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.plugins.BindVisibilityPlugin",
        "com.coremedia.ui.plugins.VerticalSpacingPlugin",
        "net.jangaroo.ext.Exml"
      ],
      uses: ["com.coremedia.blueprint.social.CustomStyles"]
    };
});
