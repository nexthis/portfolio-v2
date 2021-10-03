import {FunctionComponent} from "react";
import styles from '../../../styles/contact.module.scss'
import GithubIcon from '../../../public/icons/github.svg'
import PhoneIcon from '../../../public/icons/phone.svg'
import EmailIcon from '../../../public/icons/email.svg'
import Footer from "../../layout/footer";

const Contact: FunctionComponent = () => {

    return (
        <div className="h-full w-full flex justify-around flex-col md:flex-row">
            <div className="md:flex md:justify-center md:flex-col">
                <p className="font-semibold text-xl uppercase text-center md:text-4xl">Contact</p>
                <a className="flex justify-center align-middle flex items-center mt-2" href="tel:502572544">
                    <PhoneIcon className="w-5 h-5 mr-2"/>
                    <p>+48 502 572 544</p>
                </a>
                <a className="flex justify-center align-middle flex items-center mt-2"
                   href="mailto:pawel.romanowski000@gmail.com">

                    <EmailIcon className="w-5 h-5 mr-2"/>
                    <p>pawel.romanowski000@gmail.com</p>
                </a>
                <a className="flex justify-center align-middle flex items-center mt-2" href="https://github.com/nexthis"
                   target="_blank"
                   rel="nofollow noreferrer">
                    <GithubIcon className="w-5 h-5 mr-2"/>
                    <p>nexthis</p>
                </a>
            </div>

            <div className="md:flex md:justify-center md:flex-col">
                <h2 className="font-semibold text-xl uppercase text-center mt-3 md:text-4xl">STAY WITH CONTACT</h2>
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
            {/*<Footer/>*/}
        </div>
    )
}

export default Contact;