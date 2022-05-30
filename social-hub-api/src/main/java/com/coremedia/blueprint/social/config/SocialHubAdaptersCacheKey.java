package com.coremedia.blueprint.social.config;

import com.coremedia.blueprint.social.SocialHubConfig;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.cache.Cache;
import com.coremedia.cache.CacheKey;
import com.coremedia.cap.common.CapConnection;
import com.coremedia.cap.common.CapSession;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class SocialHubAdaptersCacheKey extends CacheKey<Map<String, List<SocialHubAdapter>>> {

  private final static Logger LOG = LoggerFactory.getLogger(SocialHubAdaptersCacheKey.class);

  private SocialHubService socialHubService;
  private AdapterFactoryService adapterFactory;
  private SitesService sitesService;
  private SocialHubConfig config;
  private CapConnection capConnection;

  public SocialHubAdaptersCacheKey(SocialHubService socialHubService, AdapterFactoryService adapterFactory, SitesService sitesService, SocialHubConfig config, CapConnection capConnection) {
    this.socialHubService = socialHubService;
    this.adapterFactory = adapterFactory;
    this.sitesService = sitesService;
    this.config = config;
    this.capConnection = capConnection;
  }


  @Override
  public String cacheClass(Cache cache, Map<String, List<SocialHubAdapter>> value) {
    return Cache.CACHE_CLASS_ALWAYS_STAY_IN_CACHE;
  }


  @Override
  public Map<String, List<SocialHubAdapter>> evaluate(Cache cache) {
    Map<String, List<SocialHubAdapter>> adapterMappings = Collections.emptyMap();
    CapSession previousSession = null;

    try {
      // Switch to connection session, otherwise a call to SitesService#getSites()
      // would just return the readable sites for the current user.
      previousSession = capConnection.getConnectionSession().activate();
      Set<Site> sites = sitesService.getSites();
      LOG.info("Calculating SocialHubAdapters for {} sites: {}", sites.size(), sites);
      if (!sites.isEmpty()) {
        // global adapters for all sites
        List<SocialHubAdapter> globalAdapters = loadGlobalAdapters(socialHubService, cache);
        // site local
        ImmutableMap.Builder<String, List<SocialHubAdapter>> builder = ImmutableMap.builder();
        for (Site site : sites) {
          List<SocialHubAdapter> siteAdapters = loadSiteAdapters(socialHubService, site, cache);
          // merge global and site
          List<SocialHubAdapter> merged = new ArrayList<>();
          merged.addAll(globalAdapters);
          merged.addAll(siteAdapters);
          if (!merged.isEmpty()) {
            builder.put(site.getId(), ImmutableList.copyOf(merged));
          }
        }

        adapterMappings = builder.build();
      }

    } finally {
      // Restore the previous user session
      if (previousSession != null) {
        previousSession.activate();
      }
    }

    return adapterMappings;
  }


  @NonNull
  private List<SocialHubAdapter> loadGlobalAdapters(SocialHubService socialHubService, Cache cache) {
    return cache.get(new GlobalSocialHubAdapterCacheKey(socialHubService, adapterFactory, config));
  }

  @NonNull
  private List<SocialHubAdapter> loadSiteAdapters(SocialHubService socialHubService, Site site, Cache cache) {
    return cache.get(new SiteSocialHubAdapterCacheKey(socialHubService, site, adapterFactory, sitesService, config));
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
