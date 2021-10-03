import type {FunctionComponent} from "react";
import clsx from "clsx";
import styles from './backgroun.module.scss';

type props = {
    backgroundEffect?: boolean,
    text?: {
        text: string,
        align: 'left' | 'right'
    }
}

const Background: FunctionComponent<props> = ({backgroundEffect, text = {text: "Web \n Master", align: 'right'}}) => {
    const bgStyle = {top: '10%'};
    // @ts-ignore
    bgStyle[text.align] = '5%';
    return (
        <div className="w-full h-full fixed top-0 left-0 pointer-events-none background-gradient">
            <div className="w-full h-full relative overflow-hidden">
                {backgroundEffect ? <Effect/> : null}

                {/*@ts-ignore*/}
                <div style={bgStyle}
                     className="sr-only sm:not-sr-only sm:absolute uppercase font-extrabold background-text">{text.text}</div>
            </div>

        </div>
    )
}

const Effect = () => {
    return (
        <>
            {/*BIG*/}
            <div className={styles.bigCircle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 243 243" fill="none">
                    <g filter="url(#filter0_f)">
                        <path
                            d="M237.766 121.639C237.99 57.4746 186.156 5.27729 121.992 5.05328C57.8269 4.82928 5.6296 56.6634 5.40559 120.828C5.18159 184.993 57.0158 237.19 121.18 237.414C185.345 237.638 237.542 185.804 237.766 121.639Z"
                            stroke="url(#paint0_linear)" strokeMiterlimit="10"/>
                    </g>
                    <defs>
                        <filter id="filter0_f" x="0.49826" y="0.145996" width="242.176" height="242.176"
                                filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur"/>
                        </filter>
                        <linearGradient id="paint0_linear" x1="38.8825" y1="203.332" x2="204.247" y2="39.1182"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FC8A"/>
                            <stop offset="1" stopColor="#00E6F8"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/*SMALL*/}
            <div className={styles.smallCircle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161 171" fill="none">
                    <circle cx="80" cy="85" r="79" stroke="url(#paint0_linear)" strokeOpacity="0.15"
                            strokeMiterlimit="10"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="25.1027" y1="144.862" x2="145.093" y2="25.7443"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FC8A"/>
                            <stop offset="1" stopColor="#00E6F8"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/*RIGHT*/}
            <div className={styles.right3}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199 219" fill="none">
                    <path d="M1.06226 221.92C3.49632 95.6762 104.551 2.53248 230.97 1.31567"
                          stroke="url(#paint0_linear)" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="119.206" y1="118.157" x2="69.7507" y2="68.6924"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FC8A"/>
                            <stop offset="1" stopColor="#00E6F8"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className={styles.right2}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 196" fill="none">
                    <path d="M0.881592 198.92C0.881592 82.5628 91.5915 1.13086 207.97 1.13086"
                          stroke="url(#paint0_linear)" strokeMiterlimit="10"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="106.883" y1="106.982" x2="62.3028" y2="62.3939"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FC8A"/>
                            <stop offset="1" stopColor="#00E6F8"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className={styles.right1}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153 173" fill="none">
                    <path d="M0.700928 175.92C0.700928 72.0351 81.2182 0.793945 184.97 0.793945"
                          stroke="url(#paint0_linear)" strokeMiterlimit="10"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="95.2925" y1="95.3896" x2="55.4299" y2="55.5197"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FC8A"/>
                            <stop offset="1" stopColor="#00E6F8"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/*LEFT*/}
            <div className={styles.left3}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 222 187" fill="none">
                    <path d="M220.944 227.1C218.46 97.9661 115.312 2.68998 -13.7251 1.44531"
                          stroke="url(#paint0_linear)" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="100.354" y1="120.961" x2="150.941" y2="70.4726"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FC8A"/>
                            <stop offset="1" stopColor="#00E6F8"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className={styles.left2}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199 163" fill="none">
                    <path d="M197.652 203.101C197.652 84.0792 105.064 0.782959 -13.7252 0.782959"
                          stroke="url(#paint0_linear)" strokeOpacity="0.6" strokeMiterlimit="10"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="89.4558" y1="109.057" x2="135.056" y2="63.546"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FC8A"/>
                            <stop offset="1" stopColor="#00E6F8"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className={styles.left1}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175 140" fill="none">
                    <path d="M174.36 180.1C174.36 73.837 92.1755 0.964844 -13.7251 0.964844"
                          stroke="url(#paint0_linear)" strokeOpacity="0.4" strokeMiterlimit="10"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="77.8098" y1="97.7261" x2="118.585" y2="57.0307"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00FC8A"/>
                            <stop offset="1" stopColor="#00E6F8"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </>
    )
}


export default Background;