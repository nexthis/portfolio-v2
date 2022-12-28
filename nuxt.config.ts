// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/tailwind.css"],
  build: {
    transpile: ["gsap"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    locales: [
      { code: "pl", iso: "pl" },
      { code: "en", iso: "es-ES" },
    ],
    defaultLocale: "pl",
    baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
  },

  pwa: {
    manifest: {
      name: "Paweł Romanowski",
      theme_color: "#24262E",
    },
    meta: {
      ogDescription: false,
      ogImage: false,
      ogTitle: false,
      ogSiteName: false,
      mobileApp: false,
      ogType: false,
    },
  },

  sourcemap: {
    client: process.env.NODE_ENV === "development",
    server: process.env.NODE_ENV === "development",
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/prismic",
    "@nuxt/image-edge",
    "@kevinmarrec/nuxt-pwa",
    "nuxt-icon",
  ],
  prismic: {
    endpoint: "https://pawel-romanowski.prismic.io/api/v2",
    clientConfig: { accessToken: process.env.PRISMIC_ACCESS_TOKEN },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
    },
  },

  routeRules: {
    "/": {
      static: true,
      headers: { "cache-control": "public, max-age=31536000" },
    },
    "/portfolio": {
      headers: { "cache-control": "public, max-age=3600" },
    },
    "/portfolio/**": {
      headers: { "cache-control": "public, max-age=3600" },
    },
  },
});
