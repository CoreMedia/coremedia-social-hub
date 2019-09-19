Ext.define("com.coremedia.blueprint.social.channels.ChannelsContainerBase", function(ChannelsContainerBase) {/*package com.coremedia.blueprint.social.channels {
import com.coremedia.ui.data.ValueExpression;

import ext.panel.Panel;

public class ChannelsContainerBase extends Panel {
  [Bindable]
  public var adaptersExpression:ValueExpression;

  public*/ function ChannelsContainerBase$(config/*:ChannelsContainerBase = null*/) {if(arguments.length<=0)config=null;
    this.super$bBPK(config);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.panel.Panel",
      constructor: ChannelsContainerBase$,
      super$bBPK: function() {
        Ext.panel.Panel.prototype.constructor.apply(this, arguments);
      },
      config: {adaptersExpression: null},
      requires: ["Ext.panel.Panel"]
    };
});
