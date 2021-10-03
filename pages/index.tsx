import type {FunctionComponent} from 'react'
import type {GetStaticProps} from 'next'
import Head from '../components/head/head'
import PageCarousel from '../components/pageCarousel/pageCarusel'
import Layout from "../components/layout/base";
import ContentInterface from '../public/languages/index/type'
import About from "../components/pageCarouselItem/index/about";
import Skills from "../components/pageCarouselItem/index/skills";
import {getAbsoluteURL} from "../helpers/url";
import Contact from "../components/pageCarouselItem/index/contact";
import {CarouselItem} from "../types/carusel";


type props = {
    content: ContentInterface,
}

const Home: FunctionComponent<props> = ({content}) => {
    const items: CarouselItem[] = [
        {
            id: 1,
            name: 'Home',
            renderItem: (<About content={content.home}/>)
        },
        {
            id: 2,
            name: 'Skills',
            renderItem: (<Skills content={content.skills}/>)
        },
        {
            id: 3,
            name: 'Contact',
            renderItem: (<Contact content={content.contact}/>)
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


