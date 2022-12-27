<template>
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
        <div class="md:flex md:flex-col md:justify-end">
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

    <PaginationSlider :page="page ?? 0" :max="data?.results.length ?? 1" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import _ from "lodash";

const item = ref();
const { client, predicate, asText, asLink, asImageSrc } = usePrismic();
const { locale } = useI18n();
const page = useCookie("page", { default: () => 0 });
const { onScrollEnd } = useScroll();
const { onKeyDown } = useKeyboard();
const { onSwipe } = useSwipe();

const { data, refresh, pending } = await useAsyncData("portfolio", () =>
  client.query(predicate.at("document.type", "portfolio"), {
    orderings: "my.portfolio.created desc",
    lang: locale.value ?? "pl",
  })
);
item.value = data.value!.results[page.value ?? 0];

watch(locale, async () => {
  await refresh();
  item.value = data.value!.results[page.value ?? 0];
});

const animate = (direction: "up" | "down") => {
  const index = data.value!.results.indexOf(item.value);
  const max = data.value!.results.length;

  const next = _.clamp(direction === "up" ? index - 1 : index + 1, 0, max - 1);

  if ((index === 0 && next === 0) || (index === max - 1 && next === max - 1)) {
    gsap.to(".component", 0.1, { x: "+=15", yoyo: true, repeat: 5 });
    return;
  }

  gsap
    .timeline()
    .to(
      ".title, .description, .link",
      { xPercent: -20, opacity: 0, duration: 0.3, stagger: 0.2 },
      "same"
    )
    .to(".image", { xPercent: 20, duration: 0.4, opacity: 0 }, "same+=0.2")
    .call(() => {
      item.value = data.value!.results[next];
      page.value = next;
    })
    .to(".title, .description, .link, .image", {
      xPercent: 0,
      duration: 0.3,
      opacity: 1,
      stagger: 0.2,
    });

  // item.value = data.value.results[next]
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

<style scoped></style>
