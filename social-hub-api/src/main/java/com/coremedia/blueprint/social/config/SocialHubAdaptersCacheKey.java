package com.coremedia.blueprint.social.config;

import com.coremedia.blueprint.social.SocialHubConfig;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.cache.Cache;
import com.coremedia.cache.CacheKey;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class SocialHubAdaptersCacheKey extends CacheKey<Map<String, List<SocialHubAdapter>>> {

  private AdapterFactoryService adapterFactory;
  private SitesService sitesService;
  private SocialHubConfig config;

  public SocialHubAdaptersCacheKey(AdapterFactoryService adapterFactory, SitesService sitesService, SocialHubConfig config) {
    this.adapterFactory = adapterFactory;
    this.sitesService = sitesService;
    this.config = config;
  }


  @Override
  public String cacheClass(Cache cache, Map<String, List<SocialHubAdapter>> value) {
    return Cache.CACHE_CLASS_ALWAYS_STAY_IN_CACHE;
  }


  @Override
  public Map<String, List<SocialHubAdapter>> evaluate(Cache cache) {
    Set<Site> sites = sitesService.getSites();
    if (!sites.isEmpty()) {
      // global adapters for all sites
      List<SocialHubAdapter> globalAdapters = loadGlobalAdapters(cache);
      // site local
      ImmutableMap.Builder<String, List<SocialHubAdapter>> builder = ImmutableMap.builder();
      for (Site site : sites) {
        List<SocialHubAdapter> siteAdapters = loadSiteAdapters(site, cache);
        // merge global and site
        List<SocialHubAdapter> merged = new ArrayList<>();
        merged.addAll(globalAdapters);
        merged.addAll(siteAdapters);
        if (!merged.isEmpty()) {
          builder.put(site.getId(), ImmutableList.copyOf(merged));
        }
      }
      return builder.build();
    }
    return Collections.emptyMap();
  }


  @NonNull
  private List<SocialHubAdapter> loadGlobalAdapters(Cache cache) {
    return cache.get(new GlobalSocialHubAdapterCacheKey(adapterFactory, config));
  }

  @NonNull
  private List<SocialHubAdapter> loadSiteAdapters(Site site, Cache cache) {
    return cache.get(new SiteSocialHubAdapterCacheKey(site, adapterFactory, sitesService, config));
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SocialHubAdaptersCacheKey that = (SocialHubAdaptersCacheKey) o;
    return Objects.equal(adapterFactory, that.adapterFactory);
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(adapterFactory);
  }

  @Override
  public String toString() {
    return MoreObjects.toStringHelper(this)
            .toString();
  }
}
