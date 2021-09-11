import styles from './style.module.scss'
import {useState} from "react";
import {useSpring, animated} from "@react-spring/web";



const Menu = () => {
    const [isOpen, toggle] = useState(false);

    const first = useSpring({
        transform: isOpen
            ? "translate(0, 6px) rotate(-45deg)"
            : "translate(0, 0) rotate(0deg)"
    })
    const second = useSpring({
        opacity: isOpen ? 0 : 1,
        transform: isOpen
            ? "translate(0, 10px) rotate(0deg)"
            : "translate(0, 0) rotate(0deg)"
    })
    const third = useSpring({
        transform: isOpen
            ? "translate(0, -12px) rotate(45deg)"
            : "translate(0, 0) rotate(0deg)"
    })


    return(
        <button type="button" aria-label="menu" className={styles.hamburger} onClick={() => toggle(!isOpen)}>
            <animated.div style={first} className={styles.hamburgerItem}/>
            <animated.div style={second} className={styles.hamburgerItem}/>
            <animated.div style={third} className={styles.hamburgerItem}/>
        </button>
    )
}

export default Menu;