import {debounce} from "~/utils/event";


export const useNavigation = (next: string|null, previous: string = null) => {
    const {onSwipe} = useSwipe()
    const {onScrollEnd} = useScroll()
    const {onKeyDown} = useKeyboard()
    const router = useRouter()

    onScrollEnd((e) => {
        if(e.deltaY > 0 && next) {
            router.push(next)
            return
        }
        if(e.deltaY < 0 && previous){
            router.push(previous)
        }
    })

    onKeyDown((e) => {
        if(e.key === 'ArrowDown'  && next){
            router.push(next)
            return
        }
        if(e.key === 'ArrowUp' && previous){
            router.push(previous)
        }
    })

    onSwipe(e => {
        if(e.direction.base === 'vertical'){
            return
        }

        if(e.direction.precisely === 'up'){
            router.push(next)
            return
        }
        router.push(previous)
    })


}