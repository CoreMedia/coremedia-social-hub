package com.coremedia.blueprint.studio.social.interceptor;

import com.coremedia.blueprint.social.api.ComposerModelInterceptor;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.MessagePropertyType;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import com.coremedia.cap.content.Content;

import java.util.Arrays;
import java.util.List;

/**
 *
 */
public class DefaultComposerModelInterceptor implements ComposerModelInterceptor {
  @Override
  public Object intercept(SocialHubAdapter model, MessageProperty messageProperty, Content content) {
    if(messageProperty.getType().equals(MessagePropertyType.ASSETLIST) && messageProperty.getMimeType() != null && messageProperty.getMimeType().getPrimaryType().equals("image")) {
      List<Content> pictures = content.getLinks("pictures");
      if(pictures.isEmpty() && content.getType().isSubtypeOf("CMPicture")) {
        return Arrays.asList(content);
      }

      return pictures;
    }

    return null;
  }

  @Override
  public String getContentType() {
    return "CMTeasable";
  }

  @Override
  public SocialNetworkType getSocialNetworkType() {
    return null;
  }

  @Override
  public int getPriority() {
    return 10;
  }
}
