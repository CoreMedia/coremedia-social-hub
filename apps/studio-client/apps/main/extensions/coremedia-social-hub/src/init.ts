import BeanFactoryImpl from "@coremedia/studio-client.client-core-impl/data/impl/BeanFactoryImpl";
import SocialHubAdaptersImpl from "./beans/SocialHubAdaptersImpl";
import SocialHubAdapterImpl from "./beans/SocialHubAdapterImpl";
import ComposerModelImpl from "./beans/ComposerModelImpl";
import MessageImpl from "./beans/MessageImpl";

BeanFactoryImpl.initBeanFactory().registerRemoteBeanClasses(SocialHubAdaptersImpl, SocialHubAdapterImpl, ComposerModelImpl, MessageImpl);
