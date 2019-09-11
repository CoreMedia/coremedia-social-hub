package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.mixins.IValidationStateMixin;
import com.coremedia.ui.mixins.ValidationState;

import ext.StringUtil;
import ext.panel.Panel;

public class MessageDateEditorBase extends Panel implements MessageFieldEditor {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function MessageDateEditorBase(config:MessageDateEditorBase = null) {
    super(config);
    if(property.getDefaultOption()) {
      bindTo.setValue(property.getDefaultOption());
    }
  }

  override protected function afterRender():void {
    super.afterRender();

    var dateTime:DateTimePropertyField = queryById('dateTimePropertyField') as DateTimePropertyField;
    dateTime.fieldLabel = property.getDisplayName();
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

}
}
