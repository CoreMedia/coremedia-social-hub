package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;

/**
 * Describes the privacy status of a post.
 * This enum contains the values of different social network types.
 */
@Experimental
public enum PrivacyStatus {
  PUBLIC,
  PRIVATE,
  FRIENDS,
  EXTENDED_FRIENDS,
  UNLISTED
}
