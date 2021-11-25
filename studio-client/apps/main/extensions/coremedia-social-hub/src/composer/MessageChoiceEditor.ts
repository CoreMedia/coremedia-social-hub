import Config from "@jangaroo/runtime/Config";
import MessageChoiceEditorBase from "./MessageChoiceEditorBase";
import LocalComboBox from "@coremedia/studio-client.ext.ui-components/components/LocalComboBox";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
interface MessageChoiceEditorConfig extends Config<MessageChoiceEditorBase> {
}


class MessageChoiceEditor extends MessageChoiceEditorBase{
  declare Config: MessageChoiceEditorConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.studio.config.editor.choice";

  constructor(config:Config<MessageChoiceEditor> = null){
    super( ConfigUtils.apply(Config(MessageChoiceEditor, {

  items:[
    Config(LocalComboBox, { editable: false,
                      fieldLabel:  config.property.getDisplayName(),
                      emptyText:  config.property.getEmptyText(),
                      labelAlign: "top",
                      itemId:  config.property.getName(),
                      labelSeparator:"",
                      encodeItems: true,
                      store: MessageChoiceEditorBase.getStore(config.property),
      plugins:[
        Config(BindPropertyPlugin, { bidirectional: true, bindTo: config.bindTo})
      ]
    })
  ],
  layout: Config(VBoxLayout, { align: "stretch"
  })
}),config));
  }}
export default MessageChoiceEditor;
