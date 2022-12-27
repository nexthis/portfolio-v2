<template>
  <Head>
    <!--    Base-->
    <Title>Paweł Romanowski - {{ title }}</Title>
    <Meta charset="UTF-8" />
    <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <Meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <Meta name="description" :content="description" />

    <!--    Control the behavior of search engine crawling and indexing-->
    <Meta name="robots" content="index,follow" />
    <Meta name="googlebot" content="index,follow" />

    <!--    Facebook Open Graph-->
    <Meta property="og:url" :content="url.href" />
    <Meta property="og:type" :content="type" />
    <!--    <Meta property="og:title" content={seo.title}/>-->
    <!--    <Meta property="og:image" content={getImageUrl(seo.image.src)}/>-->
    <!--    <Meta property="og:image:alt" content={seo.image.alt}/>-->
    <Meta property="og:description" :content="description" />
    <!--    <Meta property="og:locale" content={lang[0]}/>-->
    <!--    <Meta property="og:locale:alternate" content={lang[1]}/>-->
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
    <!--  <meta name="twitter:card" content="summary_large_image"/>-->
    <!--  <meta name="twitter:url" content={getAbsoluteURL(router.asPath)}/>-->
    <!--  <meta name="twitter:title" content={seo.title}/>-->
    <!--  <meta name="twitter:description" content={seo.description}/>-->
    <!--  <meta name="twitter:image" content={getImageUrl(seo.image.src)}/>-->
    <!--  <meta name="twitter:image:alt" content={seo.image.alt}/>-->

    <!--   Schema JSON LD -->
    <!--  <script-->
    <!--      type="application/ld+json"-->
    <!--      dangerouslySetInnerHTML={{__html: JSON.stringify(generateJsonLD(seo, type))}}-->
    <!--  />-->
  </Head>
</template>

<script setup lang="ts">
const {
  type = "article",
  description,
  title,
} = defineProps<{
  title: string;
  description: string;
  type?: "person" | "article";
}>();

const router = useRouter();
const config = useRuntimeConfig();
//console.log(router.currentRoute.value)
const url = new URL(router.currentRoute.value.fullPath, config.public.baseUrl);

console.log(config.public.baseUrl);
</script>

<style scoped></style>
