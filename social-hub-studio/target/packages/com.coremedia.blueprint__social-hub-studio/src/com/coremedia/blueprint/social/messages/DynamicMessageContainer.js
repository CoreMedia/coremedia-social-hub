Ext.define("com.coremedia.blueprint.social.messages.DynamicMessageContainer", function(DynamicMessageContainer) {/*package com.coremedia.blueprint.social.messages{
import com.coremedia.blueprint.social.messages.*;
import net.jangaroo.ext.Exml;
import ext.container.Container;
import ext.layout.container.VBoxLayout;
public class DynamicMessageContainer extends DynamicMessageContainerBase{

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.dynamicMessageContainer";

    public*/function DynamicMessageContainer$(config/*:DynamicMessageContainer = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.messages.DynamicMessageContainerBase*/ =AS3.cast(com.coremedia.blueprint.social.messages.DynamicMessageContainerBase,{});
    var defaults_$1/*:DynamicMessageContainer*/ =AS3.cast(DynamicMessageContainer,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"style" , this.getStyle(AS3.getBindable(config,"adapter"), AS3.getBindable(config,"message")));
    var local_MessageFooter_15_5_$1/*: com.coremedia.blueprint.social.messages.MessageFooter*/ =AS3.cast(com.coremedia.blueprint.social.messages.MessageFooter,{});
    AS3.setBindable(local_MessageFooter_15_5_$1,"message" , AS3.getBindable(config,"message"));
    AS3.setBindable(local_MessageFooter_15_5_$1,"adapter" , AS3.getBindable(config,"adapter"));
    var container_16_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    container_16_5_$1.ui =net.jangaroo.ext.Exml.asString( this.resolveSkin(AS3.getBindable(config,"adapter"), AS3.getBindable(config,"message")));
    container_16_5_$1.itemId = "fieldWrapper";
    var layout_VBox_18_9_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_18_9_$1,"align" , "stretch");
    AS3.setBindable(container_16_5_$1,"layout" , layout_VBox_18_9_$1);
    config_$1.items = [local_MessageFooter_15_5_$1, container_16_5_$1];
    var layout_VBox_23_5_$1/*: ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_23_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_23_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$043d(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.messages.DynamicMessageContainerBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.dynamicMessageContainer",
      constructor: DynamicMessageContainer$,
      super$043d: function() {
        com.coremedia.blueprint.social.messages.DynamicMessageContainerBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.container.Container",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.messages.DynamicMessageContainerBase",
        "net.jangaroo.ext.Exml"
      ],
      uses: ["com.coremedia.blueprint.social.messages.MessageFooter"]
    };
});
