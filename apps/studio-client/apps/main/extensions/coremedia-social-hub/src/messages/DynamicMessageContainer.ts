import Config from "@jangaroo/runtime/Config";
import DynamicMessageContainerBase from "./DynamicMessageContainerBase";
import MessageFooter from "./MessageFooter";
import Container from "@jangaroo/ext-ts/container/Container";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
interface DynamicMessageContainerConfig extends Config<DynamicMessageContainerBase> {
}


class DynamicMessageContainer extends DynamicMessageContainerBase{
  declare Config: DynamicMessageContainerConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.dynamicMessageContainer";

  constructor(config:Config<DynamicMessageContainer> = null){
    super((()=> ConfigUtils.apply(Config(DynamicMessageContainer, {
                                   style: this.getStyle(config.adapter, config.message),

  items:[
    Config(MessageFooter, { message: config.message, adapter: config.adapter}),
    Config(Container, { ui:  this.resolveSkin(config.adapter, config.message), itemId: "fieldWrapper",
      layout: Config(VBoxLayout, { align: "stretch"
      })
    })
  ],
  layout: Config(VBoxLayout, { align: "stretch"
  })

}),config))());
  }}
export default DynamicMessageContainer;
