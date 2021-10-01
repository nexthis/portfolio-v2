import {FunctionComponent} from "react";
import styles from '../../../styles/contact.module.scss'

const Contact: FunctionComponent = () => {

    return (
        <div className="h-full w-full flex flex-col md:flex-row">
            <div>
                <p className="font-semibold text-xl uppercase text-center">Contact</p>
                <a className="flex justify-center align-middle" href="tel:502572544">
                    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round"
                           strokeLinejoin="round" transform="translate(5 3)">
                            <path
                                d="m2.5.5h6c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z"/>
                            <path d="m3.5 12.5h4"/>
                        </g>
                    </svg>
                    <p>+48 502 572 544</p>
                </a>
                <a className="flex justify-center align-middle" href="mailto:pawel.romanowski000@gmail.com">

                    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round"
                           strokeLinejoin="round" transform="translate(3.5 4.5)">
                            <path
                                d="m0 2v8c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-8c0-1.1045695-.8954305-2-2-2h-10c-1.1045695 0-2 .8954305-2 2z"/>
                            <path d="m2 3 5 3 5-3"/>
                        </g>
                    </svg>
                    <p>pawel.romanowski000@gmail.com</p>
                </a>
                <a className="flex justify-center align-middle" href="https://github.com/nexthis" target="_blank"
                   rel="nofollow noreferrer">
                    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round"
                           strokeLinejoin="round" transform="translate(2 3)">
                            <path d="m12.5.5 3 3-3 3"/>
                            <path d="m15.5 3.5h-5l-4 5.086"/>
                            <path d="m12.5 9.5 3 3-3 3"/>
                            <path d="m15.5 12.5h-5l-4-4h-6"/>
                        </g>
                    </svg>
                    <p>nexthis</p>
                </a>
            </div>

            <div>
                <h2 className="font-semibold text-xl uppercase text-center">STAY WITH CONTACT</h2>
                <form className={styles.formInput}>
                    <label className="mt-2">
                        <input/>
                        <span className="placeholder uppercase">Your name</span>
                    </label>
                    <label className="mt-2">
                        <input/>
                        <span className="placeholder uppercase">Your phone</span>
                    </label>
                    <label className="mt-2">
                        <input/>
                        <span className="placeholder uppercase">Your E-Mail</span>
                    </label>
                    <label className="mt-2">
                        <input/>
                        <span className="placeholder uppercase">Message</span>
                    </label>

                    {/*<input type="checkbox" id="scales" name="scales"*/}
                    {/*       checked/>*/}
                    <label className="text-xs" htmlFor="scales">Wyrażam zgodę na przetwarzanie moich danych osobowych
                        w szczególności na kontakt telefoniczny i mailowy. Więcej</label>

                    <button className="uppercase" type="submit"> Send</button>
                </form>
            </div>
        </div>
    )
}

export default Contact;