/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 * @param {number} number
 * @param {number} lower
 * @param {number} upper
 * @example
 *
 * _.clamp(-10, -5, 5);
 * // => -5
 *
 * _.clamp(10, -5, 5);
 * // => 5
 */
export const clamp = (number: number, lower: number, upper: number): number => {
    number = +number
    lower = +lower
    upper = +upper
    lower = lower === lower ? lower : 0
    upper = upper === upper ? upper : 0
    if (number === number) {
        number = number <= upper ? number : upper
        number = number >= lower ? number : lower
    }
    return number
}