import Nav from "../nav/nav";
import type {FunctionComponent} from 'react'

const Layout:FunctionComponent = ({children}) => {
    return(
        <div className="container mx-auto md:px-8 px-3">
            <Nav />
            <main >
                {children}
            </main>
        </div>
    )
}

export default Layout;