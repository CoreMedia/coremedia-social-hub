package com.coremedia.blueprint.social.beans {

/**
 * The RemoteBean interface for a social message
 */
public interface ComposerModel {
  function getProperties():com.coremedia.blueprint.social.beans.ComposerModelProperties;

  function getAttachments():Array;

  function getPublicationDate():Date;

  function getMessageText():String;

  function getTitle():String;

  function getAdapterType():String;

  function send(callback:Function = undefined):void;

  function reset(callback:Function = undefined):void;
}
}