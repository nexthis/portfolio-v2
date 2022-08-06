<template>
  <div class="h-full w-full flex flex-col-reverse text-white justify-around flex-col md:flex-row">
    <div class="md:flex md:justify-center md:flex-col md:mr-5 md:w-1/3">
      <p class="font-semibold text-xl uppercase text-center md:text-4xl">{{ t('title') }}</p>
      <p class="max-w-sm text-center hidden lg:block mt-3 mx-auto">
        {{ t('description') }}
      </p>
      <a class="flex justify-center align-middle flex text-white items-center mt-5 lg:mt-10" href="tel:502572544">
        <phone-icon alt="phone" class="w-5 h-5 mr-2 "/>
        <p class="md:text-xl">+48 502 572 544</p>
      </a>
      <a class="flex justify-center align-middle flex items-center mt-2 md:mt-5 lg:mt-10"
         href="mailto:pawel.romanowski000@gmail.com">

        <email-icon class="w-5 h-5 mr-2"/>
        <p class="md:text-xl">pawel.romanowski000@gmail.com</p>
      </a>
      <a class="flex justify-center align-middle flex items-center mt-2 md:mt-5 lg:mt-10"
         href="https://github.com/nexthis"
         target="_blank"
         rel="nofollow noreferrer">
        <github-icon class="w-5 h-5 mr-2"/>
        <p class="md:text-xl">nexthis</p>
      </a>
    </div>

    <div class="md:flex md:justify-center md:flex-col md:ml-5 md:w-1/2">
      <h2 class="font-semibold text-xl uppercase text-center mt-3 md:text-4xl">{{t('title')}}</h2>
      <form class="">
        <div class="mt-6">
          <label class="uppercase">Twoje imię</label>
          <input name="name" class="w-full bg-transparent border-none outline-0">
          <div class="w-full bg-accent h-0.5"/>
        </div>

        <div class="mt-6">
          <label class="uppercase">Twój nr telefonu</label>
          <input name="phone" class="w-full bg-transparent border-none outline-0">
          <div class="w-full bg-accent h-0.5"/>
        </div>

        <div class="mt-6">
          <label class="uppercase">Twój e–mail</label>
          <input name="email" class="w-full bg-transparent border-none outline-0">
          <div class="w-full bg-accent h-0.5"/>
        </div>

        <div class="mt-6">
          <label class="uppercase">Wiadomość</label>
          <input name="message" class="w-full bg-transparent border-none outline-0">
          <div class="w-full bg-accent h-0.5"/>
        </div>
        <span class="text-xs">{{t('rodo')}}</span>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PhoneIcon from '@/assets/icons/phone.svg'
import EmailIcon from '@/assets/icons/email.svg'
import GithubIcon from '@/assets/icons/github.svg'
import {useI18n} from "vue-i18n";

const {t} = useI18n()
useNavigation(null, '/skills')

watchEffect(() => (
    useBackgroundText(t('title'))
))

</script>

<style scoped>

</style>
<i18n>
{
  "en": {
    "title": "Contact",
    "description": "Are you interested in working with me? Do you want to evaluate the website? Would you like to consult a topic related to website development? Feel free to contact me!",
    "rodo": "I consent to the processing of my personal data, in particular for telephone and e-mail contact."
  },
  "pl": {
    "title": "Kontakt",
    "description": "Jesteś zainteresowany współpracą zemną? Chcesz wycenić stronę? Chciałbyś skonsultować się temat związany z tworzeniem stron internetowych? Zapraszam do kontaktu!",
    "rodo": "Wyrażam zgodę na przetwarzanie moich danych osobowych w szczególności na kontakt telefoniczny i mailowy."
  }
}
</i18n>