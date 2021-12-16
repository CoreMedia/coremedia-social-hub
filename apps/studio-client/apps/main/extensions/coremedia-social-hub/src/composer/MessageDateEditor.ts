import PropertyPathExpression from "@coremedia/studio-client.client-core/data/PropertyPathExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import DateTimePropertyField from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/DateTimePropertyField";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { as } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import MessageDateEditorBase from "./MessageDateEditorBase";

interface MessageDateEditorConfig extends Config<MessageDateEditorBase> {
}

class MessageDateEditor extends MessageDateEditorBase {
  declare Config: MessageDateEditorConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.editor.date";

  constructor(config: Config<MessageDateEditor> = null) {
    super(ConfigUtils.apply(Config(MessageDateEditor, {

      items: [
        Config(DateTimePropertyField, {
          bindTo: ValueExpressionFactory.createFromValue(as(config.bindTo, PropertyPathExpression).getBean()),
          labelSeparator: "",
          labelAlign: "top",
          itemId: config.property.getName(),
          fieldLabel: config.property.getDisplayName(),
          propertyName: config.property.getName(),
        }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),
    }), config));
  }
}

export default MessageDateEditor;
