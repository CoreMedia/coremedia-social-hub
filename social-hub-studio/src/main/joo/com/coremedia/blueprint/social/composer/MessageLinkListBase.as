package com.coremedia.blueprint.social.composer {

import com.coremedia.blueprint.social.beans.SocialHubAdapter;
import com.coremedia.blueprint.social.beans.MessageProperty;
import com.coremedia.cap.content.Content;
import com.coremedia.cms.editor.sdk.premular.fields.LinkListPropertyFieldGridPanel;
import com.coremedia.cms.editor.sdk.util.ILinkListWrapper;
import com.coremedia.cms.editor.sdk.util.MemoryLinkListWrapper;
import com.coremedia.ui.data.ValueExpression;
import com.coremedia.ui.data.ValueExpressionFactory;
import com.coremedia.ui.data.beanFactory;
import com.coremedia.ui.mixins.IValidationStateMixin;
import com.coremedia.ui.mixins.ValidationState;

import ext.StringUtil;

import ext.panel.Panel;

import mx.resources.ResourceManager;

public class MessageLinkListBase extends LinkListPropertyFieldGridPanel {

  [ExtConfig]
  public var valueExpression:ValueExpression;

  private var listExpression:ValueExpression;
  private var _linkListWrapper:ILinkListWrapper;

  public function MessageLinkListBase(config:MessageLinkList = null) {
    config.linkType = config.linkType; //TODO
    config.dropAreaText = resourceManager.getString('com.coremedia.cms.editor.Editor', 'LinkListPropertyFieldWithSuggestions_text');
    config.preferredSiteOnly = true;
    super(config);
    valueExpression.addChangeListener(valueChanged);
  }

  private function valueChanged():void {
//    getTopToolbar().queryById('clearParentList').setDisabled(false);
//    if (!listExpression.getValue() || (listExpression.getValue() as Array).length === 0) {
//      getTopToolbar().queryById('clearParentList').setDisabled(true);
//    }
  }

  protected function getLinkListWrapper(config:MessageLinkListBase):ILinkListWrapper {
    if (!_linkListWrapper) {
      var wrapperCfg:MemoryLinkListWrapper = MemoryLinkListWrapper({});
      wrapperCfg.linksVE = getListExpression(config.valueExpression);
      wrapperCfg.linkTypeName = config.linkType;
      wrapperCfg.maxCardinality = 1;
      _linkListWrapper = new MemoryLinkListWrapper(wrapperCfg);
    }
    return _linkListWrapper;
  }

  protected function getListExpression(valueExpression:ValueExpression):ValueExpression {
    if (!listExpression) {
      listExpression = ValueExpressionFactory.create('items', beanFactory.createLocalBean());
      var list:Array = [];
      var valueFromVE:* = valueExpression.getValue();
      if (valueFromVE) {
        list.push(valueFromVE);
      }
      listExpression.setValue(list);

      listExpression.addChangeListener(listChanged);
    }
    return listExpression;
  }

  protected function clearList():void {
    listExpression.setValue([]);
  }

  private function listChanged():void {
    if (listExpression.getValue() && (listExpression.getValue() as Array).length > 0) {
      var c:Content = listExpression.getValue()[0];

    }
    else {
      valueExpression.setValue(null);
    }
  }
}
}
