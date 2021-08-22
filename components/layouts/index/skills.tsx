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

    const imageLoader: ImageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <div className="flex flex-wrap h-full">

            <div className="w-1/2">
                {selected.items.map((item, key) => (
                    <div onClick={() => onItemChange(item)} key={key}>
                        <div> {item.name} </div>
                    </div>
                ))}
            </div>
            <div className="w-1/2">
                <div>{selectedItem.name}</div>
                <div>{selectedItem.description}</div>
            </div>
            <div className="w-full max-h-32">
                {useMemo(() => content.map((item, key) => (
                    <Image loader={imageLoader} src={item.image.src} width={100} height={100} alt={item.image.alt} onClick={() => onSkillChange(item)} key={key}/>
                )), [])}
            </div>

        </div>
    )
}

export default Skills;