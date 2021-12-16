import StatefulResizer from "@coremedia/studio-client.ext.ui-components/components/StatefulResizer";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import ResizablePlugin from "@coremedia/studio-client.ext.ui-components/plugins/ResizablePlugin";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import MessageRichtextAreaBase from "./MessageRichtextAreaBase";

interface MessageRichtextAreaConfig extends Config<MessageRichtextAreaBase> {
}

class MessageRichtextArea extends MessageRichtextAreaBase {
  declare Config: MessageRichtextAreaConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.messageRichtextArea";

  constructor(config: Config<MessageRichtextArea> = null) {
    super(ConfigUtils.apply(Config(MessageRichtextArea, {
      height: 80,

      plugins: [
        Config(BindPropertyPlugin, {
          bindTo: config.bindTo,
          bidirectional: true,
        }),
        Config(ResizablePlugin, {
          fitComponent: true,
          resizableConfig: Config(StatefulResizer, {
            minHeight: 30,
            handles: "s",
            pinned: true,
            dynamic: false,
            embed: false,
            horizontalResize: false,
          }),
        }),
      ],

    }), config));
  }
}

export default MessageRichtextArea;
