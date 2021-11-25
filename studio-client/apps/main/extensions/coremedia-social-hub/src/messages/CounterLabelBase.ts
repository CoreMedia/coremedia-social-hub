import Config from "@jangaroo/runtime/Config";
import { asConfig } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import MessageImpl from "../beans/MessageImpl";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import Container from "@jangaroo/ext-ts/container/Container";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface CounterLabelBaseConfig extends Config<Container>, Partial<Pick<CounterLabelBase,
  "message" |
  "adapter" |
  "propertyName"
>> {
}



class CounterLabelBase extends Container {
  declare Config: CounterLabelBaseConfig;

  message:MessageImpl = null;

  adapter:SocialHubAdapter = null;

  propertyName:string = null;

  constructor(config:Config<CounterLabelBase> = null) {
    super(config);
  }

  protected getLabel(adapter:SocialHubAdapter, propertyName:string):string {
    return SocialHub_properties[propertyName + "_" + adapter.getType().toLowerCase() + "_text"];
  }

  protected getIcon(adapter:SocialHubAdapter, propertyName:string):string {
    return SocialHub_properties[propertyName + "_" + adapter.getType().toLowerCase() + "_icon"];
  }
}
export default CounterLabelBase;
