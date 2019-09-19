package com.coremedia.blueprint.social.elasticworker;

import com.coremedia.elastic.core.api.tasks.configuration.TaskQueue;
import com.coremedia.elastic.core.api.tasks.configuration.TaskQueueConfiguration;
import com.coremedia.elastic.core.api.tasks.configuration.TaskQueueConfigurationBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SocialHubTaskQueue implements TaskQueueConfiguration {

  public static final String TASK_QUEUE_NAME = "socialhub-queue";

  static final long DEFAULT_TASK_INTERVAL = 10L * 1000L;


  @Autowired
  private TaskQueueConfigurationBuilder builder;


  @Override
  public Iterable<TaskQueue> getTaskQueues() {
    return builder.configure(TASK_QUEUE_NAME, 1)
            .configureTask(TASK_QUEUE_NAME, SocialHubTask.class, DEFAULT_TASK_INTERVAL)
            .build();
  }
}
