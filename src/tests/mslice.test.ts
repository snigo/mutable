import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mslice } from 'src/mslice.js';

describe('mslice function', () => {
  it('should slice the elements of an array based on the provided start and end indexes in place', () => {
    const array = [1, 2, 3, 4, 5];
    const sliced = mslice(array, 1, 3);
    assert.deepStrictEqual(array, [2, 3]);
    assert.strictEqual(sliced, array);
  });

  it('should slice the elements of an array based on the provided start and end indexes in place with a negative start index', () => {
    const array = [1, 2, 3, 4, 5];
    const sliced = mslice(array, -3, 4);
    assert.deepStrictEqual(array, [3, 4]);
    assert.strictEqual(sliced, array);
  });

  it('should slice the elements of an array based on the provided start and end indexes in place with a negative end index', () => {
    const array = [1, 2, 3, 4, 5];
    const sliced = mslice(array, 1, -2);
    assert.deepStrictEqual(array, [2, 3]);
    assert.strictEqual(sliced, array);
  });

  it('should slice the elements of an array based on the provided start and end indexes in place with negative start and end indexes', () => {
    const array = [1, 2, 3, 4, 5];
    const sliced = mslice(array, -3, -2);
    assert.deepStrictEqual(array, [3]);
    assert.strictEqual(sliced, array);
  });

  it('should slice the elements of an array based on the provided start index only', () => {
    const array = [1, 2, 3, 4, 5];
    const sliced = mslice(array, 2);
    assert.deepStrictEqual(array, [3, 4, 5]);
    assert.strictEqual(sliced, array);
  });

  it('should slice the elements of an array based on the provided start index only with a negative start index', () => {
    const array = [1, 2, 3, 4, 5];
    const sliced = mslice(array, -2);
    assert.deepStrictEqual(array, [4, 5]);
    assert.strictEqual(sliced, array);
  });

  it('should keep array untouched if no start/end arguments provided', () => {
    const array = [1, 2, 3, 4, 5];
    const sliced = mslice(array);
    assert.strictEqual(sliced, array);
  });

  it('should account for out-of-bounds indexes', () => {
    const array = [1, 2, 3, 4, 5];
    const sliced1 = mslice(array, -10, 10);
    assert.deepStrictEqual(array, [1, 2, 3, 4, 5]);
    assert.strictEqual(sliced1, array);

    const sliced2 = mslice(array, 10);
    assert.deepStrictEqual(sliced2, []);
    assert.strictEqual(sliced2, array);
  });
});
