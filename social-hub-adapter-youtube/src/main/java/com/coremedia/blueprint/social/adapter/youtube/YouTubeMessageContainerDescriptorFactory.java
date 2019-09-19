package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageContainerDescriptor;
import com.coremedia.blueprint.social.api.MessageContainerDescriptorFactory;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.MessagePropertyType;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 *
 */
@Component("youTubeMessageContainerDescriptorFactory")
public class YouTubeMessageContainerDescriptorFactory implements MessageContainerDescriptorFactory<YouTubeSocialHubAdapter> {
  @NonNull
  @Override
  public SocialNetworkType getAdapterType() {
    return SocialNetworkType.YOUTUBE;
  }

  @NonNull
  @Override
  public Optional<MessageContainerDescriptor> createScheduled(@NonNull YouTubeSocialHubAdapter adapter,
                                                              @NonNull Message message,
                                                              @NonNull MessageProperty messageProperty) {
    //use default
    return Optional.empty();
  }

  @NonNull
  @Override
  public Optional<MessageContainerDescriptor> createSent(@NonNull YouTubeSocialHubAdapter adapter,
                                                         @NonNull Message message,
                                                         @NonNull MessageProperty messageProperty) {
    if (messageProperty.getName().equals("video")) {
      MessageContainerDescriptor descriptor = new MessageContainerDescriptor("video", MessagePropertyType.MARKUP);
      descriptor.setShowLabel(false);
      String html = "<div><iframe src=\"" + message.getProperties().get("url") + "\" class=\"cm-video cm-video--youtube\" frameborder=\"0\" style=\"height:180px;width:100%;\" webkitAllowFullScreen=\"\" allowFullScreen=\"\"></iframe></div>";
      descriptor.setValue(html);
      return Optional.of(descriptor);
    }
    return Optional.empty();
  }
}
