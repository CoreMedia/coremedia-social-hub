package com.coremedia.blueprint.studio.social.composejob;

import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobFactory;
import edu.umd.cs.findbugs.annotations.NonNull;

public class ComposeMessageJobFactory implements JobFactory {

  private SocialHubService socialHubService;

  public ComposeMessageJobFactory(SocialHubService socialHubService) {
    this.socialHubService = socialHubService;
  }

  @Override
  public boolean accepts(@NonNull String jobType) {
    return jobType.equals("socialHubComposeMessageJob");
  }

  @NonNull
  @Override
  public Job createJob() {
    return new ComposeMessageJob(socialHubService);
  }
}
