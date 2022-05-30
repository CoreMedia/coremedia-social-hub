package com.coremedia.blueprint.social.elasticworker;

import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.blueprint.social.scheduler.Scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PublishMessageTask {

  private static Logger log = LoggerFactory.getLogger(PublishMessageTask.class);

  @Autowired
  private SocialHubService socialHubService;

  public void update(String id, String collection) {
    log.info("Going to publish message {}@{}", id, collection);
    try {
      socialHubService.getScheduler().publish(socialHubService, id, collection);
    } catch (Exception e) {
      log.error("Publication failed: {}@{}, {}", id, collection, e.getMessage());
    }
  }
}
