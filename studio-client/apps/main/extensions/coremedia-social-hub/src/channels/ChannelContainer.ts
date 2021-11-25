import Config from "@jangaroo/runtime/Config";
import { asConfig, bind } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import MessagesContainer from "../messages/MessagesContainer";
import ChannelContainerBase from "./ChannelContainerBase";
import ColorChooser from "./ColorChooser";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import IconDisplayField from "@coremedia/studio-client.ext.ui-components/components/IconDisplayField";
import MenuIconButton from "@coremedia/studio-client.ext.ui-components/components/MenuIconButton";
import SwitchingContainer from "@coremedia/studio-client.ext.ui-components/components/SwitchingContainer";
import BindVisibilityPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindVisibilityPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import IconDisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/IconDisplayFieldSkin";
import PanelSkin from "@coremedia/studio-client.ext.ui-components/skins/PanelSkin";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import CardLayout from "@jangaroo/ext-ts/layout/container/Card";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import Menu from "@jangaroo/ext-ts/menu/Menu";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import Spacer from "@jangaroo/ext-ts/toolbar/Spacer";
import Toolbar from "@jangaroo/ext-ts/toolbar/Toolbar";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface ChannelContainerConfig extends Config<ChannelContainerBase> {
}


class ChannelContainer extends ChannelContainerBase{
  declare Config: ChannelContainerConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.channelContainer";
  static readonly COMPOSER_BUTTON_ITEM_ID:string = "composerButton";
  static readonly COLOR_CHOOSER_BUTTON_ITEM_ID:string = "colorChooserButton";

  static readonly MESSAGE_SCHEDULED_ITEM_ID:string = "messagesScheduled";
  static readonly MESSAGE_HISTORY_ITEM_ID:string = "messagesHistory";

  constructor(config:Config<ChannelContainer> = null){
    super((()=> ConfigUtils.apply(Config(ChannelContainer, {
                            minWidth: 500,
                            id: config.adapter.getAdapterId(),
                            style: "border-radius: 6px;",
                            ui:  PanelSkin.ACCORDION.getSkin(),

  items:[
    Config(SwitchingContainer, { itemId: "statusSwitcher", flex: 1, activeItemValueExpression: this.getActiveItemExpression(),
      items:[
        Config(Panel, { itemId:  ChannelContainerBase.LOADER_ITEM_ID}),
        Config(Panel, { itemId:  ChannelContainerBase.DROP_LINK_ITEM_ID, cls: "channel-drop-container",
          items:[
            Config(Container, { height: 100}),
            Config(IconDisplayField, { scale: "large",
                                 iconCls:  CoreIcons_properties.send_link_to_content_set}),
            Config(Container, { height: 12}),
            Config(DisplayField, {
                    html: true,
                    value: SocialHub_properties.channel_drop_message_link,
                    ui: ConfigUtils.asString( null),
                    style: "font-size: 18px;line-height: 22px;text-align:center;"})
          ],
          layout: Config(VBoxLayout, { align: "middle"
          })
        }),
        Config(Panel, { itemId:  ChannelContainerBase.DROP_CONTENT_ITEM_ID, cls: "channel-drop-container",
          items:[
            Config(Container, { height: 100}),
            Config(IconDisplayField, { scale: "large",
                                 iconCls:  CoreIcons_properties.align_justified}),
            Config(Container, { height: 12}),
            Config(DisplayField, {
                    html: true,
                    value: SocialHub_properties.channel_drop_message_content,
                    ui: ConfigUtils.asString( null),
                    style: "font-size: 18px;line-height: 22px;text-align:center;"})
          ],
          layout: Config(VBoxLayout, { align: "middle"
          })
        }),
        Config(Panel, { itemId:  ChannelContainerBase.DROP_CONTENT_AND_LINK_ITEM_ID,
          items:[
            Config(Container, { flex: 1, itemId:  ChannelContainerBase.DROP_LINK_ITEM_ID, cls: "channel-drop-container",
              items:[
                Config(Container, { height: 100}),
                Config(IconDisplayField, { scale: "large",
                                     iconCls:  CoreIcons_properties.send_link_to_content_set}),
                Config(Container, { height: 12}),
                Config(DisplayField, {
                        html: true,
                        value: SocialHub_properties.channel_drop_message_link,
                        ui: ConfigUtils.asString( null),
                        style: "font-size: 18px;line-height: 22px;text-align:center;"})
              ],
              layout: Config(VBoxLayout, { align: "middle"
              })
            }),
            Config(Container, { itemId:  ChannelContainerBase.DROP_CONTENT_ITEM_ID, flex: 1, cls: "channel-drop-container",
              items:[
                Config(Container, { height: 100}),
                Config(IconDisplayField, { scale: "large",
                                     iconCls:  CoreIcons_properties.align_justified}),
                Config(Container, { height: 12}),
                Config(DisplayField, {
                        html: true,
                        value: SocialHub_properties.channel_drop_message_content,
                        ui: ConfigUtils.asString( null),
                        style: "font-size: 18px;line-height: 22px;text-align:center;"})
              ],
              layout: Config(VBoxLayout, { align: "middle"
              })
            })
          ],
          layout: Config(VBoxLayout, { align: "stretch"
          })
        }),
        Config(Panel, { itemId:  ChannelContainerBase.DROP_NOT_ALLOWED_ITEM_ID, cls: "channel-drop-container",
          items:[
            Config(Container, { height: 100}),
            Config(IconDisplayField, { scale: "large",
                                 iconCls:  CoreIcons_properties.forbidden}),
            Config(Container, { height: 12}),
            Config(DisplayField, {
                    html: true,
                    value: SocialHub_properties.channel_drop_not_allowed_message,
                    ui: ConfigUtils.asString( null),
                    style: "font-size: 18px;line-height: 22px;text-align:center;"})
          ],
          layout: Config(VBoxLayout, { align: "middle"
          })
        }),
        Config(Panel, { scrollable: true,
               itemId:  ChannelContainerBase.MESSAGE_WRAPPER_ITEM_ID,
               flex: 1,
               ui:  PanelSkin.GRID_200.getSkin(),
               listeners: {"afterlayout": bind(this,this.fixLayout)},
               style: "border-left: solid 1px #dcdbdb; top: -1px;",
          items:[
            Config(MessagesContainer, { adapter: config.adapter,
                                        itemId:  ChannelContainer.MESSAGE_SCHEDULED_ITEM_ID,
                                        width: "100%",
                                        maxWidth: 600,
                                        messageType:  SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES,
                                        title:  SocialHub_properties.channel_queue_title,
              plugins:[
                Config(BindVisibilityPlugin, {
                        bindTo: ValueExpressionFactory.createFromValue(config.adapter.isSchedulingSupported())})
              ]
            }),
            Config(Container, { height: 12,
              plugins:[
                Config(BindVisibilityPlugin, {
                        bindTo: ValueExpressionFactory.createFromValue(config.adapter.isSchedulingSupported())})
              ]
            }),
            Config(MessagesContainer, { adapter: config.adapter,
                                        width: "100%",
                                        maxWidth: 600,
                                        itemId:  ChannelContainer.MESSAGE_HISTORY_ITEM_ID,
                                        messageType:  SocialHubPropertyNames.ADAPTER_SENT_MESSAGES,
                                        title:  this.resolveHistoryTitle(config.adapter)})
          ],
          layout: Config(VBoxLayout, { align: "center"
          })
        })
      ],
      layout: Config(CardLayout, { deferredRender: false
      })
    })
  ],
  tbar: Config(Toolbar, { height: 44, style: "background-color:" + config.adapter.getColor(),
      items:[
        Config(Spacer, { width: 6}),
        Config(IconDisplayField, { ui:  IconDisplayFieldSkin.LIGHT.getSkin(),
                             scale: "medium",
                             iconCls:  SocialHub_properties[config.adapter.getType().toLowerCase()]}),
        /*this fixes a top padding problem in chrome*/
        Config(Container, {
          items:[
            Config(DisplayField, { ui:  IconDisplayFieldSkin.LIGHT.getSkin(), value: config.adapter.getDisplayName()})
          ],
          layout: Config(VBoxLayout, { align: "stretch", pack: "center"
          })
        }),
        Config(Spacer, { flex: 1}),
        Config(IconButton, { iconCls:  CoreIcons_properties.reload,
                       ariaLabel:  SocialHub_properties.channel_reload,
                       handler: bind(this,this.forceReload),
                       ui:  ButtonSkin.INVERTED_OUTLINE.getSkin()}),
        Config(IconButton, { iconCls:  CoreIcons_properties.add,
                       ariaLabel:  SocialHub_properties.create_message,
                       itemId:  ChannelContainer.COMPOSER_BUTTON_ITEM_ID,
                       handler: bind(this,this.composeMessage),
                       enableToggle: true,
                       ui:  ButtonSkin.INVERTED_OUTLINE.getSkin(),
          plugins:[
            Config(BindVisibilityPlugin, { bindTo: ValueExpressionFactory.createFromValue(!config.adapter.isReadOnly())})
          ]
        }),
        Config(MenuIconButton, { itemId:  ChannelContainer.COLOR_CHOOSER_BUTTON_ITEM_ID,
                           style: "border-top-right-radius: 3px;",
                           ariaLabel:  SocialHub_properties.change_color,
                           ui:  ButtonSkin.INVERTED_OUTLINE.getSkin(),
                           arrowVisible: false,
                           iconCls:  CoreIcons_properties.arrow_down,
          menu: Config(Menu, {
              items:[
                Config(ColorChooser, { adapter: config.adapter})
              ]
          })
        })
      ]
  }),
  layout: Config(HBoxLayout, { align: "stretch"
  })

}),config))());
  }}
export default ChannelContainer;
