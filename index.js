'use strict'

var Promise = require('promise')

module.exports = ArrayPromise

function slice(arr) {
  return Array.prototype.slice.call(arr)
}

function ArrayPromise(factory) {
  Promise.call(this, factory)
  this.then = arrayify(this.then)
}
ArrayPromise.prototype = Object.create(Promise.prototype)
ArrayPromise.prototype.constructor = ArrayPromise

var proto = (function () {
  function A() {}
  return (new A()).__proto__ === A.prototype
}())

ArrayPromise.from = function (value) {
  if (value instanceof ArrayPromise) return value
  if (value instanceof Promise && proto) {
    value.__proto__ = ArrayPromise.prototype
    value.then = arrayify(value.then)
  }
  return new ArrayPromise(function (resolve) { resolve(value) })
}
function arrayify(fn) {
  return function () {
    return ArrayPromise.from(fn.apply(this, arguments))
  }
}
ArrayPromise.denodeify = arrayify(Promise.denodeify)
ArrayPromise.nodeify = arrayify(Promise.nodeify)
ArrayPromise.all = arrayify(Promise.all)

ArrayPromise.prototype.reverse = function () {
  return this.then(function (res) {
    return slice(res).reverse()
  })
}

ArrayPromise.prototype.concat = function () {
  var args = slice(arguments)
  return this.then(function (res) {
    return ArrayPromise.all(args)
      .then(function (args) {
        return Array.prototype.concat.apply(res, args)
      })
  })
}

ArrayPromise.prototype.slice = function (begin) {
  var end = arguments[1]
  return this.then(function (res) {
    return Array.prototype.slice.call(res, begin, end)
  })
}

ArrayPromise.prototype.map = function (fn) {
  return this.then(function (res) {
    return Promise.all(Array.prototype.map.call(res, fn))
  })
}
ArrayPromise.prototype.filter = function (fn) {
  var self = this
  return this.map(fn)
  .then(function (includes) {
    return self.then(function (res) {
      return res.filter(function (res, i) { return includes[i] })
    })
  })
}

ArrayPromise.prototype.reduce = function (fn) {
  var length = arguments.length
  return this.then(function (res) {
    function reducer(acc, val) {
      return Promise.from(acc)
        .then(function (acc) {
          return fn(acc, val)
        })
    }
    if (length > 1) return Array.prototype.reduce.call(res, reducer, arguments[1])
    else return Array.prototype.reduce.call(res, reducer)
  })
}
ArrayPromise.prototype.reduceRight = function (fn, initial) {
  var length = arguments.length
  return this.then(function (res) {
    function reducer(acc, val) {
      return Promise.from(acc)
        .then(function (acc) {
          return fn(acc, val)
        })
    }
    if (length > 1) return Array.prototype.reduceRight.call(res, reducer, arguments[1])
    else return Array.prototype.reduceRight.call(res, reducer)
  })
}