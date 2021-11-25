import Config from "@jangaroo/runtime/Config";
import ColorButtonBase from "./ColorButtonBase";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
interface ColorButtonConfig extends Config<ColorButtonBase> {
}


class ColorButton extends ColorButtonBase{
  declare Config: ColorButtonConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.colorButton";

  constructor(config:Config<ColorButton> = null){
    super( ConfigUtils.apply(Config(ColorButton, {
                          width: 20,
                          height: 20,
                          style: "background-color:" + config.color + ";cursor:pointer;",
                          ui:  ContainerSkin.FRAME.getSkin(),

  items:[
  ]

}),config));
  }}
export default ColorButton;
