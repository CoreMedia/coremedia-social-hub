Ext.define("com.coremedia.blueprint.social.SocialHubMainTabBase", function(SocialHubMainTabBase) {/*package com.coremedia.blueprint.social {

import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
import com.coremedia.blueprint.social.beans.SocialHubAdaptersImpl;
import com.coremedia.blueprint.social.composer.ComposerBase;
import com.coremedia.ui.components.ProgressLoadMask;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.util.EventUtil;

import ext.panel.Panel;

public class SocialHubMainTabBase extends Panel {
  public static const ID:String = "cm-social-hub-main-tab";
  public static const LOADER_ITEM_ID:String = "loader";
  public static const EMPTY_ITEM_ID:String = "empty";
  public static const CHANNELS_ITEM_ID:String = "channels";

  private var adapterCount:Number = 0;
  private var adapters:Array =*/function adapters_(){this.adapters$A_7L=( []);}/*;
  private var loadMask:ProgressLoadMask;
  private var adaptersExpression:ValueExpression;
  private var activeItemExpression:ValueExpression;

  public*/ function SocialHubMainTabBase$(config/*:SocialHubMainTab = null*/) {if(arguments.length<=0)config=null;
    this.super$A_7L(config);adapters_.call(this);;
  }/*


  override protected*/ function afterRender()/*:void*/ {
    Ext.panel.Panel.prototype.afterRender.call(this);
    var adapterExpre/*:ValueExpression*/ = com.coremedia.blueprint.social.socialHubService.getAdaptersExpression();
    com.coremedia.blueprint.social.socialHubService.getAdaptersExpression().addChangeListener(AS3.bind(this,"adaptersChanged$A_7L"));
    //wait for the layout. Unfortunately afterlayout event is too much as it will cause show loadMask at resizing.
    this.adaptersChanged$A_7L(adapterExpre);
  }/*

  private*/ function adaptersChanged(adaptersExpression/*:ValueExpression*/)/*:void*/ {var this$=this;

    var loadMaskConfig/*:ProgressLoadMask*/ = AS3.cast(com.coremedia.ui.components.ProgressLoadMask,{});
    // todo: workaround to style the mask smaller. This should be done better in the component itself.
    AS3.setBindable(loadMaskConfig,"style" , "{position: relative; height: 200px; width: 200px; position: absolute; left: 50%; margin-left: -100px; top: 40%; margin-top: -100px;}");
    loadMaskConfig.msg = '';
    loadMaskConfig.target = this.queryById(SocialHubMainTabBase.LOADER_ITEM_ID);
    this.loadMask$A_7L = new com.coremedia.ui.components.ProgressLoadMask(loadMaskConfig);
    this.loadMask$A_7L.show();
    AS3.setBindable(this.loadMask$A_7L,"progress" , 0);

    this.getActiveItemExpression().setValue(SocialHubMainTabBase.LOADER_ITEM_ID);

    com.coremedia.ui.util.EventUtil.invokeLater(function ()/*:void*/ {
      this$.loadAdapters$A_7L(adaptersExpression);
    });
  }/*

  private*/ function loadAdapters(adaptersExpression/*:ValueExpression*/)/*:void*/ {var this$=this;
    this.adapterCount$A_7L = 0;
    this.adapters$A_7L = [];

    var adaptersBean/*:SocialHubAdaptersImpl*/ = adaptersExpression.getValue();
    if (!adaptersBean) {
      this.loadAdapterList$A_7L([]);
    }
    else {
      adaptersBean.load(function ()/*:void*/ {
        this$.adapters$A_7L = adaptersBean.getAdapters();
        this$.loadAdapterList$A_7L(this$.adapters$A_7L);
      });
    }
  }/*

  private*/ function loadAdapterList(adapters/*:Array*/)/*:void*/ {var this$=this;
    //destroy the loadmask when there is no adapter
    if (adapters.length === 0) {
      this.loadMask$A_7L.destroy();
      this.getActiveItemExpression().setValue(SocialHubMainTabBase.EMPTY_ITEM_ID);
    }
    for/* each*/(var $1=0;$1</* in*/ adapters.length;++$1) {var a/*:SocialHubAdapterImpl*/ =adapters[$1];
      a.load(function ()/*:void*/ {
        this$.adapterCount$A_7L++;
        var progress/*:Number*/ = this$.adapterCount$A_7L / adapters.length;
        AS3.setBindable(this$.loadMask$A_7L,"progress" , progress);
        if (progress === 1) {
          this$.getAdaptersExpression().setValue(adapters);
          //wait a little bit before destroying the load mask. Otherwise the loadmask will not be visible in some cases.
          window.setTimeout(function ()/*:void*/ {
            this$.loadMask$A_7L.destroy();
            this$.getActiveItemExpression().setValue(SocialHubMainTabBase.CHANNELS_ITEM_ID);
          }, 500);
        }
      });
    }
  }/*

  internal*/ function getActiveItemExpression()/*:ValueExpression*/ {
    if (!this.activeItemExpression$A_7L) {
      this.activeItemExpression$A_7L = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(SocialHubMainTabBase.LOADER_ITEM_ID);
    }
    return this.activeItemExpression$A_7L;
  }/*

  // instead of socialHubService.getChannelsExpression() this expression is used to store loaded adapters
  // Therefore ChannelContainer can assume that the configured adapter is loaded.
  internal*/ function getAdaptersExpression()/*:ValueExpression*/ {
    if (!this.adaptersExpression$A_7L) {
      this.adaptersExpression$A_7L = com.coremedia.ui.data.ValueExpressionFactory.createFromValue([]);
    }
    return this.adaptersExpression$A_7L;
  }/*

  override protected*/ function onHide(animateTarget/*:* = undefined*/, callback/*:Function = null*/, scope/*:Object = null*/)/*:void*/ {switch(Math.max(arguments.length,1)){case 1:callback=null;case 2:scope=null;}
    com.coremedia.blueprint.social.composer.ComposerBase.closeAll();
    Ext.panel.Panel.prototype.onHide.call(this,animateTarget, callback, scope);
  }/*

  override protected*/ function onDestroy()/*:void*/ {
    com.coremedia.blueprint.social.socialHubService.getAdaptersExpression().removeChangeListener(AS3.bind(this,"adaptersChanged$A_7L"));
    com.coremedia.blueprint.social.composer.ComposerBase.closeAll();
    Ext.panel.Panel.prototype.onDestroy.call(this);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.panel.Panel",
      adapterCount$A_7L: 0,
      loadMask$A_7L: null,
      adaptersExpression$A_7L: null,
      activeItemExpression$A_7L: null,
      constructor: SocialHubMainTabBase$,
      super$A_7L: function() {
        Ext.panel.Panel.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      adaptersChanged$A_7L: adaptersChanged,
      loadAdapters$A_7L: loadAdapters,
      loadAdapterList$A_7L: loadAdapterList,
      getActiveItemExpression: getActiveItemExpression,
      getAdaptersExpression: getAdaptersExpression,
      onHide: onHide,
      onDestroy: onDestroy,
      statics: {
        ID: "cm-social-hub-main-tab",
        LOADER_ITEM_ID: "loader",
        EMPTY_ITEM_ID: "empty",
        CHANNELS_ITEM_ID: "channels"
      },
      requires: [
        "Ext.panel.Panel",
        "com.coremedia.ui.components.ProgressLoadMask",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.util.EventUtil"
      ],
      uses: [
        "com.coremedia.blueprint.social.composer.ComposerBase",
        "com.coremedia.blueprint.social.socialHubService"
      ]
    };
});
