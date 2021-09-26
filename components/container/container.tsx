import {FunctionComponent} from "react";
import clsx from "clsx";
import Nav from "../nav/nav";
import Background from "../layout/background";

type props = {
    fluid?: boolean,
    padding?: boolean,
    className?: string,
}

const Container: FunctionComponent<props> = ({children, fluid = false, padding = true, className}) => {
    return (
        <div className={clsx("mx-auto", fluid ? '' : 'container', padding ? 'md:px-0 px-6' : '', className)}>
            {children}
        </div>
    )
}
export default Container;