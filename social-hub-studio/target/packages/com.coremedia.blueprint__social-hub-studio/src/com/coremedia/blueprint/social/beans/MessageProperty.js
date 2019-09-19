Ext.define("com.coremedia.blueprint.social.beans.MessageProperty", function(MessageProperty) {/*package com.coremedia.blueprint.social.beans {
import mx.resources.ResourceManager;

public class MessageProperty {
  public static const TYPE_TEXT:String = "TEXT";
  public static const TYPE_TEXTAREA:String = "TEXTAREA";
  public static const TYPE_DATE:String = "DATE";
  public static const TYPE_ASSETLIST:String = "ASSETLIST";
  public static const TYPE_CHOICE:String = "CHOICE";

  private var data:Object;

  public*/ function MessageProperty$(json/*:Object*/) {
    this.data$6DAX = json;
  }/*

  public*/ function getPropertyType()/*:String*/ {
    return this.data$6DAX.type;
  }/*

  /**
   * The name of the property.
   * /
  public*/ function getName()/*:String*/ {
    return this.data$6DAX.name;
  }/*

  public*/ function getOptions()/*:Array*/ {
    return this.data$6DAX.options;
  }/*

  public*/ function getDefaultOption()/*:String*/ {
    return this.data$6DAX.defaultOption;
  }/*

  /**
   * The optional display name.
   * If this value is null, Studio will try to find a matching
   * resource value for the return value of getName()
   * /
  public*/ function getDisplayName()/*:String*/ {
    var displayName/*:String*/ = this.data$6DAX.displayName;
    if(!displayName) {
      displayName = mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'message_property_' + this.getName().toLowerCase());
      if(!displayName) {
        displayName = camelizeWithWhitespace$static(this.getName());
      }
    }
    return displayName;
  }/*

  public*/ function getEmptyText()/*:String*/ {
    var emptyText/*:String*/ = mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'message_property_' + this.getName().toLowerCase() + "_emptyText");
    if(!emptyText) {
      emptyText = mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'message_property_emptyText');
    }
    return emptyText;
  }/*

  /**
   * The maximum length of the property:
   * e.g. the maximum amounts of assets or maxlength of a text.
   * /
  public*/ function getMaxLength()/*:Number*/ {
    return this.data$6DAX.maxLength;
  }/*

  /**
   * True if the property must have a value.
   * @return
   * /
  public*/ function isRequired()/*:Boolean*/ {
    return this.data$6DAX.required;
  }/*

  private static*/ function camelizeWithWhitespace$static(str/*:String*/)/*:String*/ {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter/*:**/, index/*:**/)/*:String*/ {
      return letter.toUpperCase();
    }).replace(/\s+/g, ' ');
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      data$6DAX: null,
      constructor: MessageProperty$,
      getPropertyType: getPropertyType,
      getName: getName,
      getOptions: getOptions,
      getDefaultOption: getDefaultOption,
      getDisplayName: getDisplayName,
      getEmptyText: getEmptyText,
      getMaxLength: getMaxLength,
      isRequired: isRequired,
      statics: {
        TYPE_TEXT: "TEXT",
        TYPE_TEXTAREA: "TEXTAREA",
        TYPE_DATE: "DATE",
        TYPE_ASSETLIST: "ASSETLIST",
        TYPE_CHOICE: "CHOICE"
      },
      requires: ["mx.resources.ResourceManager"]
    };
});
