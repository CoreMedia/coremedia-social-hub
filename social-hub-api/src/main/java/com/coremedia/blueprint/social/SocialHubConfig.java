package com.coremedia.blueprint.social;

import com.google.common.base.Strings;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "socialhub")
public class SocialHubConfig {

  private static final String SOCIAL_HUB_SETTINGS = "Settings";

  private static final String SOCIAL_HUB_CONFIGS_FOLDER = "/Social Hub";
  private final static String DEFAULT_GLOBAL_CONFIGURATION_PATH = "/Settings/Options/Settings" + SOCIAL_HUB_CONFIGS_FOLDER;
  private final static String DEFAULT_SITE_CONFIGURATION_PATH = "/Options/Settings" + SOCIAL_HUB_CONFIGS_FOLDER;


  private String settingsName;
  private String globalConfigPath;
  private String siteConfigPath;


  public String getSettingsName() {
    return Strings.isNullOrEmpty(settingsName) ? SOCIAL_HUB_SETTINGS : settingsName;
  }

  public void setSettingsName(String settingsName) {
    this.settingsName = settingsName;
  }

  public String getGlobalConfigPath() {
    return Strings.isNullOrEmpty(globalConfigPath) ? DEFAULT_GLOBAL_CONFIGURATION_PATH : globalConfigPath;
  }

  public void setGlobalConfigPath(String globalConfigPath) {
    this.globalConfigPath = globalConfigPath;
  }

  public String getSiteConfigPath() {
    return Strings.isNullOrEmpty(siteConfigPath) ? DEFAULT_SITE_CONFIGURATION_PATH : siteConfigPath;
  }

  public void setSiteConfigPath(String siteConfigPath) {
    this.siteConfigPath = siteConfigPath;
  }
}
