package com.coremedia.blueprint.social.elasticworker;

import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.scheduler.Scheduler;
import com.coremedia.elastic.core.api.models.Model;
import com.coremedia.elastic.core.api.models.ModelService;
import com.coremedia.elastic.core.api.models.Query;
import com.coremedia.elastic.core.api.tasks.TaskQueueService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

import static com.coremedia.elastic.core.api.models.Query.FilterOperator.EQUAL;
import static com.coremedia.elastic.core.api.models.Query.FilterOperator.LESS_THAN;

@Component
public class SocialHubTask implements Runnable {

  private static Logger log = LoggerFactory.getLogger(SocialHubTask.class);

  private static int LIMIT = 100;


  @Autowired
  private ModelService modelService;

  @Autowired
  private TaskQueueService taskQueueService;


  @Override
  public void run() {
    try {
      Date now = new Date();

      Query<Model> modelQuery = modelService.query(Scheduler.COLLECTION_NAME);
      List<Model> result = modelQuery
              .filter(Scheduler.PROPERTY_STATE, EQUAL, MessageState.SCHEDULED)
              .filter(Scheduler.PROPERTY_SCHEDULED_SEND_TIME, LESS_THAN, now)
              .limit(LIMIT)
              .fetch();

      log.info("Scanning collection {} for scheduled messages: {}", Scheduler.COLLECTION_NAME, result.size());

      for (Model model : result) {
        taskQueueService.queue(SocialHubTaskQueue.TASK_QUEUE_NAME, PublishMessageTask.class)
                .update(model.getId(), model.getCollection());
      }
    } catch (Exception e) {
      log.warn("Error while determining updated models.", e);
    }
  }
}
