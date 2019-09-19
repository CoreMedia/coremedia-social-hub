package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.api.MediaType;
import com.coremedia.blueprint.social.AbstractMedia;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.MoreObjects;
import twitter4j.MediaEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TwitterMedia extends AbstractMedia {

  private Map<String, Object> properties;


  @Override
  public Map<String, Object> getProperties() {
    return properties;
  }


  public void init(MediaEntity mediaEntity, TwitterSocialHubAdapter adapter) {
    List<String> variantUrls = new ArrayList<>();
    if (mediaEntity.getVideoVariants() != null) {
      variantUrls = new ArrayList<>();
      for (int j = 0; j < mediaEntity.getVideoVariants().length; j++) {
        MediaEntity.Variant[] variants = mediaEntity.getVideoVariants();
        MediaEntity.Variant v = variants[j];
        if (v.getUrl().endsWith(".mp4")) {
          variantUrls.add(v.getUrl());
        }
      }
    }

    String id = String.valueOf(mediaEntity.getId());
    String url = mediaEntity.getMediaURL();
    MediaType type = mapType(mediaEntity.getType());
    String text = mediaEntity.getText();

    super.init(id, url, variantUrls, type, text);

    properties = new ObjectMapper().convertValue(this, new TypeReference<Map<String, Object>>() {});
  }

  private MediaType mapType(String type) {
    switch (type) {
      case "photo":
        return MediaType.IMAGE;
      case "video":
        return MediaType.VIDEO;
      default:
        return MediaType.DATA;
    }
  }


  @Override
  public String toString() {
    return MoreObjects.toStringHelper(this)
            .add("id", getId())
            .add("url", getUrl())
            .add("variantUrls", getVariantUrls())
            .add("type", getType())
            .add("text", getText())
            .toString();
  }
}
