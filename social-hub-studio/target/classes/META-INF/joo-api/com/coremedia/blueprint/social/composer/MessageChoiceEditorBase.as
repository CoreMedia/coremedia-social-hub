package com.coremedia.blueprint.social.composer {
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.ui.data.ValueExpression;
import ext.panel.Panel;

public class MessageChoiceEditorBase extends ext.panel.Panel implements com.coremedia.blueprint.social.composer.MessageFieldEditor {
  [Bindable(event = "DUMMY")]
  public var bindTo:com.coremedia.ui.data.ValueExpression;

  [Bindable(event = "DUMMY")]
  public var property:com.coremedia.blueprint.social.beans.MessageProperty;

  [Bindable(event = "DUMMY")]
  public var adapter:com.coremedia.blueprint.social.beans.SocialHubAdapter;

  public function MessageChoiceEditorBase(config:com.coremedia.blueprint.social.composer.MessageChoiceEditorBase = null) {
    super();
  }

  override protected native function afterRender():void;

  public static native function getStore(property:com.coremedia.blueprint.social.beans.MessageProperty):Array;

  public native function getErrorMessage():String;
}
}