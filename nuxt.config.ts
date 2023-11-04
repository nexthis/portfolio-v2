// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxt/image', '@nuxtjs/google-fonts', '@vite-pwa/nuxt', 'nuxt-schema-org', 'nuxt-icon', '@nuxtjs/tailwindcss', 'nuxt-simple-sitemap', '@nuxtjs/i18n', '@nuxtjs/eslint-module'],

  devtools: { enabled: true },

  app: {
    head: {
      bodyAttrs: {
        class: 'bg-black'
      }
    }
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

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Admax App',
      short_name: 'Admax',
      description: 'Twórz wspaniałe strony internetowe',
      start_url: '/',
      display: 'standalone',
      theme_color: '#316CE8',
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
