import type {FunctionComponent, CSSProperties, MutableRefObject} from 'react'
import {useEffect, useMemo, useRef, useState} from "react";
import {debounce} from "../../helpers/event";
import clsx from "clsx";
import {CarouselItem} from "../../types/carousel";
import {animated, useSprings} from "@react-spring/web";
import {useDrag} from "react-use-gesture";
import {clamp} from "../../helpers/number";
import {useRouter} from 'next/router'

type props = {
    items: CarouselItem[],
    init?: number,
    onChange?: (index?: number, item?: CarouselItem) => void
}


const PageCarousel: FunctionComponent<props> = ({items, init, onChange}) => {

    const router = useRouter();
    const [height, setHeight] = useState(init ? init : 0);
    //const [current, setCurrent] = useState(0);

    const index = useRef(0);
    const [props, api] = useSprings<{
        y: number,
        scale: number,
        display: string,
        position: CSSProperties['position']
    }>(items.length, i => ({
        y: i * height,
        scale: 1,
        display: 'block',
        position: "static"
    }), [height])

    const bind = useDrag(({active, movement: [mx, my], direction: [xDir, yDir], distance, cancel}) => {
        if (active && distance > height / 2) {
            index.current = clamp(index.current + (yDir > 0 ? -1 : 1), 0, items.length - 1)
            router.push({hash: items[index.current].name.toLocaleLowerCase()})
            if (onChange) {
                onChange(index.current, items[index.current]);
            }
            cancel();
        }

        api.start(i => {
            if (i < index.current - 1 || i > index.current + 1) return {display: 'none'}
            const y = (i - index.current) * height + (active ? my : 0)
            const scale = active ? 1 - distance / height / 2 : 1
            return {y, scale, display: 'block', position: 'absolute'}
        })
    }, {useTouch: true, axis: 'y'})

    useEffect(() => {
        calculateHeight();
        window.addEventListener('resize', debounce(calculateHeight, 100))
        return () => {
            window.removeEventListener('resize', calculateHeight)
        }
    }, []);

    const calculateHeight = () => {
        const element = document.querySelector<HTMLDivElement>('.hook_nav')!;
        const style = getComputedStyle(element);
        const height = element.clientHeight + parseInt(style.marginTop) + parseInt(style.marginBottom)
        setHeight(window.innerHeight - height)
    }

    return (
        <>
            <div className="overflow-hidden default-screen-height relative" {...bind()}>
                {props.map(({y, display, position, scale}, i) => (
                    <animated.div key={i} className="h-full w-full"
                                  style={{display, position, y}}>
                        <animated.div style={{transform: scale.to(s => `scale(${s})`)}} className="h-full w-full">
                            {items[i].renderItem}
                        </animated.div>
                    </animated.div>
                ))}
            </div>

            {/*<div className="fixed bottom-0 left-0">*/}
            {/*    {items.map((item, key) => (*/}
            {/*        <ThumbItem key={key} number={key} title={item.name} active={index}/>*/}
            {/*    ))}*/}
            {/*</div>*/}

        </>
    )
}


const ThumbItem: FunctionComponent<{ title: string, number: number, active?: MutableRefObject<number> }> = ({
                                                                                                                title,
                                                                                                                number,
                                                                                                                active
                                                                                                            }) => {
    return (
        <div className="mt-1 sm:mt-3">
            <div
                className={clsx("w-8 sm:w-20 text-right text-sm font-light", active ? "w-10 sm:w-24 text-2xl" : null)}>
                {number < 10 ? 0 : null}{number}
            </div>
            {/*{title}  {active ? "active" : "disabled"}*/}
            <div className="flex items-center">
                <div
                    className={clsx("w-8 sm:w-20 h-3 rounded-tr-full rounded-br-full border-l-0 border-accent border", active ? "bg-accent w-10 sm:w-24" : null)}/>
                <div className={clsx("ml-1 hidden sm:block text-xs", active ? "text-sm" : null)}>{title}:
                    active={active?.current}</div>
            </div>
        </div>
    )
}


export default PageCarousel