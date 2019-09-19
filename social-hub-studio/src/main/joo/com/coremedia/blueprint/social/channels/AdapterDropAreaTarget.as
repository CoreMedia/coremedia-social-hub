package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.composer.ComposerBase;
import com.coremedia.cms.editor.sdk.dragdrop.DragInfo;

import ext.Component;
import ext.dd.DragSource;
import ext.dd.DropTarget;
import ext.event.Event;

/**
 * A drop zone for property editors of link list properties
 */
public class AdapterDropAreaTarget extends DropTarget {

  private var dropArea:Component;
  private var channelContainer:ChannelContainer;
  private var handleEnter:Function;
  private var handleOver:Function;
  private var handleOut:Function;
  private var handleDrop:Function;

  public function AdapterDropAreaTarget(dropArea:Component,
                                        channelContainer:ChannelContainer,
                                        handleEnter:Function = null,
                                        handlerOver:Function = null,
                                        handleOut:Function = null,
                                        handleDrop:Function = null) {
    super(dropArea.getEl(), DropTarget({ddGroup: ["ContentDD", "ContentLinkDD"]}));
    addToGroup("ContentDD");
    addToGroup("ContentLinkDD");

    this.dropArea = dropArea;
    this.channelContainer = channelContainer;
    this.handleEnter = handleEnter;
    this.handleOver = handlerOver;
    this.handleOut = handleOut;
    this.handleDrop = handleDrop;
  }

  private function allowDrop(dragInfo:DragInfo, fromView:Component):Boolean {
    if (!dragInfo || dropArea.disabled) {
      return false;
    }

    var adapter:SocialHubAdapter = channelContainer.adapter;
    if (adapter.isReadOnly()) {
      return false;
    }

    return !ComposerBase.isOpened(channelContainer.adapter);
  }

  override public function notifyEnter(source:DragSource, e:Event, data:Object):String {
    var dragInfo:DragInfo = DragInfo.makeDragInfo(data);
    var mayDrop:Boolean = allowDrop(dragInfo, data.view);
    handleEnter && handleEnter(mayDrop);
    return mayDrop ? dropAllowed : dropNotAllowed;
  }

  override public function notifyOver(source:DragSource, e:Event, data:Object):String {
    var dragInfo:DragInfo = DragInfo.makeDragInfo(data);
    var mayDrop:Boolean = allowDrop(dragInfo, data.view);
    handleOver && handleOver(mayDrop);
    return mayDrop ? dropAllowed : dropNotAllowed;
  }

  override public function notifyDrop(source:DragSource, e:Event, data:Object):Boolean {
    var dragInfo:DragInfo = DragInfo.makeDragInfo(data);
    var mayDrop:Boolean = allowDrop(dragInfo, data.view);
    handleDrop && handleDrop(mayDrop, dragInfo.getContents(), data.view);
    return mayDrop;
  }

  override public function notifyOut(source:DragSource, e:Event, data:Object):void {
    var dragInfo:DragInfo = DragInfo.makeDragInfo(data);
    var mayDrop:Boolean = allowDrop(dragInfo, data.view);
    handleOut && handleOut(mayDrop);
    super.notifyOut(source, e, data);
  }
}
}

