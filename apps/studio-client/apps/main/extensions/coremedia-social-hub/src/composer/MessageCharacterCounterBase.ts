import RichTextPlainTextTransformer from "@coremedia/studio-client.cap-base-models/content/RichTextPlainTextTransformer";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import StringUtil from "@jangaroo/ext-ts/String";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import Config from "@jangaroo/runtime/Config";
import SocialHubAdapter from "../beans/SocialHubAdapter";

interface MessageCharacterCounterBaseConfig extends Config<Panel>, Partial<Pick<MessageCharacterCounterBase,
  "adapter" |
  "bindTo"
>> {
}

class MessageCharacterCounterBase extends Panel {
  declare Config: MessageCharacterCounterBaseConfig;

  adapter: SocialHubAdapter = null;

  bindTo: ValueExpression = null;

  #counterExpression: ValueExpression = null;

  constructor(config: Config<MessageCharacterCounterBase> = null) {
    super(config);
  }

  /**
   * Returns the ValueExpression that is used to calculate the message character count.
   */
  protected getMessageCounterExpression(bindTo: ValueExpression): ValueExpression {
    if (!this.#counterExpression) {
      this.#counterExpression = ValueExpressionFactory.createFromFunction((): string => {
        const rt: string = bindTo.getValue();
        if (rt === undefined) {
          return undefined;
        }

        let plain = RichTextPlainTextTransformer.convertToPlainText(rt);
        plain = StringUtil.trim(plain);
        return "" + plain.length;
      });
    }
    return this.#counterExpression;
  }
}

export default MessageCharacterCounterBase;
