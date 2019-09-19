Ext.define("com.coremedia.blueprint.social.channels.ColorChooserBase", function(ColorChooserBase) {/*package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.composer.ComposerBase;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;

import ext.container.Container;

public class ColorChooserBase extends Container {

  [Bindable]
  public var adapter:SocialHubAdapter;

  private var colorButtonsExpression:ValueExpression;

  public*/ function ColorChooserBase$(config/*:ColorChooserBase = null*/) {if(arguments.length<=0)config=null;
    this.super$KLgt(config);
  }/*

  protected*/ function getColorButtonsExpression()/*:ValueExpression*/ {
    if(!this.colorButtonsExpression$KLgt) {
      this.colorButtonsExpression$KLgt = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(com.coremedia.blueprint.social.channels.Colors.COLORS);
    }
    return this.colorButtonsExpression$KLgt;
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      colorButtonsExpression$KLgt: null,
      constructor: ColorChooserBase$,
      super$KLgt: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      getColorButtonsExpression: getColorButtonsExpression,
      config: {adapter: null},
      requires: [
        "Ext.container.Container",
        "com.coremedia.ui.data.ValueExpressionFactory"
      ],
      uses: ["com.coremedia.blueprint.social.channels.Colors"]
    };
});
