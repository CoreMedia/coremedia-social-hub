import RemoteServiceMethod from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethod";
import RemoteServiceMethodResponse from "@coremedia/studio-client.client-core-impl/data/impl/RemoteServiceMethodResponse";
import { AnyFunction } from "@jangaroo/runtime/types";

class SocialHubServices {
  static readonly #SERVICES_URI: string = "socialhub/services/";

  static readonly #SHORTEN_URL_URI: string = SocialHubServices.#SERVICES_URI + "shortenUrl";

  static shortenUrl(url: string, callback: AnyFunction): void {
    const method = new RemoteServiceMethod(SocialHubServices.#SHORTEN_URL_URI, "POST");
    method.request({ "url": url },
      (response: RemoteServiceMethodResponse): void => {
        const result: string = response.getResponseJSON().toJson();
        callback(result);
      },
    );
  }
}

export default SocialHubServices;
