<template>
  <footer class="p-4 md:p-8 lg:p-10">
    <div class="mx-auto max-w-screen-xl text-center">
      <a href="#" class="flex justify-center items-center text-2xl font-semibol text-white">
        <img src="/pwa.svg" alt="Logo Paweł Romanowski" srcset="" class="mr-2 h-8">
        Paweł Romanowski
      </a>
      <p class="my-6 text-gray-400">
        Open-source library of over 400+ web components and interactive elements built for better web.
      </p>
      <ul class="flex flex-wrap justify-center items-center mb-6 text-white">
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Premium</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6 ">Campaigns</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Blog</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Affiliate Program</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">FAQs</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Contact</a>
        </li>
      </ul>
      <span class="text-sm sm:text-center text-gray-400">© 2021-{{ new Date().getFullYear() }} <a href="#" class="hover:underline">Paweł Romanowski</a>. All Rights Reserved.</span>
    </div>
  </footer>
</template>
