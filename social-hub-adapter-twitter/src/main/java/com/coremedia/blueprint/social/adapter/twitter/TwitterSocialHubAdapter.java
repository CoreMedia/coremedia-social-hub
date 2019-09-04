package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.MessagePropertyImpl;
import com.coremedia.blueprint.social.adapter.AbstractSocialHubAdapter;
import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.MessagePropertyType;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.SocialHubConnector;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class TwitterSocialHubAdapter extends AbstractSocialHubAdapter {

  private final TwitterAdapterSettings adapterSettings;

  public TwitterSocialHubAdapter(SocialHubConnector connector, TwitterAdapterSettings adapterSettings) {
    super(connector);
    this.adapterSettings = adapterSettings;
  }

  @Override
  public boolean isNativeHistory() {
    return true;
  }

  @Override
  public List<MessageProperty> getMessageProperties() {
    List<MessageProperty> result = new ArrayList<>();
    result.add(new MessagePropertyImpl(MessagePropertyType.MARKUP, "text", 280));
    result.add(new MessagePropertyImpl(MessagePropertyType.ASSETLIST, "assets", 4, false));
    return result;
  }

  @Override
  public List<? extends Message> getMessages(@NonNull MessageState state, Date startTime, Date endTime, int offset, int limit) {
    if (state.equals(MessageState.SENT)) {
      return Arrays.asList(getDummyMessage());
    }
    return super.getMessages(state, startTime, endTime, offset, limit);
  }

  @Override
  public Optional<Message> getMessage(@NonNull String id) {
    Optional<Message> message = getScheduler().getMessage(MessageState.SCHEDULED, id);
    if (!message.isPresent()) {
      return Optional.of(getDummyMessage());
    }

    return message;
  }

  private Message getDummyMessage() {
    //just a dummy message for displaying the feed
    TwitterMessage message = new TwitterMessage();
    message.setAdapterId(getId());
    message.setAdapterType(getType().name());
    message.setState(MessageState.SENT);

    message.setId(getId() + "_" + getType());
    return message;
  }

  public TwitterAdapterSettings getAdapterSettings() {
    return adapterSettings;
  }
}
