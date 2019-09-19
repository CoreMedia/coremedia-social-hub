Ext.define("com.coremedia.blueprint.social.beans.ComposerModelPropertiesImpl", function(ComposerModelPropertiesImpl) {/*package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.SubBean;

public class ComposerModelPropertiesImpl extends SubBean implements ComposerModelProperties {

  public*/ function ComposerModelPropertiesImpl$(parent/*:ComposerModelImpl*/, basePath/*:String*/) {
    this.super$oOXX(parent, basePath);
  }/*

  public*/ function getComposerModel()/*:ComposerModel*/ {
    return AS3.as( this.getParentBean(),  com.coremedia.blueprint.social.beans.ComposerModel);
  }/*

}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.ui.data.impl.SubBean",
      mixins: ["com.coremedia.blueprint.social.beans.ComposerModelProperties"],
      constructor: ComposerModelPropertiesImpl$,
      super$oOXX: function() {
        com.coremedia.ui.data.impl.SubBean.prototype.constructor.apply(this, arguments);
      },
      getComposerModel: getComposerModel,
      requires: [
        "com.coremedia.blueprint.social.beans.ComposerModelProperties",
        "com.coremedia.ui.data.impl.SubBean"
      ],
      uses: ["com.coremedia.blueprint.social.beans.ComposerModel"]
    };
});
