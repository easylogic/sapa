import { IKeyValue } from "../types";
export declare const VARIABLE_SAPARATOR = "v:";
/**
 * props 를 넘길 때 해당 참조를 그대로 넘기기 위한 함수
 *
 * @param {any} value
 * @returns {string} 참조 id 생성
 */
export declare function variable(value: any, groupId?: string): string;
/**
 * groupId 로 지정된 변수를 초기화 해준다.
 *
 * @copilot
 * @param {*} groupId
 */
export declare function initializeGroupVariables(groupId: string): void;
/**
 * 참조 id 를 가지고 있는 variable 을 복구한다.
 *
 * @param {string} id
 * @returns {any}
 */
export declare function recoverVariable(id: string, removeVariable?: boolean): string;
export declare function getVariable(idOrValue: string | any): any;
export declare function hasVariable(id: string): boolean;
/**
 * 객체를 key=value 문자열 리스트로 변환한다.
 *
 * @param {object} obj
 * @returns {string}
 */
export declare function spreadVariable(obj: IKeyValue): string;
/**
 * Element 등록
 *
 * @param {object} classes 클래스명 리스트
 */
export declare function registElement(classes?: IKeyValue): void;
export declare function registAlias(key: string, value: any): void;
export declare function retriveAlias(key: string): any;
/**
 * 등록된 Element 반환
 *
 * @param {string} key
 * @returns {IUIElement}
 */
export declare function retriveElement(className: string): any;
