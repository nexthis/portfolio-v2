<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { data } = await useAsyncData('all', () => queryContent(locale.value).find())

</script>

<template>
  <section class="py-20 2xl:py-40">
    <div class="container px-4 mx-auto">
      <div class="max-w-4xl mx-auto">
        <h1 class="mt-8 text-5xl magic-text font-bold font-heading">
          Portfolio
        </h1>

        <TransitionGroup>
          <div v-for="(item, index) in data" :key="index" :class="{'lg:flex-row-reverse': index % 2 }" class="flex flex-wrap lg:flex-nowrap justify-between items-center mt-20">
            <NuxtLink class="contents" :href="localePath(`/portfolio/${item.slug}`)">
              <NuxtImg
                width="450"
                height="450"
                format="webp"
                :alt="item.title"
                :src="item.image"
              />
            </NuxtLink>
            <div :class="{'lg:pr-16': index % 2, 'lg:pl-16': !(index % 2) }" class="w-100">
              {{ item.description }}
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>
