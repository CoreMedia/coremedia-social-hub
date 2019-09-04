package com.coremedia.blueprint.social.api;


import com.coremedia.common.annotations.Experimental;
import edu.umd.cs.findbugs.annotations.NonNull;

/**
 *
 * <p>The FeedbackHubErrorCode is used for error handling with the {@link SocialHubException}.
 * The Code is passed to the Exception and will be send to the client where it needs to be localized.
 * Together with the code it is also possible to give additional String arguments
 * to the {@link SocialHubException} in order to provide a dynamic localization.
 * <p>
 * <b>NOTE: Needs to be implemented by an enum!</b>
 */
@Experimental
public interface SocialHubErrorCode {
  String name();


  /**
   * Creates a code, which consists of the classname combined with the errorCode's name
   *
   * @return a code, which consists of the classname combined with the errorCode's name
   */
  @NonNull
  default String getCode(){
    return getClass().getSimpleName() + "_" + name();
  }
}
