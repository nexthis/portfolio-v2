<template>
  <section
    aria-label="Contact"
    class="py-20 sm:py-32 md:grid md:grid-cols-12 lg:pb-32 xl:pb-36 text-white"
  >
    <div class="md:col-span-12">
      <h2
        class="text-white text-center uppercase font-bold text-3xl md:text-4xl xl:text-5xl"
      >
        {{ t("title") }}
      </h2>
      <p class="max-w-xl text-center mt-3 mx-auto">
        {{ t("description") }}
      </p>
    </div>

    <div class="mt-10 md:col-span-6">
      <a
        class="flex justify-center align-middle flex text-white items-center mt-10 lg:mt-20"
        href="tel:502572544"
      >
        <Icon
          class="mr-2"
          size="30"
          name="material-symbols:phone-android-outline-rounded"
        />
        <p class="lg:text-xl">+48 502 572 544 Dodaj większe ikony</p>
      </a>
      <a
        class="flex justify-center align-middle flex items-center mt-2 lg:mt-5 lg:mt-10"
        href="mailto:pawel.romanowski000@gmail.com"
      >
        <Icon class="mr-2" size="30" name="material-symbols:mail-outline" />
        <p class="lg:text-xl">pawel.romanowski000@gmail.com</p>
      </a>
      <a
        class="flex justify-center align-middle flex items-center mt-2 lg:mt-5 lg:mt-10"
        href="https://github.com/nexthis"
        target="_blank"
        rel="nofollow noreferrer"
      >
        <Icon class="mr-2" size="30" name="mdi:github" />
        <p class="lg:text-xl">nexthis</p>
      </a>
    </div>

    <div
      class="py-8 lg:pt-16 px-4 w-full mx-auto max-w-screen-md md:col-span-6"
    >
      <form action="#" class="space-y-6">
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-300"
            >Your email</label
          >
          <input
            type="email"
            id="email"
            class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
          <label
            for="subject"
            class="block mb-2 text-sm font-medium text-gray-300"
            >Subject</label
          >
          <input
            type="text"
            id="subject"
            class="block p-3 w-full text-sm rounded-lg border shadow-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
            placeholder="Let us know how we can help you"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-400"
            >Your message</label
          >
          <textarea
            id="message"
            rows="6"
            class="block p-2.5 w-full text-sm rounded-lg shadow-sm border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <button
          type="submit"
          class="py-3 px-5 ml-auto block text-sm font-medium text-center text-white rounded-lg sm:w-fit focus:ring-4 focus:outline-none bg-accent-600 hover:bg-accent-700 focus:ring-accent-800"
        >
          Send message
        </button>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>

<i18n>
{
  "en": {
    "title": "Contact",
    "description": "Are you interested in working with me? Do you want to evaluate the website? Would you like to consult a topic related to website development? Feel free to contact me!",
    "rodo": "I consent to the processing of my personal data, in particular for telephone and e-mail contact.",
    "name": "Name",
    "phone": "Phone number",
    "email": "E-Mail",
    "message": "Message",
    "send": "Not supported",
  },
  "pl": {
    "title": "Kontakt",
    "description": "Jesteś zainteresowany współpracą zemną? Chcesz wycenić stronę? Chciałbyś skonsultować się temat związany z tworzeniem stron internetowych? Zapraszam do kontaktu!",
    "rodo": "Wyrażam zgodę na przetwarzanie moich danych osobowych w szczególności na kontakt telefoniczny i mailowy.",
    "name": "Twoje imię",
    "phone": "Twój nr telefonu",
    "email": "Twój e–mail",
    "message": "Wiadomość",
    "send": "Nie obsługiwane ",
  }
}
</i18n>
