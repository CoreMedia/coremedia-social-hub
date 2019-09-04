package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;

import java.util.List;
import java.util.Map;

/**
 * Represents a media object of the social network.
 * Instances of the interface are used when sent messages are retrieved from the social network itself
 * or from the social media tool the social hub posts through.
 *
 * E.g. you can read the messages you have sent to Twitter via the Twitter API and render them one by one
 * instead of using the liveline widget. So the URL field here would represent a Twitter image.
 * But most social notworks APIs do not support these kind of information.
 *
 * That's why, by default, the Social Hub uses the sent messages from the database where the actual content is available.
 */
@Experimental
public interface Media {

  /**
   * The id of the media object
   */
  String getId();

  /**
   * The default URL of the media
   */
  String getUrl();

  /**
   * A list of variants of the media object, e.g. YouTube provides different resolutions for thumbnails.
   */
  List<String> getVariantUrls();

  /**
   * The type of media
   */
  MediaType getType();

  /**
   * An optional description text of the media
   */
  String getText();

  /**
   * Returns all properties of this media object.
   * The method is required when the message is persisted in the database.
   */
  Map<String, Object> getProperties();
}
