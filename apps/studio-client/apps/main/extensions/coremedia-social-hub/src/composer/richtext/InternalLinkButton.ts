import Config from "@jangaroo/runtime/Config";
import { bind } from "@jangaroo/runtime";
import InternalLinkButtonBase from "./InternalLinkButtonBase";
import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CKEditor_properties from "@coremedia/studio-client.main.ckeditor4-components/CKEditor_properties";

interface InternalLinkButtonConfig extends Config<InternalLinkButtonBase>, Partial<Pick<InternalLinkButton,
  "bindTo" |
  "forceReadOnlyValueExpression"
>> {
}



    class InternalLinkButton extends InternalLinkButtonBase{
  declare Config: InternalLinkButtonConfig;

  static override readonly xtype:string = "com.coremedia.blueprint.social.composer.richtext.internalLinkButton";

  constructor(config:Config<InternalLinkButton> = null){
    super((()=> ConfigUtils.apply(Config(InternalLinkButton, {
        iconCls:  CKEditor_properties.cminternallink_iconCls,
        text:  CKEditor_properties.cminternallink_text,
        tooltip: CKEditor_properties.cminternallink_tooltip,
        enableToggle: true,
        toggleHandler: bind(this,this.onToggle)

}),config))());
  }

    /**
     * An optional ValueExpression which makes the component read-only if it is evaluated to true.
     */
  forceReadOnlyValueExpression:ValueExpression = null;}
export default InternalLinkButton;
