<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { data } = await useAsyncData(`all:${locale.value}`, () => queryContent(locale.value).find())
const elements = ref<Array<HTMLDivElement>>(undefined)

useIntersectionObserver(
  elements,
  ([{ isIntersecting, target }], observer) => {
    if (isIntersecting) {
      target.classList.add('active')
      observer.unobserve(target)
    }
  },
  {
    rootMargin: '0px 0px -20% 0px',
    immediate: true,
    threshold: 0.5
  }
)

useSeoGenerator({
  title: t('title'),
  description: t('description'),
  image: {
    src: '/images/indexSEO.png'
  },
  schemaOrg: [
    definePerson({
      name: 'Paweł Romanowski',
      image: '/images/indexSEO.png',
      sameAs: [
        'https://github.com/nexthis',
        'https://www.facebook.com/profile.php?id=100095274217155'
      ]
    })
  ]
})

</script>

<template>
  <div>
    <section class="py-20 2xl:py-40">
      <div class="container px-4 mx-auto">
        <div class="max-w-4xl mx-auto">
          <h1 class="mt-8 text-5xl magic-text font-bold font-heading">
            Portfolio
          </h1>

          <div v-for="(item, index) in data" :key="index" ref="elements" :class="{'lg:flex-row-reverse': index % 2 }" class="flex flex-wrap lg:flex-nowrap justify-between items-center mt-20 animation">
            <NuxtLink class="contents" prefetch :href="localePath(`/portfolio/${item.slug}`)">
              <NuxtImg
                data-cursor-hover
                width="450"
                height="450"
                class="transition mx-auto duration-300 ease-in-out hover:saturate-150 hover:blur-sm image"
                format="webp"
                :alt="item.title"
                :src="item.image"
              />
            </NuxtLink>

            <div :class="{'lg:pr-16': index % 2, 'lg:pl-16': !(index % 2) }" class="w-100 max-w-[450px] mx-auto mt-5 lg:mt-0 transition delay-200 duration-300 text-md text">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <NavigationFooter />
  </div>
</template>

<style scoped lang="scss">

.animation{

  .text{
    opacity: 0;
  }
  .image {
    opacity: 0;
    transform: rotate(20deg) scale(0.7);
  }

  &.active {
    .image, .text {
      transform: scale(1);
      opacity: 1;

    }
  }
}
</style>

<i18n lang="json">
  {
    "en": {
      "title": "Paweł Romanowski - Portfolio",
      "description": "Discover a diverse collection of web applications, responsive designs, and innovative coding projects. Get inspired by passion for creating seamless digital experiences and cutting-edge technology solutions. ",
      "show": " Show"
    },
    "pl": {
      "title": "Paweł Romanowski - Portfolio",
      "description": "Odkryj różnorodną kolekcję aplikacji internetowych, responsywnych projektów i innowacyjnych projektów kodowania. Zainspiruj się pasją tworzenia płynnych doświadczeń cyfrowych i najnowocześniejszych rozwiązań technologicznych.",
      "show": " Zobacz"
    }
  }
  </i18n>
