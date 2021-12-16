import SpacingBEMEntities from "@coremedia/studio-client.ext.ui-components/bem/SpacingBEMEntities";
import CustomizableDatePicker from "@coremedia/studio-client.ext.ui-components/components/CustomizableDatePicker";
import HorizontalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/HorizontalSpacingPlugin";
import Container from "@jangaroo/ext-ts/container/Container";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import SchedulerContainerBase from "./SchedulerContainerBase";

interface SchedulerContainerConfig extends Config<SchedulerContainerBase> {
}

class SchedulerContainer extends SchedulerContainerBase {
  declare Config: SchedulerContainerConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.social.studio.config.schedulerContainer";

  constructor(config: Config<SchedulerContainer> = null) {
    super((()=> ConfigUtils.apply(Config(SchedulerContainer, {

      items: [
        Config(Container, {
          items: [
            Config(CustomizableDatePicker, {
              showToday: false,
              scrollOnTopBar: true,
              flex: 1,
              modifiersForDate: bind(this, this.calculateModifiersForDate),
              selectedDateVE: this.getSelectedDateVE(),
            }),
            Config(CustomizableDatePicker, {
              showToday: false,
              scrollOnTopBar: true,
              flex: 1,
              modifiersForDate: bind(this, this.calculateModifiersForDate),
              selectedDateVE: this.getSelectedDateVE(),
            }),
          ],
          plugins: [
            Config(HorizontalSpacingPlugin, { modifier: SpacingBEMEntities.HORIZONTAL_SPACING_MODIFIER_200 }),
          ],
          layout: Config(HBoxLayout, { align: "stretch" }),
        }),
      ],
      layout: Config(VBoxLayout, { align: "stretch" }),

    }), config))());
  }
}

export default SchedulerContainer;
