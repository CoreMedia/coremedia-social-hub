package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.ui.data.ValueExpression;

import ext.panel.Panel;

import mx.resources.ResourceManager;

public class MessageChoiceEditorBase extends Panel {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function MessageChoiceEditorBase(config:MessageChoiceEditorBase = null) {
    super(config);
  }


  override protected function afterRender():void {
    super.afterRender();
    if(property.getDefaultOption()) {
      bindTo.setValue(property.getDefaultOption());
    }
  }

  public static function getStore(property:MessageProperty):Array {
    var localStore:Array = [];

    for each(var prop:String in property.getOptions()) {
      var key:String = prop;
      var bundleKey:String = 'message_property_' + property.getName().toLowerCase() + '_' + key;
      var value:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', bundleKey);
      if(!value) {
        value = key;
      }
      localStore.push([key, value]);
    }
    return localStore;
  }
}
}
