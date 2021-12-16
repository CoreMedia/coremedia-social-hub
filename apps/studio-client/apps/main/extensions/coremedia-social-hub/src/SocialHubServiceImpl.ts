import SocialHubAdapter from "./beans/SocialHubAdapter";
import SocialHubAdapters from "./beans/SocialHubAdapters";
import SocialHubAdaptersImpl from "./beans/SocialHubAdaptersImpl";
import ChannelContainer from "./channels/ChannelContainer";
import ChannelsContainer from "./channels/ChannelsContainer";
import SocialNotificationToast from "./notifications/SocialNotificationToast";
import IdHelper from "@coremedia/studio-client.cap-rest-client/common/IdHelper";
import session from "@coremedia/studio-client.cap-rest-client/common/session";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import RemoteServiceMethod from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethod";
import RemoteServiceMethodResponse from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethodResponse";
import Blob from "@coremedia/studio-client.client-core/data/Blob";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import ValidationState from "@coremedia/studio-client.ext.ui-components/mixins/ValidationState";
import createComponentSelector from "@coremedia/studio-client.ext.ui-components/util/createComponentSelector";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import Site from "@coremedia/studio-client.multi-site-models/Site";
import SitesService from "@coremedia/studio-client.multi-site-models/SitesService";
import Ext from "@jangaroo/ext-ts";
import Component from "@jangaroo/ext-ts/Component";
import ComponentManager from "@jangaroo/ext-ts/ComponentManager";
import { as, asConfig, mixin } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import { AnyFunction } from "@jangaroo/runtime/types";
import ISocialHubService from "./ISocialHubService";
import SocialHubMainTab from "./SocialHubMainTab";
import SocialHubSettings_properties from "./SocialHubSettings_properties";
import SocialHub_properties from "./SocialHub_properties";
import ComposerModel from "./beans/ComposerModel";
import ComposerModelImpl from "./beans/ComposerModelImpl";
import MediaItem from "./beans/MediaItem";

class SocialHubServiceImpl implements ISocialHubService {
  #hubExpression: ValueExpression = null;

  getAdaptersExpression(): ValueExpression {
    if (!this.#hubExpression) {
      this.#hubExpression = ValueExpressionFactory.createFromFunction((): SocialHubAdapters => {
        const siteService = editorContext._.getSitesService();
        const preferredSite = siteService.getPreferredSite();
        if (preferredSite) {
          return as(beanFactory._.getRemoteBean("socialhub/adapters/" + preferredSite.getId()), SocialHubAdaptersImpl);
        }

        return null;
      });
    }

    return this.#hubExpression;
  }

  getMediaType(content: Content): string {
    const blobProperty = SocialHubSettings_properties.social_hub_content_blob_property;
    const blob: Blob = content.getProperties().get(blobProperty);
    if (blob) {
      if (!blob.isLoaded()) {
        blob.loadData();
        return undefined;
      }

      const contentType = blob.getContentType();
      if (contentType.indexOf(MediaItem.TYPE_IMAGE) !== -1) {
        return MediaItem.TYPE_IMAGE;
      }

      if (contentType.indexOf(MediaItem.TYPE_VIDEO) !== -1) {
        return MediaItem.TYPE_VIDEO;
      }
    }

    return null;
  }

  getComposerModel(adapterId: string): ComposerModel {
    const uriPath = session._.getUser().getUriPath();
    const userId = uriPath.substr(uriPath.lastIndexOf("/") + 1, uriPath.length);
    const model = as(beanFactory._.getRemoteBean("socialhub/composermodel/" + userId + "/" + adapterId), ComposerModelImpl);
    if (!model.isLoaded()) {
      model.load();
    }
    return model;
  }

  initComposerModel(adapterId: string, contents: Array<any>, composerMethod: string, callback: AnyFunction): void {
    const uriPath = session._.getUser().getUriPath();
    const userId = uriPath.substr(uriPath.lastIndexOf("/") + 1, uriPath.length);
    let id: number = null;
    if (contents.length > 0) {
      id = IdHelper.parseContentId(contents[0]);
    }

    const method = new RemoteServiceMethod("socialhub/composermodel/" + userId + "/" + adapterId + "/compose", "POST");
    method.request(
      {
        "contentId": id,
        "composerMethod": composerMethod,
      },
      (response: RemoteServiceMethodResponse): void => {
        const result: string = response.getResponseJSON().toJson();
        const cm = as(this.getComposerModel(adapterId), ComposerModelImpl);
        cm.invalidate(callback);
      },
      (response: RemoteServiceMethodResponse): void => {
        callback(response.getError());
      },
    );
  }

  showToast(title: string, msg: string, validationState: ValidationState = null, actionLabel: string = null, action: AnyFunction = null): void {
    const config = Config(SocialNotificationToast);
    config.notificationSource = SocialHub_properties.menu_title_text;
    config.notificationTitle = title;
    config.notificationMessage = msg;
    config.validationState = null;
    config.notificationAction = action;
    config.notificationActionLabel = actionLabel;
    config.notificationValidationState = validationState;
    const toast = new SocialNotificationToast(config);
    toast.show();
  }

  getAdapter(adapterId: string): SocialHubAdapter {
    const adapters: SocialHubAdapters = this.getAdaptersExpression().getValue();
    for (const adapter of adapters.getAdapters() as SocialHubAdapter[]) {
      if (adapter.getAdapterId() === adapterId) {
        return adapter;
      }
    }
    return null;
  }

  focusAdapter(socialHubAdataper: SocialHubAdapter, callback: AnyFunction): void {
    const channelContainer = as(Ext.getCmp(ChannelsContainer.ID), ChannelsContainer);
    channelContainer.focusAdapter(socialHubAdataper);
    callback();
  }

  focusAndReload(socialHubAdapter: SocialHubAdapter): void {
    const findByType: Array<any> = editorContext._.getWorkArea().query(createComponentSelector()._xtype(SocialHubMainTab.xtype, true).build());
    if (findByType.length > 0) {
      const cmp: Component = findByType[0];
      editorContext._.getWorkArea().setActiveTab(cmp);

      const channelContainer = as(Ext.getCmp(ChannelsContainer.ID), ChannelsContainer);
      this.focusAdapter(socialHubAdapter, (): void => {
        const channelContainer = as(Ext.getCmp(socialHubAdapter.getAdapterId()), ChannelContainer);
        channelContainer.reload(true);
      });
    } else {
      const cfg = Config(SocialHubMainTab);
      const tab = ComponentManager.create(cfg);
      editorContext._.getWorkArea().add(tab);
      editorContext._.getWorkArea().setActiveTab(tab);
    }
  }
}
mixin(SocialHubServiceImpl, ISocialHubService);

export default SocialHubServiceImpl;
