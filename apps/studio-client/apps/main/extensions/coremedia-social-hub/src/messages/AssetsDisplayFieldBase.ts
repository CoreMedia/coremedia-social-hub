import Config from "@jangaroo/runtime/Config";
import MessageDisplayFieldBase from "./MessageDisplayFieldBase";
interface AssetsDisplayFieldBaseConfig extends Config<MessageDisplayFieldBase> {
}


class AssetsDisplayFieldBase extends MessageDisplayFieldBase {
  declare Config: AssetsDisplayFieldBaseConfig;

  constructor(config:Config<AssetsDisplayFieldBase> = null) {
    super(config);
  }

}
export default AssetsDisplayFieldBase;
