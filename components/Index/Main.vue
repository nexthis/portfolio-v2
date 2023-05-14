<template>
  <div
    class="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10 justify-center items-center pt-10 lg:pt-0 lg:pb-32 xl:pb-36"
  >
    <div class="lg:col-span-6 lg:max-w-none lg:pt-6 xl:col-span-6 w-full">
      <h1
        class="text-white uppercase font-bold text-3xl md:text-4xl xl:text-5xl lg:text-right"
      >
        <span
          v-for="item in tm('title')"
          :class="item.class ? rt(item.class) : null"
        >
          {{ rt(item.text) }}
        </span>
      </h1>

      <p
        class="text-lg text-white mt-1 tracking-tight lg:text-right lg:ml-auto lg:w-7/12"
      >
        {{ t("description") }}
      </p>
    </div>

    <div
      class="flex justify-center lg:col-span-6 lg:max-w-none lg:pt-6 xl:col-span-6"
    >
      <nuxt-img
        src="/me.png"
        class="max-h-img"
        format="webp"
        :quality="90"
        sizes="sm:100vw lg:40vw"
        alt="Zdjęcia przedstawiające Pawła Romanowskiego"
        preload
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//flex-1
const { t, locale, tm, rt } = useI18n();
</script>

<style scoped lang="scss">
.max-h-img {
  max-height: 85vh;
}
</style>

<i18n>
{
  "en": {
    "title": [
      {text: "Im ready to create your website and make it "},
      {text: "awesome", class: "magic-text"},
      {text: "!"},
    ],
    "description": "Full-stack developer from Poland. I create custom website to help buisinesses to better online"
  },
  "pl": {
    "title":  [
      {text: "Stwórzmy razem kolejną  "},
      {text: "niesamowitą ", class: "magic-text"},
      {text: "stronę internetową!"},
    ],
    "description": "Full-stack developer. Tworzę strony inernetowe, sklepy, blogi i aplikacje internetowe ",
  }
}

</i18n>
