import { CHECK_SAPARATOR, CHECK_SUBSCRIBE_PATTERN, SUBSCRIBE_SAPARATOR } from "./Event";
import { EventMachine } from "./EventMachine";
import { isFunction, isNotUndefined, splitMethodByKeyword } from "./functions/func";
import { uuidShort } from "./functions/uuid";
import { IBaseStore, IKeyValue } from "./types";
import { BaseStore } from './BaseStore';
import { getVariable } from ".";

/**
 * UI 를 만드는 기본 단위 
 * 
 * dom handler, 
 * bind handler, 
 * store handler 를 가진다. 
 */
export class UIElement extends EventMachine {
  private __storeInstance: any;
    attributes: never[] | undefined;
  constructor(opt: UIElement|Object, props: IKeyValue = {}) {
    super(opt, props); 

    if (props?.store) {
      this.__storeInstance = props.store;
    } else {
      this.__storeInstance = new BaseStore();
    }

    this.created();

    this.initialize();

    this.initializeStoreEvent();

  }

  setStore (storeInstance: IBaseStore) {
    this.__storeInstance = storeInstance;
  }

  /**
   * 메세징 루트를 재정의 할 수 있음. 
   * 
   * @override
   */
  get $store() {
    return this.__storeInstance || this.parent.$store;
  }  

  /**
   * UIElement 가 생성될 때 호출되는 메소드 
   * @protected
   */
  protected created() {}

  getRealEventName(e: string, separator: string) {
    var startIndex = e.indexOf(separator);
    return e.substr(startIndex < 0 ? 0 : startIndex + separator.length);
  }

  /**
   * 메소드 분리 
   * 
   * @returns {any[]}
   */ 
  splitMethod (arr: string[], keyword: string, defaultValue: any = 0) {
    var [methods, params] = splitMethodByKeyword(arr, keyword);

    return [
      methods.length ? +params[0].target : defaultValue,
      methods, 
      params
    ]
  }

  createLocalCallback(event:string, callback: Function) {
    var newCallback = callback.bind(this);
    newCallback.displayName = `${this.sourceName}.${event}`;
    newCallback.source = this.source;

    return newCallback;
  }

  /**
   * initialize store event
   *
   * you can define '@xxx' method(event) in UIElement
   *
   * Store Event 를 초기화 한다. 
   *
   */
  initializeStoreEvent() {
    this.filterProps(CHECK_SUBSCRIBE_PATTERN).forEach((key: string) => {
      const events = this.getRealEventName(key, SUBSCRIBE_SAPARATOR);
      // context 에 속한 변수나 메소드 리스트 체크
      const [method, ...methodLine] = events.split(CHECK_SAPARATOR);
      const checkMethodList = methodLine.map(it => it.trim()).filter(code => this[code]).map(target => ({target}));

      // support deboounce for store event    
      const [debounceSecond, debounceMethods] = this.splitMethod(methodLine, 'debounce');
      const [throttleSecond, throttleMethods] = this.splitMethod(methodLine, 'throttle');      
      const [allTrigger, allTriggerMethods] = this.splitMethod(methodLine, 'allTrigger');   
      const [selfTrigger, selfTriggerMethods] = this.splitMethod(methodLine, 'selfTrigger');            
      const [frameTrigger, frameTriggerMethods] = this.splitMethod(methodLine, 'frame');
      const [paramsVariable, paramsVariableMethods, params] = this.splitMethod(methodLine, 'params');


      let debounce = +debounceSecond > 0 ? debounceSecond : 0;
      let throttle = +throttleSecond > 0 ? throttleSecond : 0;
      let isAllTrigger = Boolean(allTriggerMethods.length);
      let isSelfTrigger = Boolean(selfTriggerMethods.length);
      let isFrameTrigger = Boolean(frameTriggerMethods.length);

      if (paramsVariableMethods.length) {
        const settings = getVariable(paramsVariable);

        if (isNotUndefined(settings.debounce)) debounce = settings.debounce;
        if (isNotUndefined(settings.throttle)) throttle = settings.throttle;
        if (isNotUndefined(settings.frame)) isFrameTrigger = settings.frame;
      }

      const originalCallback = this[key]

      events
        .split(CHECK_SAPARATOR)
        .filter(it => {
          return (
            checkMethodList.findIndex(a => a.target === it) === -1 &&
            debounceMethods.indexOf(it) === -1 &&
            allTriggerMethods.indexOf(it) === -1 &&
            selfTriggerMethods.indexOf(it) === -1 &&
            throttleMethods.indexOf(it) === -1 &&
            paramsVariableMethods.indexOf(it) === -1
          )
        })
        .map(it => it.trim())
        .filter(Boolean)
        .forEach(e => {

          if (isFunction(this[key])) {
            var callback = this.createLocalCallback(e, originalCallback)
            this.$store.on(e, callback, this, debounce, throttle, isAllTrigger, isSelfTrigger, checkMethodList, isFrameTrigger);
          }

      });
    });
  }

  /**
   * 현재 UIElement 와 연결된 모든 메세지를 해제한다. 
   */
  destoryStoreSUBSCRIBE() {
    this.$store.offAll(this);
  }

  destroy () {
    super.destroy()

    this.destoryStoreSUBSCRIBE();
  }

  /**
   * UIElement 를 다시 그린다. 
   * 
   * template 정의 부터  메세지 이벤트 정의까지 모두 다시 한다. 
   */
  rerender() {
    super.rerender();

    this.initialize();

    this.initializeStoreEvent();
  }


  /**
   * UIElement 기반으로 메세지를 호출 한다. 
   * 나 이외의 객체들에게 메세지를 전달한다. 
   * 
   * @param {string} messageName
   * @param {any[]} args 
   */
  emit(messageName: string, ...args: any[]) {
    this.$store.source = this.source;
    this.$store.sourceContext = this; 
    this.$store.emit(messageName, ...args);
  }

  /**
   * MicroTask 를 수행한다. 
   * 
   * @param {Function} callback 
   */
  nextTick (callback: Function, delay: number = 0) {

    setTimeout(() => {
      this.$store.nextTick(callback);
    }, delay);

  }

  /**
   * 
   * UIElement 자신의 메세지를 수행한다. 
   * emit 은 나외의 객체에게 메세지를 보내고 
   * 
   * @param {string} messageName 
   * @param {any[]} args 
   */
  trigger(messageName: string, ...args: any[]) {
    this.$store.source = this.source;
    this.$store.trigger(messageName, ...args);
  }

  /**
   * 자식 객체에게만 호출되는 메세지를 수행한다.
   * 
   * @param {string} messageName
   * @param {any[]} args
   */ 
  broadcast(messageName: string, ...args: any[]) {
    Object.keys(this.children).forEach(key => {
      this.children[key].trigger(messageName, ...args);
      this.children[key].broadcast(messageName, ...args);
    })
  }

  /**
   * message 이벤트에 주어진 callack 을 등록 
   * 동일한 메세지 명으로 callback 은 list 화 되어서 관리 됩니다. 
   * 
   * @param {string} message 이벤트 메세지 이름 
   * @param {Function} callback 메세지 지정시 실행될 함수
   */ 
  on (message: string, callback: Function, debounceDelay = 0, throttleDelay = 0, enableAllTrigger = false, enableSelfTrigger = false, frame = false) {
    this.$store.on(message, callback, this, debounceDelay, throttleDelay, enableAllTrigger, enableSelfTrigger, [], frame);
  }

  /**
   * @param {string} message message name or function 
   * @param {Function} callback
   */ 
  off (message: string, callback: Function) {
    this.$store.off(message, callback, this);
  }

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
  subscribe(callback: Function, debounceSecond = 0, throttleSecond = 0): string {
    const id = `subscribe.${uuidShort()}`;

    const newCallback = this.createLocalCallback(id, callback);

    this.$store.on(id, newCallback, this, debounceSecond, throttleSecond, false, /*self trigger*/true);    

    return id; 
  }
}
