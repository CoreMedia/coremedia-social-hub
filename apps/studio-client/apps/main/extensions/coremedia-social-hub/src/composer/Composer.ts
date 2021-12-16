import SpacingBEMEntities from "@coremedia/studio-client.ext.ui-components/bem/SpacingBEMEntities";
import BindComponentsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindComponentsPlugin";
import BindVisibilityPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindVisibilityPlugin";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import DateTimePropertyField from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/DateTimePropertyField";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import SocialHub_properties from "../SocialHub_properties";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import ComposerBase from "./ComposerBase";

interface ComposerConfig extends Config<ComposerBase> {
}

class Composer extends ComposerBase {
  declare Config: ComposerConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.composer";

  static readonly EDITOR_PANEL: string = "editorPanel";

  constructor(config: Config<Composer> = null) {
    super((()=> ConfigUtils.apply(Config(Composer, {
      header: false,
      closable: true,
      width: 460,
      resizable: false,
      minWidth: 460,

      items: [
        Config(Container, {
          style: "padding: 8px;background-color:" + config.adapter.getColor(),
          items: [
            Config(DisplayField, {
              value: this.getComposerTitle(config.adapter),
              ui: ConfigUtils.asString(null),
              style: "color:#fff;font-weight:bold;",
            }),
            Config(Container, { flex: 1 }),
            /*//TODO hover state not styled, so we leave it empty*/
            /*<ui:IconButton iconCls="{resourceManager.getString('com.coremedia.icons.CoreIcons', 'remove_small')}"*/
            /*scale="small"*/
            /*handler="{closeComposer}"/>*/
          ],
          layout: Config(HBoxLayout, {
            align: "stretch",
            pack: "center",
          }),
        }),
        Config(Container, {
          itemId: Composer.EDITOR_PANEL,
          ui: ContainerSkin.GRID_200.getSkin(),
          autoScroll: true,
          maxHeight: 550,
          scrollable: true,
          items: [
            Config(DateTimePropertyField, {
              bindTo: config.bindTo,
              labelSeparator: "",
              labelAlign: "top",
              fieldLabel: "",
              propertyName: SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE,
            }),
            /* Editors are added here */
          ],
          plugins: [
            Config(VerticalSpacingPlugin, { modifier: SpacingBEMEntities.VERTICAL_SPACING_MODIFIER_200 }),
          ],
          layout: Config(VBoxLayout, { align: "stretch" }),
        }),
        Config(Container, {
          style: "padding:8px;background-color:#c41313 !important;",
          items: [
            Config(DisplayField, {
              ui: ConfigUtils.asString(null),
              style: "color:#FFF;font-weight:bold;",
              value: SocialHub_properties.messsage_property_error,
            }),
          ],
          plugins: [
            Config(BindComponentsPlugin, {
              valueExpression: this.getErrorMessagesExpression(),
              configBeanParameterName: "value",
              clearBeforeUpdate: false,
              template: Config(DisplayField, {
                ui: ConfigUtils.asString(null),
                html: true,
                style: "color:#FFF;",
              }),
            }),
            Config(BindVisibilityPlugin, {
              bindTo: this.getErrorMessagesExpression(),
              transformer: (values: Array<any>): boolean => values.length !== 0,
            }),
          ],
          layout: Config(VBoxLayout, { align: "stretch" }),
        }),
      ],
      buttons: [
        Config(Button, {
          itemId: "postBtn",
          ui: ButtonSkin.FOOTER_PRIMARY.getSkin(),
          text: SocialHub_properties.post_button_text,
          handler: bind(this, this.finishComposing),
        }),
        Config(Button, {
          itemId: "cancelBtn",
          ui: ButtonSkin.FOOTER_SECONDARY.getSkin(),
          text: SocialHub_properties.cancel_button_text,
          handler: bind(this, this.closeComposer),
        }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),

    }), config))());
  }
}

export default Composer;
