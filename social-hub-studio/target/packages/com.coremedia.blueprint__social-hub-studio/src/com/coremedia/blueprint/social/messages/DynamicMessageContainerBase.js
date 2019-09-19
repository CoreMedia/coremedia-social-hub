Ext.define("com.coremedia.blueprint.social.messages.DynamicMessageContainerBase", function(DynamicMessageContainerBase) {/*package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.Message;
import com.coremedia.blueprint.social.beans.MessageContainerDescriptor;
import com.coremedia.blueprint.social.beans.MessageImpl;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.skins.ContainerSkin;

import ext.Component;
import ext.ComponentManager;
import ext.container.Container;

public class DynamicMessageContainerBase extends Container {
  private const PROPERTY_EDITOR_XTYPE:String = "com.coremedia.blueprint.social.studio.config.message.field.";

  [Bindable]
  public var message:MessageImpl;

  [Bindable]
  public var adapter:SocialHubAdapter;

  public*/ function DynamicMessageContainerBase$(config/*:DynamicMessageContainerBase = null*/) {if(arguments.length<=0)config=null;
    this.super$jl1O(config);
  }/*

  override protected*/ function afterRender()/*:void*/ {
    Ext.container.Container.prototype.afterRender.call(this);

    var target/*:Container*/ =AS3.as( this.queryById('fieldWrapper'),  Ext.container.Container);

    var properties/*:Array*/ = AS3.getBindable(this,"adapter").getMessageProperties();
    //reverse for inserting
    var pros/*:Array*/ = properties.concat([]).reverse();
    for/* each*/(var $1=0;$1</* in*/ pros.length;++$1) {var prop/*:MessageProperty*/ =pros[$1];
      var baseConfig/*:Object*/ = {};
      var propertyName/*:String*/ = prop.getName();
      var descriptor/*:MessageContainerDescriptor*/ = this.findCustomDescriptor$jl1O(propertyName);

      if (!descriptor) {
        descriptor = this.createDefaultDescriptor$jl1O(prop);
      }

      if (descriptor.isExcluded()) {
        continue;
      }

      var value/*:Object*/ = descriptor.getValue();
      if (!value) {
        continue;
      }


      baseConfig.xtype = this.PROPERTY_EDITOR_XTYPE$jl1O + descriptor.getType().toLowerCase();
      baseConfig.bindTo = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(descriptor.getValue());
      baseConfig.messageContainerDescriptor = descriptor;
      var cmp/*:Component*/ = Ext.ComponentManager.create(baseConfig);
      target.insert(0, cmp);
    }
  }/*

  private*/ function findCustomDescriptor(name/*:String*/)/*:MessageContainerDescriptor*/ {
    var descriptors/*:Array*/ = AS3.getBindable(this,"message").getMessageContainerDescriptors();
    for/* each*/(var $1=0;$1</* in*/ descriptors.length;++$1) {var desc/*:MessageContainerDescriptor*/ =descriptors[$1];
      if (desc.getPropertyName() === name) {
        return desc;
      }
    }
    return null;
  }/*

  private*/ function createDefaultDescriptor(prop/*:MessageProperty*/)/*:MessageContainerDescriptor*/ {
    var data/*:Object*/ = {
      propertyName: prop.getName(),
      type: prop.getPropertyType(),
      showLabel: true,
      value: com.coremedia.ui.data.ValueExpressionFactory.createFromValue(AS3.getBindable(this,"message")).extendBy(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(prop.getName()).getValue(),
      excluded: false
    };

    return new com.coremedia.blueprint.social.beans.MessageContainerDescriptor(data);
  }/*

  protected*/ function resolveSkin(adapter/*:SocialHubAdapter*/, msg/*:Message*/)/*:String*/ {
    if (msg.getMessageState() === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.STATE_SENT) {
      if(adapter.isNativeHistory()) {
        return com.coremedia.ui.skins.ContainerSkin.DEFAULT.getSkin();
      }

      return com.coremedia.ui.skins.ContainerSkin.DARK_200.getSkin();
    }

    return com.coremedia.ui.skins.ContainerSkin.GRID_200.getSkin();
  }/*

  protected*/ function getStyle(adapter/*:SocialHubAdapter*/, msg/*:Message*/)/*:String*/ {
    if (msg.getMessageState() === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.STATE_SENT && adapter.isNativeHistory()) {
      return "margin-bottom: 24px;";
    }

    return "transition: box-shadow 0.25s;box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.6);border-radius: 2px;border-width: 0;border-style: solid;margin: 2px;background-color:#fff;margin-bottom: 24px;";
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.container.Container",
      PROPERTY_EDITOR_XTYPE$jl1O: "com.coremedia.blueprint.social.studio.config.message.field.",
      constructor: DynamicMessageContainerBase$,
      super$jl1O: function() {
        Ext.container.Container.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      findCustomDescriptor$jl1O: findCustomDescriptor,
      createDefaultDescriptor$jl1O: createDefaultDescriptor,
      resolveSkin: resolveSkin,
      getStyle: getStyle,
      config: {
        message: null,
        adapter: null
      },
      requires: [
        "Ext.ComponentManager",
        "Ext.container.Container",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.skins.ContainerSkin"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.MessageContainerDescriptor",
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames"
      ]
    };
});
