function debounce (callback, delay = 0) {

    if (delay === 0) {
        return callback;
    }

    var t = undefined;

    return function ($1, $2, $3, $4, $5) {
        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback($1, $2, $3, $4, $5);
        }, delay || 300);
    }
}
  

function throttle (callback, delay) {

    var t = undefined;

    return function ($1, $2, $3, $4, $5) {
        if (!t) {
            t = setTimeout(function () {
                callback($1, $2, $3, $4, $5);
                t = null; 
            }, delay || 300);
        }

    }
}

function keyEach (obj, callback) {
    Object.keys(obj).forEach( (key, index) => {
        callback (key, obj[key], index);
    });
}

function keyMap (obj, callback) {
    return Object.keys(obj).map( (key, index) => {
        return callback (key, obj[key], index);
    })
}


function isUndefined (value) {
    return typeof value == 'undefined' || value === null;
}

function isNotUndefined (value) {
    return isUndefined(value) === false;
}

function isArray (value) {
    return Array.isArray(value);
}

function isBoolean (value) {
    return typeof value == 'boolean'
}

function isString (value) {
    return typeof value == 'string'
}

function isNotString (value) {
    return isString(value) === false;
}

function isObject (value) {
    return typeof value == 'object' && !isArray(value) && !isNumber(value) && !isString(value)  && value !== null; 
}

function isFunction (value) {
    return typeof value == 'function'
}

function isNumber (value) {
    return typeof value == 'number';
}

function clone (obj) {
    return JSON.parse(JSON.stringify(obj));
}

const HTML_TAG = {
    'image': true,
    'input': true,
    'br': true,
    'path': true,
    'line': true,
    'circle': true,
    'rect': true,
    'path': true, 
    'polygon': true,
    'polyline': true,
    'use': true
};


const html = (strings, ...args) => {

    var results =  strings.map((it, index) => {
        
        var results = args[index] || '';

        if (isFunction(results)) {
            results = results();
        }

        if (!isArray(results)) {
            results = [results];
        }

        results = results.join('');

        return it + results;
    }).join('');

    results = results.replace(/\<(\w*)([^\>]*)\/\>/gim, function (match, p1) {
        if (HTML_TAG[p1.toLowerCase()]) {
            return match;
        } else {
            return match.replace('/>', `></${p1}>`)
        }
    });

    return results; 
};

const UUID_REG = /[xy]/g;

function uuid(){
    var dt = new Date().getTime();
    var uuid = 'xxx12-xx-34xx'.replace(UUID_REG, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function uuidShort(){
    var dt = new Date().getTime();
    var uuid = 'idxxxxxxx'.replace(UUID_REG, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const makeEventChecker = (value, split = CHECK_SAPARATOR) => {
  return ` ${split} ${value}`;
};

// event name regular expression
const CHECK_DOM_EVENT_PATTERN = /^dom (.*)/gi;
const CHECK_LOAD_PATTERN = /^load (.*)/gi;
const CHECK_BIND_PATTERN = /^bind (.*)/gi;



const NAME_SAPARATOR = ":";
const CHECK_SAPARATOR = "|";
const DOM_EVENT_SAPARATOR = "dom ";
const LOAD_SAPARATOR = "load ";
const BIND_SAPARATOR = "bind ";

const SAPARATOR = ' ';

const refManager = {};

const DOM_EVENT_MAKE = (...keys) => {
  var key = keys.join(NAME_SAPARATOR);
  return (...args) => {
    return DOM_EVENT_SAPARATOR + [key, ...args].join(SAPARATOR);
  };
};

const CUSTOM = DOM_EVENT_MAKE;
const CLICK = DOM_EVENT_MAKE("click");
const DOUBLECLICK = DOM_EVENT_MAKE("dblclick");
const MOUSEDOWN = DOM_EVENT_MAKE("mousedown");
const MOUSEUP = DOM_EVENT_MAKE("mouseup");
const MOUSEMOVE = DOM_EVENT_MAKE("mousemove");
const MOUSEOVER = DOM_EVENT_MAKE("mouseover");
const MOUSEOUT = DOM_EVENT_MAKE("mouseout");
const MOUSEENTER = DOM_EVENT_MAKE("mouseenter");
const MOUSELEAVE = DOM_EVENT_MAKE("mouseleave");
const TOUCHSTART = DOM_EVENT_MAKE("touchstart");
const TOUCHMOVE = DOM_EVENT_MAKE("touchmove");
const TOUCHEND = DOM_EVENT_MAKE("touchend");
const KEYDOWN = DOM_EVENT_MAKE("keydown");
const KEYUP = DOM_EVENT_MAKE("keyup");
const KEYPRESS = DOM_EVENT_MAKE("keypress");
const DRAG = DOM_EVENT_MAKE("drag");
const DRAGSTART = DOM_EVENT_MAKE("dragstart");
const DROP = DOM_EVENT_MAKE("drop");
const DRAGOVER = DOM_EVENT_MAKE("dragover");
const DRAGENTER = DOM_EVENT_MAKE("dragenter");
const DRAGLEAVE = DOM_EVENT_MAKE("dragleave");
const DRAGEXIT = DOM_EVENT_MAKE("dragexit");
const DRAGOUT = DOM_EVENT_MAKE("dragout");
const DRAGEND = DOM_EVENT_MAKE("dragend");
const CONTEXTMENU = DOM_EVENT_MAKE("contextmenu");
const CHANGE = DOM_EVENT_MAKE("change");
const INPUT = DOM_EVENT_MAKE("input");
const FOCUS = DOM_EVENT_MAKE("focus");
const FOCUSIN = DOM_EVENT_MAKE("focusin");
const FOCUSOUT = DOM_EVENT_MAKE("focusout");
const BLUR = DOM_EVENT_MAKE("blur");
const PASTE = DOM_EVENT_MAKE("paste");
const RESIZE = DOM_EVENT_MAKE("resize");
const SCROLL = DOM_EVENT_MAKE("scroll");
const SUBMIT = DOM_EVENT_MAKE("submit");
const POINTERSTART = CUSTOM("pointerdown");
const POINTERMOVE = CUSTOM("pointermove");
const POINTEREND = CUSTOM("pointerup");
const CHANGEINPUT = CUSTOM("change", "input");
const WHEEL = CUSTOM("wheel", "mousewheel", "DOMMouseScroll");
const ANIMATIONSTART = DOM_EVENT_MAKE('animationstart');
const ANIMATIONEND = DOM_EVENT_MAKE('animationend');
const ANIMATIONITERATION = DOM_EVENT_MAKE('animationiteration');
const TRANSITIONSTART = DOM_EVENT_MAKE('transitionstart');
const TRANSITIONEND = DOM_EVENT_MAKE('transitionend');
const TRANSITIONRUN = DOM_EVENT_MAKE('transitionrun');
const TRANSITIONCANCEL = DOM_EVENT_MAKE('transitioncancel');

// Predefined CHECKER
const CHECKER = (value, split = CHECK_SAPARATOR) => {
  return makeEventChecker(value, split);
};

const AFTER = (value, split = CHECK_SAPARATOR) => {
  return makeEventChecker(`after(${value})`, split);
};

const BEFORE = (value, split = CHECK_SAPARATOR) => {
  return makeEventChecker(`before(${value})`, split);  
};

const IF = CHECKER;
const KEY = CHECKER; 

const ARROW_UP = CHECKER('ArrowUp');
const ARROW_DOWN = CHECKER('ArrowDown');
const ARROW_LEFT = CHECKER('ArrowLeft');
const ARROW_RIGHT = CHECKER('ArrowRight');
const ENTER = CHECKER('Enter');
const SPACE = CHECKER('Space');
const ESCAPE = CHECKER('Escape');

const ALT = CHECKER("isAltKey");
const SHIFT = CHECKER("isShiftKey");
const META = CHECKER("isMetaKey");
const CONTROL = CHECKER("isCtrlKey");
const SELF = CHECKER("self");

const FIT = CHECKER("fit");
const PASSIVE = CHECKER("passive");
const VDOM = CHECKER('vdom');

// event config method
const DEBOUNCE = (t = 100) => {
  return CHECKER(`debounce(${t})`);
};

const D1000 = DEBOUNCE(1000);

const THROTTLE = (t = 100) => {
  return CHECKER(`throttle(${t})`);
};

const CAPTURE = CHECKER("capture()");
// event config method

// before method

// after method
const MOVE = (method = "move") => {
  return AFTER(`bodyMouseMove ${method}`);
};
const END = (method = "end") => {
  return AFTER(`bodyMouseUp ${method}`);
};

const PREVENT = AFTER(`preventDefault`);
const STOP = AFTER(`stopPropagation`);

// Predefined LOADER
const LOAD = (value = "$el") => {
  return LOAD_SAPARATOR + value;
};

const createRef = value => {
  if (value === '') return '';

  var id = uuid();
  refManager[id] = value;

  return id;
};

const getRef = id => {
  return refManager[id] || '';
};

const BIND_CHECK_FUNCTION = field => {
  return function() {
    return this.prevState[field] != this.state[field];
  };
};

const BIND_CHECK_DEFAULT_FUNCTION = () => {
  return true;
};

const BIND = (value = "$el", checkFieldOrCallback = '') => {
  return (
    BIND_SAPARATOR + value + ( 
      checkFieldOrCallback ?  CHECK_SAPARATOR + createRef(checkFieldOrCallback) : '' 
    ) 
  );
};

var Event = {
  addEvent(dom, eventName, callback, useCapture = false) {
    if (dom) {
      dom.addEventListener(eventName, callback, useCapture);
    }
  },

  removeEvent(dom, eventName, callback) {
    if (dom) {
      dom.removeEventListener(eventName, callback);
    }
  },

  pos(e) {
    if (e.touches && e.touches[0]) {
      return e.touches[0];
    }

    return e;
  },

  posXY(e) {
    var pos = this.pos(e);
    return {
      x: pos.pageX,
      y: pos.pageY
    };
  }
};

class BaseStore {
  constructor(opt = {}) {
    this.cachedCallback = {};
    this.callbacks = {};
    this.commandes = [];
  }

  getCallbacks(event) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    return this.callbacks[event]
  }

  setCallbacks(event, list = []) {
    this.callbacks[event] = list; 
  }

  on(event, originalCallback, context, delay = 0) {
    var callback = delay > 0 ? debounce(originalCallback, delay) : originalCallback;

    this.getCallbacks(event).push({ event, callback, context, originalCallback });
  }

  off(event, originalCallback) {

    if (arguments.length == 1) {
      this.setCallbacks(event);
    } else if (arguments.length == 2) {      
      this.setCallbacks(event, this.getCallbacks(event).filter(f => {
        return f.originalCallback !== originalCallback
      }));
    }
  }

  offAll (context) {

    Object.keys(this.callbacks).forEach(event => {
      this.setCallbacks(event, this.getCallbacks(event).filter(f => {
        return f.context !== context;  
      }));
    });
  }

  getCachedCallbacks (event) {
    return this.getCallbacks(event);
  }

  sendMessage(source, event, $2, $3, $4, $5) {
    Promise.resolve().then(() => {
      var list = this.getCachedCallbacks(event);
      if (list) {
        list
        .filter(f => f.originalCallback.source !== source)
        .forEach(f => {
          f.callback($2, $3, $4, $5);
        });
      }

    });
  }

  triggerMessage(source, event, $2, $3, $4, $5) {
    Promise.resolve().then(() => {
      var list = this.getCachedCallbacks(event);
      if (list) {
        list
          .filter(f => f.originalCallback.source === source)
          .forEach(f => {      
            f.callback($2, $3, $4, $5);
          });
      } else {
        console.warn(event, ' is not valid event');
      }


    });
  }




  emit($1, $2, $3, $4, $5) {
    this.sendMessage(this.source, $1, $2, $3, $4, $5);
  }

  trigger($1, $2, $3, $4, $5) {
    this.triggerMessage(this.source, $1, $2, $3, $4, $5);
  }

  execute($1, $2, $3, $4, $5){
    this.runCommand(this.source, $1, $2, $3, $4, $5);
  }
}

// collectProps 에서 제외될 메소드 목록 
const expectMethod = {
    "constructor": true,
    "initState": true,
    "refresh": true,
    "updateData": true,
    "constructor": true,
    "initializeProperty": true,
    "created": true,
    "getRealEventName": true,
    "initializeStoreEvent": true,
    "destoryStoreEvent": true,
    "destroy": true,
    "emit": true,
    "trigger": true,
    "on": true,
    "off": true,
    "setState": true,
    "_reload": true,
    "render": true,
    "initialize": true,
    "afterRender": true,
    "components": true,
    "getRef": true,
    "parseTemplate": true,
    "childrenIds": true,
    "exists": true,
    "parseProperty": true,
    "parseSourceName": true,
    "parseComponent": true,
    "clean": true,
    "refresh": true,
    "template": true,
    "eachChildren": true,
    "initializeEvent": true,
    "destroy": true,
    "self": true,
    "isAltKey": true,
    "isCtrlKey": true,
    "isShiftKey": true,
    "isMetaKey": true,
    "preventDefault": true,
    "stopPropagation": true,
    "bodyMouseMove": true,
    "bodyMouseUp": true,
  };

class BaseHandler {
    constructor (context, options = {}) {
        this.context = context;
        this.options = options;
    }

    // 초기화 설정 
    initialize () {

    }

    // html 을 로드 할 때 
    load () {

    }

    // 새로고침 할 때 
    refresh () {

    }
    
    // 화면에 그린 이후에 실행 되는 로직들 
    render () {

    }

    getRef(id) {
        return this.context.getRef(id);
    }
        
    splitMethodByKeyword (arr, keyword) {
        var filterKeys = arr.filter(code => code.indexOf(`${keyword}(`) > -1);
        var filterMaps = filterKeys.map(code => {
          var [target, param] = code
            .split(`${keyword}(`)[1]
            .split(")")[0]
            .trim()
            .split(" ");
      
          return { target, param };
        });
      
        return [filterKeys, filterMaps];
    }    

    /**
     * property 수집하기
     * 상위 클래스의 모든 property 를 수집해서 리턴한다.
     */
    collectProps() {

        var context = this.context;
        var p = context.__proto__;
        var results = [];
        do {
        var isObject = p instanceof Object;

        if (isObject === false) {
            break;
        }
        const names = Object.getOwnPropertyNames(p).filter(name => {
            return context && isFunction(context[name]) && !expectMethod[name];
        });

        results.push(...names);
        p = p.__proto__;
        } while (p);

        return results;
    }



    filterProps(pattern) {
        return this.collectProps().filter(key => {
            return key.match(pattern);
        });
    }    

    run () {

    }

    destroy() {

    }
}

const setBooleanProp = (el, name, value) => {
    if (value) {
        el.setAttribute(name, name);
        el[name] = value;
    } else {
        el.removeAttribute(name);
        el[name] = value;
    }
  };
  
const setProp = (el, name, value) => {
    if (typeof value === 'boolean') {
        setBooleanProp(el, name, value);
    } else {
        el.setAttribute(name, value);
    }
};


const removeBooleanProp = (node, name) => {
    node.removeAttribute(name);
    node[name] = false;
};

const removeUndefinedProp = (node, name) => {
    node.removeAttribute(name);
};
  
const removeProp = (node, name, value) => {
    if (typeof value === 'boolean') {
        removeBooleanProp(node, name);
    } else if (name) {
        removeUndefinedProp(node, name);
    }
};
  

const updateProp = (node, name, newValue, oldValue) => {
    if (!newValue) {
      removeProp(node, name, oldValue);
    } else if (!oldValue || newValue !== oldValue) {
      setProp(node, name, newValue);
    }
  };


const updateProps = (node, newProps = {}, oldProps = {}) => {
    const props = {...newProps,...oldProps};
  
    Object.keys(props).forEach((name) => {
      updateProp(node, name, newProps[name], oldProps[name]);
    });
};

function changed(node1, node2) {
    return (
        (node1.nodeType === Node.TEXT_NODE && node1 !== node2) 
        || node1.nodeName !== node2.nodeName
    ) 
}

function getProps (attributes) {
    var results = {};
    for(var t of attributes) {
        results[t.name] = t.value;
    }

    return results;
    
}

function updateElement (parentElement, oldEl, newEl, i) {
    if (!oldEl) {
        parentElement.appendChild(newEl.cloneNode(true));
    } else if (!newEl) {
        parentElement.removeChild(oldEl);
    } else if (changed(newEl, oldEl)) {
        parentElement.replaceChild(newEl.cloneNode(true), oldEl);
    } else if (newEl.nodeType !== Node.TEXT_NODE) {
        updateProps(oldEl, getProps(newEl.attributes), getProps(oldEl.attributes)); // added        
        var oldChildren = children(oldEl);
        var newChildren = children(newEl);
        var max = Math.max(oldChildren.length, newChildren.length);

        for (var i = 0; i < max; i++) {
            updateElement(oldEl, oldChildren[i], newChildren[i], i);
        }
    }

}

const children = (el) => {
    var element = el.firstChild; 

    if (!element) {
        return [] 
    }

    var results = []; 

    do {
        results.push(element);
        element = element.nextSibling;
    } while (element);

    return results; 
};


function DomDiff (A, B) {

    A = A.el || A; 
    B = B.el || B; 

    var childrenA = children(A);
    var childrenB = children(B); 

    var len = Math.max(childrenA.length, childrenB.length);
    for (var i = 0; i < len; i++) {
        updateElement(A, childrenA[i], childrenB[i], i);
    }
}

class Dom {
  constructor(tag, className, attr) {
    if (isNotString(tag)) {
      this.el = tag;
    } else {
      var el = document.createElement(tag);

      if (className) {
        el.className = className;
      }

      attr = attr || {};

      for (var k in attr) {
        el.setAttribute(k, attr[k]);
      }

      this.el = el;
    }
  }

  static create (tag, className, attr) {
    return new Dom(tag, className, attr);
  }
 
  static createByHTML (htmlString) {
    var div = Dom.create('div');
    var list = div.html(htmlString).children();

    if (list.length) {
      return Dom.create(list[0].el);
    }

    return null; 
  }

  static createBySVG (svgString) {

    var list = Dom.createByHTML(`<svg>${svgString}</svg>`).children();

    if (list.length) {
      return Dom.create(list[0].el);
    }

    return null; 
  }  

  static createFragment (domString, containerTag = 'div') {
    var div = Dom.create(containerTag);
    return Dom.create(div.html(domString).createChildrenFragment())
  }

  static getScrollTop() {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }

  static getScrollLeft() {
    return Math.max(
      window.pageXOffset,
      document.documentElement.scrollLeft,
      document.body.scrollLeft
    );
  }

  static parse(html) {
    var parser = DOMParser();
    return parser.parseFromString(html, "text/htmll");
  }

  static body () {
    return Dom.create(document.body)
  }

  isFragment () {
    return this.el.nodeType === 11;
  }

  setAttr (obj) {
    if (this.isFragment()) return; 
    Object.keys(obj).forEach(key => {
      this.attr(key, obj[key]);
    });
    return this;  
  }

  attr(key, value) {
    if (this.isFragment()) return; 
    if (arguments.length == 1) {
      if (this.el.getAttribute) {
        return this.el.getAttribute(key);
      } else {
        return undefined;
      }

    }

    this.el.setAttribute(key, value);

    return this;
  }

  attrKeyValue(keyField) {
    if (this.isFragment()) return {};     
    return {
      [this.el.getAttribute(keyField)]: this.val()
    }
  }

  attrs(...args) {
    if (this.isFragment()) return [];
    return args.map(key => {
      return this.el.getAttribute(key);
    });
  }

  styles(...args) {
    return args.map(key => {
      return this.el.style[key];
    });
  }  

  removeAttr(key) {
    this.el.removeAttribute(key);

    return this;
  }

  removeStyle(key) {
    this.el.style.removeProperty(key);
    return this;
  }

  is(checkElement) {
    return this.el === (checkElement.el || checkElement);
  }

  isTag(tag) {
    return this.el.tagName.toLowerCase() === tag.toLowerCase()
  }

  closest(cls) {
    var temp = this;
    var checkCls = false;

    while (!(checkCls = temp.hasClass(cls))) {
      if (temp.el.parentNode) {
        temp = Dom.create(temp.el.parentNode);
      } else {
        return null;
      }
    }

    if (checkCls) {
      return temp;
    }

    return null;
  }

  parent() {
    return Dom.create(this.el.parentNode);
  }

  hasParent () {
    return !!this.el.parentNode
  }

  removeClass(...args) {
    this.el.classList.remove(...args);
    return this;
  }

  hasClass(cls) {
    if (!this.el.classList) return false;
    return this.el.classList.contains(cls);
  }

  addClass(...args) {
    this.el.classList.add(...args);

    return this;
  }

  onlyOneClass(cls) {
    var parent = this.parent();

    parent.children().forEach(it => {
      it.removeClass(cls);
    });

    this.addClass(cls);
  }

  toggleClass(cls, isForce) {
    this.el.classList.toggle(cls, isForce);
  }

  html(html) {
    if (isUndefined(html)) {
      return this.el.innerHTML;
    }

    if (isString(html)) {
      this.el.innerHTML = html;
    } else {
      this.empty().append(html);
    }

    return this;
  }

  htmlDiff(fragment) {
    DomDiff(this, fragment);
  }
  updateDiff (html, rootElement = 'div') {
    DomDiff(this, Dom.create(rootElement).html(html));
  }

  updateSVGDiff (html, rootElement = 'div') {

    DomDiff(this, Dom.create(rootElement).html(`<svg>${html}</svg>`).firstChild);
  }  

  find(selector) {
    return this.el.querySelector(selector);
  }

  $(selector) {
    var node = this.find(selector);
    return node ? Dom.create(node) : null;
  }

  findAll(selector) {
    return this.el.querySelectorAll(selector);
  }

  $$(selector) {
    var arr = this.findAll(selector);
    return Object.keys(arr).map(key => {
      return Dom.create(arr[key]);
    });
  }

  empty() {
    while (this.el.firstChild) this.el.removeChild(this.el.firstChild);
    return this;
  }

  append(el) {
    if (isString(el)) {
      this.el.appendChild(document.createTextNode(el));
    } else {
      this.el.appendChild(el.el || el);
    }

    return this;
  }

  prepend(el) {
    if (isString(el)) {
      this.el.prepend(document.createTextNode(el));
    } else {
      this.el.prepend(el.el || el);
    }

    return this;    
  }

  prependHTML(html) {
    var $dom = Dom.create("div").html(html);

    this.prepend($dom.createChildrenFragment());

    return $dom;
  }

  prependSVG(html) {
    var $dom = Dom.create("div").html(`<svg>${html}</svg>`);

    this.prepend($dom.$('svg').createChildrenFragment());

    return $dom;
  }  

  appendHTML(html) {
    var $dom = Dom.create("div").html(html);

    this.append($dom.createChildrenFragment());

    return $dom;
  }

  appendSVG(html) {
    var $dom = Dom.create("div").html(`<svg>${html}</svg>`);

    this.append($dom.$('svg').createChildrenFragment());

    return $dom;
  }  

  /**
   * create document fragment with children dom
   */
  createChildrenFragment() {
    const list = this.children();

    var fragment = document.createDocumentFragment();
    list.forEach($el => fragment.appendChild($el.el));

    return fragment;
  }

  appendTo(target) {
    var t = target.el ? target.el : target;

    t.appendChild(this.el);

    return this;
  }

  remove() {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }

    return this;
  }

  removeChild(el) {
    this.el.removeChild(el.el || el);
    return this; 
  }

  text(value) {
    if (isUndefined(value)) {
      return this.el.textContent;
    } else {
      var tempText = value;

      if (value instanceof Dom) {
        tempText = value.text();
      }

      this.el.textContent = tempText;
      return this;
    }
  }

  /**
   *
   * $el.css`
   *  border-color: yellow;
   * `
   *
   * @param {*} key
   * @param {*} value
   */

  css(key, value) {
    if (isNotUndefined(key) && isNotUndefined(value)) {
      Object.assign(this.el.style, {[key]: value});
    } else if (isNotUndefined(key)) {
      if (isString(key)) {
        return getComputedStyle(this.el)[key];  
      } else {
        Object.assign(this.el.style, key);
      }
    }

    return this;
  }

  getComputedStyle (...list) {
    var css = getComputedStyle(this.el);

    var obj = {};
    list.forEach(it => {
      obj[it] = css[it];
    });

    return obj; 
  }

  getStyleList(...list) {
    var style = {};

    var len = this.el.style.length;
    for (var i = 0; i < len; i++) {
      var key = this.el.style[i];

      style[key] = this.el.style[key];
    }

    list.forEach(key => {
      style[key] = this.css(key);
    });

    return style;
  }

  cssText(value) {
    if (isUndefined(value)) {
      return this.el.style.cssText;
    }

    if (value != this.el.tempCssText) {
      this.el.style.cssText = value;
      this.el.tempCssText = value; 
    } 

    return this;
  }

  cssArray(arr) {
    if (arr[0]) this.el.style[arr[0]] = arr[1];
    if (arr[2]) this.el.style[arr[2]] = arr[3];
    if (arr[4]) this.el.style[arr[4]] = arr[5];
    if (arr[6]) this.el.style[arr[6]] = arr[7];
    if (arr[8]) this.el.style[arr[8]] = arr[9];

    return this;
  }

  cssFloat(key) {
    return parseFloat(this.css(key));
  }

  cssInt(key) {
    return parseInt(this.css(key));
  }

  px(key, value) {
    return this.css(key, value + 'px');
  }

  rect() {
    return this.el.getBoundingClientRect();
  }

  isSVG () {
    return this.el.tagName.toUpperCase() === 'SVG';
  }

  offsetRect() {

    if (this.isSVG()) {
      const parentBox = this.parent().rect();
      const box = this.rect();

      return {
        x: box.x - parentBox.x,
        y: box.y - parentBox.y,
        top: box.x - parentBox.x,
        left: box.y - parentBox.y,
        width: box.width,
        height: box.height
      }
    }

    return {
      x: this.el.offsetLeft,
      y: this.el.offsetTop,
      top: this.el.offsetTop,
      left: this.el.offsetLeft,
      width: this.el.offsetWidth,
      height: this.el.offsetHeight
    };
  }

  offset() {
    var rect = this.rect();

    var scrollTop = Dom.getScrollTop();
    var scrollLeft = Dom.getScrollLeft();

    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }

  offsetLeft() {
    return this.offset().left;
  }

  offsetTop() {
    return this.offset().top;
  }

  position() {
    if (this.el.style.top) {
      return {
        top: parseFloat(this.css("top")),
        left: parseFloat(this.css("left"))
      };
    } else {
      return this.rect();
    }
  }

  size() {
    return [this.width(), this.height()];
  }

  width() {
    return this.el.offsetWidth || this.rect().width;
  }

  contentWidth() {
    return (
      this.width() -
      this.cssFloat("padding-left") -
      this.cssFloat("padding-right")
    );
  }

  height() {
    return this.el.offsetHeight || this.rect().height;
  }

  contentHeight() {
    return (
      this.height() -
      this.cssFloat("padding-top") -
      this.cssFloat("padding-bottom")
    );
  }

  val(value) {
    if (isUndefined(value)) {
      return this.el.value;
    } else if (isNotUndefined(value)) {
      var tempValue = value;

      if (value instanceof Dom) {
        tempValue = value.val();
      }

      this.el.value = tempValue;
    }

    return this;
  }

  matches (selector) {
    if (this.el) {

      if (!this.el.matches) return null;

      if (this.el.matches(selector)) {
        return this;
      }
      return this.parent().matches(selector);
    }

    return null;
}  


  get value() {
    return this.el.value;
  }

  get naturalWidth () {
    return this.el.naturalWidth
  }

  get naturalHeight () {
    return this.el.naturalHeight
  }  

  get files() {
    return this.el.files ? [...this.el.files] : [];
  }

  realVal() {
    switch (this.el.nodeType) {
      case "INPUT":
        var type = this.attr("type");
        if (type == "checkbox" || type == "radio") {
          return this.checked();
        }
      case "SELECT":
      case "TEXTAREA":
        return this.el.value;
    }

    return "";
  }

  show(displayType = "block") {
    return this.css("display", displayType != "none" ? displayType : "block");
  }

  hide() {
    return this.css("display", "none");
  }

  isHide () {
    return this.css("display") == "none"
  }

  isShow () {
    return !this.isHide();
  }

  toggle(isForce) {
    var currentHide = this.isHide();

    if (arguments.length == 1) {
      if (isForce) {
        return this.show();
      } else {
        return this.hide();
      }
    } else {
      if (currentHide) {
        return this.show();
      } else {
        return this.hide();
      }
    }
  }

  get totalLength () {
    return this.el.getTotalLength()
  }

  scrollIntoView () {
    this.el.scrollIntoView();
  }

  addScrollLeft (dt) {
    this.el.scrollLeft += dt; 
    return this; 
  }

  addScrollTop (dt) {
    this.el.scrollTop += dt; 
    return this; 
  }  

  setScrollTop(scrollTop) {
    this.el.scrollTop = scrollTop;
    return this;
  }

  setScrollLeft(scrollLeft) {
    this.el.scrollLeft = scrollLeft;
    return this;
  }

  scrollTop() {
    if (this.el === document.body) {
      return Dom.getScrollTop();
    }

    return this.el.scrollTop;
  }

  scrollLeft() {
    if (this.el === document.body) {
      return Dom.getScrollLeft();
    }

    return this.el.scrollLeft;
  }

  scrollHeight() {
    return this.el.scrollHeight;
  }

  scrollWidth() {
    return this.el.scrollWidth;
  }  

  on(eventName, callback, opt1, opt2) {
    this.el.addEventListener(eventName, callback, opt1, opt2);

    return this;
  }

  off(eventName, callback) {
    this.el.removeEventListener(eventName, callback);

    return this;
  }

  getElement() {
    return this.el;
  }

  createChild(tag, className = '', attrs = {}, css = {}) {
    let $element = Dom.create(tag, className, attrs);
    $element.css(css);

    this.append($element);

    return $element;
  }

  get firstChild() {
    return Dom.create(this.el.firstElementChild);
  }

  children() {
    var element = this.el.firstElementChild;

    if (!element) {
      return [];
    }

    var results = [];

    do {
      results.push(Dom.create(element));
      element = element.nextElementSibling;
    } while (element);

    return results;
  }

  childLength() {
    return this.el.children.length;
  }

  replace(newElement) {

    if (this.el.parentNode) {
      this.el.parentNode.replaceChild(newElement.el || newElement, this.el);
    }

    return this;
  }

  replaceChild(oldElement, newElement) {
    this.el.replaceChild(newElement.el || newElement, oldElement.el || oldElement);

    return this;
  }  

  checked(isChecked = false) {
    if (arguments.length == 0) {
      return !!this.el.checked;
    }

    this.el.checked = !!isChecked;

    return this;
  }


  click () {
    this.el.click();

    return this; 
  }  

  focus() {
    this.el.focus();

    return this;
  }

  select() {
    this.el.select();
    return this;
  }

  blur() {
    this.el.blur();

    return this;
  }

  select() {
    this.el.select();

    return this;
  }

  // canvas functions

  context(contextType = "2d") {
    if (!this._initContext) {
      this._initContext = this.el.getContext(contextType);
    }

    return this._initContext;
  }

  resize({ width, height }) {
    // support hi-dpi for retina display
    this._initContext = null;
    var ctx = this.context();
    var scale = window.devicePixelRatio || 1;

    this.px("width", +width);
    this.px("height", +height);

    this.el.width = width * scale;
    this.el.height = height * scale;

    ctx.scale(scale, scale);
  }

  toDataURL (type = 'image/png', quality = 1) {
    return this.el.toDataURL(type, quality)
  }

  clear() {
    this.context().clearRect(0, 0, this.el.width, this.el.height);
  }

  update(callback) {
    this.clear();
    callback.call(this, this);
  }

  drawImage (img, dx = 0, dy = 0) {
    var ctx = this.context();
    var scale = window.devicePixelRatio || 1;    
    ctx.drawImage(img, dx, dy, img.width, img.height, 0, 0, this.el.width / scale, this.el.height / scale);
  }

  drawOption(option = {}) {
    var ctx = this.context();

    Object.assign(ctx, option);
  }

  drawLine(x1, y1, x2, y2) {
    var ctx = this.context();

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }

  drawPath(...path) {
    var ctx = this.context();

    ctx.beginPath();

    path.forEach((p, index) => {
      if (index == 0) {
        ctx.moveTo(p[0], p[1]);
      } else {
        ctx.lineTo(p[0], p[1]);
      }
    });
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  drawCircle(cx, cy, r) {
    var ctx = this.context();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  drawText(x, y, text) {
    this.context().fillText(text, x, y);
  }

  /* utility */ 
  fullscreen () {
    var element = this.el; 
    
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.wekitRequestFullscreen) {
      element.wekitRequestFullscreen();
    }
  }
}

const scrollBlockingEvents = {
    'touchstart': true,
    'touchmove': true,
    'mousedown': true,
    'mouseup': true,
    'mousemove': true, 
    'wheel': true,
    'mousewheel': true
};

class DomEventHandler extends BaseHandler {


    initialize() {
        this.destroy();

        if (!this._domEvents) {
          this._domEvents = this.filterProps(CHECK_DOM_EVENT_PATTERN);
        }
        this._domEvents.forEach(key => this.parseEvent(key));
    }

    destroy() {
        this.removeEventAll();
    }


    removeEventAll() {
        this.getBindings().forEach(obj => {
          this.removeEvent(obj);
        });
        this.initBindings();
    }

    removeEvent({ eventName, dom, callback }) {
        Event.removeEvent(dom, eventName, callback);
    }    

    getBindings() {
        if (!this._bindings) {
          this.initBindings();
        }
    
        return this._bindings;
    }

    addBinding(obj) {
        this.getBindings().push(obj);
    }

    initBindings() {
        this._bindings = [];
    }    


    matchPath (el, selector) {
        if (el) {
          if (el.matches(selector)) {
            return el;
          }
          return this.matchPath(el.parentElement, selector);
        }
        return null;
    }
      
    hasDelegate (e, eventObject) {
        return this.matchPath(e.target || e.srcElement, eventObject.delegate);
    }
      
    makeCallback (eventObject, callback) {
        if (eventObject.delegate) {
          return this.makeDelegateCallback(eventObject, callback);
        } else {
          return this.makeDefaultCallback(eventObject, callback);
        }
    }
      
    makeDefaultCallback (eventObject, callback) {
        return e => {
          var returnValue = this.runEventCallback(e, eventObject, callback);
          if (isNotUndefined(returnValue)) {
            return returnValue;
          }
        };
    }
      
    makeDelegateCallback (eventObject, callback) {
        return e => {
          const delegateTarget = this.hasDelegate(e, eventObject);
      
          if (delegateTarget) {
            // delegate target 이 있는 경우만 callback 실행
            e.$dt = Dom.create(delegateTarget);      
      
            var returnValue = this.runEventCallback(e, eventObject, callback);
            if (isNotUndefined(returnValue)) {
              return returnValue;
            }
          }
        };
    }
      
    runEventCallback (e, eventObject, callback) {
        const context = this.context;
        e.xy = Event.posXY(e);
      
        if (eventObject.beforeMethods.length) {
          eventObject.beforeMethods.every(before => {
            return context[before.target].call(context, e, before.param);
          });
        }
      
        if (this.checkEventType(e, eventObject)) {
          var returnValue = callback(e, e.$dt, e.xy);
      
          if (returnValue !== false && eventObject.afterMethods.length) {
            eventObject.afterMethods.forEach(after =>
              context[after.target].call(context, e, after.param)
            );
          }
      
          return returnValue;
        }
    }
      
    checkEventType (e, eventObject) {
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
      
    getDefaultDomElement(dom) {
        const context = this.context;
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
    };
      
    getDefaultEventObject (eventName, checkMethodFilters) {
        const context = this.context;
        let arr = checkMethodFilters;
      
        // context 에 속한 변수나 메소드 리스트 체크
        const checkMethodList = arr.filter(code => !!context[code]);
      
        // 이벤트 정의 시점에 적용 되어야 하는 것들은 모두 method() 화 해서 정의한다.
        const [afters, afterMethods] = this.splitMethodByKeyword(arr, "after");
        const [befores, beforeMethods] = this.splitMethodByKeyword(arr, "before");
        const [debounces, debounceMethods] = this.splitMethodByKeyword(arr, "debounce");
        const [throttles, throttleMethods] = this.splitMethodByKeyword(arr, "throttle");
        const [captures] = this.splitMethodByKeyword(arr, "capture");
      
        // 위의 5개 필터 이외에 있는 코드들은 keycode 로 인식한다.
        const filteredList = [
          ...checkMethodList,
          ...afters,
          ...befores,
          ...debounces,
          ...throttles,
          ...captures
        ];
      
        var codes = arr
          .filter(code => filteredList.indexOf(code) === -1)
          .map(code => code.toLowerCase());
      
        return {
          eventName,
          codes,
          captures,
          afterMethods,
          beforeMethods,
          debounceMethods,
          throttleMethods,
          checkMethodList
        };
    }
      
      
    addEvent (eventObject, callback) {
        eventObject.callback = this.makeCallback(eventObject, callback);
        this.addBinding(eventObject);
      
        var options = !!eventObject.captures.length;
      
        if (scrollBlockingEvents[eventObject.eventName]) {
          options = {
            passive: true,
            capture: options  
          };
        }
      
        Event.addEvent(
          eventObject.dom,
          eventObject.eventName,
          eventObject.callback,
          options
        );
    }
      
    bindingEvent ( [eventName, dom, ...delegate], checkMethodFilters, callback ) {
        const context = this.context;
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
      
        this.addEvent(eventObject, callback);
      };
      
    getEventNames (eventName) {
        let results = [];
        
        eventName.split(NAME_SAPARATOR).forEach(e => {
            var arr = e.split(NAME_SAPARATOR);
        
            results.push(...arr);
        });
        
        return results;
    }
      
    parseEvent (key) {
        const context = this.context;
        let checkMethodFilters = key.split(CHECK_SAPARATOR).map(it => it.trim());
        
        var prefix = checkMethodFilters.shift();
        var eventSelectorAndBehave = prefix.split(DOM_EVENT_SAPARATOR)[1];
        
        var arr = eventSelectorAndBehave.split(SAPARATOR);
        var eventNames = this.getEventNames(arr[0]);
        var callback = context[key].bind(context);
        
        eventNames.forEach(eventName => {
            arr[0] = eventName;
            this.bindingEvent(arr, checkMethodFilters, callback);
        });
    }  
}

const applyElementAttribute = ($element, key, value) => {

  if (key === 'cssText') {
    /**
     * cssText: 'position:absolute'
     */
    $element.cssText(value);
    return; 
  } else if (key === "style") {
    /**
     * style: { key: value }
     */
    if (isNotString(value)) {
      $element.css(value);
    }

    return;
  } else if (key === "class") {
    //  "class" : [ 'className', 'className' ] 
    //  "class" : { key: true, key: false } 
    //  "class" : 'string-class' 

    if (isArray(value)) {
      $element.addClass(...value);
    } else if (isObject(value)) {
      keyEach(value, (className, hasClass) => $element.toggleClass(className, hasClass));
    } else {
      $element.addClass(value);
    }

    return;
  }

  if (isUndefined(value)) {
    $element.removeAttr(key);
  } else {
    if ($element.el.nodeName === "TEXTAREA" && key === "value") {
      $element.text(value);
    } else if (key === 'text' || key === 'textContent') {
      $element.text(value);
    } else if (key === 'innerHTML' || key === 'html') {
      $element.html(value);
    } else if (key === 'value') {
      $element.val(value);
    } else {
      $element.attr(key, value);
    }
  }
};

class BindHandler extends BaseHandler {

    load (...args) {
      this.bindData(...args);
    }

    // 어떻게 실행하는게 좋을까? 
    // this.runHandle('bind', ...);
    bindData (...args) {
      if (!this._bindMethods) {
        this._bindMethods = this.filterProps(CHECK_BIND_PATTERN);
      }
      /**
       * BIND 를 해보자.
       * 이시점에 하는게 맞는지는 모르겠지만 일단은 해보자.
       * BIND 는 특정 element 에 html 이 아닌 데이타를 업데이트하기 위한 간단한 로직이다.
       */
      this._bindMethods
        .filter(originalCallbackName => {
          if (!args.length) return true; 
          var [callbackName, id] = originalCallbackName.split(CHECK_SAPARATOR);        
  
          var [_, $bind] = callbackName.split(' ');
  
          return args.indexOf($bind) >  -1 
        })
        .forEach(callbackName => {
          const bindMethod = this.context[callbackName];
          var [callbackName, id] = callbackName.split(CHECK_SAPARATOR);
  
          const refObject = this.getRef(id);
          let refCallback = BIND_CHECK_DEFAULT_FUNCTION;
  
          if (refObject != '' && isString(refObject)) {
            refCallback = BIND_CHECK_FUNCTION(refObject);
          } else if (isFunction(refObject)) {
            refCallback = refObject;
          }
  
          const elName = callbackName.split(BIND_SAPARATOR)[1];
          let $element = this.context.refs[elName];
  
          // isBindCheck 는 binding 하기 전에 변화된 지점을 찾아서 업데이트를 제한한다.
          const isBindCheck = isFunction(refCallback) && refCallback.call(this.context);
          if ($element && isBindCheck) {
            const results = bindMethod.call(this.context, ...args);

            if (!results) return;
  
            keyEach(results, (key, value) => {
              applyElementAttribute($element, key, value);
            });
          }
        });
    }    

    destroy() {
      this._bindMethods = undefined;
    }


}

const ADD_BODY_MOUSEMOVE = 'add/body/mousemove';
const ADD_BODY_MOUSEUP = 'add/body/mouseup';

const REFERENCE_PROPERTY = "ref";
const TEMP_DIV = Dom.create("div");
const QUERY_PROPERTY = `[${REFERENCE_PROPERTY}]`;

const splitMethodByKeyword = (arr, keyword) => {
  var filterKeys = arr.filter(code => code.indexOf(`${keyword}(`) > -1);
  var filterMaps = filterKeys.map(code => {
    var [target, param] = code
      .split(`${keyword}(`)[1]
      .split(")")[0]
      .trim()
      .split(" ");

    return { target, param };
  });

  return [filterKeys, filterMaps];
};

// collectProps 에서 제외될 메소드 목록 
const expectMethod$1 = {
  "constructor": true,
  "initState": true,
  "refresh": true,
  "updateData": true,
  "constructor": true,
  "initializeProperty": true,
  "created": true,
  "getRealEventName": true,
  "initializeStoreEvent": true,
  "destoryStoreEvent": true,
  "destroy": true,
  "emit": true,
  "trigger": true,
  "on": true,
  "off": true,
  "setState": true,
  "_reload": true,
  "render": true,
  "initialize": true,
  "afterRender": true,
  "components": true,
  "getRef": true,
  "parseTemplate": true,
  "childrenIds": true,
  "exists": true,
  "parseProperty": true,
  "parseSourceName": true,
  "parseComponent": true,
  "clean": true,
  "refresh": true,
  "loadTemplate": true,
  "load": true,
  "bindData": true,
  "template": true,
  "eachChildren": true,
  "initializeEvent": true,
  "destroy": true,
  "collectProps": true,
  "filterProps": true,
  "self": true,
  "isAltKey": true,
  "isCtrlKey": true,
  "isShiftKey": true,
  "isMetaKey": true,
  "preventDefault": true,
  "stopPropagation": true,
  "bodyMouseMove": true,
  "bodyMouseUp": true,
};

class EventMachine {
  constructor(opt, props) {
    this.state = {};
    this.prevState = {};
    this.refs = {};
    this.children = {};
    this._bindings = [];
    this.id = uuid();    
    this.handlers = this.initializeHandler();

    this.initializeProperty(opt, props);

    this.initComponents();
  }

  initComponents() {
    this.childComponents = this.components();
    this.childComponentKeys = Object.keys(this.childComponents);
    this.childComponentSet = new Map();
    this.childComponentKeys.forEach(key => {
      this.childComponentSet.set(key.toLowerCase(), key);
    });
    this.childComponentKeysString = [...this.childComponentSet.keys()].join(',');
  }

  initializeHandler () {
    return [
      new BindHandler(this),
      new DomEventHandler(this)
    ]
  }

  initState() {
    return {};
  }

  setState(state = {}, isLoad = true) {
    this.prevState = this.state;
    this.state = Object.assign({}, this.state, state );
    if (isLoad) {
      this.load();
    }
  }

  _reload(props) {
    this.props = props;
    this.state = {}; 
    this.setState(this.initState(), false);
    this.refresh(true);
  }

  render($container) {
    this.$el = this.parseTemplate(this.template());
    this.refs.$el = this.$el;

    if ($container) {
      $container.append(this.$el);
    }

    this.load();

    this.afterRender();
  }

  initialize() {
    this.state = this.initState();
  }
  afterRender() {}
  components() {
    return {};
  }

  getRef(...args) {
    const key = args.join('');
    return this.refs[key];
  }

  parseTemplate(htmlString, isLoad) {

    if (isArray(htmlString)) {
      htmlString = htmlString.join('');
    }

    const list = TEMP_DIV.html(html`${htmlString}`).children();

    list.forEach($el => {
      var ref = $el.attr(REFERENCE_PROPERTY);
      if (ref) {
        this.refs[ref] = $el;
      }

      var refs = $el.$$(QUERY_PROPERTY);
      var temp = {}; 
      refs.forEach($dom => {

        const name = $dom.attr(REFERENCE_PROPERTY);
        if (temp[name]) {
          console.warn(`${ref} is duplicated. - ${this.sourceName}`, this);
        } else {
          temp[name] = true; 
        }

        this.refs[name] = $dom;        
      });


    });

    if (!isLoad) {
      return list[0];
    }

    return TEMP_DIV.createChildrenFragment();
  }

  childrenIds() {
    return  keyMap(this.children, (key, obj) => {
      return obj.id;
    })
  }

  exists () {

    if (this.parent) {
      if (isFunction(this.parent.childrenIds)) {
        return this.parent.childrenIds().indexOf(this.id) > -1 
      }
    }

    return true  
  }

  parseProperty ($dom) {
    let props = {};

    // parse properties 
    for(var t of $dom.el.attributes) {
      props[t.nodeName] = t.nodeValue;
    }

    $dom.$$('property').forEach($p => {
      const [name, value, type] = $p.attrs('name', 'value', 'type');

      let realValue = value || $p.text();

      if (type === 'json') {            
        realValue = JSON.parse(realValue);
      }
    
      props[name] = realValue; 
    });

    return props;
  }

  parseSourceName(obj) {

    if (obj.parent) {
      return [obj.sourceName, ...this.parseSourceName(obj.parent)]
    }

    return [obj.sourceName]
  }

  parseComponent() {
    const $el = this.$el;

    let targets = []; 
    if (this.childComponentKeysString) {
      targets = $el.$$(this.childComponentKeysString);
    }

    
    targets.forEach($dom => {
      var tagName = $dom.el.tagName.toLowerCase();
      var ComponentName = this.childComponentSet.get(tagName);
      var Component = this.childComponents[ComponentName];
      let props = this.parseProperty($dom);

      // create component 
      let refName = $dom.attr(REFERENCE_PROPERTY);
      var instance = null; 
      if (this.children[refName]) {
        instance = this.children[refName]; 
        instance._reload(props);
      } else {
        instance = new Component(this, props);

        this.children[refName || instance.id] = instance;

        instance.render();
      }
      
      $dom.replace(instance.$el);      
  
    });

    keyEach(this.children, (key, obj) => {
      if (obj && obj.clean()) {
        delete this.children[key];
      }
    });
  }

  clean () {
    if (this.$el && !this.$el.hasParent()) {

      keyEach(this.children, (key, child) => {
        child.clean();
      });

      this.destroy();  

      this.$el = null;
      return true; 
    }
  }

  /**
   * refresh 는 load 함수들을 실행한다. 
   */
  refresh() {
    this.load();
  }

  /**
   * 특정 load 함수를 실행한다.  문자열을 그대로 return 한다. 
   * @param  {...any} args 
   */
  loadTemplate (...args) {
    return this[LOAD(args.join(''))].call(this)
  }

  load(...args) {
    if (!this._loadMethods) {
      this._loadMethods = this.filterProps(CHECK_LOAD_PATTERN);
    }

    this._loadMethods
    .filter(callbackName => {
      const elName = callbackName.split(LOAD_SAPARATOR)[1].split(CHECK_SAPARATOR)[0];
      if (!args.length) return true; 
      return args.indexOf(elName) > -1
    })
    .forEach(callbackName => {
      let methodName = callbackName.split(LOAD_SAPARATOR)[1];
      var [elName, ...checker] = methodName.split(CHECK_SAPARATOR).map(it => it.trim());

      checker = checker.map(it => it.trim());
      
      const isVdom = Boolean(checker.filter(it => VDOM.includes(it)).length);

      if (this.refs[elName]) {
        
        var newTemplate = this[callbackName].call(this, ...args);

        // create fragment 
        const fragment = this.parseTemplate(newTemplate, true);
        if (isVdom) {
          this.refs[elName].htmlDiff(fragment);
        } else {
          this.refs[elName].html(fragment);
        }

      }
    });

    this.runHandlers('initialize');

    this.bindData();

    this.parseComponent();

  }

  runHandlers(func = 'run', ...args) {
    this.handlers.forEach(h => h[func](...args));
  }

  bindData (...args) {
    this.runHandlers('load', ...args);
  }

  // 기본 템플릿 지정
  template() {
    return `<div></div>`;
  }

  eachChildren(callback) {
    if (!isFunction(callback)) return;

    keyEach(this.children, (_, Component) => {
      callback(Component);
    });
  }

  rerender () {
    var $parent = this.$el.parent();
    this.destroy();
    this.render($parent);  
  }

  /**
   * @deprecated 
   * render 이후에 부를려고 했는데  이미 Dom Event 는 render 이후에 자동으로 불리게 되어 있다. 
   * 현재는 DomEvent, Bind 기준으로만 작성하도록 한다. 
   * 나머지 라이프 사이클은 다음에 고민해보자. 
   * 이벤트를 초기화한다.
   */
  // initializeEvent() {
  //   this.runHandlers('initialize');
  // }

  /**
   * 자원을 해제한다.
   * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다.
   */
  destroy() {
    this.eachChildren(childComponent => {
      childComponent.destroy();
    });

    this.runHandlers('destroy');
    this.$el.remove();
    this.$el = null; 
    this.refs = {}; 
    this.children = {}; 
  }

  /**
   * property 수집하기
   * 상위 클래스의 모든 property 를 수집해서 리턴한다.
   */
  collectProps() {

    var p = this.__proto__;
    var results = [];
    do {
      var isObject = p instanceof Object;

      if (isObject === false) {
        break;
      }
      const names = Object.getOwnPropertyNames(p).filter(name => {
        return this && isFunction(this[name]) && !expectMethod$1[name];
      });

      results.push(...names);
      p = p.__proto__;
    } while (p);

    return results;
  }

  filterProps(pattern) {
    return this.collectProps().filter(key => {
      return key.match(pattern);
    });
  }

  /* magic check method  */

  self(e) {
    return e && e.$dt && e.$dt.is(e.target);
  }
  isAltKey(e) {
    return e.altKey;
  }
  isCtrlKey(e) {
    return e.ctrlKey;
  }
  isShiftKey(e) {
    return e.shiftKey;
  }
  isMetaKey(e) {
    return e.metaKey || e.key == 'Meta' || e.code.indexOf('Meta') > -1 ;
  }

  /** before check method */

  /* after check method */

  preventDefault(e) {
    e.preventDefault();
    return true;
  }

  stopPropagation(e) {
    e.stopPropagation();
    return true;
  }

  bodyMouseMove(e, methodName) {
    if (this[methodName]) {
      this.emit(ADD_BODY_MOUSEMOVE, this[methodName], this, e.xy);
    }
  }

  bodyMouseUp(e, methodName) {
    if (this[methodName]) {
      this.emit(ADD_BODY_MOUSEUP, this[methodName], this, e.xy);
    }
  }

}

const REG_STORE_MULTI_PATTERN = /^ME@/;

const MULTI_PREFIX = "ME@";
const SPLITTER = "|";

const PIPE = (...args) => {
  return args.join(SPLITTER);
};

const EVENT = (...args) => {
  return MULTI_PREFIX + PIPE(...args);
};

class UIElement extends EventMachine {
  constructor(opt, props = {}) {
    super(opt, props);

    this.created();

    this.initialize();

    this.initializeStoreEvent();

  }

  /**
   * UIElement instance 에 필요한 기본 속성 설정 
   */
  initializeProperty (opt, props = {}) {

    this.opt = opt || {};
    this.parent = this.opt;
    this.props = props;
    this.source = uuid();
    this.sourceName = this.constructor.name;

    if (opt && opt.$store) this.$store = opt.$store;
    if (opt && opt.$app) this.$app = opt.$app;
  }

  created() {}

  getRealEventName(e, s = MULTI_PREFIX) {
    var startIndex = e.indexOf(s);
    return e.substr(startIndex < 0 ? 0 : startIndex + s.length);
  }

  /**
   * initialize store event
   *
   * you can define '@xxx' method(event) in UIElement
   *
   *
   */
  initializeStoreEvent() {

    this.filterProps(REG_STORE_MULTI_PATTERN).forEach(key => {
      const events = this.getRealEventName(key, MULTI_PREFIX);

      // support deboounce for store event 
      var [methods, params] = splitMethodByKeyword(events.split(SPLITTER), 'debounce');

      var debounceSecond = 0; 
      if (methods.length) {
        debounceSecond = +params[0].target || 0; 
      }

      events
        .split(SPLITTER)
        .filter(it => {
          return methods.indexOf(it) === -1
        })
        .map(it => it.trim())
        .forEach(e => {
          var callback = this[key].bind(this);
          callback.displayName = `${this.sourceName}.${e}`;
          callback.source = this.source;
          this.$store.on(e, callback, this, debounceSecond);
      });
    });
  }

  destoryStoreEvent() {
    this.$store.offAll(this);
  }

  destroy () {
    super.destroy();

    this.destoryStoreEvent();
  }

  rerender() {
    super.rerender();

    this.initialize();

    this.initializeStoreEvent();
  }


  emit($1, $2, $3, $4, $5) {
    this.$store.source = this.source;
    this.$store.sourceContext = this; 
    this.$store.emit($1, $2, $3, $4, $5);
  }

  trigger($1, $2, $3, $4, $5) {
    this.$store.source = this.source;
    this.$store.trigger($1, $2, $3, $4, $5);
  }

  on (message, callback) {
    this.$store.on(message, callback);
  }

  off (message, callback) {
    this.$store.off(message, callback);
  }
}

const EMPTY_POS = { x: 0, y: 0 };
const DEFAULT_POS = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
const MOVE_CHECK_MS = 0;

const start = opt => {
  class App extends UIElement {

    initialize() {

      this.$store = new BaseStore();
      this.$app = this; 

      this.$container = Dom.create(this.getContainer());
      this.$container.addClass(this.getClassName());

      this.render(this.$container);

      this.initBodyMoves();
    }

    initState () {
      return {
        pos: {},
        oldPos: {}
      }
    }

    initBodyMoves() {
      this.moves = new Set();
      this.ends = new Set();

      this.modifyBodyMoveSecond(MOVE_CHECK_MS);
    }

    modifyBodyMoveSecond(ms = MOVE_CHECK_MS) {
      this.funcBodyMoves = debounce(this.loopBodyMoves.bind(this), ms);
    }

    loopBodyMoves() {
      var {bodyEvent, pos, lastPos} = this.state;

      var localLastPos = lastPos || DEFAULT_POS;
      var isNotEqualLastPos = !(localLastPos.x === pos.x && localLastPos.y === pos.y);

      if (isNotEqualLastPos && this.moves.size) {
        this.moves.forEach(v => {
          var dx = pos.x - v.xy.x;
          var dy = pos.y - v.xy.y;
          if (dx != 0 || dy != 0) {
            v.func.call(v.context, dx, dy, 'move', bodyEvent.pressure);
          }
        });

        this.state.lastPos = pos;
      }
      requestAnimationFrame(this.funcBodyMoves);
    }

    removeBodyMoves() {
      var {pos, bodyEvent} = this.state;       
      if (pos) {
        this.ends.forEach(v => {
          v.func.call(v.context, pos.x - v.xy.x, pos.y - v.xy.y, 'end', bodyEvent.pressure);
        });
      }

      this.moves.clear();
      this.ends.clear();
    }

    [EVENT(ADD_BODY_MOUSEMOVE)](func, context, xy) {
      this.moves.add({ func, context, xy });
    }

    [EVENT(ADD_BODY_MOUSEUP)](func, context, xy) {
      this.ends.add({ func, context, xy });
    }

    getClassName() {
      return opt.className || "sapa";
    }

    getContainer() {
      return opt.container || document.body;
    }

    template() {
      return `${opt.template}`
    }

    components() {
      return opt.components || {};
    }

    [POINTERMOVE("document")](e) {
      var oldPos = this.state.pos || EMPTY_POS;      
      if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'SELECT' || e.target.nodeName === 'TEXTAREA') return; 
      var newPos = e.xy || EMPTY_POS;

      this.setState({bodyEvent : e, pos: newPos, oldPos}, false);

      if (!this.requestId) {
        this.requestId = requestAnimationFrame(this.funcBodyMoves);
      }
    }

    [POINTEREND("document")](e) {
      var newPos = e.xy || EMPTY_POS;      
      if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'SELECT' || e.target.nodeName === 'TEXTAREA') return;       
      this.setState({bodyEvent : e, pos: newPos}, false);
      this.removeBodyMoves();
      this.requestId = null;
    }
  }

  return new App(opt);
};

var App = /*#__PURE__*/Object.freeze({
  __proto__: null,
  start: start
});

export { AFTER, ALT, ANIMATIONEND, ANIMATIONITERATION, ANIMATIONSTART, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, App, BEFORE, BIND, BIND_CHECK_DEFAULT_FUNCTION, BIND_CHECK_FUNCTION, BIND_SAPARATOR, BLUR, CAPTURE, CHANGE, CHANGEINPUT, CHECKER, CHECK_BIND_PATTERN, CHECK_DOM_EVENT_PATTERN, CHECK_LOAD_PATTERN, CHECK_SAPARATOR, CLICK, CONTEXTMENU, CONTROL, CUSTOM, D1000, DEBOUNCE, DOM_EVENT_SAPARATOR, DOUBLECLICK, DRAG, DRAGEND, DRAGENTER, DRAGEXIT, DRAGLEAVE, DRAGOUT, DRAGOVER, DRAGSTART, DROP, Dom, END, ENTER, ESCAPE, EVENT, FIT, FOCUS, FOCUSIN, FOCUSOUT, IF, INPUT, KEY, KEYDOWN, KEYPRESS, KEYUP, LOAD, LOAD_SAPARATOR, META, MOUSEDOWN, MOUSEENTER, MOUSELEAVE, MOUSEMOVE, MOUSEOUT, MOUSEOVER, MOUSEUP, MOVE, NAME_SAPARATOR, PASSIVE, PASTE, PIPE, POINTEREND, POINTERMOVE, POINTERSTART, PREVENT, RESIZE, SAPARATOR, SCROLL, SELF, SHIFT, SPACE, STOP, SUBMIT, THROTTLE, TOUCHEND, TOUCHMOVE, TOUCHSTART, TRANSITIONCANCEL, TRANSITIONEND, TRANSITIONRUN, TRANSITIONSTART, UIElement, VDOM, WHEEL, clone, createRef, debounce, getRef, html, isArray, isBoolean, isFunction, isNotString, isNotUndefined, isNumber, isObject, isString, isUndefined, keyEach, keyMap, makeEventChecker, throttle, uuid, uuidShort };
