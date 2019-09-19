Ext.define("com.coremedia.blueprint.social.scheduler.SchedulerContainer", function(SchedulerContainer) {/*package com.coremedia.blueprint.social.scheduler{
import com.coremedia.blueprint.social.scheduler.*;
import net.jangaroo.ext.Exml;
import ext.container.Container;
import com.coremedia.ui.components.CustomizableDatePicker;
import com.coremedia.ui.plugins.HorizontalSpacingPlugin;
import ext.layout.container.HBoxLayout;
import ext.layout.container.VBoxLayout;
public class SchedulerContainer extends SchedulerContainerBase{

    import com.coremedia.ui.bem.SpacingBEMEntities;

    public static const xtype:String = "com.coremedia.blueprint.social.studio.config.schedulerContainer";

    public*/function SchedulerContainer$(config/*:SchedulerContainer = null*/){if(arguments.length<=0)config=null;
    var config_$1/*: com.coremedia.blueprint.social.scheduler.SchedulerContainerBase*/ =AS3.cast(com.coremedia.blueprint.social.scheduler.SchedulerContainerBase,{});
    var defaults_$1/*:SchedulerContainer*/ =AS3.cast(SchedulerContainer,{});
    config = net.jangaroo.ext.Exml.apply(defaults_$1,config);
    var container_17_5_$1/*:ext.container.Container*/ =AS3.cast(Ext.container.Container,{});
    var ui_CustomizableDatePicker_19_9_$1/*:com.coremedia.ui.components.CustomizableDatePicker*/ =AS3.cast(com.coremedia.ui.components.CustomizableDatePicker,{});
    ui_CustomizableDatePicker_19_9_$1.showToday = false;
    ui_CustomizableDatePicker_19_9_$1.scrollOnTopBar = true;
    ui_CustomizableDatePicker_19_9_$1.flex = 1.0;
    AS3.setBindable(ui_CustomizableDatePicker_19_9_$1,"modifiersForDate" ,AS3.bind( this,"calculateModifiersForDate"));
    AS3.setBindable(ui_CustomizableDatePicker_19_9_$1,"selectedDateVE" , this.getSelectedDateVE());
    var ui_CustomizableDatePicker_24_9_$1/*: com.coremedia.ui.components.CustomizableDatePicker*/ =AS3.cast(com.coremedia.ui.components.CustomizableDatePicker,{});
    ui_CustomizableDatePicker_24_9_$1.showToday = false;
    ui_CustomizableDatePicker_24_9_$1.scrollOnTopBar = true;
    ui_CustomizableDatePicker_24_9_$1.flex = 1.0;
    AS3.setBindable(ui_CustomizableDatePicker_24_9_$1,"modifiersForDate" ,AS3.bind( this,"calculateModifiersForDate"));
    AS3.setBindable(ui_CustomizableDatePicker_24_9_$1,"selectedDateVE" , this.getSelectedDateVE());
    container_17_5_$1.items = [ui_CustomizableDatePicker_19_9_$1, ui_CustomizableDatePicker_24_9_$1];
    var ui_HorizontalSpacingPlugin_31_9_$1/*:com.coremedia.ui.plugins.HorizontalSpacingPlugin*/ =AS3.cast(com.coremedia.ui.plugins.HorizontalSpacingPlugin,{});
    AS3.setBindable(ui_HorizontalSpacingPlugin_31_9_$1,"modifier" , com.coremedia.ui.bem.SpacingBEMEntities.HORIZONTAL_SPACING_MODIFIER_200);
    container_17_5_$1.plugins = [ui_HorizontalSpacingPlugin_31_9_$1];
    var layout_HBox_34_9_$1/*:ext.layout.container.HBoxLayout*/ =AS3.cast(Ext.layout.container.HBox,{});
    AS3.setBindable(layout_HBox_34_9_$1,"align" , "stretch");
    AS3.setBindable(container_17_5_$1,"layout" , layout_HBox_34_9_$1);
    config_$1.items = [container_17_5_$1];
    var layout_VBox_39_5_$1/*:ext.layout.container.VBoxLayout*/ =AS3.cast(Ext.layout.container.VBox,{});
    AS3.setBindable(layout_VBox_39_5_$1,"align" , "stretch");
    AS3.setBindable(config_$1,"layout" , layout_VBox_39_5_$1);
    net.jangaroo.ext.Exml.apply(config_$1,config);
    this.super$u8z9(config_$1);
  }/*}}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.scheduler.SchedulerContainerBase",
      alias: "widget.com.coremedia.blueprint.social.studio.config.schedulerContainer",
      constructor: SchedulerContainer$,
      super$u8z9: function() {
        com.coremedia.blueprint.social.scheduler.SchedulerContainerBase.prototype.constructor.apply(this, arguments);
      },
      requires: [
        "Ext.container.Container",
        "Ext.layout.container.HBox",
        "Ext.layout.container.VBox",
        "com.coremedia.blueprint.social.scheduler.SchedulerContainerBase",
        "com.coremedia.ui.bem.SpacingBEMEntities",
        "com.coremedia.ui.components.CustomizableDatePicker",
        "com.coremedia.ui.plugins.HorizontalSpacingPlugin",
        "net.jangaroo.ext.Exml"
      ]
    };
});
