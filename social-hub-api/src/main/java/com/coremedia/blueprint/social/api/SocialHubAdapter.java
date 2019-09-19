package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * A SocialHubAdapter describes the overall attributes of a social network integration..
 * It defines the properties used for composing and the type of the network.
 */
@Experimental
public interface SocialHubAdapter {

  /**
   * If true, the composer button is not shown for the adapter.
   * In this case, only the message history is shown.
   */
  boolean isReadOnly();

  /**
   * If an adapter is configured for 'direct publication', the responsibility for scheduling
   * is delegated to the social network/social media tool. So a newly composed message will be directly
   * pushed through to the configured connector.
   * <p>
   * Defaults to false.
   */
  boolean isDirectPublication();

  /**
   * Enables to change the direct publication behaviour.
   */
  void setDirectPublication(boolean enabled);

  /**
   * If true, composed messages are scheduled on CoreMedia site before they are sent to the social network
   * or social media tool.
   * <p>
   * Set to false if the scheduling of the social media tool or network should be used instead.
   * <p>
   * Defaults to true.
   */
  boolean isSchedulingSupported();

  /**
   * Enables the change the scheduling behaviours.
   */
  void setSchedulingSupported(boolean enabled);

  /**
   * Return true if the list of past posts should is displayed via a 3rd party widget.
   *
   * Defaults to false.
   */
  boolean isNativeHistory();

  /**
   * Returns the unique id that is configured in the adapter configuration.
   */
  String getId();

  /**
   * Returns the type of the social network.
   */
  SocialNetworkType getType();

  /**
   * Returns the display name that is shown as title for the adapter column.
   */
  String getDisplayName();


  /**
   * Returns the message for the given id.
   */
  Optional<Message> getMessage(@NonNull String id);

  /**
   * Returns the list of message properties.
   * The list of these properties is used during composing.
   *
   * @see com.coremedia.blueprint.social.api.MessageProperty
   * @see com.coremedia.blueprint.social.api.MessagePropertyType
   */
  List<MessageProperty> getMessageProperties();

  /**
   * Returns a list of messages for the given filter parameters.
   *
   * @param state     the state of the message
   * @param startTime the start time
   * @param endTime   the end time
   * @param offset    the offset of the paging
   * @param limit     the maximum number of messages to return
   * @see com.coremedia.blueprint.social.api.MessageState
   * @see com.coremedia.blueprint.social.api.Message
   */
  List<? extends Message> getMessages(@NonNull MessageState state, Date startTime, Date endTime, int offset, int limit);

  /**
   * Invoked by the composer's resource to publish a new message.
   *
   * @param composerModel the composer model that has been filled through the Studio.
   * @see com.coremedia.blueprint.social.api.MessageProperty
   * @see com.coremedia.blueprint.social.api.ComposerModel
   */
  Optional<Message> createMessage(@NonNull ComposerModel composerModel);

  /**
   * Deletes a messages from the database or from the social network/media tool, depending on the integration.
   *
   * @param id the id of the message
   */
  Optional<Message> deleteMessage(@NonNull String id);

  /**
   * Invoked by the schedule to publish a stored message via connector the the social network/media tool.
   *
   * @param composerModel the message/composer model that is stored in the database.
   * @return the publication result
   */
  PublicationResult publish(@NonNull ComposerModel composerModel);

  /**
   * Return the connector that has been configured for this adapter.
   */
  SocialHubConnector getConnector();
}
