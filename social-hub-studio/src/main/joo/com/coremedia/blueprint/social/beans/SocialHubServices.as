package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteServiceMethod;
import com.coremedia.ui.data.impl.RemoteServiceMethodResponse;

public class SocialHubServices {
  private static const SERVICES_URI:String = "socialhub/services/";
  private static const SHORTEN_URL_URI:String = SERVICES_URI + "shortenUrl";

  public static function shortenUrl(url:String, callback:Function):void {
    var method:RemoteServiceMethod = new RemoteServiceMethod(SHORTEN_URL_URI, 'POST');
    method.request({'url': url},
            function (response:RemoteServiceMethodResponse):void {
              var result:String = response.getResponseJSON().toJson();
              callback(result);
            }
    );
  }
}
}
