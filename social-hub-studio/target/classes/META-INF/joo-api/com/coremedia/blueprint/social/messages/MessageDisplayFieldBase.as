package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.MessageContainerDescriptor;
import com.coremedia.ui.data.ValueExpression;
import ext.container.Container;

public class MessageDisplayFieldBase extends ext.container.Container {
  [Bindable(event = "DUMMY")]
  public var bindTo:com.coremedia.ui.data.ValueExpression;

  [Bindable(event = "DUMMY")]
  public var messageContainerDescriptor:com.coremedia.blueprint.social.beans.MessageContainerDescriptor;

  public function MessageDisplayFieldBase(config:com.coremedia.blueprint.social.messages.MessageDisplayFieldBase = null) {
    super();
  }

  protected native function localizeFieldName(name:String):String;

  public static native function camelizeWithWhitespace(str:String):String;
}
}