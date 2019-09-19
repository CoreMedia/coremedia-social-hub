package com.coremedia.blueprint.social.scheduler {
import ext.container.Container;

public class SchedulerContainerBase extends ext.container.Container {
  public function SchedulerContainerBase(config:com.coremedia.blueprint.social.scheduler.SchedulerContainer = null) {
    super();
  }

  protected native function calculateModifiersForDate(date:Date):Array;
}
}