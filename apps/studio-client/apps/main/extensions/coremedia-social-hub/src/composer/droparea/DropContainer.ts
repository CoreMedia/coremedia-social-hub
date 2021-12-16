import BindComponentsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindComponentsPlugin";
import BindVisibilityPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindVisibilityPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import BrowsePlugin from "@coremedia/studio-client.main.editor-components/sdk/components/html5/BrowsePlugin";
import FileDropPlugin from "@coremedia/studio-client.main.editor-components/sdk/upload/FileDropPlugin";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import ColumnLayout from "@jangaroo/ext-ts/layout/container/Column";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import SocialHub_properties from "../../SocialHub_properties";
import AddItemButton from "./AddItemButton";
import DropContainerBase from "./DropContainerBase";
import DropItemThumbnail from "./DropItemThumbnail";

interface DropContainerConfig extends Config<DropContainerBase> {
}

class DropContainer extends DropContainerBase {
  declare Config: DropContainerConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.editor.assetlist";

  constructor(config: Config<DropContainer> = null) {
    super((()=> ConfigUtils.apply(Config(DropContainer, {
      minHeight: 160,

      items: [
        Config(DisplayField, {
          value: config.property.getDisplayName(),
          ui: DisplayFieldSkin.BOLD.getSkin(),
        }),
        Config(Container, {
          ui: ContainerSkin.FRAME_GRID_200.getSkin(),
          items: [
            Config(Container, {
              flex: 1,
              items: [
                Config(Container, { height: 30 }),
                Config(Button, {
                  text: SocialHub_properties.upload_button_text,
                  handler: bind(this, this.uploadButtonHandler),
                  scale: "small",
                  ui: ButtonSkin.INLINE.getSkin(),
                  plugins: [
                    Config(BrowsePlugin, {
                      enableFileDrop: true,
                      multiple: true,
                      dropEl: this.el,
                    }),
                  ],
                }),
                Config(Container, { height: 10 }),
                Config(DisplayField, {
                  ui: DisplayFieldSkin.EMBEDDED.getSkin(),
                  value: SocialHub_properties.upload_area_text,
                }),
                Config(DisplayField, {
                  ui: DisplayFieldSkin.EMBEDDED.getSkin(),
                  value: SocialHub_properties.upload_area_text_hint,
                }),
              ],
              plugins: [
                Config(BindVisibilityPlugin, {
                  bindTo: this.getItemsExpression(config.bindTo),
                  transformer: (values: Array<any>): boolean => !values || values.length === 0,
                }),
              ],
              layout: Config(VBoxLayout, {
                align: "center",
                pack: "center",
              }),
            }),
            Config(Container, {
              flex: 1,
              items: [
                Config(Container, {
                  flex: 1,
                  items: [
                    /* Thumbnails will be put here*/
                    Config(AddItemButton, {
                      uploadButtonHandler: bind(this, this.uploadButtonHandler),
                      plugins: [
                        Config(BindVisibilityPlugin, { bindTo: this.getAddButtonVisibilityExpression(config.property, this.getItemsExpression(config.bindTo)) }),
                      ],
                    }),
                  ],
                  plugins: [
                    Config(BindComponentsPlugin, {
                      addFunction: DropContainerBase.addThumbnails,
                      valueExpression: this.getItemsExpression(config.bindTo),
                      configBeanParameterName: "dropItem",
                      reuseComponents: true,
                      getKey: DropContainerBase.getDropItemKey,
                      clearBeforeUpdate: false,
                      template: Config(DropItemThumbnail, {
                        width: 130,
                        height: 130,
                      }),
                    }),
                  ],
                  layout: Config(ColumnLayout),
                }),
              ],
              plugins: [
                Config(BindVisibilityPlugin, {
                  bindTo: this.getItemsExpression(config.bindTo),
                  transformer: (values: Array<any>): boolean => values && values.length > 0,
                }),
              ],
              layout: Config(HBoxLayout, { align: "begin" }),
            }),
          ],
          layout: Config(VBoxLayout, { align: "stretch" }),
        }),
      ],
      plugins: [
        Config(FileDropPlugin, {
          dropHandler: bind(this, this.handleFileDrop),
          customFileWrapperFactoryMethod: bind(this, this.createFileWrapper),
        }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),

    }), config))());
  }
}

export default DropContainer;
