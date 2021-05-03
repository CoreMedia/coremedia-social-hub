package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.composer.MessageFieldEditor;
import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentPropertyNames;
import com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin;
import com.coremedia.cms.editor.sdk.editorContext;
import com.coremedia.cms.studio.multisite.models.sites.Site;
import com.coremedia.cms.editor.sdk.upload.FileWrapper;
import com.coremedia.cms.editor.sdk.upload.UploadManager;
import com.coremedia.cms.editor.sdk.upload.UploadSettings;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.util.EventUtil;

import ext.Component;
import ext.MessageBox;
import ext.StringUtil;
import ext.container.Container;
import ext.dd.DropZone;

import js.XMLHttpRequest;

public class DropContainerBase extends Container implements MessageFieldEditor {
  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  private var itemsExpression:ValueExpression;

  public function DropContainerBase(config:DropContainerBase = null) {
    super(config);
  }

  override protected function afterRender():void {
    super.afterRender();
    setupDropZone();

    bindTo.loadValue(function (items:Array):void {
      var result:Array = [];
      if(!items) {
        items = [];
      }

      for each(var c:Content in items) {
        var item:DropItem = DropItem.create(c);
        result.push(item);
      }

      ValueExpressionFactory.createFromFunction(function ():Array {
        for each(var dropItem:DropItem in result) {
          if (!dropItem.isLoaded()) {
            return undefined;
          }
        }
        return result;
      }).loadValue(function (loadedResult:Array):void {
        getItemsExpression(bindTo).setValue(loadedResult);
        getItemsExpression(bindTo).addChangeListener(itemsChanged);
      });
    });
  }

  protected function setupDropZone():void {
    // drop zone
    var dropZoneConfig:DropZone = DropZone({
      ddGroup: "ContentLinkDD"
    });

    var zone:DropContainerDropZone = new DropContainerDropZone(this, new DropContainerDropModel(this as DropContainer), dropZoneConfig);
    zone.addToGroup("ContentDD");
  }

  public function handleContentDrop(contents:Array):void {
    EventUtil.invokeLater(function ():void {//otherwise the progress bar does not appear :(
      for (var i:int = 0; i < contents.length; i++) {
        DropItem.create(contents[i], function (item:DropItem):void {
          addDropItem(item);
        });
      }
    });
  }

  /**
   * Fired when a file object has been dropped on the target drop area.
   * The file drop plugin fire an event for each file that is dropped
   * and the corresponding action is handled here.
   */
  protected function handleFileDrop(files:Array):void {
    MessageBox.show({
      title: resourceManager.getString('com.coremedia.cms.editor.sdk.upload.Upload', 'Upload_progress_title'),
      msg: resourceManager.getString('com.coremedia.cms.editor.sdk.upload.Upload', 'Upload_progress_msg'),
      closable: false,
      width: 300
    });
    EventUtil.invokeLater(function ():void {//otherwise the progress bar does not appear :(
      var site:Site = editorContext.getSitesService().getPreferredSite();
      var uploadSettings:UploadSettings = new UploadSettings(site.getId());
      var siteRelativePath:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHubSettings', 'social_hub_content_upload_path');

      var siteRoot:Content = site.getSiteRootFolder();
      ValueExpressionFactory.create(ContentPropertyNames.PATH, siteRoot).loadValue(function ():void {
        var contentPath:String = siteRoot.getPath() + '/' + siteRelativePath;
        uploadSettings.load(function ():void {
          UploadManager.bulkUpload(uploadSettings, contentPath, files, function (response:XMLHttpRequest):void {
            for each(var w:FileWrapper in files) {
              var content:Content = w.getResultObject() as Content;
              DropItem.create(content, function (item:DropItem):void {
                addDropItem(item);
              });
            }
          });
        });
        EventUtil.invokeLater(MessageBox.hide);
        MessageBox.hide();
      });
    });
  }

  protected function getAddButtonVisibilityExpression(prop:MessageProperty, bindTo:ValueExpression):ValueExpression {
    return ValueExpressionFactory.createFromFunction(function ():Boolean {
      if (bindTo.getValue() === undefined) {
        return undefined;
      }
      var length:Number = bindTo.getValue().length;
      var maxItems:Number = prop.getMaxLength();
      return !maxItems || maxItems === 0 || maxItems > length;
    });
  }


  private function addDropItem(dropItem:DropItem):void {
    var values:Array = getItemsExpression().getValue();
    var newValues:Array = values.concat([dropItem]);
    getItemsExpression().setValue(newValues);

    var contents:Array = [];
    for each(var item:DropItem in newValues) {
      contents.push(item.getContent());
    }
    bindTo.setValue(contents);
  }


  public function removeDropItem(dropItem:DropItem):void {
    var result:Array = [];
    var values:Array = getItemsExpression().getValue();
    for each(var item:DropItem in values) {
      if (item.getId() !== dropItem.getId()) {
        result.push(item);
      }
    }
    getItemsExpression().setValue(result);

    var contents:Array = [];
    for each(var dItem:DropItem in result) {
      contents.push(dItem.getContent());
    }
    bindTo.setValue(contents);
  }

  /**
   * Custom add thumbnail method to ensure that the new
   * items are added at the beginning, so that the + button is always at the end.
   */
  protected static function addThumbnails(parent:DropContainer, children:Array):void {
    children = children.reverse();
    for each(var c:Component in children) {
      parent.insert(0, c);
    }
  }

  /**
   * Allows the creation of custom file objects using
   * the factory method passed as config param
   * @param fileObject the HTML5 file object
   * @return the FileWrapper object used for uploading
   */
  protected function createFileWrapper(fileObject:*):FileWrapper {
    var wrapper:FileWrapper = new FileWrapper(fileObject);
    return wrapper;
  }

  /**
   * The upload button handler, converts the selected files to FileWrapper objects.
   * @param browsePlugin the browse plugin used for the file selection and contains the file selection.
   */
  protected function uploadButtonHandler(browsePlugin:BrowsePlugin):void {
    var fileWrappers:Array = [];
    var fileList:* = browsePlugin.getFileList();
    for (var i:int = 0; i < fileList.length; i++) {
      var fileObject:* = fileList.item(i);
      var wrapper:FileWrapper = createFileWrapper(fileObject);
      fileWrappers.push(wrapper);
    }
    handleFileDrop(fileWrappers);
  }

  protected static function getDropItemKey(dropItem:DropItem):String {
    return "" + dropItem.getId();
  }

  override protected function onDestroy():void {
    bindTo.removeChangeListener(itemsChanged);
    super.onDestroy();
  }

  public function getItemsExpression(bindTo:ValueExpression = undefined):ValueExpression {
    if (!itemsExpression) {
      itemsExpression = ValueExpressionFactory.createFromValue([]);
    }

    return itemsExpression;
  }

  private function itemsChanged(ve:ValueExpression):void {
    var items:Array = ve.getValue();
    var result:Array = [];
    for each(var item:DropItem in items) {
      result.push(item.getContent());
    }
    bindTo.setValue(result);
  }

  public function getErrorMessage():String {
    var values:Array = bindTo.getValue();
    if(!values || values.length === 0) {
      var msg:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_noMedia_text');
      var message:String = StringUtil.format(msg, property.getDisplayName());
      return message;
    }

    return null;
  }
}
}
