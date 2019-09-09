package com.coremedia.blueprint.social.composer {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.SocialHubAdapterImpl;
import com.coremedia.blueprint.social.beans.SocialHubAdapters;
import com.coremedia.blueprint.social.beans.ComposerModel;
import com.coremedia.blueprint.social.beans.Message;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.blueprint.social.beans.SocialHubPropertyNames;
import com.coremedia.blueprint.social.channels.ChannelContainer;
import com.coremedia.blueprint.social.socialHubService;
import com.coremedia.ui.data.ValueExpression;

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

  public function ComposerBase(config:ComposerBase = null) {
    config.id = COMPOSER_WINDOW_ID + config.adapter.getAdapterId();
    super(config);
  }

  public static function isOpened(adapter:SocialHubAdapter):Boolean {
    var cmp:ComposerBase = Ext.getCmp(COMPOSER_WINDOW_ID + adapter.getAdapterId()) as ComposerBase;
    if (cmp && cmp.isVisible()) {
      return true;
    }
    return false;
  }


  override public function close():void {
    closeComposer();
    super.close();
  }

  /**
   * Should be necessary, but hide and bringToFront don't work without errors from overrides
   */
  public static function closeAll():void {
    var adapters:SocialHubAdapters = socialHubService.getAdaptersExpression().getValue();
    if(adapters) {
      for each(var adapter:SocialHubAdapter in adapters.getAdapters()) {
        var cmp:ComposerBase = Ext.getCmp(COMPOSER_WINDOW_ID + adapter.getAdapterId()) as ComposerBase;
        if (cmp && cmp.isVisible()) {
          cmp.channelContainer.setComposerButtonState(false);
          cmp.destroy();
        }
      }
    }
  }

  override protected function afterRender():void {
    super.afterRender();
    getScheduledDateExpression(adapter).addChangeListener(scheduleDateChanged);

    var container:Container = queryById(Composer.EDITOR_PANEL) as Container;
    var properties:Array = adapter.getMessageProperties();
    var props:Array = properties.concat([]).reverse();

    for each(var property:MessageProperty in props) {
      var propertyType:String = property.getPropertyType();
      var config:Object = {};

      var xType:String = 'com.coremedia.blueprint.social.studio.config.editor.' + propertyType.toLowerCase();
      config.xtype = xType;
      config.adapter = adapter;
      config.property = property;
      config.bindTo = bindTo.extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(property.getName());

      var editor:Component = createEditor(config);
      container.insert(0, editor);
    }
  }

  private function createEditor(config:Object):Component {
    var cmp:Component = null;
    try {
      return ComponentManager.create(config);
    } catch (e:Error) {
      trace('[ERROR]', 'Failed to create composer component "' + config.xtype + '" ' + e);
    }
    return null;
  }


  protected function getScheduledDateExpression(ch:SocialHubAdapter):ValueExpression {
    if (!scheduleDateExpression) {
      scheduleDateExpression = bindTo.extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE);
    }
    return scheduleDateExpression;
  }

  public function sendMessage():void {
    channelContainer.setComposerButtonState(false);
    var composerModel:ComposerModel = bindTo.getValue();
    composerModel.send(function (message:Message):void {
      channelContainer.reload();
      close();
    });
  }

  public function closeComposer():void {
    var composerModel:ComposerModel = bindTo.getValue();
    composerModel.reset();
    channelContainer.setComposerButtonState(false);
    super.close();
  }

  protected function getComposerTitle(ch:SocialHubAdapter):String {
    var cType:String = ch.getType().toLowerCase();
    var title:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'composer_title');
    return StringUtil.format(title, ch.getDisplayName());
  }

  //-------------------- Helper ----------------------------------------------------------------------------------------

  private function scheduleDateChanged(ve:ValueExpression):void {
    var btn:Button = queryById('postBtn') as Button;

    var value:Date = ve.getValue();
    if (value) {
      btn.setText(resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'schedule_button_text'));
    } else {
      btn.setText(resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'post_button_text'));
    }
  }

  override protected function onDestroy():void {
    channelContainer.onComposerClose();
    getScheduledDateExpression(adapter).removeChangeListener(scheduleDateChanged);
    super.onDestroy();
  }
}
}
