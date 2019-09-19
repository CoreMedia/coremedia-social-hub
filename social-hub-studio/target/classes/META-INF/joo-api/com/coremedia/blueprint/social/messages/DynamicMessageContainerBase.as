package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.Message;
import com.coremedia.blueprint.social.beans.MessageImpl;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import ext.container.Container;

public class DynamicMessageContainerBase extends ext.container.Container {
  [Bindable(event = "DUMMY")]
  public var message:com.coremedia.blueprint.social.beans.MessageImpl;

  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  public function DynamicMessageContainerBase(config:com.coremedia.blueprint.social.messages.DynamicMessageContainerBase = null) {
    super();
  }

  override protected native function afterRender():void;

  protected native function resolveSkin(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter, msg:com.coremedia.blueprint.social.beans.Message):String;

  protected native function getStyle(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter, msg:com.coremedia.blueprint.social.beans.Message):String;
}
}