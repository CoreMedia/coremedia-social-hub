Ext.define("com.coremedia.blueprint.social.beans.ComposerModelImpl", function(ComposerModelImpl) {/*package com.coremedia.blueprint.social.beans {
import com.coremedia.ui.data.beanFactory;
import com.coremedia.ui.data.impl.BeanFactoryImpl;
import com.coremedia.ui.data.impl.RemoteBeanImpl;
import com.coremedia.ui.data.impl.RemoteServiceMethod;
import com.coremedia.ui.data.impl.RemoteServiceMethodResponse;
import com.coremedia.ui.data.impl.SubBean;

import ext.JSON;

[RestResource(uriTemplate="socialhub/composermodel/{id:[^/]+}/{adapterId:[^/]+}")]
public class ComposerModelImpl extends RemoteBeanImpl implements ComposerModel {*/

  function ComposerModelImpl$(path/*:String*/) {
    this.super$gEeE(path);
  }/*

  override public*/ function get(property/*:**/)/*:**/ {
    if(property === "type") {
      return com.coremedia.ui.data.beanFactory.createLocalBean({'name': 'ComposerModel'});
    }
    return com.coremedia.ui.data.impl.RemoteBeanImpl.prototype.get.call(this,property);
  }/*

  override protected*/ function isSubObject(value/*:**/, propertyPath/*:**/)/*:Boolean*/ {
    return propertyPath === com.coremedia.blueprint.social.beans.SocialHubPropertyNames.COMPOSER_PROPERTIES;
  }/*

  override protected*/ function createSubBean(propertyPathPrefix/*:String*/)/*:SubBean*/ {
    return new com.coremedia.blueprint.social.beans.ComposerModelPropertiesImpl(this, propertyPathPrefix);
  }/*

  public*/ function getProperties()/*:ComposerModelProperties*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.COMPOSER_PROPERTIES);
  }/*

  public*/ function getAttachments()/*:Array*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.COMPOSER_ATTACHMENTS);
  }/*

  public*/ function getAdapterType()/*:String*/ {
    return this.get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.COMPOSER_ADAPTER_TYPE);
  }/*

  public*/ function getPublicationDate()/*:Date*/ {
    return this.getProperties().get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.COMPOSER_PUBLICATION_DATE);
  }/*

  public*/ function getMessageText()/*:String*/ {
    if (this.getProperties() === undefined) {
      return undefined;
    }
    return this.getProperties().get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.COMPOSER_MESSAGE_TEXT);
  }/*

  public*/ function getTitle()/*:String*/ {
    if (this.getProperties() === undefined) {
      return undefined;
    }
    return this.getProperties().get(com.coremedia.blueprint.social.beans.SocialHubPropertyNames.COMPOSER_MESSAGE_TITLE);
  }/*

  public*/ function send(callback/*:Function = undefined*/)/*:void*/ {
    var method/*:RemoteServiceMethod*/ = new com.coremedia.ui.data.impl.RemoteServiceMethod(this.getUriPath(), 'POST');
    method.request({},
            function (response/*:RemoteServiceMethodResponse*/)/*:void*/ {
              if(callback) {
                callback(null);
              }
            },
            function (response/*:RemoteServiceMethodResponse*/)/*:void*/ {
              if(callback) {
                callback(response.getError());
              }
            }
    );
  }/*

  public*/ function reset(callback/*:Function = undefined*/)/*:void*/ {
    var method/*:RemoteServiceMethod*/ = new com.coremedia.ui.data.impl.RemoteServiceMethod(this.getUriPath(), 'DELETE');
    method.request({},
            function (response/*:RemoteServiceMethodResponse*/)/*:void*/ {
              var result/*:Boolean*/ = response.response.responseText;
              if(callback) {
                callback(result);
              }

            },
            function (response/*:RemoteServiceMethodResponse*/)/*:void*/ {
              if(callback) {
                callback(response.getError());
              }
            }
    );
  }/*
}
}

============================================== Jangaroo part ==============================================*/
    return {
      extend: "com.coremedia.ui.data.impl.RemoteBeanImpl",
      mixins: ["com.coremedia.blueprint.social.beans.ComposerModel"],
      metadata: {"": [
        "RestResource",
        [
          "uriTemplate",
          "socialhub/composermodel/{id:[^/]+}/{adapterId:[^/]+}"
        ]
      ]},
      constructor: ComposerModelImpl$,
      super$gEeE: function() {
        com.coremedia.ui.data.impl.RemoteBeanImpl.prototype.constructor.apply(this, arguments);
      },
      get: get,
      isSubObject: isSubObject,
      createSubBean: createSubBean,
      getProperties: getProperties,
      getAttachments: getAttachments,
      getAdapterType: getAdapterType,
      getPublicationDate: getPublicationDate,
      getMessageText: getMessageText,
      getTitle: getTitle,
      send: send,
      reset: reset,
      requires: [
        "com.coremedia.blueprint.social.beans.ComposerModel",
        "com.coremedia.ui.data.beanFactory",
        "com.coremedia.ui.data.impl.RemoteBeanImpl",
        "com.coremedia.ui.data.impl.RemoteServiceMethod"
      ],
      uses: [
        "com.coremedia.blueprint.social.beans.ComposerModelPropertiesImpl",
        "com.coremedia.blueprint.social.beans.SocialHubPropertyNames"
      ]
    };
});
