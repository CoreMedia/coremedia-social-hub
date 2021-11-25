import Config from "@jangaroo/runtime/Config";
import { asConfig, bind } from "@jangaroo/runtime";
import SocialHub_properties from "../SocialHub_properties";
import MessageLinkListBase from "./MessageLinkListBase";
import OpenInTabAction from "@coremedia/studio-client.ext.form-services-toolkit/actions/OpenInTabAction";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import ContextMenuPlugin from "@coremedia/studio-client.ext.ui-components/plugins/ContextMenuPlugin";
import ToolbarSkin from "@coremedia/studio-client.ext.ui-components/skins/ToolbarSkin";
import Actions_properties from "@coremedia/studio-client.main.editor-components/sdk/actions/Actions_properties";
import LinkListCopyAction from "@coremedia/studio-client.main.editor-components/sdk/actions/LinkListCopyAction";
import LinkListPasteAction from "@coremedia/studio-client.main.editor-components/sdk/actions/LinkListPasteAction";
import PropertyFieldContextMenu from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/PropertyFieldContextMenu";
import ActionRef from "@jangaroo/ext-ts/ActionRef";
import Separator from "@jangaroo/ext-ts/toolbar/Separator";
import Toolbar from "@jangaroo/ext-ts/toolbar/Toolbar";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
interface MessageLinkListConfig extends Config<MessageLinkListBase> {
}


class MessageLinkList extends MessageLinkListBase{
  declare Config: MessageLinkListConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.messageLinkList";

  constructor(config:Config<MessageLinkList> = null){
    super((()=> ConfigUtils.apply(Config(MessageLinkList, {
                           dropAreaHandler: bind(this,this.openCollectionView),
                           selectedValuesExpression: this.getSelectedVE(),
                           replaceOnDrop: true,
                           linkListWrapper: this.getLinkListWrapper(config),

  ...ConfigUtils.append({plugins: [
    Config(ContextMenuPlugin, {
      contextMenu: Config(PropertyFieldContextMenu, { selectedItemsVE: this.getSelectedVE()
      })
    })
  ]}),
  tbar: Config(Toolbar, { ui: ConfigUtils.asString( ToolbarSkin.FIELD),
      items:[
        Config(IconButton, { itemId: "clearParentList",
                       handler: bind(this,this.clearList),
                       disabled: true,
                       iconCls:  Actions_properties.Action_deleteSelectedLinks_icon,
                       text:  SocialHub_properties.delete_link_btn_tooltip_text,
                       tooltip: SocialHub_properties.delete_link_btn_tooltip_text}),
        Config(IconButton, { itemId: "editTarget",
          baseAction: new OpenInTabAction({ contentValueExpression: this.getListExpression(config.valueExpression)
          })
        }),
        Config(Separator),
        Config(IconButton, { itemId: "copy",
          baseAction: Config(ActionRef, { actionId:  LinkListCopyAction.ACTION_ID
          })
        }),
        Config(IconButton, { itemId: "paste",
          baseAction: Config(ActionRef, { actionId:  LinkListPasteAction.ACTION_ID
          })
        })
      ]
  })
}),config))());
  }}
export default MessageLinkList;
