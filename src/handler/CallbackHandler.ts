
import { CHECK_CALLBACK_PATTERN, CHECK_SAPARATOR, CALLBACK_SAPARATOR } from "../Event";
import { debounce, throttle, splitMethodByKeyword } from "../functions/func";
import { IMultiCallback } from "../types";
import { BaseHandler } from "./BaseHandler";
import { IKeyValue } from '../../@types/types/index.d';

export default class CallbackHandler extends BaseHandler {
  private _callbacks: any[] = [];
  private _bindings: any;


  initialize() {
    this.destroy();

    if (!this._callbacks) {
      this._callbacks = this.context.filterProps(CHECK_CALLBACK_PATTERN)
    }
    this._callbacks.forEach(key => this.parseCallback(key));
  }

  destroy() {
    if (this.context.notEventRedefine) {
      // NOOP
    } else {
      this.removeCallbackAll();
    }

  }


  removeCallbackAll() {
    this.getBindings().forEach((obj: IKeyValue) => {
      this.removeCallback(obj);
    });
    this.initBindings();
  }

  removeCallback({ animationFrameId } : IKeyValue) {
    cancelAnimationFrame(animationFrameId);
  }

  getBindings() {
    if (!this._bindings) {
      this.initBindings();
    }

    return this._bindings;
  }

  addBinding(obj: any) {
    this.getBindings().push(obj);
  }

  initBindings() {
    this._bindings = [];
  }

  makeCallback(callbackObject: IKeyValue, callback: (arg0: any) => void) {

    const run = (time: any) => {
      callback(time)
      callbackObject.requestId = requestAnimationFrame(run);
    };

    return () => {
      callbackObject.requestId = requestAnimationFrame(run)
    };
  }


  /**
   * 
   * doubletab -> touchend 로 바뀜 
   * 
   * @param {string} eventName  이벤트 이름 
   * @param {array} checkMethodFilters 매직 필터 목록  
   */
  getDefaultCallbackObject(callbackName: any, checkMethodFilters: any) {
    const context = this.context;
    let arr = checkMethodFilters;

    // context 에 속한 변수나 메소드 리스트 체크
    const checkMethodList = arr.filter((code: string | number) => !!context[code]);

    // 이벤트 정의 시점에 적용 되어야 하는 것들은 모두 method() 화 해서 정의한다.
    const [afters, afterMethods] = splitMethodByKeyword(arr, "after");
    const [befores, beforeMethods] = splitMethodByKeyword(arr, "before");
    const [debounces, debounceMethods] = splitMethodByKeyword(arr, "debounce");
    const [delays, delayMethods] = splitMethodByKeyword(arr, "delay");
    const [throttles, throttleMethods] = splitMethodByKeyword(arr, "throttle");
    const [captures] = splitMethodByKeyword(arr, "capture");

    // 위의 5개 필터 이외에 있는 코드들은 keycode 로 인식한다.
    const filteredList = [
      ...checkMethodList,
      ...afters,
      ...befores,
      ...delays,
      ...debounces,
      ...throttles,
      ...captures
    ];

    return {
      callbackName,
      captures,
      afterMethods,
      beforeMethods,
      delayMethods,
      debounceMethods,
      throttleMethods,
      checkMethodList
    };
  }


  addCallback(callbackObject: { callbackName?: any; captures?: any[]; afterMethods?: any[]; beforeMethods?: any[]; delayMethods?: any[]; debounceMethods?: any[]; throttleMethods?: any[]; checkMethodList?: any; callback?: any; }, callback: any) {
    callbackObject.callback = this.makeCallback(callbackObject, callback);
    this.addBinding(callbackObject);

    // requestAnimationFrame 을 사용하는 경우
    callbackObject.callback();
  }


  bindingCallback(callbackName: any, checkMethodFilters: any, originalCallback: IMultiCallback) {
    let callbackObject = this.getDefaultCallbackObject(callbackName, checkMethodFilters);


    if (callbackObject.debounceMethods.length) {
      var debounceTime = +callbackObject.debounceMethods[0].target;
      originalCallback = debounce(originalCallback, debounceTime);
    } else if (callbackObject.throttleMethods.length) {
      var throttleTime = +callbackObject.throttleMethods[0].target;
      originalCallback = throttle(originalCallback, throttleTime);
    }

    this.addCallback(callbackObject, originalCallback);
  };

  /**
   * 이벤트 문자열 파싱하기 
   * 
   * @param {string} key 
   */
  parseCallback(key: string) {

    const context = this.context;
    let checkMethodFilters = key.split(CHECK_SAPARATOR).map((it: string) => it.trim()).filter(Boolean);

    var prefix: string = checkMethodFilters.shift() as string;
    var callbackName = prefix.split(CALLBACK_SAPARATOR)[1];    

    var originalCallback = context[key].bind(context);

    this.bindingCallback(callbackName, checkMethodFilters, originalCallback);
  }
}