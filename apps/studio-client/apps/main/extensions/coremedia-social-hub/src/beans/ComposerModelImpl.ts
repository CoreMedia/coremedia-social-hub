import jobService from "@coremedia/studio-client.cap-rest-client/common/jobService";
import RemoteBeanImpl from "@coremedia/studio-client.client-core-impl/data/impl/RemoteBeanImpl";
import RemoteServiceMethod from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethod";
import RemoteServiceMethodResponse from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethodResponse";
import SubBean from "@coremedia/studio-client.client-core-impl/data/impl/SubBean";
import RemoteBean from "@coremedia/studio-client.client-core/data/RemoteBean";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import ValidationState from "@coremedia/studio-client.ext.ui-components/mixins/ValidationState";
import { as, is, mixin } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";
import SocialHub_properties from "../SocialHub_properties";
import ComposeMessageJob from "../composer/ComposeMessageJob";
import socialHubService from "../socialHubService";
import ComposerModel from "./ComposerModel";
import ComposerModelProperties from "./ComposerModelProperties";
import ComposerModelPropertiesImpl from "./ComposerModelPropertiesImpl";
import Message from "./Message";
import MessageImpl from "./MessageImpl";
import SocialHubAdapter from "./SocialHubAdapter";
import SocialHubPropertyNames from "./SocialHubPropertyNames";
import JobErrorCodes_properties from "@coremedia/studio-client.main.editor-components/sdk/jobs/JobErrorCodes_properties";
import StringUtil from "@jangaroo/ext-ts/String";

class ComposerModelImpl extends RemoteBeanImpl implements ComposerModel {
  static readonly REST_RESOURCE_URI_TEMPLATE: string = "socialhub/composermodel/{id:[^/]+}/{adapterId:[^/]+}";

  constructor(path: string) {
    super(path);
  }

  override get(property: any): any {
    if (property === "type") {
      return beanFactory._.createLocalBean({ "name": "ComposerModel" });
    }
    return super.get(property);
  }

  protected override isSubObject(value: any, propertyPath: any): boolean {
    return propertyPath === SocialHubPropertyNames.COMPOSER_PROPERTIES;
  }

  protected override createSubBean(propertyPathPrefix: string): SubBean {
    return new ComposerModelPropertiesImpl(this, propertyPathPrefix);
  }

  getProperties(): ComposerModelProperties {
    return this.get(SocialHubPropertyNames.COMPOSER_PROPERTIES);
  }

  getAttachments(): Array<any> {
    return this.get(SocialHubPropertyNames.COMPOSER_ATTACHMENTS);
  }

  getAdapterType(): string {
    return this.get(SocialHubPropertyNames.COMPOSER_ADAPTER_TYPE);
  }

  getAdapterId(): string {
    return this.get(SocialHubPropertyNames.COMPOSER_ADAPTER_ID);
  }

  getPublicationDate(): Date {
    return this.getProperties().get(SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE);
  }

  send(doWait: boolean, savedCallback: AnyFunction, publicationCallback: AnyFunction): void {
    const method = new RemoteServiceMethod(this.getUriPath(), "POST");
    method.request({},
      (response: RemoteServiceMethodResponse): void => {
        const bean = as(response.getResponseJSON(), RemoteBean);
        savedCallback(bean);

        if (is(bean, Message)) {
          const msg = as(bean, MessageImpl);
          msg.load((message: Message): void => {
            if (doWait) {
              ComposerModelImpl.triggerPublicationJob(msg, publicationCallback);
            }
          });
        }
      },
      (response: RemoteServiceMethodResponse): void => {
        savedCallback(response.getError());
      },
    );
  }

  static showResultToast(adapter: SocialHubAdapter, error: any): void {
    const network = SocialHub_properties[adapter.getType().toLowerCase() + "_title"];
    const title = SocialHub_properties.compose_job_notification_finished_title;
    const msg = SocialHub_properties.compose_job_notification_finished;
    let toast = StringUtil.format(msg, network);

    let state = ValidationState.SUCCESS;
    if (error && error.getErrorCode()) {
      const code: string = error.getErrorCode();
      toast = JobErrorCodes_properties[code];
      toast = StringUtil.format(toast, network);
      state = ValidationState.ERROR;
    }

    socialHubService.showToast(title, toast, state, null, (): void =>
      socialHubService.focusAdapter(adapter, () =>{}),
    );
  }

  static triggerPublicationJob(message: MessageImpl, publicationCallback: AnyFunction): void {
    const adapter = message.getAdapter();
    const job = new ComposeMessageJob(adapter.getType(), adapter.getAdapterId(), message.getMessageId());
    const trackedJob = jobService._.executeJob(job,
      //on success
      (): void =>
      //default handler is ok, we don't need any post-processing
        message.invalidate((): void => {
          publicationCallback();
        })
      ,
      //on error
      (result: any): void =>
        message.invalidate((): void => {
          publicationCallback(result);
        }),
    );
  }

  reset(callback?: AnyFunction): void {
    const method = new RemoteServiceMethod(this.getUriPath(), "DELETE");
    method.request({},
      (response: RemoteServiceMethodResponse): void => {
        const result: boolean = response.getResponseJSON();
        if (callback) {
          callback(result);
        }

      },
      (response: RemoteServiceMethodResponse): void => {
        if (callback) {
          callback(response.getError());
        }
      },
    );
  }
}
mixin(ComposerModelImpl, ComposerModel);

export default ComposerModelImpl;
