package com.coremedia.blueprint.social.scheduler;

import com.coremedia.blueprint.social.AbstractMessage;
import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.blueprint.social.api.ScheduledMessage;
import com.coremedia.elastic.core.api.models.Model;
import com.google.common.base.MoreObjects;

import java.util.Date;

public abstract class AbstractScheduledMessage extends AbstractMessage implements ScheduledMessage, ComposerModel, Model {

  private Date scheduledSendTime;

  @Override
  public Date getScheduledSendTime() {
    return scheduledSendTime;
  }

  public void setScheduledSendTime(Date scheduledSendTime) {
    this.scheduledSendTime = scheduledSendTime;
  }


  public String toDebugString() {
    return MoreObjects.toStringHelper(this)
            .add("id", getId())
            .add("collection", getCollection())
            .add("adapterId", getAdapterId())
            .add("adapterType", getAdapterType())
            .add("state", getState())
            .add("publicationDate", getPublicationDate())
            .add("scheduledSendTime", getScheduledSendTime())
            .toString();
  }
}
