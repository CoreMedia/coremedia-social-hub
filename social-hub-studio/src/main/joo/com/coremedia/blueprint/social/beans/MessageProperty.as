package com.coremedia.blueprint.social.beans {
import mx.resources.ResourceManager;

public class MessageProperty {
  public static const TYPE_TEXT:String = "TEXT";
  public static const TYPE_TEXTAREA:String = "TEXTAREA";
  public static const TYPE_DATE:String = "DATE";
  public static const TYPE_ASSETLIST:String = "ASSETLIST";
  public static const TYPE_CHOICE:String = "CHOICE";

  private var data:Object;

  public function MessageProperty(json:Object) {
    this.data = json;
  }

  public function getPropertyType():String {
    return data.type;
  }

  /**
   * The name of the property.
   */
  public function getName():String {
    return data.name;
  }

  public function getOptions():Array {
    return data.options;
  }

  public function getDefaultOption():String {
    return data.defaultOption;
  }

  /**
   * The optional display name.
   * If this value is null, Studio will try to find a matching
   * resource value for the return value of getName()
   */
  public function getDisplayName():String {
    var displayName:String = data.displayName;
    if(!displayName) {
      displayName = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'message_property_' + getName().toLowerCase());
      if(!displayName) {
        displayName = camelizeWithWhitespace(getName());
      }
    }
    return displayName;
  }

  public function getEmptyText():String {
    var emptyText:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'message_property_' + getName().toLowerCase() + "_emptyText");
    if(!emptyText) {
      emptyText = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'message_property_emptyText');
    }
    return emptyText;
  }

  /**
   * The maximum length of the property:
   * e.g. the maximum amounts of assets or maxlength of a text.
   */
  public function getMaxLength():Number {
    return data.maxLength;
  }

  /**
   * True if the property must have a value.
   * @return
   */
  public function isRequired():Boolean {
    return data.required;
  }

  private static function camelizeWithWhitespace(str:String):String {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter:*, index:*):String {
      return letter.toUpperCase();
    }).replace(/\s+/g, ' ');
  }
}
}
