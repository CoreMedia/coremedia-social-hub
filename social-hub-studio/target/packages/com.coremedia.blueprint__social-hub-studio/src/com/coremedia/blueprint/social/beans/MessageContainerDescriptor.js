Ext.define("com.coremedia.blueprint.social.beans.MessageContainerDescriptor", function(MessageContainerDescriptor) {/*package com.coremedia.blueprint.social.beans {
public class MessageContainerDescriptor {
  private var data:Object;

  public*/ function MessageContainerDescriptor$(data/*:Object*/) {
    this.data$QsA4 = data;
  }/*

  public*/ function getValue()/*:Object*/ {
    return this.data$QsA4.value;
  }/*

  public*/ function getType()/*:String*/ {
    return this.data$QsA4.type;
  }/*

  public*/ function showLabel()/*:Boolean*/ {
    return this.data$QsA4.showLabel;
  }/*

  public*/ function getScripts()/*:Array*/ {
    return this.data$QsA4[com.coremedia.blueprint.social.beans.SocialHubPropertyNames.DESCRIPTOR_SCRIPTS] || [];
  }/*

  public*/ function getScriplets()/*:Array*/ {
    return this.data$QsA4[com.coremedia.blueprint.social.beans.SocialHubPropertyNames.DESCRIPTOR_SCRIPLETS] || [];
  }/*

  public*/ function isExcluded()/*:Boolean*/ {
    return this.data$QsA4[com.coremedia.blueprint.social.beans.SocialHubPropertyNames.DESCRIPTOR_EXCLUDED];
  }/*

  public*/ function getPropertyName()/*:String*/ {
    return this.data$QsA4[com.coremedia.blueprint.social.beans.SocialHubPropertyNames.DESCRIPTOR_PROPERTY_NAME];
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      data$QsA4: null,
      constructor: MessageContainerDescriptor$,
      getValue: getValue,
      getType: getType,
      showLabel: showLabel,
      getScripts: getScripts,
      getScriplets: getScriplets,
      isExcluded: isExcluded,
      getPropertyName: getPropertyName,
      uses: ["com.coremedia.blueprint.social.beans.SocialHubPropertyNames"]
    };
});
