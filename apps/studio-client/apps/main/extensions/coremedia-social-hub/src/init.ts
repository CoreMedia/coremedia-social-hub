import BeanFactoryImpl from "@coremedia/studio-client.client-core-impl/data/impl/BeanFactoryImpl";
import ComposerModelImpl from "./beans/ComposerModelImpl";
import MessageImpl from "./beans/MessageImpl";
import SocialHubAdapterImpl from "./beans/SocialHubAdapterImpl";
import SocialHubAdaptersImpl from "./beans/SocialHubAdaptersImpl";

BeanFactoryImpl.initBeanFactory().registerRemoteBeanClasses(SocialHubAdaptersImpl, SocialHubAdapterImpl, ComposerModelImpl, MessageImpl);
