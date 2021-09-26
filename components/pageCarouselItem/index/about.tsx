import type {FunctionComponent} from "react";
import ContentInterface from "../../../public/languages/index/type";
import Image from "next/image";
import profilePic from "../../../public/image/me.png";
import clsx from "clsx";
import style from "../../../styles/index.module.scss";

type props = {
    content: ContentInterface['home'],
}


const About: FunctionComponent<props> = ({content}) => {

    return (
        <div
            className="h-full w-full flex flex-col flex-col-reverse justify-around md:flex-row-reverse md:items-center">
            <div className='flex justify-center flex-1 relative h-full w-full'>
                <Image src={profilePic} className='rounded-full md:rounded-none pointer-events-none z-10'
                       objectFit="contain"
                       layout="fill"
                    // width={750}
                       quality={90}
                       loading="eager"
                       alt="Picture of the author"/>
            </div>
            <div className="mb-9 mt-5 flex-1">
                <h1 className={clsx(style.h1, 'font-display font-semibold tracking-wider mb-2.5 uppercase')}>
                    {content.title}
                </h1>
                <p className="text-md tracking-tight uppercase md:w-1/2">
                    {content.description}
                </p>
                <p className="mt-3 text-sm">
                    <span>{content.contact.text}</span>
                    <br/>
                    <a href="#contact" className="text-accent">{content.contact.link}</a>
                </p>
            </div>
        </div>
    )
}

export default About;