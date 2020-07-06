export function debounce (callback, delay = 0) {

    if (delay === 0) {
        return callback;
    }

    var t = undefined;

    return function ($1, $2, $3, $4, $5) {
        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback($1, $2, $3, $4, $5);
        }, delay || 300);
    }
}
  

export function throttle (callback, delay) {

    var t = undefined;

    return function ($1, $2, $3, $4, $5) {
        if (!t) {
            t = setTimeout(function () {
                callback($1, $2, $3, $4, $5);
                t = null; 
            }, delay || 300);
        }

    }
}

export function keyEach (obj, callback) {
    Object.keys(obj).forEach( (key, index) => {
        callback (key, obj[key], index);
    })
}

export function keyMap (obj, callback) {
    return Object.keys(obj).map( (key, index) => {
        return callback (key, obj[key], index);
    })
}


export function isUndefined (value) {
    return typeof value == 'undefined' || value === null;
}

export function isNotUndefined (value) {
    return isUndefined(value) === false;
}

export function isArray (value) {
    return Array.isArray(value);
}

export function isBoolean (value) {
    return typeof value == 'boolean'
}

export function isString (value) {
    return typeof value == 'string'
}

export function isNotString (value) {
    return isString(value) === false;
}

export function isObject (value) {
    return typeof value == 'object' && !isArray(value) && !isNumber(value) && !isString(value)  && value !== null; 
}

export function isFunction (value) {
    return typeof value == 'function'
}

export function isNumber (value) {
    return typeof value == 'number';
}

export function clone (obj) {
    return JSON.parse(JSON.stringify(obj));
}

const HTML_TAG = {
    'image': true,
    'input': true,
    'br': true,
    'path': true,
    'line': true,
    'circle': true,
    'rect': true,
    'path': true, 
    'polygon': true,
    'polyline': true,
    'use': true
}


export const html = (strings, ...args) => {

    var results =  strings.map((it, index) => {
        
        var results = args[index] || ''

        if (isFunction(results)) {
            results = results()
        }

        if (!isArray(results)) {
            results = [results]
        }

        results = results.join('')

        return it + results;
    }).join('');

    results = results.replace(/\<(\w*)([^\>]*)\/\>/gim, function (match, p1) {
        if (HTML_TAG[p1.toLowerCase()]) {
            return match;
        } else {
            return match.replace('/>', `></${p1}>`)
        }
    })

    return results; 
}

const UUID_REG = /[xy]/g

export function uuid(){
    var dt = new Date().getTime();
    var uuid = 'xxx12-xx-34xx'.replace(UUID_REG, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export function uuidShort(){
    var dt = new Date().getTime();
    var uuid = 'idxxxxxxx'.replace(UUID_REG, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
