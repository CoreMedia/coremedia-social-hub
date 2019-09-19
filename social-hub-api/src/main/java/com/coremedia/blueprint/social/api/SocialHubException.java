package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;

import java.util.ArrayList;
import java.util.List;


/**
 * The SocialHubException is used for error handling of errors that occur within the Social Hub.
 * The Social Hub framework will catch those exceptions and send the {@link SocialHubErrorCode} and the arguments
 * to the client where they will be shown.
 * If other Exceptions are thrown within the Social Hub, they will result in a general error message at the
 * client.
 */
@Experimental
public class SocialHubException extends RuntimeException {

  private SocialHubErrorCode errorCode;

  private List<String> arguments;

  public SocialHubException(String message) {
    super(message);
  }

  public SocialHubException(String message, SocialHubErrorCode errorCode) {
    super(message);
    this.errorCode = errorCode;
  }

  public SocialHubException(String message, SocialHubErrorCode errorCode, @Nullable List<String> arguments) {
    super(message);
    this.errorCode = errorCode;
    this.arguments = arguments;
  }

  public SocialHubException(String message, Throwable cause, SocialHubErrorCode errorCode, @Nullable List<String> arguments) {
    super(message, cause);
    this.errorCode = errorCode;
    this.arguments = arguments;
  }

  public SocialHubException(Throwable cause, SocialHubErrorCode errorCode, @Nullable List<String> arguments) {
    super(cause);
    this.errorCode = errorCode;
    this.arguments = arguments;
  }

  public SocialHubException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
    super(message, cause, enableSuppression, writableStackTrace);
  }

  public SocialHubErrorCode getErrorCode() {
    return errorCode;
  }

  @NonNull
  public List<String> getArguments() {
    if (arguments == null) {
      return new ArrayList<>();
    }
    return arguments;
  }

  public String codeAndMessage() {
    return "[" + errorCode + ", " + getMessage() + "]";
  }
}
