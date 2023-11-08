<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
</script>

<template>
  <footer
    class="flex flex-col items-center text-center bg-black"
  >
    <div class="container pt-9">
      <div class="mb-9 flex gap-4 justify-center">
        <NuxtLink data-cursor-hover :href="localePath('/')">
          {{ t('home') }}
        </NuxtLink>
        <NuxtLink data-cursor-hover :href="localePath('/contact')">
          {{ t('contact') }}
        </NuxtLink>
        <NuxtLink data-cursor-hover :href="localePath('/portfolio')">
          {{ t('portfolio') }}
        </NuxtLink>
        <NuxtLink data-cursor-hover :href="switchLocalePath( locale === 'en' ? 'pl' : 'en')">
          {{ t('locale') }}
        </NuxtLink>
      </div>
    </div>

    <!--Copyright section-->
    <div
      class="w-full p-4 text-center bg-black text-neutral-200"
    >
      © 2021 -  {{ new Date().getFullYear() }} Paweł Romanowski. All Rights Reserved.
    </div>
  </footer>
</template>

<i18n lang="json">
  {
    "en": {
      "home": "Home",
      "contact": "Contact",
      "portfolio": "Portfolio",
      "locale": "Polski"
    },
    "pl": {
      "home": "Strona główna",
      "contact": "Kontakt",
      "portfolio": "Portfolio",
      "locale": "English"
    }
  }
  </i18n>
