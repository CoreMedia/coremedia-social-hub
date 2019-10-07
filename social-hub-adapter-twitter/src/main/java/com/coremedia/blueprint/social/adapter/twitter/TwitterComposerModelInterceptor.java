package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.api.ComposerModelInterceptor;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
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

  @Override
  public SocialNetworkType getSocialNetworkType() {
    return SocialNetworkType.TWITTER;
  }

  @Override
  public Object intercept(SocialHubAdapter model, MessageProperty messageProperty, Content content) {
    if(messageProperty.getName().equals("assets")) {
      return content.getLinks("pictures");
    }

    if(messageProperty.getName().equals("text")) {
      String text = null;
      Markup teaserText = content.getMarkup("teaserText");
      if (teaserText != null) {
        text = MarkupUtil.asPlainText(teaserText).trim();
      }

      if(StringUtils.isEmpty(text)) {
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
