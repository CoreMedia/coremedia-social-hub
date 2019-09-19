package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteBeanImpl;
import com.coremedia.ui.data.impl.SubBean;

[RestResource(uriTemplate = "socialhub/adapter/{adapterId:[^/]+}/message/{id:[^/]+}")]
public class MessageImpl extends com.coremedia.ui.data.impl.RemoteBeanImpl implements com.coremedia.blueprint.social.beans.Message {
  public native function getProperties():com.coremedia.blueprint.social.beans.MessageProperties;

  override protected native function isSubObject(value:*, propertyPath:*):Boolean;

  override protected native function createSubBean(propertyPathPrefix:String):com.coremedia.ui.data.impl.SubBean;

  public native function getMessageId():String;

  public native function getAdapter():com.coremedia.blueprint.social.beans.SocialHubAdapter;

  public native function getMessageState():String;

  public native function getPublicationDate():Date;

  public native function getUrl():String;

  public native function getMessageContainerDescriptors():Array;

  public native function deleteFromScheduler(callback:Function):void;
}
}