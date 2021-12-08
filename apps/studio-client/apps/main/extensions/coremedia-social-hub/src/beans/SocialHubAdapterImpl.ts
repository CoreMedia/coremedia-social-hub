import { mixin } from "@jangaroo/runtime";
import Colors from "../channels/Colors";
import MessageProperty from "./MessageProperty";
import SocialHubAdapter from "./SocialHubAdapter";
import SocialHubPropertyNames from "./SocialHubPropertyNames";
import RemoteBeanImpl from "@coremedia/studio-client.client-core-impl/data/impl/RemoteBeanImpl";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";


class SocialHubAdapterImpl extends RemoteBeanImpl implements SocialHubAdapter {
  static readonly REST_RESOURCE_URI_TEMPLATE: string = "socialhub/adapter/{id:[^/]+}";

  #messageProperties:Array<any> = null;

  constructor(path:string) {
    super(path);
  }

  isReadOnly():boolean {
    return this.get(SocialHubPropertyNames.ADAPTER_READ_ONLY);
  }

  isDirectPublication():boolean {
    return this.get(SocialHubPropertyNames.ADAPTER_SCHEDULING_SUPPORTED);
  }

  isNativeHistory():boolean {
    return this.get(SocialHubPropertyNames.ADAPTER_NATIVE_HISTORY);
  }

  isSchedulingSupported():boolean {
    return this.get(SocialHubPropertyNames.ADAPTER_SCHEDULING_SUPPORTED);
  }

  getMessageProperties():Array<any> {
    if (!this.#messageProperties) {
      this.#messageProperties = [];
      var json:Array<any> = this.get(SocialHubPropertyNames.ADAPTER_MESSAGE_PROPERTIES);
      for(var typeDef of json) {
        var propType = new MessageProperty(typeDef);
        this.#messageProperties.push(propType);
      }
    }
    return this.#messageProperties;
  }

  getAdapterId():string {
    return this.get(SocialHubPropertyNames.ADAPTER_ID);
  }

  getDisplayName():string {
    return this.get(SocialHubPropertyNames.ADAPTER_DISPLAY_NAME);
  }

  getType():string {
    var type:string = this.get(SocialHubPropertyNames.ADAPTER_TYPE);
    if (type.indexOf("-") !== -1) {
      return type.substr(type.indexOf("-") + 1);
    }

    return type;
  }

  getSentMessages():Array<any> {
    return this.get(SocialHubPropertyNames.ADAPTER_SENT_MESSAGES);
  }

  getScheduledMessages():Array<any> {
    return this.get(SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES);
  }

  setColor(color:string):void {
    var saveStateExpression = ValueExpressionFactory.create("socialHub." + this.getAdapterId() + ".color", editorContext._.getPreferences());
    saveStateExpression.setValue(color);
  }

  getColor():string {
    var saveStateExpression = ValueExpressionFactory.create("socialHub." + this.getAdapterId() + ".color", editorContext._.getPreferences());
    var color:string = saveStateExpression.getValue() as string;
    if (!color) {
      color = Colors.getColor();
      this.setColor(color);
    }
    return color;
  }

  getHoverColor():string {
    return Colors.getHoverColor(this.getColor());
  }

  getPressedColor():string {
    return Colors.getPressedColor(this.getColor());
  }

  getPropertyKey(property:string):string {
    return this.getType().toLowerCase() + "_" + this.getAdapterId() + "_" + property;
  }
}
mixin(SocialHubAdapterImpl, SocialHubAdapter);

export default SocialHubAdapterImpl;
