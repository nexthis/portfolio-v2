<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()

useSeoGenerator({
  title: t('seoTitle'),
  description: t('seoDescription'),
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
  <section class="text-background-200 body-font relative fit-size flex items-center">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 magic-text">
          {{ t('title') }}
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          {{ t('description') }}
        </p>
      </div>
      <form action="https://submit-form.com/revwzlYl">
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-background-50">{{ t('name') }}</label>
                <input id="name" type="text" name="name" class="w-full bg-background-200 rounded border border-background-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-background-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-background-50">{{ t('email') }}</label>
                <input id="email" type="email" name="email" required class="w-full bg-background-200 rounded border border-background-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 text-base outline-none text-background-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-background-50">{{ t('message') }}</label>
                <textarea id="message" name="message" required class="w-full bg-background-200 rounded border border-background-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 h-32 text-base outline-none text-background-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div class="p-2 w-full flex items-center justify-center gap-10">
              <NuxtLink :href="localePath('/')" class="flex text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                {{ t('home') }}
              </NuxtLink>
              <button type="submit" class="flex text-white bg-primary-500 border-0 py-2 px-8 focus:outline-none hover:bg-primary-600 rounded text-lg">
                {{ t('send') }}
              </button>
            </div>
            <div class="p-2 w-full pt-8 mt-8 border-t border-white text-center">
              <a href="mailto:pawel.romanowski000@gmail.com" class="text-primary-500 block">pawel.romanowski000@gmail.com</a>
              <a href="tel:+48502572544" class="leading-normal text-primary-500 block my-5">
                502 572 544
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.fit-size {
  min-height: 100vh;
  min-height: 100svh;
}
</style>

<i18n lang="json">
  {
    "en": {
      "seoTitle": "Paweł Romanowski - Contact",
      "seoDescription": "Have questions, feedback, task, or inquiries? Reach me to us through my Contact Page. ",
      "title": "Contact",
      "description": "Send me a message through our contact form to get the conversation started!",
      "name": "Name",
      "email": "Email",
      "message": "Message",
      "send": "Send",
      "home": "Home"
    },
    "pl": {
      "seoTitle": "Paweł Romanowski - Kontakt",
      "seoDescription": "Masz pytania, uwagi, zadania lub zapytania? Skontaktuj się ze mną poprzez moją stronę kontaktową.",
      "title": "Kontakt",
      "description": "Wyślij mi wiadomość przez nasz formularz kontaktowy, aby rozpocząć rozmowę!",
      "name": "Imię",
      "email": "E-mail",
      "message": "Wiadomość",
      "send": "Wyślij",
      "home": "Strona główna"
    }
  }
  </i18n>
