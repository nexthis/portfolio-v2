import {ReactChild, useState} from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import {motion} from "framer-motion";
import IconGit from "../../public/icons/github.svg";


const Menu = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="relative">
            <motion.button onClick={() => setOpen(!isOpen)} animate={isOpen ? "open" : "closed"} whileHover="hover"
                           type="button" aria-label="menu"
                           className={clsx(styles.hamburger)}>
                <motion.div className={styles.hamburgerItem} variants={{
                    open: {
                        rotate: 45,
                        y: 8,
                    },
                    closed: {
                        rotate: 0,
                        transition: {
                            delay: 0.5,
                        },
                    }
                }}/>
                <motion.div initial={{scaleX: 0.65, opacity: 1}} variants={{
                    open: {
                        opacity: 0,
                        transition: {
                            duration: 0.1,
                        }
                    },
                    closed: {
                        opacity: 1,
                        transition: {
                            delay: 0.5,
                        },
                    },
                    hover: {
                        scaleX: 1,
                        transition: {
                            duration: 0.1,
                            type: "tween",
                            ease: "easeIn"
                        }
                    },
                }}
                            className={clsx(styles.hamburgerItem, 'origin-right')}/>
                <motion.div className={styles.hamburgerItem} variants={{
                    open: {
                        rotate: -45,
                        y: -10,
                    },
                    closed: {
                        rotate: 0,
                        transition: {
                            delay: 0.5,
                        },
                    },
                }}/>
            </motion.button>
            <List isOpen={isOpen}/>
        </div>
    )
}

const MenuExpandVariants = {
    open: {
        scaleY: 1,
        translateX: "-50%",
        opacity: 1,
    },
    closed: {
        scaleY: 0,
        opacity: 0,
        translateX: "-50%",
        transition: {
            delay: 0.5,
        },
    },
}

const MenuListVariants = {
    open: {
        transition: {staggerChildren: 0.07, delayChildren: 0.2},

    },
    closed: {
        transition: {staggerChildren: 0.05, staggerDirection: -1}
    }
}


const List = ({isOpen}: { isOpen: boolean }) => {
    return (
        <motion.div className={clsx("absolute origin-top bg-secondary rounded-full left-1/2 top-10")}
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    variants={MenuExpandVariants}>


            <motion.ol className="overflow-hidden" variants={MenuListVariants}>
                <ListItem>
                    <a rel="noreferrer" target="_blank" href="https://github.com/nexthis"
                       className="rounded-full bg-secondary flex items-center p-2  focus:bg-accent hover:bg-accent focus:text-secondary hover:text-secondary transition-colors">
                        <span className="sr-only">GitHub</span>
                        <IconGit/>
                    </a>
                </ListItem>
                <ListItem>
                    <a rel="noreferrer" target="_blank" href="https://github.com/nexthis"
                       className="rounded-full bg-secondary flex items-center p-2  focus:bg-accent hover:bg-accent focus:text-secondary hover:text-secondary transition-colors">
                        <span className="sr-only">GitHub</span>
                        <IconGit/>
                    </a>
                </ListItem>
                <ListItem>
                    <a rel="noreferrer" target="_blank" href="https://github.com/nexthis"
                       className="rounded-full bg-secondary flex items-center p-2  focus:bg-accent hover:bg-accent focus:text-secondary hover:text-secondary transition-colors">
                        <span className="sr-only">GitHub</span>
                        <IconGit/>
                    </a>
                </ListItem>
            </motion.ol>
        </motion.div>
    )
}

const MenuListItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {stiffness: 1000, velocity: -100}
        }
    },
    closed: {
        y: 10,
        opacity: 0,
        transition: {
            y: {stiffness: 1000}
        }
    }
}

const ListItem = ({children}: { children: ReactChild }) => {
    return (
        <motion.li className="p-3" variants={MenuListItemVariants}>
            {children}
        </motion.li>
    )
}
export default Menu