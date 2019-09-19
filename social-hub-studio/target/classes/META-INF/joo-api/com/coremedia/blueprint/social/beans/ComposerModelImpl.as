package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteBeanImpl;
import com.coremedia.ui.data.impl.SubBean;

[RestResource(uriTemplate = "socialhub/composermodel/{id:[^/]+}/{adapterId:[^/]+}")]
public class ComposerModelImpl extends com.coremedia.ui.data.impl.RemoteBeanImpl implements com.coremedia.blueprint.social.beans.ComposerModel {
  override public native function get(property:*):*;

  override protected native function isSubObject(value:*, propertyPath:*):Boolean;

  override protected native function createSubBean(propertyPathPrefix:String):com.coremedia.ui.data.impl.SubBean;

  public native function getProperties():com.coremedia.blueprint.social.beans.ComposerModelProperties;

  public native function getAttachments():Array;

  public native function getAdapterType():String;

  public native function getPublicationDate():Date;

  public native function getMessageText():String;

  public native function getTitle():String;

  public native function send(callback:Function = undefined):void;

  public native function reset(callback:Function = undefined):void;
}
}