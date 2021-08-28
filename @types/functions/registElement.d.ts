import { IKeyValue } from "../types";
/**
 * Element 등록
 *
 * @param {object} classes 클래스명 리스트
 */
export declare function registElement(classes?: IKeyValue): void;
/**
 * 등록된 Element 반환
 *
 * @param {string} key
 * @returns {IUIElement}
 */
export declare function retriveElement(className: string): any;
