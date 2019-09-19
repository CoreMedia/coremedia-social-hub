Ext.define("com.coremedia.blueprint.social.channels.Colors", function(Colors) {/*package com.coremedia.blueprint.social.channels {
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


  public static var COLORS:Array =*/function COLORS$static_(){Colors.COLORS=( [Colors.C1, Colors.C2, Colors.C3, Colors.C4, Colors.C5, Colors.C6]);}/*;
  private static*/ var HOVER_COLORS$static/*:Array*/;/* =*/function HOVER_COLORS$static_(){HOVER_COLORS$static=( [Colors.C1_HOVER, Colors.C2_HOVER, Colors.C3_HOVER, Colors.C4_HOVER, Colors.C5_HOVER, Colors.C6_HOVER]);};/*
  private static*/ var PRESSED_COLORS$static/*:Array*/;/* =*/function PRESSED_COLORS$static_(){PRESSED_COLORS$static=( [Colors.C1_PRESSED, Colors.C2_PRESSED, Colors.C3_PRESSED, Colors.C4_PRESSED, Colors.C5_PRESSED, Colors.C6_PRESSED]);};/*
  private static*/ var BACKGROUND_COLORS$static/*:Array*/;/* =*/function BACKGROUND_COLORS$static_(){BACKGROUND_COLORS$static=( [Colors.C1_BACKGROUND, Colors.C2_BACKGROUND, Colors.C3_BACKGROUND, Colors.C4_BACKGROUND, Colors.C5_BACKGROUND, Colors.C6_BACKGROUND]);};/*
  private static*/ var index$static/*:Number*/ = -1;/*

  public static*/ function getColor$static()/*:String*/ {
    index$static++;
    if (index$static == Colors.COLORS.length - 1) {
      index$static = 0;
    }
    return Colors.COLORS[index$static];
  }/*

  public static*/ function getHoverColor$static(color/*:String*/)/*:String*/ {
    var index/*:Number*/ = Colors.COLORS.indexOf(color);
    return HOVER_COLORS$static[index];
  }/*

  public static*/ function getBackgroundColor$static(color/*:String*/)/*:String*/ {
    var index/*:Number*/ = Colors.COLORS.indexOf(color);
    return BACKGROUND_COLORS$static[index];
  }/*

  public static*/ function getPressedColor$static(color/*:String*/)/*:String*/ {
    var index/*:Number*/ = Colors.COLORS.indexOf(color);
    return PRESSED_COLORS$static[index];
  }/*
}*/function Colors$() {}/*
}

============================================== Jangaroo part ==============================================*/
    return {
      constructor: Colors$,
      statics: {
        C1: "#0a4282;",
        C1_HOVER: "#165aa8;",
        C1_BACKGROUND: "#f3f5f9;",
        C1_PRESSED: "#032a57;",
        C2: "#4d8735;",
        C2_HOVER: "#5ca03f;",
        C2_BACKGROUND: "#f6f9f5;",
        C2_PRESSED: "#3a6728;",
        C3: "#a11010;",
        C3_HOVER: "#c41313;",
        C3_BACKGROUND: "#faf3f3;",
        C3_PRESSED: "#850d0d;",
        C4: "#a66c02;",
        C4_HOVER: "#ed9b03;",
        C4_BACKGROUND: "#fcf8f2;",
        C4_PRESSED: "#a66c02;",
        C5: "#646060;",
        C5_HOVER: "#9f9c9c;",
        C5_BACKGROUND: "#f7f7f7;",
        C5_PRESSED: "#403e3e;",
        C6: "#000000;",
        C6_HOVER: "#757171;",
        C6_BACKGROUND: "#f2f2f2;",
        C6_PRESSED: "#524f4f;",
        COLORS: undefined,
        HOVER_COLORS: undefined,
        PRESSED_COLORS: undefined,
        BACKGROUND_COLORS: undefined,
        getColor: getColor$static,
        getHoverColor: getHoverColor$static,
        getBackgroundColor: getBackgroundColor$static,
        getPressedColor: getPressedColor$static,
        __initStatics__: function() {
          COLORS$static_();
          HOVER_COLORS$static_();
          PRESSED_COLORS$static_();
          BACKGROUND_COLORS$static_();
        }
      }
    };
});
