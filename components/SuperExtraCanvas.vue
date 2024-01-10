<script setup lang="ts">
const canvasContainer = ref<HTMLCanvasElement>()
const { t } = useI18n({ useScope: 'local' })

// const { width, height } = useWindowSize({ includeScrollbar: false })
const { init } = useSuperExtraCanvas()

function scroll() {
  window.scrollTo({
    behavior: 'smooth',
    top: window.innerHeight
  })
}

onMounted(async () => {
  await nextTick()
  if (canvasContainer.value) {
    // @ts-ignore
    canvasContainer.value.appendChild(init())
  }
})

</script>

<template>
  <div class="fit-size relative">
    <ClientOnly>
      <div ref="canvasContainer" class="canvas" />
    </ClientOnly>

    <div class="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ">
      <div class="pointer-events-none use">
        <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none lg:mb-6 md:text-5xl xl:text-6xl text-white whitespace-nowrap select-none	">
          Paweł Romanowski
        </h1>
        <p class="font-light md:text-lg xl:text-xl text-gray-400 select-none	">
          {{ t('title') }}
        </p>
      </div>

      <div class="mt-5 text-center touch-only z-20">
          <button @click="scroll" class="inline-block py-3 px-10 text-white font-bold bg-primary hover:bg-primary-600 rounded-full" data-cursor-hover>
            {{ t('explore') }}
          </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fit-size {
  height: 100vh;
  height: 100svh;

  width: 100%;
}

.canvas{
  overflow: hidden;
}

.touch-only {
  display: none;
  @media (hover: none), (hover: on-demand), (-moz-touch-enabled: 1), (pointer:coarse) {
    display: block;
  }
}
</style>

<i18n lang="json">
  {
    "en": {
      "title": "Modern websites",
      "explore": "See more"

    },
    "pl": {
      "title": "Nowoczesne strony internetowe",
      "explore": "Zobacz więcej"
    }
  }
  </i18n>
