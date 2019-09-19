package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.PublicationResult;
import twitter4j.TwitterException;

import java.util.Optional;

public class TwitterPublicationResult implements PublicationResult {

  private boolean isFailed;
  private boolean isRetryable;
  private int secondsToWait;
  private Optional<Message> message;


  TwitterPublicationResult(Message message) {
    this.message = Optional.of(message);
  }

  TwitterPublicationResult(TwitterException exception) {
    this.isFailed = true;
    this.isRetryable = exception.isCausedByNetworkIssue() || exception.exceededRateLimitation();
    this.secondsToWait = exception.getRetryAfter();
    this.message = Optional.empty();
  }


  @Override
  public boolean isFailed() {
    return isFailed;
  }

  @Override
  public boolean isRetryable() {
    return isRetryable;
  }

  @Override
  public int secondsToWait() {
    return secondsToWait;
  }

  @Override
  public Optional<Message> getMessage() {
    return message;
  }
}
