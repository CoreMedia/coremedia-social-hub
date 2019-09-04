package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.cms.editor.sdk.components.ContentGridPanel;
import com.coremedia.ui.models.DragDropModel;
import com.coremedia.ui.util.BeanCollectionDropZoneHelper;

import ext.dd.DragSource;
import ext.dd.DropZone;
import ext.event.Event;

public class DropContainerDropZone extends DropZone {

  private var beanCollectionDropZoneHelper:BeanCollectionDropZoneHelper;

  public function DropContainerDropZone(component:DropContainerBase, editedContentsDragDropModel:DragDropModel, config:DropZone) {
    super(component.getEl(), config);
    beanCollectionDropZoneHelper = new BeanCollectionDropZoneHelper(editedContentsDragDropModel, false);
  }

  public override function notifyEnter(source:DragSource, event:Event, data:Object):String {
    return beanCollectionDropZoneHelper.notifyEnter(source, event, data);
  }

  public override function notifyOut(source:DragSource, e:Event, data:Object):void {
    beanCollectionDropZoneHelper.notifyOut(source, e, data);
  }

  public override function onContainerOver(source:DragSource, e:Event, data:Object):String {
    return beanCollectionDropZoneHelper.onContainerOver(source, e, data);
  }

  public override function onContainerDrop(source:DragSource, e:Event, data:Object):Boolean {
    return beanCollectionDropZoneHelper.onContainerDrop(source, e, data);
  }

}
}
