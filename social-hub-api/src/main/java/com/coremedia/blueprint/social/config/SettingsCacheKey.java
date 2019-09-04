package com.coremedia.blueprint.social.config;

import com.coremedia.blueprint.social.SocialHubConfig;
import com.coremedia.cache.Cache;
import com.coremedia.cache.CacheKey;
import com.google.common.base.Objects;

import java.util.Map;

/**
 *
 */
public class SettingsCacheKey extends CacheKey<Map<String, Object>> {
  private SettingsFactory settingsFactory;
  private SocialHubConfig config;

  public SettingsCacheKey(SettingsFactory settingsFactory, SocialHubConfig config) {
    this.settingsFactory = settingsFactory;
    this.config = config;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SettingsCacheKey that = (SettingsCacheKey) o;
    return Objects.equal(settingsFactory, that.settingsFactory);
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(settingsFactory);
  }

  @Override
  public Map<String, Object> evaluate(Cache cache) throws Exception {
    String path = config.getGlobalConfigPath();
    if (!path.endsWith("/")) {
      path += "/";
    }
    path += config.getSettingsName();
    return settingsFactory.getSettings(path);
  }
}
