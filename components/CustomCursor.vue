<script setup lang="ts">

const cursor = ref<HTMLDivElement>()
const dot = ref<HTMLDivElement>()

function mouseMoveEvent (event: MouseEvent) {
  const cursorEl = cursor.value
  const dotEl = dot.value
  if (!cursorEl || !dotEl) {
    return
  }

  const target = event.target as HTMLElement
  const x = event.clientX
  const y = event.clientY

  if (('cursorHover' in target.dataset)) {
    if (!dotEl.classList.contains('hover')) {
      dotEl.classList.add('hover')
    }
  } else {
    dotEl.classList.remove('hover')
  }

  cursorEl.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
  dotEl.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
}

function mouseUpEvent () {
  const dotEl = dot.value
  if (!dotEl) {
    return
  }
  dotEl.classList.remove('click')
}

function mouseDownEvent () {
  const dotEl = dot.value
  if (!dotEl) {
    return
  }
  dotEl.classList.add('click')
}

onMounted(() => {
  if (window.matchMedia('(any-hover: none)').matches) {
    const cursorEl = cursor.value
    const dotEl = dot.value
    if (!cursorEl || !dotEl) {
      return
    }
    cursorEl.classList.add('hidden')
    dotEl.classList.add('hidden')
    return
  }

  window.addEventListener('mousemove', mouseMoveEvent)
  window.addEventListener('mouseup', mouseUpEvent)
  window.addEventListener('mousedown', mouseDownEvent)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', mouseMoveEvent)
  window.removeEventListener('mouseup', mouseUpEvent)
  window.removeEventListener('mousedown', mouseDownEvent)
})
</script>

<template>
  <div>
    <div ref="dot" class="dot" />
    <div ref="cursor" class="cursor" />
  </div>
</template>

<style lang="scss" scoped>
.cursor {
    $size: 50px;

    width: $size;
    height: $size;
    border-radius: 100%;
    border: 1px solid white;
    transition: transform 200ms ease-out;
    will-change: transform;
    position: fixed;
    pointer-events: none;
    left: 0;
    top: 0;
    transform: translate(-$size, -$size);
}

.dot {
    $size: 20px;
    @apply bg-primary;
    width: $size;
    height: $size;
    border-radius: 100%;
    opacity: .5;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-$size, -$size);
    will-change: transform;
    pointer-events: none;
    transition: width .3s, height .3s, opacity .3s;

    &.hover{
        @apply bg-primary-400;
        $size: 50px;
        width: $size;
        height: $size;
        opacity: 0.7;
    }

    &.click{
        $size: 30px;
        width: $size;
        height: $size;
        opacity: 1;
    }
}
</style>
