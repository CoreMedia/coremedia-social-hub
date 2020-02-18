package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.api.ComposerModelInterceptor;
import com.coremedia.blueprint.social.api.ComposerType;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import com.coremedia.cap.content.Content;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 *
 */
@Component
public class TwitterComposerModelInterceptor implements ComposerModelInterceptor {

  private SocialHubService socialHubService;

  public TwitterComposerModelInterceptor(SocialHubService socialHubService) {
    this.socialHubService = socialHubService;
  }

  @Override
  public SocialNetworkType getSocialNetworkType() {
    return SocialNetworkType.TWITTER;
  }

  @Override
  public Object intercept(SocialHubAdapter model, MessageProperty messageProperty, Content content, ComposerType composerType) {
    switch (composerType) {
      case COMPOSE_TYPE_LINK:
        return composeLink(messageProperty, content);
      case COMPOSE_TYPE_CONTENT:
        return composeContent(messageProperty, content);
      default:
        return null;
    }
  }

  private Object composeLink(MessageProperty messageProperty, Content content) {
    if (messageProperty.getName().equals("text")) {
      return socialHubService.buildLiveUrl(content.getId(), false);
    }

    return null;
  }

  private Object composeContent(MessageProperty messageProperty, Content content) {
    if (messageProperty.getName().equals("assets")) {
      return content.getLinks("pictures");
    }

    if (messageProperty.getName().equals("text")) {
      String text = null;
      Markup teaserText = content.getMarkup("teaserText");
      if (teaserText != null) {
        text = MarkupUtil.asPlainText(teaserText).trim();
      }

      if (StringUtils.isEmpty(text)) {
        Markup detailText = content.getMarkup("detailText");
        if (detailText != null) {
          text = MarkupUtil.asPlainText(detailText).trim();
        }
      }
      return text;
    }

    return null;
  }

  @Override
  public String getContentType() {
    return "CMTeasable";
  }
}
