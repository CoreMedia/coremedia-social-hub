Ext.define("com.coremedia.blueprint.social.channels.ColorButton", function(ColorButton) {/*package com.coremedia.blueprint.social.channels{
import com.coremedia.blueprint.social.channels.*;
import net.jangaroo.ext.Exml;
public class ColorButton extends ColorButtonBase{

    import com.coremedia.ui.skins.ContainerSkin;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.colorButton";

    public*/function ColorButton$(config/*:ColorButton = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.channels.ColorButtonBase*/ =AS3.cast(com.coremedia.blueprint.social.channels.ColorButtonBase,{});
    var defaults_$1/*:ColorButton*/ =AS3.cast(ColorButton,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"width" , 20);
    AS3.setBindable(config_$1,"height" , 20);
    AS3.setBindable(config_$1,"style" , 'background-color:' + AS3.getBindable(config,"color") + ';cursor:pointer;');
    config_$1.ui =net.jangaroo.ext.Exml.asString( com.coremedia.ui.skins.ContainerSkin.FRAME.getSkin());
    config_$1.items = [];
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$HcH7(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.channels.ColorButtonBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.colorButton",
      constructor: ColorButton$,
      super$HcH7: function() {
        com.coremedia.blueprint.social.channels.ColorButtonBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "com.coremedia.blueprint.social.channels.ColorButtonBase",
        "com.coremedia.ui.skins.ContainerSkin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
