import Head from 'next/head'
import type {FunctionComponent} from 'react'
import { useRouter } from 'next/router'

type props  = {
    seo: seo['seo'],
    type?: 'website' | 'article' | 'video',
}

const HeadComponent: FunctionComponent<props> = (
    {seo, type = 'website', children}) => {
    const baseName = process.env.NEXT_PUBLIC_APP_NAME;
    const router = useRouter()
    return (
        <Head>
            {/*Base*/}
            <title>{baseName} - {seo.title}</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport"
                  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <meta name="description" content={seo.description}/>

            {/*Phone color bar*/}
            <meta name="theme-color" content="#4285f4"/>

            {/*Control the behavior of search engine crawling and indexing*/}
            <meta name="robots" content="index,follow"/>
            <meta name="googlebot" content="index,follow"/>

            {/*Facebook Open Graph*/}
            <meta property="og:url" content="https://example.com/page.html"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={seo.title}/>
            <meta property="og:image" content="https://example.com/image.jpg"/>
            <meta property="og:image:alt" content="A description of what is in the image (not a caption)"/>
            <meta property="og:description" content={seo.description}/>
            <meta property="og:site_name" content="Site Name"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="article:author" content="Paweł Romanowski"/>

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:site" content="@site_account"/>
            <meta name="twitter:creator" content="@individual_account"/>
            <meta name="twitter:url" content="https://example.com/page.html"/>
            <meta name="twitter:title" content="Content Title"/>
            <meta name="twitter:description" content={seo.description}/>
            <meta name="twitter:image" content="https://example.com/image.jpg"/>
            <meta name="twitter:image:alt"
                  content="A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters."/>
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