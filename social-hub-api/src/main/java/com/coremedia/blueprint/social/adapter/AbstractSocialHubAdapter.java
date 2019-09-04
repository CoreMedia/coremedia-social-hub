package com.coremedia.blueprint.social.adapter;

import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.PublicationResult;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialHubConnector;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import com.coremedia.blueprint.social.scheduler.Scheduler;
import com.google.common.base.MoreObjects;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public abstract class AbstractSocialHubAdapter implements SocialHubAdapter {
  private static final Logger LOG = LoggerFactory.getLogger(AbstractSocialHubAdapter.class);

  private String id;
  private SocialNetworkType type;
  private boolean schedulingSupported = true;
  private boolean directPublication = false;
  private String displayName;
  private SocialHubConnector connector;

  public AbstractSocialHubAdapter(SocialHubConnector connector) {
    this.connector = connector;
  }

  @Override
  public SocialHubConnector getConnector() {
    return this.connector;
  }

  private Scheduler scheduler;

  protected Scheduler getScheduler() {
    return scheduler;
  }

  @Override
  public boolean isReadOnly() {
    return false;
  }

  @Override
  public boolean isNativeHistory() {
    return false;
  }

  @Override
  public boolean isDirectPublication() {
    return directPublication;
  }

  @Override
  public void setDirectPublication(boolean enabled) {
    this.directPublication = enabled;
  }

  @Override
  public void setSchedulingSupported(boolean enabled) {
    schedulingSupported = enabled;
  }

  @Override
  public boolean isSchedulingSupported() {
    return schedulingSupported;
  }

  @Override
  public String getId() {
    return id;
  }

  @Override
  public SocialNetworkType getType() {
    return type;
  }

  @Override
  public String getDisplayName() {
    return displayName;
  }

  @Override
  public Optional<Message> getMessage(@NonNull String id) {
    Optional<Message> message = getScheduler().getMessage(MessageState.SCHEDULED, id);
    if (!message.isPresent()) {
      message = getScheduler().getMessage(MessageState.SEND_FAILED_PERMANENTLY, id);
      if (!message.isPresent()) {
        message = getConnector().getMessage(id);
      }
    }
    return message;
  }

  @Override
  public List<? extends Message> getMessages(@NonNull MessageState state, Date startTime, Date endTime, int offset, int limit) {
    if (isDirectPublication()) {
      switch (state) {
        case SCHEDULED:
          return getScheduler().getFailedMessages(getId());
        case SENT:
          return getConnector().getMessages(state, startTime, endTime, offset, limit);
        default:
          return Collections.emptyList();
      }
    }
    else {
      switch (state) {
        case SENT:
          return getConnector().getMessages(state, startTime, endTime, offset, limit);
        default:
          return getScheduler().getMessages(state, getId(), startTime, endTime, offset, limit);
      }
    }
  }

  @Override
  public Optional<Message> createMessage(@NonNull ComposerModel composerModel) {
    if (isReadOnly()) {
      throw new UnsupportedOperationException("'publishMessage' is not supported for read-only adapters.");
    }
    if (isDirectPublication()) {
      return getScheduler().publishMessage(getId(), getType(), composerModel);
    }
    else {
      if (composerModel.getPublicationDate() == null) {
        LOG.warn("Social Message has no publication date but is marked as scheduled, " +
                "this means the message remains in the database without being published.");
      }
      return getScheduler().scheduleMessage(getId(), getType(), composerModel);
    }
  }

  @Override
  public Optional<Message> deleteMessage(@NonNull String id) {
    if (isReadOnly()) {
      throw new UnsupportedOperationException("'deleteMessage' operation not supported for read-only adapters.");
    }
    if (isDirectPublication()) {
      return getConnector().deleteMessage(id);
    }
    else {
      return getScheduler().deleteMessage(id);
    }
  }

  @Override
  public PublicationResult publish(@NonNull ComposerModel composerModel) {
    if (isReadOnly()) {
      throw new UnsupportedOperationException("SocialHubAdapter is read only (" + this + ")");
    }
    return getConnector().publishMessage(composerModel);
  }

  public void setScheduler(Scheduler scheduler) {
    this.scheduler = scheduler;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setType(String type) {
    this.type = SocialNetworkType.valueOf(type.toUpperCase());
  }

  public void setDisplayName(String displayName) {
    this.displayName = displayName;
  }

  @Override
  public String toString() {
    return MoreObjects.toStringHelper(this)
            .add("directPublication", isDirectPublication())
            .add("readOnly", isReadOnly())
            .add("id", getId())
            .add("type", getType())
            .add("displayName", getDisplayName())
            .add("connector", getConnector())
            .toString();
  }
}
