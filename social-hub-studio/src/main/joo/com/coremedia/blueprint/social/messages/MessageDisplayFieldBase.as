package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.MessageContainerDescriptor;
import com.coremedia.ui.data.ValueExpression;

import ext.container.Container;

public class MessageDisplayFieldBase extends Container {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var messageContainerDescriptor:MessageContainerDescriptor;

  public function MessageDisplayFieldBase(config:MessageDisplayFieldBase = null) {
    super(config);
  }

  protected function localizeFieldName(name:String):String {
    var label:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_property_' + name);
    if (label) {
      return label;
    }

    return camelizeWithWhitespace(name);
  }

  public static function camelizeWithWhitespace(str:String):String {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter:*, index:*):String {
      return letter.toUpperCase();
    }).replace(/\s+/g, ' ');
  }
}
}
