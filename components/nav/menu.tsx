import styles from './style.module.scss'
import {FunctionComponent, HTMLAttributes, useEffect, useState} from "react";
import {useSpring, animated, useSprings, SpringValues} from "@react-spring/web";
import Link from "next/link";
import {useHover} from "react-use-gesture";
import clsx from "clsx";


const Menu = () => {
    const [isOpen, toggle] = useState(false);
    const [isHover, setHover] = useState(false);
    const hovering = useHover((state) => setHover(state.hovering));
    return (
        <div className="relative inline-block">
            <button {...hovering()} type="button" aria-label="menu" className={clsx(styles.hamburger)}
                    onClick={() => toggle(!isOpen)}>
                <Hamburger hover={isHover} open={isOpen}/>
            </button>
            <List open={isOpen}/>
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
        if (hover) {
            second.width.start('100%');
        }
    }, [hover])

    return (
        <>
            <animated.div style={first} className={clsx(styles.hamburgerItem, 'bg-accent')}/>
            <animated.div style={second} className={clsx(styles.hamburgerItem, 'ml-auto bg-accent')}/>
            <animated.div style={third} className={clsx(styles.hamburgerItem, 'bg-accent')}/>
        </>
    )
}

const List: FunctionComponent<{ open: boolean }> = ({open}) => {
    const [springs, api] = useSprings(3, index => ({
        opacity: 0,
    }))

    useEffect(() => {
        api.start(index => ({
            opacity: open ? 1 : 0,
            delay: index * 1000 * 0.2
        }));
    }, [open])
    //open ? 'block' : 'hidden'
    return (
        <ul className={clsx("absolute right-0 overflow-hidden mt-2 z-50",)}>
            <ListItem href="/portfolio" style={springs[0]}>Portfolio</ListItem>

        </ul>
    )
}

const ListItem: FunctionComponent<{ style: any, href: string }> = ({children, style, href}) => {

    //rounded-md
    return (
        <Link href={href}>
            <a>
                <animated.li style={style} className="bg-secondary py-1 px-3">
                    {children}
                </animated.li>
            </a>
        </Link>
    )
}

export default Menu;