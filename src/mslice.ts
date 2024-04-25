/**
 * Removes elements from an array in place and returns the modified array.
 *
 * @template TArray - The type of the array.
 * @param {TArray} array - The array to modify.
 * @param {number} [start=0] - The index at which to start removing elements. Defaults to 0.
 * @param {number} [end=array.length] - The index at which to stop removing elements. Defaults to the length of the array.
 * @returns {TArray} The modified array.
 */
export function mslice<TArray extends unknown[]>(
  array: TArray,
  start = 0,
  end = array.length,
): TArray {
  const deleteCount = Math.min(
    Math.max(start < 0 ? array.length + start : start, 0),
    array.length,
  );
  const length = Math.min(
    Math.max(end < 0 ? array.length + end : end, 0),
    array.length,
  );
  if (length - deleteCount <= 0) {
    array.length = 0;
    return array;
  }
  if (deleteCount) {
    array.splice(0, deleteCount);
  }
  array.length = length - deleteCount;
  return array;
}
