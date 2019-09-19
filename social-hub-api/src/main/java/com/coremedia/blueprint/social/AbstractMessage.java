package com.coremedia.blueprint.social;

import com.coremedia.blueprint.social.api.Media;
import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.MetaData;
import com.coremedia.blueprint.social.api.PrivacyStatus;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupFactory;
import com.coremedia.xml.MarkupUtil;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.Date;
import java.util.List;
import java.util.Map;

public abstract class AbstractMessage implements Message {

  private String id;
  private String adapterId;
  private String adapterType;
  private MessageState state;
  private Date publicationDate;
  private int failCount;
  private String url;
  private String lang;
  private MetaData metaData;
  private PrivacyStatus privacyStatus;
  private String title;
  private String description;
  private String userId;


  /**
   * Initialize the messages with default properties.
   * Field may be unused here.
   * E.g. for the native twitter integration, we read the message history and covert the entries to our messages format.
   * On the other side, we don't use these messages for the history but display the user feed instead.
   * @param id
   * @param state
   * @param privacyStatus
   * @param publicationDate
   * @param url
   * @param lang
   * @param media
   * @param metaData
   * @param adapter
   */
  protected void init(String id, MessageState state, PrivacyStatus privacyStatus, Date publicationDate, String url, String lang, List<Media> media, MetaData metaData, SocialHubAdapter adapter) {
    setId(id);
    setState(state);
    setPrivacyStatus(privacyStatus);
    setPublicationDate(publicationDate);
    setUrl(url);
    setLang(lang);
    setMetaData(metaData);
    setAdapterId(adapter.getId());
    setAdapterType(adapter.getType().name());
  }

  @Override
  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  @NonNull
  @Override
  public String getAdapterId() {
    return adapterId;
  }

  public void setAdapterId(String adapterId) {
    this.adapterId = adapterId;
  }

  @NonNull
  @Override
  public String getAdapterType() {
    return adapterType;
  }

  public void setAdapterType(String adapterType) {
    this.adapterType = adapterType;
  }

  @Override
  public MessageState getState() {
    return state;
  }

  public void setState(MessageState state) {
    this.state = state;
  }

  @NonNull
  @Override
  public Date getPublicationDate() {
    return publicationDate;
  }

  public void setPublicationDate(Date publicationDate) {
    this.publicationDate = publicationDate;
  }

  @Override
  public int getFailCount() {
    return failCount;
  }

  public void setFailCount(int failCount) {
    this.failCount = failCount;
  }

  @Override
  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  @Override
  public String getLang() {
    return lang;
  }

  public void setLang(String lang) {
    this.lang = lang;
  }

  @Override
  public MetaData getMetaData() {
    return metaData;
  }

  public void setMetaData(MetaData metaData) {
    this.metaData = metaData;
  }

  @Override
  public PrivacyStatus getPrivacyStatus() {
    return privacyStatus;
  }

  public void setPrivacyStatus(PrivacyStatus privacyStatus) {
    this.privacyStatus = privacyStatus;
  }


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @NonNull
  public String getPlainText(@NonNull String propertyName) {
    String markupString = (String) getProperties().get(propertyName);
    String plainText = markupString;
    if(plainText == null) {
      plainText = "";
    }

    if (plainText.startsWith("<")) {
      Markup markup = MarkupFactory.fromString(markupString);
      plainText = MarkupUtil.asPlainText(markup);
    }
    return plainText;
  }

  public String getStringProperty(@NonNull String property) {
    Map<String, Object> properties = getProperties();
    if (properties.containsKey(property)) {
      Object o = properties.get(property);
      if (o instanceof String) {
        return (String) o;
      }
    }
    return null;
  }

  @NonNull
  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }
}
