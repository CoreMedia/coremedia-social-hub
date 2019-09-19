Ext.define("com.coremedia.blueprint.social.composer.MessageTextareaEditorBase", function(MessageTextareaEditorBase) {/*package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialog;
import com.coremedia.ui.ckeditor.RichTextArea;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.mixins.IValidationStateMixin;
import com.coremedia.ui.mixins.ValidationState;

import ext.Ext;
import ext.StringUtil;
import ext.WindowManager;
import ext.ZIndexManager;
import ext.panel.Panel;

public class MessageTextareaEditorBase extends Panel implements MessageFieldEditor {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  private var ckEditorValueExpression:ValueExpression;
  private var richTextWindowGroup:ZIndexManager;

  public*/ function MessageTextareaEditorBase$(config/*:MessageTextareaEditorBase = null*/) {if(arguments.length<=0)config=null;
    this.super$DDB1(config);
    if(AS3.getBindable(this,"property").isRequired()) {
      AS3.getBindable(this,"bindTo").addChangeListener(AS3.bind(this,"valueChanged$DDB1"));
    }
  }/*

  override protected*/ function afterRender()/*:void*/ {var this$=this;
    Ext.panel.Panel.prototype.afterRender.call(this);
    var ckEditor/*:**/ = this.getRichtextEditor().getCKEditor();
    ckEditor.on('instanceReady', function ()/*:void*/ {
      ckEditor.focus();
      ckEditor.focusManager.focus();
      this$.getCKEditorValueExpression().setValue(ckEditor);

    });
  }/*

  public*/ function getRichTextWindowGroup()/*:ZIndexManager*/ {
    if (!this.richTextWindowGroup$DDB1) {
      this.richTextWindowGroup$DDB1 = new Ext.ZIndexManager();
      this.richTextWindowGroup$DDB1["setBase"](Ext.WindowManager["zseed"] - 10000);
    }
    return this.richTextWindowGroup$DDB1;
  }/*

  public*/ function getCKEditorValueExpression()/*:ValueExpression*/ {
    if (!this.ckEditorValueExpression$DDB1) {
      this.ckEditorValueExpression$DDB1 = com.coremedia.ui.data.ValueExpressionFactory.createFromValue();
    }
    return this.ckEditorValueExpression$DDB1;
  }/*

  private*/ function valueChanged(ve/*:ValueExpression*/)/*:void*/ {
    var editor/*:**/ = this.getRichtextEditor();
    var statefulEditor/*:IValidationStateMixin*/ =AS3.as( editor,  com.coremedia.ui.mixins.ValidationStateMixin);
    if (!ve.getValue() || Ext.String.trim(ve.getValue()).length === 0) {
      AS3.setBindable(statefulEditor,"validationState" , com.coremedia.ui.mixins.ValidationState.ERROR);
    }
    else {
      AS3.setBindable(statefulEditor,"validationState" , undefined);
    }
  }/*

  protected*/ function openExternalLinkDialog()/*:void*/ {
    var dialog/*:ExternalLinkDialog*/ = Ext.create(com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialog, {
      messageEditor: this
    });
    dialog.show();
  }/*

  public*/ function getRichtextEditor()/*:RichTextArea*/ {
    return AS3.as( this.queryById("richtextEditor"),  com.coremedia.ui.ckeditor.RichTextArea);
  }/*

  public*/ function getErrorMessage()/*:String*/ {
    var value/*:String*/ = AS3.getBindable(this,"bindTo").getValue();
    if (!value) {
      var msg/*:String*/ = this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_empty_text');
      var message/*:String*/ = Ext.String.format(msg, AS3.getBindable(this,"property").getDisplayName());
      return message;
    }
    return null;
  }/*

}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.panel.Panel",
      mixins: ["com.coremedia.blueprint.social.composer.MessageFieldEditor"],
      ckEditorValueExpression$DDB1: null,
      richTextWindowGroup$DDB1: null,
      constructor: MessageTextareaEditorBase$,
      super$DDB1: function() {
        Ext.panel.Panel.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      getRichTextWindowGroup: getRichTextWindowGroup,
      getCKEditorValueExpression: getCKEditorValueExpression,
      valueChanged$DDB1: valueChanged,
      openExternalLinkDialog: openExternalLinkDialog,
      getRichtextEditor: getRichtextEditor,
      getErrorMessage: getErrorMessage,
      config: {
        bindTo: null,
        property: null,
        adapter: null
      },
      requires: [
        "Ext",
        "Ext.String",
        "Ext.ZIndexManager",
        "Ext.panel.Panel",
        "com.coremedia.blueprint.social.composer.MessageFieldEditor",
        "com.coremedia.ui.ckeditor.RichTextArea",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.mixins.ValidationState",
        "com.coremedia.ui.mixins.ValidationStateMixin"
      ],
      uses: ["com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialog"]
    };
});
