import assert from 'node:assert';
import { describe, it } from 'node:test';

import { mmap } from 'src/mmap.js';

describe('mmap function', () => {
  it('should map each element of an array to a new element using a mapping function in place', () => {
    const array = [1, 2, 3, 4, 5];
    const mapped = mmap(array, x => x * 2);
    assert.deepStrictEqual(array, [2, 4, 6, 8, 10]);
    assert.strictEqual(mapped, array);
  });

  it('should map each element of an array to a new element using a mapping function in place with a context object', () => {
    const array = [1, 2, 3, 4, 5];
    const context = { factor: 3 };
    const mapped = mmap(
      array,
      function (x) {
        return x * this.factor;
      },
      context,
    );
    assert.deepStrictEqual(array, [3, 6, 9, 12, 15]);
    assert.strictEqual(mapped, array);
  });

  it('should maintain the original array reference and indexes until the end of iteration', () => {
    const array = [1, 2, 3, 4, 5];
    const mapped = mmap(array, (element, i, a) => {
      assert.strictEqual(a.length, array.length);
      return i + element;
    });
    assert.deepStrictEqual(array, [1, 3, 5, 7, 9]);
    assert.strictEqual(mapped, array);
  });
});
