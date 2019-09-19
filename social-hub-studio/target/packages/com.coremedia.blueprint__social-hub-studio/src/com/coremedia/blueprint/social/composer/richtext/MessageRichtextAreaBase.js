Ext.define("com.coremedia.blueprint.social.composer.richtext.MessageRichtextAreaBase", function(MessageRichtextAreaBase) {/*package com.coremedia.blueprint.social.composer.richtext {

import com.coremedia.ui.ckeditor.RichTextArea;
import com.coremedia.ui.data.ValueExpression;

public class MessageRichtextAreaBase extends RichTextArea {

  [Bindable]
  public var bindTo:ValueExpression;

  public*/ function MessageRichtextAreaBase$(config/*:MessageRichtextAreaBase = null*/) {if(arguments.length<=0)config=null;
    this.super$pHz7(config);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.ui.ckeditor.RichTextArea",
      constructor: MessageRichtextAreaBase$,
      super$pHz7: function() {
        com.coremedia.ui.ckeditor.RichTextArea.prototype.constructor.apply(this, arguments);
      },
      config: {bindTo: null},
      requires: ["com.coremedia.ui.ckeditor.RichTextArea"]
    };
});
