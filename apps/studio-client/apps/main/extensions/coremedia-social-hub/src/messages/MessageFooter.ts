import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import BindVisibilityPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindVisibilityPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import Editor_properties from "@coremedia/studio-client.main.editor-components/Editor_properties";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import SocialHub_properties from "../SocialHub_properties";
import Message from "../beans/Message";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import CounterLabel from "./CounterLabel";
import MessageFooterBase from "./MessageFooterBase";

interface MessageFooterConfig extends Config<MessageFooterBase> {
}

class MessageFooter extends MessageFooterBase {
  declare Config: MessageFooterConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.messageFooter";

  constructor(config: Config<MessageFooter> = null) {
    super((()=> ConfigUtils.apply(Config(MessageFooter, {
      dock: "bottom",
      ui: ContainerSkin.DARK_200.getSkin(),
      style: this.getStyle(config.message),

      items: [
        Config(Container, {
          items: [
            Config(Container, {
              items: [
                Config(Container, {
                  items: [
                    Config(DisplayField, {
                      ui: ConfigUtils.asString(null),
                      style: this.getDateLabelStyle(config.message),
                      html: true,
                      value: "<b>" + this.getDateLabel(config.message) + "<\/b>",
                    }),
                    Config(DisplayField, {
                      ui: ConfigUtils.asString(null),
                      width: 280,
                      value: config.message.getErrorMessage(),
                      style: "color: #FFF !important;",
                      plugins: [
                        Config(BindVisibilityPlugin, { bindTo: ValueExpressionFactory.createFromValue(config.message.getErrorMessage()) }),
                      ],
                    }),
                    Config(DisplayField, {
                      plugins: [
                        Config(BindPropertyPlugin, {
                          transformer: bind(this, this.transformDate),
                          componentProperty: "value",
                          bindTo: ValueExpressionFactory.create(SocialHubPropertyNames.MESSAGE_PUBLICATION_DATE, config.message),
                        }),
                        Config(BindVisibilityPlugin, {
                          transformer: (state: string): boolean => state === SocialHubPropertyNames.STATE_SCHEDULED,
                          bindTo: ValueExpressionFactory.createFromValue(config.message).extendBy(SocialHubPropertyNames.MESSAGE_STATE),
                        }),
                      ],
                    }),
                    Config(DisplayField, {
                      plugins: [
                        Config(BindPropertyPlugin, {
                          transformer: bind(this, this.transformDate),
                          componentProperty: "value",
                          bindTo: ValueExpressionFactory.createFromValue(config.message).extendBy(SocialHubPropertyNames.MESSAGE_PUBLICATION_DATE),
                        }),
                        Config(BindVisibilityPlugin, {
                          transformer: (state: string): boolean => state === SocialHubPropertyNames.STATE_SENT,
                          bindTo: ValueExpressionFactory.createFromValue(config.message).extendBy(SocialHubPropertyNames.MESSAGE_STATE),
                        }),
                      ],
                    }),
                  ],
                  layout: Config(VBoxLayout, { align: "stretch" }),
                }),
                Config(Container, { flex: 1 }),
                Config(Button, {
                  itemId: "openInBrowserButton",
                  ui: ButtonSkin.SIMPLE.getSkin(),
                  ariaLabel: Editor_properties.PreviewPanelToolbar_openInBrowser_btn_tooltip,
                  iconCls: CoreIcons_properties.open_in_browser,
                  scale: "small",
                  handler: bind(this, this.openInTab),
                  plugins: [
                    Config(BindVisibilityPlugin, {
                      transformer: (msg: Message): boolean => msg.getUrl() !== null && msg.getUrl() !== undefined && msg.getUrl() !== "",
                      bindTo: ValueExpressionFactory.createFromValue(config.message),
                    }),
                  ],
                }),
              ],
              layout: Config(HBoxLayout, { align: "stretch" }),
            }),

            Config(Container, {
              items: [
                Config(CounterLabel, {
                  adapter: config.adapter,
                  message: config.message,
                  propertyName: SocialHubPropertyNames.MESSAGE_SHARE_COUNT,
                }),
                Config(CounterLabel, {
                  adapter: config.adapter,
                  message: config.message,
                  propertyName: SocialHubPropertyNames.MESSAGE_LIKE_COUNT,
                }),
                Config(CounterLabel, {
                  adapter: config.adapter,
                  message: config.message,
                  propertyName: SocialHubPropertyNames.MESSAGE_DISLIKE_COUNT,
                }),
                Config(CounterLabel, {
                  adapter: config.adapter,
                  message: config.message,
                  propertyName: SocialHubPropertyNames.MESSAGE_VIEW_COUNT,
                }),
                Config(CounterLabel, {
                  adapter: config.adapter,
                  message: config.message,
                  propertyName: SocialHubPropertyNames.MESSAGE_COMMENT_COUNT,
                }),
              ],
              layout: Config(HBoxLayout, { align: "stretch" }),
            }),
          ],
          layout: Config(VBoxLayout, { align: "stretch" }),
        }),
        Config(Container, { width: 12 }),

        Config(Container, { flex: 1 }),

        Config(Button, {
          itemId: "deleteButton",
          ui: ButtonSkin.MATERIAL_SECONDARY.getSkin(),
          ariaLabel: SocialHub_properties.delete_post_title,
          text: SocialHub_properties.delete_post_title,
          scale: "small",
          handler: bind(this, this.deleteMessage),
          plugins: [
            Config(BindVisibilityPlugin, {
              transformer: (state: string): boolean => state === SocialHubPropertyNames.STATE_SCHEDULED,
              bindTo: ValueExpressionFactory.createFromValue(config.message).extendBy(SocialHubPropertyNames.MESSAGE_STATE),
            }),
          ],
        }),
        Config(Button, {
          itemId: "deleteFromErrorButton",
          ui: ButtonSkin.MATERIAL_SECONDARY.getSkin(),
          style: "background-color: #FFF !important;",
          ariaLabel: SocialHub_properties.delete_error_post_title,
          text: SocialHub_properties.delete_error_post_title,
          scale: "small",
          handler: bind(this, this.deleteMessage),
          plugins: [
            Config(BindVisibilityPlugin, {
              transformer: (state: string): boolean => state === SocialHubPropertyNames.SEND_FAILED_PERMANENTLY,
              bindTo: ValueExpressionFactory.createFromValue(config.message).extendBy(SocialHubPropertyNames.MESSAGE_STATE),
            }),
          ],
        }),
        Config(Container, { width: 4 }),
        Config(Button, {
          itemId: "retryFromErrorButton",
          style: "background-color: #FFF !important;",
          ui: ButtonSkin.MATERIAL_SECONDARY.getSkin(),
          ariaLabel: SocialHub_properties.retry_error_post_title,
          text: SocialHub_properties.retry_error_post_title,
          scale: "small",
          handler: bind(this, this.retryMessage),
          plugins: [
            Config(BindVisibilityPlugin, {
              transformer: (state: string): boolean => state === SocialHubPropertyNames.SEND_FAILED_PERMANENTLY,
              bindTo: ValueExpressionFactory.createFromValue(config.message).extendBy(SocialHubPropertyNames.MESSAGE_STATE),
            }),
          ],
        }),
      ],
      plugins: [
        Config(BindVisibilityPlugin, {
          transformer: (msg: Message): boolean => this.message.getMessageState() === SocialHubPropertyNames.SEND_FAILED_PERMANENTLY || this.message.getPublicationDate() !== null,
          bindTo: ValueExpressionFactory.createFromValue(config.message),
        }),
      ],
      layout: Config(HBoxLayout, { align: "bottom" }),
    }), config))());
  }
}

export default MessageFooter;
