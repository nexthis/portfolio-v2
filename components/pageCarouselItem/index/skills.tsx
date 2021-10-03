import type {FunctionComponent} from "react";
import ContentInterface from "../../../public/languages/index/type";
import Image, {ImageLoader} from 'next/image'
import {useMemo, useState} from "react";
import clsx from "clsx";
import {useMediaQuery} from '@react-hook/media-query'


type props = {
    content: ContentInterface['skills'],
}


const Skills: FunctionComponent<props> = ({content}) => {
    const mobile = useMediaQuery('(min-width: 768px)')

    return (
        <>
            {mobile ? <Desktop content={content}/> : <Mobile content={content}/>}
        </>
    )
}

const Mobile: FunctionComponent<props> = ({content}) => {
    const [selected, setSelected] = useState(content[0]);

    const onSkillChange = (item: ContentInterface['skills'][0]) => {
        setSelected(item);
    }

    return (
        <div className="flex flex-col justify-between h-full w-full ">
            <h2 className="sr-only">Skills</h2>
            <div className="flex flex-wrap justify-evenly mt-5">
                {selected.items.map((item, key) => (
                    <div key={key} className="p-2">
                        <div className="mx-auto" style={{height: 60, width: 60}}>
                            <Image src={item.image.src} alt={item.image.alt} className="rounded-full" height={60}
                                   width={60}/>
                        </div>
                        <p className="text-xl mt-1 text-center">{item.name}</p>
                    </div>
                ))}
            </div>
            <div className="col-span-2 max-h-32">
                <ul className="flex flex-wrap justify-around mb-5">
                    {useMemo(() => content.map((item, key) => (
                        <li onClick={() => onSkillChange(item)}
                            className={clsx('w-28 py-0.5 mt-3 border-accent border rounded-full text-center', item === selected ? 'bg-accent text-primary' : null)}
                            key={key}>
                            {item.name}
                        </li>
                    )), [selected])}

                </ul>
            </div>
        </div>
    )
}

const Desktop: FunctionComponent<props> = ({content}) => {
    return (
        <div className="flex flex-col justify-between h-full w-full ">
            <h2 className="sr-only">Skills</h2>
            <div className="flex flex-wrap justify-evenly mt-5">
                {content.map((item, key) => (
                    <div key={key} className="p-2 w-72 flex flex-wrap">
                        <h5>
                            {item.name}
                        </h5>
                        {item.items.map((skill, index) => (
                            <div key={index} className="p-2">
                                <Image src={skill.image.src} alt={skill.image.alt} className="rounded-full" height={100}
                                       width={100}/>
                                <p className="text-xl mt-1 text-center">{skill.name}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Skills;