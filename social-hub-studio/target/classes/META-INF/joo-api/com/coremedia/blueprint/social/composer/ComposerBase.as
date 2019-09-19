package com.coremedia.blueprint.social.composer {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.channels.ChannelContainer;
import com.coremedia.ui.data.ValueExpression;
import ext.window.Window;

public class ComposerBase extends ext.window.Window {
  public static const COMPOSER_WINDOW_ID:String = "composerWindow";

  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  [Bindable(event = "DUMMY")]
  public var channelContainer:com.coremedia.blueprint.social.channels.ChannelContainer;

  [Bindable(event = "DUMMY")]
  public var bindTo:com.coremedia.ui.data.ValueExpression;

  public function ComposerBase(config:com.coremedia.blueprint.social.composer.ComposerBase = null) {
    super();
  }

  public static native function isOpened(adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter):Boolean;

  override public native function close():void;

  /**
   * Should be necessary, but hide and bringToFront don't work without errors from overrides
   */
  public static native function closeAll():void;

  override protected native function afterRender():void;

  protected native function getScheduledDateExpression(ch:com.coremedia.blueprint.social.beans.SocialHubAdapter):com.coremedia.ui.data.ValueExpression;

  protected native function finishComposing():void;

  protected native function getErrorMessagesExpression():com.coremedia.ui.data.ValueExpression;

  public native function closeComposer():void;

  protected native function getComposerTitle(ch:com.coremedia.blueprint.social.beans.SocialHubAdapter):String;

  override protected native function onDestroy():void;
}
}