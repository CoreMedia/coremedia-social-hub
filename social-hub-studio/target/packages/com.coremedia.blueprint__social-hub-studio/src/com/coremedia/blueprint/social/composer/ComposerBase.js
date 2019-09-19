Ext.define("com.coremedia.blueprint.social.composer.ComposerBase", function(ComposerBase) {/*package com.coremedia.blueprint.social.composer {
import com.coremedia.blueprint.social.beans.ComposerModel;
import com.coremedia.blueprint.social.beans.Message;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubAdapters;
import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
import com.coremedia.blueprint.social.channels.ChannelContainer;
import com.coremedia.blueprint.social.socialHubService;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;

import ext.Component;
import ext.ComponentManager;
import ext.Ext;
import ext.StringUtil;
import ext.button.Button;
import ext.container.Container;
import ext.window.Window;

public class ComposerBase extends Window {
  public static const COMPOSER_WINDOW_ID:String = "composerWindow";
  private var scheduleDateExpression:ValueExpression;

  [Bindable]
  public var adapter:SocialHubAdapter;

  [Bindable]
  public var channelContainer:ChannelContainer;

  [Bindable]
  public var bindTo:ValueExpression;

  private var editors:Object;
  private var errorMessagesExpression:ValueExpression;

  public*/ function ComposerBase$(config/*:ComposerBase = null*/) {if(arguments.length<=0)config=null;
    config.id = ComposerBase.COMPOSER_WINDOW_ID + AS3.getBindable(config,"adapter").getAdapterId();
    this.super$LBCl(config);
  }/*

  public static*/ function isOpened$static(adapter/*:SocialHubAdapter*/)/*:Boolean*/ {
    var cmp/*:ComposerBase*/ =AS3.as( Ext.getCmp(ComposerBase.COMPOSER_WINDOW_ID + adapter.getAdapterId()),  ComposerBase);
    if (cmp && cmp.isVisible()) {
      return true;
    }
    return false;
  }/*


  override public*/ function close()/*:void*/ {
    this.closeComposer();
    Ext.window.Window.prototype.close.call(this);
  }/*

  /**
   * Should be necessary, but hide and bringToFront don't work without errors from overrides
   * /
  public static*/ function closeAll$static()/*:void*/ {
    var adapters/*:SocialHubAdapters*/ = com.coremedia.blueprint.social.socialHubService.getAdaptersExpression().getValue();
    if (adapters) {
      for/* each*/(var $1=0,$2=/* in*/ adapters.getAdapters();$1<$2.length;++$1) {var adapter/*:SocialHubAdapter*/ =$2[$1];
        var cmp/*:ComposerBase*/ =AS3.as( Ext.getCmp(ComposerBase.COMPOSER_WINDOW_ID + adapter.getAdapterId()),  ComposerBase);
        if (cmp && cmp.isVisible()) {
          AS3.getBindable(cmp,"channelContainer").setComposerButtonState(false);
          cmp.destroy();
        }
      }
    }
  }/*

  override protected*/ function afterRender()/*:void*/ {
    Ext.window.Window.prototype.afterRender.call(this);
    this.getScheduledDateExpression(AS3.getBindable(this,"adapter")).addChangeListener(AS3.bind(this,"scheduleDateChanged$LBCl"));

    var container/*:Container*/ =AS3.as( this.queryById(com.coremedia.blueprint.social.composer.Composer.EDITOR_PANEL),  Ext.container.Container);
    var properties/*:Array*/ = AS3.getBindable(this,"adapter").getMessageProperties();
    var props/*:Array*/ = properties.concat([]).reverse();

    this.editors$LBCl = {};

    for/* each*/(var $1=0;$1</* in*/ props.length;++$1) {var property/*:MessageProperty*/ =props[$1];
      var propertyType/*:String*/ = property.getPropertyType();
      var config/*:Object*/ = {};

      var xType/*:String*/ = 'com.coremedia.blueprint.social.studio.config.editor.' + propertyType.toLowerCase();
      config.xtype = xType;
      config.adapter = AS3.getBindable(this,"adapter");
      config.property = property;
      config.bindTo = AS3.getBindable(this,"bindTo").extendBy(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(property.getName());

      var editor/*:Component*/ = this.createEditor$LBCl(config);
      container.insert(0, editor);

      //store editor instances for validation
      this.editors$LBCl[property.getName()] = editor;
    }
  }/*

  private*/ function createEditor(config/*:Object*/)/*:Component*/ {
    var cmp/*:Component*/ = null;
    try {
      return Ext.ComponentManager.create(config);
    } catch(e){if(AS3.is (e,AS3.Error)) {
      AS3.trace('[ERROR]', 'Failed to create composer component "' + config.xtype + '" ' + e);
    }else throw e;}
    return null;
  }/*


  protected*/ function getScheduledDateExpression(ch/*:SocialHubAdapter*/)/*:ValueExpression*/ {
    if (!this.scheduleDateExpression$LBCl) {
      this.scheduleDateExpression$LBCl = AS3.getBindable(this,"bindTo").extendBy(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE);
    }
    return this.scheduleDateExpression$LBCl;
  }/*

  protected*/ function finishComposing()/*:void*/ {
    var msgs/*:Array*/ = this.validateEditors$LBCl();
    this.getErrorMessagesExpression().setValue(msgs.reverse());
    if (msgs.length === 0) {
      this.sendMessage$LBCl();
    }
  }/*

  protected*/ function getErrorMessagesExpression()/*:ValueExpression*/ {
    if(!this.errorMessagesExpression$LBCl) {
      this.errorMessagesExpression$LBCl = com.coremedia.ui.data.ValueExpressionFactory.createFromValue([]);
    }
    return this.errorMessagesExpression$LBCl;
  }/*

  private*/ function validateEditors()/*:Array*/ {
    var result/*:Array*/ = [];
    for (var key in this.editors$LBCl) {
      var property/*:MessageProperty*/ = this.getProperty$LBCl(key);
      if(!property.isRequired()) {
        continue;
      }

      var editor/*:MessageFieldEditor*/ = this.editors$LBCl[key];
      var msg/*:String*/ = editor.getErrorMessage();
      if(msg && Ext.String.trim(msg).length > 0) {
        result.push(msg);
      }
    }
    return result;
  }/*

  private*/ function getProperty(name/*:String*/)/*:MessageProperty*/ {
    var properties/*:Array*/ = AS3.getBindable(this,"adapter").getMessageProperties();
    for/* each*/(var $1=0;$1</* in*/ properties.length;++$1) {var property/*:MessageProperty*/ =properties[$1];
      if(property.getName() === name) {
        return property;
      }
    }
    return null;
  }/*

  private*/ function sendMessage()/*:void*/ {var this$=this;
    AS3.getBindable(this,"channelContainer").setComposerButtonState(false);
    var composerModel/*:ComposerModel*/ = AS3.getBindable(this,"bindTo").getValue();
    composerModel.send(function (message/*:Message*/)/*:void*/ {
      AS3.getBindable(this$,"channelContainer").reload();
      this$.close();
    });
  }/*

  public*/ function closeComposer()/*:void*/ {
    var composerModel/*:ComposerModel*/ = AS3.getBindable(this,"bindTo").getValue();
    composerModel.reset();
    AS3.getBindable(this,"channelContainer").setComposerButtonState(false);
    Ext.window.Window.prototype.close.call(this);
  }/*

  protected*/ function getComposerTitle(ch/*:SocialHubAdapter*/)/*:String*/ {
    var cType/*:String*/ = ch.getType().toLowerCase();
    var title/*:String*/ = this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'composer_title');
    return Ext.String.format(title, ch.getDisplayName());
  }/*

  //-------------------- Helper ----------------------------------------------------------------------------------------

  private*/ function scheduleDateChanged(ve/*:ValueExpression*/)/*:void*/ {
    var btn/*:Button*/ =AS3.as( this.queryById('postBtn'),  Ext.button.Button);

    var value/*:Date*/ = ve.getValue();
    if (value) {
      btn.setText(this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'schedule_button_text'));
    }
    else {
      btn.setText(this.resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'post_button_text'));
    }
  }/*

  override protected*/ function onDestroy()/*:void*/ {
    AS3.getBindable(this,"channelContainer").onComposerClose();
    this.getScheduledDateExpression(AS3.getBindable(this,"adapter")).removeChangeListener(AS3.bind(this,"scheduleDateChanged$LBCl"));
    Ext.window.Window.prototype.onDestroy.call(this);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "Ext.window.Window",
      scheduleDateExpression$LBCl: null,
      editors$LBCl: null,
      errorMessagesExpression$LBCl: null,
      constructor: ComposerBase$,
      super$LBCl: function() {
        Ext.window.Window.prototype.constructor.apply(this, arguments);
      },
      close: close,
      afterRender: afterRender,
      createEditor$LBCl: createEditor,
      getScheduledDateExpression: getScheduledDateExpression,
      finishComposing: finishComposing,
      getErrorMessagesExpression: getErrorMessagesExpression,
      validateEditors$LBCl: validateEditors,
      getProperty$LBCl: getProperty,
      sendMessage$LBCl: sendMessage,
      closeComposer: closeComposer,
      getComposerTitle: getComposerTitle,
      scheduleDateChanged$LBCl: scheduleDateChanged,
      onDestroy: onDestroy,
      config: {
        adapter: null,
        channelContainer: null,
        bindTo: null
      },
      statics: {
        COMPOSER_WINDOW_ID: "composerWindow",
        isOpened: isOpened$static,
        closeAll: closeAll$static
      },
      requires: [
        "AS3.Error",
        "AS3.trace",
        "Ext",
        "Ext.ComponentManager",
        "Ext.String",
        "Ext.button.Button",
        "Ext.container.Container",
        "Ext.window.Window",
        "com.coremedia.ui.data.ValueExpressionFactory"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames",
        "com.coremedia.blueprint.social.composer.Composer",
        "com.coremedia.blueprint.social.socialHubService"
      ]
    };
});
