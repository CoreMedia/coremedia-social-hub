package com.coremedia.blueprint.social.scheduler;

import com.coremedia.elastic.core.api.models.ModelIndex;
import com.coremedia.elastic.core.api.models.configuration.ModelIndexConfiguration;
import com.coremedia.elastic.core.api.models.configuration.ModelIndexConfigurationBuilder;

import java.util.Collection;

public class SchedulerCollectionIndexes implements ModelIndexConfiguration {

  private ModelIndexConfigurationBuilder builder;


  public SchedulerCollectionIndexes(ModelIndexConfigurationBuilder builder) {
    this.builder = builder;
  }


  @Override
  public Collection<ModelIndex> getModelIndexes() {
    return builder.configure(Scheduler.COLLECTION_NAME, Scheduler.PROPERTY_ADAPTERID)
            .configure(Scheduler.COLLECTION_NAME, Scheduler.PROPERTY_ADAPTERTYPE)
            .configure(Scheduler.COLLECTION_NAME, Scheduler.PROPERTY_SCHEDULED_SEND_TIME)
            .build();
  }
}
