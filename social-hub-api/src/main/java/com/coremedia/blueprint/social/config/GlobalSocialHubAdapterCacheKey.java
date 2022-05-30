package com.coremedia.blueprint.social.config;

import com.coremedia.blueprint.social.SocialHubConfig;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;

class GlobalSocialHubAdapterCacheKey extends AbstractSocialHubAdapterCacheKey {

  private SocialHubConfig config;


  GlobalSocialHubAdapterCacheKey(SocialHubService socialHubService, AdapterFactoryService adapterFactory, SocialHubConfig config) {
    super(socialHubService, adapterFactory);
    this.config = config;
  }


  String getConfigPath() {
    return config.getGlobalConfigPath();
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GlobalSocialHubAdapterCacheKey that = (GlobalSocialHubAdapterCacheKey) o;
    return Objects.equal(socialHubAdapterFactory, that.socialHubAdapterFactory);
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(socialHubAdapterFactory);
  }

  @Override
  public String toString() {
    return MoreObjects.toStringHelper(this)
            .toString();
  }
}
