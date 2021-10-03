const Footer = () => {

    return (
        <footer className="bg-secondary flex justify-center text-accent p-2">
            <p className="uppercase">Copyright © by {new Date().getFullYear()} Paweł Romanowski</p>
            <p className="uppercase ml-5">Treść strony prawnie chroniona</p>
        </footer>
    )
}

export default Footer;