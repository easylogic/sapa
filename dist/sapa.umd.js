(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.sapa = {}));
}(this, (function (exports) { 'use strict';

  function debounce (callback, delay) {

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

  const short_tag_regexp = /\<(\w*)([^\>]*)\/\>/gim;

  const HTML_TAG = {
      'image': true,
      'input': true,
      'br': true,
      'path': true 
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

          results = results.map(r => {
              if (isObject(r) && !isArray(r)) {
                  return Object.keys(r).map(key => {
                      return `${key}="${r[key]}"`
                  }).join(' ')
              }

              return r
          }).join('');

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

    attr(key, value) {
      if (arguments.length == 1) {
        return this.el.getAttribute(key);
      }

      this.el.setAttribute(key, value);

      return this;
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
      var selected = parent.$(`.${cls}`);
      if (selected) selected.removeClass(cls);
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
      return [...this.findAll(selector)].map(node => {
        return Dom.create(node);
      });
    }

    empty() {
      return this.html('');
    }

    append(el) {
      if (isString(el)) {
        this.el.appendChild(document.createTextNode(el));
      } else {
        this.el.appendChild(el.el || el);
      }

      return this;
    }

    appendHTML(html) {
      var $dom = Dom.create("div").html(html);

      this.append($dom.createChildrenFragment());
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
        this.el.style[key] = value;
      } else if (isNotUndefined(key)) {
        if (isString(key)) {
          return getComputedStyle(this.el)[key];
        } else {
          var keys = Object.keys(key || {});

          for (var i = 0, len = keys.length; i < len; i++) {
            var k = keys[i];
            this.el.style[k] = key[k];
          }
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

      if (value != this.el.style.cssText) {
        this.el.style.cssText = value;
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

    offsetRect() {
      return {
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

      var tempValue = value;

      if (value instanceof Dom) {
        tempValue = value.val();
      }

      this.el.value = tempValue;

      return this;

    }

    get value() {
      return this.el.value;
    }

    show(displayType = "block") {
      return this.css("display", displayType != "none" ? displayType : "block");
    }

    hide() {
      return this.css("display", "none");
    }

    toggle(isForce) {
      var currentHide = this.css("display") == "none";

      if (arguments.length == 1) {
        if (currentHide && isForce) {
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

    scrollIntoView () {
      this.el.scrollIntoView();
    }

    setScrollTop(scrollTop) {
      this.el.scrollTop = scrollTop;
      return this;
    }

    setScrollLeft(scrollLeft) {
      this.el.scrollLeft = scrollLeft;
      return this;
    }

    get scrollTop() {
      if (this.el === document.body) {
        return Dom.getScrollTop();
      }

      return this.el.scrollTop;
    }

    get scrollLeft() {
      if (this.el === document.body) {
        return Dom.getScrollLeft();
      }

      return this.el.scrollLeft;
    }

    get scrollHeight() {
      return this.el.scrollHeight;
    }

    get scrollWidth() {
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

    firstChild() {
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

    checked(isChecked = false) {
      if (arguments.length == 0) {
        return !!this.el.checked;
      }

      this.el.checked = !!isChecked;

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
  }

  class EventChecker {
    constructor(value, split = CHECK_SAPARATOR) {
      this.value = value;
      this.split = split;
    }

    toString() {
      return ` ${this.split} ` + this.value;
    }
  }

  class EventAfterRunner {
    constructor(value, split = CHECK_SAPARATOR) {
      this.value = value;
      this.split = split;
    }

    toString() {
      return ` ${this.split} after(${this.value})`;
    }
  }

  class EventBeforeRunner {
    constructor(value, split = CHECK_SAPARATOR) {
      this.value = value;
      this.split = split;
    }

    toString() {
      return ` ${this.split} before(${this.value})`;
    }
  }

  // event name regular expression
  const CHECK_LOAD_PATTERN = /^load (.*)/gi;
  const CHECK_BIND_PATTERN = /^bind (.*)/gi;

  const CHECK_CLICK_PATTERN = "click|dblclick";
  const CHECK_MOUSE_PATTERN = "mouse(down|up|move|over|out|enter|leave)";
  const CHECK_POINTER_PATTERN = "pointer(start|move|end)";
  const CHECK_TOUCH_PATTERN = "touch(start|move|end)";
  const CHECK_KEY_PATTERN = "key(down|up|press)";
  const CHECK_DRAGDROP_PATTERN =
    "drag|drop|drag(start|over|enter|leave|exit|end)";
  const CHECK_CONTEXT_PATTERN = "contextmenu";
  const CHECK_INPUT_PATTERN = "change|input|focus|blur|focus(in|out)";
  const CHECK_CLIPBOARD_PATTERN = "paste";
  const CHECK_BEHAVIOR_PATTERN = "resize|scroll|wheel|mousewheel|DOMMouseScroll";
  const CHECK_FORM_PATTERN = "submit";

  const CHECK_PATTERN_LIST = [
    CHECK_CLICK_PATTERN,
    CHECK_MOUSE_PATTERN,
    CHECK_POINTER_PATTERN,
    CHECK_TOUCH_PATTERN,
    CHECK_KEY_PATTERN,
    CHECK_DRAGDROP_PATTERN,
    CHECK_CONTEXT_PATTERN,
    CHECK_INPUT_PATTERN,
    CHECK_CLIPBOARD_PATTERN,
    CHECK_BEHAVIOR_PATTERN,
    CHECK_FORM_PATTERN
  ].join("|");

  const CHECK_PATTERN = new RegExp(`^(${CHECK_PATTERN_LIST}\s)`, "ig");

  const NAME_SAPARATOR = ":";
  const CHECK_SAPARATOR = "|";
  const LOAD_SAPARATOR = "load ";
  const BIND_SAPARATOR = "bind ";
  const SAPARATOR = ' ';

  // 임의의 값을 저장하기 위한 구조
  // 임의의 값은 하나의 id 로 만들어지고 id 를 조회 할 때  값으로 다시 치환
  const refManager = {};

  const DOM_EVENT_MAKE = (...keys) => {
    var key = keys.join(NAME_SAPARATOR);
    return (...args) => {
      return [key, ...args].join(SAPARATOR);
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
  const POINTERSTART = CUSTOM("mousedown", "touchstart");
  const POINTERMOVE = CUSTOM("mousemove", "touchmove");
  const POINTEREND = CUSTOM("mouseup", "touchend");
  const CHANGEINPUT = CUSTOM("change", "input");
  const WHEEL = CUSTOM("wheel", "mousewheel", "DOMMouseScroll");

  // Predefined CHECKER
  const CHECKER = (value, split = CHECK_SAPARATOR) => new EventChecker(value, split);
  const AFTER = (value, split = CHECK_SAPARATOR) => new EventAfterRunner(value, split);
  const BEFORE = (value, split = CHECK_SAPARATOR) => new EventBeforeRunner(value, split);

  const IF = CHECKER;

  const ARROW_UP = CHECKER('ArrowUp');
  const ARROW_DOWN = CHECKER('ArrowDown');
  const ARROW_LEFT = CHECKER('ArrowLeft');
  const ARROW_RIGHT = CHECKER('ArrowRight');
  const ENTER = CHECKER('Enter');
  const SPACE = CHECKER('Space');

  const ALT = CHECKER("isAltKey");
  const SHIFT = CHECKER("isShiftKey");
  const META = CHECKER("isMetaKey");
  const CONTROL = CHECKER("isCtrlKey");
  const SELF = CHECKER("self");

  // event config method
  const DEBOUNCE = (t = 100) => CHECKER(`debounce(${t})`);
  const THROTTLE = (t = 100) => CHECKER(`throttle(${t})`);
  const CAPTURE = CHECKER("capture()");

  // event config method

  // before method

  // after method
  const MOVE = (method = "move") => AFTER(`bodyMouseMove ${method}`);
  const END = (method = "end") => AFTER(`bodyMouseUp ${method}`);

  const PREVENT = AFTER(`preventDefault`);
  const STOP = AFTER(`stopPropagation`);

  const createRef = value => {
    if (value === '') return '';

    var id = uuid();
    refManager[id] = value;

    return id;
  };

  const getRef = id => refManager[id] || '';

  const BIND_CHECK_FUNCTION = field => {
    return function() {
      return this.prevState[field] != this.state[field];
    };
  };

  const BIND_CHECK_DEFAULT_FUNCTION = () => true;

  // Predefined LOADER
  const LOAD = (value = "$el") => LOAD_SAPARATOR + value;
  const BIND = (value = "$el", checkFieldOrCallback = '') => {
    return (
      BIND_SAPARATOR + value + ( 
        checkFieldOrCallback ?  CHECK_SAPARATOR + createRef(checkFieldOrCallback) : '' 
      ) 
    );
  };

  const Event = {
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
      this.callbacks = {};
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
      setTimeout(() => {
        var list = this.getCachedCallbacks(event);
        if (list) {
          list
          .filter(f => f.originalCallback.source !== source)
          .forEach(f => f.callback($2, $3, $4, $5));
        }
      }, 0);
    }

    triggerMessage(source, event, $2, $3, $4, $5) {
      setTimeout(() => {
        var list = this.getCachedCallbacks(event);
        if (list) {
          list
            .filter(f => f.originalCallback.source === source)
            .forEach(f => f.callback($2, $3, $4, $5));
        } else {
          console.warn(event, ' is not valid event');
        }
      }, 0);
    }

    emit($1, $2, $3, $4, $5) {
      this.sendMessage(this.source, $1, $2, $3, $4, $5);
    }

    trigger($1, $2, $3, $4, $5) {
      this.triggerMessage(this.source, $1, $2, $3, $4, $5);
    }
  }

  const REFERENCE_PROPERTY = "ref";
  const TEMP_DIV = Dom.create("div");
  const QUERY_PROPERTY = `[${REFERENCE_PROPERTY}]`;
  const ATTR_lIST = [REFERENCE_PROPERTY];

  const matchPath = (el, selector) => {
    if (el) {
      if (el.matches(selector)) { return el; }
      return matchPath(el.parentElement, selector);
    }
    return null;
  };

  const hasDelegate = (e, eventObject) => {
    return matchPath(e.target || e.srcElement, eventObject.delegate);
  };

  const makeCallback = (context, eventObject, callback) => {
    if (eventObject.delegate) {
      return makeDelegateCallback(context, eventObject, callback);
    } else {
      return makeDefaultCallback(context, eventObject, callback);
    }
  };

  const makeDefaultCallback = (context, eventObject, callback) => {
    return e => {
      var returnValue = runEventCallback(context, e, eventObject, callback);
      if (isNotUndefined(returnValue)) { return returnValue; }
    };
  };

  const makeDelegateCallback = (context, eventObject, callback) => {
    return e => {
      const delegateTarget = hasDelegate(e, eventObject);
      if (delegateTarget) {
        e.$delegateTarget = Dom.create(delegateTarget);

        var returnValue = runEventCallback(context, e, eventObject, callback);
        if (isNotUndefined(returnValue)) { return returnValue; }
      }
    };
  };

  const runEventCallback = (context, e, eventObject, callback) => {
    e.xy = Event.posXY(e);

    if (eventObject.beforeMethods.length) {
      eventObject.beforeMethods.every(before => {
        return context[before.target].call(context, e, before.param);
      });
    }

    if (checkEventType(context, e, eventObject)) {
      var returnValue = callback(e, e.$delegateTarget, e.xy);

      if (eventObject.afterMethods.length) {
        eventObject.afterMethods.forEach(after =>
          context[after.target].call(context, e, after.param)
        );
      }

      return returnValue;
    }
  };

  const checkEventType = (context, e, eventObject) => {
    var hasKeyCode = true;
    if (eventObject.codes.length) {
      hasKeyCode =
        (e.code ? eventObject.codes.includes(e.code.toLowerCase()) : false) ||
        (e.key ? eventObject.codes.includes(e.key.toLowerCase()) : false);
    }

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
  };

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
  };

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

  const getDefaultEventObject = (context, eventName, checkMethodFilters) => {
    let arr = checkMethodFilters;

    // context 에 속한 변수나 메소드 리스트 체크
    const checkMethodList = arr.filter(code => !!context[code]);

    // 이벤트 정의 시점에 적용 되어야 하는 것들은 모두 method() 화 해서 정의한다.
    const [afters, afterMethods] = splitMethodByKeyword(arr, "after");
    const [befores, beforeMethods] = splitMethodByKeyword(arr, "before");
    const [debounces, debounceMethods] = splitMethodByKeyword(arr, "debounce");
    const [throttles, throttleMethods] = splitMethodByKeyword(arr, "throttle");
    const [captures] = splitMethodByKeyword(arr, "capture");

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
      .filter(code => !filteredList.includes(code))
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
  };

  const addEvent = (context, eventObject, callback) => {
    eventObject.callback = makeCallback(context, eventObject, callback);
    context.addBinding(eventObject);
    Event.addEvent(eventObject.dom, eventObject.eventName, eventObject.callback, !!eventObject.captures.length);
  };

  const bindingEvent = (
    context,
    [eventName, dom, ...delegate],
    checkMethodFilters,
    callback
  ) => {
    let eventObject = getDefaultEventObject(context, eventName, checkMethodFilters);

    eventObject.dom = getDefaultDomElement(context, dom);
    eventObject.delegate = delegate.join(SAPARATOR);

    if (eventObject.debounceMethods.length) {
      var debounceTime = +eventObject.debounceMethods[0].target;
      callback = debounce(callback, debounceTime);
    } else if (eventObject.throttleMethods.length) {
      var throttleTime = +eventObject.throttleMethods[0].target;
      callback = throttle(callback, throttleTime);
    }

    addEvent(context, eventObject, callback);
  };

  const getEventNames = eventName => {
    let results = [];

    eventName.split(NAME_SAPARATOR).forEach(e => results.push(...e.split(NAME_SAPARATOR)));

    return results;
  };

  const parseEvent = (context, key) => {
    let checkMethodFilters = key.split(CHECK_SAPARATOR).map(it => it.trim());
    var eventSelectorAndBehave = checkMethodFilters.shift();

    var [eventName, ...params] = eventSelectorAndBehave.split(SAPARATOR);
    var eventNames = getEventNames(eventName);
    var callback = context[key].bind(context);

    eventNames.forEach(eventName => {
      bindingEvent(context, [eventName, ...params], checkMethodFilters, callback);
    });
  };

  const applyElementAttribute = ($element, key, value) => {
    if (key === "style") {
      if (isObject(value)) {
        keyEach(value, (sKey, sValue) => {
          if (!sValue) {
            $element.removeStyle(sKey);
          } else {
            $element.css(sKey, sValue);
          }
        });
      }

      return;
    } else if (key === "class") {

      if (isArray(value)) {
        $element.addClass(...value);
      } else if (isObject(value)) {
        keyEach(value, (k, v) => {
          if (!value) {
            $element.removeClass(k);
          } else {
            $element.addClass(k);
          }
        });
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
      } else if (key === 'innerHTML') {
        $element.html(value);
      } else {
        $element.attr(key, value);
      }
    }
  };

  class EventMachine {
    constructor() {
      this.state = {};
      this.prevState = {};
      this.refs = {};
      this.children = {};
      this._bindings = [];
      this.id = uuid();    
      this.childComponents = this.components();
    }

    initState() {
      return {};
    }

    setState(state = {}, isLoad = true) {
      this.prevState = this.state;
      this.state = { ...this.state, ...state };
      if (isLoad) {
        this.load();
      }
    }

    _reload(props) {
      this.props = props;
      this.setState(this.initState(), false);
      this.refresh();
    }

    render($container) {
      this.$el = this.parseTemplate(
        html`
        ${this.template()}
      `
      );
      this.refs.$el = this.$el;

      if ($container) $container.append(this.$el);

      this.load();
      this.parseComponent(false);

      this.afterRender();
    }

    initialize() {
      this.state = this.initState();
    }
    afterRender() {}
    components() { return {}; }

    getRef(...args) { return this.refs[args.join('')]; }

    parseTemplate(html, isLoad) {
      if (isArray(html)) html = html.join('');

      html = html.trim();
      const list = TEMP_DIV.html(html).children();

      list.forEach($el => {
        // ref element 정리
        var ref = $el.attr(REFERENCE_PROPERTY);
        if (ref) {
          this.refs[ref] = $el;
        }

        var refs = $el.$$(QUERY_PROPERTY);
        var temp = {}; 
        refs.forEach($dom => {
          const name = $dom.attr(REFERENCE_PROPERTY);
          if (temp[name]) {
            console.warn(`${ref} is duplicated. - ${this.sourceName}`);
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

    parseProperty ($dom) {
      let props = {};

      // parse properties 
      [...$dom.el.attributes]
        .filter(t => {
          return ATTR_lIST.indexOf(t.nodeName) < 0;
        })
        .forEach(t => {
          props[t.nodeName] = t.nodeValue;
        });

      // property 태그는 속성으로 대체 
      $dom.$$('property').forEach($p => {
        const [name, value, type] = $p.attrs('name', 'value', 'type');

        let realValue = value || $p.text();

        // JSON 타입이면 JSON.parse 로 객체를 복원해서 넘겨준다. 
        if (type === 'json') {            
          realValue = JSON.parse(realValue);
        }
      
        props[name] = realValue; 
      });

      return props;
    }

    parseComponent() {
      const $el = this.$el;

      keyEach(this.childComponents, (ComponentName, Component) => {
        const targets = [$el, ...$el.$$(ComponentName.toLowerCase())];
        targets.forEach($dom => {
          let props = this.parseProperty($dom);

          let refName = $dom.attr(REFERENCE_PROPERTY);
          var instance = null; 
          if (this.children[refName]) {
            //  기존의 같은 객체가 있으면 객체를 새로 생성하지 않고 재활용한다. 
            instance = this.children[refName]; 
            instance._reload(props);
          } else {
            instance = new Component(this, props);

            this.children[refName || instance.id] = instance;

            instance.render();
            instance.initializeEvent();  
          }

          $dom.replace(instance.$el);        
        });
      });

      keyEach(this.children, (key, obj) => {
        if (obj && obj.clean()) {
          delete this.children[key];
        }
      });
    }

    clean () {
      if (!this.$el.hasParent()) {

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
    refresh() {this.load();}

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
        const elName = callbackName.split(LOAD_SAPARATOR)[1];
        if (!args.length) return true; 
        return args.includes(elName)
      })
      .forEach(callbackName => {
        const elName = callbackName.split(LOAD_SAPARATOR)[1];
        if (this.refs[elName]) {
          
          var newTemplate = this[callbackName].call(this, ...args);

          if (isArray(newTemplate)) {
            newTemplate = newTemplate.join('');
          }

          const fragment = this.parseTemplate(newTemplate, true);

          this.refs[elName].html(fragment);

          this.initializeDomEvent();
        }
      });

      this.bindData();

      this.parseComponent();
      
    }

    bindData (...args) {
      if (!this._bindMethods) {
        this._bindMethods = this.filterProps(CHECK_BIND_PATTERN);
      }
      
      this._bindMethods
        .filter(originalCallbackName => {
          if (!args.length) return true; 
          var [callbackName, id] = originalCallbackName.split(CHECK_SAPARATOR);        

          var [_, $bind] = callbackName.split(' ');

          return args.includes($bind)
        })
        .forEach(callbackName => {
          const bindMethod = this[callbackName];
          var [callbackName, id] = callbackName.split(CHECK_SAPARATOR);

          const refObject = this.getRef(id);
          let refCallback = BIND_CHECK_DEFAULT_FUNCTION;

          if (refObject != '' && isString(refObject)) {
            refCallback = BIND_CHECK_FUNCTION(refObject);
          } else if (isFunction(refObject)) {
            refCallback = refObject;
          }

          const elName = callbackName.split(BIND_SAPARATOR)[1];
          let $element = this.refs[elName];

          const isBindCheck = isFunction(refCallback) && refCallback.call(this);
          if ($element && isBindCheck) {
            const results = bindMethod.call(this, ...args);

            if (!results) return;

            keyEach(results, (key, value) => {
              applyElementAttribute($element, key, value);
            });
          }
        });
    }

    // 기본 템플릿 지정
    template() {
      var className = this.templateClass();
      var classString = className ? `class="${className}"` : '';

      return `<div ${classString}></div>`;
    }

    templateClass() { return null; }

    eachChildren(callback) {
      if (!isFunction(callback)) return;

      keyEach(this.children, (_, Component) => callback(Component));
    }

    /**
     * 이벤트를 초기화한다.
     */
    initializeEvent() {
      this.initializeDomEvent();

      this.eachChildren(Component => Component.initializeEvent());
    }

    /**
     * 자원을 해제한다.
     * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다.
     */
    destroy() {
      this.destroyDomEvent();

      this.eachChildren(Component => Component.destroy());
    }

    destroyDomEvent() {
      this.removeEventAll();
    }

    initializeDomEvent() {
      this.destroyDomEvent();
      this.filterProps(CHECK_PATTERN).forEach(key => parseEvent(this, key));
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
          return isFunction(this[name]);
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
      return e && e.$delegateTarget && e.$delegateTarget.is(e.target);
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
      return e.metaKey;
    }

    /* magic check method */

    /** before check method */

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
        this.emit('add/body/mousemove', this[methodName], this, e.xy);
      }
    }

    bodyMouseUp(e, methodName) {
      if (this[methodName]) {
        this.emit('add/body/mouseup', this[methodName], this, e.xy);
      }
    }
    /* after check method */

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

    removeEventAll() {
      this.getBindings().forEach(obj => {
        this.removeEvent(obj);
      });
      this.initBindings();
    }

    removeEvent({ eventName, dom, callback }) {
      Event.removeEvent(dom, eventName, callback);
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
      super(opt);

      this.initializeProperty(opt, props);

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

      if (!this.$store) {
        this.$store = new BaseStore(opt);
      }
    }

    created() {}

    getRealEventName(e, s = MULTI_PREFIX) {
      var startIndex = e.indexOf(s);
      return e.substr(startIndex < 0 ? 0 : startIndex + s.length);
    }

    initializeStoreEvent() {
      this.storeEvents = {};

      this.filterProps(REG_STORE_MULTI_PATTERN).forEach(key => {
        const events = this.getRealEventName(key, MULTI_PREFIX);

        // support deboounce for store event 
        var [debounceMethods, params] = splitMethodByKeyword(events.split(SPLITTER), 'debounce');

        var debounceSecond = 0; 
        if (debounceMethods.length) {
          debounceSecond = +params[0].target || 0; 
        }

        events
          .split(SPLITTER)
          .filter(it => debounceMethods.includes(it) === false)
          .map(it => it.trim())
          .forEach(e => {
            var callback = this[key].bind(this);
            callback.source = this.source;
            this.storeEvents[e] = callback;
            this.$store.on(e, this.storeEvents[e], this, debounceSecond);
        });
      });
    }

    destoryStoreEvent() {
      this.$store.offAll(this);
      this.storeEvents = {}; 
    }

    destroy () {
      super.destroy();
      this.destoryStoreEvent();
    }

    emit(...args) {
      this.$store.source = this.source;
      this.$store.emit(...args);
    }

    trigger(...args) {
      this.$store.source = this.source;
      this.$store.trigger(...args);
    }

    on (message, callback) {
      this.$store.on(message, callback);
    }

    off (message, callback) {
      this.$store.off(message, callback);
    }
  }

  const EMPTY_POS = { x: 0, y: 0 };
  const MOVE_CHECK_MS = 10;

  const start = opt => {
    class App extends UIElement {

      initialize() {

        this.$store = new BaseStore();
        this.$app = this; 

        this.$container = Dom.create(this.getContainer());
        this.$container.addClass(this.getClassName());

        this.render(this.$container);

        // 이벤트 연결
        this.initializeEvent();

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
        var {oldPos, pos} = this.state;

        var isRealMoved = oldPos.x != pos.x || oldPos.y != pos.y;

        if (isRealMoved && this.moves.size) {
          this.moves.forEach(v => {
            var dx = pos.x - v.xy.x;
            var dy = pos.y - v.xy.y;
            if (dx != 0 || dy != 0) {
              //  변화가 있을 때만 호출 한다.
              v.func.call(v.context, dx, dy, 'move');
            }
          });
        }
        requestAnimationFrame(this.funcBodyMoves);
      }

      removeBodyMoves() {
        var {pos} = this.state; 
        this.ends.forEach(v => {
          v.func.call(v.context, pos.x - v.xy.x, pos.y - v.xy.y, 'end');
        });

        this.moves.clear();
        this.ends.clear();
      }

      [EVENT('add/body/mousemove')](func, context, xy) {
        this.moves.add({ func, context, xy });
      }

      [EVENT('add/body/mouseup')](func, context, xy) {
        this.ends.add({ func, context, xy });
      }

      getClassName() {
        return opt.className || "sapa";
      }

      getContainer() {
        return opt.container || document.body;
      }

      template() {

        let str = `${opt.template}`;

        if (str.trim() === '') {
          str = `<div>${opt.template}</div>`;
        }

        return str; 
      }

      components() {
        return opt.components || {};
      }

      [POINTERMOVE("document")](e) {
        var oldPos = this.state.pos || EMPTY_POS;
        var newPos = e.xy || EMPTY_POS;

        this.bodyMoved = !(oldPos.x == newPos.x && oldPos.y == newPos.y);

        this.setState({bodyEvent : e, pos: newPos, oldPos}, false);

        if (!this.requestId) {
          this.requestId = requestAnimationFrame(this.funcBodyMoves);
        }
      }

      [POINTEREND("document") + DEBOUNCE(50)](e) {
        var newPos = e.xy || EMPTY_POS;
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

  exports.AFTER = AFTER;
  exports.ALT = ALT;
  exports.ARROW_DOWN = ARROW_DOWN;
  exports.ARROW_LEFT = ARROW_LEFT;
  exports.ARROW_RIGHT = ARROW_RIGHT;
  exports.ARROW_UP = ARROW_UP;
  exports.App = App;
  exports.BEFORE = BEFORE;
  exports.BIND = BIND;
  exports.BIND_CHECK_DEFAULT_FUNCTION = BIND_CHECK_DEFAULT_FUNCTION;
  exports.BIND_CHECK_FUNCTION = BIND_CHECK_FUNCTION;
  exports.BIND_SAPARATOR = BIND_SAPARATOR;
  exports.BLUR = BLUR;
  exports.CAPTURE = CAPTURE;
  exports.CHANGE = CHANGE;
  exports.CHANGEINPUT = CHANGEINPUT;
  exports.CHECKER = CHECKER;
  exports.CHECK_BIND_PATTERN = CHECK_BIND_PATTERN;
  exports.CHECK_LOAD_PATTERN = CHECK_LOAD_PATTERN;
  exports.CHECK_PATTERN = CHECK_PATTERN;
  exports.CHECK_SAPARATOR = CHECK_SAPARATOR;
  exports.CLICK = CLICK;
  exports.CONTEXTMENU = CONTEXTMENU;
  exports.CONTROL = CONTROL;
  exports.CUSTOM = CUSTOM;
  exports.DEBOUNCE = DEBOUNCE;
  exports.DOUBLECLICK = DOUBLECLICK;
  exports.DRAG = DRAG;
  exports.DRAGEND = DRAGEND;
  exports.DRAGENTER = DRAGENTER;
  exports.DRAGEXIT = DRAGEXIT;
  exports.DRAGLEAVE = DRAGLEAVE;
  exports.DRAGOUT = DRAGOUT;
  exports.DRAGOVER = DRAGOVER;
  exports.DRAGSTART = DRAGSTART;
  exports.DROP = DROP;
  exports.END = END;
  exports.ENTER = ENTER;
  exports.EVENT = EVENT;
  exports.Event = Event;
  exports.EventAfterRunner = EventAfterRunner;
  exports.EventBeforeRunner = EventBeforeRunner;
  exports.EventChecker = EventChecker;
  exports.FOCUS = FOCUS;
  exports.FOCUSIN = FOCUSIN;
  exports.FOCUSOUT = FOCUSOUT;
  exports.IF = IF;
  exports.INPUT = INPUT;
  exports.KEYDOWN = KEYDOWN;
  exports.KEYPRESS = KEYPRESS;
  exports.KEYUP = KEYUP;
  exports.LOAD = LOAD;
  exports.LOAD_SAPARATOR = LOAD_SAPARATOR;
  exports.META = META;
  exports.MOUSEDOWN = MOUSEDOWN;
  exports.MOUSEENTER = MOUSEENTER;
  exports.MOUSELEAVE = MOUSELEAVE;
  exports.MOUSEMOVE = MOUSEMOVE;
  exports.MOUSEOUT = MOUSEOUT;
  exports.MOUSEOVER = MOUSEOVER;
  exports.MOUSEUP = MOUSEUP;
  exports.MOVE = MOVE;
  exports.NAME_SAPARATOR = NAME_SAPARATOR;
  exports.PASTE = PASTE;
  exports.PIPE = PIPE;
  exports.POINTEREND = POINTEREND;
  exports.POINTERMOVE = POINTERMOVE;
  exports.POINTERSTART = POINTERSTART;
  exports.PREVENT = PREVENT;
  exports.RESIZE = RESIZE;
  exports.SAPARATOR = SAPARATOR;
  exports.SCROLL = SCROLL;
  exports.SELF = SELF;
  exports.SHIFT = SHIFT;
  exports.SPACE = SPACE;
  exports.STOP = STOP;
  exports.SUBMIT = SUBMIT;
  exports.THROTTLE = THROTTLE;
  exports.TOUCHEND = TOUCHEND;
  exports.TOUCHMOVE = TOUCHMOVE;
  exports.TOUCHSTART = TOUCHSTART;
  exports.UIElement = UIElement;
  exports.WHEEL = WHEEL;
  exports.clone = clone;
  exports.createRef = createRef;
  exports.debounce = debounce;
  exports.getRef = getRef;
  exports.html = html;
  exports.isArray = isArray;
  exports.isBoolean = isBoolean;
  exports.isFunction = isFunction;
  exports.isNotString = isNotString;
  exports.isNotUndefined = isNotUndefined;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isUndefined = isUndefined;
  exports.keyEach = keyEach;
  exports.keyMap = keyMap;
  exports.throttle = throttle;
  exports.uuid = uuid;
  exports.uuidShort = uuidShort;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
