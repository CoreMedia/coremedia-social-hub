import Config from "@jangaroo/runtime/Config";
import { as, bind } from "@jangaroo/runtime";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import ChannelContainer from "./ChannelContainer";
import MenuIconButton from "@coremedia/studio-client.ext.ui-components/components/MenuIconButton";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import Menu from "@jangaroo/ext-ts/menu/Menu";
interface ColorButtonBaseConfig extends Config<Container>, Partial<Pick<ColorButtonBase,
  "color" |
  "adapter"
>> {
}



class ColorButtonBase extends Container {
  declare Config: ColorButtonBaseConfig;

  color:string = null;

  adapter:SocialHubAdapter = null;

  #colorMenu:Menu = null;

  constructor(config:Config<ColorButtonBase> = null) {
    super(config);
  }

  protected override afterRender():void {
    super.afterRender();
    this.#colorMenu =as( this.findParentByType(Menu),  Menu);
    this.#colorMenu.on("hide",bind( this,this.#removeHoverColor));
    this.el.on("click",bind( this,this.chooseColor));
  }

  #removeHoverColor():void {
    this.#applyButtonColor(this.adapter.getColor());
  }

  protected chooseColor(e:any):void {
    var channelContainer =as( this.findParentByType(ChannelContainer.xtype),  ChannelContainer);
    channelContainer.refreshColors(this.color);
    this.#applyButtonColor(this.adapter.getHoverColor());
  }

  #applyButtonColor(buttonColor:string):void {
    var b =as( this.findParentByType(MenuIconButton.xtype),  Button);
    var style =as( b.el.dom.getAttribute("style"),  String);
    style = style.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi, buttonColor);
    b.el.dom.setAttribute("style", style);
  }
}
export default ColorButtonBase;
