import type {FunctionComponent, ReactElement, ReactFragment, ReactNode, ReactNodeArray} from 'react'
import {useSpringCarousel} from "react-spring-carousel-js";
import {ReactSpringCarouselItem} from "react-spring-carousel-js/dist/types";
import {createContext, useCallback, useEffect, useState} from "react";
import {debounce, throttle} from "../../helpers/event";
import {log} from "util";
import clsx from "clsx";
import {animated, useSpring} from '@react-spring/web';

export const PageCarouselContex = createContext(0);

const PageCarousel: FunctionComponent<{ items: ReactSpringCarouselItem[] }> = ({items}) => {
    const [height, setHeight] = useState(0);
    const [activeItem, setActiveItem] = useState(0);
    const {carouselFragment, slideToPrevItem, slideToNextItem, slideToItem, getCurrentActiveItem, useListenToCustomEvent } = useSpringCarousel({
        items,
        carouselSlideAxis: "y",
        springConfig:{
            tension: 120,
            mass: 1.7,
        },
    })

    // useListenToCustomEvent((data) => {
    //     if (data.eventName === "onSlideChange") {
    //         setActiveItem(data.currentItem);
    //     }
    // })
//    useEffect(() => {
//        calculateHeight();
//        console.log(items[0].id)
//        setTimeout(() => {
//            slideToItem(items[0].id);
//        }, 200)
//
//    }, [items])

    useEffect(() => {
        calculateHeight();
        window.addEventListener('resize', debounce(calculateHeight, 100))
        window.addEventListener('wheel', debounce(onChangeEvent, 50))
        window.addEventListener('keydown', onChangeEvent)
        return () => {
            window.removeEventListener('resize', calculateHeight)
            window.removeEventListener('wheel', onChangeEvent)
            window.removeEventListener('keydown', onChangeEvent)
        }
    }, []);


    const onChangeEvent = (e: WheelEvent | KeyboardEvent) => {
        if (e instanceof WheelEvent) {
            if (e.deltaY > 0) {
                slideToNextItem()
            } else {
                slideToPrevItem()
            }
        } else {
            if (e.key === 'ArrowUp') {
                slideToPrevItem()
            } else if (e.key === 'ArrowDown') {
                slideToNextItem()
            }
        }
    }

    const calculateHeight = () => {
        const element = document.querySelector<HTMLDivElement>('.hook_nav')!;
        const style = getComputedStyle(element);
        const height = element.clientHeight + parseInt(style.marginTop) + parseInt(style.marginBottom)
        setHeight(window.innerHeight - height)
    }

    return (
        <div className="flex w-full z-10" style={{height: height, touchAction: 'none'}}>
            {carouselFragment}
            {/*<Paginator active={activeItem} count={items.length}/>*/}
        </div>
    )
}


const Paginator: FunctionComponent<{count: number, active: number}> = ({count, active}) => {
    const items = Array.from(Array(count).keys())
    const TIME = 1000;
    const [isChange, setChange] = useState(false);
    const props = useSpring({
        reverse: !isChange,
        transform: 'rotate(90deg)',
        from: {
            transform: 'rotate(0deg)',
        }
    })

    useEffect(() => {
        setChange(true)
        setTimeout(() => {
            setChange(false)
        }, TIME)
    },[active])

    return (
        <div className="fixed left-0 top-1/2">
            {items.map((item) => (
                <animated.div key={item} style={props} className={clsx("w-1 h-10 bg-white origin-bottom", item !== 0 ? 'mt-2' : '', active === item ? 'bg-accent' : '')}/>
            ))}

        </div>
    )
}

export default PageCarousel