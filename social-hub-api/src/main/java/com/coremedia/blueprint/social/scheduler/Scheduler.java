package com.coremedia.blueprint.social.scheduler;

import com.coremedia.blueprint.social.ComposerModelImpl;
import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.PublicationResult;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.blueprint.social.api.SocialNetworkType;
import com.coremedia.elastic.core.api.models.ModelService;
import com.coremedia.elastic.core.api.models.Query;
import com.google.common.collect.ImmutableList;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class Scheduler {

  private static Logger log = LoggerFactory.getLogger(Scheduler.class);

  private static final int MAX_FAIL = 3;

  private static final long SCHEDULE_SKIP_MILLIS = 15 * 1000L;

  public static final String COLLECTION_NAME = "socialhub-scheduled-messages";

  public static final String PROPERTY_SCHEDULED_SEND_TIME = "scheduledSendTime";
  public static final String PROPERTY_STATE = "state";
  public static final String PROPERTY_ADAPTERID = "adapterId";
  public static final String PROPERTY_ADAPTERTYPE = "adapterType";
  public static final String PROPERTY_FAILCOUNT = "failCount";


  @Autowired
  private ModelService modelService;

  @Autowired
  private SocialHubService socialHubService;


  private ModelService getModelService() {
    return modelService;
  }

  private SocialHubService getSocialHubService() {
    return socialHubService;
  }


  public Optional<Message> getMessage(MessageState state, String id) {
    AbstractScheduledMessage message = modelService.get(id, COLLECTION_NAME, AbstractScheduledMessage.class);
    if (message != null && message.getState().equals(state)) {
      return Optional.of(message);
    }
    return Optional.empty();
  }

  public Optional<Message> deleteMessage(String id) {
    log.debug("Deleting message {}", id);
    try {
      AbstractScheduledMessage message = getModelService().get(id, COLLECTION_NAME, AbstractScheduledMessage.class);

      if (message != null && (message.getState().equals(MessageState.SCHEDULED) || message.getState().equals(MessageState.SEND_FAILED_PERMANENTLY))) {
        getModelService().remove(message);
        return Optional.of(message);
      }
    } catch (Throwable t) {
      log.error("Message deletion failed for id {}:", id, t);
    }
    return Optional.empty();
  }

  public Optional<Message> updateMessage(@NonNull String id, @NonNull ComposerModelImpl composerModel) {
    log.debug("Updating message {}", id);
    try {
      AbstractScheduledMessage message = getModelService().get(id, COLLECTION_NAME, AbstractScheduledMessage.class);

      if (message != null && message.getState().equals(MessageState.SCHEDULED)) {
        message.setScheduledSendTime(composerModel.getPublicationDate());
        message.setProperties(composerModel.getProperties());
        message.save();
        return Optional.of(message);
      }
    } catch (Throwable t) {
      log.error("Message update failed for id {} and properties {}:", id, composerModel, t);
    }
    return Optional.empty();
  }

  public List<? extends Message> getMessages(MessageState state, String adapterId, Date startTime, Date endTime, int offset, int limit) {
    log.debug("Fetching messages for channel {} and state {}", adapterId, state);

    Query<? extends Message> query = getModelService()
            .query(COLLECTION_NAME, AbstractScheduledMessage.class)
            .filter(PROPERTY_ADAPTERID, Query.FilterOperator.EQUAL, adapterId)
            .filter(PROPERTY_STATE, Query.FilterOperator.EQUAL, state);

    if (startTime != null) {
      query = query.filter(PROPERTY_SCHEDULED_SEND_TIME, Query.FilterOperator.GREATER_THAN_OR_EQUAL, startTime);
    }
    else if (state == MessageState.SCHEDULED) {
      Date skipAhead = new Date(System.currentTimeMillis() + SCHEDULE_SKIP_MILLIS);
      query = query.filter(PROPERTY_SCHEDULED_SEND_TIME, Query.FilterOperator.GREATER_THAN_OR_EQUAL, skipAhead);
    }
    if (endTime != null) {
      query = query.filter(PROPERTY_SCHEDULED_SEND_TIME, Query.FilterOperator.LESS_THAN_OR_EQUAL, endTime);
    }
    if (offset > 0) {
      query = query.skip(offset);
    }
    return query.limit(limit > 0 ? limit : 1000).fetch();
  }

  public List<? extends Message> getFailedMessages(String adapterId) {
    log.debug("Fetching messages for channel {} with error state", adapterId);

    Query<? extends Message> query = getModelService()
            .query(COLLECTION_NAME, AbstractScheduledMessage.class)
            .filter(PROPERTY_ADAPTERID, Query.FilterOperator.EQUAL, adapterId)
            .filter(PROPERTY_STATE, Query.FilterOperator.IN, ImmutableList.of(MessageState.SCHEDULED, MessageState.SEND_FAILED_PERMANENTLY))
            .filter(PROPERTY_FAILCOUNT, Query.FilterOperator.GREATER_THAN, 0);

    return query.limit(1000).fetch();
  }

  public Optional<Message> publishMessage(@NonNull String adapterId, @NonNull SocialNetworkType adapterType, @NonNull ComposerModel composerModel) {
    log.debug("Creating direct message in channel {}", adapterId);

    String id = UUID.randomUUID().toString();

    AbstractScheduledMessage message = getModelService().create(id, COLLECTION_NAME, AbstractScheduledMessage.class);

    message.setAdapterId(adapterId);
    message.setUserId(composerModel.getUserId());
    message.setAdapterType(adapterType.name());
    message.setScheduledSendTime(new Date());
    message.setState(MessageState.SCHEDULED);
    message.setProperties(composerModel.getProperties());

    if (message.getPublicationDate() == null) {
      message.setPublicationDate(message.getScheduledSendTime());
    }

    message.save();
    return Optional.of(message);
  }

  public Optional<Message> scheduleMessage(@NonNull String adapterId, @NonNull SocialNetworkType adapterType, @NonNull ComposerModel composerModel) {
    log.debug("Creating scheduled message in channel {}", adapterId);

    String id = UUID.randomUUID().toString();

    AbstractScheduledMessage message = getModelService().create(id, COLLECTION_NAME, AbstractScheduledMessage.class);

    message.setAdapterId(adapterId);
    message.setAdapterType(adapterType.name());
    message.setScheduledSendTime(composerModel.getPublicationDate());
    message.setState(MessageState.SCHEDULED);
    message.setProperties(composerModel.getProperties());

    message.save();
    return Optional.of(message);
  }


  public void publish(String id, String collection) {
    log.debug("Publishing message {}", id);
    try {
      AbstractScheduledMessage message = getModelService().get(id, collection, AbstractScheduledMessage.class);

      if (message != null) {
        Optional<SocialHubAdapter> adapter = getSocialHubService().getAdapter(message.getAdapterId());
        if (adapter.isPresent()) {
          PublicationResult result = adapter.get().publish(message);
          if (!result.isFailed()) {
            message.setState(MessageState.SENT);
            message.saveAtomically();
          }
          else {
            int failCount = message.getFailCount() + 1;
            if (!result.isRetryable() || failCount >= MAX_FAIL) {
              // fail permanently
              message.setFailCount(MAX_FAIL);
              message.setState(MessageState.SEND_FAILED_PERMANENTLY);
              message.saveAtomically();
              log.warn("Publication failed permanently for message {}", message.toDebugString());
            }
            else {
              // retry
              Calendar nextSendTime = Calendar.getInstance();
              if (result.secondsToWait() > 0) {
                nextSendTime.add(Calendar.SECOND, result.secondsToWait() * 2);
              }
              else {
                nextSendTime.add(Calendar.MINUTE, failCount * 5);
              }
              message.setFailCount(failCount + 1);
              message.setScheduledSendTime(nextSendTime.getTime());
              message.saveAtomically();
              log.warn("Publication failed, retrying at {} for message {}", nextSendTime.getTime(), message.toDebugString());
            }
          }
        }
        else {
          log.warn("Channel for message {} not found", message.toDebugString());
        }
      }
      else {
        log.warn("No message for id {} and collection {}", id, collection);
      }
    } catch (Throwable t) {
      log.error("Message publication failed for id {} and collection {}:", id, collection, t);
      throw t;
    }
  }
}
