import {debounce} from "~/utils/event";


export function useScroll() {
    const eventEmitter = { onSwipe: null, onScroll: null, onKeyDown: null};

    /**
     * Event
     * @param fn
     */
    const onScrollEnd = (fn: (e: WheelEvent) => void) => {
        eventEmitter.onScroll = fn;
    };

    const onScrollEvent = debounce((e: WheelEvent) => {
        eventEmitter.onScroll && eventEmitter.onScroll(e);
    },100)

    onMounted(() => {
        window.addEventListener('wheel', onScrollEvent)
    })

    onUnmounted(() => {
        window.removeEventListener('wheel', onScrollEvent)
    })

    return {
        onScrollEnd
    }
}