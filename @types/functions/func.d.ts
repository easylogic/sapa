import { IKeyValue, IMultiCallback } from "../types";
/**
 * property 수집하기
 * 상위 클래스의 모든 property 를 수집해서 리턴한다.
 *
 * @param {Object} root  상속관계에 있는 인스턴스
 * @param {Function} checkFunction 제외될 필드 리스트 { [field]: true }
 * @returns {string[]} 나의 상위 모든 메소드를 수집해서 리턴한다.
 */
export declare function collectProps(root: Object, checkFunction?: Function): any[];
export declare function debounce(callback: IMultiCallback, delay?: number): IMultiCallback;
export declare function throttle(callback: IMultiCallback, delay: number): (...args: any[]) => void;
export declare function ifCheck(callback: Function, context: IKeyValue, checkMethods: any[]): (...args: any) => void;
export declare function keyEach(obj: IKeyValue, callback: (key: string, value: any, index: number) => void): void;
export declare function defaultValue(value: any, defaultValue: any): any;
export declare function isUndefined(value: null): boolean;
export declare function isNotUndefined(value: any): boolean;
export declare function isBoolean(value: any): boolean;
export declare function isString(value: any): boolean;
export declare function isNotString(value: any): boolean;
export declare function isObject(value: any): boolean;
export declare function isFunction(value: any): boolean;
export declare function isNumber(value: any): boolean;
export declare function isZero(num: number): boolean;
export declare function isNotZero(num: number): boolean;
export declare function clone(obj: any): any;
export declare function combineKeyArray(obj: IKeyValue): IKeyValue;
export declare const html: (strings: TemplateStringsArray, ...args: any[]) => string;
/**
 * 전체 문자열에서 특정 키워드 함수를 사용하는 패턴을 찾아 리턴해준다.
 *
 * @param {string[]} arr
 * @param {string} keyword
 */
export declare const splitMethodByKeyword: (arr: any[], keyword: string) => any[][];
