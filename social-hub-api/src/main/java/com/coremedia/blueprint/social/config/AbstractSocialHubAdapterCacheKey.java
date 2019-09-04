package com.coremedia.blueprint.social.config;

import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.cache.Cache;
import com.coremedia.cache.CacheKey;

import java.util.List;

abstract class AbstractSocialHubAdapterCacheKey extends CacheKey<List<SocialHubAdapter>> {

  protected AdapterFactoryService socialHubAdapterFactory;


  AbstractSocialHubAdapterCacheKey(AdapterFactoryService socialHubAdapterFactory) {
    this.socialHubAdapterFactory = socialHubAdapterFactory;
  }


  abstract String getConfigPath();


  @Override
  public String cacheClass(Cache cache, List<SocialHubAdapter> value) {
    return Cache.CACHE_CLASS_ALWAYS_STAY_IN_CACHE;
  }


  @Override
  public List<SocialHubAdapter> evaluate(Cache cache) {
    return socialHubAdapterFactory.getAdapters(getConfigPath());
  }
}
