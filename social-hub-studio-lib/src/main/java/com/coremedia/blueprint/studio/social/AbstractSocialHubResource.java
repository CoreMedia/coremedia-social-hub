package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.SocialHubService;

public class AbstractSocialHubResource {

  private SocialHubService socialHubService;

  public SocialHubService getSocialHubService() {
    return socialHubService;
  }

  public void setSocialHubService(SocialHubService socialHubService) {
    this.socialHubService = socialHubService;
  }
}
