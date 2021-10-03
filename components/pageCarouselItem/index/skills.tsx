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
    const [selectedItem, setSelectedItem] = useState(content[0].items[0]);

    const onSkillChange = (item: ContentInterface['skills'][0]) => {
        setSelected(item);
    }
    const onItemChange = (item: ContentInterface['skills'][0]['items'][0]) => {
        setSelectedItem(item);
    }


    return (
        <div className="flex flex-col justify-between h-full w-full ">
            <h2 className="sr-only">Skills</h2>
            <div className="flex flex-wrap justify-evenly mt-5">
                {selected.items.map((item, key) => (
                    <div key={key} className="p-2">
                        <div className="mx-auto" style={{height: 60, width: 60}}>
                            <Image src={item.image.src} alt={item.image.alt} className="rounded-full" height={60}
                                   width={60} key={key}/>
                        </div>
                        <p className="text-xl mt-1 text-center">{item.name}</p>
                    </div>
                ))}
                {/*<div>*/}
                {/*    <div>{selectedItem.name}</div>*/}
                {/*    <div>{selectedItem.description}</div>*/}
                {/*</div>*/}
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

export default Skills;