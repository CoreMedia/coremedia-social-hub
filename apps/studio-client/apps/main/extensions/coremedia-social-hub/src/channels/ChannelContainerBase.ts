import MessagesContainer from "../messages/MessagesContainer";
import socialHubService from "../socialHubService";
import AdapterDropAreaTarget from "./AdapterDropAreaTarget";
import ChannelContainer from "./ChannelContainer";
import Colors from "./Colors";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import MenuIconButton from "@coremedia/studio-client.ext.ui-components/components/MenuIconButton";
import ProgressLoadMask from "@coremedia/studio-client.ext.ui-components/components/ProgressLoadMask";
import createComponentSelector from "@coremedia/studio-client.ext.ui-components/util/createComponentSelector";
import Ext from "@jangaroo/ext-ts";
import Component from "@jangaroo/ext-ts/Component";
import ComponentManager from "@jangaroo/ext-ts/ComponentManager";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import Event from "@jangaroo/ext-ts/event/Event";
import ContainerLayout from "@jangaroo/ext-ts/layout/container/Container";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import Toolbar from "@jangaroo/ext-ts/toolbar/Toolbar";
import { as, asConfig, bind, is } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import int from "@jangaroo/runtime/int";
import SocialHubMainTab from "../SocialHubMainTab";
import SocialHub_properties from "../SocialHub_properties";
import ComposerModelImpl from "../beans/ComposerModelImpl";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import SocialHubAdapterImpl from "../beans/SocialHubAdapterImpl";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import Composer from "../composer/Composer";
import ComposerBase from "../composer/ComposerBase";

interface ChannelContainerBaseConfig extends Config<Panel>, Partial<Pick<ChannelContainerBase,
  "adapter"
>> {
}

class ChannelContainerBase extends Panel {
  declare Config: ChannelContainerBaseConfig;

  static readonly LOADER_ITEM_ID: string = "loader";

  static readonly DROP_LINK_ITEM_ID: string = SocialHubPropertyNames.COMPOSER_TYPE_LINK;

  static readonly DROP_CONTENT_ITEM_ID: string = SocialHubPropertyNames.COMPOSER_TYPE_CONTENT;

  static readonly DROP_CONTENT_AND_LINK_ITEM_ID: string = "dropContentAndLink";

  static readonly DROP_NOT_ALLOWED_ITEM_ID: string = "dropNotAllowed";

  static readonly MESSAGE_WRAPPER_ITEM_ID: string = "messagesWrapper";

  adapter: SocialHubAdapterImpl = null;

  #loadMask: ProgressLoadMask = null;

  #dropTarget: AdapterDropAreaTarget = null;

  #activeItemExpression: ValueExpression = null;

  constructor(config: Config<ChannelContainerBase> = null) {
    super(config);
  }

  protected override afterRender(): void {
    super.afterRender();
    this.#addButtonStyleListeners();

    this.reload(false);

    const container = as(this.queryById("statusSwitcher"), Container);
    this.#dropTarget = new AdapterDropAreaTarget(container, as(this, ChannelContainer), null, null, null, bind(this, this.#handleContentDrop));
  }

  protected override afterLayout(layout: ContainerLayout): void {
    super.afterLayout(layout);
    this.refreshColors(this.adapter.getColor());
  }

  #handleContentDrop(mayDrop: boolean, contents: Array<any>, composingType: string): void {
    if (mayDrop) {
      socialHubService.initComposerModel(this.adapter.getAdapterId(), contents, composingType, (): void =>
        this.composeMessage(),
      );
    }
  }

  protected fixLayout(): void {
    //TODO some odd FireFox vertical scrolling problem, didn't find a better way to solve it but to remove the width.
    try {
      const wrapper = as(this.queryById("messagesWrapper"), Panel);
      const style: string = (wrapper as unknown)["el"].getFirstChild().getFirstChild().getFirstChild().dom.getAttribute("style");
      const newStyle: string = style.split(";")[0];
      (wrapper as unknown)["el"].getFirstChild().getFirstChild().getFirstChild().dom.setAttribute("style", newStyle);
    } catch (e) {
      if (is(e, Error)) {
      //ignore
      } else throw e;
    }
  }

  protected forceReload(): void {
    this.reload(true);
  }

  /**
   *
   * @param invalidate false when adapter should not be invalidated.
   */
  reload(invalidate: boolean = true): void {
    this.getActiveItemExpression().setValue(ChannelContainerBase.LOADER_ITEM_ID);
    this.#createLoadMask();
    this.#loadMask.show();
    this.#loadMask.progress = 0;

    if (invalidate) {
      this.adapter.invalidate(() => bind(this, this.#loadMessages));
    } else {
      this.#loadMessages(false);
    }
  }

  #createLoadMask(): void {
    const loadMaskConfig = Config(ProgressLoadMask);
    // todo: workaround to style the mask smaller. This should be done better in the component itself, including tranparent svg
    loadMaskConfig.style = "{position: relative; height: 100px; width: 100px; position: absolute; left: 50%; margin-left: -50px; top: 40%; margin-top: -50px;}";
    loadMaskConfig.msg = "";
    loadMaskConfig.target = this.queryById(ChannelContainerBase.LOADER_ITEM_ID);
    this.#loadMask = new ProgressLoadMask(loadMaskConfig);
  }

  #loadMessages(invalidate: boolean = true): void {
    const history = as(this.queryById(ChannelContainer.MESSAGE_HISTORY_ITEM_ID), MessagesContainer);
    history.clear();
    const queue = as(this.queryById(ChannelContainer.MESSAGE_SCHEDULED_ITEM_ID), MessagesContainer);
    queue.clear();

    let messages: Array<any> = this.adapter.getScheduledMessages() || [];
    messages = messages.concat(this.adapter.getSentMessages() || []);
    if (messages.length === 0) {
      //nothing to load
      this.#loadMask.destroy();
      this.getActiveItemExpression().setValue(ChannelContainerBase.MESSAGE_WRAPPER_ITEM_ID);
      return;
    }

    this.#loadMask["messagesCount"] = 0;
    this.#loadMask["messagesLength"] = messages.length;
    this.#loadMask.el.dom["children"][1].setAttribute("style", "background: transparent;");

    history.activeItemExpression = this.getActiveItemExpression();
    history.loadMask = this.#loadMask;

    queue.loadMask = this.#loadMask;
    queue.activeItemExpression = this.getActiveItemExpression();

    //reload only when the adapter is manually invalidated.
    if (invalidate) {
      history.reload();
      queue.reload();
    }
  }

  getActiveItemExpression(): ValueExpression {
    if (!this.#activeItemExpression) {
      this.#activeItemExpression = ValueExpressionFactory.createFromValue(ChannelContainerBase.LOADER_ITEM_ID);
    }
    return this.#activeItemExpression;
  }

  onComposerClose(): void {
    if (this.rendered) {
      this.refreshColors(this.adapter.getColor());
    }
  }

  refreshColors(color: string): void {
    const topToolbar = as(this.getDockedItems("toolbar[dock=\"top\"]")[0], Toolbar);
    topToolbar.el.dom.setAttribute("style", "background-color:" + color);
    this.adapter.setColor(color);

    const buttons: Array<any> = topToolbar.query(createComponentSelector()._xtype(IconButton.xtype).build());
    for (const b of buttons as Button[]) {
      let style = as(b.el.dom.getAttribute("style"), String);
      style = style.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi, this.adapter.getColor());
      b.el.dom.setAttribute("style", style);
    }

    const backgroundColor = Colors.getBackgroundColor(color);
    const adapterStyle = as(this.el.dom.getAttribute("style"), String);
    this.el.dom.setAttribute("style", adapterStyle + "background-color:" + backgroundColor);
  }

  protected composeMessage(): void {
    this.setComposerButtonState(true);
    if (ComposerBase.isOpened(this.adapter)) {
      return;
    }

    const that = this;
    const pos: Array<any> = that.getPosition();
    const composer = as(socialHubService.getComposerModel(this.adapter.getAdapterId()), ComposerModelImpl);
    const baseConfig: Record<string, any> = {
      x: that.getX() + (that.getWidth() / 2) - (450 / 2), //100px offset from left favourites toolbar?
      y: pos[1] + 14,
      adapter: this.adapter,
      channelContainer: that,
      bindTo: ValueExpressionFactory.createFromValue(composer),
      xtype: Composer.xtype,
      animateTarget: this.#getComposerButton().getEl(),
      renderTo: this.findParentByType(SocialHubMainTab.xtype).getLayout().getTarget(),
    };

    const composerBase = as(ComponentManager.create(baseConfig), ComposerBase);
    composer.invalidate((): void => {
      composerBase.show();
    });
  }

  #addButtonStyleListeners(): void {
    const topToolbar = as(this.getDockedItems("toolbar[dock=\"top\"]")[0], Toolbar);
    const buttons: Array<any> = topToolbar.query(createComponentSelector()._xtype(IconButton.xtype).build());
    for (const b of buttons as Button[]) {
      this.#applyColorSelection(b);
    }
    const menuButton = topToolbar.query(createComponentSelector()._xtype(MenuIconButton.xtype).build())[0];
    this.#applyColorSelection(menuButton);
  }

  #getComposerButton(): Button {
    const topToolbar = as(this.getDockedItems("toolbar[dock=\"top\"]")[0], Toolbar);
    return as(topToolbar.queryById(ChannelContainer.COMPOSER_BUTTON_ITEM_ID), Button);
  }

  #getColorButton(): Button {
    const topToolbar = as(this.getDockedItems("toolbar[dock=\"top\"]")[0], Toolbar);
    return as(topToolbar.queryById(ChannelContainer.COLOR_CHOOSER_BUTTON_ITEM_ID), Button);
  }

  #applyColorSelection(component: Component): void {
    component.el.on("mouseover", bind(this, this.#hoverButton));
    component.el.on("mouseleave", bind(this, this.#hoverExitButton));
  }

  //TODO move to custom component
  #hoverExitButton(e: Event): void {
    let style = as(e.target.getAttribute("style"), String);
    const styleIndex: number = style.indexOf("background-color");
    if (styleIndex !== -1) {
      const b = as(Ext.getCmp(as(e.target.getAttribute("data-componentid"), String)), Button);
      if (b && b.menu) {
        if (b.menu.isVisible()) {
          return;
        }
      }

      if (!b.pressed) {
        style = style.substr(0, styleIndex);
        e.target.setAttribute("style", style);
      }
    }
  }

  setComposerButtonState(disabled: boolean): void {
    if (this.rendered) {
      this.#getColorButton().setDisabled(disabled);
      this.#getComposerButton().setDisabled(disabled);
      this.#getComposerButton().setPressed(disabled);
      this.refreshColors(this.adapter.getColor());
    }
  }

  #hoverButton(e: Event): void {
    if (e.target.tagName.toLowerCase() === "a") {
      const b = as(Ext.getCmp(e.target.id), Button);
      let color = this.adapter.getHoverColor();
      if (b.pressed) {
        color = this.adapter.getPressedColor();
      }

      let style: any = e.target.getAttribute("style");
      if (style.indexOf("background-color") === -1) {
        style = style + "background-color:" + color;
      } else {
        style = style.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi, color);
      }
      e.target.setAttribute("style", String(style));
    }
  }

  protected format(msg: string, length: int): string {
    if (msg && msg.length > length) {
      return msg.substr(0, length) + "...";
    }
    return msg;
  }

  protected override onDestroy(): void {
    super.onDestroy();
    this.#dropTarget && this.#dropTarget.unreg();
  }

  protected resolveHistoryTitle(ad: SocialHubAdapter): string {
    if (ad.isNativeHistory()) {
      return SocialHub_properties.channel_History_extern_title;
    }

    return SocialHub_properties.channel_history_title;
  }
}

export default ChannelContainerBase;
