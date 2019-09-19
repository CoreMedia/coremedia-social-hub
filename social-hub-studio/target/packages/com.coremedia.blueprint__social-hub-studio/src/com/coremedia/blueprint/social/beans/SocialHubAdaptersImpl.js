Ext.define("com.coremedia.blueprint.social.beans.SocialHubAdaptersImpl", function(SocialHubAdaptersImpl) {/*package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteBeanImpl;

[RestResource(uriTemplate="socialhub/adapters/{id:[^/]+}")]
public class SocialHubAdaptersImpl extends RemoteBeanImpl implements SocialHubAdapters {*/

  function SocialHubAdaptersImpl$(path/*:String*/) {
    this.super$casH(path);
  }/*

  public*/ function getAdapters()/*:Array*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_LIST);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.ui.data.impl.RemoteBeanImpl",
      mixins: ["com.coremedia.blueprint.social.beans.SocialHubAdapters"],
      metadata: {"": [
        "RestResource",
        [
          "uriTemplate",
          "socialhub/adapters/{id:[^/]+}"
        ]
      ]},
      constructor: SocialHubAdaptersImpl$,
      super$casH: function() {
        com.coremedia.ui.data.impl.RemoteBeanImpl.prototype.constructor.apply(this, arguments);
      },
      getAdapters: getAdapters,
      requires: [
        "com.coremedia.blueprint.social.beans.SocialHubAdapters",
        "com.coremedia.ui.data.impl.RemoteBeanImpl"
      ],
      uses: ["com.coremedia.blueprint.social.beans.SocialHubPropertyNames"]
    };
});
