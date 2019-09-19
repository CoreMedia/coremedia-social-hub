package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.api.GeoLocation;
import com.coremedia.blueprint.social.api.Media;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.MetaData;
import com.coremedia.blueprint.social.api.PrivacyStatus;
import com.coremedia.blueprint.social.AbstractMessage;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.MoreObjects;
import twitter4j.MediaEntity;
import twitter4j.Status;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class TwitterMessage extends AbstractMessage {

  private long postId;
  private Date createdAt;
  private String author;
  private GeoLocation location;
  private Map<String, Object> properties;

  public long getPostId() {
    return postId;
  }

  public void setPostId(long postId) {
    this.postId = postId;
  }

  public Date getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public GeoLocation getLocation() {
    return location;
  }

  public void setLocation(GeoLocation location) {
    this.location = location;
  }

  @Override
  public Map<String, Object> getProperties() {
    return properties;
  }


  public void init(TwitterSocialHubAdapter adapter, Status status) {
    if(status == null) {
      String id = UUID.randomUUID().toString();
      super.init(id, MessageState.SENT, PrivacyStatus.PUBLIC, new Date(), "", "en", Collections.emptyList(), null, adapter);
      properties = new ObjectMapper().convertValue(this, new TypeReference<Map<String, Object>>() {

      });
      return;
    }

    setPostId(status.getId());
    setCreatedAt(status.getCreatedAt());
    setAuthor(status.getUser().getName());

    twitter4j.GeoLocation location = status.getGeoLocation();
    if (location != null) {
      setLocation(new GeoLocation(location.getLatitude(), location.getLongitude()));
    }

    String text = status.getText();

    String id = String.valueOf(status.getId());
    MessageState state = MessageState.SENT;
    Date publicationDate = status.getCreatedAt();
    String url = "https://twitter.com/" + status.getUser().getScreenName() + "/status/" + status.getId();
    String lang = status.getLang();
    MetaData metaData = new TwitterMetaData(status);
    PrivacyStatus privacyStatus = PrivacyStatus.PUBLIC;
    // media items
    List<Media> media = new ArrayList<>();
    MediaEntity[] mediaEntities = status.getMediaEntities();
    if (mediaEntities != null && mediaEntities.length > 0) {
      for (MediaEntity mediaEntity : mediaEntities) {
        TwitterMedia mediaItem = new TwitterMedia();
        mediaItem.init(mediaEntity, adapter);
        media.add(mediaItem);
      }
      // remove last URL from text
      int idx = text.lastIndexOf("https://");
      if (idx > 0) {
        text = text.substring(0, idx);
      }
    }
    // after possible url truncation
    setDescription(text.trim());

    super.init(id, state, privacyStatus, publicationDate, url, lang, media, metaData, adapter);

    properties = new ObjectMapper().convertValue(this, new TypeReference<Map<String, Object>>() {
    });
  }


  @Override
  public String toString() {
    return MoreObjects.toStringHelper(this)
            .add("id", getId())
            .add("adapterId", getAdapterId())
            .add("adapterType", getAdapterType())
            .add("state", getState())
            .add("privacyStatus", getPrivacyStatus())
            .add("publicationDate", getPublicationDate())
            .add("failCount", getFailCount())
            .add("url", getUrl())
            .add("lang", getLang())
            .add("metaData", getMetaData())
            .add("postId", postId)
            .add("createdAt", createdAt)
            .add("author", author)
            .add("text", getDescription())
            .add("location", location)
            .add("properties", properties)
            .toString();
  }
}
