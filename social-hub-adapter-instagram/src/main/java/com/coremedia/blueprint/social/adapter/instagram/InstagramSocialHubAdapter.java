package com.coremedia.blueprint.social.adapter.instagram;

import com.coremedia.blueprint.social.MessagePropertyImpl;
import com.coremedia.blueprint.social.adapter.AbstractSocialHubAdapter;
import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.MessagePropertyType;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.SocialHubConnector;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class InstagramSocialHubAdapter extends AbstractSocialHubAdapter {

  private final InstagramAdapterSettings adapterSettings;

  public InstagramSocialHubAdapter(SocialHubConnector connector, InstagramAdapterSettings adapterSettings) {
    super(connector);
    this.adapterSettings = adapterSettings;
  }

  @Override
  public List<MessageProperty> getMessageProperties() {
    List<MessageProperty> result = new ArrayList<>();
    result.add(new MessagePropertyImpl(MessagePropertyType.MARKUP, "caption", 2000));
    result.add(new MessagePropertyImpl(MessagePropertyType.ASSETLIST, "images", 1));
    return result;
  }

  @Override
  public Optional<Message> getMessage(@NonNull String id) {
    Optional<Message> message = getScheduler().getMessage(MessageState.SCHEDULED, id);
    if (!message.isPresent()) {
      message = getScheduler().getMessage(MessageState.SENT, id);
    }

    if (!message.isPresent()) {
      message = getScheduler().getMessage(MessageState.SEND_FAILED_PERMANENTLY, id);
    }

    return message;
  }

  @Override
  public List<? extends Message> getMessages(@NonNull MessageState state, Date startTime, Date endTime, int offset, int limit) {
    return getScheduler().getMessages(state, getId(), startTime, endTime, offset, limit);
  }

  public InstagramAdapterSettings getAdapterSettings() {
    return adapterSettings;
  }
}
