import {debounce} from "~/utils/event";

type SwipeEvent = {status: {start: [number,number], end: [number,number]}, distance: number, direction: {base: 'vertical' | 'horizontal', precisely: 'left' | 'right' | 'up' | 'down' }}
/**
 *
 * @param dimension is the distance the finger must travel for an auction to be considered as "swipe" eg: 0.4 = 1/4 screen width or height
 */
export function useSwipe(dimension: number = 0.3){
    const status = {start: [0,0], end: [0,0]}
    const eventEmitter = { onSwipe: null};

    /**
     * Event
     * @param fn
     */
    const onSwipe = (fn: (e: SwipeEvent) => void) => {
         eventEmitter.onSwipe = fn;
    };


    const checkDirection = () => {
        const distance = Math.sqrt(Math.pow(status.end[0] - status.start[0], 2 ) + Math.pow(status.end[1] - status.start[1], 2 ))
        const direction = Math.pow(status.end[0] - status.start[0], 2 ) >  Math.pow(status.end[1] - status.start[1], 2 ) ? 'vertical' : 'horizontal'
        let directionPrecisely = ''

        if(direction === 'vertical' && window.innerWidth * dimension > distance){
            return
        }
        else if(window.innerHeight * dimension > distance){
            return
        }
        if(direction === 'vertical'){
            directionPrecisely = status.end[0] < status.start[0] ? 'left' : 'right'
        }
        else {
            directionPrecisely = status.end[1] < status.start[1] ? 'up' : 'down'
        }

        const event = {status, distance, direction: {base: direction, precisely: directionPrecisely }}

        eventEmitter.onSwipe && eventEmitter.onSwipe(event);
    }

    const onTouchStartEvent = (e: TouchEvent) => {
        status.start = [e.changedTouches[0].screenX, e.changedTouches[0].screenY]
    }

    const onTouchEndEvent = (e: TouchEvent) => {
        status.end = [e.changedTouches[0].screenX, e.changedTouches[0].screenY]
        checkDirection()
    }

    onMounted(() => {
        window.addEventListener('touchstart', onTouchStartEvent)
        window.addEventListener('touchend', onTouchEndEvent)
    })

    onUnmounted(() => {
        window.removeEventListener('touchstart', onTouchStartEvent)
        window.removeEventListener('touchend', onTouchEndEvent)
    })

    return {
        onSwipe
    }
}