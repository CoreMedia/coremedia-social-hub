package com.coremedia.blueprint.social.composer {

import com.coremedia.ui.ckeditor.RichTextArea;
import com.coremedia.ui.data.ValueExpression;

public class MessageRichtextAreaBase extends RichTextArea {

  [Bindable]
  public var bindTo:ValueExpression;

  public function MessageRichtextAreaBase(config:MessageRichtextAreaBase = null) {
    super(config);
  }
}
}
