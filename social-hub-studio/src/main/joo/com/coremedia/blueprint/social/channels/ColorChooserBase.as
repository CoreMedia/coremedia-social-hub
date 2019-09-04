package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.composer.ComposerBase;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;

import ext.container.Container;

public class ColorChooserBase extends Container {

  [Bindable]
  public var adapter:SocialHubAdapter;

  private var colorButtonsExpression:ValueExpression;

  public function ColorChooserBase(config:ColorChooserBase = null) {
    super(config);
  }

  protected function getColorButtonsExpression():ValueExpression {
    if(!colorButtonsExpression) {
      colorButtonsExpression = ValueExpressionFactory.createFromValue(Colors.COLORS);
    }
    return colorButtonsExpression;
  }
}
}
