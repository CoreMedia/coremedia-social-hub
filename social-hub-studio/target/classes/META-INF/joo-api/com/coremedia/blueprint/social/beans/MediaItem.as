package com.coremedia.blueprint.social.beans {
import com.coremedia.cap.content.Content;

public class MediaItem {
  public static const TYPE_VIDEO:String = "video";

  public static const TYPE_IMAGE:String = "image";

  public static native function fromObject(values:Object):com.coremedia.blueprint.social.beans.MediaItem;

  public static native function fromContent(content:com.coremedia.cap.content.Content):com.coremedia.blueprint.social.beans.MediaItem;

  public native function isLoaded():Boolean;

  public native function load(callback:Function = undefined):void;

  public native function render():String;

  public native function getUrl():String;

  public native function getType():String;

  public native function getText():String;

  public native function getId():String;
}
}