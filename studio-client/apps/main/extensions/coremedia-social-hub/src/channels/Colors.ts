import Struct from "@coremedia/studio-client.cap-rest-client/struct/Struct";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import StudioConfigurationUtil from "@coremedia/studio-client.ext.cap-base-components/util/config/StudioConfigurationUtil";


class Colors {

  static #colorOptions:ValueExpression = null;

  static readonly C1:string = "#0a4282;";
  static readonly C1_HOVER:string = "#165aa8;";
  static readonly C1_BACKGROUND:string = "#f3f5f9;";
  static readonly C1_PRESSED:string = "#032a57;";

  static readonly C2:string = "#4d8735;";
  static readonly C2_HOVER:string = "#5ca03f;";
  static readonly C2_BACKGROUND:string = "#f6f9f5;";
  static readonly C2_PRESSED:string = "#3a6728;";

  static readonly C3:string = "#a11010;";
  static readonly C3_HOVER:string = "#c41313;";
  static readonly C3_BACKGROUND:string = "#faf3f3;";
  static readonly C3_PRESSED:string = "#850d0d;";

  static readonly C4:string = "#a66c02;";
  static readonly C4_HOVER:string = "#ed9b03;";
  static readonly C4_BACKGROUND:string = "#fcf8f2;";
  static readonly C4_PRESSED:string = "#a66c02;";

  static readonly C5:string = "#646060;";
  static readonly C5_HOVER:string = "#9f9c9c;";
  static readonly C5_BACKGROUND:string = "#f7f7f7;";
  static readonly C5_PRESSED:string = "#403e3e;";

  static readonly C6:string = "#000000;";
  static readonly C6_HOVER:string = "#757171;";
  static readonly C6_BACKGROUND:string = "#f2f2f2;";
  static readonly C6_PRESSED:string = "#524f4f;";

  static readonly SOCIAL_HUB_SETTINGS:string = "Social Hub/Settings";
  static readonly COLORS_SETTINGS:string = "colors";
  static readonly BASE:string = "base";
  static readonly HOVER:string = "hover";
  static readonly PRESSED:string = "pressed";
  static readonly BACKGROUND:string = "background";

  static COLORS:Array<any> = [Colors.C1, Colors.C2, Colors.C3, Colors.C4, Colors.C5, Colors.C6];
  static #HOVER_COLORS:Array<any> = [Colors.C1_HOVER, Colors.C2_HOVER, Colors.C3_HOVER, Colors.C4_HOVER, Colors.C5_HOVER, Colors.C6_HOVER];
  static #PRESSED_COLORS:Array<any> = [Colors.C1_PRESSED, Colors.C2_PRESSED, Colors.C3_PRESSED, Colors.C4_PRESSED, Colors.C5_PRESSED, Colors.C6_PRESSED];
  static #BACKGROUND_COLORS:Array<any> = [Colors.C1_BACKGROUND, Colors.C2_BACKGROUND, Colors.C3_BACKGROUND, Colors.C4_BACKGROUND, Colors.C5_BACKGROUND, Colors.C6_BACKGROUND];
  static #index:number = -1;

  /**
   * Initialize Social Hub colors by loading the colors defined in Social Hub/Settings.
   * Loaded colors will be added to the default colors defined above.
   */
  static init():void {
    Colors.getColorOptions().loadValue((colorOptions:Array<any>):void => 
      colorOptions.forEach((colorOption:Struct):void => {
        if (colorOption.get(Colors.BASE)
                && colorOption.get(Colors.HOVER)
                && colorOption.get(Colors.PRESSED)
                && colorOption.get(Colors.BACKGROUND)) {
          Colors.COLORS.push(colorOption.get(Colors.BASE));
          Colors.#HOVER_COLORS.push(colorOption.get(Colors.HOVER));
          Colors.#PRESSED_COLORS.push(colorOption.get(Colors.PRESSED));
          Colors.#BACKGROUND_COLORS.push(colorOption.get(Colors.BACKGROUND));
        }
      })
    );
  }

  static getColor():string {
    Colors.#index++;
    if (Colors.#index == Colors.COLORS.length - 1) {
      Colors.#index = 0;
    }
    return Colors.COLORS[Colors.#index];
  }

  static getHoverColor(color:string):string {
    var index:number = Colors.COLORS.indexOf(color);
    return Colors.#HOVER_COLORS[index];
  }

  static getBackgroundColor(color:string):string {
    var index:number = Colors.COLORS.indexOf(color);
    return Colors.#BACKGROUND_COLORS[index];
  }

  static getPressedColor(color:string):string {
    var index:number = Colors.COLORS.indexOf(color);
    return Colors.#PRESSED_COLORS[index];
  }

  /**
   * Returns a value expression that holds all configured color options.
   *
   * @return
   */
  static getColorOptions():ValueExpression {
    if (!Colors.#colorOptions) {
      Colors.#colorOptions = ValueExpressionFactory.createFromFunction(
              StudioConfigurationUtil.getConfiguration,
              Colors.SOCIAL_HUB_SETTINGS,
              Colors.COLORS_SETTINGS);
    }
    return Colors.#colorOptions;
  }

}
export default Colors;
