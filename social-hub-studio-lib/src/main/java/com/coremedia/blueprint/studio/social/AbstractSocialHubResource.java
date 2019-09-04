package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.rest.linking.AbstractLinkingResource;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;

public class AbstractSocialHubResource extends AbstractLinkingResource {

  private SocialHubService socialHubService;

  public SocialHubService getSocialHubService() {
    return socialHubService;
  }

  public void setSocialHubService(SocialHubService socialHubService) {
    this.socialHubService = socialHubService;
  }

  protected String[] getSegments(HttpServletRequest request) {
    UriComponents build = UriComponentsBuilder.fromUriString(request.getRequestURI()).build();
    return build.getPath().split("/");
  }
}
