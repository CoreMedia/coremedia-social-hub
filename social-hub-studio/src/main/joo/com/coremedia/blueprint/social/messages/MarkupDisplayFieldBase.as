package com.coremedia.blueprint.social.messages {
import com.coremedia.blueprint.social.beans.MessageContainerDescriptor;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.util.EventUtil;

import ext.container.Container;
import ext.form.field.DisplayField;

public class MarkupDisplayFieldBase extends MessageDisplayFieldBase {

  public function MarkupDisplayFieldBase(config:MarkupDisplayFieldBase = null) {
    super(config);
  }


  //TODO remove script again on destroy
  private function loadScript(path:String, callback:Function):void {
    var done:Boolean = false;
    var scr:* = window.document.createElement('script');

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

    function handleReadyStateChange():void {
      var state:*;
      if (!done) {
        state = scr.readyState;
        if (state === "complete") {
          handleLoad();
        }
      }
    }

    function handleError():void {
      if (!done) {
        done = true;
        callback(path, "error");
      }
    }
  }

  override protected function afterRender():void {
    super.afterRender();

    var displayField:DisplayField = queryById("markup") as DisplayField;
    var el:* = displayField.el.dom;

    if(window.ResizeObserver) {
      new window.ResizeObserver(outputsize)['observe'](el);
    }
    else {
      window.setTimeout(outputsize, 2000);
    }

    var that:Container = this;
    if (messageContainerDescriptor && messageContainerDescriptor.getScripts() && messageContainerDescriptor.getScripts().length > 0) {
      for each(var script:String in messageContainerDescriptor.getScripts()) {
        var url:String = script;
        if (url.indexOf('?') === -1) {
          url = url + '?' + new Date().time;
        }
        loadScript(url, refresh);
      }
    }
  }

  private function refresh():void {
    var displayField:DisplayField = queryById("markup") as DisplayField;
    displayField.setHeight(displayField.getHeight());
  }

  private function outputsize():void {
    //comparing with the existing height doesn't work, dunno, so we always set the height with delayed to avoid blocking
    EventUtil.invokeLater(function ():void {
      var displayField:DisplayField = queryById("markup") as DisplayField;
      if (displayField) {
        var div:* = displayField.el.dom;
        var height:Number = div.offsetHeight;
        displayField.setHeight(height);
      }

      if (messageContainerDescriptor && messageContainerDescriptor.getScriplets() && messageContainerDescriptor.getScriplets().length > 0) {
        for each(var scriptlet:String in messageContainerDescriptor.getScriplets()) {
          window.eval(scriptlet);
        }
      }
    });
  }
}
}
