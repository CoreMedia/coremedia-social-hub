package com.coremedia.blueprint.social {

/**
 * AS3 API stub for ResourceBundle "SocialHubSettings".
 * @see SocialHubSettings_properties#INSTANCE
 */
[Native("com.coremedia.blueprint.social.SocialHubSettings_properties", require)]
public class SocialHubSettings_properties {

/**
 * Singleton for the current user Locale's instance of ResourceBundle "SocialHubSettings".
 * @see SocialHubSettings_properties
 */
public static const INSTANCE:SocialHubSettings_properties;

public native function get social_hub_content_blob_property():String;
public native function get social_hub_content_upload_path():String;

}
}