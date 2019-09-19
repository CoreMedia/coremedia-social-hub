package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.mixins.IValidationStateMixin;
import com.coremedia.ui.mixins.ValidationState;

import ext.StringUtil;

import ext.panel.Panel;

import mx.resources.ResourceManager;

public class MessageChoiceEditorBase extends Panel implements MessageFieldEditor {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function MessageChoiceEditorBase(config:MessageChoiceEditorBase = null) {
    super(config);
    if(property.isRequired()) {
      bindTo.addChangeListener(valueChanged);
    }
  }

  override protected function afterRender():void {
    super.afterRender();
    if(property.getDefaultOption()) {
      bindTo.setValue(property.getDefaultOption());
    }
  }

  private function valueChanged(ve:ValueExpression):void {
    var editor:* = queryById(property.getName());
    var statefulEditor:IValidationStateMixin = editor as IValidationStateMixin;
    if (!ve.getValue() || StringUtil.trim(ve.getValue()).length === 0) {
      statefulEditor.validationState = ValidationState.ERROR;
    }
    else {
      statefulEditor.validationState = undefined;
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

  public function getErrorMessage():String {
    if(!bindTo.getValue()) {
      var msg:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_noValue_text');
      var message:String = StringUtil.format(msg, property.getDisplayName());
      return message;
    }
    return null;
  }

}
}
