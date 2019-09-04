package com.coremedia.blueprint.social.channels {
import com.coremedia.ui.data.ValueExpression;

import ext.panel.Panel;

public class ChannelsContainerBase extends Panel {
  [Bindable]
  public var adaptersExpression:ValueExpression;

  public function ChannelsContainerBase(config:ChannelsContainerBase = null) {
    super(config);
  }
}
}
