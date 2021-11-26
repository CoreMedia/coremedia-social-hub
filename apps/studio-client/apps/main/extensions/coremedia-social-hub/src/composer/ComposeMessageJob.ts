import { asConfig, mixin } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";
import SocialHub_properties from "../SocialHub_properties";
import SocialHubAdapter from "../beans/SocialHubAdapter";
import socialHubService from "../socialHubService";
import RemoteJobBase from "@coremedia/studio-client.cap-rest-client-impl/common/impl/RemoteJobBase";
import JobContext from "@coremedia/studio-client.cap-rest-client/common/JobContext";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import BackgroundJob from "@coremedia/studio-client.main.editor-components/sdk/jobs/BackgroundJob";
import StringUtil from "@jangaroo/ext-ts/String";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";


class ComposeMessageJob extends RemoteJobBase implements BackgroundJob {
  static readonly #JOB_TYPE:string = "socialHubComposeMessageJob";

  #adapterId:string = null;
  #adapterType:string = null;
  #messageId:string = null;
  #ctx:JobContext = null;

  constructor(adapterType:string, adapterId:string, messageId:string) {
    super();
    this.#adapterType = adapterType;
    this.#adapterId = adapterId;
    this.#messageId = messageId;
  }


  override execute(jobContext:JobContext):void {
    this.#ctx = jobContext;
    super.execute(jobContext);
  }

  protected override getJobType():string {
    return ComposeMessageJob.#JOB_TYPE;
  }

  protected override getParams():any {
    return {
      adapterId: this.#adapterId,
      messageId: this.#messageId
    };
  }

  protected override mayRetry():boolean {
    return false;
  }

  getNameExpression():ValueExpression {
    var msg = SocialHub_properties.compose_job_title;
    var network = SocialHub_properties[this.#adapterType.toLowerCase() + "_title"];
    msg = StringUtil.format(msg, network);
    return ValueExpressionFactory.createFromValue(msg);
  }

  getIconClsExpression():ValueExpression {
    var cls = SocialHub_properties[this.#adapterType.toLowerCase()];
    return ValueExpressionFactory.createFromValue(cls);
  }

  getErrorHandler():AnyFunction {
    return ():void => {

    };
  }

  getSuccessHandler():AnyFunction {
    return ():void => {
      var socialHubAdapter = socialHubService.getAdapter(this.#adapterId);
      socialHubService.focusAndReload(socialHubAdapter);
    };
  }
}
mixin(ComposeMessageJob, BackgroundJob);

export default ComposeMessageJob;
