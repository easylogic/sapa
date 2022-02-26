import { MagicMethodResult } from '../functions/MagicMethod';
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
    [x: string]: any;
    append($el: any): any;
    replace($el: any): any;
    remove(): any;
    $$(arg0: string): any;
    children(): any;
    attr(key: string | IKeyValue, value?: any): any;
    val(value: any): any;
    updateSVGDiff(value: any): any;
    updateDiff(value: any): any;
    html(value?: any): any;
    text(value?: any): any;
    removeAttr(key: string | IKeyValue): any;
    htmlEl: any;
    toggleClass(className: string, hasClass: any): any;
    addClass(...args: any[]): IDom;
    css(value: any): IDom;
    cssText(value: any): string|IDom;
    el: HTMLInstance;
}

export type HTMLInstance = HTMLElement | SVGElement | DocumentFragment | ShadowRoot;

export type DomElement = HTMLInstance | string;

export interface IEventMachine {
    [x: string]: any;
    $store: any;
    el: any;
    $el: any;
    $root: any;
    filterProps(methodKey:string): MagicMethodResult[];
    refs: any;
    getRef(id: string): IEventMachine;
    state: IKeyValue;
    prevState: IKeyValue;
    children: IKeyValue;
    // _bindings: never[];
    id: string;
    __tempVariables: Map<any, any>;
    handlers: IBaseHandler[];
    opt: IKeyValue;
    parent: IEventMachine;
    props: IKeyValue;
    source: string;
    sourceName: string;
    childComponents: IKeyValue;    
    notEventRedefine?: boolean;
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

interface MethodParam {
    target: string;
    param?: string;
}
export interface IDomEventObject {
    checkMethodList: string[];
    afterMethods: MethodParam[];
    beforeMethods: MethodParam[];
    codes: string[];
    delegate?: string;
    customEventName: string;
    eventName: keyof ElementEventMap;
    magicMethod:     MagicMethodResult;
    dom?: Element;
    callback?: IMultiCallback;
}

export interface IBaseStore {}

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