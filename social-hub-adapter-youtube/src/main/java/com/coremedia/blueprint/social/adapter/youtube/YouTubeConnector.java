package com.coremedia.blueprint.social.adapter.youtube;

import com.coremedia.blueprint.social.adapter.AbstractConnector;
import com.coremedia.blueprint.social.adapter.youtube.caching.VideoChannelSearchCacheKey;
import com.coremedia.blueprint.social.adapter.youtube.caching.VideoListCacheKey;
import com.coremedia.blueprint.social.adapter.youtube.caching.VideoPlaylistCacheKey;
import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.PrivacyStatus;
import com.coremedia.blueprint.social.api.PublicationResult;
import com.coremedia.cache.Cache;
import com.coremedia.cap.common.Blob;
import com.coremedia.cap.content.Content;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.PlaylistItem;
import com.google.api.services.youtube.model.PlaylistItemSnippet;
import com.google.api.services.youtube.model.ResourceId;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoListResponse;
import com.google.api.services.youtube.model.VideoRecordingDetails;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatus;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class YouTubeConnector extends AbstractConnector {
  private static final Logger LOG = LoggerFactory.getLogger(YouTubeConnector.class);
  public static final long MAX_RESULTS = 50L; //50 is the max value

  private static final String HTTPS_WWW_GOOGLEAPIS_COM_AUTH_YOUTUBE_FORCE_SSL = "https://www.googleapis.com/auth/youtube.force-ssl";

  public static final String SEARCH_VIDEO_TYPE_SNIPPET = "video";

  public static final String REQUEST_PART_SNIPPET = "snippet";
  public static final String REQUEST_PART_STATISTICS = "statistics";
  public static final String REQUEST_PART_STATUS = "status";
  public static final String REQUEST_PART_CONTENT_DETAILS = "contentDetails";
  public static final String REQUEST_PART_RECORDING_DETAILS = "recordingDetails";

  private static final String INSERT_VIDEO_PARTS = REQUEST_PART_SNIPPET + "," + REQUEST_PART_STATUS + "," + REQUEST_PART_RECORDING_DETAILS;
  private static final String UPDATE_VIDEO_PARTS = REQUEST_PART_SNIPPET + "," + REQUEST_PART_STATUS + "," + REQUEST_PART_RECORDING_DETAILS;

  private static final String INSERT_PLAYLIST_PARTS = REQUEST_PART_SNIPPET;
  private static final int CACHE_TIMEOUT = 60 * 24;


  private YouTube youTube;
  private YouTubeSocialHubAdapter adapter;

  private Cache cache;

  private YouTubeConnectorSettings settings;

  public YouTubeConnector(@NonNull YouTubeConnectorSettings settings, @NonNull Cache cache) {
    this.settings = settings;
    this.cache = cache;
  }

  public YouTubeSocialHubAdapter getAdapter() {
    return adapter;
  }

  public void setAdapter(YouTubeSocialHubAdapter adapter) {
    this.adapter = adapter;
  }

  private synchronized YouTube getYouTube() {
    if (youTube == null) {
      try {
        String channelId = settings.getChannelId();
        String credentialsJson = settings.getCredentialsJson();

        if (Strings.isNullOrEmpty(channelId)) {
          throw new UnsupportedOperationException("No channelId found for youtube connector");
        }
        if (Strings.isNullOrEmpty(credentialsJson)) {
          throw new UnsupportedOperationException("No credentialsJson found for youtube connector");
        }
        List<String> scopes = Lists.newArrayList(HTTPS_WWW_GOOGLEAPIS_COM_AUTH_YOUTUBE_FORCE_SSL);
        GoogleCredential credential = GoogleCredential.fromStream(new ByteArrayInputStream(credentialsJson.getBytes()));
        if (credential.createScopedRequired()) {
          credential = credential.createScoped(scopes);
        }
        youTube = new YouTube.Builder(new NetHttpTransport(), new JacksonFactory(), credential).setApplicationName("youtubeProvider").build();
      } catch (IOException e) {
        LOG.error("Failed to initialize youtube: {}", e.getMessage(), e);
        throw new RuntimeException(e);
      }
    }
    return youTube;
  }


  @Override
  public Optional<Message> getMessage(@NonNull String id) {
    YouTube youTube = getYouTube();
    VideoListResponse videoListResponse = cache.get(new VideoListCacheKey(youTube, id, CACHE_TIMEOUT));
    List<Video> videos = videoListResponse.getItems();
    if (videos != null && videos.size() > 0) {
      Message message = createMessage(videos.get(0));
      return Optional.of(message);
    }
    return Optional.empty();
  }

  @Override
  public List<? extends Message> getMessages(@NonNull MessageState state, Date startTime, Date endTime, int offset, int limit) {
    try {
      YouTube youTube = getYouTube();
      List<Message> result = new ArrayList<>();
      List<Video> videoResults;
      String playlistId = settings.getPlaylistId();

      if (Strings.isNullOrEmpty(playlistId)) {
        videoResults = cache.get(new VideoChannelSearchCacheKey(youTube, playlistId, " ", CACHE_TIMEOUT));
      }
      else {
        videoResults = cache.get(new VideoPlaylistCacheKey(youTube, playlistId, CACHE_TIMEOUT));
      }

      for (Video video : videoResults) {
        Date createdAt = YouTubeUtil.parseDate(video.getSnippet().getPublishedAt().toString());
        if (isBetween(createdAt, startTime, endTime)) {
          Message message = createMessage(video);
          result.add(message);
        }
      }
      return limitResult(result, offset, limit);
    } catch (Exception e) {
      LOG.error("Error reading YouTube adapter: {}", e.getMessage());
    }

    return Collections.emptyList();
  }


  @Override
  public PublicationResult publishMessage(@NonNull ComposerModel composerModel) {
    YouTube youTube = getYouTube();
    String channelId = settings.getChannelId();
    String playlistId = settings.getPlaylistId();

    try {
      List<Content> videos = (List<Content>) composerModel.getProperties().get("video");
      if (videos != null && !videos.isEmpty()) {
        Content contentVideo = videos.get(0);
        Video video = new Video();

        VideoSnippet snippet = new VideoSnippet();
        snippet.setChannelId(channelId);
        snippet.setDescription(composerModel.getPlainText("description"));
        snippet.setTitle(composerModel.getStringProperty("title"));
        video.setSnippet(snippet);

        VideoStatus status = new VideoStatus();
        String privacy = composerModel.getStringProperty("privacy");
        PrivacyStatus privacyStatus = PrivacyStatus.valueOf(privacy.toUpperCase());

        switch (privacyStatus) {
          case PUBLIC:
            Date publicationDate = composerModel.getPublicationDate();
            if (publicationDate != null) {
              status.setPublishAt(new DateTime(publicationDate));
              status.setPrivacyStatus("private");
            }
            else {
              status.setPrivacyStatus("public");
            }
            break;
          case UNLISTED:
            status.setPrivacyStatus("unlisted");
            break;
          default:
            status.setPrivacyStatus("private");
            break;
        }
        video.setStatus(status);

        VideoRecordingDetails recordingDetails = new VideoRecordingDetails();
        video.setRecordingDetails(recordingDetails);

        Blob blob = contentVideo.getBlob("data");
        String mimeType = blob.getContentType().toString();
        InputStreamContent mediaContent = new InputStreamContent(mimeType, blob.getInputStream());
        YouTube.Videos.Insert videosInsertRequest = youTube.videos().insert(INSERT_VIDEO_PARTS, video, mediaContent);

        Video response = videosInsertRequest.execute();

        // insert video to playlist
        if (!Strings.isNullOrEmpty(playlistId)) {
          ResourceId resourceId = new ResourceId();
          resourceId.set("kind", "youtube#video");
          resourceId.set("videoId", response.getId());

          PlaylistItemSnippet playlistSnippet = new PlaylistItemSnippet();
          playlistSnippet.setResourceId(resourceId);
          playlistSnippet.setPlaylistId(playlistId);

          PlaylistItem playlistItem = new PlaylistItem();
          playlistItem.setSnippet(playlistSnippet);

          YouTube.PlaylistItems.Insert playlistItemsInsertRequest = youTube.playlistItems().insert(INSERT_PLAYLIST_PARTS, playlistItem);
          playlistItemsInsertRequest.execute();
        }
        return new YouTubePublicationResult(createMessage(response));
      }
      else {
        throw new IOException("Video is missing");
      }
    } catch (IOException e) {
      LOG.error("Failed to publish video: {}", e.getMessage(), e);
      return new YouTubePublicationResult(e);
    }
  }

  @Override
  public Optional<Message> deleteMessage(@NonNull String id) {
    YouTube youTube = getYouTube();
    try {
      Optional<Message> message = getMessage(id);
      YouTube.Videos.Delete videosDeleteRequest = youTube.videos().delete(id);
      videosDeleteRequest.execute();
      return message;
    } catch (IOException e) {
      LOG.error("Failed to delete video: {}", e.getMessage(), e);
    }
    return Optional.empty();
  }

  private Message createMessage(Video video) {
    YouTubeMessage message = new YouTubeMessage();
    message.init(getAdapter(), video);
    return message;
  }
}
