(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":2,"./lib/keys.js":3}],2:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],3:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],4:[function(require,module,exports){
var isBuffer = require('is-buffer')

var flat = module.exports = flatten
flatten.flatten = flatten
flatten.unflatten = unflatten

function flatten(target, opts) {
  opts = opts || {}

  var delimiter = opts.delimiter || '.'
  var maxDepth = opts.maxDepth
  var output = {}

  function step(object, prev, currentDepth) {
    currentDepth = currentDepth ? currentDepth : 1
    Object.keys(object).forEach(function(key) {
      var value = object[key]
      var isarray = opts.safe && Array.isArray(value)
      var type = Object.prototype.toString.call(value)
      var isbuffer = isBuffer(value)
      var isobject = (
        type === "[object Object]" ||
        type === "[object Array]"
      )

      var newKey = prev
        ? prev + delimiter + key
        : key

      if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < maxDepth)) {
        return step(value, newKey, currentDepth + 1)
      }

      output[newKey] = value
    })
  }

  step(target)

  return output
}

function unflatten(target, opts) {
  opts = opts || {}

  var delimiter = opts.delimiter || '.'
  var overwrite = opts.overwrite || false
  var result = {}

  var isbuffer = isBuffer(target)
  if (isbuffer || Object.prototype.toString.call(target) !== '[object Object]') {
    return target
  }

  // safely ensure that the key is
  // an integer.
  function getkey(key) {
    var parsedKey = Number(key)

    return (
      isNaN(parsedKey) ||
      key.indexOf('.') !== -1
    ) ? key
      : parsedKey
  }

  Object.keys(target).forEach(function(key) {
    var split = key.split(delimiter)
    var key1 = getkey(split.shift())
    var key2 = getkey(split[0])
    var recipient = result

    while (key2 !== undefined) {
      var type = Object.prototype.toString.call(recipient[key1])
      var isobject = (
        type === "[object Object]" ||
        type === "[object Array]"
      )

      // do not write over falsey, non-undefined values if overwrite is false
      if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined') {
        return
      }

      if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null)) {
        recipient[key1] = (
          typeof key2 === 'number' &&
          !opts.object ? [] : {}
        )
      }

      recipient = recipient[key1]
      if (split.length > 0) {
        key1 = getkey(split.shift())
        key2 = getkey(split[0])
      }
    }

    // unflatten again for 'messy objects'
    recipient[key1] = unflatten(target[key], opts)
  })

  return result
}

},{"is-buffer":5}],5:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],6:[function(require,module,exports){
var Parser = function() {
  this.state = 'var' // var or val
  this.counter = 0
  this.lastStrOpening = null

  this.whitespaces = [' ', '\t', '\n']
  this.opening = ['[', '{']
  this.closing = [']', '}']
  this.strOpening = ["'", '"', '`']

  this.parsed = []
  this.buffer = ''
}

Parser.prototype.parse = function(str, scope) {
  Object.assign(this, scope)
  for (var i = 0; i < str.length; i++) {
    var ch = str.charAt(i)
    if (this.state === 'var') {
      if (this.contains(this.whitespaces, ch)) continue
      if (ch === '=') {
        this.pushBuffer()
        this.state = 'val'
        continue
      }
      if (ch === ',') {
        this.pushBuffer()
        continue
      }
      this.buffer += ch
      if (i === str.length - 1) {
        this.parsed.push(this.buffer)
        this.buffer = ''
      }
    } else if (this.state === 'val') {
      // if currently parsing a string add anything to the buffer
      if (this.lastStrOpening !== null) {
        if (this.lastStrOpening === ch) {
          this.lastStrOpening = null
        }

        this.buffer += ch

        var isLastElement = i === str.length - 1
        if(isLastElement) {
          this.pushBuffer()
        }

        continue
      }

      if (this.counter === 0 && this.contains(this.whitespaces, ch)) continue
      if (this.contains(this.opening, ch)) {
        this.counter++
      } else if (this.contains(this.closing, ch)) {
        this.counter--
      } else if (this.contains(this.strOpening, ch)) {
        this.lastStrOpening = ch
      }
      if (this.counter === 0 && ch === ',') {
        this.pushBuffer()
        this.state = 'var'
        continue
      }
      this.buffer += ch
      if (i === str.length - 1) {
        this.pushBuffer()
        this.state = 'var'
        continue
      }
    }
  }
  return this.parsed
}

Parser.prototype.contains = function(arr, ch) {
  for(var i in arr) {
    if (ch === arr[i]) {
      return true
    }
  }
  return false
}

Parser.prototype.pushBuffer = function() {
  if (this.state === 'var') {
    this.parsed.push(this.buffer)
  } else if (this.state === 'val') {
    var variable = this.parsed.pop()

    var defaultParam

    try{
      defaultParam = eval('(' + this.buffer + ')')
    } catch(e) {
      defaultParam = eval('(this.' + this.buffer + ')')
    }

    this.parsed.push([variable, defaultParam])
  }
  this.buffer = ''
}

module.exports = Parser

},{}],7:[function(require,module,exports){
var whitespaceRegex = /[\s\n\t]+/mg;
var functionHeadRegex = /^function\s*(?:(\w+)\s*)?\(\s*([^\)]*)\)/m;

module.exports = function(stringFunction, regex) {
  var matches = functionHeadRegex.exec(stringFunction);
  if (matches.length < 3) {
    throw new Error('Invalid function');
  }
  var args = matches[2] && matches[2].replace(whitespaceRegex, '').split(',') || [];
  var name = matches[1] || 'anonymous';

  return {
    name: name,
    args: args
  };
}
},{}],8:[function(require,module,exports){
var parseHeader = require('./header_parser');

var defaultParamsRegex = /var (\w+) = arguments.length > (\d+) && arguments\[(?:\2)\] !== undefined \? arguments\[(?:\2)\] : (.+);$/gm;
var paramRegex = /var (\w+) = arguments\[(\d+)\]/gm;
var spreadRegex = /(\w+)\[_key - (\d+)\] = arguments\[_key\];/gm;

module.exports = function(fn) {
  var src = fn.toString();
  var header = parseHeader(src);
  var args = header.args;

  var param;
  while ( (param = defaultParamsRegex.exec(src)) !== null ) {
    var name = param[1];
    var index = param[2];
    var value = param[3];
    try {
      value = eval('(' + value + ')');
    } catch(e) {
      value = 'var(' + value + ')';
    }
    args.splice(index, 0, [name, value]);
  }
  while ( (param = paramRegex.exec(src)) !== null ) {
    var name = param[1];
    var index = param[2];
    args.splice(index, 0, name);
  }
  while ( (param = spreadRegex.exec(src)) !== null ) {
    args.splice(param[2], 0, '...' + param[1]);
  }

  var body = src.slice(src.indexOf('{') + 1, -1).trim()

  return {
    name: header.name,
    args: args,
    body: body
  };
};

},{"./header_parser":7}],9:[function(require,module,exports){
var babelPresetES2015Reflector = require('./babel-preset-es2015-reflector');

module.exports = function(compiler) {
  switch (compiler) {
    case 'babel-preset-es2015':
      return babelPresetES2015Reflector;
    default:
      throw new Error('Compiler not found');
  }
}

},{"./babel-preset-es2015-reflector":8}],10:[function(require,module,exports){
var Parser = require('./argument_parser');
var whitespaceRegex = /[\s\n\t]+/mg;

module.exports = function(stringFunction, regex) {
  var matches = regex.exec(stringFunction);
  if (matches.length < 3) {
    throw new Error('Invalid function');
  }
  var parser = new Parser();
  var args = parser.parse(matches[2], this)

  var name = matches[1] || 'anonymous';

  return {
    name: name,
    args: args
  };
}

},{"./argument_parser":6}],11:[function(require,module,exports){
var babelReflector = require('./babel-preset-es2015-reflector');
var parseHeader = require('./header_parser');
var compilers = require('./compilers');

var functionHeadRegex = /^(?:function\s*)?(?:(\w+)\s*)?(?:\(?)\s*([^\)]*)(?:\)?)/;
var oneArgumentFunctionRegex = /^\w+/;

function reflector(fn) {
  var src;
  var body = src = fn.toString();
  var arrowIndex = src.lastIndexOf('=>');
  var arrowFunction = arrowIndex > -1;
  var inlineFunction = false;
  var oneArgumentFunction = false;

  if (arrowFunction) {
    body = src.substr(arrowIndex + 2).trim()
    if (body[0] != '{') {
      inlineFunction = true
    }
    if (src.substr(0,1) != '(') {
      oneArgumentFunction = true;
    }
  }

  if (oneArgumentFunction) {
    var matches = oneArgumentFunctionRegex.exec(src);
    if (matches.length < 1) {
      throw new Error('Invalid function');
    }
    var args = [matches[0]];
    var name = 'anonymous';
  } else {
    var header = parseHeader.call(this, src, functionHeadRegex);
    var name = header.name;
    var args = header.args;
  }

  body = (inlineFunction) ? 'return ' + body : body.slice(body.indexOf('{') + 1, -1).trim()

  return {
    name: name,
    args: args,
    body: body
  };
};

reflector.compiler = compilers;

module.exports = reflector;

},{"./babel-preset-es2015-reflector":8,"./compilers":9,"./header_parser":10}],12:[function(require,module,exports){
const functionReflector = require('js-function-reflector')

module.exports = function (matchFunction) {
  const reflectedFunction = functionReflector.call(this, matchFunction)

  return {
    args: reflectedFunction.args,
    func: matchFunction
  }
}

},{"js-function-reflector":11}],13:[function(require,module,exports){
const deepEqual = require('deep-equal')
const objectEquals = require('./objectEquals')
const option = require('./option')

module.exports = (match, subjectToMatch) => {
  const hasMatchValue = match.args[0].length >= 2
  if (!hasMatchValue) {
    return option.Some(subjectToMatch)
  }

  const matchValue = match.args[0][1]

  // if is a type check, check type
  if (matchValue === Boolean && typeof subjectToMatch === 'boolean') {
    return option.Some(subjectToMatch)
  }
  if (matchValue === undefined && typeof subjectToMatch === 'undefined') {
    return option.Some(subjectToMatch)
  }
  if (matchValue === Number && typeof subjectToMatch === 'number') {
    return option.Some(subjectToMatch)
  }
  if (matchValue === String && typeof subjectToMatch === 'string') {
    return option.Some(subjectToMatch)
  }
  if (matchValue === Object && typeof subjectToMatch === 'object') {
    return option.Some(subjectToMatch)
  }

  // if is instance check, check instance
  if (
    typeof matchValue === 'function' &&
    subjectToMatch instanceof matchValue
  ) {
    return option.Some(subjectToMatch)
  }

  // if it is a regex, and the value is a string, test that it matches
  if (matchValue instanceof RegExp && typeof subjectToMatch === 'string') {
    if (matchValue.test(subjectToMatch)) {
      return option.Some(subjectToMatch)
    }
  }

  // if its array
  if (
    subjectToMatch instanceof Array &&
    matchValue instanceof Array
  ) {
    if (deepEqual(subjectToMatch, matchValue)) {
      return option.Some(subjectToMatch)
    }
  }

  // if is object (and not an array), check if contains
  if (typeof subjectToMatch === 'object' && subjectToMatch !== null && !(subjectToMatch instanceof Array) && typeof matchValue === 'object') {
    if (objectEquals(matchValue, subjectToMatch)) {
      return option.Some(subjectToMatch)
    }
  }

  // if is value check, check value
  if (subjectToMatch === matchValue) {
    return option.Some(subjectToMatch)
  }

  return option.None
}

},{"./objectEquals":16,"./option":17,"deep-equal":1}],14:[function(require,module,exports){
const deepEqual = require('deep-equal')
const option = require('./option')
const match = require('./match')

module.exports = (currentMatch, subjectToMatch) => {
  const matchArgs = currentMatch.args.map(
    (x, index) =>
      Array.isArray(x) ? { key: x[0], value: x[1], index } : { key: x, index }
  )

  if (subjectToMatch.length < matchArgs.length) {
    const matchOnSubArg = (arg, toMatch) => 'value' in arg
      ? deepEqual(arg.value, toMatch)
      : true

    const matchAllSubArgs = matchArgs
      .slice(0, matchArgs.length - 1)
      .every((arg, index) => matchOnSubArg(arg, subjectToMatch[index]))

    if (matchAllSubArgs && deepEqual(matchArgs[matchArgs.length - 1].value, [])) {
      return option.Some(subjectToMatch[0])
    }

    return option.None
  }

  const heads = Array.from(
    Array(matchArgs.length - 1),
    (x, y) => subjectToMatch[y]
  )
  const tail = subjectToMatch.slice(matchArgs.length - 1)

  // CAUTION: it gets the tail arg and removes from matchArgs (due splice function)
  const [tailArg] = matchArgs.splice(matchArgs.length - 1, 1)
  if (tailArg.value) {
    const matchObject = { args: [[undefined, tailArg.value]] }
    const matchResult = match(matchObject, tail)
    if (matchResult === option.None) {
      return option.None
    }
  }

  const headsWithArgs = matchArgs.filter(x => x.value)
  for (let i = 0; i < headsWithArgs.length; i++) {
    const matchObject = {
      args: [[headsWithArgs[i].key, headsWithArgs[i].value]]
    }

    const matchResult = match(matchObject, heads[headsWithArgs[i].index])
    if (matchResult === option.None) {
      return option.None
    }
  }

  return option.Some(heads.concat([tail]))
}

},{"./match":13,"./option":17,"deep-equal":1}],15:[function(require,module,exports){
const flatten = require('flat')
const { checkArray, compose, containsAll, isChar } = require('./utils')

// This is just an approach for deriving an actual js object
// from the punned syntax of object destructuring in the
// function argument reflection, that object can then
// be used to check the keys of the subjectToMatch
const buildSpecFromReflectedArgs = str =>
  [...str].reduce((res, curr, i) => {
    switch (true) {
      // add a dummy value when a key without a value is found
      case /(,|})/.test(curr) && isChar(str.charAt(i - 1)):
        return res.concat('":1').concat(curr)

      // add a opening quote to keynames that are missing them
      case isChar(curr) && !isChar(str.charAt(i - 1)):
      // add a closing quote to keynames that are missing them
      /* falls through */
      case curr === ':' && str.charAt(i - 1) !== '"':
        return res.concat('"').concat(curr)

      default:
        return res.concat(curr)
    }
  }, '')

// derive a flattened list of keys|paths from an object
const getFlattenedKeys = compose(Object.keys, flatten)

const getFlattenedKeysFromArgs = compose(
  getFlattenedKeys,
  JSON.parse,
  // add dummy values so an object can be parsed from the args
  buildSpecFromReflectedArgs,
  // join the args back into original string
  xs => xs.join(','),
  // throw an error if passed a non array
  checkArray
)

const objectAndArgsDestructureMatches = (reflectedArgs, subjectToMatch) =>
  containsAll(
    getFlattenedKeysFromArgs(reflectedArgs),
    getFlattenedKeys(subjectToMatch)
  )

module.exports = {
  getFlattenedKeysFromArgs,
  objectAndArgsDestructureMatches
}

},{"./utils":18,"flat":4}],16:[function(require,module,exports){
const deepEqual = require('deep-equal')

function getPropByString (obj, propString) {
  if (!propString) {
    return obj
  }

  let i
  let iLen
  let prop
  let props = propString.split('.')

  for (i = 0, iLen = props.length - 1; i < iLen; i++) {
    prop = props[i]

    const candidate = obj[prop]
    if (candidate !== undefined) {
      obj = candidate
    } else {
      break
    }
  }
  return obj[props[i]]
}

module.exports = (a, b) => {
  const objectEquals = (objectA, nestedKeys = []) => {
    if (objectA.constructor === Object) {
      const keys = Object.keys(objectA)

      for (var i in keys) {
        const key = keys[i]
        const nestedClone = nestedKeys.slice(0)
        nestedClone.push(key)

        const valueA = getPropByString(a, nestedClone.join('.'))
        const valueB = getPropByString(b, nestedClone.join('.'))

        if (
          !(valueA instanceof Object) &&
          !(valueB instanceof Object) &&
          valueA !== valueB
        ) {
          return false
        }

        if (
          (valueA instanceof Array) &&
          (valueB instanceof Array) &&
          !deepEqual(valueA, valueB)
        ) {
          return false
        }

        const partialResult = objectEquals(objectA[key], nestedClone)
        if (partialResult === false) {
          return false
        }
      }
    }

    return true
  }

  return objectEquals(a)
}

},{"deep-equal":1}],17:[function(require,module,exports){
module.exports = {
  Some: (value) => ({ value, hasValue: true }),
  None: {}
}

},{}],18:[function(require,module,exports){
// runtime type check for debugging purposes
const checkArray = xs => {
  if (!Array.isArray(xs)) {
    throw new Error('matchObject expects a list of strings')
  }

  return xs
}

// standard compose function

const compose = (...fns) => x => fns.reduceRight((v,f) => f(v) , x)

// intended to take a single char and return true if it is a letter or number
const isChar = x => /[a-zA-Z0-9]/.test(x)

// takes two lists and returns true if all of the elements in the first
// list are present in the second list
const containsAll = (xs, ys) =>
  xs.map(x => y => y.includes(x)).reduce((res, f) => f(ys) && res, true)

// checks if a reflected list of arguments contains
// object destructuring syntax
const hasDestructuredObjectArguments = xs =>
  xs.some(x => /({|})/.test(x) && !/function/.test(x))

module.exports = {
  hasDestructuredObjectArguments,
  checkArray,
  containsAll,
  compose,
  isChar
}

},{}],19:[function(require,module,exports){
const getMatchDetails = require('./getMatchDetails')
const match = require('./match')
const matchArray = require('./matchArray')
const { hasDestructuredObjectArguments } = require('./utils')
const { objectAndArgsDestructureMatches } = require('./matchObject')

const resolveMatchFunctions = (subjectToMatch, functions, scope) => {
  for (let i = 0; i < functions.length; i++) {
    const currentMatch = getMatchDetails.call(scope, functions[i])

    const matchHasSingleArgument = currentMatch.args.length === 1
    if (matchHasSingleArgument) {
      const singleValueResolve = match(currentMatch, subjectToMatch)
      if (singleValueResolve.hasValue) {
        return currentMatch.func(singleValueResolve.value)
      }
    }

    const matchHasMultipleArguments = currentMatch.args.length > 1
    if (matchHasMultipleArguments && Array.isArray(subjectToMatch)) {
      const multipleItemResolve = matchArray(currentMatch, subjectToMatch)
      if (
        multipleItemResolve.hasValue &&
        Array.isArray(multipleItemResolve.value)
      ) {
        return currentMatch.func.apply(null, multipleItemResolve.value)
      }

      if (multipleItemResolve.hasValue) {
        return currentMatch.func(multipleItemResolve.value)
      }
    }

    if (
      hasDestructuredObjectArguments(currentMatch.args) &&
      objectAndArgsDestructureMatches(currentMatch.args, subjectToMatch)
    ) {
      return currentMatch.func(subjectToMatch)
    }
  }
}

const matches = (subjectToMatch) => function (...functions) {
  return resolveMatchFunctions(subjectToMatch, functions, this)
}

module.exports = { matches }

},{"./getMatchDetails":12,"./match":13,"./matchArray":14,"./matchObject":15,"./utils":18}]},{},[12,14,13,15,16,17,18,19]);
