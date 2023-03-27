<template>
  <header>
    <nav
      class="flex-auto flex items-center pb-5 pt-5 md:pt-10 xl2:px-0 md:px-5 px-3 mt-0 container mx-auto z-50"
    >
      <NuxtLink
        :to="localePath('/')"
        class="uppercase font-light flex justify-center items-center text-white uppercase text-xs sm:text-xl"
      >
        <div v-html="Logo" class="mr-2" />
        Paweł
        <span class="text-accent font-medium">Romanowski</span>
      </NuxtLink>

      <div class="flex-1" />

      <Switch
        v-model="enabled"
        @click="onLangChange"
        class="relative inline-flex h-[38px] w-[74px] text-white uppercase shrink-0 cursor-pointer bg-secondary rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span class="sr-only">Select Language</span>
        <div class="absolute left-0 top-0 w-1/2 h-full">
          <span class="block w-full h-full flex justify-center items-center"
            >pl</span
          >
        </div>
        <div class="absolute right-0 top-0 w-1/2 h-full">
          <span class="block w-full h-full flex justify-center items-center"
            >en</span
          >
        </div>
        <span
          aria-hidden="true"
          :class="enabled ? 'translate-x-9' : 'translate-x-0'"
          class="pointer-events-none flex justify-center items-center h-[34px] w-[34px] transform rounded-full bg-accent shadow-lg ring-0 transition duration-200 ease-in-out"
        >
          {{ locale }}
        </span>
      </Switch>

      <Menu class="relative text-white ml-2" as="div" v-slot="{ open }">
        <client-only>
          {{ animateMenu(open) }}
        </client-only>
        <MenuButton class="ml-2" aria-label="Menu">
          <span class="menu-1 block w-8 h-[4px] rounded-full bg-accent"></span>
          <span
            class="menu-2 block w-6 h-[4px] rounded-full mt-1.5 bg-accent ml-auto"
          ></span>
          <span
            class="menu-3 block w-8 h-[4px] rounded-full mt-1.5 bg-accent"
          ></span>
        </MenuButton>
        <MenuItems class="absolute right-0 mt-2 z-50" v-show="open" static>
          <MenuItem class="block bg-secondary px-2 py-1" v-slot="{ active }">
            <NuxtLink
              :class="{ 'bg-accent-700': active }"
              :to="localePath('/portfolio')"
            >
              Portfolio
            </NuxtLink>
          </MenuItem>
        </MenuItems>
      </Menu>
    </nav>
  </header>
  <main class="container mx-auto 2xl:px-0 md:px-8 px-6">
    <slot />
  </main>

  <footer class="bg-primary-400">
    <div
      class="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between"
    >
      <span class="text-sm sm:text-center text-primary-200"
        >© 2023 Paweł Romanowski All Rights Reserved.
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 text-sm text-primary-200 sm:mt-0"
      >
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">About</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Portfolio</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Contact</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
//Alternatively use svg import libcss
import Logo from "~/assets/icons/logo.svg?raw";
import { gsap } from "gsap";
import { Switch, Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const { locale } = useI18n();
const router = useRouter();

const enabled = ref(locale.value === "en");

const onLangChange = () => {
  router.push(switchLocalePath(enabled.value ? "pl" : "en"));
};

const animateMenu = (open: boolean) => {
  if (open) {
    gsap.to(".menu-1", { x: 0, y: 10, rotate: -45, duration: 0.2 });
    gsap.to(".menu-2", { x: 10, duration: 0.1, y: 0, rotate: 0, opacity: 0 });
    gsap.to(".menu-3", { x: 0, y: -10, rotate: 45, duration: 0.2 });
    return;
  }
  gsap.to(".menu-1", { x: 0, y: 0, rotate: 0, duration: 0.2 });
  gsap.to(".menu-2", { x: 0, duration: 0.1, y: 0, rotate: 0, opacity: 1 });
  gsap.to(".menu-3", { x: 0, y: 0, rotate: 0, duration: 0.2 });
};
</script>

<style scoped lang="scss">
main {
}
</style>
