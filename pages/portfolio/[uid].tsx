import type {FunctionComponent} from 'react'
import type {GetServerSideProps, GetStaticProps} from 'next'
import Head from '../../components/head/head'
import Layout from "../../components/layout/base";
import ContentInterface from '../../public/languages/index/type'
import {Client} from "../../helpers/prismic";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import Container from "../../components/container/container";
import Image from "next/image";
import type {PrismicDataInterface, PrismicDataPortfolio} from "../../types/prismic";
import {useEffect, useState} from "react";
import {debounce} from "../../helpers/event";


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
    }

    return (
        <Layout padding={false} fluid={true}>
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

            <div className="bg-white">
                <Container>
                    <div className="text-primary">
                        <div className="uppercase">
                            Role
                        </div>
                    </div>

                    <Image src={item.responsive_device_mockup.url} alt={item.responsive_device_mockup.alt}
                           width={1800} height={633} layout="responsive" objectFit="contain"/>
                </Container>
            </div>
            <Container>
                <RichText render={item.content}/>
            </Container>
        </Layout>
    )
}
export default View;

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




