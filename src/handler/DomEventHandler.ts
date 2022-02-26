
import Event, {SAPARATOR, NAME_SAPARATOR } from "../Event";
import { Dom } from "../functions/Dom";
import { debounce, throttle, isNotUndefined, isFunction } from "../functions/func";
import { DomElement, IDomEventObject, IDomEventObjectOption, IMultiCallback } from "../types";
import { BaseHandler } from "./BaseHandler";
import { MagicMethodResult } from '../functions/MagicMethod';
import { IKeyValue } from '../../@types/src/types/index.d';


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
    _domEvents: MagicMethodResult[] | undefined;
    _bindings?: IDomEventObject[];
    doubleTab: any;


    initialize() {
        this.destroy();

        // 이미 정의된 domEvents 가 있고 notEventRedefine 설정이 true 로 되어 있으면 이벤트를 한번만 설정한다. 
        if (this._domEvents && this.context.notEventRedefine) {
          return;
        }

        if (!this._domEvents) {
          this._domEvents = this.context.filterProps('domevent')
        }

        this._domEvents.forEach((it) => this.parseDomEvent(it));
    }

    destroy() {
      if (this.context.notEventRedefine) {
        // NOOP
      } else {
        this.removeEventAll();
      }
        
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
      
    makeCallback (eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function) {
      if (eventObject.delegate) {
        return this.makeDelegateCallback(eventObject, magicMethod, callback);
      } else {
        return this.makeDefaultCallback(eventObject, magicMethod, callback);
      }
    }
      
    makeDefaultCallback (eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function) {
        return (e: any) => {
          var returnValue = this.runEventCallback(e, eventObject, magicMethod, callback);
          if (isNotUndefined(returnValue)) {
            return returnValue;
          }
        };
    }
      
    makeDelegateCallback (eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function) {
        return (e: any) => {
          const delegateTarget = this.hasDelegate(e, eventObject);
      
          if (delegateTarget) {
            // delegate target 이 있는 경우만 callback 실행
            e.$dt = Dom.create(delegateTarget as DomElement);      
      
            var returnValue = this.runEventCallback(e, eventObject, magicMethod, callback);
            if (isNotUndefined(returnValue)) {
              return returnValue;
            }
          }
        };
    }
      
    runEventCallback (e: any, eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function) {
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
    getDefaultEventObject (eventName: string, dom: Element|string, delegate: string[], magicMethod: MagicMethodResult, callback: IMultiCallback): IDomEventObject {

      const obj: IKeyValue = {
        eventName: this.getRealEventName(eventName),
        customEventName: this.getCustomEventName(eventName),
        callback
      }

      const [_, __, ...delegates] = magicMethod.args;
      
      obj.dom = this.getDefaultDomElement(dom);
      obj.delegate = delegates.join(SAPARATOR);
      obj.beforeMethods = [];
      obj.afterMethods = [];
      obj.codes = [];
      obj.checkMethodList = [];

      magicMethod.pipes.forEach(pipe => {
        if (pipe.type === 'function') {

          switch(pipe.func) {
          case 'debounce': 
            var debounceTime = +(pipe.args?.[0] || 0);
            obj.callback = debounce(callback, debounceTime);              
            break;
          case 'throttle':
            var throttleTime = +(pipe.args?.[0] || 0);
            obj.callback = throttle(callback, throttleTime);
            break;
          case 'before':
            obj.beforeMethods.push({
              target: `${pipe.args?.[0]}`,
              param: pipe.args?.[1]
            });
            break;
          case 'after':
            obj.afterMethods.push({
              target: `${pipe.args?.[0]}`,
              param: pipe.args?.[1]
            });
            break;
          }

        } else if (pipe.type === 'keyword') {
            obj.codes.push(`${pipe.value}`.toLowerCase());

            const method = `${pipe.value}`;

            if (this.context[method]) {
              obj.checkMethodList.push(method);
            }
        }

      })

      return obj as IDomEventObject;
    }
      
      
    addDomEvent (eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback: Function) {
        eventObject.callback = this.makeCallback(eventObject, magicMethod, callback);
        this.addBinding(eventObject);
      
        var options: boolean|IDomEventObjectOption = false;

        magicMethod.pipes.forEach(pipe => {
          if (pipe.type === 'keyword') {
            switch(pipe.value) {
            case 'capture':
              options = true;
              break;
            }
          }
        });
      
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

    makeCustomEventCallback (eventObject: IDomEventObject, magicMethod: MagicMethodResult, callback?: EventListenerOrEventListenerObject): IMultiCallback {

      if (eventObject.customEventName === 'doubletab') {
        var delay = 300;


        magicMethod.pipes.forEach(pipe => {
          if (pipe.type === 'function') {
            switch(pipe.func) {
            case 'delay': 
              delay = +(pipe.args?.[0] || 0);
              break;
            }
          }
        })

        return (...args: any[]) => {

          if (!this.doubleTab) {
            this.doubleTab = {
                time: performance.now(),
            }
          } else {
            if (performance.now() - this.doubleTab.time < delay) {
              (callback as Function)?.(...args);
            }

            this.doubleTab = null;
          }
        }

      } 

      return callback as IMultiCallback; 
    }
      
    bindingDomEvent ( [eventName, dom, ...delegate]: string[], magicMethod: MagicMethodResult, callback: IMultiCallback ) {
        let eventObject = this.getDefaultEventObject(eventName, dom, delegate, magicMethod, callback);

        // custom event callback 만들기 
        eventObject.callback = this.makeCustomEventCallback(eventObject, magicMethod, eventObject.callback)
      
        this.addDomEvent(eventObject, magicMethod, eventObject.callback);
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
    parseDomEvent (it: MagicMethodResult) {
        const context = this.context;
        var arr = it.args;

        if (arr) {
          var eventNames = this.getEventNames(arr[0]);

          var callback = context[it.originalMethod].bind(context);
  
          for(let i = 0, len = eventNames.length; i< len; i++) {
            arr[0] = eventNames[i];
            this.bindingDomEvent(arr, it, callback);
          }
        }
        
    }  
}