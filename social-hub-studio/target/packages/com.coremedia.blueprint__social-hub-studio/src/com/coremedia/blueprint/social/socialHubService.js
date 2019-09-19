Ext.define("com.coremedia.blueprint.social.socialHubService", function(socialHubService) {/*package com.coremedia.blueprint.social {

public const socialHubService:ISocialHubService =*/function socialHubService_(){return( new com.coremedia.blueprint.social.SocialHubServiceImpl());}/*;
}

============================================== Jangaroo part ==============================================*/
    return {
      __factory__: socialHubService_,
      requires: ["com.coremedia.blueprint.social.SocialHubServiceImpl"]
    };
});
