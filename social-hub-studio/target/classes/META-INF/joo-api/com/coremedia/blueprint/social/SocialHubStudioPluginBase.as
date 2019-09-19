package com.coremedia.blueprint.social {
import com.coremedia.cms.editor.configuration.StudioPlugin;
import com.coremedia.cms.editor.sdk.IEditorContext;

public class SocialHubStudioPluginBase extends com.coremedia.cms.editor.configuration.StudioPlugin {
  public function SocialHubStudioPluginBase(config:com.coremedia.blueprint.social.SocialHubStudioPlugin = null) {
    super();
  }

  override public native function init(editorContext:com.coremedia.cms.editor.sdk.IEditorContext):void;
}
}