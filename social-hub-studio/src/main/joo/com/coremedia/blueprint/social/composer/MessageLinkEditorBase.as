package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.ui.data.ValueExpression;

import ext.StringUtil;
import ext.panel.Panel;

public class MessageLinkEditorBase extends Panel implements MessageFieldEditor {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function MessageLinkEditorBase(config:MessageChoiceEditorBase = null) {
    super(config);
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
