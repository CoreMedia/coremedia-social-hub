import Config from "@jangaroo/runtime/Config";
import { asConfig, bind } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";
import SocialHub_properties from "../SocialHub_properties";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import AnimatedNotification from "@coremedia/studio-client.ext.ui-components/components/AnimatedNotification";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import IconDisplayField from "@coremedia/studio-client.ext.ui-components/components/IconDisplayField";
import ValidationState from "@coremedia/studio-client.ext.ui-components/mixins/ValidationState";
import BindVisibilityPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindVisibilityPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import Component from "@jangaroo/ext-ts/Component";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface SocialNotificationToastConfig extends Config<AnimatedNotification>, Partial<Pick<SocialNotificationToast,
  "notificationMessage" |
  "notificationSource" |
  "notificationActionLabel" |
  "notificationAction" |
  "notificationTitle" |
  "notificationValidationState"
>> {
}



    class SocialNotificationToast extends AnimatedNotification{
  declare Config: SocialNotificationToastConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.socialNotificationToast";


  notificationMessage:string = null;

  notificationSource:string = null;

  notificationActionLabel:string = null;

  notificationAction:AnyFunction = null;

  notificationTitle:string = null;

  notificationValidationState:ValidationState = null;

  constructor(config:Config<SocialNotificationToast> = null){
    super((()=> ConfigUtils.apply(Config(SocialNotificationToast, {
                         position: "lt",
                         yOffset: 4,
                         xOffset: 37,
                         target: "actions-toolbar",
                         isMouseAware: true,
                         hideAnchor: true,
                         minHeight: 60,
                         closable: true,
                         header: false,
                         bodyStyle: "padding: 0px;",
                         style: "padding:0px;",
                         width: 400,

  items:[
    Config(Component, { width: 6, style: "background-color:" + SocialNotificationToast.#getStatusColor(config.notificationValidationState) + ";" }),
    Config(Container, { width: 32,
      items:[
        Config(IconDisplayField, { iconCls:  CoreIcons_properties[SocialNotificationToast.#getStatusIcon(config.notificationValidationState)],
                             style: "padding-top:12px;padding-left:12px;"})
      ],
      plugins:[
        Config(BindVisibilityPlugin, { bindTo: ValueExpressionFactory.createFromValue(config.notificationValidationState !== null) })
      ],
      layout: Config(VBoxLayout, { align: "stretch"
      })
    }),
    Config(Container, { ui:  ContainerSkin.GRID_200.getSkin(), flex: 1,
      items:[
        Config(Container, { flex: 1,
          items:[
            Config(Container, { height: 20,
              items:[
                Config(DisplayField, { ui:  DisplayFieldSkin.BOLD.getSkin(), value: config.notificationSource + ":"}),
                Config(Container, { width: 4}),
                Config(DisplayField, { value: config.notificationTitle})
              ],
              layout: Config(HBoxLayout, { align: "stretch"
              })
            }),
            Config(DisplayField, { html: true, style: "color:#646060 !important;padding-top:8px;", ui: ConfigUtils.asString( null),
                          flex: 1,
                          value: config.notificationMessage}),
            Config(Container, { style: "padding-top:12px;",
              items:[
                Config(Button, { itemId: "actionButton",
                        ui:  ButtonSkin.MATERIAL_SECONDARY.getSkin(),
                        ariaLabel:  config.notificationActionLabel,
                        text: ConfigUtils.asString( config.notificationActionLabel || SocialHub_properties.notification_default_action_label),
                        handler: bind(this,this.#callNotificationAction)
                })
              ],
              plugins:[
                Config(BindVisibilityPlugin, {
                        bindTo: ValueExpressionFactory.createFromValue(config.notificationAction)})
              ],
              layout: Config(HBoxLayout, { align: "stretch", pack: "end"
              })
            })
          ],
          layout: Config(VBoxLayout, { align: "stretch"
          })
        })
      ],
      layout: Config(HBoxLayout, { align: "stretch"
      })
    }),
    Config(Container, { width: 32,
      items:[
        Config(IconButton, {
                iconCls:  CoreIcons_properties.remove_small,
                handler: bind(this,this.destroy),
                ui:  ButtonSkin.DEFAULT.getSkin()})
      ],
      layout: Config(VBoxLayout, { align: "stretch"
      })
    })
  ],

  layout: Config(HBoxLayout, { align: "stretch"
  })

}),config))());
  }

  static #getStatusColor(state:ValidationState):string {
      if(state === ValidationState.ERROR) {
        return "#c41313";
      }
      if(state === ValidationState.WARNING) {
        return "#ed9b03";
      }
      if(state === ValidationState.SUCCESS) {
        return "#4d8735";
      }

      return "#8a8686";
    }

  static #getStatusIcon(state:ValidationState):string {
      if(state === ValidationState.ERROR) {
        return "error";
      }
      if(state === ValidationState.WARNING) {
        return "warning";
      }
      if(state === ValidationState.SUCCESS) {
        return "approve";
      }

      return null;
    }

  #callNotificationAction():void {
      this.destroy();
      this.notificationAction();
    }}
export default SocialNotificationToast;
