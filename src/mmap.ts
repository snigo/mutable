import type { ArrayCallback, ArrayElement } from './types.js';

/**
 * Maps over an array and applies a callback function to each element in place.
 *
 * @template TArray - The input array type.
 * @template TOutput - The output array type. Defaults to the same as the input array type.
 * @template TContext - The type of the context object to use as `this` when calling the callback function.
 * @param {TArray} array - The input array.
 * @param {ArrayCallback<ArrayElement<TArray>, ArrayElement<TOutput>>} callbackFn - The callback function to apply to each element.
 * @param {TContext} [thisArg] - The context object to use as `this` when calling the callback function.
 * @returns {TOutput} - The mapped array.
 */
export function mmap<
  TArray extends unknown[],
  TOutput extends unknown[] = TArray,
  TContext = null,
>(
  array: TArray,
  callbackFn: ArrayCallback<ArrayElement<TArray>, ArrayElement<TOutput>>,
  thisArg?: TContext,
): TOutput {
  for (let i = 0; i < array.length; i += 1) {
    array[i] = callbackFn.call(
      thisArg,
      array[i] as ArrayElement<TArray>,
      i,
      array as Array<ArrayElement<TArray>>,
    );
  }
  return array as unknown as TOutput;
}
