<template>
  <HeadStandard
    title="Nowoczesne strony internetowe, ecommerce, blogi i inne"
    description="Witam. Nazywam się Paweł Romanowski od kilku lat zajmuję się programowaniem stron internetowych. Zachęcam cię do przejrzenia mojego portfolio i poznania mnie lepiej."
  />

  <div class="h-full w-full md:container md:mx-auto relative slider">
    <template v-for="item in elements" :key="item">
      <component :is="item" />
      <div class="h-1/5"></div>
    </template>
  </div>

  <PaginationSlider :page="page" :max="elements.length" />
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import _ from "lodash";

//For tests
const page = ref(0);

const elements = [
  resolveComponent("ElementMain"),
  resolveComponent("ElementSkills"),
  resolveComponent("ElementContact"),
];

const { t } = useI18n();
const { onScrollEnd } = useScroll();
const { onKeyDown } = useKeyboard();
const { onSwipe } = useSwipe();
const bgText = useBackgroundText(t(`title.0`));

const animate = (direction: "up" | "down") => {
  page.value = _.clamp(
    direction === "down" ? page.value + 1 : page.value - 1,
    0,
    elements.length - 1
  );
  bgText.value = t(`title.${page.value}`);
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

<i18n>
{
  "en": {
    "title": [
      "Web\n Developer",
      "Skills",
      "Contact",
    ],
  },
  "pl": {
    "title": [
      "Web\n Developer",
      "Umiejętności",
      "Kontakt",
    ],
  }
}
</i18n>
