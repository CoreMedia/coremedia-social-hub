package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.cap.content.Content;

public class DropItem {
  public function DropItem() {
    super();
  }

  public static native function create(content:com.coremedia.cap.content.Content, callback:Function = null):com.coremedia.blueprint.social.composer.droparea.DropItem;

  public native function isLoaded():Boolean;

  public native function getContent():com.coremedia.cap.content.Content;

  public native function setName(name:String):void;

  public native function getName():String;

  public native function getId():String;
}
}