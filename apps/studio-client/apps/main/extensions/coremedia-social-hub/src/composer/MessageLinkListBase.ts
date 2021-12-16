import Content from "@coremedia/studio-client.cap-rest-client/content/Content";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import MemoryLinkListWrapper from "@coremedia/studio-client.content-link-list-models/MemoryLinkListWrapper";
import ILinkListWrapper from "@coremedia/studio-client.link-list-models/ILinkListWrapper";
import Editor_properties from "@coremedia/studio-client.main.editor-components/Editor_properties";
import LinkListPropertyFieldGridPanel from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/LinkListPropertyFieldGridPanel";
import { as, bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import MessageLinkList from "./MessageLinkList";

interface MessageLinkListBaseConfig extends Config<LinkListPropertyFieldGridPanel>, Partial<Pick<MessageLinkListBase,
  "valueExpression"
>> {
}

class MessageLinkListBase extends LinkListPropertyFieldGridPanel {
  declare Config: MessageLinkListBaseConfig;

  valueExpression: ValueExpression = null;

  #listExpression: ValueExpression = null;

  #_linkListWrapper: ILinkListWrapper = null;

  constructor(config: Config<MessageLinkList> = null) {
    config.linkType = config.linkType; //TODO
    config.dropAreaText = Editor_properties.LinkListPropertyFieldWithSuggestions_text;
    config.preferredSiteOnly = true;
    super(config);
    this.valueExpression.addChangeListener(bind(this, this.#valueChanged));
  }

  #valueChanged(): void {
    //    getTopToolbar().queryById('clearParentList').setDisabled(false);
    //    if (!listExpression.getValue() || (listExpression.getValue() as Array).length === 0) {
    //      getTopToolbar().queryById('clearParentList').setDisabled(true);
    //    }
  }

  protected getLinkListWrapper(config: Config<MessageLinkListBase>): ILinkListWrapper {
    if (!this.#_linkListWrapper) {
      const wrapperCfg = Config<MemoryLinkListWrapper>({});
      wrapperCfg.linksVE = this.getListExpression(config.valueExpression);
      wrapperCfg.linkTypeName = config.linkType;
      wrapperCfg.maxCardinality = 1;
      this.#_linkListWrapper = new MemoryLinkListWrapper(wrapperCfg);
    }
    return this.#_linkListWrapper;
  }

  protected getListExpression(valueExpression: ValueExpression): ValueExpression {
    if (!this.#listExpression) {
      this.#listExpression = ValueExpressionFactory.create("items", beanFactory._.createLocalBean());
      const list = [];
      const valueFromVE = valueExpression.getValue();
      if (valueFromVE) {
        list.push(valueFromVE);
      }
      this.#listExpression.setValue(list);

      this.#listExpression.addChangeListener(bind(this, this.#listChanged));
    }
    return this.#listExpression;
  }

  protected clearList(): void {
    this.#listExpression.setValue([]);
  }

  #listChanged(): void {
    if (this.#listExpression.getValue() && as(this.#listExpression.getValue(), Array).length > 0) {
      const c: Content = this.#listExpression.getValue()[0];

    } else {
      this.valueExpression.setValue(null);
    }
  }
}

export default MessageLinkListBase;
