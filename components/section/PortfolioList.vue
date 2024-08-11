<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { data } = await useAsyncData(`PortfolioList:${locale.value}`, () => queryContent(locale.value).limit(5).find())

</script>

<template>
  <section class="py-20 2xl:py-40">
    <div class="container px-4 mx-auto">
      <div class="max-w-4xl mx-auto">
        <div class="max-w-xl mb-14 lg:mb-28">
          <span class="text-lg text-primary-400 font-semibold">{{ t('subtitle') }}</span>
          <h2 class="mt-8 text-5xl text-white font-bold font-heading">
            {{ t('title') }}
          </h2>
        </div>
        <div class="flex flex-wrap -m-4">
          <div v-for="(item, index) in data " :key="index" class="w-full p-4" :class="{'lg:w-1/2': index <= 1, 'lg:w-1/3': index > 1}">
            <NuxtLink :href="localePath(`/portfolio/${item.slug}`)">
                <!-- v-view-transition-name="item.slug" -->
                <NuxtImg
                  data-cursor-hover
                  class="w-full h-80 object-cover transition duration-300 ease-in hover:saturate-150 hover:blur-sm"
                  width="1020"
                  height="1080"
                  sizes="100vw sm:100vw md:100vw lg:450px"
                  quality="80"
                  format="webp"
                  prefetch
                  :alt="item.title"
                  :src="item.image"
                />
            </NuxtLink>
          </div>
        </div>
        <div class="mt-20 text-center">
          <NuxtLink class="inline-block py-4 px-12 text-white font-bold bg-primary hover:bg-primary-600 rounded-full" data-cursor-hover :href="localePath('/portfolio')">
            {{ t('showMore') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<i18n lang="json">
  {
    "en": {
      "title": "Over 4 years of experience",
      "subtitle": "My works",
      "showMore": " See all"
    },
    "pl": {
      "title": "Ponad 4 lat doświadczenia",
      "subtitle": "Moje prace",
      "showMore": " Zobacz wszystkie"
    }
  }
  </i18n>
