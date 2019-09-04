package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.Message;
import com.coremedia.blueprint.social.beans.MessageContainerDescriptor;
import com.coremedia.blueprint.social.beans.MessageImpl;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.skins.ContainerSkin;

import ext.Component;
import ext.ComponentManager;
import ext.container.Container;

public class DynamicMessageContainerBase extends Container {
  private const PROPERTY_EDITOR_XTYPE:String = "com.coremedia.blueprint.social.studio.config.message.field.";

  [Bindable]
  public var message:MessageImpl;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function DynamicMessageContainerBase(config:DynamicMessageContainerBase = null) {
    super(config);
  }

  override protected function afterRender():void {
    super.afterRender();

    var target:Container = queryById('fieldWrapper') as Container;

    var properties:Array = adapter.getMessageProperties();
    //reverse for inserting
    var pros:Array = properties.concat([]).reverse();
    for each(var prop:MessageProperty in pros) {
      var baseConfig:Object = {};
      var propertyName:String = prop.getName();
      var descriptor:MessageContainerDescriptor = findCustomDescriptor(propertyName);

      if (!descriptor) {
        descriptor = createDefaultDescriptor(prop);
      }

      if (descriptor.isExcluded()) {
        continue;
      }

      var value:Object = descriptor.getValue();
      if (!value) {
        continue;
      }


      baseConfig.xtype = PROPERTY_EDITOR_XTYPE + descriptor.getType().toLowerCase();
      baseConfig.bindTo = ValueExpressionFactory.createFromValue(descriptor.getValue());
      baseConfig.messageContainerDescriptor = descriptor;
      var cmp:Component = ComponentManager.create(baseConfig);
      target.insert(0, cmp);
    }
  }

  private function findCustomDescriptor(name:String):MessageContainerDescriptor {
    var descriptors:Array = message.getMessageContainerDescriptors();
    for each(var desc:MessageContainerDescriptor in descriptors) {
      if (desc.getPropertyName() === name) {
        return desc;
      }
    }
    return null;
  }

  private function createDefaultDescriptor(prop:MessageProperty):MessageContainerDescriptor {
    var data:Object = {
      propertyName: prop.getName(),
      type: prop.getPropertyType(),
      showLabel: true,
      value: ValueExpressionFactory.createFromValue(message).extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(prop.getName()).getValue(),
      excluded: false
    };

    return new MessageContainerDescriptor(data);
  }

  protected function resolveSkin(adapter:SocialHubAdapter, msg:Message):String {
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT) {
      if(adapter.isNativeHistory()) {
        return ContainerSkin.DEFAULT.getSkin();
      }

      return ContainerSkin.DARK_200.getSkin();
    }

    return ContainerSkin.GRID_200.getSkin();
  }

  protected function getStyle(adapter:SocialHubAdapter, msg:Message):String {
    if (msg.getMessageState() === SocialHubPropertyNames.STATE_SENT && adapter.isNativeHistory()) {
      return "margin-bottom: 24px;";
    }

    return "transition: box-shadow 0.25s;box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.6);border-radius: 2px;border-width: 0;border-style: solid;margin: 2px;background-color:#fff;margin-bottom: 24px;";
  }
}
}
