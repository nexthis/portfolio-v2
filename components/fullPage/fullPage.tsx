import {motion, AnimatePresence, useAnimation} from "framer-motion";
import type {FunctionComponent, ReactElement, ReactFragment, ReactNode, ReactNodeArray} from 'react'
import {useEffect, Children, isValidElement, cloneElement, useState} from "react";



const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export const FullPage: FunctionComponent = ({children}) => {
    const [height, setHeight] = useState(0);
    const [[page, direction], setPage] = useState([0, 0]);
    const controls = useAnimation();

    useEffect(() => {
        calculateHeight();
    }, [])

    const calculateHeight = () => {
        const element = document.querySelector<HTMLDivElement>('.hook_nav')!;
        const style = getComputedStyle(element);
        const height = element.clientHeight + parseInt(style.marginTop) + parseInt(style.marginBottom)
        setHeight(window.innerHeight - height)
    }

    const childrenWithProps = Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (isValidElement(child)) {
            return cloneElement(child, {height: height});
        }
        return child;
    });

    //ANIMATION
    const paginate = (newDirection: number) => {
        if(childrenWithProps === null){
            throw Error('')
        }
        let result = page + newDirection;
        if(result >= childrenWithProps!.length){
            result -= 1
        }
        else if(result < 0) {
            result += 1
        }

        setPage([result, newDirection]);
        controls.start({y: -height * result})
    };


    return (
        <div className="overflow-hidden" style={{height: height}}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div className="flex flex-col"
                            custom={direction}
                            animate={controls}
                            transition={{
                                y: {type: "spring", stiffness: 100, damping: 30},
                                opacity: {duration: 0.2}
                            }}
                            drag="y"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.y, velocity.y);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                                else {
                                    paginate(0);
                                }
                            }}
                >
                    {childrenWithProps}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
export const FullPageItem: FunctionComponent<{ height?: number }> = ({height, children}) => {
    return (
        <section style={{height: height}}>
            {children}
        </section>
    )
}

