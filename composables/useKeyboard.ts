

export function useKeyboard(){
    const eventEmitter = { onKeyDown: null};

    /**
     * Event
     * @param fn
     */
    const onKeyDown = (fn: (e: KeyboardEvent) => void) => {
        eventEmitter.onKeyDown = fn;
    };

    const onKeyDownEvent = (e: KeyboardEvent) => {
        eventEmitter.onKeyDown && eventEmitter.onKeyDown(e);
    }

    onMounted(() => {
        window.addEventListener('keydown', onKeyDownEvent)
    })

    onUnmounted(() => {
        window.removeEventListener('keydown', onKeyDownEvent)
    })

    return{
        onKeyDown,
    }
}