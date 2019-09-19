package com.coremedia.blueprint.social.composer.droparea {
import com.coremedia.cap.content.Content;

public class DropItem {
  private var content:Content;
  private var name:String;
  private var id:String;

  public function DropItem() {
  }

  public static function create(content:Content, callback:Function = null):DropItem {
    var dropItem:DropItem = new DropItem();
    dropItem.content = content;
    dropItem.id = content.getUriPath();
    content.load(function ():void {
      dropItem.setName(content.getName());
      if(callback) {
        callback(dropItem);
      }
    });
    return dropItem;
  }

  public function isLoaded():Boolean {
    if (content) {
      var loaded:Boolean = content.isLoaded();
      if(!loaded) {
        content.load();
      }
      return loaded;
    }
    return true;
  }

  public function getContent():Content {
    return content;
  }

  public function setName(name:String):void {
    this.name = name;
  }

  public function getName():String {
    return name;
  }

  public function getId():String {
    return id;
  }
}
}
