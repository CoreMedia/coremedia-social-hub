package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.ui.data.ValueExpression;

import ext.panel.Panel;

public class MessageTextEditorBase extends Panel {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function MessageTextEditorBase(config:MessageTextEditorBase = null) {
    super(config);
  }
}
}
