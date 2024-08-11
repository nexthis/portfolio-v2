<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })

useSeoGenerator({
  title: t('title'),
  description: t('description'),
  image: {
    src: '/images/indexSEO.png',
  },
  schemaOrg: [
    definePerson({
      name: 'Paweł Romanowski',
      image: '/images/indexSEO.png',
      sameAs: [
        'https://github.com/nexthis',
      ],
    }),
  ],
})
</script>

<template>
  <div>
    <div class="fit-size">
      <SuperExtraCanvas />
    </div>

    <SectionPortfolioList />
    <SectionAboutMe />
    <NavigationFooter />
  </div>
</template>

<style lang="scss" scoped>
.fit-size {
  height: 100vh;
  height: 100svh;

  width: 100%;
}
</style>

<i18n lang="json">
  {
    "en": {
      "title": "Paweł Romanowski - Web Development",
      "description": "Elevate Your Online Presence with a Skilled Full-Stack Developer from Poland! We Craft Custom Websites to Boost Your Business."
    },
    "pl": {
      "title": "Paweł Romanowski - Web Development",
      "description": "Zwiększ swoją obecność w Internecie dzięki wykwalifikowanemu programiście Full-Stack! Tworzymy niestandardowe strony internetowe, aby rozwijać Twój biznes."
    }
  }
  </i18n>
