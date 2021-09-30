import {FunctionComponent} from "react";
import Image from "next/image";
import {RichText, RichTextBlock} from 'prismic-reactjs'
import Link from "next/link";
import style from './project.module.scss';
import Container from "../../container/container";
import {PrismicDataInterface, PrismicDataPortfolio} from "../../../types/prismic";
import clsx from "clsx";

type props = {
    item: PrismicDataInterface<PrismicDataPortfolio>,
}

const Project: FunctionComponent<props> = ({item}) => {
    console.log(item)
    return (
        <div className="h-full w-full flex flex-col md:flex-row justify-between md:container md:mx-auto">

            <div className="md:px-0 px-6 mt-5 md:flex md:justify-center md:w-1/2 md:flex-col">

                <div className="md:flex md:flex-col md:justify-end">
                    <h2 className={clsx("font-display font-semibold", style.title)}>{RichText.asText(item.data.title)}</h2>
                    <div className="lg:w-2/3 md:w-full">
                        <p className="text-md font-normal md:text-base lg:text-2xl">{RichText.asText(item.data.short)}</p>
                    </div>
                </div>
            </div>

            <div
                className="w-full h-full max-h-96 relative mt-20 md:flex md:w-3/4  md:justify-center md:flex-col md:mt-0 sm:max-h-full md:ml-5 lg:w-1/2">
                <div className="md:h-4/5 md:relative md:shadow-2xl">
                    <Link href="portfolio/[uid]" as={`/portfolio/${item.uid}`}>
                        <a className="block">
                            <Image src={item.data.image.url} layout="fill" objectFit="cover"/>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Project;