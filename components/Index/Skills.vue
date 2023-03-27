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
        <nuxt-img
          class="logo skills__logo"
          format="webp"
          sizes="sm:150px lg:300px"
          fit="contain"
          :quality="90"
          src="/me1.png"
          alt="Paweł Romanowski"
        >
        </nuxt-img>

        <img
          @click.stop="(e) => onItemClick(e, item)"
          v-for="item in tm('skills')"
          class="icon skills__icon"
          :alt="rt(item.title)"
          :src="rt(item.icon)"
        />
      </div>
      <div v-if="!lg" class="w-5/12">
        <div
          class="text-4xl lg:text-8xl magic-text opacity-0 uppercase skills__text"
        >
          Laravel
        </div>
        <div
          class="text-xl text-gray-500 opacity-0 skills__description mt-10"
        ></div>
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
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { vElementVisibility } from "@vueuse/components";
import { gsap } from "gsap";

const { t, tm, rt } = useI18n();

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
  if (!progress) {
    return;
  }

  const range = progress!.clientWidth / 1.2;

  const tl = animation
    .to(bar, {
      clip: "rect(0px, -15px, 320px, 0px)",
      ease: "power2.out",
      duration: 1.2,
    })
    .to(icons, {
      y: (i) =>
        Math.cos((360 / tm("skills").length) * i * (Math.PI / 180)) * range,
      x: (i) =>
        Math.sin((360 / tm("skills").length) * i * (Math.PI / 180)) * range,
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
              (360 / tm("skills").length) *
                Array.from(icons).indexOf(target) *
                (Math.PI / 180)
            ) * range,
          x: (i) =>
            Math.sin(
              (360 / tm("skills").length) *
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
        backgroundImage: rt(item.gradient),
      },
      "end"
    )

    .to(others, { opacity: 0, display: "none" }, "end")
    .set([text, description], { display: "block", opacity: 0 })
    .call(() => {
      text!.innerHTML = rt(item.title);
      description!.innerHTML = rt(item.description);
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
</script>

<style scoped lang="scss">
.logo {
  width: 150px;
  height: 150px;
  z-index: 20;
  position: relative;
  border-radius: 100%;
  object-fit: contain;
  object-position: center;
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
    "skills": [
      {
      title: "Vue",
      description:
        "I have professional experience working with the Vue framework and Vue 3. During my career, I have developed websites using Nuxt, which has allowed me to hone my skills in working with dynamic web pages. Additionally, I have written my own projects using Nuxt 3, Vue 3, and TypeScript, enabling me to learn best practices and methodologies for working with these technologies. In my work, I utilize my programming skills in TypeScript to improve the quality of code and facilitate teamwork.",
      gradient:
        "radial-gradient( circle farthest-corner at 10% 20%,  rgb(21 171 91) 0%, rgb(16 102 102) 90% )",
      icon: "/skills/vue.png",
    },
    {
      title: "Typescript",
      description: "TypeScript is a powerful programming language that is a superset of JavaScript, offering additional features such as static typing, classes, and interfaces. It is designed to make writing scalable and maintainable code easier, catching errors at compile-time rather than runtime. TypeScript also supports modern JavaScript features and transpiles code to multiple versions of JavaScript, making it my choice for developing web applications.",
      gradient: "linear-gradient(to right, #0d3566 0%, #021226 100%)",
      icon: "/skills/typescript.png",
    },
    {
      title: "Rust",
      description: "Rust is a modern, high-performance programming language designed for systems-level programming, combining the low-level control of C and C++ with modern language features like memory safety, concurrency, and zero-cost abstractions. Its focus on speed, reliability, and security make it a popular choice for developing fast and efficient software, especially for systems programming and web applications. Rust is my favorite language, and I am still developing my skills in this language. My main goal is to write a high-performance Tauri app. ",
      gradient: "linear-gradient( 135deg, #F97794 10%, #623AA2 100%)",
      icon: "/skills/rust.png",
    },
    {
      title: "Laravel",
      description: "Laravel is a popular open-source PHP web framework, designed to simplify and accelerate the development of web applications with expressive syntax, robust features, and modular architecture. It provides a variety of tools and features for handling common web development tasks, such as routing, authentication, database management, and templating, making it a preferred choice for building high-quality, scalable, and maintainable web applications.",
      gradient:
        "linear-gradient(-20deg, #b59eae, rgba(0, 0, 0, 0) 25%), linear-gradient(-100deg, #e8bea6, #e8bea6 0%, #f4a771 50%, #f65773)",
      icon: "/skills/laravel.png",
    },
    {
      title: "Database",
      description: "In my professional career i'm use several types of database such as: MySQL is a widely-used open-source relational database management system that provides a robust and scalable solution for managing and storing structured data. Firebase is a cloud-based platform that offers a range of services for building mobile and web applications, including real-time databases, user authentication, and hosting. Redis is a fast and flexible in-memory data store that can be used as a database, cache, and message broker, offering high-performance and scalability for a range of use cases. ",
      gradient: "linear-gradient(to right, #3ea555 0%, #041c0a 100%)",
      icon: "/skills/database.png",
    },
    {
      title: "Linux/wsl2",
      description: "I use linux for all my projects. I think it's the best choice for any developer. I am extremely happy that Proton technology is developing so quickly 😋",
      gradient: "linear-gradient( 135deg, #424242 10%, #161616 100%)",
      icon: "/skills/linux.png",
    },
    {
      title: "Workflow ",
      description: "With my experience in Jira, I am proficient in managing and tracking project progress and workflow. I have extensive experience using Git for version control, allowing for collaborative and organized software development. I am skilled in setting up and configuring continuous integration (CI) pipelines, which automate the build, testing, and deployment of software, improving efficiency and reducing errors.",
      gradient: "linear-gradient( 135deg, #2d85fb 10%, #093376 100%)",
      icon: "/skills/jira.png",
    },
    {
      title: "Docker",
      description: "Docker is a platform for developing, deploying, and running applications in containers, providing a lightweight and efficient way to package and ship software. I'm still learn and discover this tool ",
      gradient: "linear-gradient( 135deg, #005168 10%, #161616 100%)",
      icon: "/skills/docker.png",
    },
    ]

  },
  "pl": {
    "title": "Umiejętności",
    "description": "Jestem młodym programistą, z trzyletnim doświadczeniem zawodowym. Przed rozpoczęciem pracy etatowej, realizowałem zlecenia jako freelancer. Specjalizuję się w technologiach opartych o język JavaScript jak Electron, Tauri, NodeJs, Vue i szeroko pojęty web development. Chcę nadal rozwijać swoje kompetencje.",
    "skills": [
      {
      title: "Vue",
      description:
        "Posiadam doświadczenie zawodowe w pracy z frameworkiem Vue i Vue 3. W trakcie mojej kariery zawodowej stworzyłem strony opartę o technologię w Nuxt, co pozwoliło mi na rozwinięcie umiejętności w pracy z dynamicznymi stronami internetowymi. Ponadto, pisałem własne projekty wykorzystując Nuxt 3, Vue 3 i TypeScript, co umożliwiło mi poznanie najlepszych praktyk i metodologii w pracy z tymi technologiami. W mojej pracy wykorzystuję swoje umiejętności programistyczne w TypeScript, co pozwala mi na zwiększenie jakości kodu oraz ułatwienie pracy w zespole.",
      gradient:
        "radial-gradient( circle farthest-corner at 10% 20%,  rgb(21 171 91) 0%, rgb(16 102 102) 90% )",
      icon: "/skills/vue.png",
    },
    {
      title: "Typescript",
      description: "TypeScript to potężny język programowania, który jest nadrzędnym zbiorem języka JavaScript i oferuje dodatkowe funkcje takie jak statyczne typowanie, klasy i interfejsy. Został zaprojektowany w celu ułatwienia pisania skalowalnego i łatwego do utrzymania kodu, wyłapując błędy na etapie kompilacji, a nie uruchamiania. TypeScript obsługuje również nowoczesne funkcje języka JavaScript i transpiluje kod na wiele wersji języka JavaScript, co czyni go moim wyborem do tworzenia aplikacji internetowych.",
      gradient: "linear-gradient(to right, #0d3566 0%, #021226 100%)",
      icon: "/skills/typescript.png",
    },
    {
      title: "Rust",
      description: "Rust to nowoczesny, wysokowydajny język programowania zaprojektowany do programowania na poziomie systemowym, łączący kontrolę na niskim poziomie jak w językach C i C++ z nowoczesnymi funkcjami językowymi, takimi jak bezpieczeństwo pamięci, równoległość i abstrakcje o zerowym koszcie. Jego nacisk na szybkość, niezawodność i bezpieczeństwo czyni go popularnym wyborem do tworzenia szybkich i wydajnych oprogramowań, zwłaszcza dla programowania systemowego i aplikacji internetowych. Rust jest moim ulubionym językiem programowania, a ja ciągle rozwijam swoje umiejętności w tym języku. Moim głównym celem jest napisanie wydajnej aplikacji Tauri.",
      gradient: "linear-gradient( 135deg, #F97794 10%, #623AA2 100%)",
      icon: "/skills/rust.png",
    },
    {
      title: "Laravel",
      description: "Laravel to popularny, otwarty framework webowy dla języka PHP, zaprojektowany w celu uproszczenia i przyspieszenia tworzenia aplikacji internetowych za pomocą ekspresyjnej składni, solidnych funkcji i modułowej architektury. Oferuje różnorodne narzędzia i funkcje do obsługi typowych zadań związanych z tworzeniem stron internetowych, takie jak routowanie, uwierzytelnianie, zarządzanie bazami danych i szablony, co czyni go preferowanym wyborem do tworzenia wysokiej jakości, skalowalnych i łatwych do utrzymania aplikacji internetowych.",
      gradient:
        "linear-gradient(-20deg, #b59eae, rgba(0, 0, 0, 0) 25%), linear-gradient(-100deg, #e8bea6, #e8bea6 0%, #f4a771 50%, #f65773)",
      icon: "/skills/laravel.png",
    },
    {
      title: "Database",
      description: "W mojej karierze zawodowej korzystałem z kilku rodzajów baz danych, takich jak: MySQL - powszechnie używany, otwartoźródłowy system zarządzania relacyjnymi bazami danych, który zapewnia solidne i skalowalne rozwiązanie do zarządzania i przechowywania danych strukturalnych. Firebase to platforma oparta na chmurze, która oferuje wiele usług do budowania aplikacji mobilnych i webowych, w tym baz danych czasu rzeczywistego, uwierzytelnianie użytkowników i hosting. Redis to szybka i elastyczna pamięć przechowująca dane w pamięci, która może być używana jako baza danych, pamięć podręczna i broker wiadomości, oferując wysoką wydajność i skalowalność dla różnych przypadków użycia.",
      gradient: "linear-gradient(to right, #3ea555 0%, #041c0a 100%)",
      icon: "/skills/database.png",
    },
    {
      title: "Linux/wsl2",
      description: "Używam Linuxa do wszystkich moich projektów. Uważam, że to najlepszy wybór dla każdego programisty. Jestem niezwykle zadowolony, że technologia Proton szybko się rozwija 😋.",
      gradient: "linear-gradient( 135deg, #424242 10%, #161616 100%)",
      icon: "/skills/linux.png",
    },
    {
      title: "Workflow ",
      description: "Dzięki mojemu doświadczeniu w pracy z Jirą, jestem biegły w zarządzaniu i śledzeniu postępu oraz przepływu pracy projektowej. Posiadam rozległe doświadczenie w używaniu Git do kontroli wersji, co umożliwia współpracę i zorganizowane tworzenie oprogramowania. Potrafię wprawnie konfigurować i uruchamiać ciągłą integrację (CI), która automatyzuje proces budowania, testowania i wdrażania oprogramowania, poprawiając efektywność i zmniejszając błędy.",
      gradient: "linear-gradient( 135deg, #2d85fb 10%, #093376 100%)",
      icon: "/skills/jira.png",
    },
    {
      title: "Docker",
      description: "Docker to platforma do tworzenia, wdrażania i uruchamiania aplikacji w kontenerach, zapewniająca lekkie i wydajne narzędzie do pakowania i wysyłania oprogramowania. Nadal uczę się i odkrywam tę technologię.",
      gradient: "linear-gradient( 135deg, #005168 10%, #161616 100%)",
      icon: "/skills/docker.png",
    },
    ]
  }
}

</i18n>
