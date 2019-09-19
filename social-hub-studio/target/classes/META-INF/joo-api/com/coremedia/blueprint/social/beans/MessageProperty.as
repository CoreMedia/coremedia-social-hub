package com.coremedia.blueprint.social.beans {

public class MessageProperty {
  public static const TYPE_TEXT:String = "TEXT";

  public static const TYPE_TEXTAREA:String = "TEXTAREA";

  public static const TYPE_DATE:String = "DATE";

  public static const TYPE_ASSETLIST:String = "ASSETLIST";

  public static const TYPE_CHOICE:String = "CHOICE";

  public function MessageProperty(json:Object) {
    super();
  }

  public native function getPropertyType():String;

  /**
   * The name of the property.
   */
  public native function getName():String;

  public native function getOptions():Array;

  public native function getDefaultOption():String;

  /**
   * The optional display name.
   * If this value is null, Studio will try to find a matching
   * resource value for the return value of getName()
   */
  public native function getDisplayName():String;

  public native function getEmptyText():String;

  /**
   * The maximum length of the property:
   * e.g. the maximum amounts of assets or maxlength of a text.
   */
  public native function getMaxLength():Number;

  /**
   * True if the property must have a value.
   * @return
   */
  public native function isRequired():Boolean;
}
}