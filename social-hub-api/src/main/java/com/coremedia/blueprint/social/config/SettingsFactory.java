package com.coremedia.blueprint.social.config;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

/**
 *
 */
@Service
public class SettingsFactory {
  @Autowired
  private ContentRepository contentRepository;

  public Map<String, Object> getSettings(String configPath) {
    if (configPath != null) {
      Content settings = contentRepository.getChild(configPath);
      if (settings != null) {
        return settings.getStruct("settings").toNestedMaps();
      }
    }

    return Collections.emptyMap();
  }
}
