Ext.define("com.coremedia.blueprint.social.composer.externallink.ExternalLinkDialogBase", function(ExternalLinkDialogBase) {/*package com.coremedia.blueprint.social.composer.externallink {
import com.coremedia.blueprint.social.beans.SocialHubServices;
import com.coremedia.blueprint.social.composer.MessageTextareaEditor;
import com.coremedia.cms.editor.sdk.components.StudioDialog;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;

public class ExternalLinkDialogBase extends StudioDialog {
  private var submitButtonDisabledExpression:ValueExpression;
  private var shortenLinkCheckboxValueExpression:ValueExpression;
  private var urlValueExpression:ValueExpression;

  [Bindable]
  public var messageEditor:MessageTextareaEditor;

  //the CKEditor
  private var editor:*;

  public*/ function ExternalLinkDialogBase$(config/*:ExternalLinkDialogBase = null*/) {if(arguments.length<=0)config=null;
    this.super$Dh6f(config);
  }/*


  override protected*/ function afterRender()/*:void*/ {
    com.coremedia.cms.editor.sdk.components.StudioDialog.prototype.afterRender.call(this);
    this.editor$Dh6f = AS3.getBindable(this,"messageEditor").getRichtextEditor().getCKEditor();

    var selection = this.editor$Dh6f.getSelection();
    var element = null;

    // Fill in all the relevant fields if there's already one link selected.
    if (( element = this.getSelectedLink$Dh6f(this.editor$Dh6f) ) && element.hasAttribute('_xlink:href')) {
      selection.selectElement(element);
      this.getUrlValueExpression().setValue(element.getText());
    }
  }/*

  private*/ function getSelectedLink(editor) {
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
  }/*

  protected*/ function getSubmitButtonDisabledExpression()/*:ValueExpression*/ {var this$=this;
    if(!this.submitButtonDisabledExpression$Dh6f) {
      this.submitButtonDisabledExpression$Dh6f = com.coremedia.ui.data.ValueExpressionFactory.createFromFunction(function()/*:Boolean*/ {
        var url/*:String*/ = this$.getUrlValueExpression().getValue();
        return !url || url.length === 0 || url.indexOf("http") === -1;
      });
    }
    return this.submitButtonDisabledExpression$Dh6f;
  }/*

  protected*/ function getUrlValueExpression()/*:ValueExpression*/ {
    if(!this.urlValueExpression$Dh6f) {
      this.urlValueExpression$Dh6f = com.coremedia.ui.data.ValueExpressionFactory.createFromValue("");
    }
    return this.urlValueExpression$Dh6f;
  }/*

  protected*/ function getShortenLinkCheckboxExpression()/*:ValueExpression*/ {
    if(!this.shortenLinkCheckboxValueExpression$Dh6f) {
      this.shortenLinkCheckboxValueExpression$Dh6f = com.coremedia.ui.data.ValueExpressionFactory.createFromValue(false);
    }
    return this.shortenLinkCheckboxValueExpression$Dh6f;
  }/*

  protected*/ function okPressed()/*:void*/ {var this$=this;
    var url/*:String*/ = this.getUrlValueExpression().getValue();
    var doShorten/*:Boolean*/ = this.getShortenLinkCheckboxExpression().getValue();
    if(doShorten) {
      com.coremedia.blueprint.social.beans.SocialHubServices.shortenUrl(url, function(shortened/*:String*/)/*:void*/ {
        this$.insertLink$Dh6f(shortened, true);
      });
    }
    else {
      this.insertLink$Dh6f(url, doShorten);
    }
  }/*

  private*/ function insertLink(url/*:String*/, shortened/*:Boolean*/)/*:void*/ {
    var attributes = {};
    var removeAttributes = [];
    var data = this.getData();

    attributes['_xlink:href'] = url;
    attributes['href'] = '#';

    this.editor$Dh6f.fire('saveSnapshot');
    attributes['_xlink:show'] = "new";

    var element/*:**/ = this.editor$Dh6f.getSelection().getSelectedElement();
    if (element && element.getName() === "a") {
      // We're only editing an existing link, so just overwrite the attributes.
      var href = element.getAttribute('_xlink:href');
      var textView = element.getHtml();

      // IE BUG: Setting the name attribute to an existing link doesn't work.
      // Must re-create the link from weired syntax to workaround.
      if (CKEDITOR['env'].ie && attributes.name != element.getAttribute('name')) {
        var newElement = new CKEDITOR['dom'].element('<a name="' + CKEDITOR['tools'].htmlEncode(attributes.name) + '">',
                this.editor$Dh6f.document);

        selection = this.editor$Dh6f.getSelection();

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
      var selection = this.editor$Dh6f.getSelection();
      var ranges = selection.getRanges();
      if (ranges.length == 1 && ranges[0].collapsed) {
        var text = new CKEDITOR['dom'].text(attributes['_xlink:href'], this.editor$Dh6f.document);
        ranges[0].insertNode(text);
        ranges[0].selectNodeContents(text);
        selection.selectRanges(ranges);
      }

      // Apply style.
      var style = new CKEDITOR['style']({ element : 'a', attributes : attributes });
      style.type = CKEDITOR['STYLE_INLINE'];		// need to override... dunno why.
      this.editor$Dh6f.applyStyle(style);

      // Id. Apply only to the first link.
      if (data && data.adv && data.adv.advId) {
        var links = this.editor$Dh6f.document.$.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
          if (links[i].href == attributes['_xlink:href']) {
            links[i].id = data.adv.advId;
            break;
          }
        }
      }
    }

    this.editor$Dh6f.fire('save');
    this.editor$Dh6f.fire('saveSnapshot');
    this.close();
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.cms.editor.sdk.components.StudioDialog",
      submitButtonDisabledExpression$Dh6f: null,
      shortenLinkCheckboxValueExpression$Dh6f: null,
      urlValueExpression$Dh6f: null,
      editor$Dh6f: undefined,
      constructor: ExternalLinkDialogBase$,
      super$Dh6f: function() {
        com.coremedia.cms.editor.sdk.components.StudioDialog.prototype.constructor.apply(this, arguments);
      },
      afterRender: afterRender,
      getSelectedLink$Dh6f: getSelectedLink,
      getSubmitButtonDisabledExpression: getSubmitButtonDisabledExpression,
      getUrlValueExpression: getUrlValueExpression,
      getShortenLinkCheckboxExpression: getShortenLinkCheckboxExpression,
      okPressed: okPressed,
      insertLink$Dh6f: insertLink,
      config: {messageEditor: null},
      requires: [
        "com.coremedia.cms.editor.sdk.components.StudioDialog",
        "com.coremedia.ui.data.ValueExpressionFactory"
      ],
      uses: ["com.coremedia.blueprint.social.beans.SocialHubServices"]
    };
});
