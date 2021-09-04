import type {FunctionComponent, ReactElement, ReactFragment, ReactNode, ReactNodeArray} from 'react'
import {useSpringCarousel} from "react-spring-carousel-js";
import {ReactSpringCarouselItem} from "react-spring-carousel-js/dist/types";
import {useEffect, useState} from "react";
import {debounce} from "../../helpers/event";

const PageCarousel: FunctionComponent<{ items: ReactSpringCarouselItem[] }> = ({items}) => {
    const [height, setHeight] = useState(0);
    const {carouselFragment, slideToPrevItem, slideToNextItem } = useSpringCarousel({
        items,
        carouselSlideAxis: "y",
        springConfig:{
            tension: 120,
            mass: 1.7,
        },
    })


    useEffect(() => {
        calculateHeight();
        window.addEventListener('resize', debounce(calculateHeight, 100))
        window.addEventListener('wheel', debounce(onChangeEvent, 10))
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
        <div className="grid gap-7 grid-cols-none w-full z-10" style={{height: height}}>
            {carouselFragment}
        </div>
    )
}

export default PageCarousel