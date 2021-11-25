import Config from "@jangaroo/runtime/Config";
import { AnyFunction } from "@jangaroo/runtime/types";
import Container from "@jangaroo/ext-ts/container/Container";
interface AddItemButtonBaseConfig extends Config<Container>, Partial<Pick<AddItemButtonBase,
  "uploadButtonHandler"
>> {
}



class AddItemButtonBase extends Container {
  declare Config: AddItemButtonBaseConfig;

  uploadButtonHandler:AnyFunction = null;

  constructor(config:Config<AddItemButtonBase> = null) {
    super(config);
  }
}
export default AddItemButtonBase;
