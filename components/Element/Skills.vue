<template>
  <section class="h-full w-full flex flex-col justify-center">
    <!--    {{text}}-->
    <h1 class="text-center text-5xl font-bold md:mb-14 xl:sr-only">
      {{ t("title") }}
    </h1>
    <div class="grid-template mt-10 md:mt-0">
      <div
        v-for="(item, index) in skills"
        :key="item.skill"
        class="whitespace-pre-wrap text-2xl rounded-2xl shadow bg-secondary-300"
        :style="{ backgroundImage: item.gradient }"
      >
        <div class="py-4 px-5 text-white">
          <div class="flex justify-center items-center xl:justify-between">
            <!--            <nuxt-img class="rounded-full w-16" :src="rt(item.icon)" format="webp" :alt="rt(item.title)"/>-->
            <nuxt-img
              class="rounded-full w-16"
              width="64"
              height="64"
              format="webp"
              quality="90"
              :src="item.icon"
              :alt="item.title"
            />
            <div class="uppercase tracking-wider font-bold hidden xl:block">
              {{ item.title }}
            </div>
          </div>

          <div class="mt-8 uppercase hidden xl:block">Skill</div>
          <div class="grid-cols-10 gap-3 mt-3 hidden xl:grid">
            <div
              v-for="number in 10"
              :key="number"
              class="bg-white p-2"
              :class="{ '!bg-green-500': item.skill >= number }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, rt, tm } = useI18n();

//Use https://content.nuxtjs.org/ if is too long/complicated
const skills = [
  {
    title: "React",
    gradient: "linear-gradient(to right, #0d3566 0%, #021226 100%)",
    icon: "/skills/react.png",
    skill: 3,
  },
  {
    title: "Vue",
    gradient:
      "radial-gradient( circle farthest-corner at 10% 20%,  rgb(21 171 91) 0%, rgb(16 102 102) 90% )",
    icon: "/skills/vue.png",
    skill: 8,
  },
  {
    title: "Typescript",
    gradient: "linear-gradient(to right, #0d3566 0%, #021226 100%)",
    icon: "/skills/typescript.png",
    skill: 6,
  },
  {
    title: "pre CSS",
    gradient: "linear-gradient( 135deg, #F97794 10%, #623AA2 100%)",
    icon: "/skills/precss.png",
    skill: 6,
  },
  {
    title: "Webpack",
    gradient: "linear-gradient( 135deg, #5db5f3 10%, #00243e 100%)",
    icon: "/skills/webpack.png",
    skill: 5,
  },
  {
    title: "Vite",
    gradient: "linear-gradient( 135deg, #2788a9 10%, #891fbf 100%)",
    icon: "/skills/vite.png",
    skill: 5,
  },
  {
    title: "Laravel",
    gradient:
      "linear-gradient(-20deg, #b59eae, rgba(0, 0, 0, 0) 25%), linear-gradient(-100deg, #e8bea6, #e8bea6 0%, #f4a771 50%, #f65773)",
    icon: "/skills/laravel.png",
    skill: 5,
  },
  {
    title: "Database",
    gradient: "linear-gradient(to right, #3ea555 0%, #041c0a 100%)",
    icon: "/skills/database.png",
    skill: 5,
  },
  {
    title: "Websocket",
    gradient: "linear-gradient(to right, #0d3566 0%, black 100%)",
    icon: "/skills/websocket.png",
    skill: 7,
  },
  {
    title: "Linux/wsl2",
    gradient: "linear-gradient( 135deg, #424242 10%, #161616 100%)",
    icon: "/skills/linux.png",
    skill: 5,
  },
  {
    title: "Jira",
    gradient: "linear-gradient( 135deg, #2d85fb 10%, #093376 100%)",
    icon: "/skills/jira.png",
    skill: 5,
  },
  {
    title: "Docker",
    gradient: "linear-gradient( 135deg, #005168 10%, #161616 100%)",
    icon: "/skills/docker.png",
    skill: 5,
  },
];
</script>

<style scoped lang="scss">
.grid-template {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  @media (max-height: 750px) {
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  }
  @media (min-width: theme("screens.md")) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    @apply px-14;
  }
  @media (min-width: theme("screens.xl")) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Skills"
  },
  "pl": {
    "title": "Umiejętności",
  }
}

</i18n>
