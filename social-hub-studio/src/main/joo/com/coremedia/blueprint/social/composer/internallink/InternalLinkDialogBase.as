package com.coremedia.blueprint.social.composer.internallink {
import com.coremedia.blueprint.social.composer.MessageTextareaEditor;
import com.coremedia.cap.common.SESSION;
import com.coremedia.cap.content.Content;
import com.coremedia.cms.editor.sdk.components.StudioDialog;
import com.coremedia.ui.ckeditor.AnchorUtil;
import com.coremedia.ui.data.Bean;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.data.beanFactory;
import com.coremedia.ui.util.EventUtil;

import ext.Ext;

public class InternalLinkDialogBase extends StudioDialog {
  private var submitButtonDisabledExpression:ValueExpression;

  [Bindable]
  public var messageEditor:MessageTextareaEditor;

  private var contentExpression:ValueExpression;


  private var dirty:Boolean;
  private var updateInProgress:Number = 0;

  /**
   * The UI model for rendering this component.
   */
  private var model:Bean;

  //the CKEditor
  private var ckEditor:*;

  public function InternalLinkDialogBase(config:InternalLinkDialogBase = null) {
    super(config);
  }

  /**
   * Remember this menu in the global list of currently shown internal
   * link menus. Unless a menu is entered into that list, no effort is
   * made to keep it open.
   */
  override public function show(animateTarget:* = null, callback:Function = null, scope:Object = null):void {
    this.ckEditor = messageEditor.getRichtextEditor().getCKEditor();

    resetModel(true);
    var modelBean:Bean = getModel();
    modelBean.addValueChangeListener(onValueChange);
    var element:* = getSelectedInternalLink();
    var selection:* = ckEditor.getSelection();

    // Fill in all the relevant fields if there's already one link selected.
    if (element) {
      selection['selectElement'](element);

      var url:String = element.getAttribute('_xlink:href') || 'http://';
      var content:Content = SESSION.getConnection().getContentRepository().getContent(url);

      var linkType:String = element.getAttribute('_xlink:show');
      // TODO: use this (later)
      //var name:String = element.getAttribute('_xlink:role');

      modelBean.set('href', url);
      modelBean.set('content', content ? [content] : []);
      modelBean.set('type', linkType);
    }

    onValueChange();
    super.show(animateTarget, callback, scope);
  }


  /**
   * Deletes the selected link.
   * Called via update model, or from the remove link button.
   */
  public function resetModel(force:Boolean = false):void {
    if (isVisible(true) || force) {
      var modelBean:Bean = getModel();
      modelBean.set('href', '');
      modelBean.set('content', []);
    }
  }


  protected function getSubmitButtonDisabledExpression():ValueExpression {
    if (!submitButtonDisabledExpression) {
      submitButtonDisabledExpression = ValueExpressionFactory.createFromFunction(function ():Boolean {
        return getContent() === null;
      });
    }
    return submitButtonDisabledExpression;
  }

  protected function getContentExpression():ValueExpression {
    if (!contentExpression) {
      contentExpression = ValueExpressionFactory.create("content", getModel());
    }
    return contentExpression;
  }

  protected function okPressed():void {
//    var url:String = getUrlValueExpression().getValue();
//    insertLink(url, false);
    this.destroy();
  }

  /**
   * Return the currently selected internal link element, or null, if no internal link is selected.
   * If ckEditor.getSelection() returns null the ckEditor gets the focus as a workaround
   * @return the currently selected internal link element
   */
  private function getSelectedInternalLink():* {
    // TODO: This is just a temporary fix... Once selections are locked properly for
    // internal links in IE, this should be removed
    if (Ext.isIE && ckEditor !== null && ckEditor.getSelection() === null) {
      updateInProgress++;
      ckEditor.focus(true);
      EventUtil.invokeLater(function():void {
        updateInProgress--;
      });
    }
    try {
      var selection:* = ckEditor.getSelection();
      var ascendant:* = AnchorUtil.getSelectedAnchor(selection);
      return AnchorUtil.isLinkWithoutUrlScheme(ascendant) ? ascendant : null;
    }
    catch(e:*) {
      return null;
    }
  }

  /**
   * Creates a new anchor element and
   * applies the url and target attributes from
   * this bean.
   */
  private function createNewLink():void {
    if (getContent() !== null) {
      var droppedContent:Content = getContent();
      var url:String = droppedContent.getUriPath();

      //update the model, but don't recursively call #onValueChange
      var modelBean:Bean = getModel();
      modelBean.removeValueChangeListener(onValueChange);
      try {
        modelBean.set('href', url);
        modelBean.set('content', [droppedContent]);
      } finally {
        modelBean.addValueChangeListener(onValueChange);
      }

      //declare attributes for element creation/update
      var attributes:Object = {'href' : '#', '_xlink:href' : modelBean.get('href'), '_xlink:show' : modelBean.get('type')};

      executeWithoutFocus(function ():void {
        var selection:String = getSelectedText();
        //insert (=no text selected) or replace (=use selected text)
        //replace
        if (selection !== null) {
          // Apply style/the attributes
          var style:* = new CKEDITOR['style']({ element : 'a', attributes : attributes });
          style.type = CKEDITOR['STYLE_INLINE'];//TODO add to jangaroo CKEditor API // need to override... dunno why. => check cmlink.js for details
          ckEditor.applyStyle(style);
        }
        //insert new element using the content name
        else {
          var linkElement:* = ckEditor.document.createElement('a', {attributes: attributes});

          //check if image is selected
          if(ckEditor.getSelection().getStartElement()['is']('img')){
            var image:* = ckEditor.getSelection().getStartElement();
            linkElement.append(image);
          }
          //if no image selected, create text link
          else{
            var text:* = ckEditor.document.createText(droppedContent.getName());
            linkElement.append(text);
          }

          //select the new link string

          // TODO: This is just a temporary fix
          // In IE the getSelection() function returns null if the selection is empty and the
          // editor does not have the focus.
          if (ckEditor.getSelection() === null && Ext.isIE) {
            ckEditor.focus();
          }
          var ranges:* = ckEditor.getSelection().getRanges();
          ranges[0].insertNode(linkElement);
          ranges[0].selectNodeContents(linkElement);
          ckEditor.getSelection().selectRanges(ranges);
        }
      });
    }
  }

  /**
   * Returns the selected text of the RTE.
   * @return
   */
  private function getSelectedText():String {
    var selection:* = ckEditor.getSelection();

    if (selection === null) {
      return null;
    }

    var text:String = "" + selection.getSelectedText();
    if (text.length > 0) {
      return text;
    }

    return null;
  }

  private function executeWithoutFocus(operation:Function):void {
    updateInProgress++;
    try {
      ckEditor.focusManager.lock();
      operation();
    } finally {
      ckEditor.focusManager.unlock();
      updateInProgress--;
    }
  }

  public function save():void {
    if (dirty) { //check if the dialog is dirty, fire dirty command for put request
      ckEditor['fire']('save');
      dirty = false;
    }

  }

  /**
   * Handle model updates, as a consequence, update the anchor element.
   */
  private function onValueChange():void {
    if (!isVisible(true)) {
      return;
    }

    updateInProgress++;
    try {
      var linkElement:* = getSelectedInternalLink();

      //just update existing link
      if (linkElement !== null && isValidLink()) {
        updateLinkElement();
        setDirty();
      }
      //it's a new link, but not valid yet
      else if (linkElement === null && !isValidLink() && getContent() === null) {
        //do nothing...
      }
      //create new link element
      else if (linkElement === null && getContent() !== null) {
        createNewLink();
        setDirty();
      }
      //link exists but is not valid because link list has been resetted, but link item has been added
      else if (linkElement !== null && !isValidLink() && getContent() !== null) {
        updateLinkElement();
        setDirty();
      }
      //delete new link element
      else if (linkElement !== null && !isValidLink()) {
        resetModel(false);
        setDirty();
      }
    } finally {
      // Try do acknowledge the end of the update
      // after all setTimeout calls possibly made by the CKEditor
      // during the updates.
      window.setTimeout(function():void {
        updateInProgress--;
        focus();
      }, 0);
    }

    save();
  }


  public function getModel():Bean {
    if (!model) {
      model = beanFactory.createLocalBean();
    }
    return model;
  }

  /**
   * A link is valid when there is an url and the target
   * window is set.
   * @return
   */
  private function isValidLink():Boolean {
    var modelBean:Bean = getModel();
    return modelBean.get('href') !== null && (modelBean.get('href') as String).length > 0;
  }


  /**
   * Checks if the selected text is an internal link
   * and updates the attributes using the model properties
   * of this bean.
   */
  private function updateLinkElement():void {
    var linkElement:* = getSelectedInternalLink();

    if (linkElement !== null) {
      if (getContent() !== null) {
        var url:String = getContent().getUriPath();
        linkElement.setAttribute('_xlink:href', url);
        linkElement.setAttribute('_xlink:show', getModel().get('type'));
      } else {
        executeWithoutFocus(function ():void {
          ckEditor.execCommand('unlink');
        });
      }
    }
  }


  /**
   * Returns the content object from the bean
   * or null if not set yet.
   */
  private function getContent():Content {
    var content:Content = null;
    var contentArray:Array = getContentExpression().getValue() as Array;
    if (contentArray && contentArray.length === 1) {
      content = contentArray[0];
    }
    return content;
  }

  /**
   * Marks the dialog dirty.
   */
  private function setDirty():void {
    dirty = true;
  }


  public function unlink():void {
    // hot fixed for now...
    // not using resetModel here as it triggers 3 change events at once, we just want to achieve the same behaviour
    // as when the content is changed via the link list field.
    getContentExpression().setValue([]);
  }


  internal function enabledTransformer():Boolean {
    return getContent() === null;
  }
}
}
