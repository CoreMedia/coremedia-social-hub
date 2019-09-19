package com.coremedia.blueprint.social {

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
  private var adapters:Array = [];
  private var loadMask:ProgressLoadMask;
  private var adaptersExpression:ValueExpression;
  private var activeItemExpression:ValueExpression;

  public function SocialHubMainTabBase(config:SocialHubMainTab = null) {
    super(config);
  }


  override protected function afterRender():void {
    super.afterRender();
    var adapterExpre:ValueExpression = socialHubService.getAdaptersExpression();
    socialHubService.getAdaptersExpression().addChangeListener(adaptersChanged);
    //wait for the layout. Unfortunately afterlayout event is too much as it will cause show loadMask at resizing.
    adaptersChanged(adapterExpre);
  }

  private function adaptersChanged(adaptersExpression:ValueExpression):void {

    var loadMaskConfig:ProgressLoadMask = ProgressLoadMask({});
    // todo: workaround to style the mask smaller. This should be done better in the component itself.
    loadMaskConfig.style = "{position: relative; height: 200px; width: 200px; position: absolute; left: 50%; margin-left: -100px; top: 40%; margin-top: -100px;}";
    loadMaskConfig.msg = '';
    loadMaskConfig.target = queryById(LOADER_ITEM_ID);
    loadMask = new ProgressLoadMask(loadMaskConfig);
    loadMask.show();
    loadMask.progress = 0;

    getActiveItemExpression().setValue(LOADER_ITEM_ID);

    EventUtil.invokeLater(function ():void {
      loadAdapters(adaptersExpression);
    });
  }

  private function loadAdapters(adaptersExpression:ValueExpression):void {
    adapterCount = 0;
    adapters = [];

    var adaptersBean:SocialHubAdaptersImpl = adaptersExpression.getValue();
    if (!adaptersBean) {
      loadAdapterList([]);
    }
    else {
      adaptersBean.load(function ():void {
        adapters = adaptersBean.getAdapters();
        loadAdapterList(adapters);
      });
    }
  }

  private function loadAdapterList(adapters:Array):void {
    //destroy the loadmask when there is no adapter
    if (adapters.length === 0) {
      loadMask.destroy();
      getActiveItemExpression().setValue(EMPTY_ITEM_ID);
    }
    for each(var a:SocialHubAdapterImpl in adapters) {
      a.load(function ():void {
        adapterCount++;
        var progress:Number = adapterCount / adapters.length;
        loadMask.progress = progress;
        if (progress === 1) {
          getAdaptersExpression().setValue(adapters);
          //wait a little bit before destroying the load mask. Otherwise the loadmask will not be visible in some cases.
          window.setTimeout(function ():void {
            loadMask.destroy();
            getActiveItemExpression().setValue(CHANNELS_ITEM_ID);
          }, 500);
        }
      });
    }
  }

  internal function getActiveItemExpression():ValueExpression {
    if (!activeItemExpression) {
      activeItemExpression = ValueExpressionFactory.createFromValue(LOADER_ITEM_ID);
    }
    return activeItemExpression;
  }

  // instead of socialHubService.getChannelsExpression() this expression is used to store loaded adapters
  // Therefore ChannelContainer can assume that the configured adapter is loaded.
  internal function getAdaptersExpression():ValueExpression {
    if (!adaptersExpression) {
      adaptersExpression = ValueExpressionFactory.createFromValue([]);
    }
    return adaptersExpression;
  }

  override protected function onHide(animateTarget:* = undefined, callback:Function = null, scope:Object = null):void {
    ComposerBase.closeAll();
    super.onHide(animateTarget, callback, scope);
  }

  override protected function onDestroy():void {
    socialHubService.getAdaptersExpression().removeChangeListener(adaptersChanged);
    ComposerBase.closeAll();
    super.onDestroy();
  }
}
}
