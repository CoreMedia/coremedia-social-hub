package com.coremedia.blueprint.social.api;

import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.Date;
import java.util.Map;

public interface Message {

  String getId();

  String getAdapterId();

  String getAdapterType();

  MessageState getState();

  Date getPublicationDate();

  /**
   * Used at composer model, therefore same interface signature
   *
   * @param key
   * @return
   */
  String getStringProperty(@NonNull String key);

  Map<String, Object> getProperties();

  int getFailCount();

  String getUrl();

  String getLang();

  MetaData getMetaData();

  PrivacyStatus getPrivacyStatus();

  String getTitle();

  String getDescription();


  @NonNull
  String getPlainText(@NonNull String propertyName);
}
