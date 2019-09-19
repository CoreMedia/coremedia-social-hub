package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.ArrayList;
import java.util.List;

/**
 * A MessageContainerDescriptor configures what message field should be and how when a post container
 * is rendered for an adapter.
 */
@Experimental
public class MessageContainerDescriptor {
  private String propertyName;
  private boolean excluded;
  private String type;
  private Object value;
  private boolean showLabel;

  private List<String> scripts = new ArrayList<>();

  private List<String> scriplets = new ArrayList<>();

  public MessageContainerDescriptor(@NonNull String propertyName, @NonNull MessagePropertyType type) {
    this.propertyName = propertyName;
    this.type = type.name();
  }

  public List<String> getScriplets() {
    return scriplets;
  }

  public List<String> getScripts() {
    return scripts;
  }

  public void addScript(@NonNull String url) {
    this.scripts.add(url);
  }

  public void addScriplet(@NonNull String script) {
    this.scriplets.add(script);
  }

  public boolean isExcluded() {
    return excluded;
  }

  public String getPropertyName() {
    return propertyName;
  }

  public void setExcluded(boolean excluded) {
    this.excluded = excluded;
  }

  public String getType() {
    return type;
  }

  public Object getValue() {
    return value;
  }

  public void setValue(Object value) {
    this.value = value;
  }

  public boolean isShowLabel() {
    return showLabel;
  }

  public void setShowLabel(boolean showLabel) {
    this.showLabel = showLabel;
  }
}
