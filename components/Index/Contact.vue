<template>
  <section
    aria-label="Contact"
    id="contact"
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

    <div
      class="md:col-span-5 grid grid-cols-2 gap-4 justify-center items-center max-w-md mx-auto mt-10 md:mt-0 pb-5 md:py-28"
    >
      <!-- <div class="col-span-2 text-center text-4xl mb-5 hidden lg:block">
        Informacje
      </div> -->
      <a class="flex flex-col items-center" href="tel:502572544">
        <div class="p-4 bg-primary-200 rounded-lg">
          <Icon
            size="50"
            name="material-symbols:phone-android-outline-rounded"
          />
        </div>
        <div class="mt-2 font-bold">+48 502 572 544</div>
      </a>

      <a
        class="flex flex-col items-center"
        href="https://github.com/nexthis"
        target="_blank"
      >
        <div class="p-4 bg-primary-200 rounded-lg">
          <Icon size="50" name="mdi:github" />
        </div>
        <div class="mt-2 font-bold">nexthis</div>
      </a>

      <a
        class="flex flex-col items-center"
        href="mailto:pawel.romanowski000@gmail.com"
      >
        <div class="p-4 bg-primary-200 rounded-lg">
          <Icon size="50" name="material-symbols:mail-outline" />
        </div>
        <div class="mt-2 font-bold text-center">
          pawel.romanowski000<br />@gmail.com
        </div>
      </a>

      <a
        class="flex flex-col items-center"
        href="https://github.com/nexthis"
        target="_blank"
      >
        <div class="p-4 bg-primary-200 rounded-lg">
          <Icon size="50" name="mdi:linkedin" />
        </div>
        <div class="mt-2 font-bold">linkedin</div>
      </a>
    </div>

    <div
      class="py-8 lg:pt-16 px-4 w-full mx-auto max-w-screen-md md:col-span-7"
    >
      <form action="#" class="space-y-6">
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-300"
            >{{ t("email") }}</label
          >
          <input
            type="email"
            id="email"
            class="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div>
          <label
            for="subject"
            class="block mb-2 text-sm font-medium text-gray-300"
            >{{ t("subject") }}</label
          >
          <input
            type="text"
            id="subject"
            class="block p-3 w-full text-sm rounded-lg border shadow-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
            :placeholder="t('subject-placeholder')"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-400"
            >{{ t("message") }}</label
          >
          <textarea
            id="message"
            rows="6"
            class="block p-2.5 w-full text-sm rounded-lg shadow-sm border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
            :placeholder="t('message-placeholder')"
          ></textarea>
        </div>
        <!-- {{ t("rodo") }} -->
        <button
          type="submit"
          disabled
          class="py-3 px-5 ml-auto block text-sm font-medium text-center text-white rounded-lg sm:w-fit focus:ring-4 focus:outline-none bg-accent-600 hover:bg-accent-700 focus:ring-accent-800 disabled:bg-accent-700"
        >
          {{ t("send") }}
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
    "subject": "Subject",
    "subject-placeholder": "Let me know how we can help you",
    "email": "E-Mail",
    "message": "Message",
    "message-placeholder": "Leave a comment...",
    "send": "Not supported",
  },
  "pl": {
    "title": "Kontakt",
    "description": "Jesteś zainteresowany współpracą zemną? Chcesz wycenić stronę? Chciałbyś skonsultować się temat związany z tworzeniem stron internetowych? Zapraszam do kontaktu!",
    "rodo": "Wyrażam zgodę na przetwarzanie moich danych osobowych w szczególności na kontakt telefoniczny i mailowy.",
    "subject": "Temat",
    "subject-placeholder": "Daj mi znać, jak możemy Ci pomóc",
    "email": "Twój e–mail",
    "message": "Wiadomość",
    "message-placeholder": "Opisz szczegóły...",
    "send": "Nie obsługiwane ",
  }
}
</i18n>
