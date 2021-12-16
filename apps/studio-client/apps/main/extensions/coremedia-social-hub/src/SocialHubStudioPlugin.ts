import StudioAppsImpl from "@coremedia/studio-client.app-context-models/apps/StudioAppsImpl";
import studioApps from "@coremedia/studio-client.app-context-models/apps/studioApps";
import ContentTypes_properties from "@coremedia/studio-client.cap-base-models/content/ContentTypes_properties";
import CopyResourceBundleProperties
  from "@coremedia/studio-client.main.editor-components/configuration/CopyResourceBundleProperties";
import RegisterRestResource from "@coremedia/studio-client.main.editor-components/configuration/RegisterRestResource";
import IEditorContext from "@coremedia/studio-client.main.editor-components/sdk/IEditorContext";
import OpenTabAction from "@coremedia/studio-client.main.editor-components/sdk/actions/OpenTabAction";
import JobErrorCodes_properties
  from "@coremedia/studio-client.main.editor-components/sdk/jobs/JobErrorCodes_properties";
import { cast } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import SocialHubComposerProperties_properties from "./SocialHubComposerProperties_properties";
import SocialHubMainTab from "./SocialHubMainTab";
import SocialHubStudioPluginBase from "./SocialHubStudioPluginBase";
import ComposerModelImpl from "./beans/ComposerModelImpl";
import MessageImpl from "./beans/MessageImpl";
import SocialHubAdapterImpl from "./beans/SocialHubAdapterImpl";
import SocialHubAdaptersImpl from "./beans/SocialHubAdaptersImpl";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";

interface SocialHubStudioPluginConfig extends Config<SocialHubStudioPluginBase> {
}

class SocialHubStudioPlugin extends SocialHubStudioPluginBase {
  declare Config: SocialHubStudioPluginConfig;

  override init(editorContext: IEditorContext): void {
    super.init(editorContext);

    cast(StudioAppsImpl, studioApps._).getSubAppLauncherRegistry().registerSubAppLauncher("cmSocialHub", (): void => {
      const openTagsAction = new OpenTabAction({
        singleton: true,
        tab: Config(SocialHubMainTab),
      });
      openTagsAction.execute();
    });
  }

  constructor(config: Config<SocialHubStudioPlugin> = null) {
    super(ConfigUtils.apply(Config(SocialHubStudioPlugin, {

      configuration: [
        new RegisterRestResource({ beanClass: SocialHubAdapterImpl }),
        new RegisterRestResource({ beanClass: SocialHubAdaptersImpl }),
        new RegisterRestResource({ beanClass: MessageImpl }),
        new RegisterRestResource({ beanClass: ComposerModelImpl }),

        /* Used to localize the scheduled date property field */
        new CopyResourceBundleProperties({
          destination: resourceManager.getResourceBundle(null, JobErrorCodes_properties),
          source: resourceManager.getResourceBundle(null, SocialHubComposerProperties_properties),
        }),
        new CopyResourceBundleProperties({
          destination: resourceManager.getResourceBundle(null, ContentTypes_properties),
          source: resourceManager.getResourceBundle(null, SocialHubComposerProperties_properties),
        }),
      ],

    }), config));
  }
}

export default SocialHubStudioPlugin;
