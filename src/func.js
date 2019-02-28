export function debounce (callback, delay) {

    var t = undefined;

    return function (...args) {
        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback(...args);
        }, delay || 300);
    }
}

export function filterProps (instance, pattern = '/') {
    return Object.getOwnPropertyNames(instance.__proto__).filter(key => {
        return key.startsWith(pattern);
    });
}

export function collectProps (instance) {

    if (!instance.collectedProps) {
      var p = instance.__proto__ 
      var results = [] 
      do {
        results.push(...Object.getOwnPropertyNames(p))
        p  = p.__proto__;
      } while( p );

      instance.collectedProps = results
    }

    return instance.collectedProps; 
}

export function uuid(){
    var dt = new Date().getTime();
    var uuid = 'xxx12-xx-34xx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export function uuidShort(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
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

export function defaultValue (value, defaultValue) {
    return typeof value == 'undefined' ? defaultValue : value;
}

export function isUndefined (value) {
    return typeof value == 'undefined' || value == null;
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
    return typeof value == 'object' && !isArray(value) && value !== null; 
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


const short_tag_regexp = /\<(\w*)([^\>]*)\/\>/gim;

const HTML_TAG = {
    'image': true,
    'input': true
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

        results = results.map(r => {
            if (isObject(r)) {
                return Object.keys(r).map(key => {
                    return `${key}="${r[key]}"`
                }).join(' ')
            }

            return r
        }).join('')

        return it + results;
    }).join('');

    results = results.replace(short_tag_regexp, function (match, p1) {
        if (HTML_TAG[p1.toLowerCase()]) {
            return match;
        } else {
            return match.replace('/>', `></${p1}>`)
        }
    })

    return results; 
}