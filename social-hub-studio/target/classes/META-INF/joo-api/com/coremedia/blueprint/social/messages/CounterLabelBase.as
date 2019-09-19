package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.MessageImpl;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import ext.container.Container;

public class CounterLabelBase extends ext.container.Container {
  [Bindable(event = "DUMMY")]
  public var message:com.coremedia.blueprint.social.beans.MessageImpl;

  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  [Bindable(event = "DUMMY")]
  public var propertyName:String;

  public function CounterLabelBase(config:com.coremedia.blueprint.social.messages.CounterLabelBase = null) {
    super();
  }

  protected native function getLabel(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter, propertyName:String):String;

  protected native function getIcon(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter, propertyName:String):String;
}
}