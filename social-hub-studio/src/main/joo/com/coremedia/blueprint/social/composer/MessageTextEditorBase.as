package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.mixins.IValidationStateMixin;
import com.coremedia.ui.mixins.ValidationState;

import ext.StringUtil;
import ext.panel.Panel;

public class MessageTextEditorBase extends Panel implements MessageFieldEditor {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function MessageTextEditorBase(config:MessageTextEditorBase = null) {
    super(config);
    if(property.isRequired()) {
      bindTo.addChangeListener(valueChanged);
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

  public function getErrorMessage():String {
    if (!bindTo.getValue()) {
      var msg:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_empty_text');
      var message:String = StringUtil.format(msg, property.getDisplayName());
      return message;
    }
    return null;
  }

  override protected function onDestroy():void {
    super.onDestroy();
    bindTo.removeChangeListener(valueChanged);
  }
}
}
