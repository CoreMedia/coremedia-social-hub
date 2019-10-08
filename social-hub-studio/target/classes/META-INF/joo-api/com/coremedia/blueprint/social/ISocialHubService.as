package com.coremedia.blueprint.social {
import com.coremedia.blueprint.social.beans.ComposerModel;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.cap.content.Content;
import com.coremedia.ui.data.ValueExpression;

public interface ISocialHubService {
  function getAdaptersExpression():com.coremedia.ui.data.ValueExpression;

  function getComposerModel(adapterId:String):com.coremedia.blueprint.social.beans.ComposerModel;

  function initComposerModel(adapterId:String, contents:Array, callback:Function):void;

  function getMediaType(content:com.coremedia.cap.content.Content):String;

  function getAdapter(adapterId:String):com.coremedia.blueprint.social.beans.SocialHubAdapter;

  function focusAndReload(socialHubAdapter:com.coremedia.blueprint.social.beans.SocialHubAdapter):void;
}
}