package com.coremedia.blueprint.social.api;

import com.coremedia.cap.content.Content;
import com.coremedia.common.annotations.Experimental;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;

/**
 * Used to copy content properties into the ComposerModel.
 */
@Experimental
public interface ComposerModelInterceptor {

  @Nullable
  Object composeContent(SocialHubService socialHubService, SocialHubAdapter adapter, MessageProperty messageProperty, Content content);

  @Nullable
  Object composeLink(SocialHubService socialHubService, SocialHubAdapter adapter, MessageProperty messageProperty, Content content);


  /**
   * The content type the interceptor should be applied to.
   * Subtypes are included here.
   */
  @NonNull
  String getContentType();

  /**
   * The Social network the interceptor should be applied for.
   *
   * @return null if the interceptor should be called for every network
   */
  @Nullable
  SocialNetworkType getSocialNetworkType();

  /**
   * The lower the value, the higher the priority.
   */
  default int getPriority() {
    return 0;
  }
}
