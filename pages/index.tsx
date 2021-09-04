import type {FunctionComponent} from 'react'
import type {GetStaticProps} from 'next'
import Head from '../components/head/head'
import PageCarousel from '../components/pageCarousel/pageCarusel'
import Layout from "../components/layout/base";
import ContentInterface from '../public/languages/index/type'
import {ReactSpringCarouselItem} from "react-spring-carousel-js/dist/types";
import About from "../components/pageCarouselItem/index/about";
import Skills from "../components/pageCarouselItem/index/skills";


type props = {
    content: ContentInterface,
}

const Home: FunctionComponent<props> = ({content}) => {
    const items: ReactSpringCarouselItem[] = [
        {
            id: '1',
            renderItem: (<About content={content.home}/>)
        },
        {
            id: '2',
            renderItem: (<Skills content={content.skills}/>)
        }
    ]


    return (
        <Layout>
            <Head seo={content.seo}/>
            <PageCarousel items={items}>

            </PageCarousel>
        </Layout>
    )
}
export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await import(`public/languages/index/${context.locale}.json`);
    return {
        props: {
            content: data.default,
        },
    }
}


