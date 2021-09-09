import type {FunctionComponent} from 'react'
import type {GetServerSideProps, GetStaticProps} from 'next'
import Head from '../../components/head/head'
import Layout from "../../components/layout/base";
import ContentInterface from '../../public/languages/index/type'
import {Client} from "../../helpers/prismic";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import PageCarousel from "../../components/pageCarousel/pageCarusel";
import {ReactSpringCarouselItem} from "react-spring-carousel-js/dist/types";
import Project from "../../components/pageCarouselItem/portfolio/project";

type props = {
    //content: ContentInterface,
}

// @ts-ignore
const View: FunctionComponent<props> = ({content, staticContent}) => {
    console.log(content)
    return (
        <Layout>
            <Head seo={staticContent.seo}/>

        </Layout>
    )
}
export default View;

export const getServerSideProps: GetServerSideProps = async (context) => {

    // @ts-ignore
    const {uid} = context.params;
    const client = Client();
    const staticContent = await import(`public/languages/index/${context.locale}.json`);

    const data = await client.getByUID('portfolio', uid, {lang: context.locale ?? 'pl'})

    return {
        props: {
            content: data,
            staticContent: staticContent.default
        },
    }
}




