import type {FunctionComponent} from 'react'
import type {GetServerSideProps, GetStaticProps} from 'next'
import Image from 'next/image'
import Head from '../components/head/head'
import {FullPage, FullPageItem} from '../components/fullPage/fullPage'
import clsx from 'clsx'
import style from '../styles/index.module.scss'
import Layout from "../components/layout/base";
import ContentInterface from '../public/languages/index/type'
import profilePic from '../public/image/me.png'
import {Client} from '../helpers/prismic'

type props = {
    content: ContentInterface,
}

const Home: FunctionComponent<props> = ({content}) => {
    return (
        <Layout>
            <Head seo={content.seo}/>
            <FullPage>
                <FullPageItem>
                    <div className="h-full flex flex-col justify-around md:flex-row-reverse md:items-center">
                        <div className='flex justify-center flex-1 h-full'>
                            <div className="h-full w-2/3">
                                <div className="aspect-w-4 aspect-h-5">
                                    <Image src={profilePic} className='rounded-full md:rounded-none' layout="fill" objectFit="fill"
                                           alt="Picture of the author"/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-9 flex-1">
                            <h2 className="font-display text-lg">
                                {content.home.subTitle}
                            </h2>
                            <h1 className={clsx(style.h1, 'font-display tracking-wider')}>
                                {content.home.title}
                            </h1>
                            <p className="text-lg tracking-tight md:w-1/2">
                                {content.home.description}
                            </p>
                            <p className="mt-3 text-sm">
                                <span>{content.home.contact.text}</span>
                                <br/>
                                <a href="#contact" className="text-accent">{content.home.contact.link}</a>
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
    const data = await import(`public/languages/index/${context.locale}.json`);
    return {
        props: {
            content: data.default,
        },
    }
}


