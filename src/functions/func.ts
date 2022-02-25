import { IKeyValue, IMultiCallback, ISplitedMethod } from "../types";

const identity = () => true; 

/**
 * property 수집하기
 * 상위 클래스의 모든 property 를 수집해서 리턴한다.
 * 
 * @param {Object} root  상속관계에 있는 인스턴스 
 * @param {Function} checkFunction 제외될 필드 리스트 { [field]: true }
 * @returns {string[]} 나의 상위 모든 메소드를 수집해서 리턴한다. 
 */
export function collectProps(root: Object, checkFunction: Function = identity) {

    let p = root;
    let results: any[] = [];
    do {
        const isObject = p instanceof Object;

        if (isObject === false) {
            break;
        }

        const names = Object.getOwnPropertyNames(p).filter(name => {
            return root && isFunction(root[name]) && checkFunction(name);
        });

        results.push.apply(results, names);
    } while (p = Object.getPrototypeOf(p));


    return results;
}

export function debounce(callback: IMultiCallback, delay = 0) {

    if (delay === 0) {
        return callback;
    }

    var t: NodeJS.Timeout | undefined = undefined;

    return function (...args: any[]) {
        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback(...args);
        }, delay || 300);
    }
}

export function makeRequestAnimationFrame (callback: IMultiCallback, context: any) {
    return (...args: any[]) => {
        requestAnimationFrame(() => {
            callback.apply(context, args);
        });
    };
}


export function throttle(callback: IMultiCallback, delay: number) {

    var t: NodeJS.Timeout | null | undefined = undefined;

    return function (...args: any[]) {
        if (!t) {
            t = setTimeout(function () {
                callback(...args);
                t = null;
            }, delay || 300);
        }

    }
}

export function ifCheck(callback: Function, context: IKeyValue, checkMethods: any[]) {
    return (...args: any) => {
        const ifResult = checkMethods.every((check: { target: string | number; }) => {
            return context[check.target].apply(context, args);
        });

        if (ifResult) {
            callback.apply(context, args);
        }
    }
}

export function keyEach(obj: IKeyValue, callback: (key: string, value: any, index: number) => void) {
    Object.keys(obj).forEach((key, index) => {
        callback(key, obj[key], index);
    })
}

export function defaultValue(value: any, defaultValue: any) {
    return typeof value == 'undefined' ? defaultValue : value;
}

export function isUndefined(value: null) {
    return typeof value == 'undefined' || value === null;
}

export function isNotUndefined(value: any) {
    return isUndefined(value) === false;
}

export function isBoolean(value: any) {
    return typeof value == 'boolean'
}

export function isString(value: any) {
    return typeof value == 'string'
}

export function isArray(value: any) {
    return Array.isArray(value);
}

export function isNotString(value: any) {
    return isString(value) === false;
}

export function isObject(value: any) {
    return typeof value == 'object' && !Array.isArray(value) && !isNumber(value) && !isString(value) && value !== null;
}

export function isFunction(value: any) {
    return typeof value == 'function'
}

export function isNumber(value: any) {
    return typeof value == 'number';
}

export function isZero(num: number) {
    return num === 0;
}

export function isNotZero(num: number) {
    return !isZero(num);
}

export function clone(obj: any) {
    if (isUndefined(obj)) return undefined;
    return JSON.parse(JSON.stringify(obj));
}


export function combineKeyArray(obj: IKeyValue) {
    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
            obj[key] = obj[key].join(', ')
        }
    })

    return obj;
}



const short_tag_regexp = /\<(\w*)([^\>]*)\/\>/gim;

const HTML_TAG = {
    'image': true,
    'input': true,
    'br': true,
    'path': true,
    'line': true,
    'circle': true,
    'rect': true,
    'polygon': true,
    'polyline': true,
    'use': true
}


export const html = (strings: TemplateStringsArray, ...args: any[]): string => {

    var results = strings.map((it: any, index: string | number) => {

        var results = args[index] || ''

        if (isFunction(results)) {
            console.log(results);
            // results = results()
        }

        if (!Array.isArray(results)) {
            results = [results]
        }

        results = results.join('')

        return it + results;
    }).join('');

    results = results.replace(short_tag_regexp, function (match: string, p1: string) {
        if (HTML_TAG[p1.toLowerCase()]) {
            return match;
        } else {
            return match.replace('/>', `></${p1}>`)
        }
    })

    return results;
}


/**
 * 전체 문자열에서 특정 키워드 함수를 사용하는 패턴을 찾아 리턴해준다. 
 * 
 * @param {string[]} arr 
 * @param {string} keyword 
 */
export const splitMethodByKeyword = (arr: any[], keyword: string) => {
    const filterKeys = arr.filter((code: string | string[]) => code.indexOf(`${keyword}(`) > -1);
    const filterMaps = filterKeys.map((code: { split: (arg0: string) => { split: (arg0: string) => { trim: () => { (): any; new(): any; split: { (arg0: string): [any, any]; new(): any; }; }; }[]; }[]; }) => {
        const [target, param] = code
            .split(`${keyword}(`)[1]
            .split(")")[0]
            .trim()
            .split(" ");

        return { target, param } as ISplitedMethod;
    });

    return [filterKeys, filterMaps];
};