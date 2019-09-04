package com.coremedia.blueprint.studio.social.composing;

import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.cap.content.Content;
import edu.umd.cs.findbugs.annotations.NonNull;

/**
 *
 */
public class CMChannelComposerModelInterceptor extends CMTeasableComposerModelInterceptor {
  private SocialHubService socialHubService;

  public CMChannelComposerModelInterceptor(@NonNull SocialHubService socialHubService) {
    this.socialHubService = socialHubService;
  }

  @Override
  public void intercept(ComposerModel model, Content content) {
    String message = model.getStringProperty("text");
    if (message == null) {
      message = "";
    }

    String link = socialHubService.buildLiveUrl(content, true);
    message = message + " (" + link + ")";
    model.set("text", message, false);
  }

  @Override
  public String getContentType() {
    return "CMChannel";
  }

  @Override
  public int getPriority() {
    return 200;
  }
}
