Ext.define("com.coremedia.blueprint.social.beans.SocialHubServices", function(SocialHubServices) {/*package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteServiceMethod;
import com.coremedia.ui.data.impl.RemoteServiceMethodResponse;

public class SocialHubServices {
  private static const*/var SERVICES_URI$static/*:String*/ = "socialhub/services/";/*
  private static const*/var SHORTEN_URL_URI$static/*:String*/;/* =*/function SHORTEN_URL_URI$static_(){SHORTEN_URL_URI$static=( SERVICES_URI$static + "shortenUrl");};/*

  public static*/ function shortenUrl$static(url/*:String*/, callback/*:Function*/)/*:void*/ {
    var method/*:RemoteServiceMethod*/ = new com.coremedia.ui.data.impl.RemoteServiceMethod(SHORTEN_URL_URI$static, 'POST');
    method.request({'url': url},
            function (response/*:RemoteServiceMethodResponse*/)/*:void*/ {
              var result/*:String*/ = response.response.responseText;
              callback(result);
            }
    );
  }/*
}*/function SocialHubServices$() {}/*
}

============================================== Jangaroo part ==============================================*/
    return {
      constructor: SocialHubServices$,
      statics: {
        SHORTEN_URL_URI: undefined,
        shortenUrl: shortenUrl$static,
        __initStatics__: function() {
          SHORTEN_URL_URI$static_();
        }
      },
      requires: ["com.coremedia.ui.data.impl.RemoteServiceMethod"]
    };
});
