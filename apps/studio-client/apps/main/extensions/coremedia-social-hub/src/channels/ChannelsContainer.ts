import Config from "@jangaroo/runtime/Config";
import ChannelContainer from "./ChannelContainer";
import ChannelsContainerBase from "./ChannelsContainerBase";
import BindComponentsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindComponentsPlugin";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
interface ChannelsContainerConfig extends Config<ChannelsContainerBase> {
}


class ChannelsContainer extends ChannelsContainerBase{
  declare Config: ChannelsContainerConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.channelsContainer";
  static readonly ID:string = "socialHubChannelsContainer";

  constructor(config:Config<ChannelsContainer> = null){
    super( ConfigUtils.apply(Config(ChannelsContainer, {
                                style: "padding-top: 4px;",
                                id: ChannelsContainer.ID,
                                autoScroll: true,

  plugins:[
    Config(BindComponentsPlugin, {
            valueExpression: config.adaptersExpression,
            configBeanParameterName: "adapter",
            clearBeforeUpdate: false,
      template: Config(ChannelContainer, { flex: 1
      })
    })
  ],
  layout: Config(HBoxLayout, { align: "stretch"
  })

}),config));
  }}
export default ChannelsContainer;
