<template>
  <HeadStandard :title="t('seoTitle')" :description="t('seoDescription')" />
  <IndexMain />
  <IndexSkills />
  <IndexContact />
</template>
<script setup lang="ts">
const { t } = useI18n();
</script>

<i18n>
{
  "en": {
    "seoTitle": "Modern websites, ecommerce, blogs and more",
    "seoDescription": "Hello, my name is Pawel Romanowski I have been doing web programming for several years. I encourage you to browse through my portfolio and get to know me better.",
    "title": [
      "Web\n Developer",
      "Skills",
      "Contact",
    ],
  },
  "pl": {
    "seoTitle": "Nowoczesne strony internetowe, ecommerce, blogi i inne",
    "seoDescription": "Witam. Nazywam się Paweł Romanowski od kilku lat zajmuję się programowaniem stron internetowych. Zachęcam cię do przejrzenia mojego portfolio i poznania mnie lepiej.",
    "title": [
      "Web\n Developer",
      "Umiejętności",
      "Kontakt",
    ],
  }
}
</i18n>
