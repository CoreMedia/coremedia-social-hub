package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialog;
import com.coremedia.ui.ckeditor.RichTextArea;
import com.coremedia.ui.data.ValueExpression;

import ext.Ext;
import ext.panel.Panel;

public class MessageTextareaEditorBase extends Panel {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function MessageTextareaEditorBase(config:MessageTextareaEditorBase = null) {
    super(config);
  }

  override protected function afterRender():void {
    super.afterRender();
    var ckEditor:* = getRichtextEditor().getCKEditor();
    ckEditor.on('instanceReady', function ():void {
      ckEditor.focus();
      ckEditor.focusManager.focus();
    });
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
}
}
