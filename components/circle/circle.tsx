import type { FunctionComponent} from "react";
import clsx from "clsx";

type props ={
    x: number | string,
    y: number | string,
    size: number,
    className?: string,
    style?: object,
}

const Circle: FunctionComponent<props> = ({x,y,size,className,style}) => {
    return(
        <div className={clsx(className, 'border-2 border-accent border-solid rounded-full fixed z-0 pointer-events-none')}
             style={{height: size, width: size, left: x, top: y, ...style}}/>
    )
}

export default Circle