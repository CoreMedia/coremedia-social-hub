Ext.define("com.coremedia.blueprint.social.beans.SocialHubAdapterImpl", function(SocialHubAdapterImpl) {/*package com.coremedia.blueprint.social.beans {
import com.coremedia.blueprint.social.channels.Colors;
import com.coremedia.cms.editor.sdk.editorContext;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.data.impl.RemoteBeanImpl;

[RestResource(uriTemplate="socialhub/adapter/{id:[^/]+}")]
public class SocialHubAdapterImpl extends RemoteBeanImpl implements SocialHubAdapter {

  private var messageProperties:Array;*/

  function SocialHubAdapterImpl$(path/*:String*/) {
    this.super$yceY(path);
  }/*

  public*/ function isReadOnly()/*:Boolean*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_READ_ONLY);
  }/*

  public*/ function isDirectPublication()/*:Boolean*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_SCHEDULING_SUPPORTED);
  }/*

  public*/ function isNativeHistory()/*:Boolean*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_NATIVE_HISTORY);
  }/*

  public*/ function isSchedulingSupported()/*:Boolean*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_SCHEDULING_SUPPORTED);
  }/*

  public*/ function getMessageProperties()/*:Array*/ {
    if (!this.messageProperties$yceY) {
      this.messageProperties$yceY = [];
      var json/*:Array*/ = this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_MESSAGE_PROPERTIES);
      for/* each*/(var $1=0;$1</* in*/ json.length;++$1) {var typeDef/*:Object*/ =json[$1];
        var propType/*:MessageProperty*/ = new com.coremedia.blueprint.social.beans.MessageProperty(typeDef);
        this.messageProperties$yceY.push(propType);
      }
    }
    return this.messageProperties$yceY;
  }/*

  public*/ function getAdapterId()/*:String*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_ID);
  }/*

  public*/ function getDisplayName()/*:String*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_DISPLAY_NAME);
  }/*

  public*/ function getType()/*:String*/ {
    var type/*:String*/ = this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_TYPE);
    if (type.indexOf('-') !== -1) {
      return type.substr(type.indexOf("-") + 1);
    }

    return type;
  }/*

  public*/ function getSentMessages()/*:Array*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_SENT_MESSAGES);
  }/*

  public*/ function getScheduledMessages()/*:Array*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES);
  }/*

  public*/ function setColor(color/*:String*/)/*:void*/ {
    var saveStateExpression/*:ValueExpression*/ = com.coremedia.ui.data.ValueExpressionFactory.create('socialHub.' + this.getAdapterId() + '.color', com.coremedia.cms.editor.sdk.editorContext.getPreferences());
    saveStateExpression.setValue(color);
  }/*

  public*/ function getColor()/*:String*/ {
    var saveStateExpression/*:ValueExpression*/ = com.coremedia.ui.data.ValueExpressionFactory.create('socialHub.' + this.getAdapterId() + '.color', com.coremedia.cms.editor.sdk.editorContext.getPreferences());
    var color/*:String*/ = saveStateExpression.getValue();
    if (!color) {
      color = com.coremedia.blueprint.social.channels.Colors.getColor();
      this.setColor(color);
    }
    return color;
  }/*

  public*/ function getHoverColor()/*:String*/ {
    return com.coremedia.blueprint.social.channels.Colors.getHoverColor(this.getColor());
  }/*

  public*/ function getPressedColor()/*:String*/ {
    return com.coremedia.blueprint.social.channels.Colors.getPressedColor(this.getColor());
  }/*

  public*/ function getPropertyKey(property/*:String*/)/*:String*/ {
    return this.getType().toLowerCase() + "_" + this.getAdapterId() + "_" + property;
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.ui.data.impl.RemoteBeanImpl",
      mixins: ["com.coremedia.blueprint.social.beans.SocialHubAdapter"],
      metadata: {"": [
        "RestResource",
        [
          "uriTemplate",
          "socialhub/adapter/{id:[^/]+}"
        ]
      ]},
      messageProperties$yceY: null,
      constructor: SocialHubAdapterImpl$,
      super$yceY: function() {
        com.coremedia.ui.data.impl.RemoteBeanImpl.prototype.constructor.apply(this, arguments);
      },
      isReadOnly: isReadOnly,
      isDirectPublication: isDirectPublication,
      isNativeHistory: isNativeHistory,
      isSchedulingSupported: isSchedulingSupported,
      getMessageProperties: getMessageProperties,
      getAdapterId: getAdapterId,
      getDisplayName: getDisplayName,
      getType: getType,
      getSentMessages: getSentMessages,
      getScheduledMessages: getScheduledMessages,
      setColor: setColor,
      getColor: getColor,
      getHoverColor: getHoverColor,
      getPressedColor: getPressedColor,
      getPropertyKey: getPropertyKey,
      requires: [
        "com.coremedia.blueprint.social.beans.SocialHubAdapter",
        "com.coremedia.cms.editor.sdk.editorContext",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.data.impl.RemoteBeanImpl"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.MessageProperty",
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames",
        "com.coremedia.blueprint.social.channels.Colors"
      ]
    };
});
