<script setup lang="ts">

const { t, tm, rt } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()
</script>

<template>
  <section class="pb-20 2xl:pb-40 overflow-hidden">
    <div class="container px-4 mx-auto">
      <div class="max-w-2xl mx-auto text-center">
        <span class="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br magic-text">{{ t('subtitle') }}</span>
        <h2 class="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
          {{ t('title') }}
        </h2>
        <p class="max-w-xl mx-auto mb-14 text-xl text-gray-200">
          {{ t('quote') }}
        </p>
        <div class="inline-flex pt-14 mb-14 items-center border-t w-64 border-gray-500" />
        <div class="max-w-xl mx-auto">
          <p v-for="(item, index) in tm('description')" :key="index" class="mb-6 text-justify text-xl text-gray-200">
            {{ rt(item) }}
          </p>
          <div class="mt-20 text-center">
            <NuxtLink class="inline-block py-4 px-12 text-white font-bold bg-primary hover:bg-primary-600 rounded-full" :href="localePath('/contact')">
              {{ t('contact') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<i18n lang="json">
  {
    "en": {
      "title": "Let's start working together!",
      "subtitle": "Let's get to know each other better!",
      "quote": "If you are looking for a specialist to create a modern website, then you must see my portfolio!",
      "description": [
        "I am a programmer with 4 years of experience in creating web and desktop applications.",
        "I specialize in technologies such as Vue.js, TypeScrip, Node Js, Directus, Laravel",
        "I had the opportunity to create and collaborate with many companies and institutions, which gave me the opportunity to work on both public and internal projects.",
        "My second passion, besides programming, is psychology, which helps me to better communicate with my clients and colleagues."
      ],
      "contact": "Contact"
    },
    "pl": {
      "title": "Zacznimy wspułprace!",
      "subtitle": "Poznajmy się jeszcze lepiej!",
      "quote": "Jeśli szukasz specjalisty do stworzenia nowoczesnej strony internetowej, to koniecznie musisz zobaczyć moje portfolio!",
      "description": [
        "Jestem programista z 4-letnim doświadczeniem w tworzeniu aplikacji webowych i desktopowych.",
        "Specjalizuję się w technologiach takich jak Vue.js, TypeScrip, Node Js, Directus, Laravel",
        "Miałem okazję tworzyć i współpracować z wieloma firmami i instytucjami, co dało mi możliwość pracy zarówno w różnych projektach publicznych, jak i wewnętrznych.",
        "Moją drugą pasją, obok programowania, jest psychologia, która pomaga mi lepiej komunikować się z moimi klientami i współpracownikami."
      ],
      "contact": "Kontakt"
    }
  }
  </i18n>
