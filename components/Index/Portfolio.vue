<template>
  <section
    aria-label="Portfolio"
    class="h-full w-full py-20 sm:py-32 lg:pb-32 xl:pb-36"
  >
    <div class="max-w-7xl sm:px-6 lg:px-8 ml-auto md:text-right">
      <h2
        class="text-white uppercase font-bold text-3xl md:text-4xl xl:text-5xl"
      >
        {{ t("title") }}
      </h2>
      <p
        class="mt-4 ml-auto text-md md:text-xl tracking-tight text-gray-500 max-w-5xl"
      >
        {{ t("description") }}
      </p>
    </div>

    <div
      class="text-white p-2 lg:p-14 md:flex md:gap-5 lg:mt-5 lg:gap-10"
      v-if="!pending"
    >
      <nuxt-link
        :href="localePath(`/portfolio/${item.uid}`)"
        class="mt-6 border-gradient"
        v-for="item in data?.results"
      >
        <nuxt-img
          format="webp"
          :quality="90"
          class="w-full h-auto"
          sizes="sm:100vw lg:30vw"
          :src="asImageSrc(item.data.image) ?? ''"
          :alt="item.data.image.alt"
          placeholder
        />
      </nuxt-link>
    </div>

    <nuxt-link
      :href="localePath(`/portfolio`)"
      class="button block text-xl mt-5 mx-auto font-bold max-w-fit"
    >
      {{ t("see") }}
    </nuxt-link>
  </section>
</template>

<script setup lang="ts">
const { client, predicate, asText, asLink, asImageSrc } = usePrismic();
const { locale, t } = useI18n();

const localePath = useLocalePath();

const { data, refresh, pending } = useAsyncData("portfolio", () =>
  client.query(predicate.at("document.type", "portfolio"), {
    orderings: "my.portfolio.created desc",
    pageSize: 3,
    lang: locale.value ?? "pl",
  })
);
</script>

<style scoped lang="scss">
.border-gradient {
  position: relative;
  display: block;
  margin: 30px auto 0;
}

.border-gradient:before,
.border-gradient:after {
  content: "";
  position: absolute;
  left: -2px;
  top: -2px;
  background: linear-gradient(to right, #7b1fa2, #673ab7, #f48fb1, #7b1fa2);
  background-size: 400%;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: -1;
  animation: steam 20s linear infinite;
}

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

@keyframes steam {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

// .block:after {
//   filter: blur(50px);
// }
</style>

<i18n>
  {
    "en": {
      "title": "Portfolio",
      "description": "If you're looking for a specialist to create a modern and responsive website, you definitely need to check out my portfolio! See for yourself my skills in website design, knowledge of the latest technologies, and experience working with various clients and projects. This way, you can be sure that you're choosing a specialist who will meet your expectations.",
      "see": "See more",
    },
    "pl": {
      "title": "Portfolio",
      "description": "Jeśli szukasz specjalisty do stworzenia nowoczesnej i responsywnej strony internetowej, to koniecznie musisz zobaczyć moje portfolio! Sprawdź sam moje umiejętności w zakresie projektowania stron, znajomość najnowszych technologii oraz doświadczenie w pracy z różnymi klientami i projektami. Dzięki temu będziesz miał pewność, że wybierasz specjalistę, który sprosta Twoim oczekiwaniom.",
      "see": "Zobacz więcej",
    }
  }
  
  </i18n>
