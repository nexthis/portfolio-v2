<template>
  <HeadStandard
    :title="asText(data.data.seo_title) ?? 'Project'"
    :description="asText(data.data.seo_description) ?? ''"
    :image="asImageSrc(data.data.seo_image) ?? ''"
    type="article"
  />
  <div>
    <div
      class="h-full w-full flex flex-col md:flex-row justify-between md:container py-1 md:mx-auto default-screen-height"
    >
      <div
        class="h-full w-full flex flex-col md:flex-row justify-between md:container md:mx-auto default-screen-height"
      >
        <div
          class="md:px-0 px-6 mt-5 md:flex md:justify-center md:w-1/2 md:flex-col"
        >
          <div class="md:flex md:flex-col md:justify-end">
            <h1
              class="text-white uppercase font-bold text-2xl md:text-4xl xl:text-6xl mb-5"
            >
              {{ asText(data.data.title) }}
            </h1>
            <div class="lg:w-2/3 md:w-full">
              <p
                class="text-md font-normal md:text-base lg:text-xl xl:text-2xl"
              >
                {{ asText(data.data.short) }}
              </p>
            </div>
            <a
              class="text-accent lg:text-xl lg:mt-5"
              :href="asLink(data.data.website_url)"
              target="_blank"
              rel="noreferrer"
              >Zobacz stronę</a
            >
          </div>
        </div>
        <div
          class="w-full h-full max-h-96 relative mt-20 md:flex md:w-3/4 md:justify-center md:flex-col md:mt-0 sm:max-h-full md:ml-5 lg:w-1/2"
        >
          <div class="md:h-full md:mb-5 md:relative md:shadow-2xl">
            <img
              :src="asImageSrc(data.data.image)"
              :alt="data.data.image.alt"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white text-black py-14 w-full md:px-0 px-6">
      <div class="container mx-auto">
        <div class="text-secondary flex flex-wrap md:justify-around">
          <div class="w-1/2 md:w-auto">
            <p class="uppercase font-semibold text-xl lg:text-2xl">Role</p>
            {{ data.data.type }}
          </div>
          <div class="w-1/2 md:w-auto">
            <p class="uppercase font-semibold text-xl lg:text-2xl">Date</p>
            {{ data.data.created }}
          </div>
          <div class="w-1/2 md:w-auto mt-3 md:mt-0">
            <p class="uppercase font-semibold text-xl lg:text-2xl">
              Technology
            </p>
            <div class="flex flex-wrap">
              <div v-for="item in data.data.technologies" class="ml-1">
                <nuxt-img
                  class="rounded-full w-[32px] h-[32px]"
                  :src="`/skills/${item.technology}.png`"
                  :alt="item.technology"
                  height="32"
                  width="32"
                  format="webp"
                />
              </div>
            </div>
          </div>
          <div class="w-1/2 md:w-auto mt-3 md:mt-0">
            <p class="uppercase font-semibold text-xl lg:text-2xl">Overview</p>
            <p class="font-normal lg:text-lg">
              {{ asText(data.data.seo_title) }}
            </p>
          </div>
        </div>
        <img
          class="mx-auto mt-14 lg:px-44"
          :src="asImageSrc(data.data.responsive_device_mockup)"
          :alt="data.data.responsive_device_mockup.alt"
        />
      </div>
    </div>
    <div class="background-gradient">
      <div class="mx-auto container md:px-0 px-6">
        <div class="py-8 max-w-5xl mx-auto">
          <div v-html="asHTML(data.data.content, null, htmlSerializer)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "highlight.js/styles/atom-one-dark.css";
import { useI18n } from "vue-i18n";
import highlight from "highlight.js";

const { client, asText, asLink, asImageSrc, asHTML } = usePrismic();

const route = useRoute();
const { locale } = useI18n();

definePageMeta({
  pageTransition: null,
});

const { data, refresh } = await useAsyncData(
  "portfolio." + route.params.uuid,
  () =>
    client.getByUID("portfolio", route.params.uuid, {
      lang: locale.value ?? "pl",
    })
);

watch(locale, () => {
  console.log(data);
  refresh();
});

const htmlSerializer = (type, element, content, children, index) => {
  if (type === "preformatted") {
    const isCode = children.toString().includes("code");
    if (isCode) {
      const lang = children.toString().replace("code:", "").replace(/:.*/s, "");
      return `<pre class="${lang + " code"}"><code>${children.replace(
        `code:${lang}:`,
        ""
      )}</code></pre>`;
    }
  }
};

onMounted(() => {
  document.body.classList.add("!h-auto", "!overflow-auto");
  document.querySelector("main").classList.remove("container");
  document.querySelector("main").classList.add("w-full");
  highlight.highlightAll();
});
onUnmounted(() => {
  document.body.classList.remove("!h-auto", "!overflow-auto");
  document.querySelector("main").classList.add("container");
  document.querySelector("main").classList.remove("w-full");
});
</script>

<style lang="scss" scoped>
.background-gradient {
  background: linear-gradient(77deg, #131a24, #2b323c) no-repeat fixed;
}
</style>
