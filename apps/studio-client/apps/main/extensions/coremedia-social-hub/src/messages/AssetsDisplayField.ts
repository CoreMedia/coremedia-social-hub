import Config from "@jangaroo/runtime/Config";
import { asConfig } from "@jangaroo/runtime";
import CustomStyles from "../CustomStyles";
import AssetsDisplayFieldBase from "./AssetsDisplayFieldBase";
import ContentLocalizationUtil from "@coremedia/studio-client.cap-base-models/content/ContentLocalizationUtil";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import MemoryLinkListWrapper from "@coremedia/studio-client.content-link-list-models/MemoryLinkListWrapper";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import ImageLinkListRenderer from "@coremedia/studio-client.ext.content-link-list-components/util/ImageLinkListRenderer";
import SpacingBEMEntities from "@coremedia/studio-client.ext.ui-components/bem/SpacingBEMEntities";
import BindVisibilityPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindVisibilityPlugin";
import VerticalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/VerticalSpacingPlugin";
import DataField from "@coremedia/studio-client.ext.ui-components/store/DataField";
import LinkListGridPanel from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/LinkListGridPanel";
import DisplayField from "@jangaroo/ext-ts/form/field/Display";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface AssetsDisplayFieldConfig extends Config<AssetsDisplayFieldBase> {
}


class AssetsDisplayField extends AssetsDisplayFieldBase{
  declare Config: AssetsDisplayFieldConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.message.field.assetlist";
  static readonly MEDIA_CONTAINER_ITEM_ID:string = "postMediaContainer";

  constructor(config:Config<AssetsDisplayField> = null){
    super((()=> ConfigUtils.apply(Config(AssetsDisplayField, {
                              style: CustomStyles.MESSAGE_DISPLAY_FIELD,

  items:[
    Config(DisplayField, {
            value: this.localizeFieldName(config.messageContainerDescriptor.getPropertyName()),
            style: CustomStyles.READONLY_TITLE, ui: ConfigUtils.asString( null),
      plugins:[
        Config(BindVisibilityPlugin, {
                bindTo: ValueExpressionFactory.createFromValue(config.messageContainerDescriptor.showLabel())})
      ]
    }),
    Config(LinkListGridPanel, { itemId: "assetLinkList",
                              enableColumnMove: false,
                              showThumbnails: true,
                              selectedValuesExpression: ValueExpressionFactory.createFromValue([]),
                              hideDropArea: true,
                              readOnlyValueExpression: ValueExpressionFactory.createFromValue(true),
      fields:[
        Config(DataField, { name: "thumbnailImage",
                      mapping:"",
                      convert: ImageLinkListRenderer.convertThumbnail}),
        Config(DataField, { name: "type",
                      mapping: "type.name",
                      convert: ContentLocalizationUtil.localizeDocumentTypeName}),
        Config(DataField, { name: "typeCls",
                      mapping: "type",
                      ifUnreadable: CoreIcons_properties.no_rights,
                      convert: ContentLocalizationUtil.getIconStyleClassForContentType}),
        Config(DataField, { name: "name",
                      ifUnreadable: ContentLocalizationUtil.formatNotReadableName,
                      sortType: (s:string):string => s.toLowerCase()}),
        Config(DataField, { name: "editor",
                      mapping: "editor.name"})
      ],
      linkListWrapper: new MemoryLinkListWrapper({ linksVE: config.bindTo
      })
    })
  ],
  ...ConfigUtils.append({plugins: [
    Config(BindVisibilityPlugin, { transformer: (media:Array<any>):boolean =>  media.length > 0,
                             bindTo: config.bindTo}),
    Config(VerticalSpacingPlugin, { modifier: SpacingBEMEntities.VERTICAL_SPACING_MODIFIER_25})
  ]}),
  layout: Config(VBoxLayout, { align: "stretch"
  })

}),config))());
  }}
export default AssetsDisplayField;
