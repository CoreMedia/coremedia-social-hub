package com.coremedia.blueprint.social.channels {
import com.coremedia.ui.data.ValueExpression;
import ext.panel.Panel;

public class ChannelsContainerBase extends ext.panel.Panel {
  [Bindable(event = "DUMMY")]
  public var adaptersExpression:com.coremedia.ui.data.ValueExpression;

  public function ChannelsContainerBase(config:com.coremedia.blueprint.social.channels.ChannelsContainerBase = null) {
    super();
  }
}
}