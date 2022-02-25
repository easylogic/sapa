import { IMultiCallback } from "../types";
import { BaseHandler } from "./BaseHandler";
import { IKeyValue } from '../../@types/types/index.d';
export default class CallbackHandler extends BaseHandler {
    private _callbacks;
    private _bindings;
    initialize(): void;
    destroy(): void;
    removeCallbackAll(): void;
    removeCallback({ animationFrameId }: IKeyValue): void;
    getBindings(): any;
    addBinding(obj: any): void;
    initBindings(): void;
    makeCallback(callbackObject: IKeyValue, callback: (arg0: any) => void): () => void;
    /**
     *
     * doubletab -> touchend 로 바뀜
     *
     * @param {string} eventName  이벤트 이름
     * @param {array} checkMethodFilters 매직 필터 목록
     */
    getDefaultCallbackObject(callbackName: any, checkMethodFilters: any): {
        callbackName: any;
        captures: any[];
        afterMethods: any[];
        beforeMethods: any[];
        delayMethods: any[];
        debounceMethods: any[];
        throttleMethods: any[];
        checkMethodList: any;
    };
    addCallback(callbackObject: {
        callbackName?: any;
        captures?: any[];
        afterMethods?: any[];
        beforeMethods?: any[];
        delayMethods?: any[];
        debounceMethods?: any[];
        throttleMethods?: any[];
        checkMethodList?: any;
        callback?: any;
    }, callback: any): void;
    bindingCallback(callbackName: any, checkMethodFilters: any, originalCallback: IMultiCallback): void;
    /**
     * 이벤트 문자열 파싱하기
     *
     * @param {string} key
     */
    parseCallback(key: string): void;
}
