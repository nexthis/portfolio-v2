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
      <!-- <Meta property="og:locale" content="pl-PL" /> -->
      <Meta property="og:site_name" content="Paweł Romanowski - Portfolio" />

      <!--    {type === 'article' ? (-->
      <!--    <>-->
      <!--    <meta property="article:author" content="Paweł Romanowski"/>-->
      <!--    <meta property="article:modified_time"-->
      <!--          content={new Date(seo.dateModified!).toISOString().slice(0, 10)}/>-->
      <!--    <meta property="article:published_time"-->
      <!--          content={new Date(seo.datePublished!).toISOString().slice(0, 10)}/>-->

      <!--    ) : null}-->

      <!--   Twitter Card -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" :content="url.href" />
      <meta name="twitter:title" :content="title" />
      <meta name="twitter:description" :content="description" />
      <meta name="twitter:image" :content="getImage()" />
      <meta name="twitter:image:alt" :content="alt" />

      <!--   Schema JSON LD -->
      <!--  <script-->
      <!--      type="application/ld+json"-->
      <!--      dangerouslySetInnerHTML={{__html: JSON.stringify(generateJsonLD(seo, type))}}-->
      <!--  />-->
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
  }>(),
  {
    type: "person",
    alt: "Paweł Romanowski card",
  }
);

const { locale } = useI18n();
const router = useRouter();
const config = useRuntimeConfig();

const url = new URL(router.currentRoute.value.fullPath, config.public.baseUrl);

const getImage = () => {
  const link = props.image ?? "/ogImage.png";
  if (validURL(link)) {
    return link;
  }

  return new URL(link, url.href).href;
};
</script>

<style scoped></style>
