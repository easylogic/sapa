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