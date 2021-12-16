import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import EventUtil from "@coremedia/studio-client.client-core/util/EventUtil";
import ProgressLoadMask from "@coremedia/studio-client.ext.ui-components/components/ProgressLoadMask";
import Panel from "@jangaroo/ext-ts/panel/Panel";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import { AnyFunction } from "@jangaroo/runtime/types";
import SocialHubMainTab from "./SocialHubMainTab";
import SocialHubAdapterImpl from "./beans/SocialHubAdapterImpl";
import SocialHubAdaptersImpl from "./beans/SocialHubAdaptersImpl";
import ComposerBase from "./composer/ComposerBase";
import socialHubService from "./socialHubService";

interface SocialHubMainTabBaseConfig extends Config<Panel> {
}

class SocialHubMainTabBase extends Panel {
  declare Config: SocialHubMainTabBaseConfig;

  static readonly ID: string = "cm-social-hub-main-tab";

  static readonly LOADER_ITEM_ID: string = "loader";

  static readonly EMPTY_ITEM_ID: string = "empty";

  static readonly CHANNELS_ITEM_ID: string = "channels";

  #adapterCount: number = 0;

  #adapters: Array<any> = [];

  #loadMask: ProgressLoadMask = null;

  #adaptersExpression: ValueExpression = null;

  #activeItemExpression: ValueExpression = null;

  constructor(config: Config<SocialHubMainTab> = null) {
    super(config);
  }

  protected override afterRender(): void {
    super.afterRender();
    const adapterExpre = socialHubService.getAdaptersExpression();
    socialHubService.getAdaptersExpression().addChangeListener(bind(this, this.#adaptersChanged));
    //wait for the layout. Unfortunately afterlayout event is too much as it will cause show loadMask at resizing.
    this.#adaptersChanged(adapterExpre);
  }

  #adaptersChanged(adaptersExpression: ValueExpression): void {

    const loadMaskConfig = Config(ProgressLoadMask);
    // todo: workaround to style the mask smaller. This should be done better in the component itself.
    loadMaskConfig.style = "{position: relative; height: 200px; width: 200px; position: absolute; left: 50%; margin-left: -100px; top: 40%; margin-top: -100px;}";
    loadMaskConfig.msg = "";
    loadMaskConfig.target = this.queryById(SocialHubMainTabBase.LOADER_ITEM_ID);
    this.#loadMask = new ProgressLoadMask(loadMaskConfig);
    this.#loadMask.show();
    this.#loadMask.progress = 0;

    this.getActiveItemExpression().setValue(SocialHubMainTabBase.LOADER_ITEM_ID);

    EventUtil.invokeLater((): void =>
      this.#loadAdapters(adaptersExpression),
    );
  }

  #loadAdapters(adaptersExpression: ValueExpression): void {
    this.#adapterCount = 0;
    this.#adapters = [];

    const adaptersBean: SocialHubAdaptersImpl = adaptersExpression.getValue();
    if (!adaptersBean) {
      this.#loadAdapterList([]);
    } else {
      adaptersBean.load((): void => {
        this.#adapters = adaptersBean.getAdapters();
        this.#loadAdapterList(this.#adapters);
      });
    }
  }

  #loadAdapterList(adapters: Array<any>): void {
    //destroy the loadmask when there is no adapter
    if (adapters.length === 0) {
      this.#loadMask.destroy();
      this.getActiveItemExpression().setValue(SocialHubMainTabBase.EMPTY_ITEM_ID);
    }
    for (const a of adapters as SocialHubAdapterImpl[]) {
      a.load((): void => {
        this.#adapterCount++;
        const progress: number = this.#adapterCount / adapters.length;
        this.#loadMask.progress = progress;
        if (progress === 1) {
          this.getAdaptersExpression().setValue(adapters);
          //wait a little bit before destroying the load mask. Otherwise the loadmask will not be visible in some cases.
          window.setTimeout((): void => {
            this.#loadMask.destroy();
            this.getActiveItemExpression().setValue(SocialHubMainTabBase.CHANNELS_ITEM_ID);
          }, 500);
        }
      });
    }
  }

  getActiveItemExpression(): ValueExpression {
    if (!this.#activeItemExpression) {
      this.#activeItemExpression = ValueExpressionFactory.createFromValue(SocialHubMainTabBase.LOADER_ITEM_ID);
    }
    return this.#activeItemExpression;
  }

  // instead of socialHubService.getChannelsExpression() this expression is used to store loaded adapters
  // Therefore ChannelContainer can assume that the configured adapter is loaded.
  getAdaptersExpression(): ValueExpression {
    if (!this.#adaptersExpression) {
      this.#adaptersExpression = ValueExpressionFactory.createFromValue([]);
    }
    return this.#adaptersExpression;
  }

  protected override onHide(animateTarget?: any, callback: AnyFunction = null, scope: any = null): void {
    ComposerBase.closeAll();
    super.onHide(animateTarget, callback, scope);
  }

  protected override onDestroy(): void {
    socialHubService.getAdaptersExpression().removeChangeListener(bind(this, this.#adaptersChanged));
    ComposerBase.closeAll();
    super.onDestroy();
  }
}

export default SocialHubMainTabBase;
