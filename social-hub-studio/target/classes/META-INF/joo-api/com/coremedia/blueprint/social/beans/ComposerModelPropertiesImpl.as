package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.SubBean;

public class ComposerModelPropertiesImpl extends com.coremedia.ui.data.impl.SubBean implements com.coremedia.blueprint.social.beans.ComposerModelProperties {
  public function ComposerModelPropertiesImpl(parent:com.coremedia.blueprint.social.beans.ComposerModelImpl, basePath:String) {
    super(null, null);
  }

  public native function getComposerModel():com.coremedia.blueprint.social.beans.ComposerModel;
}
}