<script setup lang="ts">

useSeoGenerator({
  title: 'Paweł Romanowski - Developer',
  description: 'Elevate Your Online Presence with a Skilled Full-Stack Developer from Poland! We Craft Custom Websites to Boost Your Business.',
  schemaOrg: [
    definePerson({
      name: 'Paweł Romanowski',
      image: '/me.png',
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
    <NavigationFooter />
  </div>
</template>
