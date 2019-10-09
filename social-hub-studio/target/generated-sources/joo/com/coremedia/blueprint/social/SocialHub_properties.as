package com.coremedia.blueprint.social {

/**
 * AS3 API stub for ResourceBundle "SocialHub".
 * @see SocialHub_properties#INSTANCE
 */
[Native("com.coremedia.blueprint.social.SocialHub_properties", require)]
public class SocialHub_properties {

/**
 * Singleton for the current user Locale's instance of ResourceBundle "SocialHub".
 * @see SocialHub_properties
 */
public static const INSTANCE:SocialHub_properties;

public native function get menu_title_text():String;
public native function get menu_title_tooltip():String;
/**
 *Channels
*/
public native function get channels_empty():String;
public native function get channel_history_title():String;
public native function get channel_History_extern_title():String;
public native function get channel_queue_title():String;
public native function get channels_loading():String;
public native function get messages_loading():String;
public native function get message_loading():String;
public native function get channel_empty_scheduled():String;
public native function get channel_empty_history():String;
public native function get channel_reload():String;
public native function get channel_queue_subtitle():String;
public native function get channel_queue_today():String;
public native function get change_color():String;
/**
 * Channel labels
*/
public native function get overview_title():String;
public native function get twitter_title():String;
public native function get twitter():String;
public native function get facebook_title():String;
public native function get facebook():String;
public native function get pinterest_title():String;
public native function get pinterest():String;
public native function get youtube_title():String;
public native function get youtube():String;
public native function get instagram_title():String;
public native function get instagram():String;
public native function get linkedin_title():String;
public native function get linkedin():String;
public native function get facelift_title():String;
public native function get facelift():String;
public native function get delete_post_title():String;
public native function get delete_post_msg():String;
/**
 * Loading
*/
public native function get social_hub_channels_loading():String;
public native function get social_hub_messages_loading():String;
/**
 *Composer
*/
public native function get create_message():String;
public native function get post_button_text():String;
public native function get schedule_button_text():String;
public native function get cancel_button_text():String;
public native function get delete_attachment_text():String;
public native function get visibility_text():String;
public native function get visibility_public():String;
public native function get visibility_notListed():String;
public native function get visibility_private():String;
public native function get composer_title():String;
/**
 * generic keys used to display the message titles and empty texts
*/
public native function get message_property_briefing():String;
public native function get message_property_briefing_emptyText():String;
public native function get message_property_title():String;
public native function get message_property_title_emptyText():String;
public native function get message_property_description():String;
public native function get message_property_description_emptyText():String;
public native function get message_property_text():String;
public native function get message_property_text_emptyText():String;
public native function get message_property_assets():String;
public native function get message_property_assets_emptyText():String;
public native function get message_property_pictures():String;
public native function get message_property_pictures_emptyText():String;
public native function get message_property_images():String;
public native function get message_property_images_emptyText():String;
public native function get message_property_video():String;
public native function get message_property_video_emptyText():String;
public native function get message_property_picture():String;
public native function get message_property_picture_emptyText():String;
public native function get message_property_visibility():String;
public native function get message_property_visibility_private():String;
public native function get message_property_visibility_public():String;
public native function get message_property_visibility_unlisted():String;
public native function get message_property_visibility_restricted():String;
public native function get message_property_visibility_emptyText():String;
public native function get message_property_boards():String;
public native function get message_property_privacy():String;
public native function get message_property_privacy_private():String;
public native function get message_property_privacy_public():String;
public native function get message_property_privacy_unlisted():String;
public native function get message_property_privacy_restricted():String;
public native function get message_property_privacy_emptyText():String;
public native function get message_property_emptyText():String;
/**
 * Composer Validation
*/
public native function get messsage_property_error():String;
public native function get messsage_property_error_empty_text():String;
public native function get messsage_property_error_noValue_text():String;
public native function get messsage_property_error_noMedia_text():String;
/**
 * Composer Footer
*/
public native function get message_footer_scheduled_date():String;
public native function get message_footer_publication_date():String;
public native function get message_footer_scheduled_now():String;
/**
 * Linking
*/
public native function get external_link_dialog_title():String;
public native function get external_link_dialog_url_text():String;
public native function get external_link_dialog_shorten_text():String;
/**
 * Upload
*/
public native function get upload_button_text():String;
public native function get upload_area_text():String;
public native function get upload_area_text_hint():String;
/**
 * Job
*/
public native function get compose_job_title():String;
public native function get compose_job_notification_start():String;
public native function get compose_job_notification_finished():String;
public native function get compose_job_notification_error():String;
/**
 * Custom labels
*/
public native function get likeCount_twitter_text():String;
public native function get likeCount_twitter_icon():String;
public native function get shareCount_twitter_text():String;
public native function get shareCount_twitter_icon():String;
public native function get likeCount_youtube_text():String;
public native function get likeCount_youtube_icon():String;
public native function get dislikeCount_youtube_text():String;
public native function get dislikeCount_youtube_icon():String;
public native function get commentCount_youtube_text():String;
public native function get commentCount_youtube_icon():String;
public native function get viewCount_youtube_text():String;
public native function get viewCount_youtube_icon():String;

}
}