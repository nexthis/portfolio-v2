import type {FunctionComponent, ReactElement, ReactNode} from 'react'
import type {GetServerSideProps, GetStaticProps} from 'next'
import Head from '../../components/head/head'
import Layout from "../../components/layout/base";
import ContentInterface from '../../public/languages/index/type'
import {Client} from "../../helpers/prismic";
import Prismic from "@prismicio/client";
import styles from '../../styles/portfolioView.module.scss'
import {RichText, RichTextBlock} from 'prismic-reactjs';
import Container from "../../components/container/container";
import Image from "next/image";
import type {PrismicDataInterface, PrismicDataPortfolio} from "../../types/prismic";
import {cloneElement, isValidElement, useEffect, useState} from "react";
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import clsx from "clsx";
import {debounce} from "../../helpers/event";
import Link from "next/link";
import Footer from "../../components/layout/footer";


type props = {
    content: PrismicDataInterface<PrismicDataPortfolio>,
}

// @ts-ignore
const View: FunctionComponent<props> = ({content}) => {
    const [height, setHeight] = useState(0);
    const item = content.data;
    console.log(item)
    const seoData: seo['seo'] = {
        title: RichText.asText(item.seo_title),
        description: RichText.asText(item.seo_description),
        image: {src: item.seo_image.url, alt: item.seo_image.alt},
        dateModified: content.first_publication_date,
        datePublished: content.last_publication_date,
    }

    useEffect(() => {
        highlight.highlightAll();
        calculateHeight();
        const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
        if (getMobileDetect(userAgent)) {
            window.addEventListener('resize', debounce(calculateHeight, 100))
        }

        return () => {
            window.removeEventListener('resize', calculateHeight)
        }
    }, [])

    const calculateHeight = () => {
        const element = document.querySelector<HTMLDivElement>('.hook_nav')!;
        const style = getComputedStyle(element);
        const height = element.clientHeight + parseInt(style.marginTop) + parseInt(style.marginBottom)
        setHeight(window.innerHeight - height)
    }

    return (
        <Layout padding={false} fluid={true} backgroundEffect={false}
                text={{text: RichText.asText(item.title).replace(' ', '\n '), align: 'left'}}>
            <Head seo={seoData} type="article"/>

            <div
                className="h-full w-full flex flex-col md:flex-row justify-between md:container md:mx-auto default-screen-height"
                style={{height: height}}>
                <div className="md:px-0 px-6 mt-5 md:flex md:justify-center md:w-1/2 md:flex-col">

                    <div className="md:flex md:flex-col md:justify-end">
                        <h2 className={clsx("font-display font-semibold", styles.title)}>{RichText.asText(item.title)}</h2>
                        <div className="lg:w-2/3 md:w-full">
                            <p className="text-md font-normal md:text-base lg:text-xl xl:text-2xl">{RichText.asText(item.short)}</p>
                        </div>
                        <a className="text-accent lg:text-xl lg:mt-5" href={item.website_url.url}
                           target={item.website_url.target} rel="noreferrer">Zobacz
                            stronę</a>
                    </div>
                </div>

                <div
                    className="w-full h-full max-h-96 relative mt-20 md:flex md:w-3/4  md:justify-center md:flex-col md:mt-0 sm:max-h-full md:ml-5 lg:w-1/2">
                    <div className="md:h-full md:mb-5 md:relative md:shadow-2xl">
                        <Image src={item.image.url} layout="fill" objectFit="cover"/>
                    </div>
                </div>
            </div>

            <div className="bg-white py-8">
                <Container>
                    <div className="text-secondary flex flex-wrap md:justify-around">
                        <div className="w-1/2 md:w-auto">
                            <p className="uppercase font-semibold text-xl lg:text-2xl">
                                Role
                            </p>
                            <p className="font-normal lg:text-lg">{item.type}</p>
                        </div>

                        <div className="w-1/2 md:w-auto">
                            <p className="uppercase font-semibold text-xl lg:text-2xl">
                                Date
                            </p>
                            <p className="lg:text-lg">{new Date(item.created).toISOString().slice(0, 10)}</p>
                        </div>

                        <div className="w-1/2 md:w-auto mt-3 md:mt-0">
                            <p className="uppercase font-semibold text-xl lg:text-2xl">
                                Technology
                            </p>
                            <div className="flex flex-wrap">
                                {item.technologies.map((item, index) => (

                                    <div key={index} className={index !== 0 ? "ml-1" : ''}>
                                        <Image src={`/icons/skills/${item.technology}.png`}
                                               alt={item.technology}
                                               className="rounded-full"
                                               width={32} height={32} layout="fixed" objectFit="contain"/>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-1/2 md:w-auto mt-3 md:mt-0">
                            <p className="uppercase font-semibold text-xl lg:text-2xl">
                                Overview
                            </p>
                            <p className={clsx("font-normal lg:text-lg", styles.overview)}>{RichText.asText(item.seo_title)}</p>
                        </div>

                    </div>
                    <div className="mt-4">
                        <Image src={item.responsive_device_mockup.url} alt={item.responsive_device_mockup.alt}
                               width={1800} height={633} layout="responsive" objectFit="contain"/>
                    </div>
                </Container>

            </div>
            <div className="background-gradient">
                <Container>
                    <div className={clsx("py-8 max-w-5xl mx-auto", styles.content)}>
                        {/*@ts-ignore*/}
                        <RichText htmlSerializer={htmlSerializer} render={item.content}/>
                    </div>
                </Container>
            </div>
            <Footer/>
        </Layout>
    )
}

// @ts-ignore
const htmlSerializer = (type, element, content, children, index) => {
    //console.log(type, element, content, children, index)
    if (type === 'preformatted') {
        const items = children.flat();
        if (items.length === 0) return;
        const isCode = items[0].toString().includes('code');
        if (isCode) {
            const lang = items.shift().toString().replace('code:', '');
            return (
                <pre className={clsx(lang, 'code')}>
                    <code>
                        {items}
                    </code>
                </pre>
            )
        }
    }

    // if(type === 'embed'){
    //     console.log(element, content, children, index)
    //     return (
    //         <iframe src={element.oembed.embed_url}/>
    //     )
    // }

    console.log(type)
}

const getMobileDetect = (userAgent: NavigatorID['userAgent']) => {
    const isAndroid = () => Boolean(userAgent.match(/Android/i))
    const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
    const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
    const isWindows = () => Boolean(userAgent.match(/IEMobile/i))
    const isSSR = () => Boolean(userAgent.match(/SSR/i))
    const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows())
    const isDesktop = () => Boolean(!isMobile() && !isSSR())
    return {
        isMobile,
        isDesktop,
        isAndroid,
        isIos,
        isSSR,
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');

    // @ts-ignore
    const {uid} = context.params;
    const client = Client();
    const data = await client.getByUID('portfolio', uid, {lang: context.locale ?? 'pl'})

    return {
        props: {
            content: data,
        },
    }
}


export default View;

