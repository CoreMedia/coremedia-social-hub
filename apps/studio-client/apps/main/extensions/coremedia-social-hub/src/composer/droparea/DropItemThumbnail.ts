import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import CenterLayout from "@jangaroo/ext-ts/layout/container/Center";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import SocialHub_properties from "../../SocialHub_properties";
import DropItemThumbnailBase from "./DropItemThumbnailBase";

interface DropItemThumbnailConfig extends Config<DropItemThumbnailBase> {
}

class DropItemThumbnail extends DropItemThumbnailBase {
  declare Config: DropItemThumbnailConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.dropItemContainer";

  static readonly PREVIEW_ITEM_ID: string = "preview";

  constructor(config: Config<DropItemThumbnail> = null) {
    super((()=> ConfigUtils.apply(Config(DropItemThumbnail, {
      width: DropItemThumbnailBase.PREVIEW_WIDTH,
      ui: ContainerSkin.GRID_100.getSkin(),

      items: [
        Config(Container, {
          ui: ContainerSkin.FRAME.getSkin(),
          itemId: DropItemThumbnail.PREVIEW_ITEM_ID,
          style: "background-color:#f1f1f1;",
          width: DropItemThumbnailBase.PREVIEW_WIDTH,
          height: DropItemThumbnailBase.PREVIEW_HEIGHT,
          items: [
          ],
          layout: Config(CenterLayout),
        }),
        Config(Container, {
          items: [
            Config(DisplayField, { value: DropItemThumbnailBase.formatName(config.dropItem.getName()) }),
            Config(Container, { flex: 1 }),
            Config(IconButton, {
              itemId: "remove",
              hidden: true,
              text: SocialHub_properties.delete_attachment_text,
              tooltip: SocialHub_properties.delete_attachment_text,
              iconCls: CoreIcons_properties.trash_bin,
              handler: bind(this, this.removeThumbnail),
            }),
          ],
          layout: Config(HBoxLayout, { align: "stretch" }),
        }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),

    }), config))());
  }
}

export default DropItemThumbnail;
