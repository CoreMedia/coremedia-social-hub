Ext.define("com.coremedia.blueprint.social.messages.AssetsDisplayFieldBase", function(AssetsDisplayFieldBase) {/*package com.coremedia.blueprint.social.messages {
public class AssetsDisplayFieldBase extends MessageDisplayFieldBase {

  public*/ function AssetsDisplayFieldBase$(config/*:AssetsDisplayFieldBase = null*/) {if(arguments.length<=0)config=null;
    this.super$lgdU(config);
  }/*

}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.messages.MessageDisplayFieldBase",
      constructor: AssetsDisplayFieldBase$,
      super$lgdU: function() {
        com.coremedia.blueprint.social.messages.MessageDisplayFieldBase.prototype.constructor.apply(this, arguments);
      },
      requires: ["com.coremedia.blueprint.social.messages.MessageDisplayFieldBase"]
    };
});
