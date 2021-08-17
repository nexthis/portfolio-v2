import type {FunctionComponent} from 'react'
import Link from "next/link";
import clsx from 'clsx'
import Icon from '/assets/icons/icon-blod.svg'
import IconGit from '/assets/icons/github.svg'
import styles from './style.module.scss'
import { useRouter } from 'next/router'

const Nav = () => {
    const { asPath, locale } = useRouter();
    return (
        // fixed md:px-8 px-3
        <header className="w-full sm:mt-5 hook_nav ">
            <nav className="flex justify-between items-center py-7">
                <div className="flex items-center">
                    <Icon className={styles.icon}/>
                    <span className="ml-3 font-medium text-sm sm:text-xl">Paweł Romanowski</span>
                </div>
                <div>
                    <div className="hidden sm:inline text-2xl font-normal tracking-wide">HOME</div>
                </div>
                <div className="flex justify-between items-center">
                    <a className="rounded-full bg-secondary flex items-center p-2  focus:bg-accent hover:bg-accent focus:text-secondary hover:text-secondary transition-colors">
                        <span className="sr-only">GitHub</span>
                        <IconGit/>
                    </a>
                    <div className="ml-3">
                        <div className="flex bg-primary rounded-full px-2 py-0.5">
                            <Link href={asPath} locale="pl">
                                <span className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-accent text-sm leading-none font-display">PL</span>
                            </Link >
                            <Link href={asPath} locale="en">
                                <span  className="cursor-pointer flex items-center justify-center w-8 h-8 items-center rounded-full bg-secondary ml-2 text-sm leading-none font-display ">EN</span>
                            </Link >
                        </div>
                    </div>
                    <div className="ml-3 h-full">
                        <button type="button" className={styles.hamburger}>
                            <div className={styles.hamburgerItem}/>
                            <div className={clsx(styles.hamburgerItemCenter, styles.hamburgerItem)}/>
                            <div className={styles.hamburgerItem}/>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Nav;