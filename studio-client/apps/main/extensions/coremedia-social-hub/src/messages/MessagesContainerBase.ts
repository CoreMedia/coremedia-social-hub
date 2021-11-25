import Config from "@jangaroo/runtime/Config";
import { as, asConfig, bind, cast } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import Message from "../beans/Message";
import MessageImpl from "../beans/MessageImpl";
import SocialHubAdapterImpl from "../beans/SocialHubAdapterImpl";
import SocialHubPropertyNames from "../beans/SocialHubPropertyNames";
import ChannelContainerBase from "../channels/ChannelContainerBase";
import DynamicMessageContainer from "./DynamicMessageContainer";
import MessagesContainer from "./MessagesContainer";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import EventUtil from "@coremedia/studio-client.client-core/util/EventUtil";
import ProgressLoadMask from "@coremedia/studio-client.ext.ui-components/components/ProgressLoadMask";
import Editor_properties from "@coremedia/studio-client.main.editor-components/Editor_properties";
import TimeUtil from "@coremedia/studio-client.main.editor-components/sdk/util/TimeUtil";
import DateUtil from "@jangaroo/ext-ts/Date";
import Container from "@jangaroo/ext-ts/container/Container";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface MessagesContainerBaseConfig extends Config<Container>, Partial<Pick<MessagesContainerBase,
  "adapter" |
  "messageType" |
  "loadMask" |
  "activeItemExpression"
>> {
}



class MessagesContainerBase extends Container {
  declare Config: MessagesContainerBaseConfig;

  adapter:SocialHubAdapterImpl = null;

  messageType:string = null;

  loadMask:ProgressLoadMask = null;

  activeItemExpression:ValueExpression = null;

  #target:Container = null;

  #lastDateString:string = null;

  constructor(config:Config<MessagesContainerBase> = null) {
    super(config);
    this.#target =as( this.queryById(MessagesContainer.MESSAGES_CONTAINER_ITEM_ID),  Container);
  }

  protected override afterRender():void {
    super.afterRender();

    //when reopening the social hub window the reloading of the messages comes BEFORE the reloading of ChannelContainer
    //then this component has no loadmask.
    //With EventUtil the problem could be solved.
    EventUtil.invokeLater(():void => 
      this.reload(false)
    );
  }

  reload(invalidate:boolean = true):void {
    this.clear();
    if (invalidate) {
      this.adapter.invalidate(bind(this,this.#loadMessages));
    }
    else {
      this.#loadMessages(false);
    }
  }

  clear():void {
    this.#lastDateString = null;
    this.#target.removeAll();
  }

  #loadMessages(invalidate:boolean = true):void {
    if (invalidate) {
      this.#invalidateMessages();
    }
    else {
      this.#loadMsgs();
    }
  }

  #invalidateMessages():void {
    for(var message of Object.values(this.adapter.get(this.messageType) || {}) as MessageImpl[]) {
      message.invalidate();
    }

    this.#loadMsgs();
  }

  #loadMsgs():void {
    ValueExpressionFactory.createFromFunction(():Array<any> => {
      var result = [];
      for(var message of Object.values(this.adapter.get(this.messageType) || {}) as MessageImpl[]) {
        if (!message.isLoaded()) {
          message.load();
          return undefined;
        }

        result.push(message);
      }

      return result;
    }).loadValue((msgs:Array<any>):void => {
      for(var message of Object.values(this.adapter.get(this.messageType) || {}) as MessageImpl[]) {
        this.#loadMessage(message);
      }
    });
  }

  #loadMessage(message:MessageImpl):void {
    if (this.messageType === SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES) {
      this.#renderDate(message);
    }

    var dynamicMessage = Config(DynamicMessageContainer);
    dynamicMessage.adapter = this.adapter;
    dynamicMessage.message = message;
    this.#target.add(dynamicMessage);

    if (this.loadMask && !this.loadMask.destroyed) {
      this.loadMask.el.dom["children"][1].setAttribute("style", "background: transparent;");
      this.loadMask["messagesCount"]++;
      this.loadMask.progress = this.loadMask["messagesCount"] / this.loadMask["messagesLength"];
      if (this.loadMask.progress === 1) {
        this.loadMask.hide();
        this.loadMask.destroy();
        this.activeItemExpression.setValue(ChannelContainerBase.MESSAGE_WRAPPER_ITEM_ID);
        this.#target.up().updateLayout();
      }
    }

  }

  #renderDate(message:Message):void {
    var value = this.#getDateLabel(message);
    if (value !== null) {
      var conf:Record<string,any> = {
        value: value,
        ui: null,
        style: "margin-left: 4px; font-size: 22px;margin-top: 12px;margin-bottom: 12px;"
      };

      var field = new DisplayField(Config(DisplayField, conf));
      this.#target.add(field);
    }
  }

  #getDateLabel(message:Message):string {
    var publicationDate = message.getPublicationDate();
    //scheduled right now
    if (!publicationDate) {
      return SocialHub_properties.message_footer_scheduled_now;
    }

    var value = this.#getWeekday(publicationDate) + ", " + DateUtil.format(publicationDate, Editor_properties.shortDateFormat);
    if (TimeUtil.isToday(publicationDate)) {
      value = SocialHub_properties.channel_queue_today;
    }

    if (value !== this.#lastDateString) {
      this.#lastDateString = value;
      return this.#lastDateString;
    }

    return null;
  }

  protected getEmptyLabel(msgType:string):string {
    if (msgType === SocialHubPropertyNames.ADAPTER_SCHEDULED_MESSAGES) {
      return SocialHub_properties.channel_empty_scheduled;
    }
    return SocialHub_properties.channel_empty_history;
  }

  //TODO
  #getWeekday(date:Date):string {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    return weekdays[date.getDay()];
  }
}
export default MessagesContainerBase;
