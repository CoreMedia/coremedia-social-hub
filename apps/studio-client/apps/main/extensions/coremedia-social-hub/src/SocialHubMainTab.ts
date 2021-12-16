import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import SwitchingContainer from "@coremedia/studio-client.ext.ui-components/components/SwitchingContainer";
import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import PanelSkin from "@coremedia/studio-client.ext.ui-components/skins/PanelSkin";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import CardLayout from "@jangaroo/ext-ts/layout/container/Card";
import FitLayout from "@jangaroo/ext-ts/layout/container/Fit";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import SocialHubMainTabBase from "./SocialHubMainTabBase";
import SocialHub_properties from "./SocialHub_properties";
import ChannelsContainer from "./channels/ChannelsContainer";

interface SocialHubMainTabConfig extends Config<SocialHubMainTabBase> {
}

class SocialHubMainTab extends SocialHubMainTabBase {
  declare Config: SocialHubMainTabConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.socialNetworksMainTab";

  constructor(config: Config<SocialHubMainTab> = null) {
    super((()=> ConfigUtils.apply(Config(SocialHubMainTab, {
      title: SocialHub_properties.menu_title_text,
      closable: true,
      id: SocialHubMainTabBase.ID,
      iconCls: CoreIcons_properties.social_hub,
      ui: PanelSkin.EMBEDDED.getSkin(),

      items: [
        Config(SwitchingContainer, {
          activeItemValueExpression: this.getActiveItemExpression(),
          items: [
            Config(Panel, { itemId: SocialHubMainTabBase.LOADER_ITEM_ID }),
            Config(Panel, {
              itemId: SocialHubMainTabBase.EMPTY_ITEM_ID,
              items: [
                Config(DisplayField, {
                  ui: DisplayFieldSkin.EMBEDDED.getSkin(),
                  value: SocialHub_properties.channels_empty,
                }),
              ],
              layout: Config(VBoxLayout, {
                align: "middle",
                pack: "center",
              }),
            }),
            Config(ChannelsContainer, {
              itemId: SocialHubMainTabBase.CHANNELS_ITEM_ID,
              adaptersExpression: this.getAdaptersExpression(),
            }),
          ],
          layout: Config(CardLayout, { deferredRender: false }),
        }),
      ],

      layout: Config(FitLayout),

    }), config))());
  }
}

export default SocialHubMainTab;
