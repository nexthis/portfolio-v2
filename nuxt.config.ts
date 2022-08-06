import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ['~/assets/tailwind.css'],
    build: {
        postcss: {
            postcssOptions: require('./postcss.config.js'),
        },
        transpile: ['gsap']
    },
    modules: ['@intlify/nuxt3', '@nuxtjs/prismic', '@nuxt/image-edge',],
    prismic: { endpoint: 'https://pawel-romanowski.prismic.io/api/v2', clientConfig: {accessToken: process.env.PRISMIC_ACCESS_TOKEN} },
    intlify: {
        vueI18n: {
            locale: 'pl',
            fallbackLocale: 'pl',

        },
    },
    vite: {
        plugins: [svgLoader()]
    },
    image: {
        dir: 'assets/images'
    },
    runtimeConfig: {
        public:{
            baseUrl: process.env.baseUrl ?? 'http://localhost:3000'
        }
    },

})
