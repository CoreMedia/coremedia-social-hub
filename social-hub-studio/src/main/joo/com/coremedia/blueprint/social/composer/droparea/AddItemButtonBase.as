package com.coremedia.blueprint.social.composer.droparea {
import ext.container.Container;

public class AddItemButtonBase extends Container {

  [Bindable]
  public var uploadButtonHandler:Function;

  public function AddItemButtonBase(config:AddItemButtonBase = null) {
    super(config);
  }
}
}
