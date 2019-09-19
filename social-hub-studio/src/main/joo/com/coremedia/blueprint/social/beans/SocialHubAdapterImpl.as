package com.coremedia.blueprint.social.beans {
import com.coremedia.blueprint.social.channels.Colors;
import com.coremedia.cms.editor.sdk.editorContext;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.data.impl.RemoteBeanImpl;

[RestResource(uriTemplate="socialhub/adapter/{id:[^/]+}")]
public class SocialHubAdapterImpl extends RemoteBeanImpl implements SocialHubAdapter {

  private var messageProperties:Array;

  function SocialHubAdapterImpl(path:String) {
    super(path);
  }

  public function isReadOnly():Boolean {
    return get(SocialHubPropertyNames.ADAPTER_READ_ONLY);
  }

  public function isDirectPublication():Boolean {
    return get(SocialHubPropertyNames.ADAPTER_SCHEDULING_SUPPORTED);
  }

  public function isNativeHistory():Boolean {
    return get(SocialHubPropertyNames.ADAPTER_NATIVE_HISTORY);
  }

  public function isSchedulingSupported():Boolean {
    return get(SocialHubPropertyNames.ADAPTER_SCHEDULING_SUPPORTED);
  }

  public function getMessageProperties():Array {
    if (!messageProperties) {
      messageProperties = [];
      var json:Array = get(SocialHubPropertyNames.ADAPTER_MESSAGE_PROPERTIES);
      for each(var typeDef:Object in json) {
        var propType:MessageProperty = new MessageProperty(typeDef);
        messageProperties.push(propType);
      }
    }
    return messageProperties;
  }

  public function getAdapterId():String {
    return get(SocialHubPropertyNames.ADAPTER_ID);
  }

  public function getDisplayName():String {
    return get(SocialHubPropertyNames.ADAPTER_DISPLAY_NAME);
  }

  public function getType():String {
    var type:String = get(SocialHubPropertyNames.ADAPTER_TYPE);
    if (type.indexOf('-') !== -1) {
      return type.substr(type.indexOf("-") + 1);
    }

    return type;
  }

  public function getSentMessages():Array {
    return get(SocialHubPropertyNames.ADAPTER_SENT_MESSAGES);
  }

  public function getScheduledMessages():Array {
    return get(SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES);
  }

  public function setColor(color:String):void {
    var saveStateExpression:ValueExpression = ValueExpressionFactory.create('socialHub.' + getAdapterId() + '.color', editorContext.getPreferences());
    saveStateExpression.setValue(color);
  }

  public function getColor():String {
    var saveStateExpression:ValueExpression = ValueExpressionFactory.create('socialHub.' + getAdapterId() + '.color', editorContext.getPreferences());
    var color:String = saveStateExpression.getValue();
    if (!color) {
      color = Colors.getColor();
      setColor(color);
    }
    return color;
  }

  public function getHoverColor():String {
    return Colors.getHoverColor(getColor());
  }

  public function getPressedColor():String {
    return Colors.getPressedColor(getColor());
  }

  public function getPropertyKey(property:String):String {
    return getType().toLowerCase() + "_" + getAdapterId() + "_" + property;
  }
}
}
