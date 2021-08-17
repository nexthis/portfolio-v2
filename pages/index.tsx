import type {FunctionComponent} from 'react'
import type {GetStaticProps} from 'next'
import Image from 'next/image'
import Head from '../components/head/head'
import {FullPage, FullPageItem} from '../components/fullPage/fullPage'
import clsx from 'clsx'
import Layout from "../components/layout/base";
import ContentInterface from '@assets/languages/index/type'
import profilePic from '@assets/image/me.jpg'

type props = {
    content: ContentInterface,
}

const Home: FunctionComponent<props> = ({content}) => {
    return (
        <Layout>
            <Head seo={content.seo}/>
            <FullPage>
                <FullPageItem>
                    <div className="h-full flex flex-col">
                        <div className='h-40 w-40 relative'>
                            <Image src={profilePic}  layout="responsive" alt="Picture of the author"  />
                        </div>
                        <div>
                            <h2>
                                {content.home.subTitle}
                            </h2>
                            <h1>
                                {content.home.title}
                            </h1>
                            <p>
                                {content.home.description}
                            </p>
                            <p>
                                <span>{content.home.contact.text}</span>
                                <a href="#">{content.home.contact.link}</a>
                            </p>
                        </div>
                    </div>
                </FullPageItem>
                <FullPageItem>
                    <div>Test1</div>
                </FullPageItem>
                <FullPageItem>
                    <div>Test2</div>
                </FullPageItem>
            </FullPage>
        </Layout>
    )
}
export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await import(`/assets/languages/index/${context.locale}.json`);
    return {
        props: {
            content: data.default,
        },
    }
}




