<script setup lang="ts">

useSeoGenerator({
  title: 'Paweł Romanowski - Web Development',
  description: 'Elevate Your Online Presence with a Skilled Full-Stack Developer from Poland! We Craft Custom Websites to Boost Your Business.',
  image: {
    src: '/images/indexSEO.png'
  },
  schemaOrg: [
    definePerson({
      name: 'Paweł Romanowski',
      image: '/images/indexSEO.png',
      sameAs: [
        'https://github.com/nexthis'
      ]
    })
  ]
})
</script>

<template>
  <div>
    <SuperExtraCanvas />
    <SectionPortfolioList />
    <SectionAboutMe />
    <NavigationFooter />
  </div>
</template>
