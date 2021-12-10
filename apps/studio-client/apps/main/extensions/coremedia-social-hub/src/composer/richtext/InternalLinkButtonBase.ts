import Config from "@jangaroo/runtime/Config";
import { bind, is } from "@jangaroo/runtime";
import MessageTextareaEditor from "../MessageTextareaEditor";
import InternalLinkButton from "./InternalLinkButton";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import AnchorUtil from "@coremedia/studio-client.main.ckeditor4-components/src/AnchorUtil";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import InternalLinkWindow from "@coremedia/studio-client.main.ckeditor4-components/src/fields/InternalLinkWindow";
import PropertyEditorUtil from "@coremedia/studio-client.main.editor-components/sdk/util/PropertyEditorUtil";
import Ext from "@jangaroo/ext-ts";
import ZIndexManager from "@jangaroo/ext-ts/ZIndexManager";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
interface InternalLinkButtonBaseConfig extends Config<IconButton>, Partial<Pick<InternalLinkButtonBase,
  "bindTo" |
  "richTextWindowGroup" |
  "ckEditorValueExpression"
>> {
}



/**
 * A Button that enables itself when it would be appropriate
 * to open an internal link editing dialog.
 */
class InternalLinkButtonBase extends IconButton {
  declare Config: InternalLinkButtonBaseConfig;

  /**
   * A property path expression leading to the Bean whose property is edited.
   * This property editor assumes that this bean has a property 'properties'.
   */
  bindTo: ValueExpression = null;

  //the toolbar window group
  richTextWindowGroup:ZIndexManager = null;

  /**
   * Value Expression pointing to the ckEditor. This config parameter is mandatory.
   */
  ckEditorValueExpression:ValueExpression = null;

  #internalLinkWindow:InternalLinkWindow = null;
  #effectiveReadOnlyExpression:ValueExpression = null;

  /**
   * Create a button that enables itself when it would be appropriate
   * to open an internal link editing dialog.
   *
   * @param config the config object
   */
  constructor(config:Config<InternalLinkButton> = null) {
    super(config);

    if (!this.ckEditorValueExpression) {
      throw new Error("ckEditorValueExpression is not configured.");
    }

    this.ckEditorValueExpression.addChangeListener(bind(this,this.#configureCKEditor));
    this.#effectiveReadOnlyExpression = PropertyEditorUtil.createReadOnlyValueExpression(
            config.bindTo,
            config.forceReadOnlyValueExpression);

    this.#selectionChange();
  }

  onToggle(button:Button, pressed:boolean):any {
    if (!pressed && this.#internalLinkWindow) {
      this.#internalLinkWindow.hide();
    } else {
      this.#openWindow();
    }
  }

  getWindow():InternalLinkWindow {
    if (!this.#internalLinkWindow) {
      var windowParent = this.#getRenderToContainer();

      var internalLinkWindowConfig = Config(InternalLinkWindow);
      internalLinkWindowConfig.bindTo = this.initialConfig.bindTo;
      internalLinkWindowConfig.renderTo = windowParent.el;

      this.#internalLinkWindow = new InternalLinkWindow(internalLinkWindowConfig);
      this.#internalLinkWindow.addListener("beforedestroy",bind( this,this.#windowDestroyed));
      this.#internalLinkWindow.addListener("hide",bind( this,this.#windowHide));
      this.richTextWindowGroup.register(this.#internalLinkWindow);
      this.#internalLinkWindow.setCKEditor(this.ckEditorValueExpression.getValue());
    }

    return this.#internalLinkWindow;
  }

  #getRenderToContainer():Container {
    return this.findParentBy((container:Container):boolean =>
      is( container,  MessageTextareaEditor)
    );
  }

  #windowHide():void {
    this.toggle(false);
  }

  #openWindow():void {
    this.getWindow().showBy(this, "tl-bl?");
    this.toggle(true);
  }

  #windowDestroyed():void {
    this.#internalLinkWindow = null;
  }

  #configureCKEditor():void {
    var ckEditor = this.ckEditorValueExpression.getValue();
    if (ckEditor) {
      ckEditor.on("selectionChange",bind( this,this.#selectionChange));
      this.getWindow().setCKEditor(ckEditor);
    }
  }

  #selectionChange():void {
    var ckEditor = this.ckEditorValueExpression.getValue();
    var selection:any = ckEditor && ckEditor.getSelection();
    var ascendant:any = selection && AnchorUtil.getSelectedAnchor(selection);

    this.setDisabled(this.#effectiveReadOnlyExpression.getValue() ||
                AnchorUtil.isLinkWithUrlScheme(ascendant) ||
                AnchorUtil.isLinkAnchorReference(ascendant));
  }

  protected override onDestroy():void {
    this.ckEditorValueExpression.removeChangeListener(bind(this,this.#configureCKEditor));
    Ext.destroy(this.#internalLinkWindow);
    super.onDestroy();
  }
}
export default InternalLinkButtonBase;
