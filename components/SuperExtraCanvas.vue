<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()
const { t } = useI18n({ useScope: 'local' })

const { width, height } = useWindowSize({ includeScrollbar: false })
const { init } = useSuperExtraCanvas()

onMounted(async () => {
  await nextTick()
  if (canvas.value) {
    init(canvas.value)
  }
})

</script>

<template>
  <div class="fit-size relative">
    <ClientOnly>
      <canvas ref="canvas" :height="height" :width="width" />
    </ClientOnly>

    <div class="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none lg:mb-6 md:text-5xl xl:text-6xl text-white whitespace-nowrap">
        Paweł Romanowski
      </h1>
      <p class="font-light md:text-lg xl:text-xl text-gray-400">
        {{ t('title') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fit-size {
  height: 100vh;
  height: 100svh;

  width: 100%;
}
</style>

<i18n lang="json">
  {
    "en": {
      "title": "Modern websites"
    },
    "pl": {
      "title": "Nowoczesne strony internetowe"
    }
  }
  </i18n>
