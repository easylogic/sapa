import { IKeyValue } from "../types";
import { isString } from "./func";
import { uuidShort } from "./uuid";

const map = new Map();
const aliasMap = {}
const __tempVariables = new Map();
const __tempVariablesGroup = new Map();

export const VARIABLE_SAPARATOR = "v:";


/**
 * props 를 넘길 때 해당 참조를 그대로 넘기기 위한 함수 
 * 
 * @param {any} value
 * @returns {string} 참조 id 생성 
 */
 export function variable(value: any, groupId: string = '') {
    const id = `${VARIABLE_SAPARATOR}${uuidShort()}`;

    __tempVariables.set(id, value);

    if (groupId) {
        __tempVariablesGroup.has(groupId) || __tempVariablesGroup.set(groupId, new Set());
        __tempVariablesGroup.get(groupId).add(id);
    }

    return id;
}

/**
 * groupId 로 지정된 변수를 초기화 해준다. 
 * 
 * @copilot
 * @param {*} groupId 
 */
export function initializeGroupVariables(groupId: string) {
    if (__tempVariablesGroup.has(groupId)) {
        __tempVariablesGroup.get(groupId).forEach((id: string) => {
            __tempVariables.delete(id);
        });
        __tempVariablesGroup.delete(groupId);
    }
}

/**
 * 참조 id 를 가지고 있는 variable 을 복구한다. 
 * 
 * @param {string} id
 * @returns {any}
 */
export function recoverVariable(id:string, removeVariable: boolean = true) {

    // console.log(id);
    if (isString(id) === false) {
        return id;
    }

    let value = id;

    if (__tempVariables.has(id)) {
        value = __tempVariables.get(id);

        if (removeVariable) {
            __tempVariables.delete(id);
        }
    }

    return value;
}

export function getVariable(idOrValue: string | any) {
    if (__tempVariables.has(idOrValue)) {
        return __tempVariables.get(idOrValue);
    }

    return idOrValue;
}

export function hasVariable(id: string) {
    return __tempVariables.has(id);
}

/**
 * 객체를 key=value 문자열 리스트로 변환한다. 
 * 
 * @param {object} obj 
 * @returns {string}
 */
export function spreadVariable(obj: IKeyValue) {

    return Object.entries(obj).map(([key, value]) => {
        return `${key}=${variable(value)}`
    }).join(" ");

}


/**
 * Element 등록
 * 
 * @param {object} classes 클래스명 리스트 
 */ 
export function registElement(classes: IKeyValue = {}) {

    Object.keys(classes).forEach(key => {
        if (map.has(key)) {
            // console.warn(`${key} element is duplicated.`)
            return;
        } 

        map.set(key, classes[key]);
    })
}

export function registAlias(key:string, value:any) {
    aliasMap[key] = value;
}

export function retriveAlias(key:string) {
    return aliasMap[key];
}

/**
 * 등록된 Element 반환 
 * 
 * @param {string} key
 * @returns {IUIElement}
 */ 
export function retriveElement(className: string) {
    return map.get(className);
}