import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import Ext from "@jangaroo/ext-ts";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import Config from "@jangaroo/runtime/Config";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import ChannelsContainer from "./ChannelsContainer";

interface ChannelsContainerBaseConfig extends Config<Panel>, Partial<Pick<ChannelsContainerBase,
  "adaptersExpression"
>> {
}

class ChannelsContainerBase extends Panel {
  declare Config: ChannelsContainerBaseConfig;

  adaptersExpression: ValueExpression = null;

  constructor(config: Config<ChannelsContainerBase> = null) {
    super(config);
  }

  static #getScroller(): any {
    return Ext.getCmp(ChannelsContainer.ID).el.dom["children"][0].children[0];
  }

  focusAdapter(adapter: SocialHubAdapter): void {
    const scrolling = ChannelsContainerBase.#getScroller();
    const channelElement: any = Ext.getCmp(adapter.getAdapterId()).el.dom;
    channelElement.scrollIntoView();

    const offset: any = channelElement.offsetLeft;
    const targetOffset: any = offset - 500;
    scrolling.scrollLeft = targetOffset;
  }

//  override protected function afterRender():void {
//    super.afterRender();
//    getScroller().onscroll = scrolling;
//  }
//
//  private function scrolling():void {
//    ComposerBase.scrollIntoView();
//  }
}

export default ChannelsContainerBase;
