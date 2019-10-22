package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageContainerDescriptor;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.scheduler.AbstractScheduledMessage;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 *
 */
public class MessageRepresentation {
  private List<MessageContainerDescriptor> messageContainerDescriptors;
  private String id;
  private String state;
  private String url;
  private String errorMessage;
  private Date publicationDate;
  private Map<String,Object> properties;
  private SocialHubAdapter adapter;
  private String language;
  private long likeCount = 0;
  private long dislikeCount = 0;
  private long commentCount = 0;
  private long viewCount = 0;
  private long shareCount = 0;

  MessageRepresentation(SocialHubAdapter adapter, List<MessageContainerDescriptor> messageContainerDescriptors, Message message) {
    this.adapter = adapter;
    this.messageContainerDescriptors = messageContainerDescriptors;
    this.id = message.getId();
    this.language = message.getLang();
    this.publicationDate = message.getPublicationDate();
    this.state = message.getState().toString();
    this.url = message.getUrl();
    this.properties = message.getProperties();

    //not available for scheduled messages
    if(message.getMetaData() != null) {
      this.likeCount = message.getMetaData().getLikeCount();
      this.dislikeCount = message.getMetaData().getDislikeCount();
      this.commentCount = message.getMetaData().getCommentCount();
      this.viewCount = message.getMetaData().getViewCount();
      this.shareCount = message.getMetaData().getSharedCount();
    }

    if(message instanceof AbstractScheduledMessage) {
      this.errorMessage = ((AbstractScheduledMessage)message).getErrorMessage();
    }
  }

  public String getId() {
    return id;
  }

  public String getState() {
    return state;
  }

  public Date getPublicationDate() {
    return publicationDate;
  }

  public String getUrl() {
    return url;
  }

  public SocialHubAdapter getAdapter() {
    return adapter;
  }

  public String getLanguage() {
    return language;
  }

  public long getShareCount() {
    return shareCount;
  }

  public long getLikeCount() {
    return likeCount;
  }

  public long getDislikeCount() {
    return dislikeCount;
  }

  public long getCommentCount() {
    return commentCount;
  }

  public long getViewCount() {
    return viewCount;
  }

  public Map<String, Object> getProperties() {
    return properties;
  }

  public List<MessageContainerDescriptor> getMessageContainerDescriptors() {
    return messageContainerDescriptors;
  }

  public String getErrorMessage() {
    return errorMessage;
  }
}
