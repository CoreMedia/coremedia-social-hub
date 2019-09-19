package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.SubBean;

public class MessagePropertiesImpl extends com.coremedia.ui.data.impl.SubBean implements com.coremedia.blueprint.social.beans.MessageProperties {
  public function MessagePropertiesImpl(parent:com.coremedia.blueprint.social.beans.MessageImpl, basePath:String) {
    super(null, null);
  }

  public native function getMessage():com.coremedia.blueprint.social.beans.Message;
}
}