import Config from "@jangaroo/runtime/Config";
import { as } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";
import SocialHubSettings_properties from "../SocialHubSettings_properties";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import ComposerBase from "../composer/ComposerBase";
import ChannelContainer from "./ChannelContainer";
import ChannelContainerBase from "./ChannelContainerBase";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import DragInfo from "@coremedia/studio-client.ext.interaction-components/DragInfo";
import Ext from "@jangaroo/ext-ts";
import Component from "@jangaroo/ext-ts/Component";
import DragSource from "@jangaroo/ext-ts/dd/DragSource";
import DropTarget from "@jangaroo/ext-ts/dd/DropTarget";
import Event from "@jangaroo/ext-ts/event/Event";


/**
 * A drop zone for property editors of link list properties
 */
class AdapterDropAreaTarget extends DropTarget {

  #dropArea:Component = null;
  #channelContainer:ChannelContainer = null;
  #handleEnter:AnyFunction = null;
  #handleOver:AnyFunction = null;
  #handleOut:AnyFunction = null;
  #handleDrop:AnyFunction = null;
  #hideOnExit:boolean = false;

  constructor(dropArea:Component,
                                        channelContainer:ChannelContainer,
                                        handleEnter:AnyFunction = null,
                                        handlerOver:AnyFunction = null,
                                        handleOut:AnyFunction = null,
                                        handleDrop:AnyFunction = null,
                                        hideOnExit:boolean = false) {
    super(dropArea.getEl(), Config(DropTarget, {"ddGroup": "ContentLinkDD"}));
    this.addToGroup("ContentDD");
    this.addToGroup("ContentLinkDD");

    this.#dropArea = dropArea;
    this.#channelContainer = channelContainer;
    this.#handleEnter = handleEnter;
    this.#handleOver = handlerOver;
    this.#handleOut = handleOut;
    this.#handleDrop = handleDrop;
    this.#hideOnExit = hideOnExit;
  }

  #allowDrop(dragInfo:DragInfo, fromView:Component):boolean {
    if (!dragInfo || this.#dropArea.disabled) {
      return false;
    }

    var adapter:SocialHubAdapter = this.#channelContainer.adapter;
    if (adapter.isReadOnly()) {
      return false;
    }

    if(ComposerBase.isOpened(this.#channelContainer.adapter)) {
      return false;
    }

    var contentContentType = SocialHubSettings_properties.social_hub_content_composer_document_type;
    var linkContentType = SocialHubSettings_properties.social_hub_content_composer_link_type;
    var contents = dragInfo.getContents();
    for(var c of contents as Content[]) {
      if(!c.getType().isSubtypeOf(contentContentType) && !c.getType().isSubtypeOf(linkContentType)) {
        return false;
      }
    }

    return true;
  }

  override notifyEnter(source:DragSource, e:Event, data:any):string {
    var dragInfo = DragInfo.makeDragInfo(data);
    var mayDrop = this.#allowDrop(dragInfo, data.view);
    if(mayDrop) {
      var linkContentType = SocialHubSettings_properties.social_hub_content_composer_link_type;
      var contentContentType = SocialHubSettings_properties.social_hub_content_composer_document_type;

      var contents = dragInfo.getContents();
      for(var c of contents as Content[]) {
        if(c.getType().isSubtypeOf(linkContentType) && c.getType().isSubtypeOf(contentContentType)) {
          this.#channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.DROP_CONTENT_AND_LINK_ITEM_ID);
        }
        else if(c.getType().isSubtypeOf(contentContentType)) {
          this.#channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.DROP_CONTENT_ITEM_ID);
        }
        else if(c.getType().isSubtypeOf(linkContentType)) {
          this.#channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.DROP_LINK_ITEM_ID);
        }
        break;
      }
    }
    else {
      this.#channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.DROP_NOT_ALLOWED_ITEM_ID);
    }
    this.#handleEnter && this.#handleEnter(mayDrop);
    return mayDrop ? this.dropAllowed : this.dropNotAllowed;
  }

  override notifyOver(source:DragSource, e:Event, data:any):string {
    var dragInfo = DragInfo.makeDragInfo(data);
    var mayDrop = this.#allowDrop(dragInfo, data.view);
    this.#handleOver && this.#handleOver(mayDrop);
    return mayDrop ? this.dropAllowed : this.dropNotAllowed;
  }

  override notifyDrop(source:DragSource, e:Event, data:any):boolean {
    var dragInfo = DragInfo.makeDragInfo(data);
    var mayDrop = this.#allowDrop(dragInfo, data.view);

    var composingType = this.#findDropType(e.target);
    if(composingType !== null) {
      this.#handleDrop && this.#handleDrop(mayDrop, dragInfo.getContents(), composingType, data.view);
      return mayDrop;
    }

    return false;
  }

  override notifyOut(source:DragSource, e:Event, data:any):void {
    this.#channelContainer.getActiveItemExpression().setValue(ChannelContainerBase.MESSAGE_WRAPPER_ITEM_ID);
    var dragInfo = DragInfo.makeDragInfo(data);
    var mayDrop = this.#allowDrop(dragInfo, data.view);
    this.#handleOut && this.#handleOut(mayDrop);
    super.notifyOut(source, e, data);
  }

  #findDropType(e:Element):string {
    var id =e.id;
    var c= Ext.getCmp(id);
    while(c === undefined || c.getItemId().indexOf(SocialHubPropertyNames.COMPOSER_TYPE) === -1) {
      e = as(e.parentNode, Element);
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
export default AdapterDropAreaTarget;
