package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.composer.ComposerBase;
import com.coremedia.ui.data.ValueExpression;

import ext.Ext;
import ext.panel.Panel;

public class ChannelsContainerBase extends Panel {
  [Bindable]
  public var adaptersExpression:ValueExpression;

  public function ChannelsContainerBase(config:ChannelsContainerBase = null) {
    super(config);
  }

  private static function getScroller():* {
    return Ext.getCmp(ChannelsContainer.ID).el.dom['children'][0].children[0];
  }

  public function focusAdapter(adapter:SocialHubAdapter):void {
    var scrolling:* = ChannelsContainerBase.getScroller();
    var channelElement:* = Ext.getCmp(adapter.getAdapterId()).el.dom;
    channelElement.scrollIntoView();

    var offset:* = channelElement.offsetLeft;
    var targetOffset:* = offset - 500;
    scrolling.scrollLeft = targetOffset;
  }

  override protected function afterRender():void {
    super.afterRender();
    getScroller().onscroll = scrolling;
  }

  private function scrolling():void {
    ComposerBase.scrollIntoView();
  }
}
}
