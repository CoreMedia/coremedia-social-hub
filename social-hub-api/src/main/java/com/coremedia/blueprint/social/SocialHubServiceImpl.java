package com.coremedia.blueprint.social;

import com.coremedia.blueprint.social.api.MediaSource;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.blueprint.social.config.AdapterFactoryService;
import com.coremedia.blueprint.social.config.SettingsCacheKey;
import com.coremedia.blueprint.social.config.SettingsFactory;
import com.coremedia.blueprint.social.config.SocialHubAdaptersCacheKey;
import com.coremedia.cache.Cache;
import com.coremedia.cap.common.Blob;
import com.coremedia.cap.content.Content;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.rosaloves.bitlyj.Bitly;
import com.rosaloves.bitlyj.ShortenedUrl;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.activation.MimeType;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SocialHubServiceImpl implements SocialHubService {
  private static final Logger LOG = LoggerFactory.getLogger(SocialHubServiceImpl.class);
  private static final String BLOB_DEFAULT_PROPERTY = "data";
  private static final String MEDIA_MAPPING = "mediaMapping";
  private static final String PAGE_DOCUMENT_TYOE = "pageDocumentType";
  private static final String SEGMENT_PROPERTY = "segmentProperty";
  private static final String CHILDREN_PROPERTY = "childrenProperty";
  private static final String LIVE_CAE_URL = "liveCaeUrl";

  @Autowired
  private Cache cache;

  @Autowired
  private AdapterFactoryService adapterFactory;

  @Autowired
  private SettingsFactory settingsFactory;

  @Autowired
  private SitesService sitesService;

  @Autowired
  private SocialHubConfig config;


  @Override
  public List<SocialHubAdapter> getAdapters(@NonNull Site site) {
    SocialHubAdaptersCacheKey cacheKey = new SocialHubAdaptersCacheKey(adapterFactory, sitesService, config);
    Map<String, List<SocialHubAdapter>> adapterMap = cache.get(cacheKey);
    if (adapterMap.containsKey(site.getId())) {
      return adapterMap.get(site.getId());
    }
    return Collections.emptyList();
  }

  @Override
  public Set<SocialHubAdapter> getAdapters() {
    SocialHubAdaptersCacheKey cacheKey = new SocialHubAdaptersCacheKey(adapterFactory, sitesService, config);
    Map<String, List<SocialHubAdapter>> adapterMap = cache.get(cacheKey);
    return adapterMap.values().stream().flatMap(Collection::stream).collect(Collectors.toSet());
  }

  @Override
  public Optional<SocialHubAdapter> getAdapter(@NonNull String id) {
    return getAdapters().stream().filter(e -> e.getId().equals(id)).findAny();
  }

  @Override
  public Optional<MediaSource> createMediaSource(@NonNull Content content) {
    SettingsCacheKey cacheKey = new SettingsCacheKey(settingsFactory, config);
    Map<String, Object> settings = cache.get(cacheKey);
    Map<String, Object> mediaMapping = (Map<String, Object>) settings.getOrDefault(MEDIA_MAPPING, Collections.emptyMap());

    Set<Map.Entry<String, Object>> entries = mediaMapping.entrySet();
    for (Map.Entry<String, Object> entry : entries) {
      String key = entry.getKey();
      String value = (String) entry.getValue();

      if(content.getType().isSubtypeOf(key)) {
        Blob blob = content.getBlob(value);
        return forBlob(content, blob);
      }
    }

    if(content.getType().getDescriptorsByName().containsKey(BLOB_DEFAULT_PROPERTY)) {
      Blob blob = content.getBlob(MEDIA_MAPPING);
      return forBlob(content, blob);
    }

    return Optional.empty();
  }

  @Override
  public String shortLink(@NonNull String longUrl) {
    try {
      SettingsCacheKey cacheKey = new SettingsCacheKey(settingsFactory, config);
      Map<String, Object> settings = cache.get(cacheKey);

      String userId = (String) settings.get("bitlyUserId");
      String apiIkey = (String) settings.get("bitlyApiKey");
      ShortenedUrl call = Bitly.as(userId, apiIkey).call(Bitly.shorten(longUrl));
      return call.getShortUrl();
    } catch (Exception e) {
      LOG.error("Failed to shorten url '" + longUrl + "': " + e.getMessage(), e);
    }
    return null;
  }

  @Override
  @Nullable
  public String buildLiveUrl(@NonNull Content content, boolean shorten) {
    SettingsCacheKey cacheKey = new SettingsCacheKey(settingsFactory, config);
    Map<String, Object> settings = cache.get(cacheKey);

    String caeUrl = (String) settings.get(LIVE_CAE_URL);
    if(StringUtils.isEmpty(caeUrl)) {
      return null;
    }

    String segmentProperty  = (String) settings.getOrDefault(SEGMENT_PROPERTY, "segment");
    String childrenProperty = (String) settings.getOrDefault(CHILDREN_PROPERTY, "children");
    String pageType = (String) settings.getOrDefault(PAGE_DOCUMENT_TYOE, "CMChannel");

    List<String> segments = new ArrayList<>();
    segments.add(content.getString(segmentProperty));

    Content parent = content.getReferrerWithDescriptor(pageType, childrenProperty);
    while (parent != null) {
      segments.add(parent.getString(segmentProperty));
      parent = parent.getReferrerWithDescriptor(pageType, childrenProperty);
    }

    Collections.reverse(segments);
    String fullSegment = String.join("/", segments);
    String fullUrl = caeUrl + fullSegment;
    if (shorten) {
      return shortLink(fullUrl);
    }
    return fullUrl;
  }

  private Optional<MediaSource> forBlob(@NonNull Content content, @Nullable Blob blob) {
    if (blob != null) {
      MediaSource source = new MediaSource() {
        @Override
        public String getName() {
          return content.getName();
        }

        @Override
        public InputStream getInputStream() {
          return blob.getInputStream();
        }

        @Override
        public MimeType getMimeType() {
          return blob.getContentType();
        }

        @Override
        public int getSize() {
          return blob.getSize();
        }
      };
      return Optional.of(source);
    }
    return Optional.empty();
  }
}
