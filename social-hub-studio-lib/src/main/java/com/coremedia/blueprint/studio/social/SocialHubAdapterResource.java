package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.rest.linking.EntityResource;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import static com.coremedia.blueprint.studio.social.SocialHubAdapterResource.ADAPTER_ID;

@RestController
@RequestMapping(value = "socialhub/adapter/{" + ADAPTER_ID + "}")
public class SocialHubAdapterResource extends AbstractSocialHubResource implements EntityResource<SocialHubAdapter> {
  private static final Logger LOG = LoggerFactory.getLogger(SocialHubAdapterResource.class);

  public static final String ADAPTER_ID = "adapterId";


  @GetMapping
  public SocialHubAdapterRepresentation getRepresentation(@PathVariable final Map<String, String> params) {
    SocialHubAdapter adapter = getEntity(params);
    SocialHubAdapterRepresentation representation = new SocialHubAdapterRepresentation(adapter);

    try {
      List<? extends Message> failedMessages = adapter.getMessages(MessageState.SEND_FAILED_PERMANENTLY, null, null, 0, 30);
      List<? extends Message> sentMessages = adapter.getMessages(MessageState.SENT, null, null, 0, 30);

      List<Message> result = new ArrayList<>();
      result.addAll(failedMessages);
      result.addAll(sentMessages);
      Collections.sort(result, (Comparator<Message>) (o1, o2) -> (int) (o1.getPublicationDate().getTime() - o2.getPublicationDate().getTime()));
      representation.setSentMessages(result);
    } catch (Exception e) {
      LOG.error("Failed to load sent messages for " + adapter + ": " + e.getMessage(), e);
    }

    try {
      List<? extends Message> scheduledMessages = adapter.getMessages(MessageState.SCHEDULED, null, null, 0, 30);
      Collections.sort(scheduledMessages, (Comparator<Message>) (o1, o2) -> (int) (o1.getPublicationDate().getTime() - o2.getPublicationDate().getTime()));
      representation.setScheduledMessages(scheduledMessages);
    } catch (Exception e) {
      LOG.error("Failed to load scheduled messages for " + adapter + ": " + e.getMessage(), e);
    }
    return representation;
  }

  @Override
  @Nullable
  public SocialHubAdapter getEntity(@NonNull Map<String, String> pathVariables) {
    String adapterId = pathVariables.get(ADAPTER_ID);
    return getSocialHubService().getAdapter(adapterId).get();
  }


  @NonNull
  @Override
  public Map<String, String> getPathVariables(@NonNull SocialHubAdapter entity) {
    Map<String, String> params = new HashMap<>();
    params.put(ADAPTER_ID, entity.getId());
    return params;
  }
}
