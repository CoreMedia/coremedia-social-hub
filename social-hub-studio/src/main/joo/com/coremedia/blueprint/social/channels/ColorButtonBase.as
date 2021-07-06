package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.ui.components.MenuIconButton;

import ext.button.Button;

import ext.container.Container;
import ext.menu.Menu;
import ext.panel.Panel;
import ext.toolbar.Toolbar;

public class ColorButtonBase extends Container {

  [ExtConfig]
  public var color:String;

  [ExtConfig]
  public var adapter:SocialHubAdapter;

  private var colorMenu:Menu;

  public function ColorButtonBase(config:ColorButtonBase = null) {
    super(config);
  }

  override protected function afterRender():void {
    super.afterRender();
    colorMenu = findParentByType(Menu) as Menu;
    colorMenu.on('hide', removeHoverColor);
    this.el.on('click', chooseColor);
  }

  private function removeHoverColor():void {
    applyButtonColor(adapter.getColor());
  }

  protected function chooseColor(e:*):void {
    var channelContainer:ChannelContainer = findParentByType(ChannelContainer.xtype) as ChannelContainer;
    channelContainer.refreshColors(this.color);
    applyButtonColor(adapter.getHoverColor());
  }

  private function applyButtonColor(buttonColor:String):void {
    var b:Button = findParentByType(MenuIconButton.xtype) as Button;
    var style:String = b.el.dom.getAttribute('style') as String;
    style = style.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi, buttonColor);
    b.el.dom.setAttribute("style", style);
  }
}
}
