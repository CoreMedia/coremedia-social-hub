package com.coremedia.blueprint.studio.social;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequestMapping(value = "socialhub/services")
public class SocialHubServices extends AbstractSocialHubResource {

  @PostMapping(value = "shortenUrl")
  public String shortenUrl(@RequestParam("url") String longUrl) {
    return getSocialHubService().shortLink(longUrl);
  }
}
