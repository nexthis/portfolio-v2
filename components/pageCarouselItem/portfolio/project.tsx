import {FunctionComponent} from "react";
import Image from "next/image";
import {RichText, RichTextBlock} from 'prismic-reactjs'
import Link from "next/link";
import style from './project.module.scss';
import Container from "../../container/container";
import {PrismicDataInterface, PrismicDataPortfolio} from "../../../types/prismic";

type props = {
    item: PrismicDataInterface<PrismicDataPortfolio>,
}

const Project: FunctionComponent<props> = ({item}) => {
    console.log(item)
    return (
        <div className="h-full w-full flex flex-col justify-between">
            <Container className="mt-5">

                <h2 className="font-display font-semibold text-2xl">{RichText.asText(item.data.title)}</h2>
                <p className="text-md font-normal">{RichText.asText(item.data.short)}</p>
                {/*<div>{item.data.type}</div>*/}
            </Container>
            <div className="w-full h-full max-h-96 relative mt-20">
                <Link href="portfolio/[uid]" as={`/portfolio/${item.uid}`}>
                    <a className="block">
                        <Image src={item.data.image.url} className="z-10" layout="fill" objectFit="cover"/>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Project;