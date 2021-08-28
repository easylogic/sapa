import { DomEventHandler } from "./handler/DomEventHandler";
import { BindHandler } from "./handler/BindHandler";
import { IDom, IEventMachine, IKeyValue } from "./types";
export declare class EventMachine implements IEventMachine {
    state: {};
    prevState: {};
    children: {};
    _bindings: never[];
    id: string;
    __tempVariables: Map<string, any>;
    handlers: (BindHandler | DomEventHandler)[];
    _loadMethods: any;
    __cachedMethodList: any;
    constructor(opt: Object | IEventMachine, props: IKeyValue);
    private _$store;
    get $store(): any;
    set $store(value: any);
    el: any;
    $el: any;
    $root: any;
    refs: any;
    opt: IKeyValue;
    parent: IEventMachine;
    props: IKeyValue;
    source: string;
    sourceName: string;
    childComponents: IKeyValue;
    /**
     * UIElement instance 에 필요한 기본 속성 설정
     */
    initializeProperty(opt: any, props?: {}): void;
    initComponents(): void;
    initializeHandler(): (BindHandler | DomEventHandler)[];
    /**
     * state 를 초기화 한것을 리턴한다.
     *
     * @protected
     * @returns {Object}
     */
    initState(): {};
    /**
     * state 를 변경한다.
     *
     * @param {Object} state  새로운 state
     * @param {Boolean} isLoad  다시 로드 할 것인지 체크 , true 면 state 변경후 다시 로드
     */
    setState(state?: {}, isLoad?: boolean): void;
    /**
     * state 에 있는 key 필드의 값을 토글한다.
     * Boolean 형태의 값만 동작한다.
     *
     * @param {string} key
     * @param {Boolean} isLoad
     */
    toggleState(key: string | number, isLoad?: boolean): void;
    /**
     * props 를 넘길 때 해당 참조를 그대로 넘기기 위한 함수
     *
     * @param {any} value
     * @returns {string} 참조 id 생성
     */
    variable(value: any): string;
    /**
     * 참조 id 를 가지고 있는 variable 을 복구한다.
     */
    recoverVariable(id: string): string;
    /**
     * 객체를 다시 그릴 때 사용한다.
     *
     * @param {*} props
     * @protected
     */
    _reload(props: any): void;
    /**
     * template 을 렌더링 한다.
     *
     * @param {Dom|undefined} $container  컴포넌트가 그려질 대상
     */
    render($container: IDom): void;
    initialize(): void;
    /**
     * render 이후에 실행될 함수
     * dom 이 실제로 생성된 이후에 수행할 작업들을 정의한다.
     *
     * @protected
     */
    afterRender(): void;
    /**
     * 하위에 연결될 객체들을 정의한다
     *
     * @protected
     * @returns {Object}
     */
    components(): {};
    /**
     * ref 이름을 가진 Component 를 가지고 온다.
     *
     * @param  {any[]} args
     * @returns {EventMachine}
     */
    getRef(...args: string[]): any;
    /**
     * template() 함수의 결과물을 파싱해서 dom element 를 생성한다.
     *
     * @param {string} html
     * @param {Boolean} [isLoad=false]
     */
    parseTemplate(html: string, isLoad?: boolean | undefined): any;
    parseProperty($dom: IDom): {};
    getEventMachineComponent(refClassName: string): any;
    parseComponent(): void;
    clean(): true | undefined;
    /**
     * refresh 는 load 함수들을 실행한다.
     */
    refresh(): void;
    _afterLoad(): void;
    load(...args: string[]): Promise<void>;
    runHandlers(func?: string, ...args: any[]): void;
    bindData(...args: string[]): void;
    /**
     * 템플릿 지정
     *
     * 템플릿을 null 로 지정하면 자동으로 DocumentFragment 을 생성한다.
     * 화면에는 보이지 않지만 document, window 처럼 다른 영역의 이벤트로 정의하거나 subscribe 형태로 가져올 수 있다.
     *
     */
    template(): string | string[] | DocumentFragment | null;
    eachChildren(callback: Function): void;
    rerender(): void;
    /**
     * 자원을 해제한다.
     * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다.
     *
     */
    destroy(): void;
    /**
     * property 수집하기
     * 상위 클래스의 모든 property 를 수집해서 리턴한다.
     *
     * @returns {string[]} 나의 상위 모든 메소드를 수집해서 리턴한다.
     */
    collectProps(): any;
    filterProps(pattern: RegExp): any;
    self(e: any): any;
    isAltKey(e: any): any;
    isCtrlKey(e: any): any;
    isShiftKey(e: any): any;
    isMetaKey(e: any): any;
    isMouseLeftButton(e: any): boolean;
    isMouseRightButton(e: any): boolean;
    hasMouse(e: any): boolean;
    hasTouch(e: any): boolean;
    hasPen(e: any): boolean;
    /** before check method */
    preventDefault(e: any): boolean;
    stopPropagation(e: any): boolean;
}
