package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialog;
import com.coremedia.blueprint.social.composer.internallink.InternalLinkDialog;
import com.coremedia.cms.editor.sdk.util.RichTextPlainTextTransformer;
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

  private var externalLinkDialog:ExternalLinkDialog = null;
  private var internalLinkDialog:InternalLinkDialog = null;

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
    externalLinkDialog = Ext.create(ExternalLinkDialog, {
      messageEditor: this
    });
    externalLinkDialog.show();
  }

  protected function openInternalLinkDialog():void {
    if(internalLinkDialog && internalLinkDialog.isVisible()) {
      internalLinkDialog.destroy();
    }

    internalLinkDialog = Ext.create(InternalLinkDialog, {
      messageEditor: this,
      renderToParent: this,
      x: this.getX() + 24,
      y: this.getY() + 48
    });
    internalLinkDialog.show();
  }


  public function getRichtextEditor():RichTextArea {
    return queryById("richtextEditor") as RichTextArea;
  }

  public function getErrorMessage():String {
    var value:String = bindTo.getValue();
    if (!value && property.isRequired()) {
      var msg:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_empty_text');
      var message:String = StringUtil.format(msg, property.getDisplayName());
      return message;
    }

    var plain:String = RichTextPlainTextTransformer.convertToPlainText(value);
    plain = StringUtil.trim(plain);
    if(plain.length > property.getMaxLength() ) {
      var lengthMsg:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_length_text');
      var lengthMessage:String = StringUtil.format(lengthMsg, property.getDisplayName(), property.getMaxLength());
      return lengthMessage;
    }

    return null;
  }

  override protected function onDestroy():void {
    if(externalLinkDialog !== null) {
      externalLinkDialog.destroy();
    }

    if(internalLinkDialog !== null) {
      internalLinkDialog.destroy();
    }

    super.onDestroy();
    bindTo.removeChangeListener(valueChanged);
  }
}
}
