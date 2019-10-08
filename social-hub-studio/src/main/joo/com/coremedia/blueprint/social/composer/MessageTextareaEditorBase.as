package com.coremedia.blueprint.social.composer {

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

  public function MessageTextareaEditorBase(config:MessageTextareaEditorBase = null) {
    super(config);
    if(property.isRequired()) {
      bindTo.addChangeListener(valueChanged);
    }
  }

  override protected function afterRender():void {
    super.afterRender();
    var ckEditor:* = getRichtextEditor().getCKEditor();
    ckEditor.on('instanceReady', function ():void {
      ckEditor.focus();
      ckEditor.focusManager.focus();
      getCKEditorValueExpression().setValue(ckEditor);

    });
  }

  public function getRichTextWindowGroup():ZIndexManager {
    if (!richTextWindowGroup) {
      richTextWindowGroup = new ZIndexManager();
      richTextWindowGroup["setBase"](WindowManager["zseed"] - 10000);
    }
    return richTextWindowGroup;
  }

  public function getCKEditorValueExpression():ValueExpression {
    if (!ckEditorValueExpression) {
      ckEditorValueExpression = ValueExpressionFactory.createFromValue();
    }
    return ckEditorValueExpression;
  }

  private function valueChanged(ve:ValueExpression):void {
    var editor:* = getRichtextEditor();
    var statefulEditor:IValidationStateMixin = editor as IValidationStateMixin;
    if (!ve.getValue() || StringUtil.trim(ve.getValue()).length === 0) {
      statefulEditor.validationState = ValidationState.ERROR;
    }
    else {
      statefulEditor.validationState = undefined;
    }
  }

  protected function openExternalLinkDialog():void {
    var dialog:ExternalLinkDialog = Ext.create(ExternalLinkDialog, {
      messageEditor: this
    });
    dialog.show();
  }

  public function getRichtextEditor():RichTextArea {
    return queryById("richtextEditor") as RichTextArea;
  }

  public function getErrorMessage():String {
    var value:String = bindTo.getValue();
    if (!value) {
      var msg:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_empty_text');
      var message:String = StringUtil.format(msg, property.getDisplayName());
      return message;
    }
    return null;
  }


  override protected function onDestroy():void {
    super.onDestroy();
    bindTo.removeChangeListener(valueChanged);
  }
}
}
