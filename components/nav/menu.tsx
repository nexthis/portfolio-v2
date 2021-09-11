import styles from './style.module.scss'
import {FunctionComponent, useState} from "react";
import {useSpring, animated} from "@react-spring/web";


const Menu = () => {
    const [isOpen, toggle] = useState(false);
    return (
        <div>
            <button type="button" aria-label="menu" className={styles.hamburger} onClick={() => toggle(!isOpen)}>
                <Hamburger open={isOpen}/>
            </button>
        </div>
    )
}

const Hamburger: FunctionComponent<{ open: boolean }> = ({open}) => {

    const first = useSpring({
        transform: open ? "translate(0px, 6px) rotate(-45deg)" : "translate(0px, 0px) rotate(0deg)",
    })
    const second = useSpring({
        opacity: open ? 0 : 1,
        transform: open ? "translate(10px, 0px) rotate(0deg)" : "translate(0px, 0px) rotate(0deg)",
        config: {duration: 250}
    })
    const third = useSpring({
        transform: open ? "translate(0, -12px) rotate(45deg)" : "translate(0px, 0px) rotate(0deg)",
    })

    return (
        <>
            <animated.div style={first} className={styles.hamburgerItem}/>
            <animated.div style={second} className={styles.hamburgerItem}/>
            <animated.div style={third} className={styles.hamburgerItem}/>
        </>
    )
}

export default Menu;