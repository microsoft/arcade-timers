//% color=#700204 icon="\uf254"
//% groups='[]'
namespace timer {
    /**
     * After a certain amount of time, the attached code will run.
     * Blocks after this one will run without waiting.
     */
    //% block="after $time do"
    //% time.defl=500
    //% handlerStatement=1
    //% %time=timePicker ms"
    export function after(time: number, thenDo: () => void) {
        setTimeout(thenDo, time)
    }

    /**
     * Run the attached code seperately from other code.
     * This creates a seperate context for "pause" so that pauses
     * within or without this code are seperated.
     */
    //% block="separately do"
    //% handlerStatement=1
    export function background(then: () => void) {
        control.runInBackground(then)
    }

    let decounceTimeouts: {[key: string]: number} = {}
    /**
     * After this block hasn't been called with the given key
     * for a certain amount of time run the attached code.
     * Also known as "debounce".
     */
    //% block="after $key settled for $time do"
    //% time.defl=500
    //% key.defl="action"
    //% handlerStatement=1
    //% %time=timePicker ms"
    export function debounce(key: string, time: number, thenDo: () => void) {
        if (decounceTimeouts[key]) {
            clearTimeout(decounceTimeouts[key])
        }
        decounceTimeouts[key] = setTimeout(thenDo, time)
    }

    let throttleTimeouts: { [key: string]: number } = {}
    /**
     * Ensure that the attached code isn't run more than
     * once per time interval for the given key.
     * Also known as "throttle".
     */
    //% block="for $key at most once every $time do"
    //% time.defl=500
    //% key.defl="action"
    //% handlerStatement=1
    //% %time=timePicker ms"
    export function throttle(key: string, time: number, thenDo: () => void) {
        if (!throttleTimeouts[key]) {
            throttleTimeouts[key] = setTimeout(() => {
                throttleTimeouts[key] = null;
                thenDo();
            }, time)
        }
    }
}
