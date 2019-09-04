package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.PublicationResult;

import java.io.IOException;
import java.util.Optional;

public class YouTubePublicationResult implements PublicationResult {

  private boolean isFailed;
  private Optional<Message> message;


  YouTubePublicationResult(Message message) {
    this.message = Optional.of(message);
  }

  YouTubePublicationResult(IOException exception) {
    this.isFailed = true;
    this.message = Optional.empty();
  }


  @Override
  public boolean isFailed() {
    return isFailed;
  }

  @Override
  public boolean isRetryable() {
    return false;
  }

  @Override
  public int secondsToWait() {
    return 0;
  }

  @Override
  public Optional<Message> getMessage() {
    return message;
  }
}
