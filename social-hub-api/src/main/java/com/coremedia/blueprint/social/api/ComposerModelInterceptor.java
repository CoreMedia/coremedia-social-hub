package com.coremedia.blueprint.social.api;

import com.coremedia.cap.content.Content;
import com.coremedia.common.annotations.Experimental;

/**
 * Used to copy content properties into the ComposerModel.
 */
@Experimental
public interface ComposerModelInterceptor {

  Object intercept(SocialHubAdapter adapter, MessageProperty messageProperty, Content content);

  /**
   * The content type the interceptor should be applied to.
   * Subtypes are included here.
   */
  String getContentType();

  /**
   * The Social network the interceptor should be applied for.
   *
   * @return null if the interceptor should be called for every network
   */
  SocialNetworkType getSocialNetworkType();

  /**
   * The lower the value, the higher the priority.
   */
  default int getPriority() {
    return 0;
  }
}
