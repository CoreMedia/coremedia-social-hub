Ext.define("com.coremedia.blueprint.social.beans.MessagePropertiesImpl", function(MessagePropertiesImpl) {/*package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.SubBean;

public class MessagePropertiesImpl extends SubBean implements MessageProperties {

  public*/ function MessagePropertiesImpl$(parent/*:MessageImpl*/, basePath/*:String*/) {
    this.super$wxs$(parent, basePath);
  }/*

  public*/ function getMessage()/*:Message*/ {
    return AS3.as( this.getParentBean(),  com.coremedia.blueprint.social.beans.Message);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.ui.data.impl.SubBean",
      mixins: ["com.coremedia.blueprint.social.beans.MessageProperties"],
      constructor: MessagePropertiesImpl$,
      super$wxs$: function() {
        com.coremedia.ui.data.impl.SubBean.prototype.constructor.apply(this, arguments);
      },
      getMessage: getMessage,
      requires: [
        "com.coremedia.blueprint.social.beans.MessageProperties",
        "com.coremedia.ui.data.impl.SubBean"
      ],
      uses: ["com.coremedia.blueprint.social.beans.Message"]
    };
});
