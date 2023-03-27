<template>
  <section
    aria-label="Skills"
    class="h-full w-full py-20 sm:py-32 lg:pb-32 xl:pb-36"
  >
    <div class="max-w-7xl sm:px-6 lg:px-8">
      <h2
        class="text-white uppercase font-bold text-3xl md:text-4xl xl:text-5xl"
      >
        {{ t("title") }}
      </h2>
      <p class="mt-4 text-md md:text-xl tracking-tight text-gray-500 max-w-5xl">
        {{ t("description") }}
      </p>
    </div>

    <div
      class="flex justify-evenly items-center flex-wrap lg:flex-nowrap min-h mt-14 lg:mt-20 skills__wrapper"
    >
      <div
        v-element-visibility="onElementVisibility"
        @click="onProgressClick"
        class="progress skills__progress"
      >
        <div class="progress__bar skills__bar"></div>
        <div class="logo skills__logo"></div>

        <img
          @click.stop="(e) => onItemClick(e, item)"
          v-for="item in skills"
          class="icon skills__icon"
          :src="item.icon"
        />
      </div>
      <div v-if="!lg" class="w-5/12">
        <div
          class="text-4xl lg:text-8xl magic-text opacity-0 uppercase skills__text"
        >
          Laravel
        </div>
        <div class="text-xl text-gray-500 opacity-0 skills__description mt-10">
          Posiadam doświadczenie zawodowe w pracy z frameworkiem Vue i Vue 3. W
          trakcie mojej kariery zawodowej stworzyłem strony opartę o technologię
          w Nuxt, co pozwoliło mi na rozwinięcie umiejętności w pracy z
          dynamicznymi stronami internetowymi. Ponadto, pisałem własne projekty
          wykorzystując Nuxt 3, Vue 3 i TypeScript, co umożliwiło mi poznanie
          najlepszych praktyk i metodologii w pracy z tymi technologiami. W
          mojej pracy wykorzystuję swoje umiejętności programistyczne w
          TypeScript, co pozwala mi na zwiększenie jakości kodu oraz ułatwienie
          pracy w zespole.
        </div>
      </div>

      <div
        v-if="lg"
        class="text-4xl lg:text-8xl magic-text hidden uppercase skills__text"
      >
        Laravel
      </div>
      <div
        v-if="lg"
        class="text-md text-gray-500 hidden skills__description text-center mt-10"
      >
        Posiadam doświadczenie zawodowe w pracy z frameworkiem Vue i Vue 3. W
        trakcie mojej kariery zawodowej stworzyłem strony opartę o technologię w
        Nuxt, co pozwoliło mi na rozwinięcie umiejętności w pracy z dynamicznymi
        stronami internetowymi. Ponadto, pisałem własne projekty wykorzystując
        Nuxt 3, Vue 3 i TypeScript, co umożliwiło mi poznanie najlepszych
        praktyk i metodologii w pracy z tymi technologiami. W mojej pracy
        wykorzystuję swoje umiejętności programistyczne w TypeScript, co pozwala
        mi na zwiększenie jakości kodu oraz ułatwienie pracy w zespole.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { vElementVisibility } from "@vueuse/components";
import { gsap } from "gsap";

const { t } = useI18n();

const breakpoints = useBreakpoints(breakpointsTailwind);
const lg = breakpoints.smaller("lg");

let selected: null | { timeline: gsap.core.Timeline; item: Object } = null;
let isVisible = false;

const onElementVisibility = (state: boolean) => {
  if (state && !isVisible) {
    openMenuAnimation();
    isVisible = true;
  }
};

const onProgressClick = () => {
  if (selected) {
    selected.timeline.reverse(0);
    selected = null;
  }
};

const onItemClick = (e, item) => {
  if (selected && selected.item === item) {
    selected.timeline.reverse(0);
  } else {
    selected = {
      timeline: selectItemAnimation(e, item),
      item: item,
    };
  }
};

onMounted(() => {
  const progress = document.querySelector(".skills__progress");
  const wrapper = document.querySelector(".skills__wrapper");
  if (!lg.value) {
    gsap.set(progress, { x: wrapper!.clientWidth / 2 - progress!.clientWidth });
  }
});

const openMenuAnimation = () => {
  const progress = document.querySelector(".skills__progress");
  const icons = document.querySelectorAll(".skills__icon");
  const bar = document.querySelector(".skills__bar");
  const animation = gsap.timeline();
  const range = progress!.clientWidth / 1.2;

  const tl = animation
    .to(bar, {
      clip: "rect(0px, -15px, 320px, 0px)",
      ease: "power2.out",
      duration: 1.2,
    })
    .to(icons, {
      y: (i) => Math.cos((360 / skills.length) * i * (Math.PI / 180)) * range,
      x: (i) => Math.sin((360 / skills.length) * i * (Math.PI / 180)) * range,
      stagger: {
        amount: 0.3,
        onStart: () => {
          // pouEffectAudio.currentTime = 0;
          // pouEffectAudio.play();
        },
      },
      duration: 0.8,
      ease: "back.out(2)",
    });

  return tl;
};

const selectItemAnimation = (event, item) => {
  const animation = gsap.timeline();
  const progress = document.querySelector(".skills__progress");
  const icons = document.querySelectorAll(".skills__icon");
  const logo = document.querySelector(".skills__logo");
  const text = document.querySelector(".skills__text");
  const description = document.querySelector(".skills__description");
  const target = event.target;
  const range = progress!.clientWidth / 1.2;

  const others = Array.from(icons).filter((item) => item !== target);
  const tl = animation;
  if (!lg.value) {
    tl.to(progress, { x: 0, ease: "power2.inOut" }, "same")
      .set(target, { zIndex: 2 })
      .to(
        icons,
        {
          y: (i) =>
            Math.cos(
              (360 / skills.length) *
                Array.from(icons).indexOf(target) *
                (Math.PI / 180)
            ) * range,
          x: (i) =>
            Math.sin(
              (360 / skills.length) *
                Array.from(icons).indexOf(target) *
                (Math.PI / 180)
            ) * range,
          stagger: {
            amount: 0.3,
            onStart: () => {
              // pouEffectAudio.currentTime = 0;
              // pouEffectAudio.play();
            },
          },
          duration: 0.8,
          ease: "back.out(1)",
        },
        "same"
      );
  }

  tl.to(target, { x: 0, y: 0, ease: "elastic.in(2,1)" })
    .set(logo, { opacity: 0 })
    .to(
      target,
      {
        width: logo!.clientWidth,
        height: logo!.clientHeight,
        ease: "back.in(2.5)",
        duration: 0.5,
        // onStart: () => waterDropEffectAudio.play(),
      },
      "end"
    )

    .to(
      progress,
      {
        duration: 1,
        backgroundImage: item.gradient,
      },
      "end"
    )

    .to(others, { opacity: 0, display: "none" }, "end")
    .set([text, description], { display: "block", opacity: 0 })
    .call(() => {
      text!.innerHTML = item.title;
    });

  if (lg.value) {
    tl.to(progress, { scale: 1, width: 68, height: 68 }, "card").to(
      target,
      { scale: 1, width: 60, height: 60 },
      "card"
    );
  }

  tl.to([text, description], { opacity: 1 });

  return tl;
};

const skills = [
  {
    title: "Vue",
    description:
      "Posiadam doświadczenie zawodowe w pracy z frameworkiem Vue i Vue 3. W trakcie mojej kariery zawodowej stworzyłem strony opartę o technologię w Nuxt, co pozwoliło mi na rozwinięcie umiejętności w pracy z dynamicznymi stronami internetowymi. Ponadto, pisałem własne projekty wykorzystując Nuxt 3, Vue 3 i TypeScript, co umożliwiło mi poznanie najlepszych praktyk i metodologii w pracy z tymi technologiami. W mojej pracy wykorzystuję swoje umiejętności programistyczne w TypeScript, co pozwala mi na zwiększenie jakości kodu oraz ułatwienie pracy w zespole. </div>",
    gradient:
      "radial-gradient( circle farthest-corner at 10% 20%,  rgb(21 171 91) 0%, rgb(16 102 102) 90% )",
    icon: "/skills/vue.png",
    skill: 8,
  },
  {
    title: "Typescript",
    description: "loremasdd123sad",
    gradient: "linear-gradient(to right, #0d3566 0%, #021226 100%)",
    icon: "/skills/typescript.png",
    skill: 6,
  },
  {
    title: "pre CSS",
    description: "loremasdd123sad",
    gradient: "linear-gradient( 135deg, #F97794 10%, #623AA2 100%)",
    icon: "/skills/precss.png",
    skill: 6,
  },
  {
    title: "Webpack",
    description: "loremasdd123sad",
    gradient: "linear-gradient( 135deg, #5db5f3 10%, #00243e 100%)",
    icon: "/skills/webpack.png",
    skill: 5,
  },
  {
    title: "Laravel",
    description: "loremasdd123sad",
    gradient:
      "linear-gradient(-20deg, #b59eae, rgba(0, 0, 0, 0) 25%), linear-gradient(-100deg, #e8bea6, #e8bea6 0%, #f4a771 50%, #f65773)",
    icon: "/skills/laravel.png",
    skill: 5,
  },
  {
    title: "Database",
    description: "loremasdd123sad",
    gradient: "linear-gradient(to right, #3ea555 0%, #041c0a 100%)",
    icon: "/skills/database.png",
    skill: 5,
  },
  {
    title: "Websocket",
    description: "loremasdd123sad",
    gradient: "linear-gradient(to right, #0d3566 0%, black 100%)",
    icon: "/skills/websocket.png",
    skill: 7,
  },
  {
    title: "Linux/wsl2",
    description: "loremasdd123sad",
    gradient: "linear-gradient( 135deg, #424242 10%, #161616 100%)",
    icon: "/skills/linux.png",
    skill: 5,
  },
  {
    title: "Jira",
    description: "loremasdd123sad",
    gradient: "linear-gradient( 135deg, #2d85fb 10%, #093376 100%)",
    icon: "/skills/jira.png",
    skill: 5,
  },
  {
    title: "Docker",
    description: "loremasdd123sad",
    gradient: "linear-gradient( 135deg, #005168 10%, #161616 100%)",
    icon: "/skills/docker.png",
    skill: 5,
  },
];
</script>

<style scoped lang="scss">
.logo {
  background-image: url("/me1.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 150px;
  height: 150px;
  z-index: 20;
  position: relative;
  border-radius: 100%;

  @screen lg {
    width: 300px;
    height: 300px;
  }
}

.progress {
  padding: 10px;
  position: relative;
  z-index: 20;
  background-image: linear-gradient(-225deg, #181f29 0%, #262d37 100%);
  border-radius: 100%;

  &__bar {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
    position: absolute;
    border: 13px solid #d6d6d6;
    border-radius: 100%;
    transform: scale(1.02);
    clip: rect(0px, 320px, 320px, 0px);
    -webkit-backface-visibility: hidden;
  }
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  z-index: 1;
  width: 70px;
  height: 70px;
  object-fit: fill;

  @screen lg {
    width: 100px;
    height: 100px;
  }
}

.min-h {
  min-height: 407px;
  @screen lg {
    min-height: 700px;
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Skills",
    "description": "I am a young programmer with three years of professional experience. Before starting my full-time job, I worked as a freelancer. I specialize in JavaScript-based technologies such as Electron, Tauri, NodeJs, Vue, Laravel and web development in general. I want to continue developing my skills.",
  },
  "pl": {
    "title": "Umiejętności",
    "description": "Jestem młodym programistą, z trzyletnim doświadczeniem zawodowym. Przed rozpoczęciem pracy etatowej, realizowałem zlecenia jako freelancer. Specjalizuję się w technologiach opartych o język JavaScript jak Electron, Tauri, NodeJs, Vue i szeroko pojęty web development. Chcę nadal rozwijać swoje kompetencje.",
  }
}

</i18n>
