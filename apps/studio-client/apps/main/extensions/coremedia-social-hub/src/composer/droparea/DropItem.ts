import { AnyFunction } from "@jangaroo/runtime/types";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";


class DropItem {
  #content:Content = null;
  #name:string = null;
  #id:string = null;

  constructor() {
  }

  static create(content:Content, callback:AnyFunction = null):DropItem {
    var dropItem = new DropItem();
    dropItem.#content = content;
    dropItem.#id = content.getUriPath();
    content.load(():void => {
      dropItem.setName(content.getName());
      if(callback) {
        callback(dropItem);
      }
    });
    return dropItem;
  }

  isLoaded():boolean {
    if (this.#content) {
      var loaded = this.#content.isLoaded();
      if(!loaded) {
        this.#content.load();
      }
      return loaded;
    }
    return true;
  }

  getContent():Content {
    return this.#content;
  }

  setName(name:string):void {
    this.#name = name;
  }

  getName():string {
    return this.#name;
  }

  getId():string {
    return this.#id;
  }
}
export default DropItem;
