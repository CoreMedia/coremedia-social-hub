package com.coremedia.blueprint.social.composer {
import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.socialHubService;
import com.coremedia.cap.common.JobContext;
import com.coremedia.cap.common.impl.*;
import com.coremedia.cms.editor.sdk.jobs.BackgroundJob;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;

import ext.StringUtil;

import mx.resources.ResourceManager;

public class ComposeMessageJob extends RemoteJobBase implements BackgroundJob {
  private static const JOB_TYPE:String = "socialHubComposeMessageJob";

  private var adapterId:String;
  private var adapterType:String;
  private var messageId:String;
  private var ctx:JobContext;

  public function ComposeMessageJob(adapterType:String, adapterId:String, messageId:String) {
    this.adapterType = adapterType;
    this.adapterId = adapterId;
    this.messageId = messageId;
  }


  override public function execute(jobContext:JobContext):void {
    this.ctx = jobContext;
    super.execute(jobContext);
  }

  override protected function getJobType():String {
    return JOB_TYPE;
  }

  override protected function getParams():Object {
    return {
      adapterId: adapterId,
      messageId: messageId
    };
  }

  override protected function mayRetry():Boolean {
    return false;
  }

  public function getNameExpression():ValueExpression {
    var msg:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', 'compose_job_title');
    var network:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', adapterType.toLowerCase() + '_title');
    msg = StringUtil.format(msg, network);
    return ValueExpressionFactory.createFromValue(msg);
  }

  public function getIconClsExpression():ValueExpression {
    var cls:String = ResourceManager.getInstance().getString('com.coremedia.blueprint.social.SocialHub', adapterType.toLowerCase());
    return ValueExpressionFactory.createFromValue(cls);
  }

  public function getErrorHandler():Function {
    return function ():void {

    };
  }

  public function getSuccessHandler():Function {
    return function ():void {
      var socialHubAdapter:SocialHubAdapter = socialHubService.getAdapter(adapterId);
      socialHubService.focusAndReload(socialHubAdapter);
    };
  }
}
}
