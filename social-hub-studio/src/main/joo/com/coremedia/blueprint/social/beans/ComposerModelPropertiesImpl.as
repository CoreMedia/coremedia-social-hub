package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.SubBean;

public class ComposerModelPropertiesImpl extends SubBean implements ComposerModelProperties {

  public function ComposerModelPropertiesImpl(parent:ComposerModelImpl, basePath:String) {
    super(parent, basePath);
  }

  public function getComposerModel():ComposerModel {
    return getParentBean() as ComposerModel;
  }

}
}
