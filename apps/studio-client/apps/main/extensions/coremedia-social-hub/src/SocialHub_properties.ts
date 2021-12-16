import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";

/**
 * Interface values for ResourceBundle "SocialHub".
 * @see SocialHub_properties#INSTANCE
 */
interface SocialHub_properties {

  menu_title_text: string;
  menu_title_tooltip: string;
/**
 *Channels
 */
  channels_empty: string;
  channel_history_title: string;
  channel_History_extern_title: string;
  channel_queue_title: string;
  channels_loading: string;
  messages_loading: string;
  message_loading: string;
  channel_empty_scheduled: string;
  channel_empty_history: string;
  channel_reload: string;
  channel_queue_subtitle: string;
  channel_drop_message_link: string;
  channel_drop_message_content: string;
  channel_drop_not_allowed_message: string;
  channel_queue_today: string;
  change_color: string;
/**
 * Channel labels
 */
  overview_title: string;
  twitter_title: string;
  twitter: string;
  facebook_title: string;
  facebook: string;
  pinterest_title: string;
  pinterest: string;
  youtube_title: string;
  youtube: string;
  instagram_title: string;
  instagram: string;
  linkedin_title: string;
  linkedin: string;
  facelift_title: string;
  facelift: string;
  delete_post_title: string;
  delete_post_msg: string;
  delete_error_post_title: string;
  retry_error_post_title: string;
  retry_post_title: string;
  retry_post_msg: string;
/**
 * Loading
 */
  social_hub_channels_loading: string;
  social_hub_messages_loading: string;
/**
 *Composer
 */
  create_message: string;
  post_button_text: string;
  schedule_button_text: string;
  cancel_button_text: string;
  delete_attachment_text: string;
  delete_link_btn_tooltip_text: string;
  visibility_text: string;
  visibility_public: string;
  visibility_notListed: string;
  visibility_private: string;
  composer_title: string;
/**
 * generic keys used to display the message titles and empty texts
 */
  message_property_briefing: string;
  message_property_briefing_emptyText: string;
  message_property_title: string;
  message_property_title_emptyText: string;
  message_property_description: string;
  message_property_description_emptyText: string;
  message_property_text: string;
  message_property_text_emptyText: string;
  message_property_assets: string;
  message_property_assets_emptyText: string;
  message_property_pictures: string;
  message_property_pictures_emptyText: string;
  message_property_images: string;
  message_property_images_emptyText: string;
  message_property_video: string;
  message_property_video_emptyText: string;
  message_property_picture: string;
  message_property_picture_emptyText: string;
  message_property_visibility: string;
  message_property_visibility_private: string;
  message_property_visibility_public: string;
  message_property_visibility_unlisted: string;
  message_property_visibility_restricted: string;
  message_property_visibility_emptyText: string;
  message_property_boards: string;
  message_property_privacy: string;
  message_property_privacy_private: string;
  message_property_privacy_public: string;
  message_property_privacy_unlisted: string;
  message_property_privacy_restricted: string;
  message_property_privacy_emptyText: string;
  message_property_emptyText: string;
/**
 * Composer Validation
 */
  messsage_property_error: string;
  messsage_property_error_empty_text: string;
  messsage_property_error_length_text: string;
  messsage_property_error_noValue_text: string;
  messsage_property_error_noMedia_text: string;
/**
 * Composer Footer
 */
  message_footer_scheduled_date: string;
  message_footer_publication_date: string;
  message_footer_scheduled_now: string;
  message_footer_failed: string;
/**
 * Linking
 */
  external_link_dialog_title: string;
  external_link_dialog_url_text: string;
  external_link_dialog_shorten_text: string;
  internal_link_dialog_drop_area_label: string;
  internal_link_dialog_title: string;
/**
 * Upload
 */
  upload_button_text: string;
  upload_area_text: string;
  upload_area_text_hint: string;
/**
 * Job
 */
  compose_job_title: string;
  compose_job_notification_start_title: string;
  compose_job_notification_finished_title: string;
  compose_job_notification_retry_title: string;
  compose_job_notification_retry_start: string;
  compose_job_notification_start: string;
  compose_job_notification_finished: string;
  compose_job_notification_error: string;
/**
 * Notifications
 */
  notification_default_action_label: string;
/**
 * Custom labels
 */
  likeCount_twitter_text: string;
  likeCount_twitter_icon: string;
  shareCount_twitter_text: string;
  shareCount_twitter_icon: string;
  likeCount_youtube_text: string;
  likeCount_youtube_icon: string;
  dislikeCount_youtube_text: string;
  dislikeCount_youtube_icon: string;
  commentCount_youtube_text: string;
  commentCount_youtube_icon: string;
  viewCount_youtube_text: string;
  viewCount_youtube_icon: string;
}

/**
 * Singleton for the current user Locale's instance of ResourceBundle "SocialHub".
 * @see SocialHub_properties
 */
const SocialHub_properties: SocialHub_properties = {
  menu_title_text: "Social Media Hub",
  menu_title_tooltip: "Social Media Hub",
  channels_empty: "No social networks configured yet.",
  channel_history_title: "Past Posts",
  channel_History_extern_title: "Past Posts",
  channel_queue_title: "Scheduled",
  channels_loading: "Loading Channels...",
  messages_loading: "Loading Posts...",
  message_loading: "Loading Post...",
  channel_empty_scheduled: "There are no posts scheduled.",
  channel_empty_history: "There are no past posts yet.",
  channel_reload: "Reload messages",
  channel_queue_subtitle: "The following parts will be published at the specific time",
  channel_drop_message_link: "Drop here to create a social media post<br> with a link to the document.",
  channel_drop_message_content: "Drop here to create a social media post<br> with the document's content.",
  channel_drop_not_allowed_message: "It is currently not possible to<br> create a social media post<br> based on this document type.",
  channel_queue_today: "Today",
  change_color: "Choose toolbar color",
  overview_title: "Overview",
  twitter_title: "Twitter",
  twitter: CoreIcons_properties.twitter,
  facebook_title: "Facebook",
  facebook: CoreIcons_properties.facebook,
  pinterest_title: "Pinterest",
  pinterest: CoreIcons_properties.pinterest,
  youtube_title: "YouTube",
  youtube: CoreIcons_properties.youtube_channel_youtube_video,
  instagram_title: "Instagram",
  instagram: CoreIcons_properties.instagram,
  linkedin_title: "LinkedIn",
  linkedin: CoreIcons_properties.linkedin,
  facelift_title: "Facelift",
  facelift: CoreIcons_properties.dam_1,
  delete_post_title: "Cancel Post",
  delete_post_msg: "Delete the selected post?",
  delete_error_post_title: "Delete",
  retry_error_post_title: "Retry",
  retry_post_title: "Retry Publication",
  retry_post_msg: "Retry publication of this post?",
  social_hub_channels_loading: "Loading Adapters...",
  social_hub_messages_loading: "Loading Messages...",
  create_message: "Create a new post",
  post_button_text: "Create",
  schedule_button_text: "Schedule",
  cancel_button_text: "Cancel",
  delete_attachment_text: "Remove attachment",
  delete_link_btn_tooltip_text: "Remove Link",
  visibility_text: "Visibility",
  visibility_public: "Public",
  visibility_notListed: "Not listed",
  visibility_private: "Private",
  composer_title: "New Post for {0}",
  message_property_briefing: "Briefing",
  message_property_briefing_emptyText: "Enter a short hint for the editor here.",
  message_property_title: "Title",
  message_property_title_emptyText: "Enter a message title here.",
  message_property_description: "Description",
  message_property_description_emptyText: "Enter the message text here.",
  message_property_text: "Text",
  message_property_text_emptyText: "Enter the message text here.",
  message_property_assets: "Media",
  message_property_assets_emptyText: "Select media items for this post.",
  message_property_pictures: "Pictures",
  message_property_pictures_emptyText: "Select pictures for this post.",
  message_property_images: "Images",
  message_property_images_emptyText: "Select images for this post.",
  message_property_video: "Video",
  message_property_video_emptyText: "Select a video for this post.",
  message_property_picture: "Picture",
  message_property_picture_emptyText: "Select a picture for this post.",
  message_property_visibility: "Visibility",
  message_property_visibility_private: "Private",
  message_property_visibility_public: "Public",
  message_property_visibility_unlisted: "Not Listed",
  message_property_visibility_restricted: "Restricted",
  message_property_visibility_emptyText: "Select the visibility for this post.",
  message_property_boards: "Board",
  message_property_privacy: "Privacy",
  message_property_privacy_private: "Private",
  message_property_privacy_public: "Public",
  message_property_privacy_unlisted: "Not Listed",
  message_property_privacy_restricted: "Restricted",
  message_property_privacy_emptyText: "Select the privacy setting for this post.",
  message_property_emptyText: "Enter a value here.",
  messsage_property_error: "Errors",
  messsage_property_error_empty_text: "• Field \"<b>{0}<\/b>\" is empty.",
  messsage_property_error_length_text: "• Field value of \"<b>{0}<\/b>\" exceeds the allowed length of {1} characters.",
  messsage_property_error_noValue_text: "• No value selected for field \"<b>{0}<\/b>\".",
  messsage_property_error_noMedia_text: "• No media selected for field \"<b>{0}<\/b>\".",
  message_footer_scheduled_date: "Scheduled Date",
  message_footer_publication_date: "Publication Date",
  message_footer_scheduled_now: "Right Now",
  message_footer_failed: "Delivery Failed Permanently",
  external_link_dialog_title: "External Link",
  external_link_dialog_url_text: "URL",
  external_link_dialog_shorten_text: "Short URL",
  internal_link_dialog_drop_area_label: "Link Target",
  internal_link_dialog_title: "Content Link",
  upload_button_text: "Upload File...",
  upload_area_text: "Drop content from the Library or files from your file system here.",
  upload_area_text_hint: "New files will be uploaded to Studio's library.",
  compose_job_title: "Publishing {0} Message",
  compose_job_notification_start_title: "New Post for {0}",
  compose_job_notification_finished_title: "Publication Finished",
  compose_job_notification_retry_title: "Retrying publication for {0}",
  compose_job_notification_retry_start: "The publication has been started. It may take a while until it is completely uploaded and appears in the timeline beneath <b>Past Posts<\/b>.",
  compose_job_notification_start: "The <b>post<\/b> was sent successfully. It may take a while until it is completely uploaded and appears in the timeline beneath <b>Past Posts<\/b>.",
  compose_job_notification_finished: "The upload of the <b>post<\/b> for {0} is completely finished.",
  compose_job_notification_error: "Publishing of {0} message failed: {1}",
  notification_default_action_label: "Show Result",
  likeCount_twitter_text: "Like(s)",
  likeCount_twitter_icon: CoreIcons_properties.status_like,
  shareCount_twitter_text: "Retweet(s)",
  shareCount_twitter_icon: CoreIcons_properties.status_retweets,
  likeCount_youtube_text: "Like(s)",
  likeCount_youtube_icon: CoreIcons_properties.status_like,
  dislikeCount_youtube_text: "Dislike(s)",
  dislikeCount_youtube_icon: CoreIcons_properties.dislike,
  commentCount_youtube_text: "Comment(s)",
  commentCount_youtube_icon: CoreIcons_properties.status_comment,
  viewCount_youtube_text: "View(s)",
  viewCount_youtube_icon: CoreIcons_properties.view_menu,
};

export default SocialHub_properties;
