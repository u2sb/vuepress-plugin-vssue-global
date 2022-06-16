const { resolve } = require("path");

module.exports = ({
  platform = "github",
  container = "main",
  title = "「Comment」<%- frontmatter.title %>",
  ...options
}) => {
  const platformAPI = {
    github: "@vssue/api-github-v3",
    "github-v4": "@vssue/api-github-v4",
    gitlab: "@vssue/api-gitlab-v4",
    bitbucket: "@vssue/api-bitbucket-v2",
    gitee: "@vssue/api-gitee-v5",
  };

  const apiPkg = platformAPI[platform];

  if (!apiPkg) {
    throw new Error(
      `[@u2sb/vuepress-plugin-vssue] Platform '${platform}' is not supported. Available platforms: ${Object.keys(
        platformAPI
      ).join(", ")}.`
    );
  }

  try {
    require.resolve(apiPkg);
  } catch (e) {
    throw new Error(
      `[@u2sb/vuepress-plugin-vssue] ${apiPkg} is not installed. Run 'npm install ${apiPkg}' or 'yarn add ${apiPkg}' to install it.`
    );
  }

  return {
    enhanceAppFiles: resolve(__dirname, "enhanceApp.js"),
    globalUIComponents: ["Vssue"],

    define: {
      CONTAINER: container,
      TITLE: title,
      VSSUE_OPTIONS: options,
    },

    alias: {
      "@vssue/api$": require.resolve(apiPkg),
    },
  };
};
