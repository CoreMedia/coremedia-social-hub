package com.coremedia.blueprint.social.composer.droparea {
import ext.container.Container;

public class DropItemThumbnailBase extends ext.container.Container {
  /**
   * Preview container for images and and documents without preview but text
   */
  public static const PREVIEW_WIDTH:int = 120;

  public static const PREVIEW_HEIGHT:int = 90;

  protected static const PREVIEW_CONTAINER_BORDER_WIDTH:int = 2;

  protected static const STANDARD_GRID_100:int = 6;

  [Bindable(event = "DUMMY")]
  public var dropItem:com.coremedia.blueprint.social.composer.droparea.DropItem;

  public function DropItemThumbnailBase(config:com.coremedia.blueprint.social.composer.droparea.DropItemThumbnailBase = null) {
    super();
  }

  override protected native function afterRender():void;

  protected static native function formatName(name:String):String;

  public native function removeThumbnail():void;
}
}