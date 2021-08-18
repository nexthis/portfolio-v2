import Head from 'next/head'
import type {FunctionComponent} from 'react'
import { useRouter } from 'next/router'
import {getAbsoluteURL} from "../../helpers/url";

type props  = {
    seo: seo['seo'],
    type?: 'website' | 'article' | 'video',
}

const HeadComponent: FunctionComponent<props> = (
    {seo, type = 'website', children}) => {
    const baseName = process.env.NEXT_PUBLIC_APP_NAME;
    const router = useRouter();
    const lang = router.locale === 'pl' ? ['pl_PL', 'en_US'] : ['en_US', 'pl_PL'] ;
    return (
        <Head>
            {/*Base*/}
            <title>{baseName} - {seo.title}</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <meta name="description" content={seo.description}/>

            {/*Phone color bar*/}
            <meta name="theme-color" content="#24262E"/>

            {/*Control the behavior of search engine crawling and indexing*/}
            <meta name="robots" content="index,follow"/>
            <meta name="googlebot" content="index,follow"/>

            {/*Facebook Open Graph*/}
            <meta property="og:url" content={getAbsoluteURL(router.pathname)}/>
            <meta property="og:type" content={type}/>
            <meta property="og:title" content={seo.title}/>
            <meta property="og:image" content={getAbsoluteURL(seo.image.src)}/>
            <meta property="og:image:alt" content={seo.image.alt}/>
            <meta property="og:description" content={seo.description}/>
            <meta property="og:locale" content={lang[0]}/>
            <meta property="og:locale:alternate" content={lang[1]} />
            <meta property="og:site_name" content="Paweł Romanowski - Portfolio" />
            <meta property="article:author" content="Paweł Romanowski"/>

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:url" content={getAbsoluteURL(router.pathname)}/>
            <meta name="twitter:title" content={seo.title}/>
            <meta name="twitter:description" content={seo.description}/>
            <meta name="twitter:image" content={getAbsoluteURL(seo.image.src)}/>
            <meta name="twitter:image:alt" content={seo.image.alt}/>
            <link rel="icon" href="/favicon.ico"/>
            {/*Fonts*/}
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
                rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet"/>

            {children}
        </Head>
    )
}

export default HeadComponent;