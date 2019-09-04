package com.coremedia.blueprint.social.adapter.twitter;

import com.coremedia.blueprint.social.adapter.AbstractConnector;
import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.blueprint.social.api.MediaSource;
import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.PublicationResult;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.cap.content.Content;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twitter4j.Paging;
import twitter4j.Status;
import twitter4j.StatusUpdate;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.UploadedMedia;
import twitter4j.conf.ConfigurationBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class TwitterConnector extends AbstractConnector {
  private static final Logger LOG = LoggerFactory.getLogger(TwitterConnector.class);
  private static final int MAX_PAGE_COUNT = 100;

  private Twitter twitter;
  private TwitterSocialHubAdapter adapter;
  private TwitterConnectorSettings settings;
  private SocialHubService socialHubService;

  public TwitterConnector(@NonNull TwitterConnectorSettings settings,
                          @NonNull SocialHubService socialHubService) {
    this.settings = settings;
    this.socialHubService = socialHubService;
  }

  public TwitterSocialHubAdapter getAdapter() {
    return adapter;
  }

  public void setAdapter(TwitterSocialHubAdapter adapter) {
    this.adapter = adapter;
  }

  private synchronized Twitter getTwitter() {
    if (twitter == null) {
      ConfigurationBuilder builder = new ConfigurationBuilder();
      builder.setDebugEnabled(true)
              .setOAuthConsumerKey(settings.getConsumerKey())
              .setOAuthConsumerSecret(settings.getConsumerSecret())
              .setOAuthAccessToken(settings.getAccessToken())
              .setOAuthAccessTokenSecret(settings.getAccessTokenSecret());
      TwitterFactory twitterFactory = new TwitterFactory(builder.build());
      twitter = twitterFactory.getInstance();
    }
    return twitter;
  }


  @Override
  public Optional<Message> getMessage(@NonNull String id) {
    try {
      //we publish one message that display the complete timeline of the user
      TwitterMessage message = (TwitterMessage) getMessages(MessageState.SENT, new Date(), new Date(), 50, MAX_PAGE_COUNT).get(0);
      return Optional.of(message);
    } catch (Exception e) {
      LOG.warn("Cannot fetch message with id {}", id);
    }
    return Optional.empty();
  }

  @Override
  public List<Message> getMessages(@NonNull MessageState state, Date startTime, Date endTime, int offset, int limit) {
    List<Message> result = new ArrayList<>();
    try {
      List<Status> timeline = null;

      if (limit > 0 || offset > 0) {
        Paging paging = new Paging();

        int count = limit > MAX_PAGE_COUNT ? MAX_PAGE_COUNT : limit;

        timeline = new ArrayList<>();

        int page = offset == 0 ? 1 : 1 + ((offset - 1) / count);

        paging.setPage(page);
        paging.setCount(count);

        while (timeline.size() < limit) {
          List<Status> pagedTimeline = getTwitter().getUserTimeline(paging);
          if (pagedTimeline == null || pagedTimeline.isEmpty()) {
            break;
          }
          timeline.addAll(pagedTimeline);
          if (pagedTimeline.size() < count) {
            break;
          }
          paging.setPage(++page);
        }
      }
      else {
        timeline = getTwitter().getUserTimeline();
      }

      //we only publish one dummy message that renders the whole timeline
      TwitterMessage message = new TwitterMessage();
      message.init(adapter, null);
      message.getProperties().put("size", timeline.size());
      result.add(message);
    } catch (TwitterException e) {
      LOG.error("Failed to retrieve messages: {}", e.getMessage(), e);
    }
    return result;
  }


  @Override
  public PublicationResult publishMessage(@NonNull ComposerModel composerModel) {
    try {
      List<Long> mediaIds = new ArrayList<>();

      List<Content> assets = (List<Content>) composerModel.getProperties().get("assets");
      if (assets != null) {
        for (Content c : assets) {
          Optional<MediaSource> mediaSource = socialHubService.createMediaSource(c);
          if (mediaSource.isPresent()) {
            MediaSource media = mediaSource.get();
            UploadedMedia upload = getTwitter().uploadMedia(media.getName(), media.getInputStream());
            long mediaId = upload.getMediaId();
            mediaIds.add(mediaId);
          }
        }
      }

      String message = composerModel.getPlainText("text");
      StatusUpdate statusUpdate = new StatusUpdate(message);
      if (!mediaIds.isEmpty()) {
        statusUpdate.setMediaIds(mediaIds.stream().mapToLong(i -> i).toArray());
      }
      Status status = getTwitter().updateStatus(statusUpdate);
      Message result = createMessage(status);
      return new TwitterPublicationResult(result);
    } catch (TwitterException e) {
      LOG.error("Failed to publish message: {}", e.getMessage(), e);
      return new TwitterPublicationResult(e);
    }
  }

  @Override
  public Optional<Message> deleteMessage(@NonNull String id) {
    throw new UnsupportedOperationException("Delete message");
  }

  private Message createMessage(Status status) {
    TwitterMessage message = new TwitterMessage();
    message.init(getAdapter(), status);
    return message;
  }
}
