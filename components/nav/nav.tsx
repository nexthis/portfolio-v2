import type {FunctionComponent} from 'react'
import Link from "next/link";
import clsx from 'clsx'
import Icon from '/public/icons/logo.svg'
import IconGit from '/public/icons/github.svg'
import styles from './style.module.scss'
import {useRouter} from 'next/router'
import Menu from './menu'
// @ts-ignore
// import {createPortal} from "react-dom";

const Nav = () => {
    const {asPath, locale} = useRouter();
    return (
        // fixed md:px-8 px-3
        <header className="w-full sm:mt-5 hook_nav ">
            <nav className="flex justify-between items-center pt-5 pb-3 sm:py-7">
                <Link href='/'>
                    <a>
                        <div className="flex items-center">
                            <Icon className={styles.icon}/>
                            <div className="ml-3 font-light uppercase text-xs sm:text-xl">Paweł <span
                                className="text-accent font-medium"> Romanowski</span></div>
                        </div>
                    </a>
                </Link>
                <div>
                    {/*<div className="hidden sm:inline text-2xl font-normal tracking-wide">*/}
                    {/*    Home*/}
                    {/*</div>*/}
                </div>
                <div className="flex justify-between items-center">
                    {/*<a rel="noreferrer" target="_blank" href="https://github.com/nexthis"*/}
                    {/*   className="rounded-full bg-secondary flex items-center p-2  focus:bg-accent hover:bg-accent focus:text-secondary hover:text-secondary transition-colors">*/}
                    {/*    <span className="sr-only">GitHub</span>*/}
                    {/*    <IconGit/>*/}
                    {/*</a>*/}
                    <div className="ml-3">
                        <div className="flex bg-primary rounded-full px-2 py-0.5">
                            <ChangeLanguage asPath={asPath} locale={locale}/>
                        </div>
                    </div>
                    <div className="ml-3 h-full">
                        <Menu/>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const ChangeLanguage = ({asPath, locale}: { asPath: string, locale: string | undefined }) => (
    <>
        <Link href={asPath} locale="pl">
            <a
                className={clsx(
                    "cursor-pointer flex font-medium items-center justify-center w-8 h-8 rounded-full bg-secondary text-sm leading-none font-display", locale === "pl" ? 'bg-accent text-secondary' : '')}>PL</a>
        </Link>
        <Link href={asPath} locale="en">
            <a
                className={clsx(`cursor-pointer flex items-center justify-center w-8 h-8 items-center font-medium
                                        rounded-full bg-secondary ml-2 text-sm leading-none font-display`, locale === "en" ?
                    'bg-accent text-secondary' : '')}>EN</a>
        </Link>
    </>
)


export default Nav;