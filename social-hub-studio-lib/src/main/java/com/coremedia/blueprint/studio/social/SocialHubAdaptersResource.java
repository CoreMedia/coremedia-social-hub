package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.rest.linking.EntityResource;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.coremedia.blueprint.studio.social.SocialHubAdaptersResource.SITE_ID;

@RestController
@RequestMapping(value = "socialhub/adapters/{" + SITE_ID + "}")
public class SocialHubAdaptersResource extends AbstractSocialHubResource implements EntityResource<SocialHubAdapterModels> {
  public static final String SITE_ID = "siteId";

  private SitesService sitesService;

  @GetMapping
  public SocialHubAdaptersRepresentation getRepresentation(@PathVariable final Map<String, String> params) {
    SocialHubAdapterModels adapters = getEntity(params);
    return new SocialHubAdaptersRepresentation(adapters);
  }

  @Override
  @Nullable
  public SocialHubAdapterModels getEntity(@NonNull Map<String, String> pathVariables) {
    String siteId = pathVariables.get(SITE_ID);
    Site site = sitesService.getSite(siteId);
    List<SocialHubAdapter> adapters = new ArrayList<>(getSocialHubService().getAdapters(site));
    Collections.sort(adapters, Comparator.comparing(SocialHubAdapter::getPosition));
    return new SocialHubAdapterModels(adapters, siteId);
  }


  @NonNull
  @Override
  public Map<String, String> getPathVariables(@NonNull SocialHubAdapterModels entity) {
    Map<String, String> params = new HashMap<>();
    params.put(SITE_ID, entity.getSiteId());
    return params;
  }

  public void setSitesService(SitesService sitesService) {
    this.sitesService = sitesService;
  }
}
