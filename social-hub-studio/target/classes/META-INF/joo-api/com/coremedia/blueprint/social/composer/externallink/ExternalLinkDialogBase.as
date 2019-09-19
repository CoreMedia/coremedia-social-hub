package com.coremedia.blueprint.social.composer.externallink {
import com.coremedia.blueprint.social.composer.MessageTextareaEditor;
import com.coremedia.cms.editor.sdk.components.StudioDialog;
import com.coremedia.ui.data.ValueExpression;

public class ExternalLinkDialogBase extends com.coremedia.cms.editor.sdk.components.StudioDialog {
  [Bindable(event = "DUMMY")]
  public var messageEditor:com.coremedia.blueprint.social.composer.MessageTextareaEditor;

  public function ExternalLinkDialogBase(config:com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialogBase = null) {
    super();
  }

  override protected native function afterRender():void;

  protected native function getSubmitButtonDisabledExpression():com.coremedia.ui.data.ValueExpression;

  protected native function getUrlValueExpression():com.coremedia.ui.data.ValueExpression;

  protected native function getShortenLinkCheckboxExpression():com.coremedia.ui.data.ValueExpression;

  protected native function okPressed():void;
}
}