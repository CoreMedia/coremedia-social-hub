package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteBeanImpl;

[RestResource(uriTemplate = "socialhub/adapters/{id:[^/]+}")]
public class SocialHubAdaptersImpl extends com.coremedia.ui.data.impl.RemoteBeanImpl implements com.coremedia.blueprint.social.beans.SocialHubAdapters {
  public native function getAdapters():Array;
}
}