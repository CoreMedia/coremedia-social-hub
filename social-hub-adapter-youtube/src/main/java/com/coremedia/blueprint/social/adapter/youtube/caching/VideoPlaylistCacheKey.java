package com.coremedia.blueprint.social.adapter.youtube.caching;

import com.coremedia.blueprint.social.adapter.youtube.YouTubeConnector;
import com.coremedia.cache.Cache;
import com.coremedia.cache.CacheKey;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.PlaylistItem;
import com.google.api.services.youtube.model.PlaylistItemListResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

/**
 *
 */
public class VideoPlaylistCacheKey extends CacheKey<List<String>> {
  private static final Logger LOG = LoggerFactory.getLogger(VideoPlaylistCacheKey.class);

  private final YouTube youTube;
  private final String playlistId;
  private int pollingIntervalMinutes;

  public VideoPlaylistCacheKey(YouTube youTube, String playlistId, int pollingIntervalMinutes) {
    this.pollingIntervalMinutes = pollingIntervalMinutes;
    this.youTube = youTube;
    this.playlistId = playlistId;
  }

  @Override
  public List<String> evaluate(Cache cache) throws IOException {
    LOG.info("Social Media Hub: playlist search for YouTube");
    Cache.cacheFor(pollingIntervalMinutes, TimeUnit.MINUTES);
    List<String> videoResults = new ArrayList<>();

    PlaylistItemListResponse playlistItemsResponse = youTube.playlistItems().list(YouTubeConnector.REQUEST_PART_SNIPPET).setPlaylistId(playlistId).setMaxResults(50l).execute();
    List<PlaylistItem> playlistItems = playlistItemsResponse.getItems();
    if (playlistItems != null) {
      for (PlaylistItem playlistItem : playlistItems) {
        String videoId = playlistItem.getSnippet().getResourceId().getVideoId();
        videoResults.add(videoId);
      }
    }

    return videoResults;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    VideoPlaylistCacheKey that = (VideoPlaylistCacheKey) o;
    return that.playlistId.equals(this.playlistId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(playlistId);
  }
}
