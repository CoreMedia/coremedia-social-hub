package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
import com.coremedia.blueprint.social.composer.ComposerBase;
import com.coremedia.cap.content.Content;
import com.coremedia.cms.editor.sdk.dragdrop.DragInfo;

import ext.Component;
import ext.Ext;
import ext.dd.DragSource;
import ext.dd.DropTarget;
import ext.event.Event;

import js.Element;

import mx.resources.ResourceManager;

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
  private var hideOnExit:Boolean;

  public function AdapterDropAreaTarget(dropArea:Component,
                                        channelContainer:ChannelContainer,
                                        handleEnter:Function = null,
                                        handlerOver:Function = null,
                                        handleOut:Function = null,
                                        handleDrop:Function = null,
                                        hideOnExit:Boolean = false) {
    super(dropArea.getEl(), DropTarget({ddGroup: ["ContentDD", "ContentLinkDD"]}));
    addToGroup("ContentDD");
    addToGroup("ContentLinkDD");

    this.dropArea = dropArea;
    this.channelContainer = channelContainer;
    this.handleEnter = handleEnter;
    this.handleOver = handlerOver;
    this.handleOut = handleOut;
    this.handleDrop = handleDrop;
    this.hideOnExit = hideOnExit;
  }

  private function allowDrop(dragInfo:DragInfo, fromView:Component):Boolean {
    if (!dragInfo || dropArea.disabled) {
      return false;
    }

    var adapter:SocialHubAdapter = channelContainer.adapter;
    if (adapter.isReadOnly()) {
      return false;
    }

    if(ComposerBase.isOpened(channelContainer.adapter)) {
      return false;
    }

    var contentContentType:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHubSettings', 'social_hub_content_composer_document_type');
    var linkContentType:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHubSettings', 'social_hub_content_composer_link_type');
    var contents:Array = dragInfo.getContents();
    for each(var c:Content in contents) {
      if(!c.getType().isSubtypeOf(contentContentType) && !c.getType().isSubtypeOf(linkContentType)) {
        return false;
      }
    }

    return true;
  }

  override public function notifyEnter(source:DragSource, e:Event, data:Object):String {
    var dragInfo:DragInfo = DragInfo.makeDragInfo(data);
    var mayDrop:Boolean = allowDrop(dragInfo, data.view);
    if(mayDrop) {
      var linkContentType:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHubSettings', 'social_hub_content_composer_link_type');
      var contentContentType:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHubSettings', 'social_hub_content_composer_document_type');

      var contents:Array = dragInfo.getContents();
      for each(var c:Content in contents) {
        if(c.getType().isSubtypeOf(linkContentType) && c.getType().isSubtypeOf(contentContentType)) {
          channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.DROP_CONTENT_AND_LINK_ITEM_ID);
        }
        else if(c.getType().isSubtypeOf(contentContentType)) {
          channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.DROP_CONTENT_ITEM_ID);
        }
        else if(c.getType().isSubtypeOf(linkContentType)) {
          channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.DROP_LINK_ITEM_ID);
        }
        break;
      }
    }
    else {
      channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.DROP_NOT_ALLOWED_ITEM_ID);
    }
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

    var composingType:String = findDropType(e.target);
    if(composingType !== null) {
      handleDrop && handleDrop(mayDrop, dragInfo.getContents(), composingType, data.view);
      return mayDrop;
    }

    return false;
  }

  override public function notifyOut(source:DragSource, e:Event, data:Object):void {
    channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.MESSAGE_WRAPPER_ITEM_ID);
    var dragInfo:DragInfo = DragInfo.makeDragInfo(data);
    var mayDrop:Boolean = allowDrop(dragInfo, data.view);
    handleOut && handleOut(mayDrop);
    super.notifyOut(source, e, data);
  }

  private function findDropType(e:Element):String {
    var id:String =e.id;
    var c:Component= Ext.getCmp(id);
    while(c === undefined || c.getItemId().indexOf(SocialHubPropertyNames.COMPOSER_TYPE) === -1) {
      e = e.parentNode;
      if(e === null) {
        break;
      }
      id = e.id;
      c = Ext.getCmp(id);
    }

    if(c) {
      return c.getItemId();
    }

    return null;
  }
}
}

