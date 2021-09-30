import Head from 'next/head'
import type {FunctionComponent} from 'react'
import {useRouter} from 'next/router'
import {getAbsoluteURL, isURL} from "../../helpers/url";

type props = {
    seo: seo['seo'],
    type?: 'person' | 'article' | 'video',
}

const HeadComponent: FunctionComponent<props> = (
    {seo, type = 'person', children}) => {
    const baseName = process.env.NEXT_PUBLIC_APP_NAME;
    const router = useRouter();
    const lang = router.locale === 'pl' ? ['pl_PL', 'en_US'] : ['en_US', 'pl_PL'];
    console.log(seo.dateModified)
    return (
        <Head>
            {/*Base*/}
            <title>{baseName} - {seo.title}</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <meta name="description" content={seo.description}/>

            {/*PWA*/}
            <link rel="manifest" href="/manifest.json"/>
            <link rel="apple-touch-icon" sizes="57x57" href="/icons/pwa/icon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60" href="/icons/pwa/icon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72" href="/icons/pwa/icon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="/icons/pwa/icon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="/icons/pwa/icon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/icons/pwa/icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="/icons/pwa/icon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/icons/pwa/icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/icons/pwa/icon-180x180.png"/>

            <link rel="icon" type="image/png" sizes="192x192" href="/icons/pwa/favicon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/pwa/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="/icons/pwa/favicon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/pwa/favicon-16x16.png"/>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="icon" href="/favicon.ico" type="image/x-icon"/>

            {/*Phone color bar*/}
            <meta name="theme-color" content="#24262E"/>

            {/*Control the behavior of search engine crawling and indexing*/}
            <meta name="robots" content="index,follow"/>
            <meta name="googlebot" content="index,follow"/>


            {/*Facebook Open Graph*/}
            <meta property="og:url" content={getAbsoluteURL(router.asPath)}/>
            <meta property="og:type" content={type}/>
            <meta property="og:title" content={seo.title}/>
            <meta property="og:image" content={getImageUrl(seo.image.src)}/>
            <meta property="og:image:alt" content={seo.image.alt}/>
            <meta property="og:description" content={seo.description}/>
            <meta property="og:locale" content={lang[0]}/>
            <meta property="og:locale:alternate" content={lang[1]}/>
            <meta property="og:site_name" content="Paweł Romanowski - Portfolio"/>
            {type === 'article' ? (
                <>
                    <meta property="article:author" content="Paweł Romanowski"/>
                    <meta property="article:modified_time"
                          content={new Date(seo.dateModified!).toISOString().slice(0, 10)}/>
                    <meta property="article:published_time"
                          content={new Date(seo.datePublished!).toISOString().slice(0, 10)}/>
                </>
            ) : null}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:url" content={getAbsoluteURL(router.asPath)}/>
            <meta name="twitter:title" content={seo.title}/>
            <meta name="twitter:description" content={seo.description}/>
            <meta name="twitter:image" content={getImageUrl(seo.image.src)}/>
            <meta name="twitter:image:alt" content={seo.image.alt}/>

            {/* Schema JSON LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(generateJsonLD(seo, type))}}
            />

            {/*Fonts*/}
            <link
                href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,300;0,400;0,600;0,700;0,800;1,400&display=swap"
                rel="stylesheet"/>

            {children}
        </Head>
    )
}

const generateJsonLD = (seo: props['seo'], type: props['type']): object => {
    switch (type) {
        case "article":
            return {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": seo.title,
                "description": seo.description,
                "image": getImageUrl(seo.image.src),
                "author": {
                    "@type": "Person",
                    "name": "Paweł Romanowski",
                    "url": getAbsoluteURL('/'),
                },
                "publisher": {
                    "@type": "Person",
                    "name": "Paweł Romanowski",
                    "logo": {
                        "@type": "ImageObject",
                        "url": getAbsoluteURL('/image/seo/logo.png')
                    }
                },
                "datePublished": new Date(seo.datePublished!).toISOString().slice(0, 10),
                "dateModified": new Date(seo.dateModified!).toISOString().slice(0, 10)
            }
        case "video":
            return {}
        case "person":
        default:
            return {
                "@context": "https://schema.org/",
                "@type": "Person",
                "name": "Paweł Romanowski",
                "url": getAbsoluteURL('/'),
                "image": getImageUrl(seo.image.src),
                "sameAs": [
                    getAbsoluteURL('/'),
                    "https://github.com/nexthis"
                ],
                "jobTitle": "Full-Stack Developer",
                "email": "pawel.romanowski000@gmail.com",
                "telephone": "502572544"
            }
    }
}


const getImageUrl = (src: string): string => {
    return isURL(src) ? src : getAbsoluteURL(src);
}

export default HeadComponent;