import type {FunctionComponent} from 'react'
import type {GetServerSideProps, GetStaticProps} from 'next'
import Head from '../components/head/head'
import Layout from "../components/layout/base";
import ContentInterface from '../public/languages/index/type'
import {Client} from "../helpers/prismic";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';

type props = {
    //content: ContentInterface,
}

// @ts-ignore
const Portfolio: FunctionComponent<props> = ({content}) => {
    console.log(content)

    return (
        <Layout>
            {/*@ts-ignore*/}
            {content.results.map((item, key)=>(
                <div key={key}>{RichText.asText(item.data.title)}</div>
            ))}
        </Layout>
    )
}
export default Portfolio;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = Client();

    const data = await client.query(
        Prismic.Predicates.at('document.type', 'portfolio'),
        { orderings : '[my.portfolio.created desc]', lang: context.locale === 'pl' ? 'pl' : 'en-eu' }
    );

    return {
        props: {
            content: data,
        },
    }
}




