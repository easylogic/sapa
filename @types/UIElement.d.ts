import { EventMachine } from "./EventMachine";
import { IBaseStore, IKeyValue } from "./types";
/**
 * UI 를 만드는 기본 단위
 *
 * dom handler,
 * bind handler,
 * store handler 를 가진다.
 */
export declare class UIElement extends EventMachine {
    private __storeInstance;
    attributes: never[] | undefined;
    constructor(opt: UIElement | Object, props?: IKeyValue);
    setStore(storeInstance: IBaseStore): void;
    /**
     * 메세징 루트를 재정의 할 수 있음.
     *
     * @override
     */
    get $store(): any;
    /**
     * UIElement 가 생성될 때 호출되는 메소드
     * @protected
     */
    created(): void;
    getRealEventName(e: string, separator: string): string;
    /**
     * 메소드 분리
     *
     * @returns {any[]}
     */
    splitMethod(arr: string[], keyword: string, defaultValue?: any): any[];
    createLocalCallback(event: string, callback: Function): any;
    /**
     * initialize store event
     *
     * you can define '@xxx' method(event) in UIElement
     *
     * Store Event 를 초기화 한다.
     *
     */
    initializeStoreEvent(): void;
    /**
     * 현재 UIElement 와 연결된 모든 메세지를 해제한다.
     */
    destoryStoreSUBSCRIBE(): void;
    destroy(): void;
    /**
     * UIElement 를 다시 그린다.
     *
     * template 정의 부터  메세지 이벤트 정의까지 모두 다시 한다.
     */
    rerender(): void;
    /**
     * UIElement 기반으로 메세지를 호출 한다.
     * 나 이외의 객체들에게 메세지를 전달한다.
     *
     * @param {string} messageName
     * @param {any[]} args
     */
    emit(messageName: string, ...args: any[]): void;
    /**
     * MicroTask 를 수행한다.
     *
     * @param {Function} callback
     */
    nextTick(callback: Function): void;
    /**
     *
     * UIElement 자신의 메세지를 수행한다.
     * emit 은 나외의 객체에게 메세지를 보내고
     *
     * @param {string} messageName
     * @param {any[]} args
     */
    trigger(messageName: string, ...args: any[]): void;
    /**
     * 자식 객체에게만 호출되는 메세지를 수행한다.
     *
     * @param {string} messageName
     * @param {any[]} args
     */
    broadcast(messageName: string, ...args: any[]): void;
    /**
     * message 이벤트에 주어진 callack 을 등록
     * 동일한 메세지 명으로 callback 은 list 화 되어서 관리 됩니다.
     *
     * @param {string} message 이벤트 메세지 이름
     * @param {Function} callback 메세지 지정시 실행될 함수
     */
    on(message: string, callback: Function): void;
    /**
     * @param {string} message message name or function
     * @param {Function} callback
     */
    off(message: string, callback: Function): void;
    /**
     * 동적으로 subscribe 함수를 지정합니다.
     *
     * template 안에서 동적으로 수행할 수 있습니다.
     *
     * 이렇게 생성된 subscribe 함수는 외부에서는 실행 할수가 없는 SUBSCRIBE_SELF 로 생성됩니다.
     *
     * 함수 내부에서 context 를 유지하기 때문에 this 로 instance 에 접근 할 수 있습니다.
     *
     * @example
     *
     * ```js
     * html`
     *     <div clickElement=${this.subscribe(() => {
     *        console.log('click is fired');
     *        console.log(this.source);
     *     })}>
     *        Click me
     *     </div>
     * `
     * ```
     *
     * @returns {string} function id
     */
    subscribe(callback: Function, debounceSecond?: number, throttleSecond?: number): string;
}
