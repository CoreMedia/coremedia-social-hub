package com.coremedia.blueprint.social;

import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.MessagePropertyType;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;

import jakarta.activation.MimeType;
import jakarta.activation.MimeTypeParseException;
import java.util.List;

/**
 *
 */
public class MessagePropertyImpl implements MessageProperty {
  private List<String> options;
  private String defaultOption;
  private MessagePropertyType type;
  private int maxLength;
  private boolean required;
  private String name;
  private String displayName;
  private MimeType mimeType;

  public MessagePropertyImpl(MessagePropertyType type, String name, String displayName, int maxLength, boolean required, String mimeType) {
    this.type = type;
    this.name = name;
    this.displayName = displayName;
    this.maxLength = maxLength;
    this.required = required;

    if(mimeType != null) {
      try {
        this.mimeType = new MimeType(mimeType);
      } catch (MimeTypeParseException e) {
        //ignore
      }
    }
  }

  public MessagePropertyImpl(MessagePropertyType type, String name, String displayName, int maxLength, boolean required) {
    this(type, name, displayName, maxLength, required, null);
  }

  public MessagePropertyImpl(MessagePropertyType type, String name, boolean required) {
    this(type, name, null, -1, true);
  }

  public MessagePropertyImpl(MessagePropertyType type, String name, int maxLength) {
    this(type, name, null, maxLength, true);
  }

  public MessagePropertyImpl(MessagePropertyType type, String name, int maxLength, boolean required) {
    this(type, name, null, maxLength, required);
  }

  public MessagePropertyImpl(MessagePropertyType type, String name, List<String> options, String defaultOption) {
    this(type, name, null, -1, false);
    this.options = options;
    this.defaultOption = defaultOption;
  }

  @Override
  @NonNull
  public MessagePropertyType getType() {
    return type;
  }

  public void setType(MessagePropertyType type) {
    this.type = type;
  }

  public int getMaxLength() {
    return maxLength;
  }

  @Override
  public boolean isRequired() {
    return required;
  }

  public void setMaxLength(int maxLength) {
    this.maxLength = maxLength;
  }

  @Override
  @NonNull
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String getDisplayName() {
    return displayName;
  }

  public void setDisplayName(String displayName) {
    this.displayName = displayName;
  }

  public List<String> getOptions() {
    return options;
  }

  public String getDefaultOption() {
    return defaultOption;
  }

  @Nullable
  @Override
  public MimeType getMimeType() {
    return mimeType;
  }

  public void setMimeType(MimeType mimeType) {
    this.mimeType = mimeType;
  }
}
