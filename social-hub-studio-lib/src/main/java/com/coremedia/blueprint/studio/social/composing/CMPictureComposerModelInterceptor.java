package com.coremedia.blueprint.studio.social.composing;

import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.cap.content.Content;

/**
 *
 */
public class CMPictureComposerModelInterceptor extends CMTeasableComposerModelInterceptor {
  @Override
  public void intercept(ComposerModel model, Content content) {
    model.addContent("assets", content);

    super.intercept(model, content);
  }

  @Override
  public String getContentType() {
    return "CMPicture";
  }

  @Override
  public int getPriority() {
    return 100;
  }
}
