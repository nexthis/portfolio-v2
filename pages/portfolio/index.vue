<template>
  <HeadStandard :title="t('seoTitle')" :description="t('seoDescription')" />
  <div v-if="!pending" class="flex flex-col my-10 gap-20 md:gap-36 md:mt-20">
    <div
      v-intersection-observer="[
        onIntersectionObserver,
        { rootMargin: '-50% 0% -50% 0%', threshold: 0 },
      ]"
      v-for="(item, index) in data?.results"
      class="md:flex md:justify-center md:items-center"
      :class="index % 2 ? 'md:flex-row-reverse' : ''"
    >
      <NuxtLink
        :to="localePath(`/portfolio/${item.uid}`)"
        class="w-full h-full lg:w-9/12 overflow-hidden block relative md:flex image"
      >
        <nuxt-img
          format="webp"
          :quality="90"
          :src="asImageSrc(item.data.image) ?? ''"
          :alt="item.data.image.alt"
        />

        <div
          class="curtain w-full p-2 h-full bg-accent absolute left-0 top-0"
        ></div>
        <div
          class="curtain w-full p-2 h-full bg-primary absolute left-0 top-0"
        ></div>
      </NuxtLink>

      <!-- <h3
        class="text-md magic-text text-6xl -mt-14 z-10 relative md:text-base lg:text-xl xl:text-2xl"
      >
        {{ asText(item.data.title) }}
      </h3> -->

      <div class="w-full" :class="index % 2 ? 'md:pr-20' : 'md:pl-20'">
        <p
          class="text-md lg:text-xl xl:text-3xl text-white font-normal opacity-0 mt-4 md:text-base description"
        >
          {{ asText(item.data.short) }}
        </p>

        <a
          href="/portfolio/ppe"
          class="text-accent mt-5 block md:mt-10 text-lg lg:text-2xl xl:text-3xl opacity-0 description"
          data-v-d5322c4e=""
          >Zobacz więcej</a
        >
      </div>

      <!-- <nuxt-link
        :href="localePath(`/portfolio`)"
        class="button block max-w-fit mt-10 mx-auto"
      >
        {{ t("see") }}
      </nuxt-link> -->
    </div>
  </div>
</template>
image
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { vIntersectionObserver } from "@vueuse/components";

import { gsap } from "gsap";
import _ from "lodash";

const localePath = useLocalePath();
const { client, predicate, asText, asLink, asImageSrc } = usePrismic();
const { locale, t } = useI18n();

const { data, refresh, pending } = await useAsyncData("portfolio", () =>
  client.query(predicate.at("document.type", "portfolio"), {
    orderings: "my.portfolio.created desc",
    lang: locale.value ?? "pl",
  })
);

watch(locale, async () => {
  await refresh();
});

const onIntersectionObserver = (
  entry: Array<IntersectionObserverEntry>,
  observer: IntersectionObserver
) => {
  const event = entry[0];
  if (!event.isIntersecting) {
    return;
  }

  observer.unobserve(event.target);
  const target = event.target;
  const curtains = target.querySelectorAll(".curtain");
  const image = target.querySelector(".image");
  const description = target.querySelectorAll(".description");
  const tl = gsap.timeline();

  tl.fromTo(
    image,
    {
      scale: 0.7,
    },
    {
      scale: 1,
    }
  )
    .to(
      Array.from(curtains).reverse(),
      {
        x: "110%",
        duration: 1,
        stagger: 0.1,
      },
      "0"
    )
    .to(description, { opacity: 1 }, "=-0.7");
};
</script>

<style lang="scss" scoped>
.button {
  text-decoration: none;
  padding: 15px 30px;
  border: none;
  color: white;
  position: relative;
  background: none;
  z-index: 1;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 5px;
    right: 5px;
    background-color: theme("colors.accent.500");
    z-index: -1;
    transition: transform 0.15s ease-out 0s;
  }

  &::after {
    content: "";
    left: 0px;
    top: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid white;
    opacity: 1;
    transition: transform 0.15s ease-out 0s;
  }

  &:focus {
    &::before {
      background-color: theme("colors.accent.700");
    }
  }

  &:hover {
    &::after {
      transform: translate(-5px, 5px);
    }

    &::before {
      transform: translate(5px, -5px);
    }
  }
}
</style>

<i18n>
{
  "en": {
    "seoTitle": "Portfolio, realizations and own projects",
    "seoDescription": "My programming portfolio showcases my skills and experience as a software developer. From building custom web applications to optimizing code for performance, I have demonstrated my ability to deliver high-quality code. Take a look and see how I can bring value to your team as a programmer.",
    "see": "See more",
  },
  "pl": {
    "seoTitle": "Portfolio, realizacje i własne projekty",
    "seoDescription": "Mój portfolio programistyczne prezentuje moje umiejętności i doświadczenie jako programista oprogramowania. Od tworzenia niestandardowych aplikacji internetowych po optymalizację kodu pod kątem wydajności, udowodniłem swoją zdolność do dostarczania wysokiej jakości kodu. Zajrzyj i zobacz, jak mogę przynieść wartość twojemu zespołowi jako programista.",
    "see": "Zobacz więcej",
  }
}
</i18n>
