package com.coremedia.blueprint.social.composer.externallink {
import com.coremedia.blueprint.social.beans.SocialHubServices;
import com.coremedia.blueprint.social.composer.MessageTextareaEditor;
import com.coremedia.cms.editor.sdk.components.StudioDialog;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;

public class ExternalLinkDialogBase extends StudioDialog {
  private var submitButtonDisabledExpression:ValueExpression;
  private var shortenLinkCheckboxValueExpression:ValueExpression;
  private var urlValueExpression:ValueExpression;

  [ExtConfig]
  public var messageEditor:MessageTextareaEditor;

  //the CKEditor
  private var editor:*;

  public function ExternalLinkDialogBase(config:ExternalLinkDialogBase = null) {
    super(config);
  }


  override protected function afterRender():void {
    super.afterRender();
    this.editor = messageEditor.getRichtextEditor().getCKEditor();

    var selection = editor.getSelection();
    var element = null;

    // Fill in all the relevant fields if there's already one link selected.
    if (( element = getSelectedLink(editor) ) && element.hasAttribute('_xlink:href')) {
      selection.selectElement(element);
      getUrlValueExpression().setValue(element.getText());
    }
  }

  private function getSelectedLink(editor) {
    var range;
    try {
      range = editor.getSelection().getRanges(true)[ 0 ];
      range.shrink(CKEDITOR['SHRINK_TEXT']);
      var root = range.getCommonAncestor();
      return root.getAscendant('a', true);
    }
    catch(e) {
      return null;
    }
  }

  protected function getSubmitButtonDisabledExpression():ValueExpression {
    if(!submitButtonDisabledExpression) {
      submitButtonDisabledExpression = ValueExpressionFactory.createFromFunction(function():Boolean {
        var url:String = getUrlValueExpression().getValue();
        return !url || url.length === 0 || url.indexOf("http") === -1;
      });
    }
    return submitButtonDisabledExpression;
  }

  protected function getUrlValueExpression():ValueExpression {
    if(!urlValueExpression) {
      urlValueExpression = ValueExpressionFactory.createFromValue("");
    }
    return urlValueExpression;
  }

  protected function getShortenLinkCheckboxExpression():ValueExpression {
    if(!shortenLinkCheckboxValueExpression) {
      shortenLinkCheckboxValueExpression = ValueExpressionFactory.createFromValue(false);
    }
    return shortenLinkCheckboxValueExpression;
  }

  protected function okPressed():void {
    var url:String = getUrlValueExpression().getValue();
    var doShorten:Boolean = getShortenLinkCheckboxExpression().getValue();
    if(doShorten) {
      SocialHubServices.shortenUrl(url, function(shortened:String):void {
        insertLink(shortened, true);
      });
    }
    else {
      insertLink(url, doShorten);
    }
  }

  private function insertLink(url:String, shortened:Boolean):void {
    var attributes = {};
    var removeAttributes = [];
    var data = getData();

    attributes['_xlink:href'] = url;
    attributes['href'] = '#';

    editor.fire('saveSnapshot');
    attributes['_xlink:show'] = "new";

    var element:* = editor.getSelection().getSelectedElement();
    if (element && element.getName() === "a") {
      // We're only editing an existing link, so just overwrite the attributes.
      var href = element.getAttribute('_xlink:href');
      var textView = element.getHtml();

      // IE BUG: Setting the name attribute to an existing link doesn't work.
      // Must re-create the link from weired syntax to workaround.
      if (CKEDITOR['env'].ie && attributes.name != element.getAttribute('name')) {
        var newElement = new CKEDITOR['dom'].element('<a name="' + CKEDITOR['tools'].htmlEncode(attributes.name) + '">',
                editor.document);

        selection = editor.getSelection();

        element.moveChildren(newElement);
        element.copyAttributes(newElement, { name : 1 });
        newElement.replace(element);
        element = newElement;

        selection.selectElement(element);
      }

      element.setAttributes(attributes);
      element.removeAttributes(removeAttributes);
      // Update text view when user changes protocol #4612.
      if (href == textView) {
        element.setHtml(attributes['_xlink:href']);
      }

      // delete this._.selectedElement;
    } else {
      // Create element if current selection is collapsed.
      var selection = editor.getSelection();
      var ranges = selection.getRanges();
      if (ranges.length == 1 && ranges[0].collapsed) {
        var text = new CKEDITOR['dom'].text(attributes['_xlink:href'], editor.document);
        ranges[0].insertNode(text);
        ranges[0].selectNodeContents(text);
        selection.selectRanges(ranges);
      }

      // Apply style.
      var style = new CKEDITOR['style']({ element : 'a', attributes : attributes });
      style.type = CKEDITOR['STYLE_INLINE'];		// need to override... dunno why.
      editor.applyStyle(style);

      // Id. Apply only to the first link.
      if (data && data.adv && data.adv.advId) {
        var links = editor.document.$.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
          if (links[i].href == attributes['_xlink:href']) {
            links[i].id = data.adv.advId;
            break;
          }
        }
      }
    }

    editor.fire('save');
    editor.fire('saveSnapshot');
    this.close();
  }
}
}
