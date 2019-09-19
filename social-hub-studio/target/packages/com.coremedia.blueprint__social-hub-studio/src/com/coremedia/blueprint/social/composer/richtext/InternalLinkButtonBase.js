Ext.define("com.coremedia.blueprint.social.composer.richtext.InternalLinkButtonBase", function(InternalLinkButtonBase) {/*package com.coremedia.blueprint.social.composer.richtext {

import com.coremedia.blueprint.social.composer.MessageTextareaEditor;
import com.coremedia.cms.editor.sdk.premular.fields.InternalLinkWindow;
import com.coremedia.cms.editor.sdk.util.PropertyEditorUtil;
import com.coremedia.ui.ckeditor.AnchorUtil;
import com.coremedia.ui.components.IconButton;
import com.coremedia.ui.data.ValueExpression;

import ext.Ext;
import ext.ZIndexManager;
import ext.button.Button;
import ext.container.Container;

/**
 * A Button that enables itself when it would be appropriate
 * to open an internal link editing dialog.
 * /
public class InternalLinkButtonBase extends IconButton {

  //the toolbar window group
  [Bindable]
  public var richTextWindowGroup:ZIndexManager;

  /**
   * Value Expression pointing to the ckEditor. This config parameter is mandatory.
   * /
  [Bindable]
  public var ckEditorValueExpression:ValueExpression;

  private var internalLinkWindow:InternalLinkWindow;
  private var effectiveReadOnlyExpression:ValueExpression;

  /**
   * Create a button that enables itself when it would be appropriate
   * to open an internal link editing dialog.
   *
   * @param config the config object
   * /
  public*/ function InternalLinkButtonBase$(config/*:InternalLinkButton = null*/) {if(arguments.length<=0)config=null;
    this.super$tRJ1(config);

    if (!AS3.getBindable(this,"ckEditorValueExpression")) {
      throw new AS3.Error("ckEditorValueExpression is not configured.");
    }

    AS3.getBindable(this,"ckEditorValueExpression").addChangeListener(AS3.bind(this,"configureCKEditor$tRJ1"));
    this.effectiveReadOnlyExpression$tRJ1 = com.coremedia.cms.editor.sdk.util.PropertyEditorUtil.createReadOnlyValueExpression(
            AS3.getBindable(config,"bindTo"),
            AS3.getBindable(config,"forceReadOnlyValueExpression"));

    this.selectionChange$tRJ1();
  }/*

  internal*/ function onToggle(button/*:Button*/, pressed/*:Boolean*/)/*:**/ {
    if (!pressed && this.internalLinkWindow$tRJ1) {
      this.internalLinkWindow$tRJ1.hide();
    } else {
      this.openWindow$tRJ1();
    }
  }/*

  internal*/ function getWindow()/*:InternalLinkWindow*/ {
    if (!this.internalLinkWindow$tRJ1) {
      var windowParent/*:Container*/ = this.getRenderToContainer$tRJ1();

      var internalLinkWindowConfig/*:InternalLinkWindow*/ = AS3.cast(com.coremedia.cms.editor.sdk.premular.fields.InternalLinkWindow,{});
      AS3.setBindable(internalLinkWindowConfig,"bindTo" , this.initialConfig.bindTo);
      internalLinkWindowConfig.renderTo = windowParent.el;

      this.internalLinkWindow$tRJ1 = new com.coremedia.cms.editor.sdk.premular.fields.InternalLinkWindow(internalLinkWindowConfig);
      this.internalLinkWindow$tRJ1.addListener('beforedestroy',AS3.bind( this,"windowDestroyed$tRJ1"));
      this.internalLinkWindow$tRJ1.addListener('hide',AS3.bind( this,"windowHide$tRJ1"));
      AS3.getBindable(this,"richTextWindowGroup").register(this.internalLinkWindow$tRJ1);
      this.internalLinkWindow$tRJ1.setCKEditor(AS3.getBindable(this,"ckEditorValueExpression").getValue());
    }

    return this.internalLinkWindow$tRJ1;
  }/*

  private*/ function getRenderToContainer()/*:Container*/ {
    return this.findParentBy(function (container/*:Container*/)/*:Boolean*/ {
      return AS3.is( container,  com.coremedia.blueprint.social.composer.MessageTextareaEditor);
    });
  }/*

  private*/ function windowHide()/*:void*/ {
    this.toggle(false);
  }/*

  private*/ function openWindow()/*:void*/ {
    this.getWindow().showBy(this, "tl-bl?");
    this.toggle(true);
  }/*

  private*/ function windowDestroyed()/*:void*/ {
    this.internalLinkWindow$tRJ1 = null;
  }/*

  private*/ function configureCKEditor()/*:void*/ {
    var ckEditor/*:**/ = AS3.getBindable(this,"ckEditorValueExpression").getValue();
    if (ckEditor) {
      ckEditor.on("selectionChange",AS3.bind( this,"selectionChange$tRJ1"));
      this.getWindow().setCKEditor(ckEditor);
    }
  }/*

  private*/ function selectionChange()/*:void*/ {
    var ckEditor/*:**/ = AS3.getBindable(this,"ckEditorValueExpression").getValue();
    var selection/*:**/ = ckEditor && ckEditor.getSelection();
    var ascendant/*:**/ = selection && com.coremedia.ui.ckeditor.AnchorUtil.getSelectedAnchor(selection);

    this.setDisabled(this.effectiveReadOnlyExpression$tRJ1.getValue() ||
                com.coremedia.ui.ckeditor.AnchorUtil.isLinkWithUrlScheme(ascendant) ||
                com.coremedia.ui.ckeditor.AnchorUtil.isLinkAnchorReference(ascendant));
  }/*

  override protected*/ function onDestroy()/*:void*/ {
    AS3.getBindable(this,"ckEditorValueExpression").removeChangeListener(AS3.bind(this,"configureCKEditor$tRJ1"));
    Ext.destroy(this.internalLinkWindow$tRJ1);
    com.coremedia.ui.components.IconButton.prototype.onDestroy.call(this);
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.ui.components.IconButton",
      internalLinkWindow$tRJ1: null,
      effectiveReadOnlyExpression$tRJ1: null,
      constructor: InternalLinkButtonBase$,
      super$tRJ1: function() {
        com.coremedia.ui.components.IconButton.prototype.constructor.apply(this, arguments);
      },
      onToggle: onToggle,
      getWindow: getWindow,
      getRenderToContainer$tRJ1: getRenderToContainer,
      windowHide$tRJ1: windowHide,
      openWindow$tRJ1: openWindow,
      windowDestroyed$tRJ1: windowDestroyed,
      configureCKEditor$tRJ1: configureCKEditor,
      selectionChange$tRJ1: selectionChange,
      onDestroy: onDestroy,
      config: {
        richTextWindowGroup: null,
        ckEditorValueExpression: null
      },
      requires: [
        "AS3.Error",
        "Ext",
        "com.coremedia.cms.editor.sdk.premular.fields.InternalLinkWindow",
        "com.coremedia.cms.editor.sdk.util.PropertyEditorUtil",
        "com.coremedia.ui.ckeditor.AnchorUtil",
        "com.coremedia.ui.components.IconButton"
      ],
      uses: ["com.coremedia.blueprint.social.composer.MessageTextareaEditor"]
    };
});
