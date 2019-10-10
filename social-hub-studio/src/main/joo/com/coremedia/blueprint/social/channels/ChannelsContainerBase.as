package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.composer.ComposerBase;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.util.EventUtil;

import ext.Ext;
import ext.panel.Panel;

public class ChannelsContainerBase extends Panel {
  [Bindable]
  public var adaptersExpression:ValueExpression;

  private var currentScrollTarget:int = -1;
  private var callback:Function;

  public function ChannelsContainerBase(config:ChannelsContainerBase = null) {
    super(config);
  }

  private static function getScroller():* {
    return Ext.getCmp(ChannelsContainer.ID).el.dom['children'][0].children[0];
  }

  public function focusAdapter(adapter:SocialHubAdapter, callback:Function):void {
    this.callback = callback;
    var scrolling:* = ChannelsContainerBase.getScroller();
    var channelElement:* = Ext.getCmp(adapter.getAdapterId()).el.dom;
    channelElement.scrollIntoView();

    var offset:* = channelElement.offsetLeft;
    var targetOffset:* = offset - 500;
    scrolling.scrollLeft = targetOffset;
    currentScrollTarget = targetOffset;
  }

  override protected function afterRender():void {
    super.afterRender();
    getScroller().onscroll = scrolling;
  }

  private function scrolling():void {
    if (currentScrollTarget !== -1) {
      if (currentScrollTarget !== getScroller().scrollLeft) {
        trace(getScroller().scrollLeft);
      }
      else {
        currentScrollTarget = -1;
        EventUtil.invokeLater(callback);
      }
    }

    ComposerBase.closeAll();
  }
}
}
