import { IDomEventObject, IMultiCallback } from "../types";
import { BaseHandler } from "./BaseHandler";
export declare class DomEventHandler extends BaseHandler {
    _domEvents: any;
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
    makeCallback(eventObject: IDomEventObject, callback: Function): (e: any) => any;
    makeDefaultCallback(eventObject: IDomEventObject, callback: Function): (e: any) => any;
    makeDelegateCallback(eventObject: IDomEventObject, callback: Function): (e: any) => any;
    runEventCallback(e: any, eventObject: IDomEventObject, callback: Function): any;
    checkEventType(e: any, eventObject: IDomEventObject): boolean;
    getDefaultDomElement(dom: Element | string): any;
    getRealEventName(eventName: string): any;
    getCustomEventName(eventName: string): string;
    /**
     *
     * doubletab -> touchend 로 바뀜
     */
    getDefaultEventObject(eventName: string, checkMethodFilters: string[]): IDomEventObject;
    addDomEvent(eventObject: IDomEventObject, callback: Function): void;
    makeCustomEventCallback(eventObject: IDomEventObject, callback: Function): IMultiCallback;
    bindingDomEvent([eventName, dom, ...delegate]: string[], checkMethodFilters: string[], callback: IMultiCallback): void;
    getEventNames(eventName: string): string[];
    /**
     * 이벤트 문자열 파싱하기
     *
     * @param {string} key
     */
    parseDomEvent(key: string): void;
}
