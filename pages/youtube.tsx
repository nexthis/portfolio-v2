import type {FunctionComponent} from 'react'
import type {GetStaticProps} from 'next'
import Head from '../components/head/head'
import Layout from "../components/layout/base";
import ContentInterface from '../public/languages/index/type'

type props = {
    //content: ContentInterface,
}

const Portfolio: FunctionComponent<props> = ({}) => {
    return (
        <Layout>

        </Layout>
    )
}
export default Portfolio;

// export const getStaticProps: GetStaticProps = async (context) => {
//     const data = await import(`/assets/languages/index/${context.locale}.json`);
//     return {
//         props: {
//             content: data.default,
//         },
//     }
// }




