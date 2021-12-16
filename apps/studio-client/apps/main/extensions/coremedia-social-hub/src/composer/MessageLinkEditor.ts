import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import MessageLinkEditorBase from "./MessageLinkEditorBase";
import MessageLinkList from "./MessageLinkList";

interface MessageLinkEditorConfig extends Config<MessageLinkEditorBase> {
}

class MessageLinkEditor extends MessageLinkEditorBase {
  declare Config: MessageLinkEditorConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.editor.link";

  constructor(config: Config<MessageLinkEditor> = null) {
    super(ConfigUtils.apply(Config(MessageLinkEditor, {

      items: [
        Config(DisplayField, {
          ui: DisplayFieldSkin.BOLD.getSkin(),
          value: config.property.getDisplayName(),
        }),
        Config(MessageLinkList, {
          valueExpression: config.bindTo,
          linkType: "CMTeasable",
        }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),
    }), config));
  }
}

export default MessageLinkEditor;
