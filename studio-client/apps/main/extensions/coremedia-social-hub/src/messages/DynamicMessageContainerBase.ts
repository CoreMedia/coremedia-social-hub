import Config from "@jangaroo/runtime/Config";
import { as } from "@jangaroo/runtime";
import Message from "../beans/Message";
import MessageContainerDescriptor from "../beans/MessageContainerDescriptor";
import MessageImpl from "../beans/MessageImpl";
import MessageProperty from "../beans/MessageProperty";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import Component from "@jangaroo/ext-ts/Component";
import ComponentManager from "@jangaroo/ext-ts/ComponentManager";
import Container from "@jangaroo/ext-ts/container/Container";
interface DynamicMessageContainerBaseConfig extends Config<Container>, Partial<Pick<DynamicMessageContainerBase,
  "message" |
  "adapter"
>> {
}



class DynamicMessageContainerBase extends Container {
  declare Config: DynamicMessageContainerBaseConfig;
  readonly #PROPERTY_EDITOR_XTYPE:string = "com.coremedia.blueprint.social.studio.config.message.field.";

  message:MessageImpl = null;

  adapter:SocialHubAdapter = null;

  constructor(config:Config<DynamicMessageContainerBase> = null) {
    super(config);
  }

  protected override afterRender():void {
    super.afterRender();

    var target =as( this.queryById("fieldWrapper"),  Container);

    var properties = this.adapter.getMessageProperties();
    //reverse for inserting
    var pros = properties.concat([]).reverse();
    for(var prop of pros as MessageProperty[]) {
      var baseConfig:Record<string,any> = {};
      var propertyName = prop.getName();
      var descriptor = this.#findCustomDescriptor(propertyName);

      if (!descriptor) {
        descriptor = this.#createDefaultDescriptor(prop);
      }

      if (descriptor.isExcluded()) {
        continue;
      }

      var value = descriptor.getValue();
      if (!value) {
        continue;
      }


      baseConfig.xtype = this.#PROPERTY_EDITOR_XTYPE + descriptor.getType().toLowerCase();
      baseConfig.bindTo = ValueExpressionFactory.createFromValue(descriptor.getValue());
      baseConfig.messageContainerDescriptor = descriptor;
      var cmp = ComponentManager.create(baseConfig);
      target.insert(0, cmp);
    }
  }

  #findCustomDescriptor(name:string):MessageContainerDescriptor {
    var descriptors = this.message.getMessageContainerDescriptors();
    for(var desc of descriptors as MessageContainerDescriptor[]) {
      if (desc.getPropertyName() === name) {
        return desc;
      }
    }
    return null;
  }

  #createDefaultDescriptor(prop:MessageProperty):MessageContainerDescriptor {
    var data:Record<string,any> = {
      propertyName: prop.getName(),
      type: prop.getPropertyType(),
      showLabel: true,
      value: ValueExpressionFactory.createFromValue(this.message).extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(prop.getName()).getValue(),
      excluded: false
    };

    return new MessageContainerDescriptor(data);
  }

  protected resolveSkin(adapter:SocialHubAdapter, msg:Message):string {
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT) {
      if(adapter.isNativeHistory()) {
        return ContainerSkin.DEFAULT.getSkin();
      }

      return ContainerSkin.DARK_200.getSkin();
    }

    return ContainerSkin.GRID_200.getSkin();
  }

  protected getStyle(adapter:SocialHubAdapter, msg:Message):string {
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT && adapter.isNativeHistory()) {
      return "margin-bottom: 24px;";
    }

    return "transition: box-shadow 0.25s;box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.6);border-radius: 2px;border-width: 0;border-style: solid;margin: 2px;background-color:#fff;margin-bottom: 24px;";
  }
}
export default DynamicMessageContainerBase;
