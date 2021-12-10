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
  appManifests: {
    en: {
      categories: [
        "Social Media Hub",
      ],
      cmServiceShortcuts: [
        {
          cmKey: "cmSocialHub",
          cmCategory: "Social Media Hub",
          name: "Social Media Hub",
          url: "",
          icons: [
            {
              src: "packages/com.coremedia.blueprint__social-hub-studio/appIcons/social-hub_24.svg",
              sizes: "24x24",
              type: "image/svg",
            },
          ],
          cmService: {
            name: "launchSubAppService",
            method: "launchSubApp",
          },
        },
      ],
    },
  },
  additionalCssNonBundle: [
    "resources/css/social-media-hub.css",
  ],
};
