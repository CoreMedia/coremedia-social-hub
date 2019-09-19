package com.coremedia.blueprint.social {
import com.coremedia.blueprint.social.beans.ComposerModel;
import com.coremedia.cap.content.Content;
import com.coremedia.ui.data.ValueExpression;

public class SocialHubServiceImpl implements com.coremedia.blueprint.social.ISocialHubService {
  public native function getAdaptersExpression():com.coremedia.ui.data.ValueExpression;

  public native function getMediaType(content:com.coremedia.cap.content.Content):String;

  public native function getComposerModel(adapterId:String):com.coremedia.blueprint.social.beans.ComposerModel;

  public native function initComposerModel(adapterId:String, contents:Array, callback:Function):void;
}
}