import { IKeyValue } from "../types";

const map = new Map();

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

/**
 * 등록된 Element 반환 
 * 
 * @param {string} key
 * @returns {IUIElement}
 */ 
export function retriveElement(className: string) {
    return map.get(className);
}