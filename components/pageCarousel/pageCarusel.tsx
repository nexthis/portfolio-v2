import type {FunctionComponent} from 'react'
import {useEffect, useState} from "react";
import {debounce, throttle} from "../../helpers/event";
import clsx from "clsx";
import {CarouselItem} from "../../types/carusel";
// import Swiper core and required modules
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// export const PageCarouselContex = createContext(0);

const PageCarousel: FunctionComponent<{ items: CarouselItem[] }> = ({items}) => {
    const [height, setHeight] = useState(0);

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
            <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} direction="vertical">
                {items.map((item, index) => {
                    <SwiperSlide key={index}>
                        {item}
                    </SwiperSlide>
                })}
            </Swiper>
            {/*<ThumbWraper useListenToCustomEvent={useListenToCustomEvent} thumbsFragment={thumbsFragment}/>*/}
            <div className="fixed left-0 top-3/4 sm:top-1/2 sm:transform translate-y-1/2 z-10">
                {/*{thumbsFragment}*/}
            </div>
        </>
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

export default PageCarousel