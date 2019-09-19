package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteBeanImpl;

[RestResource(uriTemplate="socialhub/adapters/{id:[^/]+}")]
public class SocialHubAdaptersImpl extends RemoteBeanImpl implements SocialHubAdapters {

  function SocialHubAdaptersImpl(path:String) {
    super(path);
  }

  public function getAdapters():Array {
    return get(SocialHubPropertyNames.ADAPTER_LIST);
  }
}
}
