/**
 * Properties class for ResourceBundle "SocialHub".
 */
Ext.define("com.coremedia.blueprint.social.SocialHub_properties", {

  requires: [
    "com.coremedia.icons.CoreIcons_properties"
  ],
  "menu_title_text": "Social Hub",
  "menu_title_tooltip": "Social Hub",
      /**
       *Channels
      */
  "channels_empty": "No social networks configured yet.",
  "channel_history_title": "Past Posts",
  "channel_History_extern_title": "Past Posts",
  "channel_queue_title": "Scheduled",
  "channels_loading": "Loading Channels...",
  "messages_loading": "Loading Posts...",
  "message_loading": "Loading Post...",
  "channel_empty_scheduled": "There are no posts scheduled.",
  "channel_empty_history": "There are no past posts yet.",
  "channel_reload": "Reload messages",
  "channel_queue_subtitle": "The following parts will be published at the specific time",
  "channel_queue_today": "Today",
  "change_color": "Choose toolbar color",
      /**
       * Channel labels
      */
  "overview_title": "Overview",
  "twitter_title": "Twitter",
  "facebook_title": "Facebook",
  "pinterest_title": "Pinterest",
  "youtube_title": "YouTube",
  "instagram_title": "Instagram",
  "linkedin_title": "LinkedIn",
  "facelift_title": "Facelift",
  "delete_post_title": "Cancel Post",
  "delete_post_msg": "Cancel the scheduled post?",
      /**
       * Loading
      */
  "social_hub_channels_loading": "Loading Adapters...",
  "social_hub_messages_loading": "Loading Messages...",
      /**
       *Composer
      */
  "create_message": "Create a new post",
  "post_button_text": "Create",
  "schedule_button_text": "Schedule",
  "cancel_button_text": "Cancel",
  "delete_attachment_text": "Remove attachment",
  "visibility_text": "Visibility",
  "visibility_public": "Public",
  "visibility_notListed": "Not listed",
  "visibility_private": "Private",
  "composer_title": "New Post for {0}",
      /**
       * generic keys used to display the message titles and empty texts
      */
  "message_property_briefing": "Briefing",
  "message_property_briefing_emptyText": "Enter a short hint for the editor here.",
  "message_property_title": "Title",
  "message_property_title_emptyText": "Enter a message title here.",
  "message_property_description": "Description",
  "message_property_description_emptyText": "Enter the message text here.",
  "message_property_text": "Text",
  "message_property_text_emptyText": "Enter the message text here.",
  "message_property_assets": "Media",
  "message_property_assets_emptyText": "Select media items for this post.",
  "message_property_pictures": "Pictures",
  "message_property_pictures_emptyText": "Select pictures for this post.",
  "message_property_images": "Images",
  "message_property_images_emptyText": "Select images for this post.",
  "message_property_video": "Video",
  "message_property_video_emptyText": "Select a video for this post.",
  "message_property_picture": "Picture",
  "message_property_picture_emptyText": "Select a picture for this post.",
  "message_property_visibility": "Visibility",
  "message_property_visibility_private": "Private",
  "message_property_visibility_public": "Public",
  "message_property_visibility_unlisted": "Not Listed",
  "message_property_visibility_restricted": "Restricted",
  "message_property_visibility_emptyText": "Select the visibility for this post.",
  "message_property_boards": "Board",
  "message_property_privacy": "Privacy",
  "message_property_privacy_private": "Private",
  "message_property_privacy_public": "Public",
  "message_property_privacy_unlisted": "Not Listed",
  "message_property_privacy_restricted": "Restricted",
  "message_property_privacy_emptyText": "Select the privacy setting for this post.",
  "message_property_emptyText": "Enter a value here.",
      /**
       * Composer Validation
      */
  "messsage_property_error": "Errors",
  "messsage_property_error_empty_text": "• Field \"<b>{0}<\/b>\" is empty.",
  "messsage_property_error_noValue_text": "• No value selected for field \"<b>{0}<\/b>\".",
  "messsage_property_error_noMedia_text": "• No media selected for field \"<b>{0}<\/b>\".",
      /**
       * Composer Footer
      */
  "message_footer_scheduled_date": "Scheduled Date",
  "message_footer_publication_date": "Publication Date",
  "message_footer_scheduled_now": "Right Now",
      /**
       * Linking
      */
  "external_link_dialog_title": "External Link",
  "external_link_dialog_url_text": "URL",
  "external_link_dialog_shorten_text": "Short URL",
      /**
       * Upload
      */
  "upload_button_text": "Upload File...",
  "upload_area_text": "Drop content from the Library or files from your file system here.",
  "upload_area_text_hint": "New files will be uploaded to Studio's library.",
      /**
       * Job
      */
  "compose_job_title": "Publishing {0} Message",
      /**
       * Custom labels
      */
  "likeCount_twitter_text": "Likes",
  "shareCount_twitter_text": "Retweets",
  "likeCount_youtube_text": "Likes",
  "dislikeCount_youtube_text": "Dislikes",
  "commentCount_youtube_text": "Comments",
  "viewCount_youtube_text": "Views"
}, function() {
  this.prototype["twitter"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.twitter;
  this.prototype["facebook"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.facebook;
  this.prototype["pinterest"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.pinterest;
  this.prototype["youtube"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.youtube_channel_youtube_video;
  this.prototype["instagram"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.instagram;
  this.prototype["linkedin"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.linkedin;
  this.prototype["facelift"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.dam_1;
  this.prototype["likeCount_twitter_icon"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.status_like;
  this.prototype["shareCount_twitter_icon"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.status_retweets;
  this.prototype["likeCount_youtube_icon"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.status_like;
  this.prototype["dislikeCount_youtube_icon"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.move_down;
  this.prototype["commentCount_youtube_icon"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.status_comment;
  this.prototype["viewCount_youtube_icon"] =  com.coremedia.icons.CoreIcons_properties.INSTANCE.view_menu;

  com.coremedia.blueprint.social.SocialHub_properties.INSTANCE = new com.coremedia.blueprint.social.SocialHub_properties();
});