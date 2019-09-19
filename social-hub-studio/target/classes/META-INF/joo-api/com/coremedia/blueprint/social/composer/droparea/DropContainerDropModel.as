package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.ui.models.DragDropModel;
import ext.dd.DragSource;

public class DropContainerDropModel implements com.coremedia.ui.models.DragDropModel {
  public function DropContainerDropModel(dropContainer:com.coremedia.blueprint.social.composer.droparea.DropContainer) {
    super();
  }

  public native function performDefaultAction(droppedContentIds:Array, targetNodeId:String, callback:Function = undefined):void;

  public native function performAlternativeAction(droppedContentIds:Array, targetNodeId:String, callback:Function = undefined):void;

  public native function allowDefaultAction(source:ext.dd.DragSource, nodeIds:Array, targetNodeId:String):Boolean;

  public native function allowAlternativeAction(source:ext.dd.DragSource, nodeIds:Array, targetNodeId:String):Boolean;

  public native function getModelItemId():String;
}
}