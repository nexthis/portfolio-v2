<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <footer
    class="flex flex-col items-center text-center bg-black"
  >
    <div class="container pt-9">
      <div class="mb-9 flex gap-4 justify-center">
        <div>Home</div>
        <div>Kontakt</div>
        <div>Portfolio</div>
        <NuxtLink :href="switchLocalePath( locale === 'en' ? 'pl' : 'en')">
          {{ locale === 'en' ? 'Polski' : 'English' }}
        </NuxtLink>
      </div>
    </div>

    <!--Copyright section-->
    <div
      class="w-full p-4 text-center bg-black text-neutral-200"
    >
      © 2021 -  {{ new Date().getFullYear() }} Paweł Romanowski. All Rights Reserved.
    </div>
  </footer>
</template>
