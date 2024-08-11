// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: [
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@vite-pwa/nuxt',
    'nuxt-schema-org',
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/content',
    'nuxt-gtag',
    'vue-view-transitions/nuxt'
  ],

  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: 'default',
      mode: 'out-in' // default
    },
    layoutTransition: {
      name: 'default',
      mode: 'out-in' // default
    }
  },

  tailwindcss: {
    cssPath: '~/assets/styles/index.scss'
  },

  runtimeConfig: {
    public: {
      SITE_URL: import.meta.env.WEB_URL ?? 'http://localhost:3000/'
    }
  },

  image: {
    format: ['webp']
  },

  site: {
    url: import.meta.env.WEB_URL ?? 'http://localhost:3000/'
  },

  eslint: {
    config: {
      stylistic: true // <---
    }
  },
  
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'pl'
  },

  gtag: {
    id: 'G-9JQJ9MJ0V9'
  },

  nitro: {
    // prerender: {
    //   ignore: ['/200', '/404']
    // },
    static: process.env.NODE_ENV !== 'development', //wait for https://github.com/nuxt/image/issues/1397
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Paweł Romanowski',
      short_name: 'PR',
      description: 'Twórz wspaniałe strony internetowe!',
      start_url: './',
      scope: '.',
      display: 'standalone',
      theme_color: '#00da89',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      // navigateFallback: null,
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp}']
    },
    devOptions: {
      enabled: false
    }
  },

  experimental: {
      viewTransition: true
  }
})
