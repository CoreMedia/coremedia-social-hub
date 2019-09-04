package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.AbstractMedia;
import com.coremedia.blueprint.social.api.MediaType;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.services.youtube.model.Video;
import com.google.common.collect.ImmutableList;

import java.util.List;
import java.util.Map;

public class YouTubeVideo extends AbstractMedia {

  private Map<String, Object> properties;


  @Override
  public Map<String, Object> getProperties() {
    return properties;
  }


  public void init(Video video, YouTubeSocialHubAdapter adapter) {
    String id = video.getId();
    String url = "//www.youtube-nocookie.com/embed/" + video.getId();
    List<String> variantUrls = ImmutableList.of(url);
    MediaType type = MediaType.VIDEO;
    String text = null;
    if (video.getContentDetails() != null) {
      text = video.getContentDetails().getCaption();
    }

    super.init(id, url, variantUrls, type, text);

    properties = new ObjectMapper().convertValue(this, new TypeReference<Map<String, Object>>() {
    });
  }
}
