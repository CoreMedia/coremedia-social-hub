package com.coremedia.blueprint.social.composer.richtext {
import com.coremedia.ui.data.ValueExpression;

[ResourceBundle('com.coremedia.ui.ckeditor.CKEditor')]
public class InternalLinkButton extends com.coremedia.blueprint.social.composer.richtext.InternalLinkButtonBase {
  public static const xtype:String = "com.coremedia.blueprint.social.composer.richtext.internalLinkButton";

  public function InternalLinkButton(config:com.coremedia.blueprint.social.composer.richtext.InternalLinkButton = null) {
    super();
  }

  /**
   * A property path expression leading to the Bean whose property is edited.
   * This property editor assumes that this bean has a property 'properties'.
   */
  [Bindable(event = "DUMMY")]
  public var bindTo:com.coremedia.ui.data.ValueExpression;

  /**
   * An optional ValueExpression which makes the component read-only if it is evaluated to true.
   */
  [Bindable(event = "DUMMY")]
  public var forceReadOnlyValueExpression:com.coremedia.ui.data.ValueExpression;
}
}