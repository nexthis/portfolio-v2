<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const slug = route.params.slug as string

const { data } = await useAsyncData(slug, () => queryContent(locale.value).where({ slug: { $eq: slug } }).findOne())

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
      datePublished: new Date(2020, 1, 1),
      dateModified: new Date(2020, 1, 1),
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
          <NuxtImg v-if="data" :src="data.image" width="700" format="webp" quality="80" />
        </header>

        <ContentRendererMarkdown v-if="data" class="content" :value="data" />
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
