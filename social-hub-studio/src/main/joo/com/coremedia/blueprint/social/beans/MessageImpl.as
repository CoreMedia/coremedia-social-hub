package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteBeanImpl;
import com.coremedia.ui.data.impl.RemoteServiceMethod;
import com.coremedia.ui.data.impl.RemoteServiceMethodResponse;
import com.coremedia.ui.data.impl.SubBean;

[RestResource(uriTemplate="socialhub/adapter/{adapterId:[^/]+}/message/{id:[^/]+}")]
public class MessageImpl extends RemoteBeanImpl implements Message {

  private var descriptors:Array;

  function MessageImpl(path:String) {
    super(path);
  }

  public function getProperties():MessageProperties{
    return get(SocialHubPropertyNames.MESSAGE_PROPERTIES);
  }

  override protected function isSubObject(value:*, propertyPath:*):Boolean {
    return propertyPath === SocialHubPropertyNames.MESSAGE_PROPERTIES;
  }

  override protected function createSubBean(propertyPathPrefix:String):SubBean {
    return new MessagePropertiesImpl(this, propertyPathPrefix);
  }

  public function getMessageId():String {
    return get(SocialHubPropertyNames.MESSAGE_ID);
  }

  public function getAdapter():SocialHubAdapter {
    return get(SocialHubPropertyNames.MESSAGE_ADAPTER);
  }

  public function getMessageState():String {
    return get(SocialHubPropertyNames.MESSAGE_STATE);
  }

  public function getPublicationDate():Date {
    return get(SocialHubPropertyNames.MESSAGE_PUBLICATION_DATE);
  }

  public function getUrl():String {
    return get(SocialHubPropertyNames.MESSAGE_URL);
  }

  public function getMessageContainerDescriptors():Array {
    var dscrs:Array = get(SocialHubPropertyNames.MESSAGE_CONTAINER_DESCRIPTORS);
    if(!descriptors) {
      descriptors = [];
      if(dscrs) {
        for each(var descriptor:Object in dscrs) {
          var d:MessageContainerDescriptor = new MessageContainerDescriptor(descriptor);
          this.descriptors.push(d);
        }
      }
    }
    return descriptors;
  }

  public function deleteMessage(callback:Function):void {
    var deleteMethod:RemoteServiceMethod = new RemoteServiceMethod(getUriPath(), "DELETE");
    deleteMethod.request({},
            function (response:RemoteServiceMethodResponse):void {
              callback.call(null);
            });
  }
}
}
