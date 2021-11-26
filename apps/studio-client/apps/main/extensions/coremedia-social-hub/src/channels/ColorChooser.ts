import Config from "@jangaroo/runtime/Config";
import ColorButton from "./ColorButton";
import ColorChooserBase from "./ColorChooserBase";
import SpacingBEMEntities from "@coremedia/studio-client.ext.ui-components/bem/SpacingBEMEntities";
import BindComponentsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindComponentsPlugin";
import HorizontalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/HorizontalSpacingPlugin";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import Container from "@jangaroo/ext-ts/container/Container";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
interface ColorChooserConfig extends Config<ColorChooserBase> {
}


class ColorChooser extends ColorChooserBase{
  declare Config: ColorChooserConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.colorChooser";

  constructor(config:Config<ColorChooser> = null){
    super((()=> ConfigUtils.apply(Config(ColorChooser, {
                           ui:  ContainerSkin.GRID_200.getSkin(),

  items:[
    Config(Container, {
      items:[
        /* Color Boxes are added here */
      ],
      plugins:[
        Config(BindComponentsPlugin, {
                valueExpression: this.getColorButtonsExpression(),
                configBeanParameterName: "color",
                reuseComponents: true,
                clearBeforeUpdate: false,
          template: Config(ColorButton, { adapter: config.adapter
          })
        }),
        Config(HorizontalSpacingPlugin, { modifier: SpacingBEMEntities.HORIZONTAL_SPACING_BLOCK})
      ],
      layout: Config(HBoxLayout, { align: "stretch"
      })
    })
  ],
  layout: Config(VBoxLayout, { align: "stretch"
  })

}),config))());
  }}
export default ColorChooser;
