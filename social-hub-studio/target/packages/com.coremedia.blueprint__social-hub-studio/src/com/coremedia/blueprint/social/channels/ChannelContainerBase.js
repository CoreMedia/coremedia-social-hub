Ext.define("com.coremedia.blueprint.social.channels.ChannelContainerBase", function(ChannelContainerBase) {/*package com.coremedia.blueprint.social.channels {
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

  public*/ function ChannelContainerBase$(config/*:ChannelContainerBase = null*/) {if(arguments.length<=0)config=null;
    this.super$cmCT(config);
  }/*

  override protected*/ function afterRender()/*:void*/ {
    Ext.panel.Panel.prototype.afterRender.call(this);
    this.addButtonStyleListeners$cmCT();

    this.reload(false);
    this.dropTarget$cmCT = new com.coremedia.blueprint.social.channels.AdapterDropAreaTarget(this,AS3.as( this,  com.coremedia.blueprint.social.channels.ChannelContainer), null, null, null,AS3.bind( this,"handleContentDrop$cmCT"));
  }/*

  override protected*/ function afterLayout(layout/*:ContainerLayout*/)/*:void*/ {
    Ext.panel.Panel.prototype.afterLayout.call(this,layout);
    this.refreshColors(AS3.getBindable(this,"adapter").getColor());
  }/*

  private*/ function handleContentDrop(mayDrop/*:Boolean*/, contents/*:Array*/)/*:void*/ {var this$=this;
    if (mayDrop) {
      com.coremedia.blueprint.social.socialHubService.initComposerModel(AS3.getBindable(this,"adapter").getAdapterId(), contents, function ()/*:void*/ {
        this$.composeMessage();
      });
    }
  }/*

  protected*/ function forceReload()/*:void*/ {
    this.reload(true);
  }/*

  /**
   *
   * @param invalidate false when adapter should not be invalidated.
   * /
  public*/ function reload(invalidate/*:Boolean = true*/)/*:void*/ {if(arguments.length<=0)invalidate=true;
    this.getActiveItemExpression().setValue(ChannelContainerBase.LOADER_ITEM_ID);
    this.createLoadMask$cmCT();
    this.loadMask$cmCT.show();
    AS3.setBindable(this.loadMask$cmCT,"progress" , 0);

    if (invalidate) {
      AS3.getBindable(this,"adapter").invalidate(AS3.bind(this,"loadMessages$cmCT"));
    }
    else {
      this.loadMessages$cmCT(false);
    }
  }/*

  private*/ function createLoadMask()/*:void*/ {
    var loadMaskConfig/*:ProgressLoadMask*/ = AS3.cast(com.coremedia.ui.components.ProgressLoadMask,{});
    // todo: workaround to style the mask smaller. This should be done better in the component itself, including tranparent svg
    AS3.setBindable(loadMaskConfig,"style" , "{position: relative; height: 100px; width: 100px; position: absolute; left: 50%; margin-left: -50px; top: 40%; margin-top: -50px;}");
    loadMaskConfig.msg = '';
    loadMaskConfig.target = this.queryById(ChannelContainerBase.LOADER_ITEM_ID);
    this.loadMask$cmCT = new com.coremedia.ui.components.ProgressLoadMask(loadMaskConfig);
  }/*

  private*/ function loadMessages(invalidate/*:Boolean = true*/)/*:void*/ {if(arguments.length<=0)invalidate=true;
    var history/*:MessagesContainer*/ =AS3.as( this.queryById(com.coremedia.blueprint.social.channels.ChannelContainer.MESSAGE_HISTORY_ITEM_ID),  com.coremedia.blueprint.social.messages.MessagesContainer);
    history.clear();
    var queue/*:MessagesContainer*/ =AS3.as( this.queryById(com.coremedia.blueprint.social.channels.ChannelContainer.MESSAGE_SCHEDULED_ITEM_ID),  com.coremedia.blueprint.social.messages.MessagesContainer);
    queue.clear();

    var messages/*:Array*/ = AS3.getBindable(this,"adapter").getScheduledMessages() || [];
    messages = messages.concat(AS3.getBindable(this,"adapter").getSentMessages() || []);
    if (messages.length === 0) {
      //nothing to load
      this.loadMask$cmCT.destroy();
      this.getActiveItemExpression().setValue(ChannelContainerBase.MESSAGE_WRAPPER_ITEM_ID);
      return;
    }

    this.loadMask$cmCT['messagesCount'] = 0;
    this.loadMask$cmCT['messagesLength'] = messages.length;
    this.loadMask$cmCT.el.dom['children'][1].setAttribute('style', 'background: transparent;');

    history.activeItemExpression = this.getActiveItemExpression();
    history.loadMask = this.loadMask$cmCT;

    queue.loadMask = this.loadMask$cmCT;
    queue.activeItemExpression = this.getActiveItemExpression();

    //reload only when the adapter is manually invalidated.
    if (invalidate) {
      history.reload();
      queue.reload();
    }
  }/*

  internal*/ function getActiveItemExpression()/*:ValueExpression*/ {
    if (!this.activeItemExpression$cmCT) {
      this.activeItemExpression$cmCT = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(ChannelContainerBase.LOADER_ITEM_ID);
    }
    return this.activeItemExpression$cmCT;
  }/*

  public*/ function onComposerClose()/*:void*/ {
    if (this.rendered) {
      this.refreshColors(AS3.getBindable(this,"adapter").getColor());
    }
  }/*

  public*/ function refreshColors(color/*:String*/)/*:void*/ {
    var topToolbar/*:Toolbar*/ =AS3.as( this.getDockedItems("toolbar[dock=\"top\"]")[0],  Ext.toolbar.Toolbar);
    topToolbar.el.dom.setAttribute('style', 'background-color:' + color);
    AS3.getBindable(this,"adapter").setColor(color);

    var buttons/*:Array*/ = topToolbar.query(com.coremedia.ui.util.createComponentSelector()._xtype(com.coremedia.ui.components.IconButton.xtype).build());
    for/* each*/(var $1=0;$1</* in*/ buttons.length;++$1) {var b/*:Button*/ =buttons[$1];
      var style/*:String*/ =AS3.as( b.el.dom.getAttribute('style'),  String);
      style = style.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi, AS3.getBindable(this,"adapter").getColor());
      b.el.dom.setAttribute("style", style);
    }

    var backgroundColor/*:String*/ = com.coremedia.blueprint.social.channels.Colors.getBackgroundColor(color);
    var adapterStyle/*:String*/ =AS3.as( this.el.dom.getAttribute('style'),  String);
    this.el.dom.setAttribute("style", adapterStyle + "background-color:" + backgroundColor);
  }/*

  protected*/ function composeMessage()/*:void*/ {
    this.setComposerButtonState(true);
    if (com.coremedia.blueprint.social.composer.ComposerBase.isOpened(AS3.getBindable(this,"adapter"))) {
      return;
    }

    var pos/*:Array*/ = this.getPosition();
    var composer/*:ComposerModelImpl*/ =AS3.as( com.coremedia.blueprint.social.socialHubService.getComposerModel(AS3.getBindable(this,"adapter").getAdapterId()),  com.coremedia.blueprint.social.beans.ComposerModelImpl);
    var baseConfig/*:Object*/ = {
      x: this.getX() + (this.getWidth() / 2) - (450 / 2) - 100, //100px offset from left favourites toolbar
      y: pos[1] + 14,
      adapter: AS3.getBindable(this,"adapter"),
      channelContainer: this,
      bindTo: com.coremedia.ui.data.ValueExpressionFactory.createFromValue(composer),
      xtype: com.coremedia.blueprint.social.composer.Composer.xtype,
      animateTarget: this.getComposerButton$cmCT().getEl(),
      renderTo: this.findParentByType(com.coremedia.blueprint.social.SocialHubMainTab.xtype).getLayout().getTarget()
    };

    var composerBase/*:ComposerBase*/ =AS3.as( Ext.ComponentManager.create(baseConfig),  com.coremedia.blueprint.social.composer.ComposerBase);
    composer.invalidate(function ()/*:void*/ {
      composerBase.show();
    });
  }/*

  private*/ function addButtonStyleListeners()/*:void*/ {
    var topToolbar/*:Toolbar*/ =AS3.as( this.getDockedItems("toolbar[dock=\"top\"]")[0],  Ext.toolbar.Toolbar);
    var buttons/*:Array*/ = topToolbar.query(com.coremedia.ui.util.createComponentSelector()._xtype(com.coremedia.ui.components.IconButton.xtype).build());
    for/* each*/(var $1=0;$1</* in*/ buttons.length;++$1) {var b/*:Button*/ =buttons[$1];
      this.applyColorSelection$cmCT(b);
    }
    var menuButton/*:Component*/ = topToolbar.query(com.coremedia.ui.util.createComponentSelector()._xtype(com.coremedia.ui.components.MenuIconButton.xtype).build())[0];
    this.applyColorSelection$cmCT(menuButton);
  }/*

  private*/ function getComposerButton()/*:Button*/ {
    var topToolbar/*:Toolbar*/ =AS3.as( this.getDockedItems("toolbar[dock=\"top\"]")[0],  Ext.toolbar.Toolbar);
    return AS3.as( topToolbar.queryById(com.coremedia.blueprint.social.channels.ChannelContainer.COMPOSER_BUTTON_ITEM_ID),  Ext.button.Button);
  }/*

  private*/ function getColorButton()/*:Button*/ {
    var topToolbar/*:Toolbar*/ =AS3.as( this.getDockedItems("toolbar[dock=\"top\"]")[0],  Ext.toolbar.Toolbar);
    return AS3.as( topToolbar.queryById(com.coremedia.blueprint.social.channels.ChannelContainer.COLOR_CHOOSER_BUTTON_ITEM_ID),  Ext.button.Button);
  }/*

  private*/ function applyColorSelection(component/*:Component*/)/*:void*/ {
    component.el.on('mouseover',AS3.bind( this,"hoverButton$cmCT"));
    component.el.on('mouseleave',AS3.bind( this,"hoverExitButton$cmCT"));
  }/*

  //TODO move to custom component
  private*/ function hoverExitButton(e/*:Event*/)/*:void*/ {
    var style/*:String*/ =AS3.as( e.target.getAttribute("style"),  String);
    var styleIndex/*:Number*/ = style.indexOf('background-color');
    if (styleIndex !== -1) {
      var b/*:Button*/ =AS3.as( Ext.getCmp(AS3.as(e.target.getAttribute('data-componentid'),  String)),  Ext.button.Button);
      if (b && AS3.getBindable(b,"menu","DUMMY")) {
        if (AS3.getBindable(b,"menu","DUMMY").isVisible()) {
          return;
        }
      }

      if (!b.pressed) {
        style = style.substr(0, styleIndex);
        e.target.setAttribute("style", style);
      }
    }
  }/*

  public*/ function setComposerButtonState(disabled/*:Boolean*/)/*:void*/ {
    if(this.rendered) {
      this.getColorButton$cmCT().setDisabled(disabled);
      this.getComposerButton$cmCT().setDisabled(disabled);
      this.getComposerButton$cmCT().setPressed(disabled);
      this.refreshColors(AS3.getBindable(this,"adapter").getColor());
    }
  }/*

  private*/ function hoverButton(e/*:Event*/)/*:void*/ {
    if (e.target.tagName.toLowerCase() === "a") {
      var b/*:Button*/ =AS3.as( Ext.getCmp(e.target.id),  Ext.button.Button);
      var color/*:String*/ = AS3.getBindable(this,"adapter").getHoverColor();
      if (b.pressed) {
        color = AS3.getBindable(this,"adapter").getPressedColor();
      }

      var style/*:**/ = e.target.getAttribute("style");
      if (style.indexOf('background-color') === -1) {
        style = style + "background-color:" + color;
      }
      else {
        style = style.replace(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi, color);
      }
      e.target.setAttribute("style", style);
    }
  }/*

  protected*/ function format(msg/*:String*/, length/*:int*/)/*:String*/ {
    if (msg && msg.length > length) {
      return msg.substr(0, length) + "...";
    }
    return msg;
  }/*

  override protected*/ function onDestroy()/*:void*/ {
    Ext.panel.Panel.prototype.onDestroy.call(this);
    this.dropTarget$cmCT && this.dropTarget$cmCT.unreg();
  }/*

  protected*/ function resolveHistoryTitle(ad/*:SocialHubAdapter*/)/*:String*/ {
    if (ad.isNativeHistory()) {
      return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_History_extern_title');
    }

    return this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'channel_history_title');
  }/*

}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.panel.Panel",
      loadMask$cmCT: null,
      dropTarget$cmCT: null,
      activeItemExpression$cmCT: null,
      constructor: ChannelContainerBase$,
      super$cmCT: function() {
        Ext.panel.Panel.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      afterLayout: afterLayout,
      handleContentDrop$cmCT: handleContentDrop,
      forceReload: forceReload,
      reload: reload,
      createLoadMask$cmCT: createLoadMask,
      loadMessages$cmCT: loadMessages,
      getActiveItemExpression: getActiveItemExpression,
      onComposerClose: onComposerClose,
      refreshColors: refreshColors,
      composeMessage: composeMessage,
      addButtonStyleListeners$cmCT: addButtonStyleListeners,
      getComposerButton$cmCT: getComposerButton,
      getColorButton$cmCT: getColorButton,
      applyColorSelection$cmCT: applyColorSelection,
      hoverExitButton$cmCT: hoverExitButton,
      setComposerButtonState: setComposerButtonState,
      hoverButton$cmCT: hoverButton,
      format: format,
      onDestroy: onDestroy,
      resolveHistoryTitle: resolveHistoryTitle,
      config: {adapter: null},
      statics: {
        LOADER_ITEM_ID: "loader",
        MESSAGE_WRAPPER_ITEM_ID: "messagesWrapper"
      },
      requires: [
        "Ext",
        "Ext.ComponentManager",
        "Ext.button.Button",
        "Ext.panel.Panel",
        "Ext.toolbar.Toolbar",
        "com.coremedia.ui.components.IconButton",
        "com.coremedia.ui.components.MenuIconButton",
        "com.coremedia.ui.components.ProgressLoadMask",
        "com.coremedia.ui.data.ValueExpressionFactory",
        "com.coremedia.ui.util.createComponentSelector"
      ],
      uses: [
        "com.coremedia.blueprint.social.SocialHubMainTab",
        "com.coremedia.blueprint.social.beans.ComposerModelImpl",
        "com.coremedia.blueprint.social.channels.AdapterDropAreaTarget",
        "com.coremedia.blueprint.social.channels.ChannelContainer",
        "com.coremedia.blueprint.social.channels.Colors",
        "com.coremedia.blueprint.social.composer.Composer",
        "com.coremedia.blueprint.social.composer.ComposerBase",
        "com.coremedia.blueprint.social.messages.MessagesContainer",
        "com.coremedia.blueprint.social.socialHubService"
      ]
    };
});
