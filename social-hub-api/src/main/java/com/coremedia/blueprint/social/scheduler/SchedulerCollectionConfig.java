package com.coremedia.blueprint.social.scheduler;

import com.coremedia.elastic.core.api.models.CollectionConfiguration;
import com.coremedia.elastic.core.api.models.configuration.ModelCollectionConfiguration;
import com.coremedia.elastic.core.api.models.configuration.ModelCollectionConfigurationBuilder;

import java.util.Collection;

public class SchedulerCollectionConfig implements ModelCollectionConfiguration {

  private ModelCollectionConfigurationBuilder builder;


  public SchedulerCollectionConfig(ModelCollectionConfigurationBuilder builder) {
    this.builder = builder;
  }


  @Override
  public Collection<CollectionConfiguration> getCollectionConfigurations() {
    return builder.build();
  }
}
