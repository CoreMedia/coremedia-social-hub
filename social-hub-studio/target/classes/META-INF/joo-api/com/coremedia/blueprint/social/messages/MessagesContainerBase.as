package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
import com.coremedia.ui.components.ProgressLoadMask;
import com.coremedia.ui.data.ValueExpression;
import ext.container.Container;

public class MessagesContainerBase extends ext.container.Container {
  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;

  [Bindable(event = "DUMMY")]
  public var messageType:String;

  public var loadMask:com.coremedia.ui.components.ProgressLoadMask;

  public var activeItemExpression:com.coremedia.ui.data.ValueExpression;

  public function MessagesContainerBase(config:com.coremedia.blueprint.social.messages.MessagesContainerBase = null) {
    super();
  }

  override protected native function afterRender():void;

  public native function reload(invalidate:Boolean = true):void;

  public native function clear():void;

  protected native function getEmptyLabel(msgType:String):String;
}
}