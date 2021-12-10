import Config from "@jangaroo/runtime/Config";
import CounterLabelBase from "./CounterLabelBase";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import IconDisplayField from "@coremedia/studio-client.ext.ui-components/components/IconDisplayField";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import BindVisibilityPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindVisibilityPlugin";
import DisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/DisplayFieldSkin";
import IconDisplayFieldSkin from "@coremedia/studio-client.ext.ui-components/skins/IconDisplayFieldSkin";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
interface CounterLabelConfig extends Config<CounterLabelBase> {
}


class CounterLabel extends CounterLabelBase{
  declare Config: CounterLabelConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.counterLabel";

  constructor(config:Config<CounterLabel> = null){
    super((()=> ConfigUtils.apply(Config(CounterLabel, {
                           dock: "bottom",

  items:[
    Config(IconDisplayField, { ui:  IconDisplayFieldSkin.EMBEDDED.getSkin(),
                         iconCls:  this.getIcon(config.adapter, config.propertyName)}),
    Config(DisplayField, { ui:  DisplayFieldSkin.EMBEDDED.getSkin(),
      plugins:[
        Config(BindPropertyPlugin, {
                transformer: (count:number):string =>  count + " " + this.getLabel(config.adapter, config.propertyName),
                bindTo: ValueExpressionFactory.createFromValue(config.message).extendBy(config.propertyName)})
      ]
    }),
    Config(Container, { width: 12})
  ],
  layout: Config(HBoxLayout, { align: "stretch"
  }),
  plugins:[
    Config(BindVisibilityPlugin, {
            transformer: (count:number):boolean =>  count > 0,
            bindTo: ValueExpressionFactory.createFromValue(config.message).extendBy(config.propertyName)})
  ],
}),config))());
  }}
export default CounterLabel;
