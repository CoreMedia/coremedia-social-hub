import Config from "@jangaroo/runtime/Config";
import { asConfig } from "@jangaroo/runtime";
import SocialHubComposerProperties_properties from "./SocialHubComposerProperties_properties";
import SocialHubMainTab from "./SocialHubMainTab";
import SocialHubStudioPluginBase from "./SocialHubStudioPluginBase";
import SocialHub_properties from "./SocialHub_properties";
import ComposerModelImpl from "./beans/ComposerModelImpl";
import MessageImpl from "./beans/MessageImpl";
import SocialHubAdapterImpl from "./beans/SocialHubAdapterImpl";
import SocialHubAdaptersImpl from "./beans/SocialHubAdaptersImpl";
import ContentTypes_properties from "@coremedia/studio-client.cap-base-models/content/ContentTypes_properties";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import AddItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/AddItemsPlugin";
import CopyResourceBundleProperties from "@coremedia/studio-client.main.editor-components/configuration/CopyResourceBundleProperties";
import RegisterRestResource from "@coremedia/studio-client.main.editor-components/configuration/RegisterRestResource";
import OpenTabAction from "@coremedia/studio-client.main.editor-components/sdk/actions/OpenTabAction";
import ExtensionsMenuToolbar from "@coremedia/studio-client.main.editor-components/sdk/desktop/ExtensionsMenuToolbar";
import JobErrorCodes_properties from "@coremedia/studio-client.main.editor-components/sdk/jobs/JobErrorCodes_properties";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface SocialHubStudioPluginConfig extends Config<SocialHubStudioPluginBase> {
}


class SocialHubStudioPlugin extends SocialHubStudioPluginBase{
  declare Config: SocialHubStudioPluginConfig;

  constructor(config:Config<SocialHubStudioPlugin> = null){
    super( ConfigUtils.apply(Config(SocialHubStudioPlugin, {

  rules:[

    Config(ExtensionsMenuToolbar, {
      plugins:[
        Config(AddItemsPlugin, {
          containers:[
            Config(Container, {
              items:[
                Config(Button, { itemId: "socialHubButton",
                        tooltip: SocialHub_properties.menu_title_tooltip,
                        iconCls:  CoreIcons_properties.social_hub,
                        text:  SocialHub_properties.menu_title_text,
                  baseAction: new OpenTabAction({ singleton: true,
                      tab: Config(SocialHubMainTab)
                  })
                })
              ]
            })
          ]
        })
      ]
    })

  ],

  configuration:[
    new RegisterRestResource({ beanClass: SocialHubAdapterImpl}),
    new RegisterRestResource({ beanClass: SocialHubAdaptersImpl}),
    new RegisterRestResource({ beanClass: MessageImpl}),
    new RegisterRestResource({ beanClass: ComposerModelImpl}),

    /* Used to localize the scheduled date property field */
    new CopyResourceBundleProperties({
            destination: resourceManager.getResourceBundle(null,JobErrorCodes_properties),
            source: resourceManager.getResourceBundle(null,SocialHubComposerProperties_properties)}),
    new CopyResourceBundleProperties({
            destination: resourceManager.getResourceBundle(null,ContentTypes_properties),
            source: resourceManager.getResourceBundle(null,SocialHubComposerProperties_properties)})
  ]

}),config));
  }}
export default SocialHubStudioPlugin;
