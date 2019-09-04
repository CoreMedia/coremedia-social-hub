package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.api.GeoLocation;
import com.coremedia.blueprint.social.api.Media;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.MetaData;
import com.coremedia.blueprint.social.api.PrivacyStatus;
import com.coremedia.blueprint.social.AbstractMessage;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.services.youtube.model.Video;
import com.google.common.base.MoreObjects;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class YouTubeMessage extends AbstractMessage {

  private String author;
  private GeoLocation location;
  private Map<String, Object> properties;

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


  public void init(YouTubeSocialHubAdapter adapter, Video video) {
    setTitle(video.getSnippet().getTitle());
    setDescription(video.getSnippet().getDescription());
    setAuthor("");
    if (video.getRecordingDetails() != null && video.getRecordingDetails().getLocation() != null) {
      setLocation(new GeoLocation(video.getRecordingDetails().getLocation().getLatitude(), video.getRecordingDetails().getLocation().getLongitude()));
    }

    String id = video.getId();
    MessageState state = MessageState.SENT;
    Date publicationDate = YouTubeUtil.parseDate(video.getSnippet().getPublishedAt().toString());
    String url = "//www.youtube-nocookie.com/embed/" + video.getId();
    String lang = video.getSnippet().getDefaultLanguage();
    MetaData metaData = new YouTubeMetaData(video);
    PrivacyStatus privacyStatus = null;
    if (video.getStatus() != null) {
      privacyStatus = PrivacyStatus.valueOf(video.getStatus().getPrivacyStatus().toUpperCase());
    }

    // media items
    List<Media> media = new ArrayList<>();
    YouTubeVideo mediaItem = new YouTubeVideo();
    mediaItem.init(video, adapter);
    media.add(mediaItem);

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
            .add("author", author)
            .add("title", getTitle())
            .add("description", getDescription())
            .add("location", location)
            .add("properties", properties)
            .toString();
  }
}
