package com.coremedia.blueprint.social.channels {
import com.coremedia.blueprint.social.SocialHubMainTab;
import com.coremedia.blueprint.social.beans.ComposerModelImpl;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
import com.coremedia.blueprint.social.composer.Composer;
import com.coremedia.blueprint.social.composer.ComposerBase;
import com.coremedia.blueprint.social.messages.MessagesContainer;
import com.coremedia.blueprint.social.socialHubService;
import com.coremedia.ui.components.IconButton;
import com.coremedia.ui.components.MenuIconButton;
import com.coremedia.ui.components.ProgressLoadMask;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.util.createComponentSelector;

import ext.Component;
import ext.ComponentManager;
import ext.Ext;
import ext.button.Button;
import ext.event.Event;
import ext.layout.container.ContainerLayout;
import ext.panel.Panel;
import ext.toolbar.Toolbar;

public class ChannelContainerBase extends Panel {
  public static const LOADER_ITEM_ID:String = "loader";
  public static const MESSAGE_WRAPPER_ITEM_ID:String = "messagesWrapper";

  [Bindable]
  public var adapter:SocialHubAdapterImpl;

  private var loadMask:ProgressLoadMask;

  private var dropTarget:AdapterDropAreaTarget;

  private var activeItemExpression:ValueExpression;

  public function ChannelContainerBase(config:ChannelContainerBase = null) {
    super(config);
  }

  override protected function afterRender():void {
    super.afterRender();
    addButtonStyleListeners();

    reload(false);
    dropTarget = new AdapterDropAreaTarget(this, this as ChannelContainer, null, null, null, handleContentDrop);
  }

  override protected function afterLayout(layout:ContainerLayout):void {
    super.afterLayout(layout);
    refreshColors(adapter.getColor());
  }

  private function handleContentDrop(mayDrop:Boolean, contents:Array):void {
    if (mayDrop) {
      socialHubService.initComposerModel(adapter.getAdapterId(), contents, function ():void {
        composeMessage();
      });
    }
  }

  protected function forceReload():void {
    this.reload(true);
  }

  /**
   *
   * @param invalidate false when adapter should not be invalidated.
   */
  public function reload(invalidate:Boolean = true):void {
    getActiveItemExpression().setValue(LOADER_ITEM_ID);
    createLoadMask();
    loadMask.show();
    loadMask.progress = 0;

    if (invalidate) {
      adapter.invalidate(loadMessages);
    }
    else {
      loadMessages(false);
    }
  }

  private function createLoadMask():void {
    var loadMaskConfig:ProgressLoadMask = ProgressLoadMask({});
    // todo: workaround to style the mask smaller. This should be done better in the component itself, including tranparent svg
    loadMaskConfig.style = "{position: relative; height: 100px; width: 100px; position: absolute; left: 50%; margin-left: -50px; top: 40%; margin-top: -50px;}";
    loadMaskConfig.msg = '';
    loadMaskConfig.target = queryById(LOADER_ITEM_ID);
    loadMask = new ProgressLoadMask(loadMaskConfig);
  }

  private function loadMessages(invalidate:Boolean = true):void {
    var history:MessagesContainer = queryById(ChannelContainer.MESSAGE_HISTORY_ITEM_ID) as MessagesContainer;
    history.clear();
    var queue:MessagesContainer = queryById(ChannelContainer.MESSAGE_SCHEDULED_ITEM_ID) as MessagesContainer;
    queue.clear();

    var messages:Array = adapter.getScheduledMessages() || [];
    messages = messages.concat(adapter.getSentMessages() || []);
    if (messages.length === 0) {
      //nothing to load
      loadMask.destroy();
      getActiveItemExpression().setValue(MESSAGE_WRAPPER_ITEM_ID);
      return;
    }

    loadMask['messagesCount'] = 0;
    loadMask['messagesLength'] = messages.length;
    loadMask.el.dom['children'][1].setAttribute('style', 'background: transparent;');

    history.activeItemExpression = getActiveItemExpression();
    history.loadMask = loadMask;

    queue.loadMask = loadMask;
    queue.activeItemExpression = getActiveItemExpression();

    //reload only when the adapter is manually invalidated.
    if (invalidate) {
      history.reload();
      queue.reload();
    }
  }

  internal function getActiveItemExpression():ValueExpression {
    if (!activeItemExpression) {
      activeItemExpression = ValueExpressionFactory.createFromValue(LOADER_ITEM_ID);
    }
    return activeItemExpression;
  }

  public function onComposerClose():void {
    if (this.rendered) {
      refreshColors(this.adapter.getColor());
    }
  }

  public function refreshColors(color:String):void {
    var topToolbar:Toolbar = getDockedItems("toolbar[dock=\"top\"]")[0] as Toolbar;
    topToolbar.el.dom.setAttribute('style', 'background-color:' + color);
    adapter.setColor(color);

    var buttons:Array = topToolbar.query(createComponentSelector()._xtype(IconButton.xtype).build());
    for each(var b:Button in buttons) {
      var style:String = b.el.dom.getAttribute('style') as String;
      style = style.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi, adapter.getColor());
      b.el.dom.setAttribute("style", style);
    }

    var backgroundColor:String = Colors.getBackgroundColor(color);
    var adapterStyle:String = this.el.dom.getAttribute('style') as String;
    this.el.dom.setAttribute("style", adapterStyle + "background-color:" + backgroundColor);
  }

  protected function composeMessage():void {
    setComposerButtonState(true);
    if (ComposerBase.isOpened(adapter)) {
      return;
    }

    var pos:Array = this.getPosition();
    var composer:ComposerModelImpl = socialHubService.getComposerModel(adapter.getAdapterId()) as ComposerModelImpl;
    var baseConfig:Object = {
      x: this.getX() + (this.getWidth() / 2) - (450 / 2) - 100, //100px offset from left favourites toolbar
      y: pos[1] + 14,
      adapter: adapter,
      channelContainer: this,
      bindTo: ValueExpressionFactory.createFromValue(composer),
      xtype: Composer.xtype,
      animateTarget: getComposerButton().getEl(),
      renderTo: findParentByType(SocialHubMainTab.xtype).getLayout().getTarget()
    };

    var composerBase:ComposerBase = ComponentManager.create(baseConfig) as ComposerBase;
    composer.invalidate(function ():void {
      composerBase.show();
    });
  }

  private function addButtonStyleListeners():void {
    var topToolbar:Toolbar = getDockedItems("toolbar[dock=\"top\"]")[0] as Toolbar;
    var buttons:Array = topToolbar.query(createComponentSelector()._xtype(IconButton.xtype).build());
    for each(var b:Button in buttons) {
      applyColorSelection(b);
    }
    var menuButton:Component = topToolbar.query(createComponentSelector()._xtype(MenuIconButton.xtype).build())[0];
    applyColorSelection(menuButton);
  }

  private function getComposerButton():Button {
    var topToolbar:Toolbar = getDockedItems("toolbar[dock=\"top\"]")[0] as Toolbar;
    return topToolbar.queryById(ChannelContainer.COMPOSER_BUTTON_ITEM_ID) as Button;
  }

  private function getColorButton():Button {
    var topToolbar:Toolbar = getDockedItems("toolbar[dock=\"top\"]")[0] as Toolbar;
    return topToolbar.queryById(ChannelContainer.COLOR_CHOOSER_BUTTON_ITEM_ID) as Button;
  }

  private function applyColorSelection(component:Component):void {
    component.el.on('mouseover', hoverButton);
    component.el.on('mouseleave', hoverExitButton);
  }

  //TODO move to custom component
  private function hoverExitButton(e:Event):void {
    var style:String = e.target.getAttribute("style") as String;
    var styleIndex:Number = style.indexOf('background-color');
    if (styleIndex !== -1) {
      var b:Button = Ext.getCmp(e.target.getAttribute('data-componentid') as String) as Button;
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

  public function setComposerButtonState(disabled:Boolean):void {
    if(this.rendered) {
      getColorButton().setDisabled(disabled);
      getComposerButton().setDisabled(disabled);
      getComposerButton().setPressed(disabled);
      refreshColors(adapter.getColor());
    }
  }

  private function hoverButton(e:Event):void {
    if (e.target.tagName.toLowerCase() === "a") {
      var b:Button = Ext.getCmp(e.target.id) as Button;
      var color:String = adapter.getHoverColor();
      if (b.pressed) {
        color = adapter.getPressedColor();
      }

      var style:* = e.target.getAttribute("style");
      if (style.indexOf('background-color') === -1) {
        style = style + "background-color:" + color;
      }
      else {
        style = style.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi, color);
      }
      e.target.setAttribute("style", style);
    }
  }

  protected function format(msg:String, length:int):String {
    if (msg && msg.length > length) {
      return msg.substr(0, length) + "...";
    }
    return msg;
  }

  override protected function onDestroy():void {
    super.onDestroy();
    dropTarget && dropTarget.unreg();
  }

  protected function resolveHistoryTitle(ad:SocialHubAdapter):String {
    if (ad.isNativeHistory()) {
      return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_History_extern_title');
    }

    return resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_history_title');
  }

}
}
