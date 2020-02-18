package com.coremedia.blueprint.social.adapter.instagram;

import com.coremedia.blueprint.social.api.ComposerModelInterceptor;
import com.coremedia.blueprint.social.api.ComposerType;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import com.coremedia.cap.content.Content;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@Component
public class InstagramComposerModelInterceptor implements ComposerModelInterceptor {

  @Override
  public SocialNetworkType getSocialNetworkType() {
    return SocialNetworkType.INSTAGRAM;
  }

  @Override
  public Object intercept(SocialHubAdapter model, MessageProperty messageProperty, Content content, ComposerType composerType) {
    if(messageProperty.getName().equals("images")) {
      List<Content> pictures = new ArrayList<>(content.getLinks("pictures"));
      if(!pictures.isEmpty()) {
        return pictures.subList(0, 1);
      }

      return pictures;
    }

    if(messageProperty.getName().equals("caption")) {
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
