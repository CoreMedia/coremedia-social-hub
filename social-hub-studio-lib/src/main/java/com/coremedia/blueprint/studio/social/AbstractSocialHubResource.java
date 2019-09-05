package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.rest.linking.AbstractLinkingResource;

public class AbstractSocialHubResource extends AbstractLinkingResource {

  private SocialHubService socialHubService;

  public SocialHubService getSocialHubService() {
    return socialHubService;
  }

  public void setSocialHubService(SocialHubService socialHubService) {
    this.socialHubService = socialHubService;
  }
}
