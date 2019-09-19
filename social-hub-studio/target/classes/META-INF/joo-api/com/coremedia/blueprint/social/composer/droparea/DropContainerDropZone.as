package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.ui.models.DragDropModel;
import ext.dd.DragSource;
import ext.dd.DropZone;
import ext.event.Event;

public class DropContainerDropZone extends ext.dd.DropZone {
  public function DropContainerDropZone(component:com.coremedia.blueprint.social.composer.droparea.DropContainerBase, editedContentsDragDropModel:com.coremedia.ui.models.DragDropModel, config:ext.dd.DropZone) {
    super();
  }

  override public native function notifyEnter(source:ext.dd.DragSource, event:ext.event.Event, data:Object):String;

  override public native function notifyOut(source:ext.dd.DragSource, e:ext.event.Event, data:Object):void;

  override public native function onContainerOver(source:ext.dd.DragSource, e:ext.event.Event, data:Object):String;

  override public native function onContainerDrop(source:ext.dd.DragSource, e:ext.event.Event, data:Object):Boolean;
}
}