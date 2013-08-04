# then-array

Extra methods for promises for arrays

[![Build Status](https://travis-ci.org/then/array.png?branch=master)](https://travis-ci.org/then/array)
[![Dependency Status](https://gemnasium.com/then/array.png)](https://gemnasium.com/then/array)
[![NPM version](https://badge.fury.io/js/then-array.png)](http://badge.fury.io/js/then-array)

## Installation

    npm install then-array

## API

`ArrayPromise` inherits the entire API of [promise](https://github.com/then/promise) but all methods return instances of `ArrayPromise` where they would've returned instances of `Promise`.  Those methods are:

 - `ArrayPromise.from(value)`
 - `ArrayPromise.all(array) / Promise.all(a, b, c, ...)`
 - `ArrayPromise.denodeify(fn)`
 - `ArrayPromise.nodeify(fn)`
 - `ArrayPromise#then(onFulfilled, onRejected)`
 - `ArrayPromise#done(onFulfilled, onRejected)`
 - `ArrayPromise#nodeify(callback)`

In addition, the following methods are provided with APIs that correspond to the Array equivallents but which support promises everywhere:

 - `ArrayPromise#reverse()` returns a promise for a new array with the elements reversed
 - `ArrayPromise#concat(args...)` if args are arrays or promises for arrays it will return a promise for all the arrays concatenated together.
 - `ArrayPromise#slice(begin[, end])` return a promise for that portion of the array
 - `ArrayPromise#map(fn)` parallel, promised map
 - `ArrayPromise#filter(fn)` parallel, promised filter
 - `ArrayPromise#reduce(fn[, initial])` promised reduce
 - `ArrayPromise#reduceRight(fn[, initial])` promised reduceRight

## License

  MIT