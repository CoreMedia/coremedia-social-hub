package com.coremedia.blueprint.social.channels {
import ext.Component;
import ext.dd.DragSource;
import ext.dd.DropTarget;
import ext.event.Event;

/**
 * A drop zone for property editors of link list properties
 */
public class AdapterDropAreaTarget extends ext.dd.DropTarget {
  public function AdapterDropAreaTarget(dropArea:ext.Component, channelContainer:com.coremedia.blueprint.social.channels.ChannelContainer, handleEnter:Function = null, handlerOver:Function = null, handleOut:Function = null, handleDrop:Function = null) {
    super(undefined);
  }

  override public native function notifyEnter(source:ext.dd.DragSource, e:ext.event.Event, data:Object):String;

  override public native function notifyOver(source:ext.dd.DragSource, e:ext.event.Event, data:Object):String;

  override public native function notifyDrop(source:ext.dd.DragSource, e:ext.event.Event, data:Object):Boolean;

  override public native function notifyOut(source:ext.dd.DragSource, e:ext.event.Event, data:Object):void;
}
}