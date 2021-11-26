import Config from "@jangaroo/runtime/Config";
import { asConfig } from "@jangaroo/runtime";
import SocialHub_properties from "../../SocialHub_properties";
import AddItemButtonBase from "./AddItemButtonBase";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import ContainerSkin from "@coremedia/studio-client.ext.ui-components/skins/ContainerSkin";
import BrowsePlugin from "@coremedia/studio-client.main.editor-components/sdk/components/html5/BrowsePlugin";
import CenterLayout from "@jangaroo/ext-ts/layout/container/Center";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface AddItemButtonConfig extends Config<AddItemButtonBase> {
}


class AddItemButton extends AddItemButtonBase{
  declare Config: AddItemButtonConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.addItemButton";
  static readonly ITEM_ID:string = "addItemButton";
  static readonly BUTTON_ITEM_ID:string = "browserFileIconButton";

  constructor(config:Config<AddItemButton> = null){
    super((()=> ConfigUtils.apply(Config(AddItemButton, {
                            ui:  ContainerSkin.GRID_100.getSkin(),
                            width: 120,
                            height: 90,
                            itemId:  AddItemButton.ITEM_ID,
                            style: "border-width: 3px;border-style: dashed;border-color: #ccc;margin-left: 6px; margin-right: 6px; margin-top: 6px; cursor:pointer;",

  items:[
    Config(IconButton, {
            text:  SocialHub_properties.upload_button_text,
            handler: config.uploadButtonHandler,
            style: "margin-top: -3px;-webkit-text-fill-color: #ccc;",
            itemId:  AddItemButton.BUTTON_ITEM_ID,
            scale: "small",
            iconCls:  CoreIcons_properties.add,
      plugins:[
        Config(BrowsePlugin, { enableFileDrop: true,
                             multiple: true,
                             dropEl: this.el})
      ]
    })
  ],

  layout: Config(CenterLayout)

}),config))());
  }}
export default AddItemButton;
