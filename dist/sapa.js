(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.sapa = factory());
}(this, (function () { 'use strict';

  const MAGIC_METHOD = "@magic:";

  const makeEventChecker = (value, split = CHECK_SAPARATOR) => {
    return ` ${split} ${value}`;
  };

  // event name regular expression
  const CHECK_DOM_EVENT_PATTERN = /domevent (.*)/gi;
  const CHECK_LOAD_PATTERN = /load (.*)/gi;
  const CHECK_BIND_PATTERN = /bind (.*)/gi;
  const CHECK_SUBSCRIBE_PATTERN = /subscribe (.*)/gi;

  const SPLITTER = "|";

  const PIPE = (...args) => {
    return args.join(SPLITTER);
  };

  const NAME_SAPARATOR = ":";
  const CHECK_SAPARATOR = "|";
  const DOM_EVENT_SAPARATOR = `${MAGIC_METHOD}domevent `;
  const LOAD_SAPARATOR = `${MAGIC_METHOD}load `;
  const BIND_SAPARATOR = `${MAGIC_METHOD}bind `;
  const SUBSCRIBE_SAPARATOR = `${MAGIC_METHOD}subscribe `;

  const SAPARATOR = ' ';

  const refManager = {};

  const DOM_EVENT_MAKE = (...keys) => {
    var key = keys.join(NAME_SAPARATOR);
    return (...args) => {
      return DOM_EVENT_SAPARATOR + [key, ...args].join(SAPARATOR);
    };
  };

  const SUBSCRIBE_EVENT_MAKE = (...args) => {
    return SUBSCRIBE_SAPARATOR + args.join(CHECK_SAPARATOR);
  };


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
  const MOUSE = CHECKER("hasMouse");
  const TOUCH = CHECKER("hasTouch");
  const PEN = CHECKER("hasPen");
  const SELF = CHECKER("self");
  const LEFT_BUTTON = CHECKER("isMouseLeftButton");
  const RIGHT_BUTTON = CHECKER("isMouseRightButton");

  const FIT = CHECKER("fit");
  const PASSIVE = CHECKER("passive");
  const DOMDIFF = CHECKER('domdiff');

  // event config method
  const DEBOUNCE = (t = 100) => {
    return CHECKER(`debounce(${t})`);
  };

  const DELAY = (t = 300) => {
    return CHECKER(`delay(${t})`);
  };

  const D1000 = DEBOUNCE(1000);

  const THROTTLE = (t = 100) => {
    return CHECKER(`throttle(${t})`);
  };
  const ALL_TRIGGER = CHECKER("allTrigger()");
  const SELF_TRIGGER = CHECKER("selfTrigger()");

  const CAPTURE = CHECKER("capture()");

  // event config method

  // before method

  // after method
  const PREVENT = AFTER(`preventDefault`);
  const STOP = AFTER(`stopPropagation`);

  const SUBSCRIBE = SUBSCRIBE_EVENT_MAKE;
  const SUBSCRIBE_ALL = (...args) => SUBSCRIBE_EVENT_MAKE(...args, ALL_TRIGGER);
  const SUBSCRIBE_SELF = (...args) => SUBSCRIBE_EVENT_MAKE(...args, SELF_TRIGGER);
  const CONFIG = (config, ...args) => SUBSCRIBE_EVENT_MAKE(`config:${config}`, ...args);
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

  // pointerstart 의 경우 drag 를 위한 시작점이기 때문에  left button 만 허용한다. 
  // context 메뉴나 wheel 은 허용하지 않는다. 
  const POINTERSTART = (...args) => {
    return (CUSTOM("pointerdown")(...args) + LEFT_BUTTON);
  };
  // 

  const POINTEROVER = CUSTOM("pointerover");
  const POINTERENTER = CUSTOM("pointerenter");
  const POINTEROUT = CUSTOM("pointerout");
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
  const DOUBLETAB = CUSTOM('doubletab');


  // Predefined LOADER
  const LOAD = (value = "$el") => {
    return LOAD_SAPARATOR + value;
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

  const BIND = (value = "$el") => {
    return (
      BIND_SAPARATOR + value
    );
  };

  function normalizeWheelEvent (e) {
    let dx = e.deltaX;
    let dy = e.deltaY;


    if (dx === 0 && e.shiftKey) {
      [dy, dx] = [dx, dy];
    }  

    if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) {
      dy *= 8;
    } else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      dy *= 24; 
    }


    return [
      limit(dx, 24), 
      limit(dy, 24), 
      0
    ]
  }

  function limit (delta, maxDelta) {
    return Math.sign(delta) * Math.min( maxDelta, Math.abs(delta))
  }

  var Event = {
    addDomEvent(dom, eventName, callback, useCapture = false) {
      if (dom) {
        dom.addEventListener(eventName, callback, useCapture);
      }
    },

    removeDomEvent(dom, eventName, callback) {
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

  var EventFunctions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MAGIC_METHOD: MAGIC_METHOD,
    makeEventChecker: makeEventChecker,
    CHECK_DOM_EVENT_PATTERN: CHECK_DOM_EVENT_PATTERN,
    CHECK_LOAD_PATTERN: CHECK_LOAD_PATTERN,
    CHECK_BIND_PATTERN: CHECK_BIND_PATTERN,
    CHECK_SUBSCRIBE_PATTERN: CHECK_SUBSCRIBE_PATTERN,
    PIPE: PIPE,
    NAME_SAPARATOR: NAME_SAPARATOR,
    CHECK_SAPARATOR: CHECK_SAPARATOR,
    DOM_EVENT_SAPARATOR: DOM_EVENT_SAPARATOR,
    LOAD_SAPARATOR: LOAD_SAPARATOR,
    BIND_SAPARATOR: BIND_SAPARATOR,
    SUBSCRIBE_SAPARATOR: SUBSCRIBE_SAPARATOR,
    SAPARATOR: SAPARATOR,
    CHECKER: CHECKER,
    AFTER: AFTER,
    BEFORE: BEFORE,
    IF: IF,
    KEY: KEY,
    ARROW_UP: ARROW_UP,
    ARROW_DOWN: ARROW_DOWN,
    ARROW_LEFT: ARROW_LEFT,
    ARROW_RIGHT: ARROW_RIGHT,
    ENTER: ENTER,
    SPACE: SPACE,
    ESCAPE: ESCAPE,
    ALT: ALT,
    SHIFT: SHIFT,
    META: META,
    CONTROL: CONTROL,
    MOUSE: MOUSE,
    TOUCH: TOUCH,
    PEN: PEN,
    SELF: SELF,
    LEFT_BUTTON: LEFT_BUTTON,
    RIGHT_BUTTON: RIGHT_BUTTON,
    FIT: FIT,
    PASSIVE: PASSIVE,
    DOMDIFF: DOMDIFF,
    DEBOUNCE: DEBOUNCE,
    DELAY: DELAY,
    D1000: D1000,
    THROTTLE: THROTTLE,
    ALL_TRIGGER: ALL_TRIGGER,
    SELF_TRIGGER: SELF_TRIGGER,
    CAPTURE: CAPTURE,
    PREVENT: PREVENT,
    STOP: STOP,
    SUBSCRIBE: SUBSCRIBE,
    SUBSCRIBE_ALL: SUBSCRIBE_ALL,
    SUBSCRIBE_SELF: SUBSCRIBE_SELF,
    CONFIG: CONFIG,
    CUSTOM: CUSTOM,
    CLICK: CLICK,
    DOUBLECLICK: DOUBLECLICK,
    MOUSEDOWN: MOUSEDOWN,
    MOUSEUP: MOUSEUP,
    MOUSEMOVE: MOUSEMOVE,
    MOUSEOVER: MOUSEOVER,
    MOUSEOUT: MOUSEOUT,
    MOUSEENTER: MOUSEENTER,
    MOUSELEAVE: MOUSELEAVE,
    TOUCHSTART: TOUCHSTART,
    TOUCHMOVE: TOUCHMOVE,
    TOUCHEND: TOUCHEND,
    KEYDOWN: KEYDOWN,
    KEYUP: KEYUP,
    KEYPRESS: KEYPRESS,
    DRAG: DRAG,
    DRAGSTART: DRAGSTART,
    DROP: DROP,
    DRAGOVER: DRAGOVER,
    DRAGENTER: DRAGENTER,
    DRAGLEAVE: DRAGLEAVE,
    DRAGEXIT: DRAGEXIT,
    DRAGOUT: DRAGOUT,
    DRAGEND: DRAGEND,
    CONTEXTMENU: CONTEXTMENU,
    CHANGE: CHANGE,
    INPUT: INPUT,
    FOCUS: FOCUS,
    FOCUSIN: FOCUSIN,
    FOCUSOUT: FOCUSOUT,
    BLUR: BLUR,
    PASTE: PASTE,
    RESIZE: RESIZE,
    SCROLL: SCROLL,
    SUBMIT: SUBMIT,
    POINTERSTART: POINTERSTART,
    POINTEROVER: POINTEROVER,
    POINTERENTER: POINTERENTER,
    POINTEROUT: POINTEROUT,
    POINTERMOVE: POINTERMOVE,
    POINTEREND: POINTEREND,
    CHANGEINPUT: CHANGEINPUT,
    WHEEL: WHEEL,
    ANIMATIONSTART: ANIMATIONSTART,
    ANIMATIONEND: ANIMATIONEND,
    ANIMATIONITERATION: ANIMATIONITERATION,
    TRANSITIONSTART: TRANSITIONSTART,
    TRANSITIONEND: TRANSITIONEND,
    TRANSITIONRUN: TRANSITIONRUN,
    TRANSITIONCANCEL: TRANSITIONCANCEL,
    DOUBLETAB: DOUBLETAB,
    LOAD: LOAD,
    getRef: getRef,
    BIND_CHECK_FUNCTION: BIND_CHECK_FUNCTION,
    BIND_CHECK_DEFAULT_FUNCTION: BIND_CHECK_DEFAULT_FUNCTION,
    BIND: BIND,
    normalizeWheelEvent: normalizeWheelEvent,
    'default': Event
  });

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

      const keyList = [];
      keyList.push.apply(keyList, Object.keys(newProps));
      keyList.push.apply(keyList, Object.keys(oldProps));

      const props = [...new Set(keyList)];
    
      for(var i = 0, len = props.length; i < len; i++) {
          const key = props[i];
          updateProp(node, key, newProps[key], oldProps[key]);
      }
      // props.forEach((name) => {
      //   updateProp(node, name, newProps[name], oldProps[name]);
      // });
  };

  /**
   * TEXT_NODE 일 때   둘 다 공백일 때는  비교하지 않는다. 
   * 
   * @param {*} node1 
   * @param {*} node2 
   */
  function changed(node1, node2) {
      return (
          (node1.nodeType === Node.TEXT_NODE && node1.textContent !== node2.textContent) 
          || node1.nodeName !== node2.nodeName
      ) 
  }

  function hasPassed(node1) {
      return (
          (node1.nodeType !== Node.TEXT_NODE && node1.getAttribute('data-domdiff-pass') === 'true') 
      ) 
  }

  /**
   * refClass 속성을 가지고 있으면 기존 el 을 대체한다. 
   * 
   */ 
  function hasRefClass(node1) {
      return (
          (node1.nodeType !== Node.TEXT_NODE && (node1.getAttribute('refClass'))) 
      ) 
  }

  function getProps (attributes) {
      var results = {};
      const len = attributes.length;
      for(let i = 0; i < len; i++) {
          const t = attributes[i];
          results[t.name] = t.value;        
      }

      return results;
      
  }

  function updateElement (parentElement, oldEl, newEl, i) {

      if (!oldEl) {
          // console.log('replace');        
          parentElement.appendChild(newEl.cloneNode(true));
      } else if (!newEl) {
          // console.log('replace');        
          parentElement.removeChild(oldEl);
      } else if (hasPassed(oldEl) || hasPassed(newEl)) ; else if (changed(newEl, oldEl) || hasRefClass(newEl)) {
          // node 가 같지 않으면 바꾸고, refClass 속성이 있으면 바꾸고
          parentElement.replaceChild(newEl.cloneNode(true), oldEl);
      } else if (
          newEl.nodeType !== Node.TEXT_NODE 

          && newEl.nodeType !== Node.COMMENT_NODE
          && newEl.toString() !== "[object HTMLUnknownElement]"
      ) {
          // console.log(newEl);
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

  /**
   * Dom 유틸리티 
   * 
   */ 
  class Dom {
    constructor(tag, className, attr) {
      if (typeof tag !== 'string') {
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

    setAttr (obj) {
      Object.keys(obj).forEach(key => {
        this.attr(key, obj[key]);
      });
      return this;  
    }

    setAttrNS (obj, namespace = 'http://www.w3.org/2000/svg') {
      Object.keys(obj).forEach(key => {
        this.attr(key, obj[key], namespace);
      });
      return this;  
    }  

    setProp (obj) {
      Object.keys(obj).forEach(key => {
        // 동일한 값을 갱신하지 않는다. 
        if (this.el[key] != obj[key]) {
          this.el[key] = obj[key];
        }
      });
      return this;  
    }

    /**
     * data-xxx 속성을 관리한다. 
     * 
     * @param {string} key 
     * @param {any} value 
     */
    data (key, value) {
      if (arguments.length === 1) {
        return this.attr('data-' + key);
      } else if (arguments.length === 2) {
        return this.attr('data-' + key, value);
      }

      //TODO:  data 속성을 모두 {[key]: value} 형태로 리턴하기 

      return this; 
    }

    /**
     * Dom attribute 얻기 또는 설정 
     * 
     * get ->  Dom.create(targetElement).attr('key');
     * set -> Dom.create(targetElement).attr('key', value);
     * 
     * @param {string} key 
     * @param {[string]} value 
     */
    attr(key, value) {
      if (arguments.length == 1) {
        return this.el.getAttribute(key);
      }

      // 동일한 속성 값이 있다면 변경하지 않는다. 
      if (this.el.getAttribute(key) != value) {
        this.el.setAttribute(key, value);
      }

      return this;
    }

    attrNS(key, value, namespace = 'http://www.w3.org/2000/svg') {
      if (arguments.length == 1) {
        return this.el.getAttributeNS(namespace, key);
      }

      // 동일한 속성 값이 있다면 변경하지 않는다. 
      if (this.el.getAttributeNS(namespace, key) != value) {
        this.el.setAttributeNS(namespace, key, value);
      }

      return this;
    }  

    attrKeyValue(keyField) {
      return {
        [this.el.getAttribute(keyField)]: this.val()
      }
    }

    attrs(...args) {
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

    path() {

      if (!this.el) return [];

      const $parentNode = this.parent(); 

      if ($parentNode) {
        return [...$parentNode.path(), this]
      } else {
        return [this]
      }


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
      return this; 
    }

    html(html) {
      if (typeof html === 'undefined') {
        return this.el.innerHTML;
      }

      if (typeof html === 'string') {
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
      DomDiff(this, Dom.create(rootElement).html(`<svg>${html}</svg>`).firstChild.firstChild);
    }  

    find(selector) {
      return this.el.querySelector(selector);
    }

    $(selector) {
      var node = this.find(selector);
      return node ? Dom.create(node) : null;
    }

    findAll(selector) {
      return [...this.el.querySelectorAll(selector)];
    }

    $$(selector) {
      var arr = this.findAll(selector);
      return arr.map(node => Dom.create(node));
    }

    empty() {
      while (this.el.firstChild) this.el.removeChild(this.el.firstChild);
      return this;
    }

    append(el) {
      if (typeof el === 'string') {
        this.el.appendChild(document.createTextNode(el));
      } else {
        this.el.appendChild(el.el || el);
      }

      return this;
    }

    prepend(el) {
      if (typeof el === 'string') {
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

    appendHTML(html) {
      var $dom = Dom.create("div").html(html);

      this.append($dom.createChildrenFragment());

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

    /**
     * 
     * @param {string} value 
     * @returns {string} 파라미터가 없을 때  textContent 를 리턴한다. 
     */
    text(value) {
      if (typeof value === 'undefined') {
        return this.el.textContent;
      } else {
        var tempText = value;

        if (value instanceof Dom) {
          tempText = value.text();
        }

        // 값의 변경 사항이 없으면 업데이트 하지 않는다. 
        if (this.el.textContent !== tempText) {
          this.el.textContent = tempText;
        }

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
      if (typeof key !== 'undefined' && typeof value !== 'undefined') {
        if (key.indexOf('--') === 0 &&  typeof value !== 'undefined' ) {
          this.el.style.setProperty(key, value);
        } else {
          this.el.style[key] = value;
        }
      } else if (typeof key !== 'undefined') {
        if (typeof key === 'string') {
          return getComputedStyle(this.el)[key];  
        } else {
          Object.entries(key).forEach(([localKey, value]) => {
            if (localKey.indexOf('--') === 0 && typeof value !== 'undefined' ) {
              this.el.style.setProperty(localKey, value);
            } else {
              this.el.style[localKey] = value;
            }          
          });
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
      if (typeof value === 'undefined') {
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
      return this.css(key, `${value}px`);
    }

    rect() {
      return this.el.getBoundingClientRect();
    }

    bbox () {
      return this.el.getBBox();
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
      if (typeof value === 'undefined') {
        return this.el.value;
      } else if (typeof value !== 'undefined') {
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

    int() {
      return parseInt(this.val(), 10);
    }

    float() {
      return parseFloat(this.val());
    }

    show(displayType = "block") {
      this.el.style.display = displayType != "none" ? displayType : "block";

      return this; 
    }

    hide() {
      this.el.style.display = 'none';

      return this; 
    }

    isHide () {
      return this.el.style.display  === "none"
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
      // contenteditable 의 경우 selection api 를 사용해서 select() 를 수행한다.
      if (this.attr('contenteditable') === 'true') {
        var range = document.createRange();
        range.selectNodeContents(this.el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        this.el.select();
      }

      return this;
    }

    blur() {
      this.el.blur();

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
  }

  const identity = () => true; 

  /**
   * property 수집하기
   * 상위 클래스의 모든 property 를 수집해서 리턴한다.
   * 
   * @param {Object} root  상속관계에 있는 인스턴스 
   * @param {Object} expectMethod 제외될 필드 리스트 { [field]: true }
   * @returns {string[]} 나의 상위 모든 메소드를 수집해서 리턴한다. 
   */
  function collectProps(root, checkFunction = identity) {

      let p = root;
      let results = [];
      do {
          const isObject = p instanceof Object;

          if (isObject === false) {
              break;
          }

          const names = Object.getOwnPropertyNames(p).filter(name => {
              return root && isFunction(root[name]) && checkFunction(name);
          });

          results.push.apply(results, names);
      } while (p = Object.getPrototypeOf(p));


      return results;
  }

  function debounce(callback, delay = 0) {

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


  function throttle(callback, delay) {

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

  function ifCheck(callback, context, checkMethods) {
      return (...args) => {
          const ifResult = checkMethods.every(check => {
              return context[check.target].apply(context, args);
          });

          if (ifResult) {
              callback.apply(context, args);
          }
      }
  }

  function keyEach(obj, callback) {
      Object.keys(obj).forEach((key, index) => {
          callback(key, obj[key], index);
      });
  }

  function isUndefined(value) {
      return typeof value == 'undefined' || value === null;
  }

  function isNotUndefined(value) {
      return isUndefined(value) === false;
  }

  function isString(value) {
      return typeof value == 'string'
  }

  function isObject(value) {
      return typeof value == 'object' && !Array.isArray(value) && !isNumber(value) && !isString(value) && value !== null;
  }

  function isFunction(value) {
      return typeof value == 'function'
  }

  function isNumber(value) {
      return typeof value == 'number';
  }



  const short_tag_regexp = /\<(\w*)([^\>]*)\/\>/gim;

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

      var results = strings.map((it, index) => {

          var results = args[index] || '';

          if (isFunction(results)) {
              console.log(results);
              // results = results()
          }

          if (!Array.isArray(results)) {
              results = [results];
          }

          results = results.join('');

          return it + results;
      }).join('');

      results = results.replace(short_tag_regexp, function (match, p1) {
          if (HTML_TAG[p1.toLowerCase()]) {
              return match;
          } else {
              return match.replace('/>', `></${p1}>`)
          }
      });

      return results;
  };


  /**
   * 전체 문자열에서 특정 키워드 함수를 사용하는 패턴을 찾아 리턴해준다. 
   * 
   * @param {string[]} arr 
   * @param {string} keyword 
   */
  const splitMethodByKeyword = (arr, keyword) => {
      const filterKeys = arr.filter(code => code.indexOf(`${keyword}(`) > -1);
      const filterMaps = filterKeys.map(code => {
          const [target, param] = code
              .split(`${keyword}(`)[1]
              .split(")")[0]
              .trim()
              .split(" ");

          return { target, param };
      });

      return [filterKeys, filterMaps];
  };

  class BaseHandler {
      /**
       * 
       * @param {EventMachine} context 
       * @param {*} options 
       */
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

      run () {

      }

      destroy() {

      }
  }

  const scrollBlockingEvents = {
      'touchstart': true,
      'touchmove': true,
      'mousedown': true,
      'mouseup': true,
      'mousemove': true,
      // wheel, mousewheel 은 prevent 를 해야한다. 그래서 scroll blocking 을 막아야 한다. 
      // 'wheel': true,   
      // 'mousewheel': true
  };

  const eventConverts = {
    'doubletab': 'touchend'
  };

  const customEventNames = {
    'doubletab': true 
  };

  class DomEventHandler extends BaseHandler {


      initialize() {
          this.destroy();

          if (!this._domEvents) {
            this._domEvents = this.context.filterProps(CHECK_DOM_EVENT_PATTERN);
          }

          this._domEvents.forEach(key => this.parseDomEvent(key));
      }

      destroy() {
          this.removeEventAll();
      }


      removeEventAll() {
          this.getBindings().forEach(obj => {
            this.removeDomEvent(obj);
          });
          this.initBindings();
      }

      removeDomEvent({ eventName, dom, callback }) {
          Event.removeDomEvent(dom, eventName, callback);
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
              eventObject.afterMethods.forEach(after => {
                return context[after.target].call(context, e, after.param)
              });
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
        
      getRealEventName (eventName) {
        return eventConverts[eventName] || eventName;
      }

      getCustomEventName (eventName) {
        return customEventNames[eventName] ? eventName:  '';
      }

      /**
       * 
       * doubletab -> touchend 로 바뀜 
       * 
       * @param {string} eventName  이벤트 이름 
       * @param {array} checkMethodFilters 매직 필터 목록  
       */
      getDefaultEventObject (eventName, checkMethodFilters) {
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
        
        
      addDomEvent (eventObject, callback) {
          eventObject.callback = this.makeCallback(eventObject, callback);
          this.addBinding(eventObject);
        
          var options = !!eventObject.captures.length;
        
          if (scrollBlockingEvents[eventObject.eventName]) {
            options = {
              passive: true,
              capture: options  
            };
          }
        
          Event.addDomEvent(
            eventObject.dom,
            eventObject.eventName,
            eventObject.callback,
            options
          );
      }

      makeCustomEventCallback (eventObject, callback) {

        if (eventObject.customEventName === 'doubletab') {
          var delay = 300;
          
          if (eventObject.delayMethods.length) {
            delay = +eventObject.delayMethods[0].target;
          }
          return (...args) => {

            if (!this.doubleTab) {
              this.doubleTab = {
                  time: performance.now(),
              };
            } else {
              if (performance.now() - this.doubleTab.time < delay) {
                callback(...args);
              }

              this.doubleTab = null;
            }
          }

        } 

        return callback; 
      }
        
      bindingDomEvent ( [eventName, dom, ...delegate], checkMethodFilters, callback ) {
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
          callback = this.makeCustomEventCallback(eventObject, callback);
        
          this.addDomEvent(eventObject, callback);
      };
        
      getEventNames (eventName) {
          let results = [];
          
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
      parseDomEvent (key) {
          const context = this.context;
          let checkMethodFilters = key.split(CHECK_SAPARATOR).map(it => it.trim()).filter(Boolean);
          
          var prefix = checkMethodFilters.shift();
          var eventSelectorAndBehave = prefix.split(DOM_EVENT_SAPARATOR)[1];
          
          var arr = eventSelectorAndBehave.split(SAPARATOR);
          var eventNames = this.getEventNames(arr[0]);

          var callback = context[key].bind(context);
          
          for(let i = 0, len = eventNames.length; i< len; i++) {
            arr[0] = eventNames[i];
            this.bindingDomEvent(arr, checkMethodFilters, callback);
          }
      }  
  }

  /**
   * 
   * @param {Dom} $element 
   * @param {string} key 
   * @param {any} value 
   */
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
      if (typeof(value) !== 'string') {
        $element.css(value);
      }

      return;
    } else if (key === "class") {
      //  "class" : [ 'className', 'className' ] 
      //  "class" : { key: true, key: false } 
      //  "class" : 'string-class' 

      if (Array.isArray(value)) {
        $element.addClass(...value.filter(Boolean));
      } else if (isObject(value)) {
        const keys = Object.keys(value);
        for(var i = 0, len = keys.length; i < len; i++) {
          const className = keys[i];
          const hasClass = value[className];

          $element.toggleClass(className, hasClass);
        }
      } else {
        $element.el.className  = value;
      }

      return;
    } else if (key === 'callback') {
      if (typeof value === 'function') {
        value ();
        return; 
      }
    }

    if (typeof value === 'undefined') {
      $element.removeAttr(key);
    } else {
      if ($element.el.nodeName === "TEXTAREA" && key === "value") {
        $element.text(value);
      } else if (key === 'text' || key === 'textContent') {
        $element.text(value);
      } else if (key === 'innerHTML' || key === 'html') {
        $element.html(value);
      } else if (key === 'htmlDiff') {
        $element.updateDiff(value);
      } else if (key === 'svgDiff') {
        $element.updateSVGDiff(value);
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
          this._bindMethods = this.context.filterProps(CHECK_BIND_PATTERN);
        }
        /**
         * BIND 를 해보자.
         * 이시점에 하는게 맞는지는 모르겠지만 일단은 해보자.
         * BIND 는 특정 element 에 html 이 아닌 데이타를 업데이트하기 위한 간단한 로직이다.
         */
        const bindList = this._bindMethods
          .filter(originalCallbackName => {
            if (!args.length) return true; 
            var [callbackName, id] = originalCallbackName.split(CHECK_SAPARATOR);        
    
            var [_, $bind] = callbackName.split(' ');
    
            return args.indexOf($bind) >  -1 
          });

          bindList.forEach(async (callbackName) => {
            const bindMethod = this.context[callbackName];
            var [callbackName, id] = callbackName.split(CHECK_SAPARATOR);
    
            const refObject = this.getRef(id);
            let refCallback = BIND_CHECK_DEFAULT_FUNCTION;
    
            if (refObject != '' && typeof(refObject) === 'string') {
              refCallback = BIND_CHECK_FUNCTION(refObject);
            } else if (typeof refObject === 'function') {
              refCallback = refObject;
            }
    
            const elName = callbackName.split(BIND_SAPARATOR)[1];
            let $element = this.context.refs[elName];
    
            // isBindCheck 는 binding 하기 전에 변화된 지점을 찾아서 업데이트를 제한한다.
            const isBindCheck = typeof(refCallback) === 'function' && refCallback.call(this.context);
            if ($element && isBindCheck) {
              const results = await bindMethod.call(this.context, ...args);

              if (!results) return;
    
              const keys = Object.keys(results);
              for(var elementKeyIndex = 0, len = keys.length; elementKeyIndex < len; elementKeyIndex++) {
                const key = keys[elementKeyIndex];
                const value = results[key];

                applyElementAttribute($element, key, value);
              }
            }
          });
      }    

      destroy() {
        this._bindMethods = undefined;
      }


  }

  const map = new Map();


  function registElement(classes = {}) {

      Object.keys(classes).forEach(key => {
          if (map.has(key)) {
              // console.warn(`${key} element is duplicated.`)
              return;
          } 

          map.set(key, classes[key]);
      });
  }

  function retriveElement(className) {
      return map.get(className);
  }

  const UUID_REG = /[xy]/g;

  function uuid() {
      var dt = new Date().getTime();
      var uuid = 'xxx12-xx-34xx'.replace(UUID_REG, function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
  }

  function uuidShort() {
      var dt = new Date().getTime();
      var uuid = 'idxxxxxxx'.replace(UUID_REG, function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
  }

  const REFERENCE_PROPERTY = "ref";
  const TEMP_DIV = Dom.create("div");
  const QUERY_PROPERTY = `[${REFERENCE_PROPERTY}]`;
  const REF_CLASS = 'refclass';
  const REF_CLASS_PROPERTY = `[${REF_CLASS}]`;
  const VARIABLE_SAPARATOR = "__ref__variable:";

  class EventMachine {
    constructor(opt, props) {
      this.state = {};
      this.prevState = {};
      this.refs = {};
      this.children = {};
      this._bindings = [];
      this.id = uuid();    
      this.__tempVariables = new Map();
      this.handlers = this.initializeHandler();

      this.initializeProperty(opt, props);

      this.initComponents();
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



    }

    initComponents() {
      this.childComponents = this.components(); 
    }

    initializeHandler () {
      return [
        new BindHandler(this),
        new DomEventHandler(this)
      ]
    }

    /**
     * state 를 초기화 한것을 리턴한다. 
     * 
     * @protected
     * @returns {Object} 
     */
    initState() {
      return {};
    }

    /**
     * state 를 변경한다. 
     * 
     * @param {Object} state  새로운 state 
     * @param {Boolean} isLoad  다시 로드 할 것인지 체크 , true 면 state 변경후 다시 로드 
     */
    setState(state = {}, isLoad = true) {
      this.prevState = this.state;
      this.state = Object.assign({}, this.state, state );
      if (isLoad) {
        this.load();
      }
    }

    /**
     * state 에 있는 key 필드의 값을 토글한다. 
     * Boolean 형태의 값만 동작한다. 
     * 
     * @param {string} key 
     * @param {Boolean} isLoad 
     */
    toggleState(key, isLoad = true) {
      this.setState({
        [key]: !(this.state[key])
      }, isLoad);
    }

    /**
     * props 를 넘길 때 해당 참조를 그대로 넘기기 위한 함수 
     * 
     * @param {any} value
     * @returns {string} 참조 id 생성 
     */ 
    variable(value) {
      const id = `${VARIABLE_SAPARATOR}${uuidShort()}`;

      this.__tempVariables.set(id, value);

      return id;
    }

    /**
     * 참조 id 를 가지고 있는 variable 을 복구한다. 
     * 
     * @param {string} id
     * @returns {any}
     */ 
    recoverVariable(id) {

      // console.log(id);
      if (isString(id) === false) {
        return id;
      }

      let value = id;

      if (this.__tempVariables.has(id)) {
        value = this.__tempVariables.get(id);

        this.__tempVariables.delete(id);
      }

      return value;
    }

    /**
     * 객체를 다시 그릴 때 사용한다. 
     * 
     * @param {*} props 
     * @protected
     */
    _reload(props) {
      this.props = props;
      this.state = {}; 
      this.setState(this.initState(), false);
      this.refresh(true);
    }

    /**
     * template 을 렌더링 한다. 
     * 
     * @param {Dom|undefined} $container  컴포넌트가 그려질 대상 
     */
    render($container) {
      this.$el = this.parseTemplate(
        html`
        ${this.template()}
      `
      );
      this.refs.$el = this.$el;

      if ($container) {
        $container.append(this.$el);
      }

      // LOAD 로 정의된 것들을 수행한다. 
      this.load();

      // render 이후에 실행될 콜백을 정의한다. 
      this.afterRender();
    }

    initialize() {
      this.state = this.initState();
    }

    /**
     * render 이후에 실행될 함수 
     * dom 이 실제로 생성된 이후에 수행할 작업들을 정의한다. 
     * 
     * @protected
     */
    afterRender() {}

    /**
     * 하위에 연결될 객체들을 정의한다 
     * 
     * @protected
     * @returns {Object}
     */
    components() {
      return {};
    }

    /**
     * ref 이름을 가진 Component 를 가지고 온다. 
     * 
     * @param  {any[]} args 
     * @returns {EventMachine}
     */
    getRef(...args) {
      const key = args.join('');
      return this.refs[key];
    }

    /**
     * template() 함수의 결과물을 파싱해서 dom element 를 생성한다. 
     * 
     * @param {string} html 
     * @param {Boolean} [isLoad=false] 
     */
    parseTemplate(html, isLoad) {

      //FIXME: html string, element 형태 모두 array 로 받을 수 있도록 해보자. 
      if (Array.isArray(html)) {
        html = html.join('');
      }

      html = html.trim();
      const list = TEMP_DIV.html(html).children();
      /////////////////////////////////

      for(var i = 0, len = list.length; i < len; i++) {
        const $el = list[i];

        var ref = $el.attr(REFERENCE_PROPERTY);
        if (ref) {
          this.refs[ref] = $el;
        }

        var refs = $el.$$(QUERY_PROPERTY);
        var temp = {}; 

        for(var refsIndex = 0, refsLen = refs.length; refsIndex < refsLen; refsIndex++) {
          const $dom = refs[refsIndex];

          const name = $dom.attr(REFERENCE_PROPERTY);
          if (temp[name]) {
            console.warn(`${ref} is duplicated. - ${this.sourceName}`, this);
          } else {
            temp[name] = true; 
          }

          this.refs[name] = $dom;             
        }
      }

      if (!isLoad) {
        return list[0];
      }

      return TEMP_DIV.createChildrenFragment();
    }

    parseProperty ($dom) {
      let props = {};

      // parse properties 
      for(var t of $dom.el.attributes) {
        props[t.nodeName] = this.recoverVariable(t.nodeValue);
      }

      if (props['props']) {
        props = {
          ...props,
          ...getRef(props['props'])
        };
      }

      $dom.$$('property').forEach($p => {
        const [name, value, valueType] = $p.attrs('name', 'value', 'valueType');

        let realValue = value || $p.text();

        if (valueType === 'json') {          
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

    getEventMachineComponent (refClassName) {
      var EventMachineComponent = retriveElement(refClassName) || this.childComponents[refClassName];

      return EventMachineComponent;
    }

    parseComponent() {
      const $el = this.$el;

      let targets = $el.$$(REF_CLASS_PROPERTY);

      targets.forEach($dom => {

        const EventMachineComponent = this.getEventMachineComponent($dom.attr(REF_CLASS));

        if (EventMachineComponent) {
          let props = this.parseProperty($dom);
    
          // create component 
          let refName = $dom.attr(REFERENCE_PROPERTY);
          var instance = null; 
    
          // 동일한 refName 의 EventMachine 이 존재하면  해당 컴포넌트는 다시 그려진다. 
          // 루트 element 는 변경되지 않는다. 
          if (this.children[refName]) {
            instance = this.children[refName]; 
            instance._reload(props);
          } else {
            // 기존의 refName 이 존재하지 않으면 Component 를 생성해서 element 를 교체한다. 
            instance = new EventMachineComponent(this, props);
    
            this.children[refName || instance.id] = instance;
    
            instance.render();
          }
          

          if (instance.renderTarget) {
            instance.$el?.appendTo(instance.renderTarget);
            $dom.remove();
          } else {
            $dom.replace(instance.$el);     
          }

        } else {
          $dom.remove();
        }
   
    
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

    _afterLoad () {

      this.runHandlers('initialize');

      this.bindData();

      this.parseComponent();
    }

    async load(...args) {
      if (!this._loadMethods) {
        this._loadMethods = this.filterProps(CHECK_LOAD_PATTERN);
      }

      // loop 가 비동기라 await 로 대기를 시켜줘야 나머지 html 업데이트에 대한 순서를 맞출 수 있다. 
      const localLoadMethods = this._loadMethods.filter(callbackName => {
          const elName = callbackName.split(LOAD_SAPARATOR)[1]
                                    .split(CHECK_SAPARATOR)
                                    .map(it => it.trim())[0];
          if (!args.length) return true; 
          return args.indexOf(elName) > -1
        });



      await localLoadMethods.forEach(async (callbackName) => {
        let methodName = callbackName.split(LOAD_SAPARATOR)[1];
        var [elName, ...checker] = methodName.split(CHECK_SAPARATOR).map(it => it.trim());

        checker = checker.map(it => it.trim());
        
        const isDomDiff = Boolean(checker.filter(it => DOMDIFF.includes(it)).length);

        if (this.refs[elName]) {        
          var newTemplate = await this[callbackName].call(this, ...args);

          if (Array.isArray(newTemplate)) {
            newTemplate = newTemplate.join('');
          }

          // create fragment 
          const fragment = this.parseTemplate(html`${newTemplate}`, true);
          if (isDomDiff) {
            this.refs[elName].htmlDiff(fragment);
          } else {
            this.refs[elName].html(fragment);
          }

        }
      });

      this._afterLoad();

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
     * 자원을 해제한다.
     * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다.
     * 
     */
    destroy() {
      this.eachChildren(childComponent => {
        childComponent.destroy();
      });

      this.runHandlers('destroy');
      if (this.$el) {
        this.$el.remove();
      }

      this.$el = null; 
      this.refs = {}; 
      this.children = {}; 
    }

    /**
     * property 수집하기
     * 상위 클래스의 모든 property 를 수집해서 리턴한다.
     * 
     * @returns {string[]} 나의 상위 모든 메소드를 수집해서 리턴한다. 
     */
    collectProps() {

      if (!this.__cachedMethodList){
        this.__cachedMethodList = collectProps(this, (name) => {
          return name.indexOf(MAGIC_METHOD) === 0; 
        });
      }

      return this.__cachedMethodList;
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
    isMouseLeftButton(e) {
      return e.buttons === 1;     // 1 is left button 
    }

    isMouseRightButton(e) {
      return e.buttons === 2;     // 2 is right button 
    }  

    hasMouse(e) { 
      return e.pointerType === 'mouse';
    }

    hasTouch(e) {
      return e.pointerType === 'touch';
    }

    hasPen(e) {
      return e.pointerType === 'pen';
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
  }

  /**
   * @class BaseStore
   * @description BaseStore is the base class for all stores.
   * 
   */ 
  class BaseStore {
    constructor(editor) {
      this.cachedCallback = {};
      this.callbacks = {};
      this.commandes = [];
      this.editor = editor;
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

    debug (...args) {
      if (this.editor && this.editor.config.get('debug')) {
        console.debug(...args );
      }

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
    on(event, originalCallback, context, debounceDelay = 0, throttleDelay = 0, enableAllTrigger = false, enableSelfTrigger = false, beforeMethods = []) {
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

    /**
     * 메세지 해제
     * 
     * @param {string} event 
     * @param {*} originalCallback 
     */
    off(event, originalCallback) {

      this.debug('off message event', event );

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
      this.debug('off all message', context.sourceName );
    }

    getCachedCallbacks (event) {
      return this.getCallbacks(event);
    }

    sendMessage(source, event, ...args) {
      Promise.resolve().then(() => {
        var list = this.getCachedCallbacks(event);
        if (list) {

          for(var i = 0, len = list.length; i < len; i++) {
            const f = list[i];
            // console.log(source);
            if (f.enableSelfTrigger) continue;

            if (f.enableAllTrigger || f.originalCallback.source !== source) {
              f.callback.apply(f.context, args);  
            }
          }
        }

      });
    }

    nextSendMessage(source, callback, ...args) {
      Promise.resolve().then(() => {
        callback(...args);
      });
    }

    triggerMessage(source, event, ...args) {
      Promise.resolve().then(() => {
        var list = this.getCachedCallbacks(event);

        if (list) {
          for(var i = 0, len = list.length; i < len; i++) {
            const f = list[i];
            if (f.originalCallback.source === source) {
              f.callback.apply(f.context, args);  
            }
          }
        } else {
          console.warn(event, ' is not valid event');
        }


      });
    }

    emit(event, ...args) {

      if (isFunction(event)) {
        event(...args);
      } else {
        this.sendMessage(this.source, event, ...args);
      }

    }

    /**
     * 마이크로 Task 를 실행 
     * 
     * @param {Function} callback  마이크로Task 형식으로 실행될 함수 
     */
    nextTick (callback) {
      this.nextSendMessage(this.source, callback);
    }

    trigger(event, ...args) {

      if (isFunction(event)) {
        event(...args);
      } else {
        this.triggerMessage(this.source, event, ...args);
      }

    }
  }

  /**
   * UI 를 만드는 기본 단위 
   * 
   * dom handler, 
   * bind handler, 
   * store handler 를 가진다. 
   * 
   * @property {Editor} $editor 
   */
  class UIElement extends EventMachine {
    constructor(opt, props = {}) {
      super(opt, props);

      this.__UID = new Set();
      if (props.store) {
        this.__storeInstance = props.store;
      }

      this.created();

      this.initialize();

      this.initializeStoreEvent();

    }

    setStore (storeInstance) {
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
    created() {}

    getRealEventName(e, s = MULTI_PREFIX) {
      var startIndex = e.indexOf(s);
      return e.substr(startIndex < 0 ? 0 : startIndex + s.length);
    }

    splitMethod (arr, keyword, defaultValue = 0) {
      var [methods, params] = splitMethodByKeyword(arr, keyword);

      return [
        methods.length ? +params[0].target : defaultValue,
        methods, 
        params
      ]
    }

    createLocalCallback(event, callback) {
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
      this.filterProps(CHECK_SUBSCRIBE_PATTERN).forEach(key => {
        const events = this.getRealEventName(key, SUBSCRIBE_SAPARATOR);
        // context 에 속한 변수나 메소드 리스트 체크
        const [method, ...methodLine] = events.split(CHECK_SAPARATOR);
        const checkMethodList = methodLine.map(it => it.trim()).filter(code => this[code]).map(target => ({target}));

        // support deboounce for store event    
        const [debounceSecond, debounceMethods] = this.splitMethod(methodLine, 'debounce');
        const [throttleSecond, throttleMethods] = this.splitMethod(methodLine, 'throttle');      
        const [allTrigger, allTriggerMethods] = this.splitMethod(methodLine, 'allTrigger');   
        const [selfTrigger, selfTriggerMethods] = this.splitMethod(methodLine, 'selfTrigger');            

        events
          .split(CHECK_SAPARATOR)
          .filter(it => {
            return (
                checkMethodList.indexOf(it) === -1 &&             
                debounceMethods.indexOf(it) === -1 && 
                allTriggerMethods.indexOf(it) === -1 &&               
                selfTriggerMethods.indexOf(it) === -1 &&                             
                throttleMethods.indexOf(it) === -1
            )
          })
          .map(it => it.trim())
          .filter(Boolean)
          .forEach(e => {

            if (isFunction(this[key])) {
              var callback = this.createLocalCallback(e, this[key] );
              this.$store.on(e, callback, this, debounceSecond, throttleSecond, allTriggerMethods.length, selfTriggerMethods.length, checkMethodList);
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
      super.destroy();

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
    emit(messageName, ...args) {
      this.$store.source = this.source;
      this.$store.sourceContext = this; 
      this.$store.emit(messageName, ...args);
    }

    /**
     * MicroTask 를 수행한다. 
     * 
     * @param {Function} callback 
     */
    nextTick (callback) {
      this.$store.nextTick(callback);
    }

    /**
     * 
     * UIElement 자신의 메세지를 수행한다. 
     * emit 은 나외의 객체에게 메세지를 보내고 
     * 
     * @param {string} messageName 
     * @param {any[]} args 
     */
    trigger(messageName, ...args) {
      this.$store.source = this.source;
      this.$store.trigger(messageName, ...args);
    }

    /**
     * 자식 객체에게만 호출되는 메세지를 수행한다.
     * 
     * @param {string} messageName
     * @param {any[]} args
     */ 
    broadcast(messageName, ...args) {
      Object.keys(this.children).forEach(key => {
        this.children[key].trigger(messageName, ...args);
      });
    }

    /**
     * message 이벤트에 주어진 callack 을 등록 
     * 동일한 메세지 명으로 callback 은 list 화 되어서 관리 됩니다. 
     * 
     * @param {string} message 이벤트 메세지 이름 
     * @param {Function} callback 메세지 지정시 실행될 함수
     */ 
    on (message, callback) {
      this.$store.on(message, callback);
    }

    off (message, callback) {
      this.$store.off(message, callback);
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
     *     <div onClick=${this.subscribe(() => { 
     *        console.log('click is fired'); 
     *        console.log(this.source);
     *     })}>
     *        눌러주세요.
     *     </div>
     * `
     * ```
     * 
     * @param {Function} callback subscribe 함수로 지정할 callback 
     * @param {number} [debounceSecond=0] debounce 시간(ms)
     * @param {number} [throttleSecond=0] throttle 시간(ms)
     * @returns {string} function id 
     */ 
    subscribe(callback, debounceSecond = 0, throttleSecond = 0) {
      const id = `subscribe.${uuidShort()}`;

      const newCallback = this.createLocalCallback(id, callback);

      this.$store.on(id, newCallback, this, debounceSecond, throttleSecond, false, /*self trigger*/true);    

      return id; 
    }
  }

  /**
   * UIElement 렌더링 하기 
   * 
   * @param {UIElement} ElementClass
   * @param {Object} opt 
   * @param {string|HTMLElement} opt.container  렌더링 될 객체 
   * @returns {UIElement}
   */ 
  const start = (ElementClass, opt = {}) => {

    const $container = Dom.create(opt.container || document.body);

    const app = new ElementClass(opt, {
      ...opt,
      store: opt.store || new BaseStore()
    });

    app.render($container);

    return app; 
  };

  var index = {
    start,
    UIElement,
    BaseStore,
    Dom,
    ...EventFunctions,
    registElement,
  };

  return index;

})));
