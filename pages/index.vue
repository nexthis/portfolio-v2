<template>
  <HeadStandard :title="t('seoTitle')" :description="t('seoDescription')" />

  <div class="h-full w-full md:container md:mx-auto slider">
    <template v-for="item in elements" :key="item">
      <component :is="item" />
      <div class="h-1/5"></div>
    </template>
  </div>

  <PaginationSlider
    @update:model-value="onSliderChange"
    :model-value="page"
    :max="elements.length"
  />
</template>
<script setup lang="ts">
import { gsap, Power2 } from "gsap";
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

const animate = (value: number) => {
  page.value = _.clamp(value, 0, elements.length - 1);
  bgText.value = t(`title.${page.value}`);
  gsap.to(".slider", {
    translateY: `-${page.value * 120}%`,
    ease: Power2.easeOut,
  });
};

const onSliderChange = (value: number) => {
  animate(value);
};

onScrollEnd((e) => {
  if (e.deltaY > 0) {
    animate(page.value + 1);
    return;
  }
  if (e.deltaY < 0) {
    animate(page.value - 1);
  }
});

onKeyDown((e) => {
  if (e.key === "ArrowDown") {
    animate(page.value + 1);
    return;
  }
  if (e.key === "ArrowUp") {
    animate(page.value - 1);
  }
});

onSwipe((e) => {
  if (e.direction.base === "vertical") {
    return;
  }

  if (e.direction.precisely === "up") {
    animate(page.value + 1);
    return;
  }
  animate(page.value - 1);
});
</script>

<i18n>
{
  "en": {
    "seoTitle": "Modern websites, ecommerce, blogs and more",
    "seoDescription": "Hello, my name is Pawel Romanowski I have been doing web programming for several years. I encourage you to browse through my portfolio and get to know me better.",
    "title": [
      "Web\n Developer",
      "Skills",
      "Contact",
    ],
  },
  "pl": {
    "seoTitle": "Nowoczesne strony internetowe, ecommerce, blogi i inne",
    "seoDescription": "Witam. Nazywam się Paweł Romanowski od kilku lat zajmuję się programowaniem stron internetowych. Zachęcam cię do przejrzenia mojego portfolio i poznania mnie lepiej.",
    "title": [
      "Web\n Developer",
      "Umiejętności",
      "Kontakt",
    ],
  }
}
</i18n>
