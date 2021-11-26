import Config from "@jangaroo/runtime/Config";
import { as } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";
import SocialHubStudioPlugin from "./SocialHubStudioPlugin";
import Colors from "./channels/Colors";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import IEditorContext from "@coremedia/studio-client.main.editor-components/sdk/IEditorContext";
import BackgroundJobsButtonBase from "@coremedia/studio-client.main.editor-components/sdk/jobs/BackgroundJobsButtonBase";
import Class from "@jangaroo/runtime/Class";
interface SocialHubStudioPluginBaseConfig extends Config<StudioPlugin> {
}



class SocialHubStudioPluginBase extends StudioPlugin {
  declare Config: SocialHubStudioPluginBaseConfig;

  constructor(config:Config<SocialHubStudioPlugin> = null) {
    super(config);
  }

  override init(editorContext:IEditorContext):void {
    super.init(editorContext);

    //find original method: you HAVE to use the original JS function name which may differ from the AS name, check JS sources for that
    var originalMethod:AnyFunction = as(BackgroundJobsButtonBase,  Class).prototype["onJobStarted$v9Xb"];
    as(BackgroundJobsButtonBase,  Class).prototype["onJobStarted$v9Xb"] = (():void => {
      //do nothing
    });

    // Init Social Hub color config
    Colors.init();
  }
}
export default SocialHubStudioPluginBase;
