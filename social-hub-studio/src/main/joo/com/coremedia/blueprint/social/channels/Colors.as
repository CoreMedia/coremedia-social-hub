package com.coremedia.blueprint.social.channels {
public class Colors {
  public static const C1:String = "#0a4282;";
  public static const C1_HOVER:String = "#165aa8;";
  public static const C1_BACKGROUND:String = "#f3f5f9;";
  public static const C1_PRESSED:String = "#032a57;";

  public static const C2:String = "#4d8735;";
  public static const C2_HOVER:String = "#5ca03f;";
  public static const C2_BACKGROUND:String = "#f6f9f5;";
  public static const C2_PRESSED:String = "#3a6728;";

  public static const C3:String = "#a11010;";
  public static const C3_HOVER:String = "#c41313;";
  public static const C3_BACKGROUND:String = "#faf3f3;";
  public static const C3_PRESSED:String = "#850d0d;";

  public static const C4:String = "#a66c02;";
  public static const C4_HOVER:String = "#ed9b03;";
  public static const C4_BACKGROUND:String = "#fcf8f2;";
  public static const C4_PRESSED:String = "#a66c02;";

  public static const C5:String = "#646060;";
  public static const C5_HOVER:String = "#9f9c9c;";
  public static const C5_BACKGROUND:String = "#f7f7f7;";
  public static const C5_PRESSED:String = "#403e3e;";

  public static const C6:String = "#000000;";
  public static const C6_HOVER:String = "#757171;";
  public static const C6_BACKGROUND:String = "#f2f2f2;";
  public static const C6_PRESSED:String = "#524f4f;";


  public static var COLORS:Array = [C1, C2, C3, C4, C5, C6];
  private static var HOVER_COLORS:Array = [C1_HOVER, C2_HOVER, C3_HOVER, C4_HOVER, C5_HOVER, C6_HOVER];
  private static var PRESSED_COLORS:Array = [C1_PRESSED, C2_PRESSED, C3_PRESSED, C4_PRESSED, C5_PRESSED, C6_PRESSED];
  private static var BACKGROUND_COLORS:Array = [C1_BACKGROUND, C2_BACKGROUND, C3_BACKGROUND, C4_BACKGROUND, C5_BACKGROUND, C6_BACKGROUND];
  private static var index:Number = -1;

  public static function getColor():String {
    index++;
    if (index == COLORS.length - 1) {
      index = 0;
    }
    return COLORS[index];
  }

  public static function getHoverColor(color:String):String {
    var index:Number = COLORS.indexOf(color);
    return HOVER_COLORS[index];
  }

  public static function getBackgroundColor(color:String):String {
    var index:Number = COLORS.indexOf(color);
    return BACKGROUND_COLORS[index];
  }

  public static function getPressedColor(color:String):String {
    var index:Number = COLORS.indexOf(color);
    return PRESSED_COLORS[index];
  }
}
}
