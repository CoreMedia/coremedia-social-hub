package com.coremedia.blueprint.social.config;

import com.coremedia.blueprint.social.SocialHubConfig;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;

class SiteSocialHubAdapterCacheKey extends AbstractSocialHubAdapterCacheKey {

  private String siteId;

  private SitesService sitesService;
  private SocialHubConfig config;


  SiteSocialHubAdapterCacheKey(Site site, AdapterFactoryService adapterFactory, SitesService sitesService, SocialHubConfig config) {
    super(adapterFactory);
    this.siteId = site.getId();
    this.sitesService = sitesService;
    this.config = config;
  }


  String getConfigPath() {
    Site site = sitesService.getSite(siteId);
    if (site != null) {
      return site.getSiteRootFolder().getPath() + config.getSiteConfigPath();
    }
    return null;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SiteSocialHubAdapterCacheKey that = (SiteSocialHubAdapterCacheKey) o;
    return Objects.equal(siteId, that.siteId) &&
            Objects.equal(socialHubAdapterFactory, that.socialHubAdapterFactory);
  }

  @Override
  public int hashCode() {
    return Objects.hashCode(siteId, socialHubAdapterFactory);
  }

  @Override
  public String toString() {
    return MoreObjects.toStringHelper(this)
            .add("siteId", siteId)
            .toString();
  }
}
