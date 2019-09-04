package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;

import java.util.Optional;

/**
 * PublicationResults are always created through a {@link SocialHubConnector} implementation.
 * The connector may publish to the scheduler or an external system.
 *
 * @see com.coremedia.blueprint.social.api.SocialHubConnector
 */
@Experimental
public interface PublicationResult {

  boolean isFailed();

  boolean isRetryable();

  int secondsToWait();

  Optional<Message> getMessage();
}
