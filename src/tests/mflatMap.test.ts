import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mflatMap } from 'src/mflatMap.js';

describe('mflatMap function', () => {
  it('should map each element of an array to a new array using a mapping function, and then flatten the resulting array by one level in place', () => {
    const array = [1, 2, 3, 4, 5];
    const mapped = mflatMap(array, x => [x - 1, x + 1]);
    assert.deepStrictEqual(array, [0, 2, 1, 3, 2, 4, 3, 5, 4, 6]);
    assert.strictEqual(mapped, array);
  });

  it('should map each element of an array to a new array using a mapping function, and then flatten the resulting array by one level in place with a context object', () => {
    const array = [1, 2, 3, 4, 5];
    const context = { delta: 3 };
    const mapped = mflatMap(
      array,
      function (this, x) {
        return [x - this.delta, x + this.delta];
      },
      context,
    );
    assert.deepStrictEqual(array, [-2, 4, -1, 5, 0, 6, 1, 7, 2, 8]);
    assert.strictEqual(mapped, array);
  });
});
