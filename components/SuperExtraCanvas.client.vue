<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()

useResizeObserver(document.body, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  if (!canvas.value) {
    return
  }
  canvas.value.width = width
  canvas.value.height = window.innerHeight
})

</script>

<template>
  <canvas ref="canvas" />
</template>
