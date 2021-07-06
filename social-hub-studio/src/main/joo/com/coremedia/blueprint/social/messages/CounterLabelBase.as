package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
import com.coremedia.blueprint.social.beans.MessageImpl;
import com.coremedia.cms.editor.sdk.util.MessageBoxUtil;

import ext.DateUtil;
import ext.container.Container;

import mx.resources.ResourceManager;

public class CounterLabelBase extends Container {

  [ExtConfig]
  public var message:MessageImpl;

  [ExtConfig]
  public var adapter:SocialHubAdapter;

  [ExtConfig]
  public var propertyName:String;

  public function CounterLabelBase(config:CounterLabelBase = null) {
    super(config);
  }

  protected function getLabel(adapter:SocialHubAdapter, propertyName:String):String {
    return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', propertyName + '_' + adapter.getType().toLowerCase() + "_text");
  }

  protected function getIcon(adapter:SocialHubAdapter, propertyName:String):String {
    return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', propertyName + '_' + adapter.getType().toLowerCase() + "_icon");
  }
}
}
