import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import MessageCharacterCounterBase from "./MessageCharacterCounterBase";

interface MessageCharacterCounterConfig extends Config<MessageCharacterCounterBase> {
}

class MessageCharacterCounter extends MessageCharacterCounterBase {
  declare Config: MessageCharacterCounterConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.messageCharacterCounter";

  constructor(config: Config<MessageCharacterCounter> = null) {
    super((()=> ConfigUtils.apply(Config(MessageCharacterCounter, {

      items: [
        Config(DisplayField, {
          plugins: [
            Config(BindPropertyPlugin, {
              componentProperty: "value",
              bindTo: this.getMessageCounterExpression(config.bindTo),
            }),
          ],
        }),
      ],
      layout: Config(HBoxLayout),

    }), config))());
  }
}

export default MessageCharacterCounter;
