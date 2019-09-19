package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.ui.data.ValueExpression;
import ext.container.Container;

public class ColorChooserBase extends ext.container.Container {
  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  public function ColorChooserBase(config:com.coremedia.blueprint.social.channels.ColorChooserBase = null) {
    super();
  }

  protected native function getColorButtonsExpression():com.coremedia.ui.data.ValueExpression;
}
}