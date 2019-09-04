package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;

@Experimental
public interface MetaData {

  boolean isSensitive();

  long getSharedCount();

  long getFavoriteCount();

  long getLikeCount();

  long getDislikeCount();

  long getCommentCount();

  long getViewCount();
}
