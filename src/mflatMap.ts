import { mflat } from './mflat.js';
import { mmap } from './mmap.js';
import type { ArrayCallback } from './types.js';

/**
 * Maps each element of an array to a new array using a mapping function,
 * and then flattens the resulting array by one level in place.
 *
 * @param array - The input array.
 * @param callbackFn - The mapping function to apply to each element of the array.
 * @param [thisArg] - The context object to use as `this` when executing the mapping function.
 * @returns The flattened array.
 */
export function mflatMap<Item, MapReturn, Context = null>(
  array: Item[],
  callbackFn: ArrayCallback<Item, MapReturn, Context>,
  thisArg?: Context,
) {
  return mflat(mmap(array, callbackFn, thisArg), 1);
}
