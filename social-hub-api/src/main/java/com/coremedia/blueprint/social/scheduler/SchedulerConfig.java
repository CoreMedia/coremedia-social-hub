package com.coremedia.blueprint.social.scheduler;

import com.coremedia.elastic.core.api.models.configuration.ModelCollectionConfigurationBuilder;
import com.coremedia.elastic.core.api.models.configuration.ModelIndexConfigurationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SchedulerConfig {

  @Bean
  public SchedulerCollectionConfig schedulerCollectionConfig(ModelCollectionConfigurationBuilder builder) {
    return new SchedulerCollectionConfig(builder);
  }

  @Bean
  public SchedulerCollectionIndexes schedulerCollectionIndexes(ModelIndexConfigurationBuilder builder) {
    return new SchedulerCollectionIndexes(builder);
  }


  @Bean
  public Scheduler scheduler() {
    return new Scheduler();
  }
}
