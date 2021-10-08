import type {FunctionComponent} from 'react'
import {useEffect, useRef, useState} from "react";
import {debounce, throttle} from "../../helpers/event";
import clsx from "clsx";
import {CarouselItem} from "../../types/carusel";
import {animated, useSprings} from "@react-spring/web";
import {useGesture, useDrag} from "react-use-gesture";
// import Swiper core and required modules
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';

// export const PageCarouselContex = createContext(0);

const PageCarousel: FunctionComponent<{ items: CarouselItem[] }> = ({items}) => {

    const [height, setHeight] = useState(0);

    const index = useRef(0);
    const [props, set] = useSprings(items.length, i => ({y: i * height, sc: 1, display: 'block'}))

    const bind = useDrag(({down, delta: [xDelta, yDelta], direction: [xDir, yDir], distance, cancel}) => {
        if (down && distance > height / 2) {
            // @ts-ignore
            cancel((index.current = clamp(index.current + (yDir > 0 ? -1 : 1), 0, items.length - 1)))
        }

        set(i => {
            if (i < index.current - 1 || i > index.current + 1) return {display: 'none'}
            const y = (i - index.current) * height + (down ? yDelta : 0)
            const sc = down ? 1 - distance / height / 2 : 1
            return {y, sc, display: 'block'}
        })
    })

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
        <div className="overflow-hidden default-screen-height">
            {props.map(({y, display, sc}, i) => (
                <animated.div {...bind()} key={i} className="h-full"
                              style={{display, transform: y.to(x => `translate3d(0,${y}px,0)`)}}>
                    <animated.div style={{transform: sc.to(s => `scale(${s})`)}} className="h-full">
                        {items[i].renderItem}
                    </animated.div>
                </animated.div>
            ))}
        </div>
    )
}


//getCurrentActiveItem: () => {id: string, index: number}
const ThumbItem: FunctionComponent<{ title: string, number: number, active?: boolean }> = ({title, number, active}) => {

    
    return (
        <div className="mt-1 sm:mt-3">
            <div
                className={clsx("w-8 sm:w-20 text-right text-sm font-light", active ? "w-10 sm:w-24 text-2xl" : null)}>{number < 10 ? 0 : null}{number} </div>
            {/*{title}  {active ? "active" : "disabled"}*/}
            <div className="flex items-center">
                <div
                    className={clsx("w-8 sm:w-20 h-3 rounded-tr-full rounded-br-full border-l-0 border-accent border", active ? "bg-accent w-10 sm:w-24" : null)}/>
                <div className={clsx("ml-1 hidden sm:block text-xs", active ? "text-sm" : null)}>{title}</div>
            </div>
        </div>
    )
}

//TODO ADD TO HELPER
// @ts-ignore
function clamp(number, lower, upper) {
    number = +number
    lower = +lower
    upper = +upper
    lower = lower === lower ? lower : 0
    upper = upper === upper ? upper : 0
    if (number === number) {
        number = number <= upper ? number : upper
        number = number >= lower ? number : lower
    }
    return number
}


export default PageCarousel