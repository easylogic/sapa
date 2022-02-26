import { IDomEventObject, IMultiCallback } from "../types";
import { BaseHandler } from "./BaseHandler";
import { MagicMethodResult } from '../functions/MagicMethod';
export declare class DomEventHandler extends BaseHandler {
    _domEvents: MagicMethodResult[] | undefined;
    _bindings?: IDomEventObject[];
    doubleTab: any;
    initialize(): void;
    destroy(): void;
    removeEventAll(): void;
    removeDomEvent({ eventName, dom, callback }: IDomEventObject): void;
    getBindings(): IDomEventObject[] | undefined;
    addBinding(obj: IDomEventObject): void;
    initBindings(): void;
    matchPath(el: Element, selector: string): Element | null;
    hasDelegate(e: any, eventObject: IDomEventObject): Element | null;
    makeCallback(eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function): (e: any) => any;
    makeDefaultCallback(eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function): (e: any) => any;
    makeDelegateCallback(eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function): (e: any) => any;
    runEventCallback(e: any, eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function): any;
    checkEventType(e: any, eventObject: IDomEventObject): boolean;
    getDefaultDomElement(dom: Element | string): any;
    getRealEventName(eventName: string): any;
    getCustomEventName(eventName: string): string;
    /**
     *
     * doubletab -> touchend 로 바뀜
     */
    getDefaultEventObject(eventName: string, dom: Element | string, delegate: string[], magicMethod: MagicMethodResult, callback: IMultiCallback): IDomEventObject;
    addDomEvent(eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function): void;
    makeCustomEventCallback(eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback?: EventListenerOrEventListenerObject): IMultiCallback;
    bindingDomEvent([eventName, dom, ...delegate]: string[], magicMethod: MagicMethodResult, callback: IMultiCallback): void;
    getEventNames(eventName: string): string[];
    /**
     * 이벤트 문자열 파싱하기
     *
     * @param {string} key
     */
    parseDomEvent(it: MagicMethodResult): void;
}
