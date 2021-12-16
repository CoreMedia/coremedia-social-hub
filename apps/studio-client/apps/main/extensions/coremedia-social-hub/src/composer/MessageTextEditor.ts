import StatefulTextField from "@coremedia/studio-client.ext.ui-components/components/StatefulTextField";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import BlockEnterPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BlockEnterPlugin";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import MessageTextEditorBase from "./MessageTextEditorBase";

interface MessageTextEditorConfig extends Config<MessageTextEditorBase> {
}

class MessageTextEditor extends MessageTextEditorBase {
  declare Config: MessageTextEditorConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.editor.text";

  constructor(config: Config<MessageTextEditor> = null) {
    super(ConfigUtils.apply(Config(MessageTextEditor, {

      items: [
        Config(StatefulTextField, {
          fieldLabel: config.property.getDisplayName(),
          itemId: config.property.getName(),
          labelSeparator: "",
          labelAlign: "top",
          emptyText: config.property.getEmptyText(),
          plugins: [
            Config(BindPropertyPlugin, {
              bidirectional: true,
              bindTo: config.bindTo,
            }),
            Config(BlockEnterPlugin),
          ],
        }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),
    }), config));
  }
}

export default MessageTextEditor;
