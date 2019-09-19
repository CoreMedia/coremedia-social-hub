package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.composer.MessageFieldEditor;
import com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin;
import com.coremedia.cms.editor.sdk.upload.FileWrapper;
import com.coremedia.ui.data.ValueExpression;
import ext.container.Container;

public class DropContainerBase extends ext.container.Container implements com.coremedia.blueprint.social.composer.MessageFieldEditor {
  [Bindable(event = "DUMMY")]
  public var bindTo:com.coremedia.ui.data.ValueExpression;

  [Bindable(event = "DUMMY")]
  public var property:com.coremedia.blueprint.social.beans.MessageProperty;

  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  public function DropContainerBase(config:com.coremedia.blueprint.social.composer.droparea.DropContainerBase = null) {
    super();
  }

  override protected native function afterRender():void;

  protected native function setupDropZone():void;

  public native function handleContentDrop(contents:Array):void;

  /**
   * Fired when a file object has been dropped on the target drop area.
   * The file drop plugin fire an event for each file that is dropped
   * and the corresponding action is handled here.
   */
  protected native function handleFileDrop(files:Array):void;

  protected native function getAddButtonVisibilityExpression(prop:com.coremedia.blueprint.social.beans.MessageProperty, bindTo:com.coremedia.ui.data.ValueExpression):com.coremedia.ui.data.ValueExpression;

  public native function removeDropItem(dropItem:com.coremedia.blueprint.social.composer.droparea.DropItem):void;

  /**
   * Custom add thumbnail method to ensure that the new
   * items are added at the beginning, so that the + button is always at the end.
   */
  protected static native function addThumbnails(parent:com.coremedia.blueprint.social.composer.droparea.DropContainer, children:Array):void;

  /**
   * Allows the creation of custom file objects using
   * the factory method passed as config param
   * @param fileObject the HTML5 file object
   * @return the FileWrapper object used for uploading
   */
  protected native function createFileWrapper(fileObject:*):com.coremedia.cms.editor.sdk.upload.FileWrapper;

  /**
   * The upload button handler, converts the selected files to FileWrapper objects.
   * @param browsePlugin the browse plugin used for the file selection and contains the file selection.
   */
  protected native function uploadButtonHandler(browsePlugin:com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin):void;

  protected static native function getDropItemKey(dropItem:com.coremedia.blueprint.social.composer.droparea.DropItem):String;

  override protected native function onDestroy():void;

  public native function getItemsExpression(bindTo:com.coremedia.ui.data.ValueExpression = undefined):com.coremedia.ui.data.ValueExpression;

  public native function getErrorMessage():String;
}
}