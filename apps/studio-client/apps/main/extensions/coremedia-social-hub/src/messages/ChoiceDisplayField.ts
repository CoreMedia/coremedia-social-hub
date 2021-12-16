import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import EncodingUtil from "@coremedia/studio-client.client-core/util/EncodingUtil";
import SpacingBEMEntities from "@coremedia/studio-client.ext.ui-components/bem/SpacingBEMEntities";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import BindVisibilityPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindVisibilityPlugin";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CustomStyles from "../CustomStyles";
import MessageDisplayFieldBase from "./MessageDisplayFieldBase";

interface ChoiceDisplayFieldConfig extends Config<MessageDisplayFieldBase> {
}

class ChoiceDisplayField extends MessageDisplayFieldBase {
  declare Config: ChoiceDisplayFieldConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.message.field.choice";

  constructor(config: Config<ChoiceDisplayField> = null) {
    super((()=> ConfigUtils.apply(Config(ChoiceDisplayField, {
      style: CustomStyles.MESSAGE_DISPLAY_FIELD,

      items: [
        Config(DisplayField, {
          value: this.localizeFieldName(config.messageContainerDescriptor.getPropertyName()),
          style: CustomStyles.READONLY_TITLE,
          ui: ConfigUtils.asString(null),
          plugins: [
            Config(BindVisibilityPlugin, { bindTo: ValueExpressionFactory.createFromValue(config.messageContainerDescriptor.showLabel()) }),
          ],
        }),
        Config(DisplayField, {
          style: CustomStyles.READONLY_TEXT,
          ui: ConfigUtils.asString(null),
          plugins: [
            Config(BindPropertyPlugin, {
              transformer: EncodingUtil.encodeForHTML,
              bindTo: config.bindTo,
            }),
          ],
        }),
      ],
      plugins: [
        Config(VerticalSpacingPlugin, { modifier: SpacingBEMEntities.VERTICAL_SPACING_MODIFIER_25 }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),

    }), config))());
  }
}

export default ChoiceDisplayField;
