Ext.define("com.coremedia.blueprint.social.channels.AdapterDropAreaTarget", function(AdapterDropAreaTarget) {/*package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.composer.ComposerBase;
import com.coremedia.cms.editor.sdk.dragdrop.DragInfo;

import ext.Component;
import ext.dd.DragSource;
import ext.dd.DropTarget;
import ext.event.Event;

/**
 * A drop zone for property editors of link list properties
 * /
public class AdapterDropAreaTarget extends DropTarget {

  private var dropArea:Component;
  private var channelContainer:ChannelContainer;
  private var handleEnter:Function;
  private var handleOver:Function;
  private var handleOut:Function;
  private var handleDrop:Function;

  public*/ function AdapterDropAreaTarget$(dropArea/*:Component*/,
                                        channelContainer/*:ChannelContainer*/,
                                        handleEnter/*:Function = null*/,
                                        handlerOver/*:Function = null*/,
                                        handleOut/*:Function = null*/,
                                        handleDrop/*:Function = null*/) {switch(Math.max(arguments.length,2)){case 2:handleEnter=null;case 3:handlerOver=null;case 4:handleOut=null;case 5:handleDrop=null;}
    this.super$5ezE(dropArea.getEl(), AS3.cast(Ext.dd.DropTarget,{ddGroup: ["ContentDD", "ContentLinkDD"]}));
    this.addToGroup("ContentDD");
    this.addToGroup("ContentLinkDD");

    this.dropArea$5ezE = dropArea;
    this.channelContainer$5ezE = channelContainer;
    this.handleEnter$5ezE = handleEnter;
    this.handleOver$5ezE = handlerOver;
    this.handleOut$5ezE = handleOut;
    this.handleDrop$5ezE = handleDrop;
  }/*

  private*/ function allowDrop(dragInfo/*:DragInfo*/, fromView/*:Component*/)/*:Boolean*/ {
    if (!dragInfo || this.dropArea$5ezE.disabled) {
      return false;
    }

    var adapter/*:SocialHubAdapter*/ = AS3.getBindable(this.channelContainer$5ezE,"adapter");
    if (adapter.isReadOnly()) {
      return false;
    }

    return !com.coremedia.blueprint.social.composer.ComposerBase.isOpened(AS3.getBindable(this.channelContainer$5ezE,"adapter"));
  }/*

  override public*/ function notifyEnter(source/*:DragSource*/, e/*:Event*/, data/*:Object*/)/*:String*/ {
    var dragInfo/*:DragInfo*/ = com.coremedia.cms.editor.sdk.dragdrop.DragInfo.makeDragInfo(data);
    var mayDrop/*:Boolean*/ = this.allowDrop$5ezE(dragInfo, data.view);
    this.handleEnter$5ezE && this.handleEnter$5ezE(mayDrop);
    return mayDrop ? this.dropAllowed : this.dropNotAllowed;
  }/*

  override public*/ function notifyOver(source/*:DragSource*/, e/*:Event*/, data/*:Object*/)/*:String*/ {
    var dragInfo/*:DragInfo*/ = com.coremedia.cms.editor.sdk.dragdrop.DragInfo.makeDragInfo(data);
    var mayDrop/*:Boolean*/ = this.allowDrop$5ezE(dragInfo, data.view);
    this.handleOver$5ezE && this.handleOver$5ezE(mayDrop);
    return mayDrop ? this.dropAllowed : this.dropNotAllowed;
  }/*

  override public*/ function notifyDrop(source/*:DragSource*/, e/*:Event*/, data/*:Object*/)/*:Boolean*/ {
    var dragInfo/*:DragInfo*/ = com.coremedia.cms.editor.sdk.dragdrop.DragInfo.makeDragInfo(data);
    var mayDrop/*:Boolean*/ = this.allowDrop$5ezE(dragInfo, data.view);
    this.handleDrop$5ezE && this.handleDrop$5ezE(mayDrop, dragInfo.getContents(), data.view);
    return mayDrop;
  }/*

  override public*/ function notifyOut(source/*:DragSource*/, e/*:Event*/, data/*:Object*/)/*:void*/ {
    var dragInfo/*:DragInfo*/ = com.coremedia.cms.editor.sdk.dragdrop.DragInfo.makeDragInfo(data);
    var mayDrop/*:Boolean*/ = this.allowDrop$5ezE(dragInfo, data.view);
    this.handleOut$5ezE && this.handleOut$5ezE(mayDrop);
    Ext.dd.DropTarget.prototype.notifyOut.call(this,source, e, data);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.dd.DropTarget",
      dropArea$5ezE: null,
      channelContainer$5ezE: null,
      handleEnter$5ezE: null,
      handleOver$5ezE: null,
      handleOut$5ezE: null,
      handleDrop$5ezE: null,
      constructor: AdapterDropAreaTarget$,
      super$5ezE: function() {
        Ext.dd.DropTarget.prototype.constructor.apply(this, arguments);
      },
      allowDrop$5ezE: allowDrop,
      notifyEnter: notifyEnter,
      notifyOver: notifyOver,
      notifyDrop: notifyDrop,
      notifyOut: notifyOut,
      requires: [
        "Ext.dd.DropTarget",
        "com.coremedia.cms.editor.sdk.dragdrop.DragInfo"
      ],
      uses: ["com.coremedia.blueprint.social.composer.ComposerBase"]
    };
});
