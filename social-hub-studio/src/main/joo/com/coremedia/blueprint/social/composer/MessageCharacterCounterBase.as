package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.cms.editor.sdk.util.RichTextPlainTextTransformer;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;

import ext.StringUtil;
import ext.panel.Panel;

public class MessageCharacterCounterBase extends Panel {

  [ExtConfig]
  public var adapter:SocialHubAdapter;

  [ExtConfig]
  public var bindTo:ValueExpression;

  private var counterExpression:ValueExpression;

  public function MessageCharacterCounterBase(config:MessageCharacterCounterBase = null) {
    super(config);
  }

  /**
   * Returns the ValueExpression that is used to calculate the message character count.
   */
  protected function getMessageCounterExpression(bindTo:ValueExpression):ValueExpression {
    if (!counterExpression) {
      counterExpression = ValueExpressionFactory.createFromFunction(function ():String {
        var rt:String = bindTo.getValue();
        if(rt === undefined) {
          return undefined;
        }

        var plain:String = RichTextPlainTextTransformer.convertToPlainText(rt);
        plain = StringUtil.trim(plain);
        return "" + plain.length;
      });
    }
    return counterExpression;
  }
}
}
