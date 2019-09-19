Ext.define("com.coremedia.blueprint.social.composer.MessageChoiceEditorBase", function(MessageChoiceEditorBase) {/*package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.mixins.IValidationStateMixin;
import com.coremedia.ui.mixins.ValidationState;

import ext.StringUtil;

import ext.panel.Panel;

import mx.resources.ResourceManager;

public class MessageChoiceEditorBase extends Panel implements MessageFieldEditor {

  [Bindable]
  public var bindTo:ValueExpression;

  [Bindable]
  public var property:MessageProperty;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public*/ function MessageChoiceEditorBase$(config/*:MessageChoiceEditorBase = null*/) {if(arguments.length<=0)config=null;
    this.super$7TAe(config);
    if(AS3.getBindable(this,"property").isRequired()) {
      AS3.getBindable(this,"bindTo").addChangeListener(AS3.bind(this,"valueChanged$7TAe"));
    }
  }/*

  override protected*/ function afterRender()/*:void*/ {
    Ext.panel.Panel.prototype.afterRender.call(this);
    if(AS3.getBindable(this,"property").getDefaultOption()) {
      AS3.getBindable(this,"bindTo").setValue(AS3.getBindable(this,"property").getDefaultOption());
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

  public static*/ function getStore$static(property/*:MessageProperty*/)/*:Array*/ {
    var localStore/*:Array*/ = [];

    for/* each*/(var $1=0,$2=/* in*/ property.getOptions();$1<$2.length;++$1) {var prop/*:String*/ =$2[$1];
      var key/*:String*/ = prop;
      var bundleKey/*:String*/ = 'message_property_' + property.getName().toLowerCase() + '_' + key;
      var value/*:String*/ = mx.resources.ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', bundleKey);
      if(!value) {
        value = key;
      }
      localStore.push([key, value]);
    }
    return localStore;
  }/*

  public*/ function getErrorMessage()/*:String*/ {
    if(!AS3.getBindable(this,"bindTo").getValue()) {
      var msg/*:String*/ = this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'messsage_property_error_noValue_text');
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
      constructor: MessageChoiceEditorBase$,
      super$7TAe: function() {
        Ext.panel.Panel.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      valueChanged$7TAe: valueChanged,
      getErrorMessage: getErrorMessage,
      config: {
        bindTo: null,
        property: null,
        adapter: null
      },
      statics: {getStore: getStore$static},
      requires: [
        "Ext.String",
        "Ext.panel.Panel",
        "com.coremedia.blueprint.social.composer.MessageFieldEditor",
        "com.coremedia.ui.mixins.ValidationState",
        "com.coremedia.ui.mixins.ValidationStateMixin",
        "mx.resources.ResourceManager"
      ]
    };
});
