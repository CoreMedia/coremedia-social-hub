Ext.define("com.coremedia.blueprint.social.beans.MessageImpl", function(MessageImpl) {/*package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.impl.RemoteBeanImpl;
import com.coremedia.ui.data.impl.RemoteServiceMethod;
import com.coremedia.ui.data.impl.RemoteServiceMethodResponse;
import com.coremedia.ui.data.impl.SubBean;

[RestResource(uriTemplate="socialhub/adapter/{adapterId:[^/]+}/message/{id:[^/]+}")]
public class MessageImpl extends RemoteBeanImpl implements Message {

  private var descriptors:Array;*/

  function MessageImpl$(path/*:String*/) {
    this.super$Rfpi(path);
  }/*

  public*/ function getProperties()/*:MessageProperties*/{
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_PROPERTIES);
  }/*

  override protected*/ function isSubObject(value/*:**/, propertyPath/*:**/)/*:Boolean*/ {
    return propertyPath === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_PROPERTIES;
  }/*

  override protected*/ function createSubBean(propertyPathPrefix/*:String*/)/*:SubBean*/ {
    return new com.coremedia.blueprint.social.beans.MessagePropertiesImpl(this, propertyPathPrefix);
  }/*

  public*/ function getMessageId()/*:String*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_ID);
  }/*

  public*/ function getAdapter()/*:SocialHubAdapter*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_ADAPTER);
  }/*

  public*/ function getMessageState()/*:String*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_STATE);
  }/*

  public*/ function getPublicationDate()/*:Date*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_PUBLICATION_DATE);
  }/*

  public*/ function getUrl()/*:String*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_URL);
  }/*

  public*/ function getMessageContainerDescriptors()/*:Array*/ {
    var dscrs/*:Array*/ = this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.MESSAGE_CONTAINER_DESCRIPTORS);
    if(!this.descriptors$Rfpi) {
      this.descriptors$Rfpi = [];
      if(dscrs) {
        for/* each*/(var $1=0;$1</* in*/ dscrs.length;++$1) {var descriptor/*:Object*/ =dscrs[$1];
          var d/*:MessageContainerDescriptor*/ = new com.coremedia.blueprint.social.beans.MessageContainerDescriptor(descriptor);
          this.descriptors$Rfpi.push(d);
        }
      }
    }
    return this.descriptors$Rfpi;
  }/*

  public*/ function deleteFromScheduler(callback/*:Function*/)/*:void*/ {
    var deleteMethod/*:RemoteServiceMethod*/ = new com.coremedia.ui.data.impl.RemoteServiceMethod(this.getUriPath(), "DELETE");
    deleteMethod.request({},
            function (response/*:RemoteServiceMethodResponse*/)/*:void*/ {
              callback.call(null);
            });
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.ui.data.impl.RemoteBeanImpl",
      mixins: ["com.coremedia.blueprint.social.beans.Message"],
      metadata: {"": [
        "RestResource",
        [
          "uriTemplate",
          "socialhub/adapter/{adapterId:[^/]+}/message/{id:[^/]+}"
        ]
      ]},
      descriptors$Rfpi: null,
      constructor: MessageImpl$,
      super$Rfpi: function() {
        com.coremedia.ui.data.impl.RemoteBeanImpl.prototype.constructor.apply(this, arguments);
      },
      getProperties: getProperties,
      isSubObject: isSubObject,
      createSubBean: createSubBean,
      getMessageId: getMessageId,
      getAdapter: getAdapter,
      getMessageState: getMessageState,
      getPublicationDate: getPublicationDate,
      getUrl: getUrl,
      getMessageContainerDescriptors: getMessageContainerDescriptors,
      deleteFromScheduler: deleteFromScheduler,
      requires: [
        "com.coremedia.blueprint.social.beans.Message",
        "com.coremedia.ui.data.impl.RemoteBeanImpl",
        "com.coremedia.ui.data.impl.RemoteServiceMethod"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.MessageContainerDescriptor",
        "com.coremedia.blueprint.social.beans.MessagePropertiesImpl",
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames"
      ]
    };
});
