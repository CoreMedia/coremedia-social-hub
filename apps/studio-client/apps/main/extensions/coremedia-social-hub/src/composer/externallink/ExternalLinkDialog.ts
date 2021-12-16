import StatefulTextField from "@coremedia/studio-client.ext.ui-components/components/StatefulTextField";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import BlockEnterPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BlockEnterPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import WindowSkin from "@coremedia/studio-client.ext.ui-components/skins/WindowSkin";
import Editor_properties from "@coremedia/studio-client.main.editor-components/Editor_properties";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import FieldContainer from "@jangaroo/ext-ts/form/FieldContainer";
import Checkbox from "@jangaroo/ext-ts/form/field/Checkbox";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import Fill from "@jangaroo/ext-ts/toolbar/Fill";
import Toolbar from "@jangaroo/ext-ts/toolbar/Toolbar";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import SocialHub_properties from "../../SocialHub_properties";
import ExternalLinkDialogBase from "./ExternalLinkDialogBase";

interface ExternalLinkDialogConfig extends Config<ExternalLinkDialogBase> {
}

class ExternalLinkDialog extends ExternalLinkDialogBase {
  declare Config: ExternalLinkDialogConfig;

  constructor(config: Config<ExternalLinkDialog> = null) {
    super((()=> ConfigUtils.apply(Config(ExternalLinkDialog, {
      title: SocialHub_properties.external_link_dialog_title,
      width: 400,
      height: 160,
      modal: true,
      constrainHeader: true,
      ui: WindowSkin.GRID_200.getSkin(),

      items: [
        Config(FieldContainer, {
          fieldLabel: SocialHub_properties.external_link_dialog_url_text,
          items: [
            Config(StatefulTextField, {
              name: "link",
              flex: 1,
              plugins: [
                Config(BlockEnterPlugin),
                Config(BindPropertyPlugin, {
                  bindTo: this.getUrlValueExpression(),
                  ifUndefined: "",
                  bidirectional: true,
                }),
              ],
            }),
          ],
          layout: Config(HBoxLayout, { align: "stretch" }),
        }),
        Config(Container, { height: 6 }),
        Config(FieldContainer, {
          fieldLabel: SocialHub_properties.external_link_dialog_shorten_text,
          items: [
            Config(Checkbox, {
              plugins: [
                Config(BindPropertyPlugin, {
                  bidirectional: true,
                  ifUndefined: "false",
                  bindTo: this.getShortenLinkCheckboxExpression(),
                }),
              ],
            }),
          ],
          layout: Config(HBoxLayout, { align: "stretch" }),
        }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),
      fbar: Config(Toolbar, {
        items: [
          Config(Fill),
          Config(Button, {
            ui: ButtonSkin.FOOTER_PRIMARY.getSkin(),
            scale: "small",
            text: Editor_properties.dialog_defaultSubmitButton_text,
            handler: bind(this, this.okPressed),
            plugins: [
              Config(BindPropertyPlugin, {
                componentProperty: "disabled",
                bindTo: this.getSubmitButtonDisabledExpression(),
              }),
            ],
          }),
          Config(Button, {
            ui: ButtonSkin.FOOTER_SECONDARY.getSkin(),
            scale: "small",
            text: Editor_properties.dialog_defaultCancelButton_text,
            handler: bind(this, this.close),
          }),
        ],
      }),

    }), config))());
  }
}

export default ExternalLinkDialog;
