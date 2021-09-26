import Nav from "../nav/nav";
import Background from "./background";
import type {FunctionComponent} from 'react'

const Layout: FunctionComponent = ({children}) => {
    return (
        <>
            <div className="container mx-auto md:px-0 px-6">
                <Nav/>
                <main>
                    {children}
                </main>
            </div>
            <Background/>
        </>
    )
}

export default Layout;