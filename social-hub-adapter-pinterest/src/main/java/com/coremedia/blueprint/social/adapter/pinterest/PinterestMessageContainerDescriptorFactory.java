package com.coremedia.blueprint.social.adapter.pinterest;

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
@Component
public class PinterestMessageContainerDescriptorFactory implements MessageContainerDescriptorFactory<PinterestSocialHubAdapter> {
  @NonNull
  @Override
  public SocialNetworkType getAdapterType() {
    return SocialNetworkType.PINTEREST;
  }

  @NonNull
  @Override
  public Optional<MessageContainerDescriptor> createScheduled(@NonNull PinterestSocialHubAdapter adapter, @NonNull Message message, @NonNull MessageProperty messageProperty) {
    //use defaults message panel
    return Optional.empty();
  }

  @NonNull
  @Override
  public Optional<MessageContainerDescriptor> createSent(@NonNull PinterestSocialHubAdapter adapter, @NonNull Message message, @NonNull MessageProperty messageProperty) {
    if(messageProperty.getName().equals("note")) {
      String board = adapter.getAdapterSettings().getBoard();
      MessageContainerDescriptor descriptor = new MessageContainerDescriptor("note", MessagePropertyType.MARKUP);
      String html = "<a data-pin-do=\"embedBoard\" data-pin-board-width=\"450\" data-pin-scale-width=\"60\" href=\"" + board + "\"></a>";
      descriptor.setValue(html);
      descriptor.addScript("//assets.pinterest.com/js/pinit_main.js");
      descriptor.addScriplet("if(document.querySelector('span[data-pin-href=\"https://www.pinterest.com\"]')) {document.querySelector('span[data-pin-href=\"https://www.pinterest.com\"]')" +
              ".querySelector('span[data-pin-href=\"https://www.pinterest.com\"]').setAttribute(\"style\", \"height: 100%\")}");
      return Optional.of(descriptor);
    }
    return Optional.empty();
  }
}
