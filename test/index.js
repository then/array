require('chai').use(require('chai-as-promised'))
require('mocha-as-promised')()
var assert = require('chai').assert

var Promise = require('../')

describe('ArrayPromise#reverse', function () {
  it('returns a reversed array but doesn\'t modify the original', function () {
    var original = [1, 2, 3, 4, 5]
    var promise = Promise.from(original)
    return assert.eventually.deepEqual(promise.reverse(), [5, 4, 3, 2, 1])
      .then(function () {
        assert.deepEqual(original, [1, 2, 3, 4, 5])
        return assert.eventually.deepEqual(promise, [1, 2, 3, 4, 5])
      })
  })
})

describe('ArrayPromise#concat', function () {
  it('returns a concatenated array but doesn\'t modify the original', function () {
    var original = [1, 2]
    var next = [3, 4]
    var fin = [5, 6]
    var promise = Promise.from(original)
    return assert.eventually.deepEqual(promise.concat(Promise.from(next), fin), [1, 2, 3, 4, 5, 6])
      .then(function () {
        assert.deepEqual(original, [1, 2])
        assert.deepEqual(next, [3, 4])
        assert.deepEqual(fin, [5, 6])
      })
  })
})

describe('ArrayPromise#slice', function () {
  it('returns a slice of the array without modifying it', function () {
    var original = [1, 2, 3, 4, 5]
    var promise = Promise.from(original)
    return assert.eventually.deepEqual(promise.slice(2, 4), [3, 4])
      .then(function () {
        assert.deepEqual(original, [1, 2, 3, 4, 5])
      })
  })
})

describe('ArrayPromise#map', function () {
  it('returns a map of the array without modifying it', function () {
    var original = [1, 2, 3, 4, 5]
    var promise = Promise.from(original)
    return assert.eventually.deepEqual(promise.map(function (val) {
      return Promise.from(val * 2)
    }), [2, 4, 6, 8, 10])
      .then(function () {
        assert.deepEqual(original, [1, 2, 3, 4, 5])
      })
  })
})

describe('ArrayPromise#filter', function () {
  it('returns a filter of the array without modifying it', function () {
    var original = [1, 2, 3, 4, 5]
    var promise = Promise.from(original)
    return assert.eventually.deepEqual(promise.filter(function (val) {
      return Promise.from(val % 2 === 0)
    }), [2, 4])
      .then(function () {
        assert.deepEqual(original, [1, 2, 3, 4, 5])
      })
  })
})

describe('ArrayPromise#reduce', function () {
  it('returns a reduce of the array without modifying it', function () {
    var original = [1, 2, 3, 4, 5]
    var promise = Promise.from(original)
    return assert.eventually.deepEqual(promise.reduce(function (acc, current) {
      return Promise.from(acc + current)
    }), 15)
      .then(function () {
        assert.deepEqual(original, [1, 2, 3, 4, 5])
      })
  })
})

describe('ArrayPromise#reduceRight', function () {
  it('returns a reduce of the array without modifying it', function () {
    var original = [1, 2, 3, 4, 5]
    var promise = Promise.from(original)
    return assert.eventually.deepEqual(promise.reduceRight(function (acc, current) {
      return Promise.from(acc + current)
    }), 15)
      .then(function () {
        assert.deepEqual(original, [1, 2, 3, 4, 5])
      })
  })
})

