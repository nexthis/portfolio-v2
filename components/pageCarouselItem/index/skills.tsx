import type {FunctionComponent} from "react";
import ContentInterface from "../../../public/languages/index/type";
import Image, {ImageLoader} from 'next/image'
import {useMemo, useState} from "react";


type props = {
    content: ContentInterface['skills'],
}


const Skills: FunctionComponent<props> = ({content}) => {
    const [selected, setSelected] = useState(content[0]);
    const [selectedItem, setSelectedItem] = useState(content[0].items[0]);

    const onSkillChange = (item: {
        "name": string,
        "image": {
            "src": string,
            "alt": string
        },
        "items": Array<{
            "name": string,
            "description": string,
            "image": {
                "src": string,
                "alt": string
            },
        }>
    }) => {
        setSelected(item);
    }
    const onItemChange = (item: {
        "name": string,
        "description": string,
        "image": {
            "src": string,
            "alt": string
        },
    }) => {
        setSelectedItem(item);
    }


    return (
        <div className="flex flex-col justify-between h-full w-full ">

            <div className="flex ">
                <div>
                    {selected.items.map((item, key) => (
                        <div key={key} onClick={() => onItemChange(item)}>
                            <Image src={item.image.src} height={50} width={50}  key={key}/>
                        </div>

                    ))}
                </div>
                <div>
                    <div>{selectedItem.name}</div>
                    <div>{selectedItem.description}</div>
                </div>
            </div>
            <div className="col-span-2 max-h-32">
                <ul className="flex justify-center">

                    {useMemo(() => content.map((item, key) => (
                        <li className={key !== 0 ? "ml-5" : ''} key={key}>
                            <Image src={item.image.src} width={100} height={100}
                                   alt={item.image.alt}
                                   onClick={() => onSkillChange(item)} key={key}/>
                        </li>
                    )), [])}

                </ul>
            </div>

        </div>
    )
}

export default Skills;