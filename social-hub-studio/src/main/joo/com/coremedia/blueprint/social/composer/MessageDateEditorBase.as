package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField;
import com.coremedia.ui.data.ValueExpression;

import ext.panel.Panel;

public class MessageDateEditorBase extends Panel {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public function MessageDateEditorBase(config:MessageDateEditorBase = null) {
    super(config);
  }


  override protected function afterRender():void {
    super.afterRender();

    var dateTime:DateTimePropertyField = queryById('dateTimePropertyField') as DateTimePropertyField;
    dateTime.fieldLabel = property.getDisplayName();
  }
}
}
