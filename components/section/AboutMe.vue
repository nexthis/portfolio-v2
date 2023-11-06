<script setup lang="ts">

</script>

<template>
  <section class="pb-20 2xl:pb-40 overflow-hidden">
    <div class="container px-4 mx-auto">
      <div class="max-w-2xl mx-auto text-center">
        <span class="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br magic-text">Zacznimy wspułprace!</span>
        <h2 class="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
          Poznajmy się jeszcze lepiej!
        </h2>
        <p class="max-w-xl mx-auto mb-14 text-xl text-gray-200">
          Jeśli szukasz specjalisty do stworzenia nowoczesnej strony internetowej, to koniecznie musisz zobaczyć moje portfolio!
        </p>
        <div class="inline-flex pt-14 mb-14 items-center border-t w-64 border-gray-500" />
        <div class="max-w-xl mx-auto">
          <p class="mb-6 text-justify text-xl text-gray-200">
            Jestem programista z 4-letnim doświadczeniem w tworzeniu
            aplikacji webowych i desktopowych.
          </p>
          <p class="mb-6 text-justify text-xl text-gray-200">
            Specjalizuję się w
            technologiach takich jak Vue.js, TypeScrip, Node Js, Directus, Laravel
          </p>
          <p class="mb-6 text-justify text-xl text-gray-200">
            Miałem okazję tworzyć i współpracować z wieloma firmami i instytucjami, co dało mi możliwość
            pracy zarówno w różnych projektach publicznych, jak i wewnętrznych.
          </p>

          <p class="mb-6 text-justify text-xl text-gray-200">
            Moją drugą pasją, obok programowania, jest psychologia, która pomaga
            mi lepiej komunikować się z moimi klientami i współpracownikami.
          </p>

          <div class="mt-20 text-center">
            <NuxtLink class="inline-block py-4 px-12 text-white font-bold bg-primary hover:bg-primary-600 rounded-full" href="/test" data-config-id="primary-action">
              Kontakt
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.magic-text {
    animation: background-pan 3s linear infinite;
    background: linear-gradient(to right, #00da89, #06754d, #aeffe1, #00da89);
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
}

@keyframes background-pan {
    from {
      background-position: 0% center;
    }

    to {
      background-position: -200% center;
    }
  }

</style>
