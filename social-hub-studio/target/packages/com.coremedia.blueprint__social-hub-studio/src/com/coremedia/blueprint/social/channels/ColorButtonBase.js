Ext.define("com.coremedia.blueprint.social.channels.ColorButtonBase", function(ColorButtonBase) {/*package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.ui.components.MenuIconButton;

import ext.button.Button;

import ext.container.Container;
import ext.menu.Menu;
import ext.panel.Panel;
import ext.toolbar.Toolbar;

public class ColorButtonBase extends Container {

  [Bindable]
  public var color:String;

  [Bindable]
  public var adapter:SocialHubAdapter;

  private var colorMenu:Menu;

  public*/ function ColorButtonBase$(config/*:ColorButtonBase = null*/) {if(arguments.length<=0)config=null;
    this.super$V6Eu(config);
  }/*

  override protected*/ function afterRender()/*:void*/ {
    Ext.container.Container.prototype.afterRender.call(this);
    this.colorMenu$V6Eu =AS3.as( this.findParentByType(Ext.menu.Menu),  Ext.menu.Menu);
    this.colorMenu$V6Eu.on('hide',AS3.bind( this,"removeHoverColor$V6Eu"));
    this.el.on('click',AS3.bind( this,"chooseColor"));
  }/*

  private*/ function removeHoverColor()/*:void*/ {
    this.applyButtonColor$V6Eu(AS3.getBindable(this,"adapter").getColor());
  }/*

  protected*/ function chooseColor(e/*:**/)/*:void*/ {
    var channelContainer/*:ChannelContainer*/ =AS3.as( this.findParentByType(com.coremedia.blueprint.social.channels.ChannelContainer.xtype),  com.coremedia.blueprint.social.channels.ChannelContainer);
    channelContainer.refreshColors(AS3.getBindable(this,"color"));
    this.applyButtonColor$V6Eu(AS3.getBindable(this,"adapter").getHoverColor());
  }/*

  private*/ function applyButtonColor(buttonColor/*:String*/)/*:void*/ {
    var b/*:Button*/ =AS3.as( this.findParentByType(com.coremedia.ui.components.MenuIconButton.xtype),  Ext.button.Button);
    var style/*:String*/ =AS3.as( b.el.dom.getAttribute('style'),  String);
    style = style.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi, buttonColor);
    b.el.dom.setAttribute("style", style);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      colorMenu$V6Eu: null,
      constructor: ColorButtonBase$,
      super$V6Eu: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      removeHoverColor$V6Eu: removeHoverColor,
      chooseColor: chooseColor,
      applyButtonColor$V6Eu: applyButtonColor,
      config: {
        color: null,
        adapter: null
      },
      requires: [
        "Ext.button.Button",
        "Ext.container.Container",
        "Ext.menu.Menu",
        "com.coremedia.ui.components.MenuIconButton"
      ],
      uses: ["com.coremedia.blueprint.social.channels.ChannelContainer"]
    };
});
