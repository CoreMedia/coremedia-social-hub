import { AnyFunction } from "@jangaroo/runtime/types";
import ComposerModel from "./beans/ComposerModel";
import SocialHubAdapter from "./beans/SocialHubAdapter";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValidationState from "@coremedia/studio-client.ext.ui-components/mixins/ValidationState";


abstract class ISocialHubService {

  abstract getAdaptersExpression():ValueExpression;

  abstract getComposerModel(adapterId:string):ComposerModel;

  abstract initComposerModel(adapterId:string, contents:Array<any>, composerMethod:string, callback:AnyFunction):void;

  abstract getMediaType(content:Content):string;

  abstract getAdapter(adapterId:string):SocialHubAdapter;

  abstract focusAndReload(socialHubAdapter:SocialHubAdapter):void;

  abstract showToast(title:string, msg:string, validationState?:ValidationState, actionLabel?:string, action?:AnyFunction):void;

  abstract focusAdapter(adapter:SocialHubAdapter, callback:AnyFunction):void;
}
export default ISocialHubService;
