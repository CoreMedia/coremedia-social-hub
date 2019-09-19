package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.api.ConnectorSettings;

/**
 *
 */
public interface YouTubeConnectorSettings extends ConnectorSettings {
  String getCredentialsJson();
  String getChannelId();
  String getPlaylistId();
}
