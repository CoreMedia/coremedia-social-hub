import Config from "@jangaroo/runtime/Config";
import { as, asConfig, bind, mixin } from "@jangaroo/runtime";
import SocialHubSettings_properties from "../../SocialHubSettings_properties";
import SocialHub_properties from "../../SocialHub_properties";
import MessageProperty from "../../beans/MessageProperty";
import SocialHubAdapter from "../../beans/SocialHubAdapter";
import MessageFieldEditor from "../MessageFieldEditor";
import DropContainer from "./DropContainer";
import DropContainerDropModel from "./DropContainerDropModel";
import DropContainerDropZone from "./DropContainerDropZone";
import DropItem from "./DropItem";
import Upload_properties from "@coremedia/studio-client.cap-base-models/upload/Upload_properties";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ContentPropertyNames from "@coremedia/studio-client.cap-rest-client/content/ContentPropertyNames";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import EventUtil from "@coremedia/studio-client.client-core/util/EventUtil";
import BrowsePlugin from "@coremedia/studio-client.main.editor-components/sdk/components/html5/BrowsePlugin";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import FileWrapper from "@coremedia/studio-client.main.editor-components/sdk/upload/FileWrapper";
import UploadManager from "@coremedia/studio-client.main.editor-components/sdk/upload/UploadManager";
import UploadSettings from "@coremedia/studio-client.main.editor-components/sdk/upload/UploadSettings";
import Site from "@coremedia/studio-client.multi-site-models/Site";
import Component from "@jangaroo/ext-ts/Component";
import StringUtil from "@jangaroo/ext-ts/String";
import Container from "@jangaroo/ext-ts/container/Container";
import DropZone from "@jangaroo/ext-ts/dd/DropZone";
import MessageBoxWindow from "@jangaroo/ext-ts/window/MessageBox";
import int from "@jangaroo/runtime/int";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface DropContainerBaseConfig extends Config<Container>, Partial<Pick<DropContainerBase,
  "bindTo" |
  "property" |
  "adapter"
>> {
}



class DropContainerBase extends Container implements MessageFieldEditor {
  declare Config: DropContainerBaseConfig;
  bindTo:ValueExpression = null;

  property:MessageProperty = null;

  adapter:SocialHubAdapter = null;

  #itemsExpression:ValueExpression = null;

  constructor(config:Config<DropContainerBase> = null) {
    super(config);
  }

  protected override afterRender():void {
    super.afterRender();
    this.setupDropZone();

    this.bindTo.loadValue((items:Array<any>):void => {
      var result = [];
      if(!items) {
        items = [];
      }

      for(var c of items as Content[]) {
        var item = DropItem.create(c);
        result.push(item);
      }

      ValueExpressionFactory.createFromFunction(():Array<any> => {
        for(var dropItem of result as DropItem[]) {
          if (!dropItem.isLoaded()) {
            return undefined;
          }
        }
        return result;
      }).loadValue((loadedResult:Array<any>):void => {
        this.getItemsExpression(this.bindTo).setValue(loadedResult);
        this.getItemsExpression(this.bindTo).addChangeListener(bind(this,this.#itemsChanged));
      });
    });
  }

  protected setupDropZone():void {
    // drop zone
    var dropZoneConfig = Config(DropZone, {
      ddGroup: "ContentLinkDD"
    });

    var zone = new DropContainerDropZone(this, new DropContainerDropModel(as(this,  DropContainer)), dropZoneConfig);
    zone.addToGroup("ContentDD");
  }

  handleContentDrop(contents:Array<any>):void {
    EventUtil.invokeLater(():void => {//otherwise the progress bar does not appear :(
      for (var i = 0; i < contents.length; i++) {
        DropItem.create(contents[i], (item:DropItem):void => 
          this.#addDropItem(item)
        );
      }
    });
  }

  /**
   * Fired when a file object has been dropped on the target drop area.
   * The file drop plugin fire an event for each file that is dropped
   * and the corresponding action is handled here.
   */
  protected handleFileDrop(files:Array<any>):void {
    MessageBoxWindow.getInstance().show({
      title: Upload_properties.Upload_progress_title,
      msg: Upload_properties.Upload_progress_msg,
      closable: false,
      width: 300
    });
    EventUtil.invokeLater(():void => {//otherwise the progress bar does not appear :(
      var site = editorContext._.getSitesService().getPreferredSite();
      var uploadSettings = new UploadSettings(site.getId());
      var siteRelativePath = SocialHubSettings_properties.social_hub_content_upload_path;

      var siteRoot = site.getSiteRootFolder();
      ValueExpressionFactory.create(ContentPropertyNames.PATH, siteRoot).loadValue(():void => {
        var contentPath = siteRoot.getPath() + "/" + siteRelativePath;
        uploadSettings.load(():void => 
          UploadManager.bulkUpload(uploadSettings, contentPath, files, (response:XMLHttpRequest):void => {
            for(var w of files as FileWrapper[]) {
              var content =as( w.getResultObject(),  Content);
              DropItem.create(content, (item:DropItem):void => 
                this.#addDropItem(item)
              );
            }
          })
        );
        EventUtil.invokeLater(bind(MessageBoxWindow.getInstance(),MessageBoxWindow.getInstance().hide));
        MessageBoxWindow.getInstance().hide();
      });
    });
  }

  protected getAddButtonVisibilityExpression(prop:MessageProperty, bindTo:ValueExpression):ValueExpression {
    return ValueExpressionFactory.createFromFunction(():boolean => {
      if (bindTo.getValue() === undefined) {
        return undefined;
      }
      var length:number = bindTo.getValue().length;
      var maxItems = prop.getMaxLength();
      return !maxItems || maxItems === 0 || maxItems > length;
    });
  }


  #addDropItem(dropItem:DropItem):void {
    var values:Array<any> = this.getItemsExpression().getValue();
    var newValues = values.concat([dropItem]);
    this.getItemsExpression().setValue(newValues);

    var contents = [];
    for(var item of newValues as DropItem[]) {
      contents.push(item.getContent());
    }
    this.bindTo.setValue(contents);
  }


  removeDropItem(dropItem:DropItem):void {
    var result = [];
    var values:Array<any> = this.getItemsExpression().getValue();
    for(var item of values as DropItem[]) {
      if (item.getId() !== dropItem.getId()) {
        result.push(item);
      }
    }
    this.getItemsExpression().setValue(result);

    var contents = [];
    for(var dItem of result as DropItem[]) {
      contents.push(dItem.getContent());
    }
    this.bindTo.setValue(contents);
  }

  /**
   * Custom add thumbnail method to ensure that the new
   * items are added at the beginning, so that the + button is always at the end.
   */
  protected static addThumbnails(parent:DropContainer, children:Array<any>):void {
    children = children.reverse();
    for(var c of children as Component[]) {
      parent.insert(0, c);
    }
  }

  /**
   * Allows the creation of custom file objects using
   * the factory method passed as config param
   * @param fileObject the HTML5 file object
   * @return the FileWrapper object used for uploading
   */
  protected createFileWrapper(fileObject:any):FileWrapper {
    var wrapper = new FileWrapper(fileObject);
    return wrapper;
  }

  /**
   * The upload button handler, converts the selected files to FileWrapper objects.
   * @param browsePlugin the browse plugin used for the file selection and contains the file selection.
   */
  protected uploadButtonHandler(browsePlugin:BrowsePlugin):void {
    var fileWrappers = [];
    var fileList:any = browsePlugin.getFileList();
    for (var i = 0; i < fileList.length; i++) {
      var fileObject:any = fileList.item(i);
      var wrapper = this.createFileWrapper(fileObject);
      fileWrappers.push(wrapper);
    }
    this.handleFileDrop(fileWrappers);
  }

  protected static getDropItemKey(dropItem:DropItem):string {
    return "" + dropItem.getId();
  }

  protected override onDestroy():void {
    this.bindTo.removeChangeListener(bind(this,this.#itemsChanged));
    super.onDestroy();
  }

  getItemsExpression(bindTo?:ValueExpression):ValueExpression {
    if (!this.#itemsExpression) {
      this.#itemsExpression = ValueExpressionFactory.createFromValue([]);
    }

    return this.#itemsExpression;
  }

  #itemsChanged(ve:ValueExpression):void {
    var items:Array<any> = ve.getValue();
    var result = [];
    for(var item of items as DropItem[]) {
      result.push(item.getContent());
    }
    this.bindTo.setValue(result);
  }

  getErrorMessage():string {
    var values:Array<any> = this.bindTo.getValue();
    if(!values || values.length === 0) {
      var msg = SocialHub_properties.messsage_property_error_noMedia_text;
      var message = StringUtil.format(msg, this.property.getDisplayName());
      return message;
    }

    return null;
  }
}
mixin(DropContainerBase, MessageFieldEditor);

export default DropContainerBase;
