package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.SocialHubAdapter;

import java.util.List;

public class SocialHubAdaptersRepresentation {

  private final List<SocialHubAdapter> adapters;

  public SocialHubAdaptersRepresentation(SocialHubAdapterModels adapters) {
    this.adapters = adapters.getSocialHubAdapters();
  }

  public List<SocialHubAdapter> getAdapters() {
    return adapters;
  }
}
