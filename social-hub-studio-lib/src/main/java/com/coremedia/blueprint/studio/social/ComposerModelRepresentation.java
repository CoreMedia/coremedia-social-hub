package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.ComposerModel;

import java.util.Map;

/**
 *
 */
public class ComposerModelRepresentation {
  private String id;
  private String adapterType;
  private String adapterId;
  private Map<String,Object> properties;

  public ComposerModelRepresentation(ComposerModel model) {
    this.id = model.getUserId();
    this.properties = model.getProperties();
    this.adapterId = model.getAdapterId();
    this.adapterType = model.getAdapterType();
  }

  public Map<String, Object> getProperties() {
    return properties;
  }

  public String getId() {
    return id;
  }

  public String getAdapterType() {
    return adapterType;
  }

  public String getAdapterId() {
    return adapterId;
  }
}
