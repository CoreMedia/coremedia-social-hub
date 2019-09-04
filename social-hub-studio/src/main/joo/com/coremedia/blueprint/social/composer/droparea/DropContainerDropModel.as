package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentProxyHelper;
import com.coremedia.ui.data.RemoteBean;
import com.coremedia.ui.models.DragDropModel;
import com.coremedia.ui.util.BeanCollectionDropZoneHelper;

import ext.dd.DragSource;

public class DropContainerDropModel implements DragDropModel {

  private var dropContainer:DropContainer;

  public function DropContainerDropModel(dropContainer:DropContainer) {
    this.dropContainer = dropContainer;
  }

  public function performDefaultAction(droppedContentIds:Array, targetNodeId:String, callback:Function = undefined):void {
    if (droppedContentIds && droppedContentIds.length > 0) {
      var droppedRemoteBeans:Array = BeanCollectionDropZoneHelper.getRemoteBeansForNodes(droppedContentIds);
      var newEditedContents:Array = [];
      droppedRemoteBeans.forEach(function (remoteBean:RemoteBean):void {
        var content:Content = ContentProxyHelper.getContent(remoteBean);
        if (content && !content.isFolder()) {
          newEditedContents.push(content);
        }
      });
      dropContainer.handleContentDrop(newEditedContents);
    }
  }

  public function performAlternativeAction(droppedContentIds:Array, targetNodeId:String, callback:Function = undefined):void {
    // not allowed
  }

  public function allowDefaultAction(source:DragSource, nodeIds:Array, targetNodeId:String):Boolean {
    var mayBeMoved:Boolean = true;
    var remoteBeansForNodes:Array = BeanCollectionDropZoneHelper.getRemoteBeansForNodes(nodeIds);
    remoteBeansForNodes.forEach(function (remoteBean:RemoteBean):void {
      var content:Content = ContentProxyHelper.getContent(remoteBean);
      if (!content || content.isFolder()) {
        mayBeMoved = false;
      }

      if(!content.getType()) {
        mayBeMoved= false;
      }
      else if(!content.getType().isSubtypeOf("CMMedia")) {
        mayBeMoved = false;
      }

      if(alreadyExists(content)) {
        mayBeMoved = false;
      }

      var items:Array = dropContainer.getItemsExpression().getValue();
      if(items.length >= dropContainer.property.getMaxLength()) {
        mayBeMoved = false;
      }
    });
    return mayBeMoved;
  }

  private function alreadyExists(content:Content):Boolean {
    var items:Array = dropContainer.bindTo.getValue();
    if(items) {
      for each(var c:Content in items) {
        if(content.getId() === c.getId()) {
          return true;
        }
      }
    }
    return false;
  }

  public function allowAlternativeAction(source:DragSource, nodeIds:Array, targetNodeId:String):Boolean {
    return false;
  }

  public function getModelItemId():String {
    return dropContainer.getItemId();
  }
}
}
