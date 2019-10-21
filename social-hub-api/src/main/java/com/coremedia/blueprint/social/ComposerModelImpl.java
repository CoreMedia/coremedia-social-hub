package com.coremedia.blueprint.social;

import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.cap.content.Content;
import com.coremedia.xml.Markup;
import com.coremedia.xml.MarkupFactory;
import com.coremedia.xml.MarkupUtil;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 */
public class ComposerModelImpl implements ComposerModel {
  public static final String PROPERTIES = "properties";
  public static final String PROPERTY_PUBLICATION_DATE = "publicationDate";

  private String userId;
  private String adapterId;
  private String adapterType;

  private Map<String, Object> properties = new HashMap<>();

  public ComposerModelImpl(String userId, String adapterId, String type) {
    this.userId = userId;
    this.adapterId = adapterId;
    this.adapterType = type;
    properties.put(PROPERTY_PUBLICATION_DATE, null);
  }

  @Override
  public void addContent(@NonNull String key, @NonNull Content content) {
    List<Content> mediaItems = new ArrayList<>();
    if (!properties.containsKey(key)) {
      properties.put(key, mediaItems);
    }
    else {
      mediaItems = (List<Content>) properties.get(key);
    }

    mediaItems.add(content);
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
    if (properties.containsKey(property)) {
      Object o = properties.get(property);
      if (o instanceof String) {
        return (String) o;
      }
    }
    return null;
  }

  public void set(@NonNull String property, @Nullable Object value, boolean override) {
    Object existingValue = this.properties.get(property);
    if (existingValue instanceof String && ((String) existingValue).trim().equals("")) {
      existingValue = null;
    }
    if(existingValue instanceof List && ((List)existingValue).isEmpty()) {
      existingValue = null;
    }

    if(existingValue != null && override) {
      this.properties.put(property, value);
    }
    else if(existingValue == null) {
      this.properties.put(property, value);
    }
  }

  @NonNull
  public Date getPublicationDate() {
    Calendar publicationDate = (Calendar) getProperties().get(ComposerModelImpl.PROPERTY_PUBLICATION_DATE);
    if (publicationDate == null) {
      publicationDate = new GregorianCalendar();
    }
    return publicationDate.getTime();
  }

  public void set(String key, Object value) {
    this.properties.put(key, value);
  }

  @NonNull
  public Map<String, Object> getProperties() {
    return properties;
  }

  public void setProperties(Map<String, Object> properties) {
    this.properties.putAll(properties);
  }

  @NonNull
  @Override
  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
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
  public String getAdapterType() {
    return adapterType;
  }

  public void setAdapterType(String adapterType) {
    this.adapterType = adapterType;
  }

}
