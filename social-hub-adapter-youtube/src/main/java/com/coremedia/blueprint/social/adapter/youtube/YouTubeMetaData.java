package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.api.MetaData;

import com.google.api.services.youtube.model.Video;

public class YouTubeMetaData implements MetaData {

  private long favoriteCount = 0;
  private long likeCount = 0;
  private long dislikeCount = 0;
  private long commentCount = 0;
  private long viewCount = 0;


  YouTubeMetaData(Video video) {
    if(video.getStatistics() != null) {
      if(video.getStatistics().getFavoriteCount() != null) {
        this.favoriteCount = video.getStatistics().getFavoriteCount().longValue();
      }

      if(video.getStatistics().getLikeCount() != null) {
        this.likeCount = video.getStatistics().getLikeCount().longValue();
      }

      if(video.getStatistics().getDislikeCount() != null) {
        this.dislikeCount = video.getStatistics().getDislikeCount().longValue();
      }

      if(video.getStatistics().getCommentCount() != null) {
        this.commentCount = video.getStatistics().getCommentCount().longValue();
      }


      if(video.getStatistics().getViewCount() != null) {
        this.viewCount = video.getStatistics().getViewCount().longValue();
      }
    }
  }


  @Override
  public boolean isSensitive() {
    return false;
  }

  @Override
  public long getSharedCount() {
    return -1L;
  }

  @Override
  public long getFavoriteCount() {
    return favoriteCount;
  }

  @Override
  public long getLikeCount() {
    return likeCount;
  }

  @Override
  public long getDislikeCount() {
    return dislikeCount;
  }

  @Override
  public long getCommentCount() {
    return commentCount;
  }

  @Override
  public long getViewCount() {
    return viewCount;
  }
}
