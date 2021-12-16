
/**
 * Interface values for ResourceBundle "SocialHubSettings".
 * @see SocialHubSettings_properties#INSTANCE
 */
interface SocialHubSettings_properties {

  social_hub_content_blob_property: string;
  social_hub_content_composer_document_type: string;
  social_hub_content_composer_link_type: string;
  social_hub_content_upload_path: string;
}

/**
 * Singleton for the current user Locale's instance of ResourceBundle "SocialHubSettings".
 * @see SocialHubSettings_properties
 */
const SocialHubSettings_properties: SocialHubSettings_properties = {
  social_hub_content_blob_property: "data",
  social_hub_content_composer_document_type: "CMArticle",
  social_hub_content_composer_link_type: "CMTeasable",
  social_hub_content_upload_path: "Editorial",
};

export default SocialHubSettings_properties;
