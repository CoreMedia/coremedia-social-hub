
/**
 * Interface values for ResourceBundle "SocialHubComposerProperties".
 * @see SocialHubComposerProperties_properties#INSTANCE
 */
interface SocialHubComposerProperties_properties {

  ComposerModel_publicationDate_text: string;
  ComposeErrorJobError_SENT_TIME_OUT: string;
  ComposeErrorJobError_SENT_PERMANENTLY_FAILED: string;
}

/**
 * Singleton for the current user Locale's instance of ResourceBundle "SocialHubComposerProperties".
 * @see SocialHubComposerProperties_properties
 */
const SocialHubComposerProperties_properties: SocialHubComposerProperties_properties = {
  ComposerModel_publicationDate_text: "Scheduled Date",
  ComposeErrorJobError_SENT_TIME_OUT: "Timout waiting for message \"{0}\".",
  ComposeErrorJobError_SENT_PERMANENTLY_FAILED: "Publishing of {0} message failed."
};

export default SocialHubComposerProperties_properties;
