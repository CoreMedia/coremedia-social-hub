package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageContainerDescriptor;
import com.coremedia.blueprint.social.api.MessageContainerDescriptorFactory;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.MessagePropertyType;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 *
 */
@Component("twitterMessageContainerDescriptorFactory")
public class TwitterMessageContainerDescriptorFactory implements MessageContainerDescriptorFactory<TwitterSocialHubAdapter> {
  private static final Logger LOG = LoggerFactory.getLogger(TwitterMessageContainerDescriptorFactory.class);

  @NonNull
  @Override
  public SocialNetworkType getAdapterType() {
    return SocialNetworkType.TWITTER;
  }

  @NonNull
  @Override
  public Optional<MessageContainerDescriptor> createScheduled(@NonNull TwitterSocialHubAdapter adapter,
                                                              @NonNull Message message,
                                                              @NonNull MessageProperty messageProperty) {
    //use defaults message panel
    return Optional.empty();
  }

  @NonNull
  @Override
  public Optional<MessageContainerDescriptor> createSent(@NonNull TwitterSocialHubAdapter adapter,
                                                         @NonNull Message message,
                                                         @NonNull MessageProperty messageProperty) {
    if (messageProperty.getName().equals("text") && adapter.getAdapterSettings() != null) {
      try {
        String timeline = adapter.getAdapterSettings().getTimeline();

        MessageContainerDescriptor descriptor = new MessageContainerDescriptor("text", MessagePropertyType.MARKUP);
        String html = "<a target=\"_blank\" class=\"twitter-timeline\" href=\"" + timeline + "\" style=\"color:black;\">Loading Timeline...</a>";
        descriptor.setValue(html);
        descriptor.setShowLabel(false);
        descriptor.addScript("https://platform.twitter.com/widgets.js");
        descriptor.addScriplet("if(window.twttr) {window.twttr.widgets.load();}");
        return Optional.of(descriptor);
      } catch (Exception e) {
        LOG.error("Failed to retrieve messages descriptor for {}", adapter.getAdapterSettings(), e);
      }
    }
    return Optional.empty();
  }
}
