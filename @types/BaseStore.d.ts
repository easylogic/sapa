import { IMultiCallback, IKeyValue } from "./types";
/**
 * @class BaseStore
 * @description BaseStore is the base class for all stores.
 *
 */
export declare class BaseStore {
    cachedCallback: {};
    callbacks: {};
    editor: any;
    source: any;
    constructor(editor?: any);
    getCallbacks(event: string): any;
    setCallbacks(event: string, list?: never[]): void;
    /**
     * 메세지 등록
     *
     * @param {string} event
     * @param {Function} originalCallback
     * @param {EventMachine} context
     * @param {number} debounceDelay
     * @param {number} throttleDelay
     * @param {boolean} enableAllTrigger
     * @param {boolean} enableSelfTrigger
     * @param {string[]} [beforeMethods=[]]
     * @returns {Function} off callback
     */
    on(event: any, originalCallback: IMultiCallback, context: IKeyValue, debounceDelay?: number, throttleDelay?: number, enableAllTrigger?: boolean, enableSelfTrigger?: boolean, beforeMethods?: never[]): () => void;
    debug(message: string, event: any, sourceName?: any): void;
    /**
     * 메세지 해제
     *
     * @param {string} event
     * @param {*} originalCallback
     */
    off(event: any, originalCallback: any): void;
    offAll(context: {
        sourceName: any;
    }): void;
    getCachedCallbacks(event: any): any;
    sendMessage(source: any, event: string | Function, ...args: any[]): void;
    nextSendMessage(source: any, callback: IMultiCallback, ...args: any[]): void;
    triggerMessage(source: (source: any, event: any, arg2: any) => void, event: any, ...args: any[]): void;
    emit(event: IMultiCallback | string, ...args: any[]): void;
    /**
     * 마이크로 Task 실행
     *
     * @param {Function} callback  마이크로Task 형식으로 실행될 함수
     */
    nextTick(callback: IMultiCallback): void;
    trigger(event: IMultiCallback | string, ...args: any[]): void;
}
