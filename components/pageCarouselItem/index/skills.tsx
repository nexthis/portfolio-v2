import type {FunctionComponent} from "react";
import ContentInterface from "../../../public/languages/index/type";
import Image, {ImageLoader} from 'next/image'
import {useMemo, useState} from "react";
import clsx from "clsx";


type props = {
    content: ContentInterface['skills'],
}


const Skills: FunctionComponent<props> = ({content}) => {
    const [selected, setSelected] = useState(content[0]);

    const onSkillChange = (item: ContentInterface['skills'][0]) => {
        setSelected(item);
    }

    return (
        <div className="flex flex-col h-full w-full ">
            <h2 className="sr-only">Skills</h2>
            <div className="h-full mt-5 flex flex-col justify-center">
                <div className="flex flex-wrap justify-around">
                    {selected.items.map((item, key) => (
                        <div key={key} className="p-2">
                            <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24">
                                <Image src={item.image.src} alt={item.image.alt} className="rounded-full" height={100}
                                       width={100}/>
                            </div>
                            <p className="text-xl mt-1 text-center">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="max-h-32 w-full">
                <ul className="flex flex-wrap justify-around mb-5">
                    {useMemo(() => content.map((item, key) => (
                        <li onClick={() => onSkillChange(item)}
                            className={clsx('w-28 py-0.5 mt-3 mx-1 border-accent border rounded-full text-center cursor-pointer', item === selected ? 'bg-accent text-primary' : null)}
                            key={key}>
                            {item.name}
                        </li>
                    )), [selected])}

                </ul>
            </div>
        </div>
    )
}


export default Skills;