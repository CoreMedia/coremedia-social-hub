package com.coremedia.blueprint.social.api;

/**
 *
 */
public interface SocialHubAdapterFactory<ConnectorSettings, AdapterSettings> {

  /**
   * The type of the social network
   */
  SocialNetworkType getType();

  /**
   * Create a SocialHubAdapter.
   * <p>
   * In case of errors, it is recommended to throw a {@link SocialHubException}
   * rather than any other runtime exception, because the error code allows
   * for a detailed and localized visualization in Studio.
   * </p>
   */
  SocialHubAdapter createAdapter(ConnectorSettings settings, AdapterSettings adapterSettings);
}
