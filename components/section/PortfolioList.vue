<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const { data } = await useAsyncData('PortfolioList', () => queryContent(locale.value).limit(5).find())

</script>

<template>
  <section class="py-20 2xl:py-40">
    <div class="container px-4 mx-auto">
      <div class="max-w-4xl mx-auto">
        <div class="max-w-xl mb-14 lg:mb-28">
          <span class="text-lg text-primary-400 font-semibold">Moje prace</span>
          <h2 class="mt-8 text-5xl text-white font-bold font-heading">
            Ponad 4 lat doświadczenia
          </h2>
        </div>
        <div class="flex flex-wrap -m-4">
          <div v-for="(item, index) in data " :key="index" class="w-full p-4" :class="{'lg:w-1/2': index <= 1, 'lg:w-1/3': index > 1}">
            <NuxtLink :href="localePath(`/portfolio/${item.slug}`)">
              <NuxtImg class="w-full h-80 object-cover" width="450" format="webp" :alt="item.title" :src="item.image" />
            </NuxtLink>
          </div>
        </div>
        <div class="mt-20 text-center">
          <NuxtLink class="inline-block py-4 px-12 text-white font-bold bg-primary hover:bg-primary-600 rounded-full" href="/test">
            Zobacz wszystkie
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
