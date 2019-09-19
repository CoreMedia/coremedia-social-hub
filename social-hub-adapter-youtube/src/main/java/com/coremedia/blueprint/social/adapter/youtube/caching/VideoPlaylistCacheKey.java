package com.coremedia.blueprint.social.adapter.youtube.caching;

import com.coremedia.blueprint.social.adapter.youtube.YouTubeConnector;
import com.coremedia.cache.Cache;
import com.coremedia.cache.CacheKey;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.PlaylistItem;
import com.google.api.services.youtube.model.PlaylistItemListResponse;
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
public class VideoPlaylistCacheKey extends CacheKey<List<Video>> {

  private final YouTube youTube;
  private final String playlistId;
  private int pollingIntervalMinutes;

  public VideoPlaylistCacheKey(YouTube youTube, String playlistId, int pollingIntervalMinutes) {
    this.pollingIntervalMinutes = pollingIntervalMinutes;
    this.youTube = youTube;
    this.playlistId = playlistId;
  }

  @Override
  public List<Video> evaluate(Cache cache) throws IOException {
    Cache.cacheFor(pollingIntervalMinutes, TimeUnit.MINUTES);
    List<Video> videoResults = new ArrayList<>();

    PlaylistItemListResponse playlistItemsResponse = youTube.playlistItems().list(YouTubeConnector.REQUEST_PART_SNIPPET).setPlaylistId(playlistId).setMaxResults(50l).execute();
    List<PlaylistItem> playlistItems = playlistItemsResponse.getItems();
    if (playlistItems != null) {
      // find all video details
      for (PlaylistItem playlistItem : playlistItems) {
        String videoId = playlistItem.getSnippet().getResourceId().getVideoId();

        VideoListResponse videoListResponse = youTube
                .videos()
                .list(YouTubeConnector.REQUEST_PART_SNIPPET + "," + YouTubeConnector.REQUEST_PART_RECORDING_DETAILS + "," + YouTubeConnector.REQUEST_PART_CONTENT_DETAILS)
                .setMaxResults(50l)
                .setId(videoId).execute();
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
    VideoPlaylistCacheKey that = (VideoPlaylistCacheKey) o;
    return that.playlistId.equals(this.playlistId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(playlistId);
  }
}
