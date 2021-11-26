/** @type { import('@jangaroo/core').IJangarooConfig } */
module.exports = {
  type: "code",
  extName: "com.coremedia.blueprint__social-hub-studio",
  extNamespace: "com.coremedia.blueprint.social",
  sencha: {
    studioPlugins: [
      {
        mainClass: "com.coremedia.blueprint.social.SocialHubStudioPlugin",
        name: "Social Media Hub",
      },
    ],
  },
  additionalCssNonBundle: [
    "resources/css/social-media-hub.css",
  ],
  command: {
    build: {
      ignoreTypeErrors: true
    },
  },
};
