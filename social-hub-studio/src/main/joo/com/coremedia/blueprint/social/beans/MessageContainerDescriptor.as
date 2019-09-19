package com.coremedia.blueprint.social.beans {
public class MessageContainerDescriptor {
  private var data:Object;

  public function MessageContainerDescriptor(data:Object) {
    this.data = data;
  }

  public function getValue():Object {
    return data.value;
  }

  public function getType():String {
    return data.type;
  }

  public function showLabel():Boolean {
    return data.showLabel;
  }

  public function getScripts():Array {
    return data[SocialHubPropertyNames.DESCRIPTOR_SCRIPTS] || [];
  }

  public function getScriplets():Array {
    return data[SocialHubPropertyNames.DESCRIPTOR_SCRIPLETS] || [];
  }

  public function isExcluded():Boolean {
    return data[SocialHubPropertyNames.DESCRIPTOR_EXCLUDED];
  }

  public function getPropertyName():String {
    return data[SocialHubPropertyNames.DESCRIPTOR_PROPERTY_NAME];
  }
}
}
