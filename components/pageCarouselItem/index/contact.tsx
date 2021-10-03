import {FunctionComponent} from "react";
import styles from '../../../styles/contact.module.scss'
import GithubIcon from '../../../public/icons/github.svg'
import PhoneIcon from '../../../public/icons/phone.svg'
import EmailIcon from '../../../public/icons/email.svg'
import Footer from "../../layout/footer";
import ContentInterface from "../../../public/languages/index/type";

type props = {
    content: ContentInterface['contact'],
}

const Contact: FunctionComponent<props> = ({content}) => {

    return (
        <div className="h-full w-full flex flex-col-reverse  justify-around flex-col md:flex-row">
            <div className="md:flex md:justify-center md:flex-col md:mr-5 md:w-1/3">
                <p className="font-semibold text-xl uppercase text-center md:text-4xl">Contact</p>
                <p className="max-w-sm text-center hidden lg:block mt-3 mx-auto">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                </p>
                <a className="flex justify-center align-middle flex items-center mt-5 lg:mt-10" href="tel:502572544">
                    <PhoneIcon className="w-5 h-5 mr-2"/>
                    <p className="md:text-xl">+48 502 572 544</p>
                </a>
                <a className="flex justify-center align-middle flex items-center mt-2 md:mt-5 lg:mt-10"
                   href="mailto:pawel.romanowski000@gmail.com">

                    <EmailIcon className="w-5 h-5 mr-2"/>
                    <p className="md:text-xl">pawel.romanowski000@gmail.com</p>
                </a>
                <a className="flex justify-center align-middle flex items-center mt-2 md:mt-5 lg:mt-10"
                   href="https://github.com/nexthis"
                   target="_blank"
                   rel="nofollow noreferrer">
                    <GithubIcon className="w-5 h-5 mr-2"/>
                    <p className="md:text-xl">nexthis</p>
                </a>
            </div>

            <div className="md:flex md:justify-center md:flex-col md:ml-5 md:w-1/2">
                <h2 className="font-semibold text-xl uppercase text-center mt-3 md:text-4xl">{content.form.title}</h2>
                <form className={styles.formInput}>
                    <label className="mt-2 md:mt-5 lg:mt-10">
                        <input/>
                        <span className="placeholder uppercase">{content.form.name}</span>
                    </label>
                    <label className="mt-2 md:mt-5 lg:mt-10">
                        <input/>
                        <span className="placeholder uppercase">{content.form.phone}</span>
                    </label>
                    <label className="mt-2 md:mt-5 lg:mt-10">
                        <input/>
                        <span className="placeholder uppercase">{content.form.email}</span>
                    </label>
                    <label className="mt-2 md:mt-5 lg:mt-10">
                        <input/>
                        <span className="placeholder uppercase">{content.form.message}</span>
                    </label>

                    {/*<input type="checkbox" id="scales" name="scales"*/}
                    {/*       checked/>*/}
                    <label className="text-xs" htmlFor="scales">{content.form.clause}</label>

                    <button className="uppercase" type="submit">{content.form.send}</button>
                </form>
            </div>
            {/*<Footer/>*/}
        </div>
    )
}

export default Contact;