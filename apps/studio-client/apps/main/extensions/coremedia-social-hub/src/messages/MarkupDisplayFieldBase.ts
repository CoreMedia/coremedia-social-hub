import EventUtil from "@coremedia/studio-client.client-core/util/EventUtil";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import { as, bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import { AnyFunction } from "@jangaroo/runtime/types";
import MessageDisplayFieldBase from "./MessageDisplayFieldBase";

interface MarkupDisplayFieldBaseConfig extends Config<MessageDisplayFieldBase> {
}

class MarkupDisplayFieldBase extends MessageDisplayFieldBase {
  declare Config: MarkupDisplayFieldBaseConfig;

  constructor(config: Config<MarkupDisplayFieldBase> = null) {
    super(config);
  }

  //TODO remove script again on destroy
  #loadScript(path: string, callback: AnyFunction): void {
    let done = false;
    const scr: any = window.document.createElement("script");

    scr.onload = handleLoad;
    scr.onreadystatechange = handleReadyStateChange;
    scr.onerror = handleError;
    scr.src = path;
    window.document.getElementsByTagName("head")[0].appendChild(scr);

    function handleLoad() {
      if (!done) {
        done = true;
        callback(path, "ok");
      }
    }

    function handleReadyStateChange(): void {
      let state: any;
      if (!done) {
        state = scr.readyState;
        if (state === "complete") {
          handleLoad();
        }
      }
    }

    function handleError(): void {
      if (!done) {
        done = true;
        callback(path, "error");
      }
    }
  }

  protected override afterRender(): void {
    super.afterRender();

    const displayField = as(this.queryById("markup"), DisplayField);
    const el: any = displayField.el.dom;

    if (window["ResizeObserver"]) {
      new window["ResizeObserver"](bind(this, this.#outputsize))["observe"](el);
    } else {
      window.setTimeout(bind(this, this.#outputsize), 2000);
    }

    const that: Container = this;
    if (this.messageContainerDescriptor && this.messageContainerDescriptor.getScripts() && this.messageContainerDescriptor.getScripts().length > 0) {
      for (const script of this.messageContainerDescriptor.getScripts() as string[]) {
        let url = script;
        if (url.indexOf("?") === -1) {
          url = url + "?" + new Date().getTime();
        }
        this.#loadScript(url, bind(this, this.#refresh));
      }
    }
  }

  #refresh(): void {
    const displayField = as(this.queryById("markup"), DisplayField);
    displayField.setHeight(displayField.getHeight());
  }

  #outputsize(): void {
    //comparing with the existing height doesn't work, dunno, so we always set the height with delayed to avoid blocking
    EventUtil.invokeLater((): void => {
      const displayField = as(this.queryById("markup"), DisplayField);
      if (displayField) {
        const div: any = displayField.el.dom;
        const height: number = div.offsetHeight;
        displayField.setHeight(height);
      }

      if (this.messageContainerDescriptor && this.messageContainerDescriptor.getScriplets() && this.messageContainerDescriptor.getScriplets().length > 0) {
        for (const scriptlet of this.messageContainerDescriptor.getScriplets() as string[]) {
          window.eval(scriptlet);
        }
      }
    });
  }
}

export default MarkupDisplayFieldBase;
