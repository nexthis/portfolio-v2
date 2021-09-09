import {FunctionComponent} from "react";
import Image from "next/image";
import {RichText, RichTextBlock} from 'prismic-reactjs'
import Link from "next/link";

type props = {
    item: {
        data: {
            created: string,
            content: RichTextBlock,
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
        <div className="h-full w-full ">
            <div className="flex">
                <div>
                    <Link href="portfolio/[uid]" as={`/portfolio/${item.uid}`}>
                        {/*@ts-ignore*/}
                        <h2 className="font-display text-9xl">{RichText.asText(item.data.title)}</h2>
                    </Link>
                </div>
                <div className="w-1/2 ">
                    <Image src={item.data.image.url} layout="responsive" width={item.data.image.dimensions.width}
                           height={item.data.image.dimensions.height}/>
                </div>
            </div>
        </div>
    )
}

export default Project;