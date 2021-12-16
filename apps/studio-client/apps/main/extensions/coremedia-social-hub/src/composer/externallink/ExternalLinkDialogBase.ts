import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import StudioDialog from "@coremedia/studio-client.ext.base-components/dialogs/StudioDialog";
import Config from "@jangaroo/runtime/Config";
import SocialHubServices from "../../beans/SocialHubServices";
import MessageTextareaEditor from "../MessageTextareaEditor";

interface ExternalLinkDialogBaseConfig extends Config<StudioDialog>, Partial<Pick<ExternalLinkDialogBase,
  "messageEditor"
>> {
}

class ExternalLinkDialogBase extends StudioDialog {
  declare Config: ExternalLinkDialogBaseConfig;

  #submitButtonDisabledExpression: ValueExpression = null;

  #shortenLinkCheckboxValueExpression: ValueExpression = null;

  #urlValueExpression: ValueExpression = null;

  messageEditor: MessageTextareaEditor = null;

  //the CKEditor
  #editor: any;

  constructor(config: Config<ExternalLinkDialogBase> = null) {
    super(config);
  }

  protected override afterRender(): void {
    super.afterRender();
    this.#editor = this.messageEditor.getRichtextEditor().getCKEditor();

    const selection = this.#editor.getSelection();
    let element = null;

    // Fill in all the relevant fields if there's already one link selected.
    if ((element = this.#getSelectedLink(this.#editor)) && element.hasAttribute("_xlink:href")) {
      selection.selectElement(element);
      this.getUrlValueExpression().setValue(element.getText());
    }
  }

  #getSelectedLink(editor) {
    let range;
    try {
      range = editor.getSelection().getRanges(true)[ 0 ];
      range.shrink(CKEDITOR["SHRINK_TEXT"]);
      const root = range.getCommonAncestor();
      return root.getAscendant("a", true);
    } catch (e) {
      return null;
    }
  }

  protected getSubmitButtonDisabledExpression(): ValueExpression {
    if (!this.#submitButtonDisabledExpression) {
      this.#submitButtonDisabledExpression = ValueExpressionFactory.createFromFunction((): boolean => {
        const url: string = this.getUrlValueExpression().getValue();
        return !url || url.length === 0 || url.indexOf("http") === -1;
      });
    }
    return this.#submitButtonDisabledExpression;
  }

  protected getUrlValueExpression(): ValueExpression {
    if (!this.#urlValueExpression) {
      this.#urlValueExpression = ValueExpressionFactory.createFromValue("");
    }
    return this.#urlValueExpression;
  }

  protected getShortenLinkCheckboxExpression(): ValueExpression {
    if (!this.#shortenLinkCheckboxValueExpression) {
      this.#shortenLinkCheckboxValueExpression = ValueExpressionFactory.createFromValue(false);
    }
    return this.#shortenLinkCheckboxValueExpression;
  }

  protected okPressed(): void {
    const url: string = this.getUrlValueExpression().getValue();
    const doShorten: boolean = this.getShortenLinkCheckboxExpression().getValue();
    if (doShorten) {
      SocialHubServices.shortenUrl(url, (shortened: string): void =>
        this.#insertLink(shortened, true),
      );
    } else {
      this.#insertLink(url, doShorten);
    }
  }

  #insertLink(url: string, shortened: boolean): void {
    const attributes: any = {};
    const removeAttributes = [];
    const data = this.getData();

    attributes["_xlink:href"] = url;
    attributes["href"] = "#";

    this.#editor.fire("saveSnapshot");
    attributes["_xlink:show"] = "new";

    let element: any = this.#editor.getSelection().getSelectedElement();
    if (element && element.getName() === "a") {
      // We're only editing an existing link, so just overwrite the attributes.
      const href = element.getAttribute("_xlink:href");
      const textView = element.getHtml();

      // IE BUG: Setting the name attribute to an existing link doesn't work.
      // Must re-create the link from weired syntax to workaround.
      if (CKEDITOR["env"].ie && attributes.name != element.getAttribute("name")) {
        const newElement = new CKEDITOR["dom"].element("<a name=\"" + CKEDITOR["tools"].htmlEncode(attributes.name) + "\">",
          this.#editor.document);

        selection = this.#editor.getSelection();

        element.moveChildren(newElement);
        element.copyAttributes(newElement, { name: 1 });
        newElement.replace(element);
        element = newElement;

        selection.selectElement(element);
      }

      element.setAttributes(attributes);
      element.removeAttributes(removeAttributes);
      // Update text view when user changes protocol #4612.
      if (href == textView) {
        element.setHtml(attributes["_xlink:href"]);
      }

      // delete this._.selectedElement;
    } else {
      // Create element if current selection is collapsed.
      var selection = this.#editor.getSelection();
      const ranges = selection.getRanges();
      if (ranges.length == 1 && ranges[0].collapsed) {
        const text = new CKEDITOR["dom"].text(attributes["_xlink:href"], this.#editor.document);
        ranges[0].insertNode(text);
        ranges[0].selectNodeContents(text);
        selection.selectRanges(ranges);
      }

      // Apply style.
      const style = new CKEDITOR["style"]({
        element: "a",
        attributes: attributes,
      });
      style.type = CKEDITOR["STYLE_INLINE"];		// need to override... dunno why.
      this.#editor.applyStyle(style);

      // Id. Apply only to the first link.
      if (data && data.adv && data.adv.advId) {
        const links = this.#editor.document.$.getElementsByTagName("a");
        for (let i = 0; i < links.length; i++) {
          if (links[i].href == attributes["_xlink:href"]) {
            links[i].id = data.adv.advId;
            break;
          }
        }
      }
    }

    this.#editor.fire("save");
    this.#editor.fire("saveSnapshot");
    this.close();
  }
}

export default ExternalLinkDialogBase;
