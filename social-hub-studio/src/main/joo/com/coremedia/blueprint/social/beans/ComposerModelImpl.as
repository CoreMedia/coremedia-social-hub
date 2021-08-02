package com.coremedia.blueprint.social.beans {
import com.coremedia.blueprint.social.composer.ComposeMessageJob;
import com.coremedia.blueprint.social.socialHubService;
import com.coremedia.cap.common.TrackedJob;
import com.coremedia.cap.common.jobService;
import com.coremedia.ui.data.RemoteBean;
import com.coremedia.ui.data.beanFactory;
import com.coremedia.ui.data.impl.BeanFactoryImpl;
import com.coremedia.ui.data.impl.RemoteBeanImpl;
import com.coremedia.ui.data.impl.RemoteServiceMethod;
import com.coremedia.ui.data.impl.RemoteServiceMethodResponse;
import com.coremedia.ui.data.impl.SubBean;
import com.coremedia.ui.mixins.ValidationState;

import ext.JSON;
import ext.StringUtil;

import mx.resources.ResourceManager;

[RestResource(uriTemplate="socialhub/composermodel/{id:[^/]+}/{adapterId:[^/]+}")]
public class ComposerModelImpl extends RemoteBeanImpl implements ComposerModel {

  function ComposerModelImpl(path:String) {
    super(path);
  }

  override public function get(property:*):* {
    if (property === "type") {
      return beanFactory.createLocalBean({'name': 'ComposerModel'});
    }
    return super.get(property);
  }

  override protected function isSubObject(value:*, propertyPath:*):Boolean {
    return propertyPath === SocialHubPropertyNames.COMPOSER_PROPERTIES;
  }

  override protected function createSubBean(propertyPathPrefix:String):SubBean {
    return new ComposerModelPropertiesImpl(this, propertyPathPrefix);
  }

  public function getProperties():ComposerModelProperties {
    return get(SocialHubPropertyNames.COMPOSER_PROPERTIES);
  }

  public function getAttachments():Array {
    return get(SocialHubPropertyNames.COMPOSER_ATTACHMENTS);
  }

  public function getAdapterType():String {
    return get(SocialHubPropertyNames.COMPOSER_ADAPTER_TYPE);
  }

  public function getAdapterId():String {
    return get(SocialHubPropertyNames.COMPOSER_ADAPTER_ID);
  }

  public function getPublicationDate():Date {
    return getProperties().get(SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE);
  }

  public function send(doWait:Boolean, savedCallback:Function, publicationCallback:Function):void {
    var method:RemoteServiceMethod = new RemoteServiceMethod(getUriPath(), 'POST');
    method.request({},
            function (response:RemoteServiceMethodResponse):void {
              var bean:RemoteBean = response.getResponseJSON() as RemoteBean;
              savedCallback(bean);

              if (bean is Message) {
                var msg:MessageImpl = bean as MessageImpl;
                msg.load(function (message:Message):void {
                  if (doWait) {
                    triggerPublicationJob(msg, publicationCallback);
                  }
                });
              }
            },
            function (response:RemoteServiceMethodResponse):void {
              savedCallback(response.getError());
            }
    );
  }

  public static function showResultToast(adapter:SocialHubAdapter, error:Object):void {
    var network:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', adapter.getType().toLowerCase() + '_title');
    var title:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'compose_job_notification_finished_title');
    var msg:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'compose_job_notification_finished');
    var toast:String = StringUtil.format(msg, network);

    var state:ValidationState = ValidationState.SUCCESS;
    if (error && error.getErrorCode()) {
      var code:String = error.getErrorCode();
      toast = ResourceManager.getInstance().getString('com.coremedia.cms.editor.sdk.jobs.JobErrorCodes', code);
      toast = StringUtil.format(toast, network);
      state = ValidationState.ERROR;
    }

    socialHubService.showToast(title, toast, state, null, function ():void {
      socialHubService.focusAdapter(adapter, function(){});
    });
  }

  public static function triggerPublicationJob(message:MessageImpl, publicationCallback:Function):void {
    var adapter:SocialHubAdapter = message.getAdapter();
    var job:ComposeMessageJob = new ComposeMessageJob(adapter.getType(), adapter.getAdapterId(), message.getMessageId());
    var trackedJob:TrackedJob = jobService.executeJob(job,
            //on success
            function ():void {
              //default handler is ok, we don't need any post-processing
              message.invalidate(function ():void {
                publicationCallback();
              });
            },
            //on error
            function (result:Object):void {
              message.invalidate(function ():void {
                publicationCallback(result);
              });
            });
  }

  public function reset(callback:Function = undefined):void {
    var method:RemoteServiceMethod = new RemoteServiceMethod(getUriPath(), 'DELETE');
    method.request({},
            function (response:RemoteServiceMethodResponse):void {
              var result:Boolean = response.getResponseJSON();
              if (callback) {
                callback(result);
              }

            },
            function (response:RemoteServiceMethodResponse):void {
              if (callback) {
                callback(response.getError());
              }
            }
    );
  }
}
}
