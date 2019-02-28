import { 
  CHECK_PATTERN, 
  NAME_SAPARATOR, 
  CHECK_SAPARATOR, 
  SAPARATOR, 
  CHECK_LOAD_PATTERN, 
  LOAD_SAPARATOR,
  posXY
} from './Event'
import { debounce, isFunction, isArray, html, keyEach, isNotUndefined, collectProps } from './func';
import { Dom } from './Dom';

const REFERENCE_PROPERTY = 'ref';
const TEMP_DIV = new Dom("div")
const QUERY_PROPERTY = `[${REFERENCE_PROPERTY}]`;

const matchPath = (el, selector) => {
  if (el) {
    if (el.matches(selector)) { return el; }
    return matchPath(el.parentElement, selector);
  }
  return null;
}

const hasDelegate = (e, eventObject) => {
  return matchPath(e.target || e.srcElement, eventObject.delegate);
}


const makeCallback = (context, eventObject, callback) => {

  if (eventObject.delegate) {
    return makeDelegateCallback(context, eventObject, callback);
  }  else {
    return makeDefaultCallback(context, eventObject, callback);
  }
}



const makeDefaultCallback = (context, eventObject, callback) => {
  return (e) => {
    var returnValue = runEventCallback(context, e, eventObject, callback);
    if (!isNotUndefined(returnValue))  return returnValue;
  }
}


const makeDelegateCallback = (context, eventObject, callback) => {
  return (e) => {
    const delegateTarget = hasDelegate(e, eventObject);

    if (delegateTarget) { // delegate target 이 있는 경우만 callback 실행 
      e.$delegateTarget = new Dom(delegateTarget);

      var returnValue = runEventCallback(context, e, eventObject, callback);
      if (!isNotUndefined(returnValue))  return returnValue;
    } 

  }
}

const runEventCallback = (context, e, eventObject, callback) => {
  e.xy = posXY(e)

  if (checkEventType(context, e, eventObject)) {
    var returnValue = callback(e, e.$delegateTarget, e.xy);

    if (eventObject.afterMethods.length) {
      eventObject.afterMethods.forEach(after => context[after.target].call(context, after.param, e))
    } 

    return returnValue; 
  } 
}


const checkEventType = (context, e, eventObject )  => {

  // 특정 keycode 를 가지고 있는지 체크 
  // keyup.pagedown  이라고 정의하면 pagedown 키를 눌렀을때만 동작 함 
  var hasKeyCode = true; 
  if (eventObject.codes.length) {

    hasKeyCode =  (
      e.code ? eventObject.codes.includes(e.code.toLowerCase()) : false
    ) || (
      e.key ? eventObject.codes.includes(e.key.toLowerCase()) : false
    )        
    
  }

  // 체크 메소드들은 모든 메소드를 다 적용해야한다. 
  var isAllCheck = true;  
  if (eventObject.checkMethodList.length) {  
    isAllCheck = eventObject.checkMethodList.every(field => {
      var fieldValue = context[field];
      if (isFunction(fieldValue) && fieldValue) { // check method 
        return fieldValue.call(context, e);
      } else if (isNotUndefined(fieldValue)) { // check field value
        return !!fieldValue
      } 
      return true; 
    });
  }

  return (hasKeyCode && isAllCheck);
}

const getDefaultDomElement = (context, dom) => {
  let el; 

  if (dom) {
    el = context.refs[dom] || context[dom] || window[dom]; 
  } else {
    el = context.el || context.$el || context.$root;
  }

  if (el instanceof Dom) {
    return el.getElement();
  }

  return el;
}

const getDefaultEventObject = (context, eventName, checkMethodFilters) => {
  let arr = checkMethodFilters
  const checkMethodList = arr.filter(code => {
      return !!context[code];
  });

  const afters = arr.filter(code => {
    return code.indexOf('after(') > -1; 
  })

  const afterMethods = afters.map(code => {
    var [target, param] = code.split('after(')[1].split(')')[0].trim().split(' ')

    return {target, param}
  })

  // TODO: split debounce check code 
  const delay = arr.filter(code => {
    if (code.indexOf('debounce(')  > -1) {
      return true; 
    } 
    return false; 
  })

  let debounceTime = 0; 
  if (delay.length) {
    debounceTime = getDebounceTime(delay[0]);
  }

  // capture 
  const capturing = arr.filter(code => code.indexOf('capture') > -1)
  let useCapture = !!capturing.length; 
  
  arr = arr.filter(code => {
    return checkMethodList.includes(code) === false 
          && delay.includes(code) === false 
          && afters.includes(code) === false
          && capturing.includes(code) === false
  }).map(code => {
    return code.toLowerCase() 
  });

  // TODO: split debounce check code     

  return {
    eventName,
    codes : arr,
    useCapture,
    afterMethods, 
    debounce: debounceTime,
    checkMethodList: checkMethodList
  }
}

const getDebounceTime = (code) => {
  var debounceTime = 0;
  if (code.indexOf('debounce(')  > -1) {
    debounceTime = +(code.replace('debounce(', '').replace(')', ''));
  } 

  return debounceTime 
}

const addEvent = (context, eventObject, callback) => {
  eventObject.callback = makeCallback(context, eventObject, callback)
  context.addBinding(eventObject);

  if (eventObject.dom) {
    new Dom(eventObject.dom).on(eventObject.eventName, eventObject.callback, eventObject.useCapture);
  }

}

const bindingEvent = (context, [ eventName, dom, ...delegate], checkMethodFilters, callback) => {
  let eventObject = getDefaultEventObject(context, eventName, checkMethodFilters);

  eventObject.dom = getDefaultDomElement(context, dom);
  eventObject.delegate = delegate.join(SAPARATOR);

  if (eventObject.debounce) {
    callback = debounce(callback, eventObject.debounce)
  } 

  addEvent(context, eventObject, callback);
}


const getEventNames = (eventName) => {
  let results = [] 

  eventName.split(NAME_SAPARATOR).forEach(e => {
    var arr = e.split(NAME_SAPARATOR)

    results.push(...arr)
  })

  return results; 
}

const parseEvent = (context, key) => {
  let checkMethodFilters = key.split(CHECK_SAPARATOR).map(it => it.trim());
  var eventSelectorAndBehave = checkMethodFilters.shift() ;

  var [eventName, ...params] = eventSelectorAndBehave.split(SAPARATOR);
  var eventNames =  getEventNames(eventName)
  var callback = context[key].bind(context)
  
  eventNames.forEach(eventName => {
    bindingEvent(context, [eventName, ...params], checkMethodFilters, callback);
  })
}



export default class EventMachine { 

  constructor() { 
    this.refs = {} 
    this.children = {} 
    this._bindings = []
    this.childComponents = this.components()
  }

  render ($container) {
    this.$el = this.parseTemplate(html`${this.template()}`)
    this.refs.$el = this.$el;   

    if ($container) $container.html(this.$el)

    this.load()    

    this.afterRender();
  }

  initialize() {}
  afterRender () { }
  components () { return {} }

  parseTemplate (html, isLoad) {

    if (isArray(html)) {
      html = html.join('')
    }

    html = html.trim();

    const list = TEMP_DIV.html(html).children()

    list.forEach($el => {
      // ref element 정리 
      if ($el.attr(REFERENCE_PROPERTY)) {
        this.refs[$el.attr(REFERENCE_PROPERTY)] = $el; 
      }
      var refs = $el.$$(QUERY_PROPERTY);
      refs.forEach($dom => {
        const name = $dom.attr(REFERENCE_PROPERTY)
        this.refs[name] = $dom;
      })

    })

    if (!isLoad) {
      return list[0];
    }

    return TEMP_DIV.createChildrenFragment();
  }

  parseComponent () {
    const $el = this.$el; 
    keyEach(this.childComponents, (ComponentName, Component) => {
      const targets = $el.$$(`${ComponentName.toLowerCase()}`);
      [...targets].forEach($dom => {
        let props = {};
        
        [...$dom.el.attributes].filter(t => {
          return [REFERENCE_PROPERTY].indexOf(t.nodeName) < 0 
        }).forEach(t => {
          props[t.nodeName] = t.nodeValue 
        })
  
        let refName = $dom.attr(REFERENCE_PROPERTY) || ComponentName
  
        if (refName) {
        
          if (Component) { 

            var instance = new Component(this, props);

            if (this.children[refName]) {
              refName = instance.id
            }

            this.children[refName] = instance            
            this.refs[refName] = instance.$el

            if (instance) {
              instance.render()
  
              $dom.replace(instance.$el)
            }
          }
  
        }
  
  
      })
    })
  }

  load () {

    if (!this._loadMethods) {
      this._loadMethods = this.filterProps(CHECK_LOAD_PATTERN);
    }
  
    this._loadMethods.forEach(callbackName => {
      const elName = callbackName.split(LOAD_SAPARATOR)[1]
      if (this.refs[elName]) { 
        const fragment = this.parseTemplate(this[callbackName].call(this), true);
        this.refs[elName].html(fragment)
      }
    })

    this.parseComponent()
  }

  // 기본 템플릿 지정 
  template () {
    var className =  this.templateClass()
    var classString = className ? `class="${className}"` : ''

    return `<div ${classString}></div>`;
  }

  templateClass () {return null;}


  eachChildren (callback) {
    if (!isFunction(callback)) return; 

    keyEach(this.children, (_, Component) => {
      callback(Component)
    })
  }

  /**
   * 이벤트를 초기화한다. 
   */
  initializeEvent () { 
    this.initializeEventMachin();

    // 자식 이벤트도 같이 초기화 한다. 
    // 그래서 이 메소드는 부모에서 한번만 불려도 된다. 
    this.eachChildren(Component => {
      Component.initializeEvent()
    })
  }

  /**
   * 자원을 해제한다. 
   * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다. 
   */
  destroy() {
    this.destroyEventMachin();
    // this.refs = {} 

    this.eachChildren(Component => {
      Component.destroy()
    })
  }

  destroyEventMachin () {
    this.removeEventAll();
  }

  initializeEventMachin () {
    this.filterProps(CHECK_PATTERN).forEach(key => parseEvent(this, key));
  }


  filterProps (pattern) {
    return collectProps(this).filter(key => {
      return key.match(pattern);
    });
  }

  /* magic check method  */ 
  self (e) { return e.$delegateTarget.is(e.target); }
  isAltKey (e) { return e.altKey }
  isCtrlKey (e) { return e.ctrlKey }
  isShiftKey (e) { return e.shiftKey }
  isMetaKey (e) { return e.metaKey }

  /* magic check method */ 

  getBindings () {

    if (!this._bindings) {
      this.initBindings();
    }

    return this._bindings;
  }

  addBinding (obj) {
    this.getBindings().push(obj);
  }

  initBindings() {
    this._bindings = [];
  }

  removeEventAll () {
    this.getBindings().forEach(obj => {
      if (obj.dom) {
        new Dom(obj.dom).off(obj.eventName, obj.callback);
      }
    });
    this.initBindings();
  }
}
