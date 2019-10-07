package com.coremedia.blueprint.social;

import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.blueprint.social.api.ComposerModelInterceptor;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialNetworkType;
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

  public void compose(SocialHubAdapter adapter, ComposerModel composerModel, Content content) {
    Collections.sort(interceptors, Comparator.comparingInt(ComposerModelInterceptor::getPriority));

    SocialNetworkType type = adapter.getType();
    for (ComposerModelInterceptor interceptor : interceptors) {
      if(!interceptor.getSocialNetworkType().equals(type)) {
        continue;
      }

      if(!content.getType().isSubtypeOf(interceptor.getContentType())) {
        continue;
      }

      List<MessageProperty> messageProperties = adapter.getMessageProperties();
      for (MessageProperty messageProperty : messageProperties) {
        Object value = interceptor.intercept(adapter, messageProperty, content);
        composerModel.set(messageProperty.getName(), value, true);
      }
    }
  }
}
