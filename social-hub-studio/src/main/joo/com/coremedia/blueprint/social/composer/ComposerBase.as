package com.coremedia.blueprint.social.composer {
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
import com.coremedia.ui.mixins.ValidationState;

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

  public function ComposerBase(config:ComposerBase = null) {
    config.id = COMPOSER_WINDOW_ID + config.adapter.getAdapterId();
    super(config);
  }

  public static function isOpened(adapter:SocialHubAdapter):Boolean {
    var cmp:ComposerBase = Ext.getCmp(COMPOSER_WINDOW_ID + adapter.getAdapterId()) as ComposerBase;
    return (cmp && cmp.isVisible());
  }

  override public function close():void {
    closeComposer();
    super.close();
  }

  public static function scrollIntoView():void {
    var adapters:SocialHubAdapters = socialHubService.getAdaptersExpression().getValue();
    if (adapters) {
      for each(var adapter:SocialHubAdapter in adapters.getAdapters()) {
        var cmp:ComposerBase = Ext.getCmp(COMPOSER_WINDOW_ID + adapter.getAdapterId()) as ComposerBase;
        if (cmp && cmp.isVisible()) {
          cmp.scrollIntoView();
        }
      }
    }
  }

  /**
   * Should be necessary, but hide and bringToFront don't work without errors from overrides
   */
  public static function closeAll():void {
    var adapters:SocialHubAdapters = socialHubService.getAdaptersExpression().getValue();
    if (adapters) {
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
    getScheduledDateExpression().addChangeListener(scheduleDateChanged);

    var container:Container = queryById(Composer.EDITOR_PANEL) as Container;
    var properties:Array = adapter.getMessageProperties();
    var props:Array = properties.concat([]).reverse();

    this.editors = {};

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

      //store editor instances for validation
      editors[property.getName()] = editor;
    }
  }

  private function scrollIntoView():void {
    var x:Number = channelContainer.getX() + (channelContainer.getWidth() / 2) - (450 / 2) - 100; //100px offset from left favourites toolbar
    var y:Number = channelContainer.getPosition()[1] + 14;
    this.setPosition(x, y);
  }

  private function createEditor(config:Object):Component {
    try {
      return ComponentManager.create(config);
    } catch (e:Error) {
      trace('[ERROR]', 'Failed to create composer component "' + config.xtype + '" ' + e);
    }
    return null;
  }


  protected function getScheduledDateExpression():ValueExpression {
    if (!scheduleDateExpression) {
      scheduleDateExpression = bindTo.extendBy(SocialHubPropertyNames.MESSAGE_PROPERTIES).extendBy(SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE);
    }
    return scheduleDateExpression;
  }

  protected function finishComposing():void {
    var msgs:Array = validateEditors();
    getErrorMessagesExpression().setValue(msgs.reverse());
    if (msgs.length === 0) {
      sendMessage();
    }
  }

  protected function getErrorMessagesExpression():ValueExpression {
    if (!errorMessagesExpression) {
      errorMessagesExpression = ValueExpressionFactory.createFromValue([]);
    }
    return errorMessagesExpression;
  }

  private function validateEditors():Array {
    var result:Array = [];
    for (var key:String in editors) {
      var property:MessageProperty = getProperty(key);
      if (!property.isRequired()) {
        continue;
      }

      var editor:MessageFieldEditor = editors[key];
      var msg:String = editor.getErrorMessage();
      if (msg && StringUtil.trim(msg).length > 0) {
        result.push(msg);
      }
    }
    return result;
  }

  private function getProperty(name:String):MessageProperty {
    var properties:Array = adapter.getMessageProperties();
    for each(var property:MessageProperty in properties) {
      if (property.getName() === name) {
        return property;
      }
    }
    return null;
  }

  private function sendMessage():void {
    var composerModel:ComposerModel = bindTo.getValue();

    //check if we should wait for the elastic worker or not
    var publicationDate:Date = composerModel.getPublicationDate();
    var waitForJob:Boolean = publicationDate === null || !adapter.isSchedulingSupported();

    //publication date messages don't need a toast
    if (waitForJob) {
      var network:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', adapter.getType().toLowerCase() + '_title');
      var title:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'compose_job_notification_start_title');
      title = StringUtil.format(title, network);
      var msg:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'compose_job_notification_start');
      var toast:String = StringUtil.format(msg, network);
      socialHubService.showToast(title, toast);
    }

    var c:ChannelContainer = channelContainer;
    composerModel.send(waitForJob, function (message:Message):void {
      close();
      if (c.rendered && !waitForJob) {
        c.reload(true);
      }
    }, function (error:Object):void {
      if (c.rendered) {
        c.reload(true);
      }

      if (waitForJob) {
        var title:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'compose_job_notification_finished_title');
        var msg:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'compose_job_notification_finished');
        var toast:String = StringUtil.format(msg, network);

        var state:ValidationState = ValidationState.SUCCESS;
        if (error && error.getErrorCode()) {
          var code:String = error.getErrorCode();
          toast = resourceManager.getString('com.coremedia.cms.editor.sdk.jobs.JobErrorCodes', code);
          toast = StringUtil.format(toast, network);
          state = ValidationState.ERROR;
        }

        socialHubService.showToast(title, toast, state);
      }
    });

    //finally, enabled the composer button again
    channelContainer.setComposerButtonState(false);
  }

  public function closeComposer():void {
    var composerModel:ComposerModel = bindTo.getValue();
    composerModel.reset();
    channelContainer.setComposerButtonState(false);
    super.close();
  }

  protected function getComposerTitle(ch:SocialHubAdapter):String {
    var title:String = resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'composer_title');
    return StringUtil.format(title, ch.getDisplayName());
  }

  //-------------------- Helper ----------------------------------------------------------------------------------------

  private function scheduleDateChanged(ve:ValueExpression):void {
    var btn:Button = queryById('postBtn') as Button;

    var value:Date = ve.getValue();
    if (value) {
      btn.setText(resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'schedule_button_text'));
    }
    else {
      btn.setText(resourceManager.getString('com.coremedia.blueprint.social.SocialHub', 'post_button_text'));
    }
  }

  override protected function onDestroy():void {
    channelContainer.onComposerClose();
    getScheduledDateExpression().removeChangeListener(scheduleDateChanged);
    super.onDestroy();
  }
}
}
