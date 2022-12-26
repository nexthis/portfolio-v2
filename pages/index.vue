<template>
  <div class="h-full grid-template">
    <HeadStandard
      title="Nowoczesne strony internetowe, ecommerce, blogi i inne"
      description="Witam. Nazywam się Paweł Romanowski od kilku lat zajmuję się programowaniem stron internetowych. Zachęcam cię do przejrzenia mojego portfolio i poznania mnie lepiej."
    />

    <div
      class="flex flex-col items-start pt-7 lg:justify-center lg:items-end lg:pt-0"
    >
      <h1
        class="text-white uppercase font-bold text-2xl md:text-4xl xl:text-5xl lg:text-right"
      >
        {{ t("title") }}
      </h1>
      <p class="text-md text-white mt-1 tracking-tight lg:text-right lg:w-1/2">
        {{ t("description") }}
      </p>
    </div>
    <div
      class="flex h-full w-full relative items-end justify-end lg:justify-center"
    >
      <!--      <nuxt-img class="h-full w-auto block absolute" src="/me.png"  format="webp" fit-->
      <!--                alt="Zdjęcia przedstawiające Pawła Romanowskiego"/>-->
      <img
        class="h-full w-auto block absolute"
        src="/me.png"
        alt="Zdjęcia przedstawiające Pawła Romanowskiego"
      />
    </div>
    <NuxtLink class="sr-only" to="/skills">Skills</NuxtLink>
  </div>
</template>
<script setup lang="ts">
useBackgroundText("Web \nDeveloper");

const { t, locale } = useI18n();
useNavigation("/skills");
</script>

<style scoped lang="scss">
.grid-template {
  display: grid;
  grid-template-rows: 1fr 2fr;

  @media (min-width: theme("screens.lg")) {
    grid-template-rows: unset;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Im ready to create your website and make it awesome!",
    "description": "Full-stac developer from Poland. I create custom website to help buisinesses to better online"
  },
  "pl": {
    "title": "Stwórzmy razem kolejną niesamowitą stronę internetową!",
    "description": "Full-stac developer. Tworzę strony inernetowe, sklepy, blogi i aplikacje internetowe "
  }
}

</i18n>
