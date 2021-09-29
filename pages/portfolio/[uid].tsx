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


type props = {
    content: PrismicDataInterface<PrismicDataPortfolio>,
}

// @ts-ignore
const View: FunctionComponent<props> = ({content}) => {
    const item = content.data;
    const seoData: seo['seo'] = {
        title: RichText.asText(item.seo_title),
        description: RichText.asText(item.seo_description),
        image: {src: item.seo_image.url, alt: item.seo_image.alt},
        dateModified: content.first_publication_date,
        datePublished: content.last_publication_date,
    }

    useEffect(() => {
        highlight.highlightAll();
    }, [])

    return (
        <Layout padding={false} fluid={true} backgroundEffect={false}>
            <Head seo={seoData} type="article"/>

            <div className="w-full flex flex-col justify-between default-screen-height">
                <Container className="mt-5">

                    <h1 className="font-display font-semibold text-2xl">{RichText.asText(item.title)}</h1>
                    <p className="text-md font-normal">{RichText.asText(item.short)}</p>
                    {/*<div>{item.type}</div>*/}
                </Container>
                <div className="w-full h-full max-h-96 relative mt-20">
                    <Image src={item.image.url} className="z-10" layout="fill" objectFit="cover"/>
                </div>
            </div>

            <div className="bg-white py-8">
                <Container>
                    <div className="text-secondary flex flex-wrap">
                        <div className="w-1/2 sm:w-1/4">
                            <p className="uppercase font-semibold text-xl">
                                Role
                            </p>
                            <p className="font-normal">{item.type}</p>
                        </div>

                        <div className="w-1/2 sm:w-1/4">
                            <p className="uppercase font-semibold text-xl">
                                Date
                            </p>
                            <p>{new Date(item.created).toISOString().slice(0, 10)}</p>
                        </div>

                        <div className="w-1/2 sm:w-1/4 mt-3 sm:mt-0">
                            <p className="uppercase font-semibold text-xl">
                                Overview
                            </p>
                            <p className="font-normal">{RichText.asText(item.seo_title)}</p>
                        </div>

                        <div className="w-1/2 sm:w-1/4 mt-3 sm:mt-0">
                            <p className="uppercase font-semibold text-xl">
                                Technology
                            </p>
                            <p>{new Date(item.created).toISOString().slice(0, 10)}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Image src={item.responsive_device_mockup.url} alt={item.responsive_device_mockup.alt}
                               width={1800} height={633} layout="responsive" objectFit="contain"/>
                    </div>
                </Container>

            </div>
            <Container>
                <div className={clsx("py-8 max-w-5xl mx-auto", styles.content)}>
                    {/*@ts-ignore*/}
                    <RichText htmlSerializer={htmlSerializer} render={item.content}/>
                </div>
            </Container>
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

