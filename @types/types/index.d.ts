export interface IKeyValue {
    [key: string]: any;
}
export interface IMultiCallback {
    (...args: any[]): void;
}
export interface IBindHandlerData extends IKeyValue {
    style: string | IKeyValue;
    cssText: string;
    [`class`]: string[] | string | IKeyValue;
    callback: Function;
    value: string;
    html: string;
    innerHTML: string;
    text: string;
    textContent: string;
    htmlDiff: string;
    svgDiff: string;
}
export interface IDom {
    append($el: any): any;
    replace($el: any): any;
    remove(): any;
    $$(arg0: string): any;
    children(): any;
    attr(key: string | IKeyValue, value?: any): any;
    val(value: any): any;
    updateSVGDiff(value: any): any;
    updateDiff(value: any): any;
    html(value: any): any;
    text(value: any): any;
    removeAttr(key: string | IKeyValue): any;
    htmlEl: any;
    toggleClass(className: string, hasClass: any): any;
    addClass(...args: any[]): IDom;
    css(value: any): IDom;
    cssText(value: any): string | IDom;
    el: HTMLInstance;
}
export declare type HTMLInstance = HTMLElement | SVGElement | DocumentFragment | ShadowRoot;
export declare type DomElement = HTMLInstance | string;
export interface IEventMachine {
    [x: string]: any;
    $store: any;
    el: any;
    $el: any;
    $root: any;
    filterProps(CHECK_BIND_PATTERN: RegExp): any;
    refs: any;
    getRef(id: string): IEventMachine;
    state: IKeyValue;
    prevState: IKeyValue;
    children: IKeyValue;
    id: string;
    __tempVariables: Map<any, any>;
    handlers: IBaseHandler[];
    opt: IKeyValue;
    parent: IEventMachine;
    props: IKeyValue;
    source: string;
    sourceName: string;
    childComponents: IKeyValue;
    destroy(): void;
}
export interface IUIElement extends IEventMachine {
}
export interface ISplitedMethod {
    target: string | number;
    param: any;
}
export interface IDomEventObjectOption {
    passive: boolean;
    capture: any;
}
export interface IDomEventObject {
    customEventName: string;
    delayMethods: any;
    captures: ISplitedMethod[];
    codes: string[];
    checkMethodList: string[];
    beforeMethods: ISplitedMethod[];
    afterMethods: ISplitedMethod[];
    debounceMethods: ISplitedMethod[];
    throttleMethods: ISplitedMethod[];
    delegate?: string;
    eventName: keyof ElementEventMap;
    dom?: Element;
    callback?: EventListenerOrEventListenerObject;
}
export interface IBaseStore {
}
export interface IStartOptions {
    store?: IBaseStore;
    container?: HTMLElement;
}
export interface IBaseHandler {
}
export interface UIElementConstructor {
    new (opt?: any, props?: IKeyValue): IUIElement;
    attributes?: string[];
}
