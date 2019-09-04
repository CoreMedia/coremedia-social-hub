package com.coremedia.blueprint.social;

import com.coremedia.blueprint.social.api.Media;
import com.coremedia.blueprint.social.api.MediaType;

import java.util.List;

public abstract class AbstractMedia implements Media {

  private String id;
  private String url;
  private List<String> variantUrls;
  private MediaType type;
  private String text;


  @Override
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  @Override
  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  @Override
  public List<String> getVariantUrls() {
    return variantUrls;
  }

  public void setVariantUrls(List<String> variantUrls) {
    this.variantUrls = variantUrls;
  }

  @Override
  public MediaType getType() {
    return type;
  }

  public void setType(MediaType type) {
    this.type = type;
  }

  @Override
  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }


  protected void init(String id, String url, List<String> variantUrls, MediaType type, String text) {
    this.id = id;
    this.url = url;
    this.variantUrls = variantUrls;
    this.type = type;
    this.text = text;
  }
}
