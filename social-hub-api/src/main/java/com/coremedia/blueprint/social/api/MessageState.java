package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;

/**
 * The state of a message inside the database.
 */
@Experimental
public enum MessageState {
  SCHEDULED,
  SENT,
  SEND_FAILED_PERMANENTLY
}
