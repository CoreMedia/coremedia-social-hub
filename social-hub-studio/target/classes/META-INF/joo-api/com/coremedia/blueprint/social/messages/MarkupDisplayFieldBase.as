package com.coremedia.blueprint.social.messages {

public class MarkupDisplayFieldBase extends com.coremedia.blueprint.social.messages.MessageDisplayFieldBase {
  public function MarkupDisplayFieldBase(config:com.coremedia.blueprint.social.messages.MarkupDisplayFieldBase = null) {
    super();
  }

  override protected native function afterRender():void;
}
}