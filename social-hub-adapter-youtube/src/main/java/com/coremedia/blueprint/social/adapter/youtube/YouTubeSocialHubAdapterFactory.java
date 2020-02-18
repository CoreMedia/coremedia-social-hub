package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialHubAdapterFactory;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import com.coremedia.cache.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 */
@Component
public class YouTubeSocialHubAdapterFactory implements SocialHubAdapterFactory<YouTubeConnectorSettings, YouTubeAdapterSettings> {

  @Autowired
  private Cache cache;

  @Autowired
  private SocialHubService socialHubService;

  @Override
  public SocialNetworkType getType() {
    return SocialNetworkType.YOUTUBE;
  }

  @Override
  public SocialHubAdapter createAdapter(YouTubeConnectorSettings connectorSettings, YouTubeAdapterSettings adapterSettings) {
    YouTubeConnector connector = new YouTubeConnector(socialHubService, connectorSettings, cache);
    YouTubeSocialHubAdapter adapter = new YouTubeSocialHubAdapter(connector, adapterSettings);
    connector.setAdapter(adapter);
    return adapter;
  }
}
