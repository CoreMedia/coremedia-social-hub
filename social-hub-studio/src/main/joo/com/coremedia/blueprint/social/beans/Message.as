package com.coremedia.blueprint.social.beans {

/**
 * The RemoteBean interface for a social message
 */
public interface Message {
  function getProperties():MessageProperties;

  function getMessageId():String;

  function getAdapter():SocialHubAdapter;

  function getMessageState():String;

  function getPublicationDate():Date;

  function getUrl():String;

  function deleteFromScheduler(callback:Function):void;

  function getMessageContainerDescriptors():Array;
}
}
