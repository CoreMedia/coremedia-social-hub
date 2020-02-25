package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.api.ComposerModelInterceptor;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import com.coremedia.cap.common.Blob;
import com.coremedia.cap.content.Content;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupUtil;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 *
 */
@Component
public class YouTubeComposerModelInterceptor implements ComposerModelInterceptor {
  private SocialHubService socialHubService;

  public YouTubeComposerModelInterceptor(SocialHubService socialHubService) {
    this.socialHubService = socialHubService;
  }

  @Override
  public SocialNetworkType getSocialNetworkType() {
    return SocialNetworkType.YOUTUBE;
  }

  @Override
  public Object composeContent(SocialHubAdapter model, MessageProperty messageProperty, Content content) {
    if(messageProperty.getName().equals("title")) {
      return content.getString("title");
    }

    if(messageProperty.getName().equals("video")) {
      if(content.getType().getDescriptor("data") != null) {
        Blob data = content.getBlob("data");
        if(data != null && data.getSize() > 0 && data.getContentType().getPrimaryType().equals("video")) {
          return Arrays.asList(content);
        }
      }
    }

    if(messageProperty.getName().equals("description")) {
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


  @Nullable
  @Override
  public Object composeLink(SocialHubAdapter adapter, MessageProperty messageProperty, Content content) {
    if (messageProperty.getName().equals("description")) {
      return socialHubService.buildLiveUrl(content.getId(), false);
    }

    return null;
  }

  @Override
  public String getContentType() {
    return "CMTeasable";
  }
}
