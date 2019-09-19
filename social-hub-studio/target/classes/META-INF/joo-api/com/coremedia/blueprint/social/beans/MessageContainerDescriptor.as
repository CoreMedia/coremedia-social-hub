package com.coremedia.blueprint.social.beans {

public class MessageContainerDescriptor {
  public function MessageContainerDescriptor(data:Object) {
    super();
  }

  public native function getValue():Object;

  public native function getType():String;

  public native function showLabel():Boolean;

  public native function getScripts():Array;

  public native function getScriplets():Array;

  public native function isExcluded():Boolean;

  public native function getPropertyName():String;
}
}