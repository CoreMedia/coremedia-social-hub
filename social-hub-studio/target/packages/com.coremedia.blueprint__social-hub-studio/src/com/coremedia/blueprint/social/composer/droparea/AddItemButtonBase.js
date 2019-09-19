Ext.define("com.coremedia.blueprint.social.composer.droparea.AddItemButtonBase", function(AddItemButtonBase) {/*package com.coremedia.blueprint.social.composer.droparea {
import ext.container.Container;

public class AddItemButtonBase extends Container {

  [Bindable]
  public var uploadButtonHandler:Function;

  public*/ function AddItemButtonBase$(config/*:AddItemButtonBase = null*/) {if(arguments.length<=0)config=null;
    this.super$UPI3(config);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      constructor: AddItemButtonBase$,
      super$UPI3: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      config: {uploadButtonHandler: null},
      requires: ["Ext.container.Container"]
    };
});
