package com.coremedia.blueprint.studio.social.composing;

import com.coremedia.blueprint.social.api.ComposerModelInterceptor;
import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.cap.content.Content;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupUtil;

import java.util.List;

/**
 *
 */
public class CMTeasableComposerModelInterceptor implements ComposerModelInterceptor {
  @Override
  public void intercept(ComposerModel model, Content content) {
    List<Content> pictures = content.getLinks("pictures");
    for (Content picture : pictures) {
      model.addContent("assets", picture);
    }

    String title = content.getString("title");
    model.set("title", title, false);

    Markup teaserText = content.getMarkup("teaserText");
    if(teaserText != null) {
      String plainTeaserText = MarkupUtil.asPlainText(teaserText).trim();
      model.set("text", plainTeaserText, false);
    }
    else {
      model.set("text", title, false);
    }
  }

  @Override
  public String getContentType() {
    return "CMTeasable";
  }
}
