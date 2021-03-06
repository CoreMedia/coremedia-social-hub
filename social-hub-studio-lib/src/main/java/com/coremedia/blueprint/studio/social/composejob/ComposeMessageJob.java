package com.coremedia.blueprint.studio.social.composejob;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.rest.cap.jobs.Job;
import com.coremedia.rest.cap.jobs.JobContext;
import com.coremedia.rest.cap.jobs.JobExecutionException;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

/**
 * The CreateContentJob is responsible for Importing Folders and Items from an external source into CoreMedia.
 */
public class ComposeMessageJob implements Job {
  private static final Logger LOG = LoggerFactory.getLogger(ComposeMessageJob.class);
  private static final int EXPECTED_TIME_OUT = 20 * 1000; //2x publisher interval
  private static final int TOTAL_TIME_OUT = 10 * 60 * 1000; //this only ensures that the job terminates sometime

  private String adapterId;
  private String messageId;
  private SocialHubService socialHubService;

  ComposeMessageJob(SocialHubService socialHubService) {
    this.socialHubService = socialHubService;
  }

  @Nullable
  @Override
  public String call(@NonNull JobContext jobContext) throws JobExecutionException {
    SocialHubAdapter socialHubAdapter = socialHubService.getAdapter(adapterId).get();
    Optional<Message> message = socialHubAdapter.getMessage(messageId);

    int time = 0;
    while (!message.isPresent() || message.get().getState().equals(MessageState.SCHEDULED)) {
      try {
        if (time > TOTAL_TIME_OUT) {
          break;
        }
        Thread.sleep(2000);
        time += 2000;

        float progress = (time*100/EXPECTED_TIME_OUT)*0.01f;
        jobContext.notifyProgress(progress);
        message = socialHubAdapter.getMessage(messageId);
      } catch (InterruptedException e) {
        break;
      }
    }

    if (message.isPresent()) {
      Message msg = message.get();
      if (MessageState.SENT.equals(msg.getState())) {
        return messageId;
      }

      jobContext.notifyProgress(1);
      LOG.error("Sending of message {} failed permanently.", messageId);
      throw new JobExecutionException(ComposeErrorJobError.SENT_PERMANENTLY_FAILED, new Object[]{socialHubAdapter.getType().name() + " [" + messageId + "]"});
    }

    jobContext.notifyProgress(1);
    LOG.error("Timeout waiting for message {}", messageId);
    throw new JobExecutionException(ComposeErrorJobError.SENT_TIME_OUT, new Object[]{socialHubAdapter.getType().name() + " [" + messageId + "]"});
  }

  public void setAdapterId(String adapterId) {
    this.adapterId = adapterId;
  }

  public void setMessageId(String messageId) {
    this.messageId = messageId;
  }
}
