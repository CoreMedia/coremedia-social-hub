package com.coremedia.blueprint.social.composer {
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.ui.ckeditor.RichTextArea;
import com.coremedia.ui.data.ValueExpression;
import ext.ZIndexManager;
import ext.panel.Panel;

public class MessageTextareaEditorBase extends ext.panel.Panel implements com.coremedia.blueprint.social.composer.MessageFieldEditor {
  [Bindable(event = "DUMMY")]
  public var bindTo:com.coremedia.ui.data.ValueExpression;

  [Bindable(event = "DUMMY")]
  public var property:com.coremedia.blueprint.social.beans.MessageProperty;

  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  public function MessageTextareaEditorBase(config:com.coremedia.blueprint.social.composer.MessageTextareaEditorBase = null) {
    super();
  }

  override protected native function afterRender():void;

  public native function getRichTextWindowGroup():ext.ZIndexManager;

  public native function getCKEditorValueExpression():com.coremedia.ui.data.ValueExpression;

  protected native function openExternalLinkDialog():void;

  public native function getRichtextEditor():com.coremedia.ui.ckeditor.RichTextArea;

  public native function getErrorMessage():String;
}
}