package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.SocialHubAdapter;

import java.util.ArrayList;
import java.util.List;

public class SocialHubAdapterRepresentation {
  private String adapterId;
  private String displayName;
  private String type;
  private boolean readOnly;
  private boolean nativeHistory;
  private boolean directPublication;
  private boolean schedulingSupported;
  private List<? extends Message> sentMessages = new ArrayList<>();
  private List<? extends Message> scheduledMessages = new ArrayList<>();
  private List<MessageProperty> messageProperties;

  public SocialHubAdapterRepresentation(SocialHubAdapter adapter) {
    type = adapter.getType().name();
    displayName = adapter.getDisplayName();
    adapterId = adapter.getId();
    directPublication = adapter.isDirectPublication();
    schedulingSupported = adapter.isSchedulingSupported();
    readOnly = adapter.isReadOnly();
    nativeHistory = adapter.isNativeHistory();
    messageProperties = adapter.getMessageProperties();
  }

  public String getType() {
    return type;
  }

  public List<? extends Message> getSentMessages() {
    return sentMessages;
  }

  public void setSentMessages(List<? extends Message> sentMessages) {
    this.sentMessages = sentMessages;
  }

  public List<? extends Message> getScheduledMessages() {
    return scheduledMessages;
  }

  public void setScheduledMessages(List<? extends Message> scheduledMessages) {
    this.scheduledMessages = scheduledMessages;
  }

  public String getDisplayName() {
    return displayName;
  }

  public String getAdapterId() {
    return adapterId;
  }

  public boolean isReadOnly() {
    return readOnly;
  }

  public void setReadOnly(boolean readOnly) {
    this.readOnly = readOnly;
  }

  public boolean isDirectPublication() {
    return directPublication;
  }

  public boolean isSchedulingSupported() {
    return schedulingSupported;
  }

  public List<MessageProperty> getMessageProperties() {
    return messageProperties;
  }

  public boolean isNativeHistory() {
    return nativeHistory;
  }
}
