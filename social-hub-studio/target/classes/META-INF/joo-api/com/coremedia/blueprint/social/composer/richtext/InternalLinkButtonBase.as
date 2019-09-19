package com.coremedia.blueprint.social.composer.richtext {
import com.coremedia.ui.components.IconButton;
import com.coremedia.ui.data.ValueExpression;
import ext.ZIndexManager;

/**
 * A Button that enables itself when it would be appropriate
 * to open an internal link editing dialog.
 */
public class InternalLinkButtonBase extends com.coremedia.ui.components.IconButton {
  [Bindable(event = "DUMMY")]
  public var richTextWindowGroup:ext.ZIndexManager;

  /**
   * Value Expression pointing to the ckEditor. This config parameter is mandatory.
   */
  [Bindable(event = "DUMMY")]
  public var ckEditorValueExpression:com.coremedia.ui.data.ValueExpression;

  /**
   * Create a button that enables itself when it would be appropriate
   * to open an internal link editing dialog.
   *
   * @param config the config object
   */
  public function InternalLinkButtonBase(config:com.coremedia.blueprint.social.composer.richtext.InternalLinkButton = null) {
    super();
  }

  override protected native function onDestroy():void;
}
}