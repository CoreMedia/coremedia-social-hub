package com.coremedia.blueprint.social.composer.richtext {

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
 */
public class InternalLinkButtonBase extends IconButton {

  //the toolbar window group
  [Bindable]
  public var richTextWindowGroup:ZIndexManager;

  /**
   * Value Expression pointing to the ckEditor. This config parameter is mandatory.
   */
  [Bindable]
  public var ckEditorValueExpression:ValueExpression;

  private var internalLinkWindow:InternalLinkWindow;
  private var effectiveReadOnlyExpression:ValueExpression;

  /**
   * Create a button that enables itself when it would be appropriate
   * to open an internal link editing dialog.
   *
   * @param config the config object
   */
  public function InternalLinkButtonBase(config:InternalLinkButton = null) {
    super(config);

    if (!ckEditorValueExpression) {
      throw new Error("ckEditorValueExpression is not configured.")
    }

    ckEditorValueExpression.addChangeListener(configureCKEditor);
    effectiveReadOnlyExpression = PropertyEditorUtil.createReadOnlyValueExpression(
            config.bindTo,
            config.forceReadOnlyValueExpression);

    selectionChange();
  }

  internal function onToggle(button:Button, pressed:Boolean):* {
    if (!pressed && internalLinkWindow) {
      internalLinkWindow.hide();
    } else {
      openWindow();
    }
  }

  internal function getWindow():InternalLinkWindow {
    if (!internalLinkWindow) {
      var windowParent:Container = getRenderToContainer();

      var internalLinkWindowConfig:InternalLinkWindow = InternalLinkWindow({});
      internalLinkWindowConfig.bindTo = initialConfig.bindTo;
      internalLinkWindowConfig.renderTo = windowParent.el;

      internalLinkWindow = new InternalLinkWindow(internalLinkWindowConfig);
      internalLinkWindow.addListener('beforedestroy', windowDestroyed);
      internalLinkWindow.addListener('hide', windowHide);
      richTextWindowGroup.register(internalLinkWindow);
      internalLinkWindow.setCKEditor(ckEditorValueExpression.getValue());
    }

    return internalLinkWindow;
  }

  private function getRenderToContainer():Container {
    return findParentBy(function (container:Container):Boolean {
      return container is MessageTextareaEditor;
    });
  }

  private function windowHide():void {
    this.toggle(false);
  }

  private function openWindow():void {
    getWindow().showBy(this, "tl-bl?");
    this.toggle(true);
  }

  private function windowDestroyed():void {
    internalLinkWindow = null;
  }

  private function configureCKEditor():void {
    var ckEditor:* = ckEditorValueExpression.getValue();
    if (ckEditor) {
      ckEditor.on("selectionChange", selectionChange);
      getWindow().setCKEditor(ckEditor);
    }
  }

  private function selectionChange():void {
    var ckEditor:* = ckEditorValueExpression.getValue();
    var selection:* = ckEditor && ckEditor.getSelection();
    var ascendant:* = selection && AnchorUtil.getSelectedAnchor(selection);

    setDisabled(effectiveReadOnlyExpression.getValue() ||
                AnchorUtil.isLinkWithUrlScheme(ascendant) ||
                AnchorUtil.isLinkAnchorReference(ascendant));
  }

  override protected function onDestroy():void {
    ckEditorValueExpression.removeChangeListener(configureCKEditor);
    Ext.destroy(internalLinkWindow);
    super.onDestroy();
  }
}
}
