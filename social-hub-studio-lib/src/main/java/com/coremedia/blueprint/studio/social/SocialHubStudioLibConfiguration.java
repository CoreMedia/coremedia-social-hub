package com.coremedia.blueprint.studio.social;

import com.coremedia.blueprint.social.ComposerFactory;
import com.coremedia.blueprint.social.api.ComposerModelInterceptor;
import com.coremedia.blueprint.social.api.MessageContainerDescriptorFactory;
import com.coremedia.blueprint.social.api.SocialHubService;
import com.coremedia.blueprint.studio.social.composejob.ComposeMessageJobFactory;
import com.coremedia.cap.content.ContentRepository;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.rest.cap.content.convert.DatePropertyConverter;
import com.coremedia.springframework.xml.ResourceAwareXmlBeanDefinitionReader;
import edu.umd.cs.findbugs.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.Scope;

import java.util.Arrays;
import java.util.List;

/**
 *
 */
@Configuration
@ImportResource(reader = ResourceAwareXmlBeanDefinitionReader.class,
        value = {
                "classpath:/com/coremedia/cap/common/uapi-services.xml",
                "classpath:/META-INF/coremedia/component-social-hub-api.xml"
        }
)
public class SocialHubStudioLibConfiguration {

  @Value("${studio.timeZones:Europe/Berlin}")
  private String timeZones;

  @Value("${studio.defaultTimeZone:Europe/Berlin}")
  private String defaultTimeZone;


  @Bean
  public ComposeMessageJobFactory socialHubComposerMessageJobFactory(@NonNull SocialHubService socialHubService) {
    return new ComposeMessageJobFactory(socialHubService);
  }


  @Bean
  @Scope(BeanDefinition.SCOPE_PROTOTYPE)
  public MessageResource socialMessageResource(@NonNull SocialHubService socialHubService,
                                               @NonNull List<MessageContainerDescriptorFactory> msgContainerFactories) {
    MessageResource messageResource = new MessageResource();
    messageResource.setSocialHubService(socialHubService);
    messageResource.setMessageContainerDescriptorFactories(msgContainerFactories);
    return messageResource;
  }

  @Bean
  @Scope(BeanDefinition.SCOPE_PROTOTYPE)
  public SocialHubAdapterResource socialAdapterResource(@NonNull SocialHubService socialHubService) {
    SocialHubAdapterResource resource = new SocialHubAdapterResource();
    resource.setSocialHubService(socialHubService);
    return resource;
  }

  @Bean
  @Scope(BeanDefinition.SCOPE_PROTOTYPE)
  public SocialHubAdaptersResource socialAdaptersResource(@NonNull SocialHubService socialHubService,
                                                          @NonNull SitesService sitesService) {
    SocialHubAdaptersResource resource = new SocialHubAdaptersResource();
    resource.setSocialHubService(socialHubService);
    resource.setSitesService(sitesService);
    return resource;
  }

  @Bean
  @Scope(BeanDefinition.SCOPE_PROTOTYPE)
  public ComposerResource socialComposerResource(@NonNull SocialHubService socialHubService,
                                                 @NonNull ContentRepository contentRepository,
                                                 @NonNull ComposerFactory socialComposerFactory) {
    DatePropertyConverter converter = new DatePropertyConverter();
    converter.setDefaultTimeZone(defaultTimeZone);
    converter.setTimeZones(Arrays.asList(timeZones.split(",")));

    ComposerResource composerResource = new ComposerResource();
    composerResource.setSocialHubService(socialHubService);
    composerResource.setDateConverter(converter);
    composerResource.setComposerFactory(socialComposerFactory);
    composerResource.setContentRepository(contentRepository);
    return composerResource;
  }

  @Bean
  public ComposerFactory socialComposerFactory(@NonNull List<ComposerModelInterceptor> interceptors) {
    return new ComposerFactory(interceptors);
  }

  @Bean
  public SocialHubServices socialHubServices(@NonNull SocialHubService socialHubService) {
    SocialHubServices socialHubServices = new SocialHubServices();
    socialHubServices.setSocialHubService(socialHubService);
    return socialHubServices;
  }
}
