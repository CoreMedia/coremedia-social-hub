package com.coremedia.blueprint.social.api;

import com.coremedia.common.annotations.Experimental;
import edu.umd.cs.findbugs.annotations.NonNull;

import java.util.Optional;

/**
 * Creates {@link MessageContainerDescriptor}s for the given adapter.
 * The creation is optional. If not descriptor is found during rendering for a property,
 * a default descriptor will be created on the client site and render the property field.
 * <p>
 * A custom {@link MessageContainerDescriptor} allows to customize the rendering
 * and also to embed additional scripts from 3rd party systems.
 * </p>
 */
@Experimental
public interface MessageContainerDescriptorFactory<A> {

  /**
   * Returns the {@link SocialNetworkType} this factory creates descriptors for.
   */
  @NonNull
  SocialNetworkType getAdapterType();

  /**
   * May return null, then the default rendering is used for the given property.
   *
   * @param adapter         the adapter the descriptor should be generated for
   * @param message         the actual message
   * @param messageProperty the message property to configure the view for
   * @return a descriptor that describes how to render a container
   */
  @NonNull
  Optional<MessageContainerDescriptor> createScheduled(@NonNull A adapter,
                                                       @NonNull Message message,
                                                       @NonNull MessageProperty messageProperty);

  /**
   * May return null, then the default rendering is used for the given property.
   *
   * @param adapter         the adapter the descriptor should be generated for
   * @param message         the actual message
   * @param messageProperty the message property to configure the view for
   * @return a descriptor that describes how to render a container
   */
  @NonNull
  Optional<MessageContainerDescriptor> createSent(@NonNull A adapter,
                                                  @NonNull Message message,
                                                  @NonNull MessageProperty messageProperty);
}
