package com.coremedia.blueprint.social.api;

import edu.umd.cs.findbugs.annotations.NonNull;

/**
 * Describes the type of a social network and comes with a list of predefined constants.
 * <p>
 * The name of the social network type can contain a prefix that describes the type
 * of the social media tool that is integrating the network.
 * <p>
 * For example 'MY_SOCIAL_TOOL-TWITTER' describes a social hub adapter with type twitter, but integrated
 * through the connector 'MY_SOCIAL_TOOL'. The differentiation is mandatory it should be possible
 * to integrate both variants: the native twitter integration and the twitter integration through a social media tool.
 */
public class SocialNetworkType {
  public static final SocialNetworkType TWITTER = new SocialNetworkType("TWITTER");
  public static final SocialNetworkType PINTEREST = new SocialNetworkType("PINTEREST");
  public static final SocialNetworkType FACEBOOK = new SocialNetworkType("FACEBOOK");
  public static final SocialNetworkType XING = new SocialNetworkType("XING");
  public static final SocialNetworkType LINKED_IN = new SocialNetworkType("LINKED_IN");
  public static final SocialNetworkType YOUTUBE = new SocialNetworkType("YOUTUBE");
  public static final SocialNetworkType INSTAGRAM = new SocialNetworkType("INSTAGRAM");
  public static final SocialNetworkType VK = new SocialNetworkType("VK");
  public static final SocialNetworkType WORDPRESS = new SocialNetworkType("WORDPRESS");
  public static final SocialNetworkType GOOGLE = new SocialNetworkType("GOOGLE");

  private String hubType;
  private String name;

  private SocialNetworkType(@NonNull String name) {
    this.name = name;
    if (name.contains("-")) {
      this.hubType = name.split("-")[0];
      this.name = name.split("-")[1];
    }
  }

  private SocialNetworkType(@NonNull String hubType, @NonNull String name) {
    this.hubType = hubType;
    this.name = name;
  }

  /**
   * Returns the full name of the social network type, including the optional hub prefix.
   */
  public String name() {
    if (hubType != null) {
      return hubType + "-" + name;
    }
    return name;
  }

  /**
   * Returns only the network type, e.g. Twitter or YouTube.
   */
  public String networkType() {
    return name;
  }

  public String hubType() {
    return hubType;
  }

  public static SocialNetworkType valueOf(@NonNull String name) {
    return new SocialNetworkType(name.toUpperCase());
  }

  public static SocialNetworkType hubValueOf(@NonNull String hub, @NonNull SocialNetworkType name) {
    return new SocialNetworkType(hub.toUpperCase(), name.name());
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof SocialNetworkType) {
      return this.name.equals(((SocialNetworkType) obj).name);
    }
    return false;
  }

  @Override
  public String toString() {
    return name;
  }
}
