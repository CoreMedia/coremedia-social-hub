package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialHubAdapterFactory;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 */
@Component
public class TwitterSocialHubAdapterFactory implements SocialHubAdapterFactory<TwitterConnectorSettings, TwitterAdapterSettings> {

  @Override
  public SocialNetworkType getType() {
    return SocialNetworkType.TWITTER;
  }

  @Override
  public SocialHubAdapter createAdapter(SocialHubService socialHubService, TwitterConnectorSettings connectorSettings, TwitterAdapterSettings adapterSettings) {
    TwitterConnector connector = new TwitterConnector(connectorSettings, socialHubService);
    TwitterSocialHubAdapter adapter = new TwitterSocialHubAdapter(connector, adapterSettings);
    connector.setAdapter(adapter);
    return adapter;
  }
}
