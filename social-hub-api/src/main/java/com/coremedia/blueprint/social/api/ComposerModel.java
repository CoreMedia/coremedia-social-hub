package com.coremedia.blueprint.social.api;

import com.coremedia.cap.content.Content;
import com.coremedia.common.annotations.Experimental;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;

import java.util.Date;
import java.util.Map;

/**
 * The interface represents the model that is used for Studio's social message composing.
 * <p>
 * Be aware that we use this interface when we deserialize messages from the database.
 * Therefore, this interface signature must match the one from @see com.coremedia.blueprint.social.AbstractMessage.
 * </p>
 */
@Experimental
public interface ComposerModel {

  /**
   * Returns the planned publication for the composed message.
   * Note that an external system may reject this message when the date is in the past.
   */
  @NonNull
  Date getPublicationDate();

  /**
   * Returns the properties map that contains all field value the message.
   * The field values are defined through a list of values of type MessageProperty.
   *
   * @see com.coremedia.blueprint.social.api.MessageProperty
   */
  @NonNull
  Map<String, Object> getProperties();

  /**
   * Utility method to return a string value of the message properties.
   *
   * @param property the property to retrieve the value for
   * @return a plain string value or markup for markup fields
   * @see com.coremedia.blueprint.social.api.MessageProperty
   */
  @Nullable
  String getStringProperty(@NonNull String property);

  /**
   * Utility method that returns plain text for a markup field.
   *
   * @param propertyName the message property that contains the markup.
   * @return the converted markup
   * @see com.coremedia.blueprint.social.api.MessageProperty
   */
  @NonNull
  String getPlainText(@NonNull String propertyName);

  /**
   * Utility method to store a value inside the message properties.
   *
   * @param property the property of the message property
   * @param value    the value of the message property
   * @param override true to override existing values
   * @see com.coremedia.blueprint.social.api.MessageProperty
   */
  void set(@NonNull String property, @Nullable Object value, boolean override);

  /**
   * Adds a content object to the given message property.
   * Note that contents are always stored as lists, single values are not
   * provided through the model, but by setting the cardinality of the corresponding MessageProperty.
   *
   * @param key     the key to add the content for
   * @param content the content to add
   * @see com.coremedia.blueprint.social.api.MessageProperty
   */
  void addContent(@NonNull String key, @NonNull Content content);

  /**
   * Returns the unique id for the adapter the message is composed for.
   */
  @NonNull
  String getAdapterId();

  /**
   * Return the adapter type the message is composed for, represented through the interface SocialNetworkType.
   *
   * @see com.coremedia.blueprint.social.api.SocialNetworkType
   */
  @NonNull
  String getAdapterType();

  /**
   * Returns the user id of the user that is composing the message.
   */
  @NonNull
  String getUserId();
}
