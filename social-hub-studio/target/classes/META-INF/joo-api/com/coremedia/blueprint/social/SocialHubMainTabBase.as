package com.coremedia.blueprint.social {
import ext.panel.Panel;

public class SocialHubMainTabBase extends ext.panel.Panel {
  public static const ID:String = "cm-social-hub-main-tab";

  public static const LOADER_ITEM_ID:String = "loader";

  public static const EMPTY_ITEM_ID:String = "empty";

  public static const CHANNELS_ITEM_ID:String = "channels";

  public function SocialHubMainTabBase(config:com.coremedia.blueprint.social.SocialHubMainTab = null) {
    super();
  }

  override protected native function afterRender():void;

  override protected native function onHide(animateTarget:* = undefined, callback:Function = null, scope:Object = null):void;

  override protected native function onDestroy():void;
}
}