import Nav from "../nav/nav";
import Background from "./background";
import type {FunctionComponent} from 'react'
import clsx from "clsx";
import Container from "../container/container";

type props = {
    fluid?: boolean,
    padding?: boolean,
}
const Layout: FunctionComponent<props> = ({children, fluid = false, padding = true}) => {
    return (
        <>

            <Container>
                <Nav/>
            </Container>
            <Container fluid={fluid} padding={padding}>
                <main>
                    {children}
                </main>
            </Container>


            <Background/>
        </>
    )
}
export default Layout;