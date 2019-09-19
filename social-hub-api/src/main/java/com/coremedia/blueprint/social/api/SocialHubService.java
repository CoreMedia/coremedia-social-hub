package com.coremedia.blueprint.social.api;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.multisite.Site;
import com.coremedia.common.annotations.Experimental;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * The central service interface to access the social hub.
 */
@Experimental
public interface SocialHubService {

  /**
   * Returns the list of adapters configured for the given site.
   *
   * @param site the site to retrieve the adapters for
   * @see com.coremedia.blueprint.social.api.SocialHubAdapter
   */
  List<SocialHubAdapter> getAdapters(@NonNull Site site);

  /**
   * Return all social hub adapters.
   *
   * @see com.coremedia.blueprint.social.api.SocialHubAdapter
   */
  Set<SocialHubAdapter> getAdapters();

  /**
   * Returns the social hub adapter for the given id
   *
   * @param id the id of the social hub adapter
   * @see com.coremedia.blueprint.social.api.SocialHubAdapter
   */
  Optional<SocialHubAdapter> getAdapter(@NonNull String id);

  /**
   * Shortens the given link
   *
   * @param longUrl the URL to shorten
   * @return null if URL shortening is not configured
   */
  @Nullable
  String shortLink(@NonNull String longUrl);

  /**
   * //TODO not supported by the UI yet
   * Returns the live url for the given content, used to link
   * content in social media posts
   *
   * @param content the content to publish the URl for
   * @param shorten true to additionally shorten the live link
   * @return null if the live CAE or the link shorting is not configured
   */
  @Nullable
  String buildLiveUrl(@NonNull Content content, boolean shorten);

  /**
   * Returns the media item of the given content.
   *
   * @param content the content to read the data from
   * @param connectorSettings the optional connector settings to used to read details
   *
   * @return a media source object which is the facade for the actual data access
   */
  Optional<MediaSource> createMediaSource(@NonNull Content content, @Nullable ConnectorSettings connectorSettings);
}
