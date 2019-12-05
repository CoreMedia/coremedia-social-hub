package com.coremedia.blueprint.social.adapter.youtube.caching;

import com.coremedia.blueprint.social.adapter.youtube.YouTubeConnector;
import com.coremedia.cache.Cache;
import com.coremedia.cache.CacheKey;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.VideoListResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

/**
 *
 */
public class VideoListCacheKey extends CacheKey<VideoListResponse> {
  private static final Logger LOG = LoggerFactory.getLogger(VideoListCacheKey.class);

  private final YouTube youTube;
  private final String videoId;
  private int pollingIntervalMinutes;

  public VideoListCacheKey(YouTube youTube, String videoId, int pollingIntervalMinutes) {
    this.pollingIntervalMinutes = pollingIntervalMinutes;
    this.youTube = youTube;
    this.videoId = videoId;
  }

  @Override
  public VideoListResponse evaluate(Cache cache) throws IOException {
    LOG.info("Social Media Hub: getMessage '{}' for YouTube", videoId);
    Cache.cacheFor(pollingIntervalMinutes, TimeUnit.MINUTES);
    return youTube.videos()
            .list(YouTubeConnector.REQUEST_PART_SNIPPET + ","
                    + YouTubeConnector.REQUEST_PART_STATISTICS + ", "
                    + YouTubeConnector.REQUEST_PART_CONTENT_DETAILS)
            .setMaxResults(YouTubeConnector.MAX_RESULTS)
            .setId(videoId)
            .execute();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    VideoListCacheKey that = (VideoListCacheKey) o;
    return that.videoId.equals(this.videoId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(videoId);
  }
}
