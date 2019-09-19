package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
import ext.layout.container.ContainerLayout;
import ext.panel.Panel;

public class ChannelContainerBase extends ext.panel.Panel {
  public static const LOADER_ITEM_ID:String = "loader";

  public static const MESSAGE_WRAPPER_ITEM_ID:String = "messagesWrapper";

  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;

  public function ChannelContainerBase(config:com.coremedia.blueprint.social.channels.ChannelContainerBase = null) {
    super();
  }

  override protected native function afterRender():void;

  override protected native function afterLayout(layout:ext.layout.container.ContainerLayout):void;

  protected native function forceReload():void;

  /**
   * @param invalidate false when adapter should not be invalidated.
   */
  public native function reload(invalidate:Boolean = true):void;

  public native function onComposerClose():void;

  public native function refreshColors(color:String):void;

  protected native function composeMessage():void;

  public native function setComposerButtonState(disabled:Boolean):void;

  protected native function format(msg:String, length:int):String;

  override protected native function onDestroy():void;

  protected native function resolveHistoryTitle(ad:com.coremedia.blueprint.social.beans.SocialHubAdapter):String;
}
}