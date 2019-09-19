package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.api.ConnectorSettings;

/**
 *
 */
public interface TwitterConnectorSettings extends ConnectorSettings {
  String getConsumerKey();

  String getConsumerSecret();

  String getAccessToken();

  String getAccessTokenSecret();
}
