import Nav from "../nav/nav";
import Background from "./background";
import type {FunctionComponent} from 'react'
import clsx from "clsx";
import Container from "../container/container";

type props = {
    fluid?: boolean,
    padding?: boolean,
    backgroundEffect?: boolean,
    text?: {
        text: string,
        align: 'left' | 'right'
    }
}
const Layout: FunctionComponent<props> = ({
                                              children,
                                              fluid = false,
                                              padding = true,
                                              backgroundEffect = true,
                                              text = {text: "Web \n Master", align: 'right'}
                                          }) => {
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

            <Background text={text} backgroundEffect={backgroundEffect}/>
        </>
    )
}
export default Layout;