package com.coremedia.blueprint.social.adapter.youtube.caching;

import com.coremedia.blueprint.social.adapter.youtube.YouTubeConnector;
import com.coremedia.cache.Cache;
import com.coremedia.cache.CacheKey;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
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
public class VideoChannelSearchCacheKey extends CacheKey<List<String>> {
  private static final Logger LOG = LoggerFactory.getLogger(VideoChannelSearchCacheKey.class);

  private final YouTube youTube;
  private final String channelId;
  private String searchTerm;
  private int pollingIntervalMinutes;

  public VideoChannelSearchCacheKey(YouTube youTube, String channelId, String searchTerm, int pollingIntervalMinutes) {
    this.searchTerm = searchTerm;
    this.pollingIntervalMinutes = pollingIntervalMinutes;
    this.youTube = youTube;
    this.channelId = channelId;
  }

  @Override
  public List<String> evaluate(Cache cache) throws IOException {
    LOG.info("Social Hub: channel search for YouTube");
    Cache.cacheFor(pollingIntervalMinutes, TimeUnit.MINUTES);
    // special handling for video on root level
    List<String> videoResults = new ArrayList<>();
    SearchListResponse response = youTube.search().list(YouTubeConnector.REQUEST_PART_SNIPPET).setChannelId(channelId).setType(YouTubeConnector.SEARCH_VIDEO_TYPE_SNIPPET).setMaxResults(50l).setQ(searchTerm).execute();
    List<SearchResult> searchResults = response.getItems();
    if (searchResults != null) {
      for (SearchResult searchResult : searchResults) {
        String videoId = searchResult.getId().getVideoId();
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
    VideoChannelSearchCacheKey that = (VideoChannelSearchCacheKey) o;
    return that.channelId.equals(this.channelId) && this.searchTerm.equals(that.searchTerm);
  }

  @Override
  public int hashCode() {
    return Objects.hash(searchTerm + ":" + channelId);
  }
}
