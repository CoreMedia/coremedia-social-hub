import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import CKEditor_properties from "@coremedia/studio-client.main.ckeditor4-components/CKEditor_properties";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import MessageCharacterCounter from "./MessageCharacterCounter";
import MessageTextareaEditorBase from "./MessageTextareaEditorBase";
import MessageRichtextArea from "./richtext/MessageRichtextArea";

interface MessageTextareaEditorConfig extends Config<MessageTextareaEditorBase> {
}

class MessageTextareaEditor extends MessageTextareaEditorBase {
  declare Config: MessageTextareaEditorConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.editor.markup";

  static readonly EXTERNAL_LINK_BUTTON_ITEM_ID: string = "externalLink";

  static readonly INTERNAL_LINK_BUTTON_ITEM_ID: string = "internalLink";

  constructor(config: Config<MessageTextareaEditor> = null) {
    super((()=> ConfigUtils.apply(Config(MessageTextareaEditor, {

      items: [
        Config(DisplayField, {
          value: config.property.getDisplayName(),
          ui: DisplayFieldSkin.BOLD.getSkin(),
        }),
        Config(Container, {
          items: [
            Config(IconButton, {
              itemId: MessageTextareaEditor.EXTERNAL_LINK_BUTTON_ITEM_ID,
              handler: bind(this, this.openExternalLinkDialog),
              tooltip: CKEditor_properties.cmlink_tooltip,
              iconCls: CoreIcons_properties.add_external_link,
            }),
            Config(IconButton, {
              itemId: MessageTextareaEditor.INTERNAL_LINK_BUTTON_ITEM_ID,
              handler: bind(this, this.openInternalLinkDialog),
              tooltip: CKEditor_properties.cminternallink_tooltip,
              iconCls: CoreIcons_properties.add_internal_link,
            }),
            Config(Container, { flex: 1 }),
            Config(MessageCharacterCounter, {
              bindTo: config.bindTo,
              adapter: config.adapter,
            }),
          ],
          layout: Config(HBoxLayout, { align: "stretch" }),
        }),
        Config(MessageRichtextArea, {
          itemId: "richtextEditor",
          bindTo: config.bindTo,
        }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),

    }), config))());
  }
}

export default MessageTextareaEditor;
