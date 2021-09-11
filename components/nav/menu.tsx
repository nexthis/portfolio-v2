import styles from './style.module.scss'
import {FunctionComponent, useEffect, useState} from "react";
import {useSpring, animated} from "@react-spring/web";
import {useHover} from "react-use-gesture";
import clsx from "clsx";


const Menu = () => {
    const [isOpen, toggle] = useState(false);
    const [isHover, setHover] = useState(false);
    const hovering = useHover((state) => setHover(state.hovering) );
    return (
        <div>
            <button {...hovering()} type="button" aria-label="menu" className={styles.hamburger} onClick={() => toggle(!isOpen)}>
                <Hamburger hover={isHover} open={isOpen}/>
            </button>
        </div>
    )
}

const Hamburger: FunctionComponent<{ open: boolean, hover: boolean }> = ({open, hover}) => {

    const first = useSpring({
        transform: open ? "translate(0px, 6px) rotate(-45deg)" : "translate(0px, 0px) rotate(0deg)",
    })
    const second = useSpring({
        opacity: open ? 0 : 1,
        transform: open ? "translate(10px, 0px) rotate(0deg)" : "translate(0px, 0px) rotate(0deg)",
        width: "70%",
        config: {duration: 200}
    })
    const third = useSpring({
        transform: open ? "translate(0, -12px) rotate(45deg)" : "translate(0px, 0px) rotate(0deg)",
    })

    useEffect(() => {
        if(hover){
            second.width.start('100%') ;
        }
    }, [hover])

    return (
        <>
            <animated.div style={first} className={styles.hamburgerItem}/>
            <animated.div style={second} className={clsx(styles.hamburgerItem, 'ml-auto')}/>
            <animated.div style={third} className={styles.hamburgerItem}/>
        </>
    )
}

export default Menu;