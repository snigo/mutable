import type { ArrayCallback, ArrayElement } from './types.js';

/**
 * Filters the elements of an array based on a provided callback function in place.
 *
 * @template TArray - The type of the input array.
 * @template TContext - The type of the context object to be used as `this` within the callback function.
 * @param {TArray} array - The input array to filter.
 * @param {ArrayCallback<ArrayElement<TArray>>} callbackFn - The callback function used to test each element of the array.
 * @param {TContext} [thisArg] - The context object to be used as `this` within the callback function.
 * @returns {TArray} - The filtered array.
 */
export function mfilter<TArray extends unknown[], TContext = null>(
  array: TArray,
  callbackFn: ArrayCallback<ArrayElement<TArray>>,
  thisArg?: TContext,
): TArray {
  let l = array.length;
  for (let i = 0; i < l; i++) {
    array[i] = array[i + array.length - l];
    if (
      !callbackFn.call(
        thisArg,
        array[i] as ArrayElement<TArray>,
        i + array.length - l,
        array as Array<ArrayElement<TArray>>,
      )
    ) {
      i--;
      l--;
    }
  }
  array.length = l;
  return array;
}
