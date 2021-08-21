
import Event, { CHECK_SAPARATOR, DOM_EVENT_SAPARATOR, SAPARATOR, NAME_SAPARATOR, CHECK_DOM_EVENT_PATTERN } from "../Event";
import { Dom } from "../functions/Dom";
import { debounce, throttle, isNotUndefined, isFunction, splitMethodByKeyword } from "../functions/func";
import { DomElement, IDom, IDomEventObject, IDomEventObjectOption, IMultiCallback } from "../types";
import { BaseHandler } from "./BaseHandler";


const scrollBlockingEvents = {
    'touchstart': true,
    'touchmove': true,
    'mousedown': true,
    'mouseup': true,
    'mousemove': true,
    // wheel, mousewheel 은 prevent 를 해야한다. 그래서 scroll blocking 을 막아야 한다. 
    // 'wheel': true,   
    // 'mousewheel': true
}

const eventConverts = {
  'doubletab': 'touchend'
}

const customEventNames = {
  'doubletab': true 
}

export class DomEventHandler extends BaseHandler {
    _domEvents: any;
    _bindings?: IDomEventObject[];
    doubleTab: any;


    initialize() {
        this.destroy();

        if (!this._domEvents) {
          this._domEvents = this.context.filterProps(CHECK_DOM_EVENT_PATTERN)
        }

        this._domEvents.forEach((key: string) => this.parseDomEvent(key));
    }

    destroy() {
        this.removeEventAll();
    }


    removeEventAll() {
        this.getBindings()?.forEach((obj: IDomEventObject) => {
          this.removeDomEvent(obj);
        });
        this.initBindings();
    }

    removeDomEvent({ eventName, dom, callback }: IDomEventObject) {
      if (dom) {
        Event.removeDomEvent(dom, eventName, callback as EventListenerOrEventListenerObject);
      }
    }    

    getBindings() {
        if (!this._bindings) {
          this.initBindings();
        }
    
        return this._bindings;
    }

    addBinding(obj: IDomEventObject) {
        this.getBindings()?.push(obj);
    }

    initBindings() {
        this._bindings = [];
    }    


    matchPath (el: Element, selector: string): Element|null {
        if (el) {
          if (el.matches(selector)) {
            return el;
          }
          return this.matchPath(el.parentElement as Element, selector);
        }
        return null;
    }
      
    hasDelegate (e: any, eventObject: IDomEventObject) {
        return this.matchPath(e.target || e.srcElement, eventObject.delegate as string);
    }
      
    makeCallback (eventObject: IDomEventObject, callback: Function) {
      if (eventObject.delegate) {
        return this.makeDelegateCallback(eventObject, callback);
      } else {
        return this.makeDefaultCallback(eventObject, callback);
      }
    }
      
    makeDefaultCallback (eventObject: IDomEventObject, callback: Function) {
        return (e: any) => {
          var returnValue = this.runEventCallback(e, eventObject, callback);
          if (isNotUndefined(returnValue)) {
            return returnValue;
          }
        };
    }
      
    makeDelegateCallback (eventObject: IDomEventObject, callback: Function) {
        return (e: any) => {
          const delegateTarget = this.hasDelegate(e, eventObject);
      
          if (delegateTarget) {
            // delegate target 이 있는 경우만 callback 실행
            e.$dt = Dom.create(delegateTarget as DomElement);      
      
            var returnValue = this.runEventCallback(e, eventObject, callback);
            if (isNotUndefined(returnValue)) {
              return returnValue;
            }
          }
        };
    }
      
    runEventCallback (e: any, eventObject: IDomEventObject, callback: Function) {
        const context = this.context;
        e.xy = Event.posXY(e);
      
        if (eventObject.beforeMethods.length) {
          eventObject.beforeMethods.every((before) => {
            return context[before.target].call(context, e, before.param);
          });
        }
      
        if (this.checkEventType(e, eventObject)) {
          var returnValue = callback(e, e.$dt, e.xy); 
      
          if (returnValue !== false && eventObject.afterMethods.length) {
            eventObject.afterMethods.forEach(after => {
              return context[after.target].call(context, e, after.param)
            });
          }
      
          return returnValue;
        }
    }
      
    checkEventType (e: any, eventObject: IDomEventObject) {
        const context = this.context;
        // 특정 keycode 를 가지고 있는지 체크
        var hasKeyCode = true;
        if (eventObject.codes.length) {
          hasKeyCode =
            (e.code ? eventObject.codes.indexOf(e.code.toLowerCase()) > -1 : false) ||
            (e.key ? eventObject.codes.indexOf(e.key.toLowerCase()) > -1 : false);
        }
      
        // 체크 메소드들은 모든 메소드를 다 적용해야한다.
        var isAllCheck = true;
        if (eventObject.checkMethodList.length) {
          isAllCheck = eventObject.checkMethodList.every(field => {
            var fieldValue = context[field];    
            if (isFunction(fieldValue) && fieldValue) {
              // check method
              return fieldValue.call(context, e);
            } else if (isNotUndefined(fieldValue)) {
      
              // check field value
              return !!fieldValue;
            }
            return true;
          });
        }
      
        return hasKeyCode && isAllCheck;
    }
      
    getDefaultDomElement(dom: Element|string) {
        const context = this.context;
        let el;
      
        if (typeof dom === 'string' && dom) {
          el = context.refs[dom] || context[dom] || window[dom];
        } else {
          el = context.el || context.$el || context.$root;
        }
      
        if (el instanceof Dom) {
          return el.getElement();
        }
      
        return el;
    };
      
    getRealEventName (eventName: string) {
      return eventConverts[eventName] || eventName;
    }

    getCustomEventName (eventName: string) {
      return customEventNames[eventName] ? eventName:  '';
    }

    /**
     * 
     * doubletab -> touchend 로 바뀜 
     */
    getDefaultEventObject (eventName: string, checkMethodFilters: string[]): IDomEventObject {
        const context = this.context;
        let arr = checkMethodFilters;
      
        // context 에 속한 변수나 메소드 리스트 체크
        const checkMethodList = arr.filter(code => !!context[code]);
      
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
      
        var codes = arr
          .filter(code => filteredList.indexOf(code) === -1)
          .map(code => code.toLowerCase());
      
        return {
          eventName: this.getRealEventName(eventName),
          customEventName: this.getCustomEventName(eventName), 
          codes,
          captures,
          afterMethods,
          beforeMethods,
          delayMethods,
          debounceMethods,
          throttleMethods,
          checkMethodList
        };
    }
      
      
    addDomEvent (eventObject: IDomEventObject, callback: Function) {
        eventObject.callback = this.makeCallback(eventObject, callback);
        this.addBinding(eventObject);
      
        var options: boolean|IDomEventObjectOption = !!eventObject.captures.length
      
        if (scrollBlockingEvents[eventObject.eventName]) {
          options = {
            passive: true,
            capture: options  
          }
        }
      
        if (eventObject?.dom) {

          Event.addDomEvent(
            eventObject?.dom,
            eventObject.eventName,
            eventObject.callback,
            options
          );
        }

    }

    makeCustomEventCallback (eventObject: IDomEventObject, callback: Function): IMultiCallback {

      if (eventObject.customEventName === 'doubletab') {
        var delay = 300;
        
        if (eventObject.delayMethods.length) {
          delay = +eventObject.delayMethods[0].target;
        }
        return (...args: any[]) => {

          if (!this.doubleTab) {
            this.doubleTab = {
                time: performance.now(),
            }
          } else {
            if (performance.now() - this.doubleTab.time < delay) {
              callback(...args);
            }

            this.doubleTab = null;
          }
        }

      } 

      return callback as IMultiCallback; 
    }
      
    bindingDomEvent ( [eventName, dom, ...delegate]: string[], checkMethodFilters: string[], callback: IMultiCallback ) {
        let eventObject = this.getDefaultEventObject(eventName, checkMethodFilters);
      
        eventObject.dom = this.getDefaultDomElement(dom);
        eventObject.delegate = delegate.join(SAPARATOR);

        
        if (eventObject.debounceMethods.length) {
          var debounceTime = +eventObject.debounceMethods[0].target;
          callback = debounce(callback, debounceTime);
        } else if (eventObject.throttleMethods.length) {
          var throttleTime = +eventObject.throttleMethods[0].target;
          callback = throttle(callback, throttleTime);
        }

        // custom event callback 만들기 
        callback = this.makeCustomEventCallback(eventObject, callback)
      
        this.addDomEvent(eventObject, callback);
    };
      
    getEventNames (eventName: string) {
        let results: string[] = [];
        
        eventName.split(NAME_SAPARATOR).forEach(e => {
            var arr = e.split(NAME_SAPARATOR);
        
            results.push.apply(results, arr);
        });
        
        return results;
    }
    
    /**
     * 이벤트 문자열 파싱하기 
     * 
     * @param {string} key 
     */
    parseDomEvent (key: string) {
        const context = this.context;
        let checkMethodFilters = key.split(CHECK_SAPARATOR).map(it => it.trim()).filter(Boolean);
        
        var prefix = checkMethodFilters.shift()
        var eventSelectorAndBehave = prefix?.split(DOM_EVENT_SAPARATOR)[1];
        
        var arr = eventSelectorAndBehave?.split(SAPARATOR);

        if (arr) {
          var eventNames = this.getEventNames(arr[0]);

          var callback = context[key].bind(context);
  
          for(let i = 0, len = eventNames.length; i< len; i++) {
            arr[0] = eventNames[i];
            this.bindingDomEvent(arr, checkMethodFilters, callback);
          }
        }
        
    }  
}