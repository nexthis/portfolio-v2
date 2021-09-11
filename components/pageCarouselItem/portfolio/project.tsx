import {FunctionComponent} from "react";
import Image from "next/image";
import {RichText, RichTextBlock} from 'prismic-reactjs'
import Link from "next/link";
import style from './project.module.scss';

type props = {
    item: {
        data: {
            created: string,
            content: RichTextBlock,
            type: string,
            image: {
                alt: string,
                url: string,
                dimensions: {
                    height: number
                    width: number
                }
            },
            title: RichTextBlock,
            website_url: {
                link_type: string
                target: string
                url: string
            },

        }
        uid: string,
    },
}

const Project: FunctionComponent<props> = ({item}) => {
    console.log(item)

    return (
        <div className="h-full w-full relative flex items-center">

            <div className={style.title}>

                {/*@ts-ignore*/}
                <h2 className="font-display text-9xl">{RichText.asText(item.data.title)}</h2>
                <div>{item.data.type}</div>
            </div>
            <div className={style.image}>
                <Link href="portfolio/[uid]" as={`/portfolio/${item.uid}`} >
                    <a className="block">
                        <Image src={item.data.image.url} layout="fill" objectFit="cover"/>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Project;