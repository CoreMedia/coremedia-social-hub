package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.ComposerFactory;
import com.coremedia.blueprint.social.ComposerModelImpl;
import com.coremedia.blueprint.social.api.ComposerModel;
import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.cap.common.IdHelper;
import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentRepository;
import com.coremedia.rest.cap.content.convert.DatePropertyConverter;
import com.coremedia.rest.linking.EntityResource;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static com.coremedia.blueprint.studio.social.ComposerResource.ADAPTER_ID;
import static com.coremedia.blueprint.studio.social.ComposerResource.ID;

/**
 *
 */
@RestController
@RequestMapping(value = "socialhub/composermodel/{" + ID + "}/{" + ADAPTER_ID + "}")
public class ComposerResource extends AbstractSocialHubResource implements EntityResource<ComposerModel> {
  private static final Logger LOG = LoggerFactory.getLogger(ComposerResource.class);
  static final String ID = "id";
  static final String ADAPTER_ID = "adapterId";

  private DatePropertyConverter datePropertyConverter;

  private static Map<String, ComposerModel> messageCache = new HashMap<>();
  private ContentRepository contentRepository;
  private ComposerFactory composerFactory;

  @GetMapping
  public ComposerModelRepresentation getRepresentation(@PathVariable final Map<String, String> params) {
    ComposerModel entity = getEntity(params);
    return new ComposerModelRepresentation(entity);
  }

  @PostMapping(value = "/compose")
  public boolean initComposing(@PathVariable(ID) String id,
                               @PathVariable(ADAPTER_ID) String adapterId,
                               @RequestParam("contentIds") String contentIds) {
    String[] contentIdArray = contentIds.split(",");
    List<Content> contents = new ArrayList<>();
    for (String idString : contentIdArray) {
      Content content = contentRepository.getContent(IdHelper.formatContentId(idString));
      if (content != null && content.isInProduction()) {
        contents.add(content);
      }
    }

    Optional<SocialHubAdapter> adapter = getSocialHubService().getAdapter(adapterId);
    ComposerModelImpl model = new ComposerModelImpl(id, adapterId, adapter.get().getType().name());
    messageCache.put(getKey(adapterId, id), model);

    composerFactory.compose(model, contents);
    return true;
  }

  @PostMapping
  public Message sendMessage(@PathVariable(ID) String id,
                             @PathVariable(ADAPTER_ID) String adapterId) {
    ComposerModel composerModel = doGetEntity(adapterId, id);
    Optional<SocialHubAdapter> adapter = getSocialHubService().getAdapter(adapterId);
    Optional<Message> message = adapter.get().createMessage(composerModel);
    LOG.info("Finished composing of {}", composerModel);
    reset(id, adapterId);
    return message.get();
  }

  @DeleteMapping
  public void reset(@PathVariable(ID) String id,
                    @PathVariable(ADAPTER_ID) String adapterId) {
    messageCache.remove(getKey(adapterId, id));
  }

  @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity put(@PathVariable(ID) String id,
                            @PathVariable(ADAPTER_ID) String adapterId,
                            @RequestBody(required = false) Map<String, Object> rawJson) {
    ComposerModel entity = doGetEntity(adapterId, id);
    Map<String, Object> properties = (Map<String, Object>) rawJson.get(ComposerModelImpl.PROPERTIES);
    if (properties != null) {
      updateComposerModel(entity, properties);
    }

    return ResponseEntity.ok(new ComposerModelRepresentation(entity));
  }

  @Override
  @Nullable
  public ComposerModel getEntity(@NonNull Map<String, String> pathVariables) {
    String adapterId = pathVariables.get(ADAPTER_ID);
    String id = pathVariables.get(ID);
    return doGetEntity(adapterId, id);
  }

  private String getKey(String adapterId, String id) {
    return adapterId + "_" + id;
  }

  private ComposerModel doGetEntity(String adapterId, String id) {
    String key = getKey(adapterId, id);
    if (!messageCache.containsKey(key)) {
      Optional<SocialHubAdapter> adapter = getSocialHubService().getAdapter(adapterId);
      ComposerModelImpl composerModel = new ComposerModelImpl(id, adapterId, adapter.get().getType().name());
      messageCache.put(key, composerModel);
    }
    return messageCache.get(key);
  }

  /**
   * Stores the JSON sent by the composer into the composer model
   *
   * @param composerModel the composer model
   * @param properties    the properties sent by the client
   */
  private void updateComposerModel(ComposerModel composerModel, Map<String, Object> properties) {
    Set<Map.Entry<String, Object>> entries = properties.entrySet();
    for (Map.Entry<String, Object> entry : entries) {
      String key = entry.getKey();
      //publication date is always there
      if (key.equals(ComposerModelImpl.PROPERTY_PUBLICATION_DATE)) {
        Calendar calendar = datePropertyConverter.convertTimeString((String) entry.getValue());
        composerModel.getProperties().put(ComposerModelImpl.PROPERTY_PUBLICATION_DATE, calendar);
      }
      else if (getContentList(entry.getValue()) != null) {
        List<Content> contentList = getContentList(entry.getValue());
        composerModel.getProperties().put(entry.getKey(), contentList);
      }
      else {
        composerModel.getProperties().put(entry.getKey(), entry.getValue());
      }
    }
  }

  @Nullable
  private List<Content> getContentList(Object entryValue) {
    if (entryValue instanceof List) {
      List<Object> values = (List<Object>) entryValue;

      if (!values.isEmpty()) {
        Object listEntry = values.get(0);
        if (listEntry instanceof Map) {
          List<Content> contents = new ArrayList<>();
          for (Object value : values) {
            Map mapEntry = (Map) value;
            String uriPath = (String) mapEntry.get("$Ref");
            String capId = IdHelper.formatContentId(uriPath.split("/")[1]);
            Content content = contentRepository.getContent(capId);
            contents.add(content);
          }

          return contents;
        }
      }
    }
    return null;
  }

  public void setContentRepository(ContentRepository contentRepository) {
    this.contentRepository = contentRepository;
  }

  public void setDateConverter(DatePropertyConverter composerDateConverter) {
    this.datePropertyConverter = composerDateConverter;
  }

  public void setComposerFactory(ComposerFactory socialComposerFactory) {
    this.composerFactory = socialComposerFactory;
  }

}
