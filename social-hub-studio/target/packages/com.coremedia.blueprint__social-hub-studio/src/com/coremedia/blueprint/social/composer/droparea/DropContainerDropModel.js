Ext.define("com.coremedia.blueprint.social.composer.droparea.DropContainerDropModel", function(DropContainerDropModel) {/*package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentProxyHelper;
import com.coremedia.ui.data.RemoteBean;
import com.coremedia.ui.models.DragDropModel;
import com.coremedia.ui.util.BeanCollectionDropZoneHelper;

import ext.dd.DragSource;

public class DropContainerDropModel implements DragDropModel {

  private var dropContainer:DropContainer;

  public*/ function DropContainerDropModel$(dropContainer/*:DropContainer*/) {
    this.dropContainer$6gNS = dropContainer;
  }/*

  public*/ function performDefaultAction(droppedContentIds/*:Array*/, targetNodeId/*:String*/, callback/*:Function = undefined*/)/*:void*/ {
    if (droppedContentIds && droppedContentIds.length > 0) {
      var droppedRemoteBeans/*:Array*/ = com.coremedia.ui.util.BeanCollectionDropZoneHelper.getRemoteBeansForNodes(droppedContentIds);
      var newEditedContents/*:Array*/ = [];
      droppedRemoteBeans.forEach(function (remoteBean/*:RemoteBean*/)/*:void*/ {
        var content/*:Content*/ = com.coremedia.cap.content.ContentProxyHelper.getContent(remoteBean);
        if (content && !content.isFolder()) {
          newEditedContents.push(content);
        }
      });
      this.dropContainer$6gNS.handleContentDrop(newEditedContents);
    }
  }/*

  public*/ function performAlternativeAction(droppedContentIds/*:Array*/, targetNodeId/*:String*/, callback/*:Function = undefined*/)/*:void*/ {
    // not allowed
  }/*

  public*/ function allowDefaultAction(source/*:DragSource*/, nodeIds/*:Array*/, targetNodeId/*:String*/)/*:Boolean*/ {var this$=this;
    var mayBeMoved/*:Boolean*/ = true;
    var remoteBeansForNodes/*:Array*/ = com.coremedia.ui.util.BeanCollectionDropZoneHelper.getRemoteBeansForNodes(nodeIds);
    remoteBeansForNodes.forEach(function (remoteBean/*:RemoteBean*/)/*:void*/ {
      var content/*:Content*/ = com.coremedia.cap.content.ContentProxyHelper.getContent(remoteBean);
      if (!content || content.isFolder()) {
        mayBeMoved = false;
      }

      if(!content.getType()) {
        mayBeMoved= false;
      }
      else if(!content.getType().isSubtypeOf("CMMedia")) {
        mayBeMoved = false;
      }

      if(this$.alreadyExists$6gNS(content)) {
        mayBeMoved = false;
      }

      var items/*:Array*/ = this$.dropContainer$6gNS.getItemsExpression().getValue();
      if(items.length >= AS3.getBindable(this$.dropContainer$6gNS,"property").getMaxLength()) {
        mayBeMoved = false;
      }
    });
    return mayBeMoved;
  }/*

  private*/ function alreadyExists(content/*:Content*/)/*:Boolean*/ {
    var items/*:Array*/ = AS3.getBindable(this.dropContainer$6gNS,"bindTo").getValue();
    if(items) {
      for/* each*/(var $1=0;$1</* in*/ items.length;++$1) {var c/*:Content*/ =items[$1];
        if(content.getId() === c.getId()) {
          return true;
        }
      }
    }
    return false;
  }/*

  public*/ function allowAlternativeAction(source/*:DragSource*/, nodeIds/*:Array*/, targetNodeId/*:String*/)/*:Boolean*/ {
    return false;
  }/*

  public*/ function getModelItemId()/*:String*/ {
    return this.dropContainer$6gNS.getItemId();
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      mixins: ["com.coremedia.ui.models.DragDropModel"],
      dropContainer$6gNS: null,
      constructor: DropContainerDropModel$,
      performDefaultAction: performDefaultAction,
      performAlternativeAction: performAlternativeAction,
      allowDefaultAction: allowDefaultAction,
      alreadyExists$6gNS: alreadyExists,
      allowAlternativeAction: allowAlternativeAction,
      getModelItemId: getModelItemId,
      requires: [
        "com.coremedia.cap.content.ContentProxyHelper",
        "com.coremedia.ui.models.DragDropModel",
        "com.coremedia.ui.util.BeanCollectionDropZoneHelper"
      ]
    };
});
