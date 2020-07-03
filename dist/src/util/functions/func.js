"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.throttle = throttle;
exports.keyEach = keyEach;
exports.keyMap = keyMap;
exports.isUndefined = isUndefined;
exports.isNotUndefined = isNotUndefined;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isString = isString;
exports.isNotString = isNotString;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.clone = clone;
exports.uuid = uuid;
exports.uuidShort = uuidShort;
exports.html = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function debounce(callback, delay) {
  var t = undefined;
  return function ($1, $2, $3, $4, $5) {
    if (t) {
      clearTimeout(t);
    }

    t = setTimeout(function () {
      callback($1, $2, $3, $4, $5);
    }, delay || 300);
  };
}

function throttle(callback, delay) {
  var t = undefined;
  return function ($1, $2, $3, $4, $5) {
    if (!t) {
      t = setTimeout(function () {
        callback($1, $2, $3, $4, $5);
        t = null;
      }, delay || 300);
    }
  };
}

function keyEach(obj, callback) {
  Object.keys(obj).forEach(function (key, index) {
    callback(key, obj[key], index);
  });
}

function keyMap(obj, callback) {
  return Object.keys(obj).map(function (key, index) {
    return callback(key, obj[key], index);
  });
}

function isUndefined(value) {
  return typeof value == 'undefined' || value === null;
}

function isNotUndefined(value) {
  return isUndefined(value) === false;
}

function isArray(value) {
  return Array.isArray(value);
}

function isBoolean(value) {
  return typeof value == 'boolean';
}

function isString(value) {
  return typeof value == 'string';
}

function isNotString(value) {
  return isString(value) === false;
}

function isObject(value) {
  return _typeof(value) == 'object' && !isArray(value) && !isNumber(value) && !isString(value) && value !== null;
}

function isFunction(value) {
  return typeof value == 'function';
}

function isNumber(value) {
  return typeof value == 'number';
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

var short_tag_regexp = /\<(\w*)([^\>]*)\/\>/gim;
var HTML_TAG = {
  'image': true,
  'input': true,
  'br': true,
  'path': true
};

var html = function html(strings) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var results = strings.map(function (it, index) {
    var results = args[index] || '';

    if (isFunction(results)) {
      results = results();
    }

    if (!isArray(results)) {
      results = [results];
    }

    results = results.map(function (r) {
      if (isObject(r) && !isArray(r)) {
        return Object.keys(r).map(function (key) {
          return "".concat(key, "=\"").concat(r[key], "\"");
        }).join(' ');
      }

      return r;
    }).join('');
    return it + results;
  }).join('');
  results = results.replace(short_tag_regexp, function (match, p1) {
    if (HTML_TAG[p1.toLowerCase()]) {
      return match;
    } else {
      return match.replace('/>', "></".concat(p1, ">"));
    }
  });
  return results;
};

exports.html = html;
var UUID_REG = /[xy]/g;

function uuid() {
  var dt = new Date().getTime();
  var uuid = 'xxx12-xx-34xx'.replace(UUID_REG, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}

function uuidShort() {
  var dt = new Date().getTime();
  var uuid = 'idxxxxxxx'.replace(UUID_REG, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}