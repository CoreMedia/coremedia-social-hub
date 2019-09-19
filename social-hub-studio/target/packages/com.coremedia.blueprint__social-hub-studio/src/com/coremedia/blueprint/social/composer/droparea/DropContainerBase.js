Ext.define("com.coremedia.blueprint.social.composer.droparea.DropContainerBase", function(DropContainerBase) {/*package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.composer.MessageFieldEditor;
import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentPropertyNames;
import com.coremedia.cms.editor.sdk.components.html5.BrowsePlugin;
import com.coremedia.cms.editor.sdk.editorContext;
import com.coremedia.cms.editor.sdk.sites.Site;
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

  public*/ function DropContainerBase$(config/*:DropContainerBase = null*/) {if(arguments.length<=0)config=null;
    this.super$VeKl(config);
  }/*

  override protected*/ function afterRender()/*:void*/ {var this$=this;
    Ext.container.Container.prototype.afterRender.call(this);
    this.setupDropZone();

    AS3.getBindable(this,"bindTo").loadValue(function (items/*:Array*/)/*:void*/ {
      var result/*:Array*/ = [];
      for/* each*/(var $1=0;$1</* in*/ items.length;++$1) {var c/*:Content*/ =items[$1];
        var item/*:DropItem*/ = com.coremedia.blueprint.social.composer.droparea.DropItem.create(c);
        result.push(item);
      }

      com.coremedia.ui.data.ValueExpressionFactory.createFromFunction(function ()/*:Array*/ {
        for/* each*/(var $1=0;$1</* in*/ result.length;++$1) {var dropItem/*:DropItem*/ =result[$1];
          if (!dropItem.isLoaded()) {
            return undefined;
          }
        }
        return result;
      }).loadValue(function (loadedResult/*:Array*/)/*:void*/ {
        this$.getItemsExpression(AS3.getBindable(this$,"bindTo")).setValue(loadedResult);
        this$.getItemsExpression(AS3.getBindable(this$,"bindTo")).addChangeListener(AS3.bind(this$,"itemsChanged$VeKl"));
      });
    });
  }/*

  protected*/ function setupDropZone()/*:void*/ {
    // drop zone
    var dropZoneConfig/*:DropZone*/ = AS3.cast(Ext.dd.DropZone,{
      ddGroup: "ContentLinkDD"
    });

    var zone/*:DropContainerDropZone*/ = new com.coremedia.blueprint.social.composer.droparea.DropContainerDropZone(this, new com.coremedia.blueprint.social.composer.droparea.DropContainerDropModel(AS3.as(this,  com.coremedia.blueprint.social.composer.droparea.DropContainer)), dropZoneConfig);
    zone.addToGroup("ContentDD");
  }/*

  public*/ function handleContentDrop(contents/*:Array*/)/*:void*/ {var this$=this;
    com.coremedia.ui.util.EventUtil.invokeLater(function ()/*:void*/ {//otherwise the progress bar does not appear :(
      for (var i/*:int*/ = 0; i < contents.length; i++) {
        com.coremedia.blueprint.social.composer.droparea.DropItem.create(contents[i], function (item/*:DropItem*/)/*:void*/ {
          this$.addDropItem$VeKl(item);
        });
      }
    });
  }/*

  /**
   * Fired when a file object has been dropped on the target drop area.
   * The file drop plugin fire an event for each file that is dropped
   * and the corresponding action is handled here.
   * /
  protected*/ function handleFileDrop(files/*:Array*/)/*:void*/ {var this$=this;
    Ext.MessageBox.show({
      title: this.resourceManager.getString('com.coremedia.cms.editor.sdk.upload.Upload', 'Upload_progress_title'),
      msg: this.resourceManager.getString('com.coremedia.cms.editor.sdk.upload.Upload', 'Upload_progress_msg'),
      closable: false,
      width: 300
    });
    com.coremedia.ui.util.EventUtil.invokeLater(function ()/*:void*/ {//otherwise the progress bar does not appear :(
      var site/*:Site*/ = com.coremedia.cms.editor.sdk.editorContext.getSitesService().getPreferredSite();
      var uploadSettings/*:UploadSettings*/ = new com.coremedia.cms.editor.sdk.upload.UploadSettings(site.getId());
      var siteRelativePath/*:String*/ = this$.resourceManager.getString('com.coremedia.blueprint.social.SocialHubSettings', 'social_hub_content_upload_path');

      var siteRoot/*:Content*/ = site.getSiteRootFolder();
      com.coremedia.ui.data.ValueExpressionFactory.create(com.coremedia.cap.content.ContentPropertyNames.PATH, siteRoot).loadValue(function ()/*:void*/ {
        var contentPath/*:String*/ = siteRoot.getPath() + '/' + siteRelativePath;
        uploadSettings.load(function ()/*:void*/ {
          com.coremedia.cms.editor.sdk.upload.UploadManager.bulkUpload(uploadSettings, contentPath, files, function (response/*:XMLHttpRequest*/)/*:void*/ {
            for/* each*/(var $1=0;$1</* in*/ files.length;++$1) {var w/*:FileWrapper*/ =files[$1];
              var content/*:Content*/ =AS3.as( w.getResultObject(),  com.coremedia.cap.content.Content);
              com.coremedia.blueprint.social.composer.droparea.DropItem.create(content, function (item/*:DropItem*/)/*:void*/ {
                this$.addDropItem$VeKl(item);
              });
            }
          });
        });
        com.coremedia.ui.util.EventUtil.invokeLater(AS3.bind(Ext.MessageBox,"hide"));
        Ext.MessageBox.hide();
      });
    });
  }/*

  protected*/ function getAddButtonVisibilityExpression(prop/*:MessageProperty*/, bindTo/*:ValueExpression*/)/*:ValueExpression*/ {
    return com.coremedia.ui.data.ValueExpressionFactory.createFromFunction(function ()/*:Boolean*/ {
      if (bindTo.getValue() === undefined) {
        return undefined;
      }
      var length/*:Number*/ = bindTo.getValue().length;
      var maxItems/*:Number*/ = prop.getMaxLength();
      return !maxItems || maxItems === 0 || maxItems > length;
    });
  }/*


  private*/ function addDropItem(dropItem/*:DropItem*/)/*:void*/ {
    var values/*:Array*/ = this.getItemsExpression().getValue();
    var newValues/*:Array*/ = values.concat([dropItem]);
    this.getItemsExpression().setValue(newValues);

    var contents/*:Array*/ = [];
    for/* each*/(var $1=0;$1</* in*/ newValues.length;++$1) {var item/*:DropItem*/ =newValues[$1];
      contents.push(item.getContent());
    }
    AS3.getBindable(this,"bindTo").setValue(contents);
  }/*


  public*/ function removeDropItem(dropItem/*:DropItem*/)/*:void*/ {
    var result/*:Array*/ = [];
    var values/*:Array*/ = this.getItemsExpression().getValue();
    for/* each*/(var $1=0;$1</* in*/ values.length;++$1) {var item/*:DropItem*/ =values[$1];
      if (item.getId() !== dropItem.getId()) {
        result.push(item);
      }
    }
    this.getItemsExpression().setValue(result);

    var contents/*:Array*/ = [];
    for/* each*/(var $2=0;$2</* in*/ result.length;++$2) {var dItem/*:DropItem*/ =result[$2];
      contents.push(dItem.getContent());
    }
    AS3.getBindable(this,"bindTo").setValue(contents);
  }/*

  /**
   * Custom add thumbnail method to ensure that the new
   * items are added at the beginning, so that the + button is always at the end.
   * /
  protected static*/ function addThumbnails$static(parent/*:DropContainer*/, children/*:Array*/)/*:void*/ {
    children = children.reverse();
    for/* each*/(var $1=0;$1</* in*/ children.length;++$1) {var c/*:Component*/ =children[$1];
      parent.insert(0, c);
    }
  }/*

  /**
   * Allows the creation of custom file objects using
   * the factory method passed as config param
   * @param fileObject the HTML5 file object
   * @return the FileWrapper object used for uploading
   * /
  protected*/ function createFileWrapper(fileObject/*:**/)/*:FileWrapper*/ {
    var wrapper/*:FileWrapper*/ = new com.coremedia.cms.editor.sdk.upload.FileWrapper(fileObject);
    return wrapper;
  }/*

  /**
   * The upload button handler, converts the selected files to FileWrapper objects.
   * @param browsePlugin the browse plugin used for the file selection and contains the file selection.
   * /
  protected*/ function uploadButtonHandler(browsePlugin/*:BrowsePlugin*/)/*:void*/ {
    var fileWrappers/*:Array*/ = [];
    var fileList/*:**/ = browsePlugin.getFileList();
    for (var i/*:int*/ = 0; i < fileList.length; i++) {
      var fileObject/*:**/ = fileList.item(i);
      var wrapper/*:FileWrapper*/ = this.createFileWrapper(fileObject);
      fileWrappers.push(wrapper);
    }
    this.handleFileDrop(fileWrappers);
  }/*

  protected static*/ function getDropItemKey$static(dropItem/*:DropItem*/)/*:String*/ {
    return "" + dropItem.getId();
  }/*

  override protected*/ function onDestroy()/*:void*/ {
    AS3.getBindable(this,"bindTo").removeChangeListener(AS3.bind(this,"itemsChanged$VeKl"));
    Ext.container.Container.prototype.onDestroy.call(this);
  }/*

  public*/ function getItemsExpression(bindTo/*:ValueExpression = undefined*/)/*:ValueExpression*/ {
    if (!this.itemsExpression$VeKl) {
      this.itemsExpression$VeKl = com.coremedia.ui.data.ValueExpressionFactory.createFromValue([]);
    }

    return this.itemsExpression$VeKl;
  }/*

  private*/ function itemsChanged(ve/*:ValueExpression*/)/*:void*/ {
    var items/*:Array*/ = ve.getValue();
    var result/*:Array*/ = [];
    for/* each*/(var $1=0;$1</* in*/ items.length;++$1) {var item/*:DropItem*/ =items[$1];
      result.push(item.getContent());
    }
    AS3.getBindable(this,"bindTo").setValue(result);
  }/*

  public*/ function getErrorMessage()/*:String*/ {
    var values/*:Array*/ = AS3.getBindable(this,"bindTo").getValue();
    if(!values || values.length === 0) {
      var msg/*:String*/ = this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_noMedia_text');
      var message/*:String*/ = Ext.String.format(msg, AS3.getBindable(this,"property").getDisplayName());
      return message;
    }

    return null;
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      mixins: ["com.coremedia.blueprint.social.composer.MessageFieldEditor"],
      itemsExpression$VeKl: null,
      constructor: DropContainerBase$,
      super$VeKl: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      setupDropZone: setupDropZone,
      handleContentDrop: handleContentDrop,
      handleFileDrop: handleFileDrop,
      getAddButtonVisibilityExpression: getAddButtonVisibilityExpression,
      addDropItem$VeKl: addDropItem,
      removeDropItem: removeDropItem,
      createFileWrapper: createFileWrapper,
      uploadButtonHandler: uploadButtonHandler,
      onDestroy: onDestroy,
      getItemsExpression: getItemsExpression,
      itemsChanged$VeKl: itemsChanged,
      getErrorMessage: getErrorMessage,
      config: {
        bindTo: null,
        property: null,
        adapter: null
      },
      statics: {
        addThumbnails: addThumbnails$static,
        getDropItemKey: getDropItemKey$static
      },
      requires: [
        "Ext.String",
        "Ext.container.Container",
        "Ext.dd.DropZone",
        "Ext.window.MessageBox",
        "com.coremedia.blueprint.social.composer.MessageFieldEditor",
        "com.coremedia.cap.content.Content",
        "com.coremedia.cap.content.ContentPropertyNames",
        "com.coremedia.cms.editor.sdk.editorContext",
        "com.coremedia.cms.editor.sdk.upload.FileWrapper",
        "com.coremedia.cms.editor.sdk.upload.UploadManager",
        "com.coremedia.cms.editor.sdk.upload.UploadSettings",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.util.EventUtil"
      ],
      uses: [
        "com.coremedia.blueprint.social.composer.droparea.DropContainer",
        "com.coremedia.blueprint.social.composer.droparea.DropContainerDropModel",
        "com.coremedia.blueprint.social.composer.droparea.DropContainerDropZone",
        "com.coremedia.blueprint.social.composer.droparea.DropItem"
      ]
    };
});
