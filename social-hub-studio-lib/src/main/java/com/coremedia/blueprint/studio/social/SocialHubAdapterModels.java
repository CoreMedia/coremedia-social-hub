package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.SocialHubAdapter;

import java.util.List;

public class SocialHubAdapterModels {

  private String siteId;
  private List<SocialHubAdapter> socialHubAdapters;

  public SocialHubAdapterModels(List<SocialHubAdapter> socialHubAdapters, String siteId) {
    this.socialHubAdapters = socialHubAdapters;
    this.siteId = siteId;
  }

  public List<SocialHubAdapter> getSocialHubAdapters() {
    return socialHubAdapters;
  }

  public String getSiteId() {
    return siteId;
  }

  public void setSiteId(String siteId) {
    this.siteId = siteId;
  }
}
