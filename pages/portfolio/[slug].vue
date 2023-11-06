<script setup lang="ts">
const { locale, t } = useI18n()
const route = useRoute()
const slug = route.params.slug as string

const rtf = new Intl.DateTimeFormat(locale.value, {
  dateStyle: 'long',
  timeStyle: undefined
})

const { data } = await useAsyncData(slug, () => queryContent(locale.value).where({ slug: { $eq: slug } }).findOne())

const time = computed(() => rtf.format(new Date(data.value?.datePublished)))

useSeoGenerator({
  title: data.value?.title,
  description: data.value?.description,
  image: {
    src: data.value?.image
  },
  schemaOrg: [
    defineArticle({
    // name and description can usually be inferred
      '@type': 'BlogPosting',
      headline: data.value?.title,
      image: data.value?.image,
      datePublished: data.value?.datePublished,
      dateModified: data.value?.dateModified,
      author: [
        {
          name: 'Paweł Romanowski'
        }
      ]
    }),
    defineWebPage({
      '@type': 'CollectionPage'
    })
  ]
})
</script>

<template>
  <div class="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased">
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article class="mx-auto w-full max-w-2xl">
        <header class="mb-4 lg:mb-6 not-format">
          <NuxtImg
            v-if="data"
            :src="data.image"
            width="700"
            height="700"
            format="webp"
            quality="80"
          />
          Utworzono: <span class="text-primary">{{ time }}</span>
        </header>

        <ContentRendererMarkdown v-if="data" class="content" :value="data" />

        <div class="mt-20 text-center">
          <NuxtLink v-if="data" class="inline-block py-4 px-12 text-white font-bold bg-primary hover:bg-primary-600 rounded-full" :href="data.url" target="_blank">
            {{ t('show') }}
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content{
  :deep(h1) {
    font-weight: 800;
    margin-bottom: 1rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    line-height: 1.25;
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / 1);
    color: rgb(255 255 255 / var(--tw-text-opacity));

    @media (min-width: 1024px)
    {
        font-size: 2.25rem;
        line-height: 2.5rem;
        margin-bottom: 1.5rem;
    }
  }
  :deep(p){
    font-size: 1rem;
    line-height: 1.7142857;
    @apply text-background-200;

    @media (min-width: 640px)
    {
      font-size: 1rem;
      line-height: 1.75;
    }

    @media (min-width: 1024px){
      font-size: 1.125rem;
      line-height: 1.7777778;
    }
  }
}
</style>

<i18n lang="json">
  {
    "en": {
      "show": "Show"
    },
    "pl": {
      "show": "Zobacz"
    }
  }
  </i18n>
