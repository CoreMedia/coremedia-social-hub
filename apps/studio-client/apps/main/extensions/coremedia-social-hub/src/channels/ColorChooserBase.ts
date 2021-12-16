import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import Container from "@jangaroo/ext-ts/container/Container";
import Config from "@jangaroo/runtime/Config";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import Colors from "./Colors";

interface ColorChooserBaseConfig extends Config<Container>, Partial<Pick<ColorChooserBase,
  "adapter"
>> {
}

class ColorChooserBase extends Container {
  declare Config: ColorChooserBaseConfig;

  adapter: SocialHubAdapter = null;

  #colorButtonsExpression: ValueExpression = null;

  constructor(config: Config<ColorChooserBase> = null) {
    super(config);
  }

  protected getColorButtonsExpression(): ValueExpression {
    if (!this.#colorButtonsExpression) {
      this.#colorButtonsExpression = ValueExpressionFactory.createFromValue(Colors.COLORS);
    }
    return this.#colorButtonsExpression;
  }
}

export default ColorChooserBase;
