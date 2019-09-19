package com.coremedia.blueprint.social.composer.richtext {
import com.coremedia.ui.ckeditor.RichTextArea;
import com.coremedia.ui.data.ValueExpression;

public class MessageRichtextAreaBase extends com.coremedia.ui.ckeditor.RichTextArea {
  [Bindable(event = "DUMMY")]
  public var bindTo:com.coremedia.ui.data.ValueExpression;

  public function MessageRichtextAreaBase(config:com.coremedia.blueprint.social.composer.richtext.MessageRichtextAreaBase = null) {
    super();
  }
}
}