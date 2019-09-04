package com.coremedia.blueprint.social;

import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.blueprint.social.api.ComposerModelInterceptor;
import com.coremedia.cap.content.Content;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 *
 */
public class ComposerFactory {
  private List<ComposerModelInterceptor> interceptors;

  public ComposerFactory(List<ComposerModelInterceptor> interceptors) {
    this.interceptors = interceptors;
  }

  public void compose(ComposerModel model, List<Content> contents) {
    Collections.sort(interceptors, Comparator.comparingInt(ComposerModelInterceptor::getPriority));

    for (Content content : contents) {
      for (ComposerModelInterceptor interceptor : interceptors) {
        if (content.getType().isSubtypeOf(interceptor.getContentType())) {
          interceptor.intercept(model, content);
        }
      }
    }
  }
}
