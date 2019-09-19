package com.coremedia.blueprint.social.composer.droparea {
import ext.container.Container;

public class AddItemButtonBase extends ext.container.Container {
  [Bindable(event = "DUMMY")]
  public var uploadButtonHandler:Function;

  public function AddItemButtonBase(config:com.coremedia.blueprint.social.composer.droparea.AddItemButtonBase = null) {
    super();
  }
}
}