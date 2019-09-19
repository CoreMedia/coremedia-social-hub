package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import ext.container.Container;

public class ColorButtonBase extends ext.container.Container {
  [Bindable(event = "DUMMY")]
  public var color:String;

  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  public function ColorButtonBase(config:com.coremedia.blueprint.social.channels.ColorButtonBase = null) {
    super();
  }

  override protected native function afterRender():void;

  protected native function chooseColor(e:*):void;
}
}