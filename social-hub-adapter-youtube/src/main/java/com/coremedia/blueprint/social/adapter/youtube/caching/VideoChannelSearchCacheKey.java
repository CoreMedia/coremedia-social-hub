package com.coremedia.blueprint.social.adapter.youtube.caching;

import com.coremedia.blueprint.social.adapter.youtube.YouTubeConnector;
import com.coremedia.cache.Cache;
import com.coremedia.cache.CacheKey;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoListResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

/**
 *
 */
public class VideoChannelSearchCacheKey extends CacheKey<List<Video>> {

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
  public List<Video> evaluate(Cache cache) throws IOException {
    Cache.cacheFor(pollingIntervalMinutes, TimeUnit.MINUTES);
    // special handling for video on root level
    List<Video> videoResults = new ArrayList<>();
    SearchListResponse response = youTube.search().list(YouTubeConnector.REQUEST_PART_SNIPPET).setChannelId(channelId).setType(YouTubeConnector.SEARCH_VIDEO_TYPE_SNIPPET).setMaxResults(50l).setQ(searchTerm).execute();
    List<SearchResult> searchResults = response.getItems();
    if (searchResults != null) {
      for (SearchResult searchResult : searchResults) {
        String videoId = searchResult.getId().getVideoId();
        //load all the details of the video
        VideoListResponse videoListResponse = youTube.videos().list(YouTubeConnector.REQUEST_PART_SNIPPET + "," + YouTubeConnector.REQUEST_PART_STATISTICS + ", " + YouTubeConnector.REQUEST_PART_CONTENT_DETAILS).setId(videoId).execute();
        List<Video> videos = videoListResponse.getItems();
        if (videos != null && videos.size() > 0) {
          videoResults.add(videos.get(0));
        }
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
