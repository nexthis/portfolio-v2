<template>
  <HeadStandard
    title="Nowoczesne strony internetowe, ecommerce, blogi i inne"
    description="Witam. Nazywam się Paweł Romanowski od kilku lat zajmuję się programowaniem stron internetowych. Zachęcam cię do przejrzenia mojego portfolio i poznania mnie lepiej."
  />

  <div class="h-full w-full md:container md:mx-auto relative slider">
    <ElementMain />
    <div class="h-1/5"></div>
    <ElementSkills />
    <div class="h-1/5"></div>
    <ElementContact />
  </div>

  <PaginationSlider :page="page" :max="ELEMENTS" />
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import _ from "lodash";

//For tests
const ELEMENTS = 3;
const page = ref(0);

const { onScrollEnd } = useScroll();
const { onKeyDown } = useKeyboard();
const { onSwipe } = useSwipe();

const animate = (direction: "up" | "down") => {
  page.value = _.clamp(
    direction === "down" ? page.value + 1 : page.value - 1,
    0,
    ELEMENTS - 1
  );
  gsap.to(".slider", { translateY: `-${page.value * 120}%` });
};

onScrollEnd((e) => {
  if (e.deltaY > 0) {
    animate("down");
    return;
  }
  if (e.deltaY < 0) {
    animate("up");
  }
});

onKeyDown((e) => {
  if (e.key === "ArrowDown") {
    animate("down");
    return;
  }
  if (e.key === "ArrowUp") {
    animate("up");
  }
});

onSwipe((e) => {
  if (e.direction.base === "vertical") {
    return;
  }

  if (e.direction.precisely === "up") {
    animate("down");
    return;
  }
  animate("up");
});
</script>
