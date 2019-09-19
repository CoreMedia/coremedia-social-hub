Ext.define("com.coremedia.blueprint.social.composer.droparea.DropContainerDropZone", function(DropContainerDropZone) {/*package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.cms.editor.sdk.components.ContentGridPanel;
import com.coremedia.ui.models.DragDropModel;
import com.coremedia.ui.util.BeanCollectionDropZoneHelper;

import ext.dd.DragSource;
import ext.dd.DropZone;
import ext.event.Event;

public class DropContainerDropZone extends DropZone {

  private var beanCollectionDropZoneHelper:BeanCollectionDropZoneHelper;

  public*/ function DropContainerDropZone$(component/*:DropContainerBase*/, editedContentsDragDropModel/*:DragDropModel*/, config/*:DropZone*/) {
    this.super$IDQP(component.getEl(), config);
    this.beanCollectionDropZoneHelper$IDQP = new com.coremedia.ui.util.BeanCollectionDropZoneHelper(editedContentsDragDropModel, false);
  }/*

  public override*/ function notifyEnter(source/*:DragSource*/, event/*:Event*/, data/*:Object*/)/*:String*/ {
    return this.beanCollectionDropZoneHelper$IDQP.notifyEnter(source, event, data);
  }/*

  public override*/ function notifyOut(source/*:DragSource*/, e/*:Event*/, data/*:Object*/)/*:void*/ {
    this.beanCollectionDropZoneHelper$IDQP.notifyOut(source, e, data);
  }/*

  public override*/ function onContainerOver(source/*:DragSource*/, e/*:Event*/, data/*:Object*/)/*:String*/ {
    return this.beanCollectionDropZoneHelper$IDQP.onContainerOver(source, e, data);
  }/*

  public override*/ function onContainerDrop(source/*:DragSource*/, e/*:Event*/, data/*:Object*/)/*:Boolean*/ {
    return this.beanCollectionDropZoneHelper$IDQP.onContainerDrop(source, e, data);
  }/*

}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.dd.DropZone",
      beanCollectionDropZoneHelper$IDQP: null,
      constructor: DropContainerDropZone$,
      super$IDQP: function() {
        Ext.dd.DropZone.prototype.constructor.apply(this, arguments);
      },
      notifyEnter: notifyEnter,
      notifyOut: notifyOut,
      onContainerOver: onContainerOver,
      onContainerDrop: onContainerDrop,
      requires: [
        "Ext.dd.DropZone",
        "com.coremedia.ui.util.BeanCollectionDropZoneHelper"
      ]
    };
});
