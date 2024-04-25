# @gigwork/mutable

Mutable array functions. In 90% of time you don't need to mutate array and, frankly, it might be harmful. But there is always those 10% when you might need just that! Works just like their immutable counterparts, but itsy bitsy teeny weeny bit faster due to not creating new instances of arrays.

## Installation

```bash
# npm
npm install @gigwork/mutable

# yarn
yarn add @gigwork/mutable

# pnpm
pnpm add @gigwork/mutable
```

## Usage

```javascript
import { mmap, mfilter } from '@gigwork/mutable';

const arr = [1, 2, 3, 4, 5];
const mapped = mmap(
  mfilter(arr, x => x % 2 === 0),
  x => x * 2,
);
// => [4, 8, 12]

mapped === arr; // => true
```

## Functions A-Z

### `mfilter`

Filters the elements of an array based on a provided callback function in place.

#### Parameters

- `array` (`Array<T>`) - The array to filter.
- `callback` (`(value: T, index: number, array: T[]) => boolean`) - The function to test each element of the array.
- `thisArg` (`any`) - Optional value to use as `this` when executing `callback`.

#### Returns

- `Array<T>` - The same array instance filtered according to provided callback.

#### Example

```javascript
import { mfilter } from '@gigwork/mutable';

const arr = [1, 2, 3, 4, 5];
const filtered = mfilter(arr, x => x % 2 === 0);
// => [2, 4]

filtered === arr; // => true
```

#### Note

`mfilter` will keep the reference to the original array and indexes of the elements until the end of iteration, so it's safe to rely on indexes in the callback:

```javascript
const arr = [1, 2, 3, 4, 5];
mfilter(arr, (x, i) => i % 2 === 0);
// => [1, 3, 5]
```

---

### `mflat`

Flattens all sub-array elements of the provided array up to the specified depth in place

#### Parameters

- `array` (`Array<T>`) - The array to flatten.
- `depth` (`number`) - The depth level specifying how deep a nested array structure should be flattened. Defaults to `1`.

#### Returns

- `Array<T>` - The same array instance flattened up to the specified depth.

#### Example

```javascript
import { mflat } from '@gigwork/mutable';

const arr = [1, [2, [3, [4, 5]]]];
const flattened = mflat(arr, 2);
// => [1, 2, 3, [4, 5]]

flattened === arr; // => true
```

---

### `mflatMap`

Maps each element of an array to a new array using a mapping function, and then flattens the resulting array by one level in place.

#### Parameters

- `array` (`Array<T>`) - The array to map and flatten.
- `callback` (`(value: T, index: number, array: T[]) => O`) - The function that produces an array of new elements.
- `thisArg` (`any`) - Optional value to use as `this` when executing `callback`.

#### Returns

- `Array<O>` - The same array instance mapped and flattened.

#### Example

```javascript
import { mflatMap } from '@gigwork/mutable';

const arr = [1, 2, 3];
const mapped = mflatMap(arr, x => [x, x * 2]);
// => [1, 2, 2, 4, 3, 6]

mapped === arr; // => true
```

---

### `mmap`

Maps each element of an array using a mapping function in place.

#### Parameters

- `array` (`Array<T>`) - The array to map.
- `callback` (`(value: T, index: number, array: T[]) => O`) - The function that produces an element of the new array.
- `thisArg` (`any`) - Optional value to use as `this` when executing `callback`.

#### Returns

- `Array<O>` - The same array instance mapped according to provided callback.

#### Example

```javascript
import { mmap } from '@gigwork/mutable';

const arr = [1, 2, 3];
const mapped = mmap(arr, x => x * 2);
// => [2, 4, 6]

mapped === arr; // => true
```

#### Note on TypeScript usage

If you're changing type of the elements it's advised to re-assign the result to the original array to keep the type information:

```typescript
const arr = [1, 2, 3];
const mapped = mmap(arr, x => x.toString());

type OriginalType = typeof arr; // => number[]
type MappedType = typeof mapped; // => string[]

arr === mapped; // => true
```

The same applies to `mflatMap` function.

If, for some reason TypeScript cannot infer the return type of the callback correctly, you can provide it explicitly as a generic parameter:

```typescript
const arr = [1, 2, 3];
type Input = number;
type Output = string;
const mapped = mmap<Input, Output>(arr, x => x.toString());
```

---

### `mslice`

Removes elements from an array in place and returns the modified array according to the specified start and end indexes.

#### Parameters

- `array` (`Array<T>`) - The array to modify.
- `start` (`number`) - The index at which to begin the removal. Defaults to `0`.
- `end` (`number`) - The index at which to end the removal. Defaults to `array.length`.

#### Returns

- `Array<T>` - The same array instance with elements removed according to the specified indexes.

#### Example

```javascript
import { mslice } from '@gigwork/mutable';

const arr = [1, 2, 3, 4, 5];
const sliced = mslice(arr, 1, -1);
// => [2, 3, 4]

sliced === arr; // => true
```
