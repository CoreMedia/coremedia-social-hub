import Config from "@jangaroo/runtime/Config";
import { asConfig } from "@jangaroo/runtime";
import CustomStyles from "../CustomStyles";
import SocialHub_properties from "../SocialHub_properties";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import MessagesContainerBase from "./MessagesContainerBase";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import BindVisibilityPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindVisibilityPlugin";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface MessagesContainerConfig extends Config<MessagesContainerBase>, Partial<Pick<MessagesContainer,
  "title"
>> {
}


class MessagesContainer extends MessagesContainerBase{
  declare Config: MessagesContainerConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.messagesContainer";
  static readonly MESSAGES_CONTAINER_ITEM_ID:string = "messagesContainer";

  title:string = null;

  constructor(config:Config<MessagesContainer> = null){
    super((()=> ConfigUtils.apply(Config(MessagesContainer, {

  items:[
    Config(Container, { ui:  ContainerSkin.GRID_100.getSkin(),
      items:[
        Config(DisplayField, { value: config.title, ui: ConfigUtils.asString( null), style: CustomStyles.TITLE_MEDIUM}),
        Config(DisplayField, { value: SocialHub_properties.channel_queue_subtitle,
          plugins:[
            Config(BindVisibilityPlugin, { bindTo: ValueExpressionFactory.createFromValue(config.messageType === SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES)})
          ]
        }),
        Config(Container, { height: 12 }),
        Config(DisplayField, { ui: ConfigUtils.asString( null),
                      style: CustomStyles.READONLY_EMPTY_TEXT,
                      value: this.getEmptyLabel(config.messageType),
          plugins:[
            Config(BindVisibilityPlugin, { transformer: (messages:Array<any>):boolean =>  messages.length === 0,
                                     bindTo: ValueExpressionFactory.createFromValue(config.adapter).extendBy(config.messageType)})
          ]
        })
      ],
      layout: Config(VBoxLayout)
    }),
    Config(Container, { itemId:  MessagesContainer.MESSAGES_CONTAINER_ITEM_ID, style: "padding: 2px;",
      items:[
        /* Message Container will be added here */
      ],
      layout: Config(VBoxLayout, { align: "stretch"
      })
    })
  ],
  layout: Config(VBoxLayout, { align: "stretch", pack: "center"
  })

}),config))());
  }}
export default MessagesContainer;
