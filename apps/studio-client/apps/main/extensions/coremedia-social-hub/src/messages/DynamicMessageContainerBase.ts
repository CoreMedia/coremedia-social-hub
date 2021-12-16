import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import ComponentManager from "@jangaroo/ext-ts/ComponentManager";
import Container from "@jangaroo/ext-ts/container/Container";
import { as } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import Message from "../beans/Message";
import MessageContainerDescriptor from "../beans/MessageContainerDescriptor";
import MessageImpl from "../beans/MessageImpl";
import MessageProperty from "../beans/MessageProperty";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";

interface DynamicMessageContainerBaseConfig extends Config<Container>, Partial<Pick<DynamicMessageContainerBase,
  "message" |
  "adapter"
>> {
}

class DynamicMessageContainerBase extends Container {
  declare Config: DynamicMessageContainerBaseConfig;

  readonly #PROPERTY_EDITOR_XTYPE: string = "com.coremedia.blueprint.social.studio.config.message.field.";

  message: MessageImpl = null;

  adapter: SocialHubAdapter = null;

  constructor(config: Config<DynamicMessageContainerBase> = null) {
    super(config);
  }

  protected override afterRender(): void {
    super.afterRender();

    const target = as(this.queryById("fieldWrapper"), Container);

    const properties = this.adapter.getMessageProperties();
    //reverse for inserting
    const pros = properties.concat([]).reverse();
    for (const prop of pros as MessageProperty[]) {
      const baseConfig: Record<string, any> = {};
      const propertyName = prop.getName();
      let descriptor = this.#findCustomDescriptor(propertyName);

      if (!descriptor) {
        descriptor = this.#createDefaultDescriptor(prop);
      }

      if (descriptor.isExcluded()) {
        continue;
      }

      const value = descriptor.getValue();
      if (!value) {
        continue;
      }

      baseConfig.xtype = this.#PROPERTY_EDITOR_XTYPE + descriptor.getType().toLowerCase();
      baseConfig.bindTo = ValueExpressionFactory.createFromValue(descriptor.getValue());
      baseConfig.messageContainerDescriptor = descriptor;
      const cmp = ComponentManager.create(baseConfig);
      target.insert(0, cmp);
    }
  }

  #findCustomDescriptor(name: string): MessageContainerDescriptor {
    const descriptors = this.message.getMessageContainerDescriptors();
    for (const desc of descriptors as MessageContainerDescriptor[]) {
      if (desc.getPropertyName() === name) {
        return desc;
      }
    }
    return null;
  }

  #createDefaultDescriptor(prop: MessageProperty): MessageContainerDescriptor {
    const data: Record<string, any> = {
      propertyName: prop.getName(),
      type: prop.getPropertyType(),
      showLabel: true,
      value: ValueExpressionFactory.createFromValue(this.message).extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(prop.getName()).getValue(),
      excluded: false,
    };

    return new MessageContainerDescriptor(data);
  }

  protected resolveSkin(adapter: SocialHubAdapter, msg: Message): string {
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT) {
      if (adapter.isNativeHistory()) {
        return ContainerSkin.DEFAULT.getSkin();
      }

      return ContainerSkin.DARK_200.getSkin();
    }

    return ContainerSkin.GRID_200.getSkin();
  }

  protected getStyle(adapter: SocialHubAdapter, msg: Message): string {
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT && adapter.isNativeHistory()) {
      return "margin-bottom: 24px;";
    }

    return "transition: box-shadow 0.25s;box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.6);border-radius: 2px;border-width: 0;border-style: solid;margin: 2px;background-color:#fff;margin-bottom: 24px;";
  }
}

export default DynamicMessageContainerBase;
