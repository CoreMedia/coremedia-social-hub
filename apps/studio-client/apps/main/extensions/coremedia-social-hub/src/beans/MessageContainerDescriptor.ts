import SocialHubPropertyNames from "./SocialHubPropertyNames";

class MessageContainerDescriptor {
  #data: any = null;

  constructor(data: any) {
    this.#data = data;
  }

  getValue(): any {
    return this.#data.value;
  }

  getType(): string {
    return this.#data.type;
  }

  showLabel(): boolean {
    return this.#data.showLabel;
  }

  getScripts(): Array<any> {
    return this.#data[SocialHubPropertyNames.DESCRIPTOR_SCRIPTS] || [];
  }

  getScriplets(): Array<any> {
    return this.#data[SocialHubPropertyNames.DESCRIPTOR_SCRIPLETS] || [];
  }

  isExcluded(): boolean {
    return this.#data[SocialHubPropertyNames.DESCRIPTOR_EXCLUDED];
  }

  getPropertyName(): string {
    return this.#data[SocialHubPropertyNames.DESCRIPTOR_PROPERTY_NAME];
  }
}

export default MessageContainerDescriptor;
