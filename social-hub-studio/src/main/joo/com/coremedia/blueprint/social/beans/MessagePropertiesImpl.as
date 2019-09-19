package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.SubBean;

public class MessagePropertiesImpl extends SubBean implements MessageProperties {

  public function MessagePropertiesImpl(parent:MessageImpl, basePath:String) {
    super(parent, basePath);
  }

  public function getMessage():Message {
    return getParentBean() as Message;
  }
}
}
