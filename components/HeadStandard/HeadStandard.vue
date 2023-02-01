<template>
  <Html :lang="locale">
    <Head>
      <!--Base-->
      <Title>Paweł Romanowski - {{ title }}</Title>
      <Meta charset="UTF-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Meta name="description" :content="description" />

      <!--    Control the behavior of search engine crawling and indexing-->
      <Meta name="robots" content="index,follow" />
      <Meta name="googlebot" content="index,follow" />

      <!--    Facebook Open Graph-->
      <Meta property="og:url" :content="url.href" />
      <Meta property="og:type" :content="type" />

      <Meta property="og:title" :content="title" />
      <Meta property="og:image" :content="getImage()" />
      <Meta property="og:image:alt" :content="alt" />

      <Meta property="og:description" :content="description" />
      <Meta property="og:locale" content="pl-PL" />
      <Meta property="og:locale:alternate" content="en_US" />
      <Meta property="og:site_name" content="Paweł Romanowski - Portfolio" />

      <template v-if="type === 'article'">
        <Meta property="article:author" content="Paweł Romanowski" />
        <Meta
          property="article:modified_time"
          :content="new Date(modifiedTime!).toISOString()"
        />
        <Meta
          property="article:published_time"
          :content="new Date(publishedTime!).toISOString()"
        />
      </template>

      <!--   Twitter Card -->
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:url" :content="url.href" />
      <Meta name="twitter:title" :content="title" />
      <Meta name="twitter:description" :content="description" />
      <Meta name="twitter:image" :content="getImage()" />
      <Meta name="twitter:image:alt" :content="alt" />
    </Head>
  </Html>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    type?: "person" | "article";
    image?: string;
    alt?: string;
    modifiedTime?: string | Date;
    publishedTime?: string | Date;
  }>(),
  {
    type: "person",
    alt: "Paweł Romanowski card",
  }
);

const { locale } = useI18n();
const router = useRouter();
const config = useRuntimeConfig();
const img = useImage();

const url = new URL(router.currentRoute.value.fullPath, config.public.baseUrl);

const getImage = () => {
  const link = props.image ?? "/ogImage.png";
  if (validURL(link)) {
    return link;
  }

  return new URL(link, url.href).href;
};

const createSchema = () => {
  const link = props.image ?? "/ogImage.png";

  if (props.type === "article") {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: props.title,
      image: [
        new URL(img(link, { width: 630, height: 630 }), url.href).href,
        new URL(img(link, { width: 630, height: 472 }), url.href).href,
        new URL(img(link, { width: 630, height: 354 }), url.href).href,
      ],
      datePublished: new Date(props.publishedTime!).toISOString(),
      dateModified: new Date(props.modifiedTime!).toISOString(),
      author: [
        {
          "@type": "Person",
          name: "Paweł Romanowski",
          url: "https://pawel-romanowski.pl/",
        },
      ],
    };
  }

  if (props.type === "person") {
    return {
      "@context": "http://schema.org/",
      "@type": "Person",
      name: "Paweł Romanowski",
      image: [
        new URL(img(link, { width: 630, height: 630 }), url.href).href,
        new URL(img(link, { width: 630, height: 472 }), url.href).href,
        new URL(img(link, { width: 630, height: 354 }), url.href).href,
      ],
      url: "https://pawel-romanowski.pl/",
      jobTitle: "Full-stack developer",
      sameAs: ["https://github.com/nexthis"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gdańsk",
        addressCountry: "Polska",
      },
      email: "pawel.romanowski000@gmail.com",
      birthPlace: "Gdańsk",
      telephone: "502572544",
    };
  }

  return {};
};

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(createSchema()),
    },
  ],
});
</script>

<style scoped></style>
