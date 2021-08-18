export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
    let timeoutID: number = 0;
    return function(this: any, ...args: any[]) {
        clearTimeout(timeoutID);
        timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
    } as F;
}

export function throttle<F extends (...params: any[]) => void>(fn: F, delay: number) {
    let waiting : boolean = false;
    return function(this: any, ...args: any[]) {
        if (!waiting) {
            fn.apply(this);
            waiting = true;
            setTimeout(function () {
                waiting = false;
            }, delay);
        }
    } as F;
}