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
const Index: FunctionComponent<props> = ({content, staticContent}) => {
    console.log(content)
    // @ts-ignore
    const items: ReactSpringCarouselItem[] = content.results.map((item,key) =>({
        id: key,
        renderItem: (<Project item={item}/>)
    }))

    return (
        <Layout>
            <Head seo={staticContent.seo}/>
            <PageCarousel items={items}>

            </PageCarousel>
        </Layout>
    )
}
export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');

    const client = Client();
    const staticContent = await import(`public/languages/index/${context.locale}.json`);

    const data = await client.query(
        Prismic.Predicates.at('document.type', 'portfolio'),
        { orderings : '[my.portfolio.created desc]', lang: context.locale ?? 'pl' }
    );

    return {
        props: {
            content: data,
            staticContent: staticContent.default
        },
    }
}




