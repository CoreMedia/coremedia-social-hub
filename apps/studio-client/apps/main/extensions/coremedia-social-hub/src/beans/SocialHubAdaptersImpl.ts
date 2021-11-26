import { mixin } from "@jangaroo/runtime";
import SocialHubAdapters from "./SocialHubAdapters";
import SocialHubPropertyNames from "./SocialHubPropertyNames";
import RemoteBeanImpl from "@coremedia/studio-client.client-core-impl/data/impl/RemoteBeanImpl";


class SocialHubAdaptersImpl extends RemoteBeanImpl implements SocialHubAdapters {
  static readonly REST_RESOURCE_URI_TEMPLATE: string = "socialhub/adapters/{id:[^/]+}";

  constructor(path:string) {
    super(path);
  }

  getAdapters():Array<any> {
    return this.get(SocialHubPropertyNames.ADAPTER_LIST);
  }
}
mixin(SocialHubAdaptersImpl, SocialHubAdapters);

export default SocialHubAdaptersImpl;
