import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mflat } from 'src/mflat.js';

describe('mflat function', () => {
  it('should flatten all sub-array elements of the provided array up to the specified depth in place', () => {
    const array = [1, [2, [3, [4, 5]]]];
    const flattened = mflat(array, 1);
    assert.deepStrictEqual(array, [1, 2, [3, [4, 5]]]);
    assert.strictEqual(flattened, array);

    const deepFlattened = mflat(array, Infinity);
    assert.deepStrictEqual(array, [1, 2, 3, 4, 5]);
    assert.strictEqual(deepFlattened, array);
  });

  it('should apply minimum depth if not provided', () => {
    const array = [1, [2, [3, [4, 5]]]];
    const flattened = mflat(array);
    assert.deepStrictEqual(array, [1, 2, [3, [4, 5]]]);
    assert.strictEqual(flattened, array);
  });

  it('should ingnore negative or invalid depth', () => {
    const array = [1, [2, [3, [4, 5]]]];
    const flattened1 = mflat(array, -1);
    assert.strictEqual(flattened1, array);

    const flattened2 = mflat(array, -Infinity);
    assert.strictEqual(flattened2, array);

    const flattened3 = mflat(array, NaN);
    assert.strictEqual(flattened3, array);
  });
});
