Ext.define("com.coremedia.blueprint.social.composer.MessageTextEditorBase", function(MessageTextEditorBase) {/*package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.mixins.IValidationStateMixin;
import com.coremedia.ui.mixins.ValidationState;

import ext.StringUtil;
import ext.panel.Panel;

public class MessageTextEditorBase extends Panel implements MessageFieldEditor {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public*/ function MessageTextEditorBase$(config/*:MessageTextEditorBase = null*/) {if(arguments.length<=0)config=null;
    this.super$pJbq(config);
    if(AS3.getBindable(this,"property").isRequired()) {
      AS3.getBindable(this,"bindTo").addChangeListener(AS3.bind(this,"valueChanged$pJbq"));
    }
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

  override protected*/ function onDestroy()/*:void*/ {
    Ext.panel.Panel.prototype.onDestroy.call(this);
    AS3.getBindable(this,"bindTo").removeChangeListener(AS3.bind(this,"valueChanged$pJbq"));
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.panel.Panel",
      mixins: ["com.coremedia.blueprint.social.composer.MessageFieldEditor"],
      constructor: MessageTextEditorBase$,
      super$pJbq: function() {
        Ext.panel.Panel.prototype.constructor.apply(this, arguments);
      },
      valueChanged$pJbq: valueChanged,
      getErrorMessage: getErrorMessage,
      onDestroy: onDestroy,
      config: {
        bindTo: null,
        property: null,
        adapter: null
      },
      requires: [
        "Ext.String",
        "Ext.panel.Panel",
        "com.coremedia.blueprint.social.composer.MessageFieldEditor",
        "com.coremedia.ui.mixins.ValidationState",
        "com.coremedia.ui.mixins.ValidationStateMixin"
      ]
    };
});
