import { asConfig } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";


class MessageProperty {
  static readonly TYPE_TEXT:string = "TEXT";
  static readonly TYPE_TEXTAREA:string = "TEXTAREA";
  static readonly TYPE_DATE:string = "DATE";
  static readonly TYPE_ASSETLIST:string = "ASSETLIST";
  static readonly TYPE_CHOICE:string = "CHOICE";

  #data:any = null;

  constructor(json:any) {
    this.#data = json;
  }

  getPropertyType():string {
    return this.#data.type;
  }

  /**
   * The name of the property.
   */
  getName():string {
    return this.#data.name;
  }

  getOptions():Array<any> {
    return this.#data.options;
  }

  getDefaultOption():string {
    return this.#data.defaultOption;
  }

  /**
   * The optional display name.
   * If this value is null, Studio will try to find a matching
   * resource value for the return value of getName()
   */
  getDisplayName():string {
    var displayName:string = this.#data.displayName;
    if(!displayName) {
      displayName = SocialHub_properties["message_property_" + this.getName().toLowerCase()];
      if(!displayName) {
        displayName = MessageProperty.#camelizeWithWhitespace(this.getName());
      }
    }
    return displayName;
  }

  getEmptyText():string {
    var emptyText = SocialHub_properties["message_property_" + this.getName().toLowerCase() + "_emptyText"];
    if(!emptyText) {
      emptyText = SocialHub_properties.message_property_emptyText;
    }
    return emptyText;
  }

  /**
   * The maximum length of the property:
   * e.g. the maximum amounts of assets or maxlength of a text.
   */
  getMaxLength():number {
    return this.#data.maxLength;
  }

  /**
   * True if the property must have a value.
   * @return
   */
  isRequired():boolean {
    return this.#data.required;
  }

  static #camelizeWithWhitespace(str:string):string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter:any, index:any):string => 
       letter.toUpperCase()
    ).replace(/\s+/g, " ");
  }
}
export default MessageProperty;
