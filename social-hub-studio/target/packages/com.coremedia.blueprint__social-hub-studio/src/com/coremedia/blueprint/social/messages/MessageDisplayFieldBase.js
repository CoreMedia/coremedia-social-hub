Ext.define("com.coremedia.blueprint.social.messages.MessageDisplayFieldBase", function(MessageDisplayFieldBase) {/*package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.MessageContainerDescriptor;
import com.coremedia.ui.data.ValueExpression;

import ext.container.Container;

public class MessageDisplayFieldBase extends Container {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var messageContainerDescriptor:MessageContainerDescriptor;

  public*/ function MessageDisplayFieldBase$(config/*:MessageDisplayFieldBase = null*/) {if(arguments.length<=0)config=null;
    this.super$Wvo_(config);
  }/*

  protected*/ function localizeFieldName(name/*:String*/)/*:String*/ {
    var label/*:String*/ = this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'message_property_' + name);
    if (label) {
      return label;
    }

    return MessageDisplayFieldBase.camelizeWithWhitespace(name);
  }/*

  public static*/ function camelizeWithWhitespace$static(str/*:String*/)/*:String*/ {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter/*:**/, index/*:**/)/*:String*/ {
      return letter.toUpperCase();
    }).replace(/\s+/g, ' ');
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      constructor: MessageDisplayFieldBase$,
      super$Wvo_: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      localizeFieldName: localizeFieldName,
      config: {
        bindTo: null,
        messageContainerDescriptor: null
      },
      statics: {camelizeWithWhitespace: camelizeWithWhitespace$static},
      requires: ["Ext.container.Container"]
    };
});
