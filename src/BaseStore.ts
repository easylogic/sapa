import { debounce, ifCheck, isFunction, throttle } from "./functions/func";
import { IMultiCallback, IKeyValue } from "./types";
 
/**
 * @class BaseStore
 * @description BaseStore is the base class for all stores.
 * 
 */ 
export class BaseStore {
  cachedCallback: {};
  callbacks: {};
  editor: any;
  source: any;
  constructor(editor?: any) {
    this.cachedCallback = {};
    this.callbacks = {};
    this.editor = editor;
  }

  getCallbacks(event: string) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = []
    }

    return this.callbacks[event]
  }

  setCallbacks(event: string, list = []) {
    this.callbacks[event] = list; 
  }

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
   * @returns {Function} off callback 
   */
  on(event: any, originalCallback: IMultiCallback, context: IKeyValue, debounceDelay = 0, throttleDelay = 0, enableAllTrigger = false, enableSelfTrigger = false, beforeMethods = []) {
    var callback = originalCallback;
    
    if (debounceDelay > 0)  callback = debounce(originalCallback, debounceDelay);
    else if (throttleDelay > 0)  callback = throttle(originalCallback, throttleDelay);

    if (beforeMethods.length) {
      callback = ifCheck(callback, context, beforeMethods);
    }

    this.getCallbacks(event).push({ event, callback, context, originalCallback, enableAllTrigger, enableSelfTrigger });

    this.debug('add message event', event, context.sourceName );

    return () => {
      this.off(event, originalCallback);
    }
  }
  debug(message: string, event: any, sourceName?: any) {
    console.log({message, event, sourceName});
  }

  /**
   * 메세지 해제
   * 
   * @param {string} event 
   * @param {*} originalCallback 
   */
  off(event: any, originalCallback: IMultiCallback) {

    this.debug('off message event', event );

    if (arguments.length == 1) {
      this.setCallbacks(event);
    } else if (arguments.length == 2) {      
      this.setCallbacks(event, this.getCallbacks(event).filter((f: { originalCallback: any; }) => {
        return f.originalCallback !== originalCallback
      }));
    }
  }

  offAll (context: any) {

    Object.keys(this.callbacks).forEach(event => {
      this.setCallbacks(event, this.getCallbacks(event).filter((f: { context: any; }) => {
        return f.context !== context;  
      }))
    })
    this.debug('off all message', context.sourceName );
  }

  getCachedCallbacks (event: any) {
    return this.getCallbacks(event);
  }

  sendMessage(source: any, event: string|Function, ...args: any[]) {
    Promise.resolve().then(() => {
      var list = this.getCachedCallbacks(event);
      if (list) {

        for(var i = 0, len = list.length; i < len; i++) {
          const f = list[i];
          // console.log(source);
          if (f.enableSelfTrigger) continue;

          if (f.enableAllTrigger || f.originalCallback.source !== source) {
            f.callback.apply(f.context, args)  
          }
        }
      }

    });
  }

  nextSendMessage(source: any, callback: IMultiCallback, ...args: any[]) {
    Promise.resolve().then(() => {
      callback(...args)
    });
  }

  triggerMessage(source: (source: any, event: any, arg2: any) => void, event: any, ...args: any[]) {
    Promise.resolve().then(() => {
      var list = this.getCachedCallbacks(event);

      if (list) {
        for(var i = 0, len = list.length; i < len; i++) {
          const f = list[i];
          if (f.originalCallback.source === source) {
            f.callback.apply(f.context, args)  
          }
        }
      } else {
        console.warn(event, ' is not valid event');
      }


    });
  }

  emit(event: IMultiCallback| string, ...args: any[]) {

    if (isFunction(event)) {
      (event as IMultiCallback)(...args);
    } else {
      this.sendMessage(this.source, event, ...args);
    }

  }
  
  /**
   * 마이크로 Task 실행 
   * 
   * @param {Function} callback  마이크로Task 형식으로 실행될 함수 
   */
  nextTick (callback: IMultiCallback) {
    this.nextSendMessage(this.source, callback);
  }

  trigger(event: IMultiCallback|string, ...args: any[]) {

    if (isFunction(event)) {
      (event as IMultiCallback)(...args);
    } else {
      this.triggerMessage(this.source, event, ...args);
    }

  }
}
