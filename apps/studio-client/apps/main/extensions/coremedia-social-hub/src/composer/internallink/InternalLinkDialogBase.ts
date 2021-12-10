import Config from "@jangaroo/runtime/Config";
import { as, bind } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";
import MessageTextareaEditor from "../MessageTextareaEditor";
import session from "@coremedia/studio-client.cap-rest-client/common/session";
import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import EventUtil from "@coremedia/studio-client.client-core/util/EventUtil";
import StudioDialog from "@coremedia/studio-client.ext.base-components/dialogs/StudioDialog";
import AnchorUtil from "@coremedia/studio-client.main.ckeditor4-components/AnchorUtil";
import Ext from "@jangaroo/ext-ts";
interface InternalLinkDialogBaseConfig extends Config<StudioDialog>, Partial<Pick<InternalLinkDialogBase,
  "messageEditor"
>> {
}



class InternalLinkDialogBase extends StudioDialog {
  declare Config: InternalLinkDialogBaseConfig;
  #submitButtonDisabledExpression:ValueExpression = null;

  messageEditor:MessageTextareaEditor = null;

  #contentExpression:ValueExpression = null;


  #dirty:boolean = false;
  #updateInProgress:number = 0;

  /**
   * The UI model for rendering this component.
   */
  #model:Bean = null;

  //the CKEditor
  #ckEditor:any;

  constructor(config:Config<InternalLinkDialogBase> = null) {
    super(config);
  }

  /**
   * Remember this menu in the global list of currently shown internal
   * link menus. Unless a menu is entered into that list, no effort is
   * made to keep it open.
   */
  override show(animateTarget:any = null, callback:AnyFunction = null, scope:any = null):this {
    this.#ckEditor = this.messageEditor.getRichtextEditor().getCKEditor();

    this.resetModel(true);
    var modelBean = this.getModel();
    modelBean.addValueChangeListener(bind(this,this.#onValueChange));
    var element = this.#getSelectedInternalLink();
    var selection:any = this.#ckEditor.getSelection();

    // Fill in all the relevant fields if there's already one link selected.
    if (element) {
      selection["selectElement"](element);

      var url:string = element.getAttribute("_xlink:href") || "http://";
      var content = session._.getConnection().getContentRepository().getContent(url);

      var linkType:string = element.getAttribute("_xlink:show");
      // TODO: use this (later)
      //var name:String = element.getAttribute('_xlink:role');

      modelBean.set("href", url);
      modelBean.set("content", content ? [content] : []);
      modelBean.set("type", linkType);
    }

    this.#onValueChange();
    super.show(animateTarget, callback, scope);return this;
  }


  /**
   * Deletes the selected link.
   * Called via update model, or from the remove link button.
   */
  resetModel(force:boolean = false):void {
    if (this.isVisible(true) || force) {
      var modelBean = this.getModel();
      modelBean.set("href", "");
      modelBean.set("content", []);
    }
  }


  protected getSubmitButtonDisabledExpression():ValueExpression {
    if (!this.#submitButtonDisabledExpression) {
      this.#submitButtonDisabledExpression = ValueExpressionFactory.createFromFunction(():boolean =>
         this.#getContent() === null
      );
    }
    return this.#submitButtonDisabledExpression;
  }

  protected getContentExpression():ValueExpression {
    if (!this.#contentExpression) {
      this.#contentExpression = ValueExpressionFactory.create("content", this.getModel());
    }
    return this.#contentExpression;
  }

  protected okPressed():void {
//    var url:String = getUrlValueExpression().getValue();
//    insertLink(url, false);
    this.destroy();
  }

  /**
   * Return the currently selected internal link element, or null, if no internal link is selected.
   * If ckEditor.getSelection() returns null the ckEditor gets the focus as a workaround
   * @return the currently selected internal link element
   */
  #getSelectedInternalLink():any {
    // TODO: This is just a temporary fix... Once selections are locked properly for
    // internal links in IE, this should be removed
    if (Ext.isIE && this.#ckEditor !== null && this.#ckEditor.getSelection() === null) {
      this.#updateInProgress++;
      this.#ckEditor.focus(true);
      EventUtil.invokeLater(():void => {
        this.#updateInProgress--;
      });
    }
    try {
      var selection:any = this.#ckEditor.getSelection();
      var ascendant:any = AnchorUtil.getSelectedAnchor(selection);
      return AnchorUtil.isLinkWithoutUrlScheme(ascendant) ? ascendant : null;
    }
    catch(e) {
      return null;
    }
  }

  /**
   * Creates a new anchor element and
   * applies the url and target attributes from
   * this bean.
   */
  #createNewLink():void {
    if (this.#getContent() !== null) {
      var droppedContent = this.#getContent();
      var url = droppedContent.getUriPath();

      //update the model, but don't recursively call #onValueChange
      var modelBean = this.getModel();
      modelBean.removeValueChangeListener(bind(this,this.#onValueChange));
      try {
        modelBean.set("href", url);
        modelBean.set("content", [droppedContent]);
      } finally {
        modelBean.addValueChangeListener(bind(this,this.#onValueChange));
      }

      //declare attributes for element creation/update
      var attributes:Record<string,any> = {"href" : "#", "_xlink:href" : modelBean.get("href"), "_xlink:show" : modelBean.get("type")};

      this.#executeWithoutFocus(():void => {
        var selection = this.#getSelectedText();
        //insert (=no text selected) or replace (=use selected text)
        //replace
        if (selection !== null) {
          // Apply style/the attributes
          var style:any = new CKEDITOR["style"]({ element : "a", attributes : attributes });
          style.type = CKEDITOR["STYLE_INLINE"];//TODO add to jangaroo CKEditor API // need to override... dunno why. => check cmlink.js for details
          this.#ckEditor.applyStyle(style);
        }
        //insert new element using the content name
        else {
          var linkElement:any = this.#ckEditor.document.createElement("a", {attributes: attributes});

          //check if image is selected
          if(this.#ckEditor.getSelection().getStartElement()["is"]("img")){
            var image:any = this.#ckEditor.getSelection().getStartElement();
            linkElement.append(image);
          }
          //if no image selected, create text link
          else{
            var text:any = this.#ckEditor.document.createText(droppedContent.getName());
            linkElement.append(text);
          }

          //select the new link string

          // TODO: This is just a temporary fix
          // In IE the getSelection() function returns null if the selection is empty and the
          // editor does not have the focus.
          if (this.#ckEditor.getSelection() === null && Ext.isIE) {
            this.#ckEditor.focus();
          }
          var ranges:any = this.#ckEditor.getSelection().getRanges();
          ranges[0].insertNode(linkElement);
          ranges[0].selectNodeContents(linkElement);
          this.#ckEditor.getSelection().selectRanges(ranges);
        }
      });
    }
  }

  /**
   * Returns the selected text of the RTE.
   * @return
   */
  #getSelectedText():string {
    var selection:any = this.#ckEditor.getSelection();

    if (selection === null) {
      return null;
    }

    var text = "" + selection.getSelectedText();
    if (text.length > 0) {
      return text;
    }

    return null;
  }

  #executeWithoutFocus(operation:AnyFunction):void {
    this.#updateInProgress++;
    try {
      this.#ckEditor.focusManager.lock();
      operation();
    } finally {
      this.#ckEditor.focusManager.unlock();
      this.#updateInProgress--;
    }
  }

  save():void {
    if (this.#dirty) { //check if the dialog is dirty, fire dirty command for put request
      this.#ckEditor["fire"]("save");
      this.#dirty = false;
    }

  }

  /**
   * Handle model updates, as a consequence, update the anchor element.
   */
  #onValueChange():void {
    if (!this.isVisible(true)) {
      return;
    }

    this.#updateInProgress++;
    try {
      var linkElement = this.#getSelectedInternalLink();

      //just update existing link
      if (linkElement !== null && this.#isValidLink()) {
        this.#updateLinkElement();
        this.#setDirty();
      }
      //it's a new link, but not valid yet
      else if (linkElement === null && !this.#isValidLink() && this.#getContent() === null) {
        //do nothing...
      }
      //create new link element
      else if (linkElement === null && this.#getContent() !== null) {
        this.#createNewLink();
        this.#setDirty();
      }
      //link exists but is not valid because link list has been resetted, but link item has been added
      else if (linkElement !== null && !this.#isValidLink() && this.#getContent() !== null) {
        this.#updateLinkElement();
        this.#setDirty();
      }
      //delete new link element
      else if (linkElement !== null && !this.#isValidLink()) {
        this.resetModel(false);
        this.#setDirty();
      }
    } finally {
      // Try do acknowledge the end of the update
      // after all setTimeout calls possibly made by the CKEditor
      // during the updates.
      window.setTimeout(():void => {
        this.#updateInProgress--;
        this.focus();
      }, 0);
    }

    this.save();
  }


  getModel():Bean {
    if (!this.#model) {
      this.#model = beanFactory._.createLocalBean();
    }
    return this.#model;
  }

  /**
   * A link is valid when there is an url and the target
   * window is set.
   * @return
   */
  #isValidLink():boolean {
    var modelBean = this.getModel();
    return modelBean.get("href") !== null && as(modelBean.get("href"),  String).length > 0;
  }


  /**
   * Checks if the selected text is an internal link
   * and updates the attributes using the model properties
   * of this bean.
   */
  #updateLinkElement():void {
    var linkElement = this.#getSelectedInternalLink();

    if (linkElement !== null) {
      if (this.#getContent() !== null) {
        var url = this.#getContent().getUriPath();
        linkElement.setAttribute("_xlink:href", url);
        linkElement.setAttribute("_xlink:show", this.getModel().get("type"));
      } else {
        this.#executeWithoutFocus(():void => {
          this.#ckEditor.execCommand("unlink");
        });
      }
    }
  }


  /**
   * Returns the content object from the bean
   * or null if not set yet.
   */
  #getContent():Content {
    var content:Content = null;
    var contentArray =as( this.getContentExpression().getValue(),  Array);
    if (contentArray && contentArray.length === 1) {
      content = as(contentArray[0], Content);
    }
    return content;
  }

  /**
   * Marks the dialog dirty.
   */
  #setDirty():void {
    this.#dirty = true;
  }


  override unlink():this {
    // hot fixed for now...
    // not using resetModel here as it triggers 3 change events at once, we just want to achieve the same behaviour
    // as when the content is changed via the link list field.
    this.getContentExpression().setValue([]);
    return this;
  }


  enabledTransformer():boolean {
    return this.#getContent() === null;
  }
}
export default InternalLinkDialogBase;
