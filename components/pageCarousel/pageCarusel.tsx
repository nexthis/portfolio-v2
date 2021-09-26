import type {FunctionComponent, ReactElement, ReactFragment, ReactNode, ReactNodeArray} from 'react'
import {UseListenToCustomEvent, useSpringCarousel} from "react-spring-carousel-js";
import {ReactSpringCarouselItem} from "react-spring-carousel-js/dist/types";
import {Children, cloneElement, createContext, isValidElement, useCallback, useEffect, useState} from "react";
import {debounce, throttle} from "../../helpers/event";
import {log} from "util";
import clsx from "clsx";
import {animated, useSpring} from '@react-spring/web';
import {map} from "rxjs/operators";

export const PageCarouselContex = createContext(0);

const PageCarousel: FunctionComponent<{ items: ReactSpringCarouselItem[] }> = ({items}) => {
    const [height, setHeight] = useState(0);
    const [activeItem, setActiveItem] = useState(0);
    const {
        carouselFragment,
        thumbsFragment,
        slideToPrevItem,
        slideToNextItem,
        slideToItem,
        getCurrentActiveItem,
        useListenToCustomEvent
    } = useSpringCarousel({
        items: items.map((item, index) => ({
            renderThumb: (<ThumbItem active={activeItem === index} title={item.id} number={index + 1}/>),
            ...item
        })),
        withThumbs: true,
        carouselSlideAxis: 'y',
        thumbsSlideAxis: 'y',
        springConfig: {
            tension: 120,
            mass: 1.7,
        },
    })

    useListenToCustomEvent((data) => {
        if (data.eventName === "onSlideChange") {
            setActiveItem(data.currentItem);
        }
    })

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
        <>
            <div className="flex w-full default-carousel-height z-10" style={{height: height, touchAction: 'none'}}>
                {carouselFragment}
            </div>
            {/*<ThumbWraper useListenToCustomEvent={useListenToCustomEvent} thumbsFragment={thumbsFragment}/>*/}
            <div className="fixed left-0 top-3/4 sm:top-1/2 sm:transform translate-y-1/2 z-10">
                {thumbsFragment}
            </div>
        </>
    )
}

// const ThumbWraper: FunctionComponent<{ thumbsFragment: JSX.Element, useListenToCustomEvent: UseListenToCustomEvent}> = ({thumbsFragment, useListenToCustomEvent}) => {
//     // const [activeItem, setActiveItem] = useState(0);
//     // useListenToCustomEvent((data) => {
//     //     if (data.eventName === "onSlideChange") {
//     //         setActiveItem(data.currentItem);
//     //     }
//     // })
//
//     const childrenWithProps = Children.map(thumbsFragment.props.children.props.children, child => {
//         // Checking isValidElement is the safe way and avoids a typescript
//         // error too.
//         if (isValidElement(child)) {
//             // @ts-ignore
//             return cloneElement(child, { active: true });
//         }
//         return child;
//     });
//
//     return(
//
//     )
// }

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

export default PageCarousel