package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteBeanImpl;

[RestResource(uriTemplate = "socialhub/adapter/{id:[^/]+}")]
public class SocialHubAdapterImpl extends com.coremedia.ui.data.impl.RemoteBeanImpl implements com.coremedia.blueprint.social.beans.SocialHubAdapter {
  public native function isReadOnly():Boolean;

  public native function isDirectPublication():Boolean;

  public native function isNativeHistory():Boolean;

  public native function isSchedulingSupported():Boolean;

  public native function getMessageProperties():Array;

  public native function getAdapterId():String;

  public native function getDisplayName():String;

  public native function getType():String;

  public native function getSentMessages():Array;

  public native function getScheduledMessages():Array;

  public native function setColor(color:String):void;

  public native function getColor():String;

  public native function getHoverColor():String;

  public native function getPressedColor():String;

  public native function getPropertyKey(property:String):String;
}
}