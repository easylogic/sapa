import { DomElement, HTMLInstance, IDom, IKeyValue } from "../types";
/**
 * Dom 유틸리티
 *
 */
export declare class Dom implements IDom {
    el: HTMLInstance;
    constructor(tag: DomElement, className?: string, attr?: IKeyValue);
    static create(tag: DomElement, className?: string, attr?: IKeyValue): Dom;
    /**
     * @param {any} htmlString
     */
    static createByHTML(htmlString: any): Dom | null;
    static getScrollTop(): number;
    static getScrollLeft(): number;
    static parse(html: string): Document;
    static body(): Dom;
    get htmlEl(): HTMLElement;
    get inputEl(): HTMLInputElement;
    get svgEl(): SVGElement;
    setAttr(obj: IKeyValue): this;
    setAttrNS(obj: IKeyValue, namespace?: string): this;
    setProp(obj: IKeyValue): this;
    /**
     * data-xxx 속성을 관리한다.
     *
     * @param {string} key
     * @param {any} value
     */
    data(key: string, value: any): string | this | null;
    /**
     * Dom attribute 얻기 또는 설정
     *
     * get ->  Dom.create(targetElement).attr('key');
     * set -> Dom.create(targetElement).attr('key', value);
     *
     * @param {string} key
     * @param {[string]} value
     */
    attr(key: string, value?: undefined): string | this | null;
    /**
     * @param {any} key
     * @param {any} value
     */
    attrNS(key: string, value: any, namespace?: string): string | this | null;
    /**
     * @param {any} keyField
     */
    attrKeyValue(keyField: any): IKeyValue;
    attrs(...args: string[]): (string | null)[];
    /**
     * @param {any[]} args
     */
    styles(...args: any[]): string[];
    /**
     * @param {string} key
     */
    removeAttr(key: string): this;
    /**
     * @param {any} key
     */
    removeStyle(key: any): this;
    /**
     * @param {{ el: any; }} checkElement
     */
    is(checkElement: {
        el: any;
    }): boolean;
    /**
     * @param {string} tag
     */
    isTag(tag: string): boolean;
    /**
     * @param {any} cls
     */
    closest(cls: any): Dom | null;
    path(): Dom[];
    get $parent(): Dom;
    parent(): Dom;
    hasParent(): boolean;
    /**
     * @param {any[]} args
     */
    removeClass(...args: any[]): this;
    /**
     * @param {any} cls
     */
    hasClass(cls: any): boolean;
    /**
     * @param {any[]} args
     */
    addClass(...args: any[]): this;
    /**
     * @param {any} cls
     */
    onlyOneClass(cls: any): void;
    /**
     * @param {string} cls
     * @param {any} isForce
     */
    toggleClass(cls: string, isForce: any): this;
    /**
     * @param {string} html
     */
    html(html?: string): string | this;
    /**
     * @param {any} fragment
     */
    htmlDiff(fragment: HTMLInstance): void;
    /**
     * @param {any} html
     */
    updateDiff(html: string, rootElement?: string): void;
    /**
     * @param {any} html
     */
    updateSVGDiff(html: any, rootElement?: string): void;
    /**
     * @param {any} selector
     */
    find(selector: any): any;
    /**
     * @param {any} selector
     */
    $(selector: any): Dom | null;
    /**
     * @param {any} selector
     */
    findAll(selector: string): Element[];
    $$(selector: string): Dom[];
    empty(): this;
    append(el: string | HTMLInstance | Dom): this;
    prepend(el: string | HTMLInstance | Dom): this;
    prependHTML(html: string): string | Dom;
    appendHTML(html: string): string | Dom;
    /**
     * create document fragment with children dom
     */
    createChildrenFragment(): DocumentFragment;
    /**
     * @param {{ el: any; }} target
     */
    appendTo(target: {
        el: any;
    }): this;
    remove(): this;
    /**
     * @param {{ el: any; }} el
     */
    removeChild(el: {
        el: any;
    }): this;
    /**
     *
     * @param {string} value
     * @returns {string} 파라미터가 없을 때  textContent 를 리턴한다.
     */
    text(value?: string | Dom | undefined): string | Dom;
    /**
     *
     * $el.css`
     *  border-color: yellow;
     * `
     *
     * @param {*} key
     * @param {*} value
     */
    css(key: string | ArrayLike<unknown> | IKeyValue, value?: string | undefined): any;
    getComputedStyle(...list: string[]): {};
    /**
     * @param {any[]} list
     */
    getStyleList(...list: string[]): {};
    /**
     * @param {any} value
     */
    cssText(value: any): string | Dom;
    cssFloat(key: string): number;
    cssInt(key: any): number;
    /**
     * @param {string} key
     * @param {number} value
     */
    px(key: string, value: number): any;
    rect(): DOMRect;
    bbox(): DOMRect;
    isSVG(): boolean;
    offsetRect(): {
        x: number;
        y: number;
        top: number;
        left: number;
        width: number;
        height: number;
    };
    offset(): {
        top: number;
        left: number;
    };
    offsetLeft(): number;
    offsetTop(): number;
    position(): DOMRect | {
        top: number;
        left: number;
    };
    size(): number[];
    width(): number;
    contentWidth(): number;
    height(): number;
    contentHeight(): number;
    /**
     * @param {{ val: () => any; } | undefined} [value]
     */
    val(value?: Dom | string): string | this;
    matches(selector: string): Dom | null;
    get value(): string;
    get files(): File[];
    show(displayType?: string): this;
    hide(): this;
    isHide(): boolean;
    isShow(): boolean;
    /**
     * @param {any} isForce
     */
    toggle(isForce: any): this;
    scrollIntoView(): void;
    /**
     * @param {any} dt
     */
    addScrollLeft(dt: any): this;
    /**
     * @param {any} dt
     */
    addScrollTop(dt: any): this;
    /**
     * @param {any} scrollTop
     */
    setScrollTop(scrollTop: any): this;
    /**
     * @param {any} scrollLeft
     */
    setScrollLeft(scrollLeft: any): this;
    scrollTop(): number;
    scrollLeft(): number;
    scrollHeight(): number;
    scrollWidth(): number;
    /**
     * @param {any} eventName
     * @param {any} callback
     * @param {any} opt1
     * @param {any} opt2
     */
    on(eventName: keyof HTMLElementEventMap, callback: (...arg: any[]) => any, opt1: any): this;
    off(eventName: keyof HTMLElementEventMap, callback: (...arg: any[]) => any): this;
    getElement(): HTMLElement;
    /**
     * @param {any} tag
     */
    createChild(tag: any, className?: string, attrs?: {}, css?: {}): Dom;
    get firstChild(): Dom;
    children(): Dom[];
    childLength(): number;
    /**
     * @param {{ el: any; }} newElement
     */
    replace(newElement: {
        el: any;
    }): this;
    /**
     * @param {{ el: any; }} oldElement
     * @param {{ el: any; }} newElement
     */
    replaceChild(oldElement: {
        el: any;
    }, newElement: {
        el: any;
    }): this;
    checked(isChecked?: boolean): boolean | this;
    click(): this;
    focus(): this;
    select(): this;
    blur(): this;
}
