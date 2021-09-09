const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
const withPWA = require("next-pwa");
const runtimeCaching = require('next-pwa/cache')
module.exports = withPlugins([
    withSvgr,
    withPWA,
    {
        i18n: {
            locales: ['en', 'pl'],
            defaultLocale: 'pl'
        },
        pwa: {
            dest: 'public',
            runtimeCaching,
        },
        reactStrictMode: true,
        images: {
            domains: ['images.prismic.io'],
        },


        async headers() {
            return [
                {
                    source: '/portfolio',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=3600, must-revalidate',
                        },
                    ],
                },
            ]
        },
    }
])
