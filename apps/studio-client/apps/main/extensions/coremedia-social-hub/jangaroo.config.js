const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.blueprint__social-hub-studio",
    namespace: "com.coremedia.blueprint.social",
    css: [
      {
        path: "resources/css/social-media-hub.css",
      },
    ],
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
});
