// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    '@nuxtjs/eslint-module',
    '@nuxt/content',
    'nuxt-gtag'
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

  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'pl'
  },

  gtag: {
    id: 'G-9JQJ9MJ0V9'
  },

  nitro: {
    prerender: {
      ignore: ['/200', '/404']
    },
    static: true
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
      navigateFallback: null,
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp}']
    },
    devOptions: {
      enabled: false
    }
  }
})
