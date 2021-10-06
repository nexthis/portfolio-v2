import type {FunctionComponent} from 'react'
import type {GetServerSideProps, GetStaticProps} from 'next'
import Head from '../../components/head/head'
import Layout from "../../components/layout/base";
import ContentInterface from '../../public/languages/index/type'
import {Client} from "../../helpers/prismic";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import PageCarousel from "../../components/pageCarousel/pageCarusel";
import Project from "../../components/pageCarouselItem/portfolio/project";
import {CarouselItem} from "../../types/carusel";


type props = {
    //content: ContentInterface,
}

// @ts-ignore
const Index: FunctionComponent<props> = ({content, staticContent}) => {

    // @ts-ignore
    const items: CarouselItem[] = content.results.map((item, key) => ({
        id: key,
        name: RichText.asText(item.data.title),
        renderItem: (<Project item={item}/>)
    }))

    return (
        <Layout fluid={true} padding={false} text={{text: 'PORT \n FOLIO', align: 'left'}}>
            <Head seo={staticContent.seo}/>

            <PageCarousel items={items}/>
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




