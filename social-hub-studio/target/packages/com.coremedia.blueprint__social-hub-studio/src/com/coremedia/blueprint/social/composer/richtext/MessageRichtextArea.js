Ext.define("com.coremedia.blueprint.social.composer.richtext.MessageRichtextArea", function(MessageRichtextArea) {/*package com.coremedia.blueprint.social.composer.richtext{
import com.coremedia.blueprint.social.composer.richtext.*;
import net.jangaroo.ext.Exml;
import com.coremedia.ui.plugins.BindPropertyPlugin;
import com.coremedia.ui.plugins.ResizablePlugin;
import com.coremedia.ui.components.StatefulResizer;
public class MessageRichtextArea extends MessageRichtextAreaBase{

    import com.coremedia.blueprint.social.composer.*;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.messageRichtextArea";

    public*/function MessageRichtextArea$(config/*:MessageRichtextArea = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.composer.richtext.MessageRichtextAreaBase*/ =AS3.cast(com.coremedia.blueprint.social.composer.richtext.MessageRichtextAreaBase,{});
    var defaults_$1/*:MessageRichtextArea*/ =AS3.cast(MessageRichtextArea,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    AS3.setBindable(config_$1,"height" , 80);
    var ui_BindPropertyPlugin_20_5_$1/*:com.coremedia.ui.plugins.BindPropertyPlugin*/ =AS3.cast(com.coremedia.ui.plugins.BindPropertyPlugin,{});
    ui_BindPropertyPlugin_20_5_$1.bindTo = AS3.getBindable(config,"bindTo");
    ui_BindPropertyPlugin_20_5_$1.bidirectional = true;
    var ui_ResizablePlugin_21_5_$1/*:com.coremedia.ui.plugins.ResizablePlugin*/ =AS3.cast(com.coremedia.ui.plugins.ResizablePlugin,{});
    AS3.setBindable(ui_ResizablePlugin_21_5_$1,"fitComponent" , true);
    var ui_StatefulResizer_23_9_$1/*:com.coremedia.ui.components.StatefulResizer*/ =AS3.cast(com.coremedia.ui.components.StatefulResizer,{});
    ui_StatefulResizer_23_9_$1.minHeight = 30;
    ui_StatefulResizer_23_9_$1.handles = "s";
    ui_StatefulResizer_23_9_$1.pinned = true;
    ui_StatefulResizer_23_9_$1.dynamic = false;
    AS3.setBindable(ui_StatefulResizer_23_9_$1,"embed" , false);
    AS3.setBindable(ui_StatefulResizer_23_9_$1,"horizontalResize" , false);
    ui_ResizablePlugin_21_5_$1.resizableConfig = ui_StatefulResizer_23_9_$1;
    config_$1.plugins = [ui_BindPropertyPlugin_20_5_$1, ui_ResizablePlugin_21_5_$1];
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$gJzM(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.composer.richtext.MessageRichtextAreaBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.messageRichtextArea",
      constructor: MessageRichtextArea$,
      super$gJzM: function() {
        com.coremedia.blueprint.social.composer.richtext.MessageRichtextAreaBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "com.coremedia.blueprint.social.composer.richtext.MessageRichtextAreaBase",
        "com.coremedia.ui.components.StatefulResizer",
        "com.coremedia.ui.plugins.BindPropertyPlugin",
        "com.coremedia.ui.plugins.ResizablePlugin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
