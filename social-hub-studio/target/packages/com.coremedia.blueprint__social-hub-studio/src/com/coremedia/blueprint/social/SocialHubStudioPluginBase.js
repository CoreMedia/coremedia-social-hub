Ext.define("com.coremedia.blueprint.social.SocialHubStudioPluginBase", function(SocialHubStudioPluginBase) {/*package com.coremedia.blueprint.social {

import com.coremedia.cms.editor.configuration.StudioPlugin;
import com.coremedia.cms.editor.sdk.IEditorContext;

public class SocialHubStudioPluginBase extends StudioPlugin {

  public*/ function SocialHubStudioPluginBase$(config/*:SocialHubStudioPlugin = null*/) {if(arguments.length<=0)config=null;
    this.super$VevI(config);
  }/*

  override public*/ function init(editorContext/*:IEditorContext*/)/*:void*/ {
    com.coremedia.cms.editor.configuration.StudioPlugin.prototype.init.call(this,editorContext);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.cms.editor.configuration.StudioPlugin",
      constructor: SocialHubStudioPluginBase$,
      super$VevI: function() {
        com.coremedia.cms.editor.configuration.StudioPlugin.prototype.constructor.apply(this, arguments);
      },
      init: init,
      requires: ["com.coremedia.cms.editor.configuration.StudioPlugin"]
    };
});
