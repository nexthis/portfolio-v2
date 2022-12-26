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
    locales: ["pl", "en"],
    defaultLocale: "pl",
  },

  sourcemap: {
    client: true,
    server: true,
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/prismic",
    "@nuxt/image-edge",
    "@kevinmarrec/nuxt-pwa",
  ],
  prismic: {
    endpoint: "https://pawel-romanowski.prismic.io/api/v2",
    clientConfig: { accessToken: process.env.PRISMIC_ACCESS_TOKEN },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.baseUrl ?? "http://localhost:3000",
    },
  },
});
