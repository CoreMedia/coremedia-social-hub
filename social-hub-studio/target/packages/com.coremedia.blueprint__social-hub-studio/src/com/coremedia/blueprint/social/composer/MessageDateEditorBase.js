Ext.define("com.coremedia.blueprint.social.composer.MessageDateEditorBase", function(MessageDateEditorBase) {/*package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.mixins.IValidationStateMixin;
import com.coremedia.ui.mixins.ValidationState;

import ext.StringUtil;
import ext.panel.Panel;

public class MessageDateEditorBase extends Panel implements MessageFieldEditor {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public*/ function MessageDateEditorBase$(config/*:MessageDateEditorBase = null*/) {if(arguments.length<=0)config=null;
    this.super$jtQr(config);
    if(AS3.getBindable(this,"property").getDefaultOption()) {
      AS3.getBindable(this,"bindTo").setValue(AS3.getBindable(this,"property").getDefaultOption());
    }
  }/*

  override protected*/ function afterRender()/*:void*/ {
    Ext.panel.Panel.prototype.afterRender.call(this);

    var dateTime/*:DateTimePropertyField*/ =AS3.as( this.queryById('dateTimePropertyField'),  com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField);
    AS3.setBindable(dateTime,"fieldLabel" , AS3.getBindable(this,"property").getDisplayName());
  }/*

  private*/ function valueChanged(ve/*:ValueExpression*/)/*:void*/ {
    var editor/*:**/ = this.queryById(AS3.getBindable(this,"property").getName());
    var statefulEditor/*:IValidationStateMixin*/ =AS3.as( editor,  com.coremedia.ui.mixins.ValidationStateMixin);
    if (!ve.getValue() || Ext.String.trim(ve.getValue()).length === 0) {
      AS3.setBindable(statefulEditor,"validationState" , com.coremedia.ui.mixins.ValidationState.ERROR);
    }
    else {
      AS3.setBindable(statefulEditor,"validationState" , undefined);
    }
  }/*

  public*/ function getErrorMessage()/*:String*/ {
    if (!AS3.getBindable(this,"bindTo").getValue()) {
      var msg/*:String*/ = this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_empty_text');
      var message/*:String*/ = Ext.String.format(msg, AS3.getBindable(this,"property").getDisplayName());
      return message;
    }
    return null;
  }/*

}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.panel.Panel",
      mixins: ["com.coremedia.blueprint.social.composer.MessageFieldEditor"],
      constructor: MessageDateEditorBase$,
      super$jtQr: function() {
        Ext.panel.Panel.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      valueChanged$jtQr: valueChanged,
      getErrorMessage: getErrorMessage,
      config: {
        bindTo: null,
        property: null,
        adapter: null
      },
      requires: [
        "Ext.String",
        "Ext.panel.Panel",
        "com.coremedia.blueprint.social.composer.MessageFieldEditor",
        "com.coremedia.cms.editor.sdk.premular.fields.DateTimePropertyField",
        "com.coremedia.ui.mixins.ValidationState",
        "com.coremedia.ui.mixins.ValidationStateMixin"
      ]
    };
});
