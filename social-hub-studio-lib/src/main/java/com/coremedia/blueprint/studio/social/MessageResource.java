package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.api.Message;
import com.coremedia.blueprint.social.api.MessageContainerDescriptor;
import com.coremedia.blueprint.social.api.MessageContainerDescriptorFactory;
import com.coremedia.blueprint.social.api.MessageProperty;
import com.coremedia.blueprint.social.api.MessageState;
import com.coremedia.blueprint.social.api.SocialHubAdapter;
import com.coremedia.rest.linking.EntityResource;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.coremedia.blueprint.studio.social.MessageResource.ADAPTER_ID;
import static com.coremedia.blueprint.studio.social.MessageResource.ID;

@RestController
@RequestMapping(value = "socialhub/adapter/{" + ADAPTER_ID + "}/message/{" + ID + "}")
public class MessageResource extends AbstractSocialHubResource implements EntityResource<Message> {
  public static final String ID = "id";
  public static final String ADAPTER_ID = "adapterId";

  private List<MessageContainerDescriptorFactory> msgContainerFactories;

  @GetMapping
  public MessageRepresentation getRepresentation(@PathVariable final Map<String, String> params) {
    String adapterId = params.get(ADAPTER_ID);

    Optional<SocialHubAdapter> adapterOptional = getSocialHubService().getAdapter(adapterId);
    if (adapterOptional.isPresent()) {
      Message message = getEntity(params);
      SocialHubAdapter adapter = adapterOptional.get();
      List<MessageContainerDescriptor> descriptors = new ArrayList<>();
      MessageContainerDescriptorFactory factory = findFactory(adapter);

      if (factory != null) {
        List<MessageProperty> messageProperties = adapter.getMessageProperties();
        boolean sent = message.getState().equals(MessageState.SENT);
        for (MessageProperty property : messageProperties) {
          Optional<MessageContainerDescriptor> descriptor = Optional.empty();

          if (sent) {
            descriptor = factory.createSent(adapter, message, property);
          }
          else {
            descriptor = factory.createScheduled(adapter, message, property);
          }

          descriptor.ifPresent(descriptors::add);
        }
      }
      return new MessageRepresentation(adapter, descriptors, message);
    }
    return null;
  }

  @DeleteMapping
  public void delete(@PathVariable(ID) String id,
                     @PathVariable(ADAPTER_ID) String adapterId) {
    Optional<SocialHubAdapter> adapter = getSocialHubService().getAdapter(adapterId);
    adapter.get().deleteMessage(id);
  }

  @Override
  @Nullable
  public Message getEntity(@NonNull Map<String, String> params) {
    String adapterId = params.get(ADAPTER_ID);
    String id = params.get(ID);

    Optional<SocialHubAdapter> adapter = getSocialHubService().getAdapter(adapterId);
    if (adapter.isPresent()) {
      Optional<Message> message = adapter.get().getMessage(id);
      if (message.isPresent()) {
        return message.get();
      }
    }
    return null;
  }

  @NonNull
  @Override
  public Map<String, String> getPathVariables(@NonNull Message entity) {
    Map<String, String> params = new HashMap<>();
    params.put(ADAPTER_ID, entity.getAdapterId());
    params.put(ID, entity.getId());
    return params;
  }

  public void setMessageContainerDescriptorFactories(List<MessageContainerDescriptorFactory> msgContainerFactories) {
    this.msgContainerFactories = msgContainerFactories;
  }

  private MessageContainerDescriptorFactory findFactory(SocialHubAdapter adapter) {
    for (MessageContainerDescriptorFactory msgContainerFactory : msgContainerFactories) {
      if (msgContainerFactory.getAdapterType().name().equalsIgnoreCase(adapter.getType().networkType())) {
        return msgContainerFactory;
      }
    }
    return null;
  }
}
