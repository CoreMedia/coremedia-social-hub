package com.coremedia.blueprint.social {

import com.coremedia.cms.editor.configuration.StudioPlugin;
import com.coremedia.cms.editor.sdk.IEditorContext;

public class SocialHubStudioPluginBase extends StudioPlugin {

  public function SocialHubStudioPluginBase(config:SocialHubStudioPlugin = null) {
    super(config);
  }

  override public function init(editorContext:IEditorContext):void {
    super.init(editorContext);
  }
}
}
