package com.coremedia.blueprint.social.api;

import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import com.coremedia.common.annotations.Experimental;

import jakarta.activation.MimeType;

/**
 * Defines one property of a Message
 */
@Experimental
public interface MessageProperty {

  /**
   * Returns the type of the property
   *
   * @return the type of the property
   */
  @NonNull
  MessagePropertyType getType();

  /**
   * The name of the property.
   */
  @NonNull
  String getName();

  /**
   * The optional display name.
   * If this value is null, Studio will try to find a matching
   * resource value for the return value of getName()
   */
  @Nullable
  String getDisplayName();

  /**
   * The maximum length of the property:
   * e.g. the maximum amounts of assets or maxlength of a text.
   */
  int getMaxLength();

  /**
   * True if the property must have a value.
   *
   * @return
   */
  boolean isRequired();

  /**
   * Used for assets
   * @return
   */
  @Nullable
  MimeType getMimeType();
}
