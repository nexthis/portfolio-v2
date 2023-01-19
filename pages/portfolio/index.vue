<template>
  <HeadStandard :title="t('seoTitle')" :description="t('seoDescription')" />
  <div
    class="h-full w-full flex flex-col justify-between md:container md:mx-auto default-screen-height"
  >
    <div
      v-if="item"
      class="h-full w-full flex flex-col md:flex-row justify-between md:container md:mx-auto default-screen-height component"
    >
      <div
        class="md:px-0 px-6 mt-5 md:flex md:justify-center md:w-1/2 md:flex-col"
      >
        <div class="md:flex md:flex-col md:justify-end text-box">
          <h1
            class="text-white uppercase font-bold text-2xl md:text-4xl xl:text-6xl mb-5 title"
          >
            {{ asText(item.data.title) }}
          </h1>
          <div class="lg:w-2/3 md:w-full description">
            <p class="text-md font-normal md:text-base lg:text-xl xl:text-2xl">
              {{ asText(item.data.short) }}
            </p>
          </div>
          <NuxtLink
            class="text-accent lg:text-xl lg:mt-5 block link"
            :to="`/portfolio/${item.uid}`"
            >Zobacz więcej</NuxtLink
          >
        </div>
      </div>
      <NuxtLink
        :to="`/portfolio/${item.uid}`"
        class="w-full h-full max-h-80 relative mt-20 md:flex md:w-3/4 md:justify-center md:flex-col md:mt-0 sm:max-h-full md:ml-5 lg:w-5/12 image"
      >
        <img
          :src="asImageSrc(item.data.image) ?? ''"
          :alt="item.data.image.alt"
        />
      </NuxtLink>
    </div>

    <PaginationSlider
      @update:model-value="onPaginationChange"
      :model-value="page"
      :max="data?.results.length ?? 0"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import _ from "lodash";
import type { Ref } from "vue";

const item = ref();
const page = useCookie("page", { default: () => 0 }) as Ref<number>;
const bgText = useBackgroundText("Portfolio");
const { client, predicate, asText, asLink, asImageSrc } = usePrismic();
const { locale } = useI18n();
const { t } = useI18n();
const { onScrollEnd } = useScroll();
const { onKeyDown } = useKeyboard();
const { onSwipe } = useSwipe();

const { data, refresh, pending } = await useAsyncData("portfolio", () =>
  client.query(predicate.at("document.type", "portfolio"), {
    orderings: "my.portfolio.created desc",
    lang: locale.value ?? "pl",
  })
);
item.value = data.value!.results[page.value];

watch(locale, async () => {
  await refresh();
  item.value = data.value!.results[page.value];
});

const animate = (value: number) => {
  const index = data.value!.results.indexOf(item.value);
  const max = data.value!.results.length;

  const next = _.clamp(value, 0, max - 1);
  const driver = value > page.value ? -1 : 1;

  const width = document.querySelector(".image")!.clientWidth;
  const position =
    document.querySelector(".component")!.clientWidth / 2 - width / 2;

  if ((index === 0 && next === 0) || (index === max - 1 && next === max - 1)) {
    gsap.to(".component", 0.1, { x: "+=15", yoyo: true, repeat: 5 });
    return;
  }

  page.value = next;

  gsap
    .timeline()
    .set(".text-box", { width: width })
    .to(".text-box", { x: position + 10, duration: 0.3 }, "<")
    .to(".image", { x: -position, duration: 0.3 }, "<")
    .to(".text-box, .image", {
      y: `${driver * 100}vh`,
      opacity: 0,
    })
    .call(() => {
      item.value = data.value!.results[next];
      bgText.value = asText(item.value.data.title) ?? "Portfolio";
    })
    .set(".text-box, .image", {
      y: `${-driver * 100}vh`,
      opacity: 1,
    })
    .to(".text-box, .image", { y: 0 })
    .to(".text-box", { x: 0, duration: 0.3 })
    .to(".image", { x: 0, duration: 0.3 }, "<")
    .set(".text-box", { width: "auto" });
};

const onPaginationChange = (value: number) => {
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

<style scoped></style>

<i18n>
{
  "en": {
    "seoTitle": "Portfolio, realizations and own projects",
    "seoDescription": "My programming portfolio showcases my skills and experience as a software developer. From building custom web applications to optimizing code for performance, I have demonstrated my ability to deliver high-quality code. Take a look and see how I can bring value to your team as a programmer.",
  },
  "pl": {
    "seoTitle": "Portfolio, realizacje i własne projekty",
    "seoDescription": "Mój portfolio programistyczne prezentuje moje umiejętności i doświadczenie jako programista oprogramowania. Od tworzenia niestandardowych aplikacji internetowych po optymalizację kodu pod kątem wydajności, udowodniłem swoją zdolność do dostarczania wysokiej jakości kodu. Zajrzyj i zobacz, jak mogę przynieść wartość twojemu zespołowi jako programista.",
  }
}
</i18n>
