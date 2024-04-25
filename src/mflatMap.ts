import { mflat } from './mflat.js';
import { mmap } from './mmap.js';
import type { ArrayCallback, ArrayElement } from './types.js';

/**
 * Maps each element of an array to a new array using a mapping function,
 * and then flattens the resulting array by one level in place.
 *
 * @template TArray - The type of the input array.
 * @template TOutput - The type of the output array.
 * @template TContext - The type of the context object.
 *
 * @param {TArray} array - The input array.
 * @param {ArrayCallback<ArrayElement<TArray>, ArrayElement<TOutput>>} callbackFn - The mapping function to apply to each element of the array.
 * @param {TContext} [thisArg] - The context object to use as `this` when executing the mapping function.
 * @returns {TOutput[]} - The flattened array.
 */
export function mflatMap<
  TArray extends unknown[],
  TOutput extends unknown[] = TArray,
  TContext = null,
>(
  array: TArray,
  callbackFn: ArrayCallback<ArrayElement<TArray>, ArrayElement<TOutput>>,
  thisArg?: TContext,
) {
  return mflat(mmap(array, callbackFn, thisArg), 1);
}
