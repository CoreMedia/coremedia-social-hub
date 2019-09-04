package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * A connector implementation is responsible for the actual communication
 * with a social network or social media tool.
 */
@Experimental
public interface SocialHubConnector {

  /**
   * Returns the message from the social network or social media tool.
   *
   * @param id the id of the message
   */
  Optional<Message> getMessage(@NonNull String id);

  /**
   * Return the messages from the social network or social media tool.
   */
  List<? extends Message> getMessages(@NonNull MessageState state, Date startTime, Date endTime, int offset, int limit);

  /**
   * Pushes the given composer model to the social network or social media tool.
   *
   * @param composerModel the composer model that contains all message properties
   * @return the result of the publication
   */
  PublicationResult publishMessage(@NonNull ComposerModel composerModel);

  /**
   * Deletes a message from the social network or social media tool
   *
   * @param id the id of the message.
   */
  Optional<Message> deleteMessage(@NonNull String id);
}
