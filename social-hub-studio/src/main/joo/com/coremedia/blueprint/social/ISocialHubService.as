package com.coremedia.blueprint.social {
import com.coremedia.blueprint.social.beans.ComposerModel;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.cap.content.Content;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.mixins.ValidationState;

public interface ISocialHubService {

  function getAdaptersExpression():ValueExpression;

  function getComposerModel(adapterId:String):ComposerModel;

  function initComposerModel(adapterId:String, contents:Array, callback:Function):void;

  function getMediaType(content:Content):String;

  function getAdapter(adapterId:String):SocialHubAdapter;

  function focusAndReload(socialHubAdapter:SocialHubAdapter):void;

  function showToast(title:String, msg:String, validationState:ValidationState = null):void;

  function focusAdapter(adapter:SocialHubAdapter, callback:Function):void;
}
}
