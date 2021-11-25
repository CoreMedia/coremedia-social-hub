import Config from "@jangaroo/runtime/Config";
import { asConfig, bind } from "@jangaroo/runtime";
import SocialHub_properties from "../../SocialHub_properties";
import InternalLinkDialogBase from "./InternalLinkDialogBase";
import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import CKEditor_properties from "@coremedia/studio-client.ext.ui-components/ckeditor/CKEditor_properties";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import HorizontalSpacingPlugin from "@coremedia/studio-client.ext.ui-components/plugins/HorizontalSpacingPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import PanelSkin from "@coremedia/studio-client.ext.ui-components/skins/PanelSkin";
import WindowSkin from "@coremedia/studio-client.ext.ui-components/skins/WindowSkin";
import Editor_properties from "@coremedia/studio-client.main.editor-components/Editor_properties";
import SingleLinkField from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/SingleLinkField";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import FieldContainer from "@jangaroo/ext-ts/form/FieldContainer";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface InternalLinkDialogConfig extends Config<InternalLinkDialogBase> {
}



    class InternalLinkDialog extends InternalLinkDialogBase{
  declare Config: InternalLinkDialogConfig;

  constructor(config:Config<InternalLinkDialog> = null){
    super((()=> ConfigUtils.apply(Config(InternalLinkDialog, {
                              title: SocialHub_properties.internal_link_dialog_title,
                              width: 400,
                              closable: false,
                              header: false,
                              resizable: false,
                              constrainHeader: true,
                              ui:  WindowSkin.GRID_200_LIGHT.getSkin(),

  items:[
    Config(FieldContainer, {
            labelAlign: "top",
            labelSeparator:"",
            fieldLabel:  SocialHub_properties.internal_link_dialog_drop_area_label,
      items:[
        Config(SingleLinkField, { itemId: "linkField",
                                flex: 1,
                                ui:  PanelSkin.FRAME.getSkin(),
                                linkContentType: "CMLinkable",
                                valueExpression: this.getContentExpression()
        }),
        Config(IconButton, { itemId: "removeLinkItemButton",
                       handler: bind(this,this.unlink),
                       text:  CKEditor_properties.unlink_text,
                       iconCls:  CoreIcons_properties.remove,
          plugins:[
            Config(BindPropertyPlugin, { componentProperty: "disabled",
                                   transformer: bind(this,this.enabledTransformer),
                                   bindTo: this.getContentExpression()
            })
          ]
        })
      ],
      plugins:[
        Config(HorizontalSpacingPlugin)
      ],
      layout: Config(HBoxLayout, { align: "stretch"
      })
    }),
    Config(Container, {
      items:[
        Config(Button, { itemId: "internalLinkSubmitButton",
                ui:  ButtonSkin.INLINE.getSkin(),
                scale: "small",
                text:  CKEditor_properties.internalLinkMenuSubmitBtn,
                handler: ():void => this.close()})
      ],
      layout: Config(HBoxLayout, { align: "stretch", pack: "end"
      })
    })
  ],
  layout: Config(VBoxLayout, { align: "stretch"
  })
}),config))());
  }}
export default InternalLinkDialog;
