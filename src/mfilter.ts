import type { ArrayCallback } from './types.js';

/**
 * Filters the elements of an array based on a provided callback function in place.
 *
 * @param array - The input array to filter.
 * @param callbackFn - The callback function used to test each element of the array.
 * @param [thisArg] - The context object to be used as `this` within the callback function.
 * @returns The filtered array.
 */
export function mfilter<Item, Context = null>(
  array: Item[],
  callbackFn: ArrayCallback<Item, unknown, Context>,
  thisArg?: Context,
): Item[] {
  let l = array.length;
  for (let i = 0; i < l; i++) {
    array[i] = array[i + array.length - l]!;
    if (
      !callbackFn.call(
        thisArg ?? (null as Context),
        array[i]!,
        i + array.length - l,
        array,
      )
    ) {
      i--;
      l--;
    }
  }
  array.length = l;
  return array;
}
