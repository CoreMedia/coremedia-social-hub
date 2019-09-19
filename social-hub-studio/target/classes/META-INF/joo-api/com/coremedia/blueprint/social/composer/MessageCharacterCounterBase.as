package com.coremedia.blueprint.social.composer {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.ui.data.ValueExpression;
import ext.panel.Panel;

public class MessageCharacterCounterBase extends ext.panel.Panel {
  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  [Bindable(event = "DUMMY")]
  public var bindTo:com.coremedia.ui.data.ValueExpression;

  public function MessageCharacterCounterBase(config:com.coremedia.blueprint.social.composer.MessageCharacterCounterBase = null) {
    super();
  }

  /**
   * Returns the ValueExpression that is used to calculate the message character count.
   */
  protected native function getMessageCounterExpression(bindTo:com.coremedia.ui.data.ValueExpression):com.coremedia.ui.data.ValueExpression;
}
}