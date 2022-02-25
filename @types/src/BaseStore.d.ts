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
    promiseProxy: this;
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
     * @param {boolean} [frame=false]
     * @returns {Function} off callback
     */
    on(event: any, originalCallback: IMultiCallback, context: IKeyValue, debounceDelay?: number, throttleDelay?: number, enableAllTrigger?: boolean, enableSelfTrigger?: boolean, beforeMethods?: never[], frame?: boolean): () => void;
    debug(message: string, event: any, sourceName?: any): void;
    /**
     * 메세지 해제
     *
     * @param {string} event
     * @param {*} originalCallback
     */
    off(event: any, originalCallback: IMultiCallback): void;
    offAll(context: any): void;
    getCachedCallbacks(event: any): any;
    /**
     * 메세지를 promise 형태로 쓸 수 있도록 proxy 객체를 리턴한다.
     *
     * @returns {Proxy}
     */
    get promise(): this;
    get p(): this;
    /**
     * 등록된 메세지를 Promise 로 만들어준다.
     *
     * this.emit("message", 1, 2, 3);
     *
     * 형태로 사용하던 것을
     *
     * this.promise.message(1, 2, 3).then(() => { })
     *
     * 또는
     *
     * var a = await this.promise.message(1, 2, 3);
     *
     * 형태로 사용할 수 있다.
     *
     * 몇가지 상황에서 유용하다.
     *
     * 1. message 가 리턴 값을 가지고 있을 때
     * 2. message 가 동작 완료 후 다른 동작을 하고 싶을 때
     *
     * @param {string} event
     * @returns {Promise}
     */
    makePromiseEvent(event: string): (...args: string[]) => Promise<any>;
    sendMessage(source: any, event: string | Function, ...args: any[]): void;
    /**
     *
     * run multi messages
     *
     * message.callback can has a return value.
     *
     * if return value is false then message will be skip.
     * if return value is function then message will be skip after run return function.
     *
     * @param {string} source
     * @param {Command[]} messages
     */
    sendMessageList(source: string, messages?: any[]): void;
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
