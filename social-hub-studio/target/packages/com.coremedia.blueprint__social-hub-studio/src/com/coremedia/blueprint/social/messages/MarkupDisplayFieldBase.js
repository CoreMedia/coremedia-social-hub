Ext.define("com.coremedia.blueprint.social.messages.MarkupDisplayFieldBase", function(MarkupDisplayFieldBase) {/*package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.MessageContainerDescriptor;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.util.EventUtil;

import ext.container.Container;
import ext.form.field.DisplayField;

public class MarkupDisplayFieldBase extends MessageDisplayFieldBase {

  public*/ function MarkupDisplayFieldBase$(config/*:MarkupDisplayFieldBase = null*/) {if(arguments.length<=0)config=null;
    this.super$CkA3(config);
  }/*


  //TODO remove script again on destroy
  private*/ function loadScript(path/*:String*/, callback/*:Function*/)/*:void*/ {
    var done/*:Boolean*/ = false;
    var scr/*:**/ = window.document.createElement('script');

    scr.onload = handleLoad;
    scr.onreadystatechange = handleReadyStateChange;
    scr.onerror = handleError;
    scr.src = path;
    window.document.getElementsByTagName('head')[0].appendChild(scr);

    function handleLoad() {
      if (!done) {
        done = true;
        callback(path, "ok");
      }
    }

    function handleReadyStateChange()/*:void*/ {
      var state/*:**/;
      if (!done) {
        state = scr.readyState;
        if (state === "complete") {
          handleLoad();
        }
      }
    }

    function handleError()/*:void*/ {
      if (!done) {
        done = true;
        callback(path, "error");
      }
    }
  }/*

  override protected*/ function afterRender()/*:void*/ {
    com.coremedia.blueprint.social.messages.MessageDisplayFieldBase.prototype.afterRender.call(this);

    var displayField/*:DisplayField*/ =AS3.as( this.queryById("markup"),  Ext.form.field.Display);
    var el/*:**/ = displayField.el.dom;

    if(window.ResizeObserver) {
      new window.ResizeObserver(AS3.bind(this,"outputsize$CkA3"))['observe'](el);
    }
    else {
      window.setTimeout(AS3.bind(this,"outputsize$CkA3"), 2000);
    }

    var that/*:Container*/ = this;
    if (AS3.getBindable(this,"messageContainerDescriptor") && AS3.getBindable(this,"messageContainerDescriptor").getScripts() && AS3.getBindable(this,"messageContainerDescriptor").getScripts().length > 0) {
      for/* each*/(var $1=0,$2=/* in*/ AS3.getBindable(this,"messageContainerDescriptor").getScripts();$1<$2.length;++$1) {var script/*:String*/ =$2[$1];
        var url/*:String*/ = script;
        if (url.indexOf('?') === -1) {
          url = url + '?' + new Date().time;
        }
        this.loadScript$CkA3(url,AS3.bind( this,"refresh$CkA3"));
      }
    }
  }/*

  private*/ function refresh()/*:void*/ {
    var displayField/*:DisplayField*/ =AS3.as( this.queryById("markup"),  Ext.form.field.Display);
    displayField.setHeight(displayField.getHeight());
  }/*

  private*/ function outputsize()/*:void*/ {var this$=this;
    //comparing with the existing height doesn't work, dunno, so we always set the height with delayed to avoid blocking
    com.coremedia.ui.util.EventUtil.invokeLater(function ()/*:void*/ {
      var displayField/*:DisplayField*/ =AS3.as( this$.queryById("markup"),  Ext.form.field.Display);
      if (displayField) {
        var div/*:**/ = displayField.el.dom;
        var height/*:Number*/ = div.offsetHeight;
        displayField.setHeight(height);
      }

      if (AS3.getBindable(this$,"messageContainerDescriptor") && AS3.getBindable(this$,"messageContainerDescriptor").getScriplets() && AS3.getBindable(this$,"messageContainerDescriptor").getScriplets().length > 0) {
        for/* each*/(var $1=0,$2=/* in*/ AS3.getBindable(this$,"messageContainerDescriptor").getScriplets();$1<$2.length;++$1) {var scriptlet/*:String*/ =$2[$1];
          window.eval(scriptlet);
        }
      }
    });
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.blueprint.social.messages.MessageDisplayFieldBase",
      constructor: MarkupDisplayFieldBase$,
      super$CkA3: function() {
        com.coremedia.blueprint.social.messages.MessageDisplayFieldBase.prototype.constructor.apply(this, arguments);
      },
      loadScript$CkA3: loadScript,
      afterRender: afterRender,
      refresh$CkA3: refresh,
      outputsize$CkA3: outputsize,
      requires: [
        "Ext.form.field.Display",
        "com.coremedia.blueprint.social.messages.MessageDisplayFieldBase",
        "com.coremedia.ui.util.EventUtil"
      ]
    };
});
