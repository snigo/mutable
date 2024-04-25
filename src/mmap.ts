import type { ArrayCallback } from './types.js';

/**
 * Maps over an array and applies a callback function to each element in place.
 *
 * @param array - The input array.
 * @param callbackFn - The callback function to apply to each element.
 * @param [thisArg] - The context object to use as `this` when calling the callback function.
 * @returns The mapped array.
 */
export function mmap<Item, MapReturn, Context = null>(
  array: Item[],
  callbackFn: ArrayCallback<Item, MapReturn, Context>,
  thisArg?: Context,
) {
  for (let i = 0; i < array.length; i += 1) {
    array[i] = callbackFn.call(
      thisArg ?? (null as Context),
      array[i]!,
      i,
      array,
    ) as unknown as Item;
  }
  return array as unknown as MapReturn[];
}
