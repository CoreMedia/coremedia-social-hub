import SubBean from "@coremedia/studio-client.client-core-impl/data/impl/SubBean";
import { as, mixin } from "@jangaroo/runtime";
import ComposerModel from "./ComposerModel";
import ComposerModelImpl from "./ComposerModelImpl";
import ComposerModelProperties from "./ComposerModelProperties";

class ComposerModelPropertiesImpl extends SubBean implements ComposerModelProperties {

  constructor(parent: ComposerModelImpl, basePath: string) {
    super(parent, basePath);
  }

  getComposerModel(): ComposerModel {
    return as(this.getParentBean(), ComposerModel);
  }

}
mixin(ComposerModelPropertiesImpl, ComposerModelProperties);

export default ComposerModelPropertiesImpl;
