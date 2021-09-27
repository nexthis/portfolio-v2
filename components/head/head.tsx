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
    return (
        <Head>
            {/*Base*/}
            <title>{baseName} - {seo.title}</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <meta name="description" content={seo.description}/>

            {/*PWA*/}
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="manifest" href="/manifest.json"/>

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
            <meta property="article:author" content="Paweł Romanowski"/>

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
                href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,300;0,400;0,600;0,700;1,400&display=optional"
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
                    "name": "Paweł Romanowski"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "",
                    "logo": {
                        "@type": "ImageObject",
                        "url": ""
                    }
                },
                "datePublished": ""
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
                "jobTitle": "Full-Stack Developer"
            }
    }
}


const getImageUrl = (src: string): string => {
    return isURL(src) ? src : getAbsoluteURL(src);
}

export default HeadComponent;