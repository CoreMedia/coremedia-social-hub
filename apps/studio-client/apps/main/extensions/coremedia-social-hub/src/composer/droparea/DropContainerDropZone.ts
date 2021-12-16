import DragDropModel from "@coremedia/studio-client.ext.ui-components/models/DragDropModel";
import BeanCollectionDropZoneHelper from "@coremedia/studio-client.ext.ui-components/util/BeanCollectionDropZoneHelper";
import DragSource from "@jangaroo/ext-ts/dd/DragSource";
import DropZone from "@jangaroo/ext-ts/dd/DropZone";
import Event from "@jangaroo/ext-ts/event/Event";
import Config from "@jangaroo/runtime/Config";
import DropContainerBase from "./DropContainerBase";

class DropContainerDropZone extends DropZone {

  #beanCollectionDropZoneHelper: BeanCollectionDropZoneHelper = null;

  constructor(component: DropContainerBase, editedContentsDragDropModel: DragDropModel, config: Config<DropZone>) {
    super(component.getEl(), config);
    this.#beanCollectionDropZoneHelper = new BeanCollectionDropZoneHelper(editedContentsDragDropModel, false);
  }

  override notifyEnter(source: DragSource, event: Event, data: any): string {
    return this.#beanCollectionDropZoneHelper.notifyEnter(source, event, data);
  }

  override notifyOut(source: DragSource, e: Event, data: any): void {
    this.#beanCollectionDropZoneHelper.notifyOut(source, e, data);
  }

  override onContainerOver(source: DragSource, e: Event, data: any): string {
    return this.#beanCollectionDropZoneHelper.onContainerOver(source, e, data);
  }

  override onContainerDrop(source: DragSource, e: Event, data: any): boolean {
    return this.#beanCollectionDropZoneHelper.onContainerDrop(source, e, data);
  }

}

export default DropContainerDropZone;
