import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mfilter } from 'src/mfilter.js';

describe('mfilter function', () => {
  it('should filter the elements of an array based on a provided callback function in place', () => {
    const array = [1, 2, 3, 4, 5];
    const filtered = mfilter(array, element => element % 2 === 0);
    assert.deepStrictEqual(array, [2, 4]);
    assert.strictEqual(filtered, array);
  });

  it('should filter the elements of an array based on a provided callback function in place with a context object', () => {
    const array = [1, 2, 3, 4, 5];
    const context = { min: 3 };
    const filtered = mfilter(
      array,
      function (element) {
        return element >= this.min;
      },
      context,
    );
    assert.deepStrictEqual(array, [3, 4, 5]);
    assert.strictEqual(filtered, array);
  });

  it('should maintain the original array reference and indexes until the end of iteration', () => {
    const array = [1, 2, 3, 4, 5];
    const filtered = mfilter(array, (_, i, a) => {
      assert.strictEqual(a.length, array.length);
      return i % 2 === 0;
    });
    assert.deepStrictEqual(array, [1, 3, 5]);
    assert.strictEqual(filtered, array);
  });
});
