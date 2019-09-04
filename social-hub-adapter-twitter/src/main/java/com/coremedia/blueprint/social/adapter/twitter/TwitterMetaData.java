package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.api.MetaData;
import com.google.common.base.MoreObjects;
import twitter4j.Status;

public class TwitterMetaData implements MetaData {

  private boolean isSensitive;
  private boolean isRetweeted;
  private boolean isRetweetedByMe;
  private boolean isFavorited;
  private long sharedCount;
  private long favoriteCount;


  TwitterMetaData(Status status) {
    this.isSensitive = status.isPossiblySensitive();
    this.isRetweeted = status.isRetweeted();
    this.isRetweetedByMe = status.isRetweetedByMe();
    this.isFavorited = status.isFavorited();
    this.sharedCount = status.getRetweetCount();
    this.favoriteCount = status.getFavoriteCount();
  }


  @Override
  public boolean isSensitive() {
    return isSensitive;
  }

  public boolean isRetweeted() {
    return isRetweeted;
  }

  public boolean isRetweetedByMe() {
    return isRetweetedByMe;
  }

  public boolean isFavorited() {
    return isFavorited;
  }

  public long getSharedCount() {
    return sharedCount;
  }

  @Override
  public long getFavoriteCount() {
    return favoriteCount;
  }

  @Override
  public long getLikeCount() {
    return favoriteCount;
  }

  @Override
  public long getDislikeCount() {
    return -1L;
  }

  @Override
  public long getCommentCount() {
    return -1;
  }

  @Override
  public long getViewCount() {
    return -1L;
  }


  @Override
  public String toString() {
    return MoreObjects.toStringHelper(this)
            .add("isSensitive", isSensitive)
            .add("isRetweeted", isRetweeted)
            .add("isRetweetedByMe", isRetweetedByMe)
            .add("isFavorited", isFavorited)
            .add("sharedCount", sharedCount)
            .add("favoriteCount", favoriteCount)
            .toString();
  }
}
