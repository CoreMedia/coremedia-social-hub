import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ContentProxyHelper from "@coremedia/studio-client.cap-rest-client/content/ContentProxyHelper";
import RemoteBean from "@coremedia/studio-client.client-core/data/RemoteBean";
import DragDropModel from "@coremedia/studio-client.ext.ui-components/models/DragDropModel";
import BeanCollectionDropZoneHelper from "@coremedia/studio-client.ext.ui-components/util/BeanCollectionDropZoneHelper";
import DragSource from "@jangaroo/ext-ts/dd/DragSource";
import { mixin } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";
import DropContainer from "./DropContainer";

class DropContainerDropModel implements DragDropModel {

  #dropContainer: DropContainer = null;

  constructor(dropContainer: DropContainer) {
    this.#dropContainer = dropContainer;
  }

  performDefaultAction(droppedContentIds: Array<any>, targetNodeId: string, callback?: AnyFunction): void {
    if (droppedContentIds && droppedContentIds.length > 0) {
      const droppedRemoteBeans = BeanCollectionDropZoneHelper.getRemoteBeansForNodes(droppedContentIds);
      const newEditedContents = [];
      droppedRemoteBeans.forEach((remoteBean: RemoteBean): void => {
        const content = ContentProxyHelper.getContent(remoteBean);
        if (content && !content.isFolder()) {
          newEditedContents.push(content);
        }
      });
      this.#dropContainer.handleContentDrop(newEditedContents);
    }
  }

  performAlternativeAction(droppedContentIds: Array<any>, targetNodeId: string, callback?: AnyFunction): void {
    // not allowed
  }

  allowDefaultAction(source: DragSource, nodeIds: Array<any>, targetNodeId: string): boolean {
    let mayBeMoved = true;
    const remoteBeansForNodes = BeanCollectionDropZoneHelper.getRemoteBeansForNodes(nodeIds);
    remoteBeansForNodes.forEach((remoteBean: RemoteBean): void => {
      const content = ContentProxyHelper.getContent(remoteBean);
      if (!content || content.isFolder()) {
        mayBeMoved = false;
      }

      if (!content.getType()) {
        mayBeMoved = false;
      } else if (!content.getType().isSubtypeOf("CMMedia")) {
        mayBeMoved = false;
      }

      if (this.#alreadyExists(content)) {
        mayBeMoved = false;
      }

      const items: Array<any> = this.#dropContainer.getItemsExpression().getValue();
      if (items.length >= this.#dropContainer.property.getMaxLength()) {
        mayBeMoved = false;
      }
    });
    return mayBeMoved;
  }

  #alreadyExists(content: Content): boolean {
    const items: Array<any> = this.#dropContainer.bindTo.getValue();
    if (items) {
      for (const c of items as Content[]) {
        if (content.getId() === c.getId()) {
          return true;
        }
      }
    }
    return false;
  }

  allowAlternativeAction(source: DragSource, nodeIds: Array<any>, targetNodeId: string): boolean {
    return false;
  }

  getModelItemId(): string {
    return this.#dropContainer.getItemId();
  }
}
mixin(DropContainerDropModel, DragDropModel);

export default DropContainerDropModel;
