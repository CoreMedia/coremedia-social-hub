Ext.define("com.coremedia.blueprint.social.composer.MessageCharacterCounterBase", function(MessageCharacterCounterBase) {/*package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.cms.editor.sdk.util.RichTextPlainTextTransformer;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;

import ext.StringUtil;
import ext.panel.Panel;

public class MessageCharacterCounterBase extends Panel {

  [Bindable]
  public var adapter:SocialHubAdapter;

  [Bindable]
  public var bindTo:ValueExpression;

  private var counterExpression:ValueExpression;

  public*/ function MessageCharacterCounterBase$(config/*:MessageCharacterCounterBase = null*/) {if(arguments.length<=0)config=null;
    this.super$XV$D(config);
  }/*

  /**
   * Returns the ValueExpression that is used to calculate the message character count.
   * /
  protected*/ function getMessageCounterExpression(bindTo/*:ValueExpression*/)/*:ValueExpression*/ {
    if (!this.counterExpression$XV$D) {
      this.counterExpression$XV$D = com.coremedia.ui.data.ValueExpressionFactory.createFromFunction(function ()/*:String*/ {
        var rt/*:String*/ = bindTo.getValue();
        if(rt === undefined) {
          return undefined;
        }

        var plain/*:String*/ = com.coremedia.cms.editor.sdk.util.RichTextPlainTextTransformer.convertToPlainText(rt);
        plain = Ext.String.trim(plain);
        return "" + plain.length;
      });
    }
    return this.counterExpression$XV$D;
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.panel.Panel",
      counterExpression$XV$D: null,
      constructor: MessageCharacterCounterBase$,
      super$XV$D: function() {
        Ext.panel.Panel.prototype.constructor.apply(this, arguments);
      },
      getMessageCounterExpression: getMessageCounterExpression,
      config: {
        adapter: null,
        bindTo: null
      },
      requires: [
        "Ext.String",
        "Ext.panel.Panel",
        "com.coremedia.cms.editor.sdk.util.RichTextPlainTextTransformer",
        "com.coremedia.ui.data.ValueExpressionFactory"
      ]
    };
});
