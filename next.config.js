const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
module.exports = withPlugins([
  withSvgr,
  {
    i18n: {
      locales: ['en', 'pl'],
      defaultLocale: 'pl'
    },
    reactStrictMode: true,
    // images: {
    //   deviceSizes: [640, 768, 828, 1280, 1536],
    // },
  }
])
