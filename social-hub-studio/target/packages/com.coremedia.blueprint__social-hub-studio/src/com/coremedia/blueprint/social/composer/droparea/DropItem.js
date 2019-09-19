Ext.define("com.coremedia.blueprint.social.composer.droparea.DropItem", function(DropItem) {/*package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.cap.content.Content;

public class DropItem {
  private var content:Content;
  private var name:String;
  private var id:String;

  public*/ function DropItem$() {
  }/*

  public static*/ function create$static(content/*:Content*/, callback/*:Function = null*/)/*:DropItem*/ {if(arguments.length<=1)callback=null;
    var dropItem/*:DropItem*/ = new DropItem();
    dropItem.content$2Ims = content;
    dropItem.id$2Ims = content.getUriPath();
    content.load(function ()/*:void*/ {
      dropItem.setName(content.getName());
      if(callback) {
        callback(dropItem);
      }
    });
    return dropItem;
  }/*

  public*/ function isLoaded()/*:Boolean*/ {
    if (this.content$2Ims) {
      var loaded/*:Boolean*/ = this.content$2Ims.isLoaded();
      if(!loaded) {
        this.content$2Ims.load();
      }
      return loaded;
    }
    return true;
  }/*

  public*/ function getContent()/*:Content*/ {
    return this.content$2Ims;
  }/*

  public*/ function setName(name/*:String*/)/*:void*/ {
    this.name$2Ims = name;
  }/*

  public*/ function getName()/*:String*/ {
    return this.name$2Ims;
  }/*

  public*/ function getId()/*:String*/ {
    return this.id$2Ims;
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      content$2Ims: null,
      name$2Ims: null,
      id$2Ims: null,
      constructor: DropItem$,
      isLoaded: isLoaded,
      getContent: getContent,
      setName: setName,
      getName: getName,
      getId: getId,
      statics: {create: create$static}
    };
});
