var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const MAGIC_METHOD = "@magic:";
const makeEventChecker = (value, split = CHECK_SAPARATOR) => {
  return ` ${split} ${value}`;
};
const CHECK_DOM_EVENT_PATTERN = /domevent (.*)/gi;
const CHECK_CALLBACK_PATTERN = /callback (.*)/gi;
const CHECK_LOAD_PATTERN = /load (.*)/gi;
const CHECK_BIND_PATTERN = /bind (.*)/gi;
const CHECK_SUBSCRIBE_PATTERN = /subscribe (.*)/gi;
const MULTI_PREFIX = "ME@";
const SPLITTER = "|";
const PIPE = (...args) => {
  return args.join(SPLITTER);
};
const EVENT = (...args) => {
  return MULTI_PREFIX + PIPE(...args);
};
const COMMAND = EVENT;
const ON = EVENT;
const NAME_SAPARATOR = ":";
const CHECK_SAPARATOR = "|";
const DOM_EVENT_SAPARATOR = `${MAGIC_METHOD}domevent `;
const CALLBACK_SAPARATOR = `${MAGIC_METHOD}callback `;
const LOAD_SAPARATOR = `${MAGIC_METHOD}load `;
const BIND_SAPARATOR = `${MAGIC_METHOD}bind `;
const SUBSCRIBE_SAPARATOR = `${MAGIC_METHOD}subscribe `;
const SAPARATOR = " ";
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
const CALLBACK_EVENT_MAKE = (...args) => {
  return CALLBACK_SAPARATOR + args.join(CHECK_SAPARATOR);
};
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
const ARROW_UP = CHECKER("ArrowUp");
const ARROW_DOWN = CHECKER("ArrowDown");
const ARROW_LEFT = CHECKER("ArrowLeft");
const ARROW_RIGHT = CHECKER("ArrowRight");
const ENTER = CHECKER("Enter");
const SPACE = CHECKER("Space");
const ESCAPE = CHECKER("Escape");
const BACKSPACE = CHECKER("Backspace");
const DELETE = CHECKER("Delete");
const EQUAL = CHECKER("Equal");
const MINUS = CHECKER("Minus");
const BRACKET_RIGHT = CHECKER("BracketRight");
const BRACKET_LEFT = CHECKER("BracketLeft");
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
const DOMDIFF = CHECKER("domdiff");
const DEBOUNCE = (t = 100) => {
  return CHECKER(`debounce(${t})`);
};
const DELAY = (t = 300) => {
  return CHECKER(`delay(${t})`);
};
const D1000 = DEBOUNCE(1e3);
const THROTTLE = (t = 100) => {
  return CHECKER(`throttle(${t})`);
};
const ALL_TRIGGER = CHECKER("allTrigger()");
const SELF_TRIGGER = CHECKER("selfTrigger()");
const FRAME = CHECKER("frame()");
const PARAMS = (obj) => {
  return CHECKER(`params(${variable(obj)})`);
};
const CAPTURE = CHECKER("capture()");
const PREVENT = AFTER(`preventDefault`);
const STOP = AFTER(`stopPropagation`);
const SUBSCRIBE = SUBSCRIBE_EVENT_MAKE;
const SUBSCRIBE_ALL = (...args) => SUBSCRIBE_EVENT_MAKE(...args, ALL_TRIGGER);
const SUBSCRIBE_SELF = (...args) => SUBSCRIBE_EVENT_MAKE(...args, SELF_TRIGGER);
const CONFIG = (config, ...args) => SUBSCRIBE_EVENT_MAKE(`config:${config}`, ...args);
const CALLBACK = CALLBACK_EVENT_MAKE;
const RAF = CALLBACK("requestAnimationFrame");
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
const POINTERSTART = (...args) => {
  return CUSTOM("pointerdown")(...args) + LEFT_BUTTON;
};
const POINTEROVER = CUSTOM("pointerover");
const POINTERENTER = CUSTOM("pointerenter");
const POINTEROUT = CUSTOM("pointerout");
const POINTERMOVE = CUSTOM("pointermove");
const POINTEREND = CUSTOM("pointerup");
const CHANGEINPUT = CUSTOM("change", "input");
const WHEEL = CUSTOM("wheel", "mousewheel", "DOMMouseScroll");
const ANIMATIONSTART = DOM_EVENT_MAKE("animationstart");
const ANIMATIONEND = DOM_EVENT_MAKE("animationend");
const ANIMATIONITERATION = DOM_EVENT_MAKE("animationiteration");
const TRANSITIONSTART = DOM_EVENT_MAKE("transitionstart");
const TRANSITIONEND = DOM_EVENT_MAKE("transitionend");
const TRANSITIONRUN = DOM_EVENT_MAKE("transitionrun");
const TRANSITIONCANCEL = DOM_EVENT_MAKE("transitioncancel");
const DOUBLETAB = CUSTOM("doubletab");
const LOAD = (value = "$el") => {
  return LOAD_SAPARATOR + value;
};
const getRef = (id) => {
  return refManager[id] || "";
};
const BIND_CHECK_FUNCTION = (field) => {
  return function() {
    return this.prevState[field] != this.state[field];
  };
};
const BIND_CHECK_DEFAULT_FUNCTION = () => {
  return true;
};
const BIND = (value = "$el") => {
  return BIND_SAPARATOR + value;
};
function normalizeWheelEvent(e) {
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
  ];
}
function limit(delta, maxDelta) {
  return Math.sign(delta) * Math.min(maxDelta, Math.abs(delta));
}
var Event = {
  addDomEvent(dom, eventName, callback, options = false) {
    if (dom) {
      dom.addEventListener(eventName, callback, options);
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
const identity = () => true;
function collectProps(root, checkFunction = identity) {
  let p = root;
  let results = [];
  do {
    const isObject2 = p instanceof Object;
    if (isObject2 === false) {
      break;
    }
    const names = Object.getOwnPropertyNames(p).filter((name) => {
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
  var t = void 0;
  return function(...args) {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(function() {
      callback(...args);
    }, delay || 300);
  };
}
function makeRequestAnimationFrame(callback, context) {
  return (...args) => {
    requestAnimationFrame(() => {
      callback.apply(context, args);
    });
  };
}
function throttle(callback, delay) {
  var t = void 0;
  return function(...args) {
    if (!t) {
      t = setTimeout(function() {
        callback(...args);
        t = null;
      }, delay || 300);
    }
  };
}
function ifCheck(callback, context, checkMethods) {
  return (...args) => {
    const ifResult = checkMethods.every((check) => {
      return context[check.target].apply(context, args);
    });
    if (ifResult) {
      callback.apply(context, args);
    }
  };
}
function keyEach(obj, callback) {
  Object.keys(obj).forEach((key, index) => {
    callback(key, obj[key], index);
  });
}
function isUndefined(value) {
  return typeof value == "undefined" || value === null;
}
function isNotUndefined(value) {
  return isUndefined(value) === false;
}
function isString(value) {
  return typeof value == "string";
}
function isObject(value) {
  return typeof value == "object" && !Array.isArray(value) && !isNumber(value) && !isString(value) && value !== null;
}
function isFunction(value) {
  return typeof value == "function";
}
function isNumber(value) {
  return typeof value == "number";
}
const splitMethodByKeyword = (arr, keyword) => {
  const filterKeys = arr.filter((code) => code.indexOf(`${keyword}(`) > -1);
  const filterMaps = filterKeys.map((code) => {
    const [target, param] = code.split(`${keyword}(`)[1].split(")")[0].trim().split(" ");
    return { target, param };
  });
  return [filterKeys, filterMaps];
};
const UUID_REG = /[xy]/g;
function uuid() {
  var dt = new Date().getTime();
  var uuid2 = "xxx12-xx-34xx".replace(UUID_REG, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : r & 3 | 8).toString(16);
  });
  return uuid2;
}
function uuidShort() {
  var dt = new Date().getTime();
  var uuid2 = "idxxxxxxx".replace(UUID_REG, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : r & 3 | 8).toString(16);
  });
  return uuid2;
}
const map = /* @__PURE__ */ new Map();
const aliasMap = {};
const __tempVariables = /* @__PURE__ */ new Map();
const __tempVariablesGroup = /* @__PURE__ */ new Map();
const VARIABLE_SAPARATOR = "v:";
function variable(value, groupId = "") {
  const id = `${VARIABLE_SAPARATOR}${uuidShort()}`;
  __tempVariables.set(id, value);
  if (groupId) {
    __tempVariablesGroup.has(groupId) || __tempVariablesGroup.set(groupId, /* @__PURE__ */ new Set());
    __tempVariablesGroup.get(groupId).add(id);
  }
  return id;
}
function initializeGroupVariables(groupId) {
  if (__tempVariablesGroup.has(groupId)) {
    __tempVariablesGroup.get(groupId).forEach((id) => {
      __tempVariables.delete(id);
    });
    __tempVariablesGroup.delete(groupId);
  }
}
function recoverVariable(id, removeVariable = true) {
  if (isString(id) === false) {
    return id;
  }
  let value = id;
  if (__tempVariables.has(id)) {
    value = __tempVariables.get(id);
    if (removeVariable) {
      __tempVariables.delete(id);
    }
  }
  return value;
}
function getVariable(idOrValue) {
  if (__tempVariables.has(idOrValue)) {
    return __tempVariables.get(idOrValue);
  }
  return idOrValue;
}
function hasVariable(id) {
  return __tempVariables.has(id);
}
function spreadVariable(obj) {
  return Object.entries(obj).map(([key, value]) => {
    return `${key}=${variable(value)}`;
  }).join(" ");
}
function registElement(classes = {}) {
  Object.keys(classes).forEach((key) => {
    if (map.has(key)) {
      return;
    }
    map.set(key, classes[key]);
  });
}
function registAlias(key, value) {
  aliasMap[key] = value;
}
function retriveAlias(key) {
  return aliasMap[key];
}
function retriveElement(className) {
  return map.get(className);
}
class BaseStore {
  constructor(editor) {
    __publicField(this, "cachedCallback");
    __publicField(this, "callbacks");
    __publicField(this, "editor");
    __publicField(this, "source");
    __publicField(this, "promiseProxy");
    this.cachedCallback = {};
    this.callbacks = {};
    this.editor = editor;
    this.promiseProxy = new Proxy(this, {
      get: (target, key) => {
        return this.makePromiseEvent(key);
      }
    });
  }
  getCallbacks(event) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    return this.callbacks[event];
  }
  setCallbacks(event, list = []) {
    this.callbacks[event] = list;
  }
  on(event, originalCallback, context, debounceDelay = 0, throttleDelay = 0, enableAllTrigger = false, enableSelfTrigger = false, beforeMethods = [], frame = false) {
    var callback = originalCallback;
    if (debounceDelay > 0)
      callback = debounce(originalCallback, debounceDelay);
    else if (throttleDelay > 0)
      callback = throttle(originalCallback, throttleDelay);
    if (beforeMethods.length) {
      callback = ifCheck(callback, context, beforeMethods);
    }
    if (frame) {
      callback = makeRequestAnimationFrame(callback, context);
    }
    this.getCallbacks(event).push({ event, callback, context, originalCallback, enableAllTrigger, enableSelfTrigger });
    this.debug("add message event", event, context == null ? void 0 : context.sourceName);
    return () => {
      this.off(event, originalCallback);
    };
  }
  debug(message, event, sourceName) {
  }
  off(event, originalCallback) {
    this.debug("off message event", event);
    if (arguments.length == 1) {
      this.setCallbacks(event);
    } else if (arguments.length == 2) {
      this.setCallbacks(event, this.getCallbacks(event).filter((f) => {
        return f.originalCallback !== originalCallback;
      }));
    }
  }
  offAll(context) {
    Object.keys(this.callbacks).forEach((event) => {
      this.setCallbacks(event, this.getCallbacks(event).filter((f) => {
        return f.context !== context;
      }));
    });
    this.debug("off all message", context.sourceName);
  }
  getCachedCallbacks(event) {
    return this.getCallbacks(event);
  }
  get promise() {
    return this.promiseProxy;
  }
  get p() {
    return this.promise;
  }
  makePromiseEvent(event) {
    var list = this.getCachedCallbacks(event);
    const source = this.source;
    return (...args) => Promise.all(list.filter((f) => {
      return !f.enableSelfTrigger;
    }).filter((f) => {
      return f.enableAllTrigger || f.originalCallback.source !== source;
    }).map((f) => {
      return new Promise((resolve, reject) => {
        resolve(f.callback.apply(f.context, args));
      });
    }));
  }
  sendMessage(source, event, ...args) {
    this.sendMessageList(source, [
      [event, ...args]
    ]);
  }
  sendMessageList(source, messages = []) {
    Promise.resolve().then(() => {
      messages.forEach(([event, ...args]) => {
        var list = this.getCachedCallbacks(event);
        if (list && list.length) {
          const runnableFunctions = list.filter((f) => !f.enableSelfTrigger).filter((f) => f.enableAllTrigger || f.originalCallback.source !== source);
          for (const f of runnableFunctions) {
            const result = f.callback.apply(f.context, args);
            if (isNotUndefined(result)) {
              if (result === false) {
                return;
              } else if (isFunction(result)) {
                result();
                return;
              }
            }
          }
        }
      });
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
        for (var i = 0, len = list.length; i < len; i++) {
          const f = list[i];
          if (f.originalCallback.source === source) {
            f.callback.apply(f.context, args);
          }
        }
      } else {
        console.warn(event, " is not valid event");
      }
    });
  }
  emit(event, ...args) {
    if (isFunction(event)) {
      event(...args);
    } else if (Array.isArray(event)) {
      this.sendMessageList(this.source, event);
    } else {
      this.sendMessage(this.source, event, ...args);
    }
  }
  nextTick(callback) {
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
  if (typeof value === "boolean") {
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
  if (typeof value === "boolean") {
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
  for (var i = 0, len = props.length; i < len; i++) {
    const key = props[i];
    updateProp(node, key, newProps[key], oldProps[key]);
  }
};
function changed(node1, node2) {
  return node1.nodeType === Node.TEXT_NODE && node1.textContent !== node2.textContent || node1.nodeName !== node2.nodeName;
}
function hasPassed(node1) {
  if ((node1 == null ? void 0 : node1.nodeType) === 8) {
    return true;
  }
  return node1.nodeType !== Node.TEXT_NODE && node1.getAttribute("data-domdiff-pass") === "true";
}
function hasRefClass(node1) {
  return node1.nodeType !== Node.TEXT_NODE && node1.getAttribute("refClass");
}
function getProps(attributes) {
  var results = {};
  const len = attributes.length;
  for (let i = 0; i < len; i++) {
    const t = attributes[i];
    results[t.name] = t.value;
  }
  return results;
}
function updateElement(parentElement, oldEl, newEl, i, options = {}) {
  if (!oldEl) {
    parentElement.appendChild(newEl.cloneNode(true));
  } else if (!newEl) {
    parentElement.removeChild(oldEl);
  } else if (hasPassed(oldEl) || hasPassed(newEl))
    ;
  else if (changed(newEl, oldEl) || hasRefClass(newEl)) {
    parentElement.replaceChild(newEl.cloneNode(true), oldEl);
  } else if (newEl.nodeType !== Node.TEXT_NODE && newEl.nodeType !== Node.COMMENT_NODE && newEl.toString() !== "[object HTMLUnknownElement]") {
    if (options.checkPassed && options.checkPassed(oldEl, newEl))
      ;
    else {
      updateProps(oldEl, getProps(newEl.attributes), getProps(oldEl.attributes));
    }
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
    return [];
  }
  var results = [];
  do {
    results.push(element);
    element = element.nextSibling;
  } while (element);
  return results;
};
function DomDiff(A, B, options = {}) {
  options.checkPassed = isFunction(options.checkPassed) ? options.checkPassed : void 0;
  options.removedElements = [];
  A = A.el || A;
  B = B.el || B;
  var childrenA = children(A);
  var childrenB = children(B);
  var len = Math.max(childrenA.length, childrenB.length);
  for (var i = 0; i < len; i++) {
    updateElement(A, childrenA[i], childrenB[i], i, options);
  }
}
class Dom {
  constructor(tag, className = "", attr = {}) {
    __publicField(this, "el");
    if (typeof tag !== "string") {
      this.el = tag;
    } else {
      var el = document.createElement(tag);
      if (className) {
        el.className = className;
      }
      for (var k in attr) {
        el.setAttribute(k, attr[k]);
      }
      this.el = el;
    }
  }
  static create(tag, className = "", attr = {}) {
    return new Dom(tag, className, attr);
  }
  static createByHTML(htmlString) {
    var div = Dom.create("div");
    var list = div.html(htmlString).children();
    if (list.length) {
      return Dom.create(list[0].el);
    }
    return null;
  }
  static getScrollTop() {
    return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  }
  static getScrollLeft() {
    return Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft);
  }
  static parse(html) {
    var parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }
  static body() {
    return Dom.create(document.body);
  }
  get htmlEl() {
    return this.el;
  }
  get inputEl() {
    return this.el;
  }
  get svgEl() {
    return this.el;
  }
  setAttr(obj) {
    Object.keys(obj).forEach((key) => {
      this.attr(key, obj[key]);
    });
    return this;
  }
  setAttrNS(obj, namespace = "http://www.w3.org/2000/svg") {
    Object.keys(obj).forEach((key) => {
      this.attrNS(key, obj[key], namespace);
    });
    return this;
  }
  setProp(obj) {
    Object.keys(obj).forEach((key) => {
      if (this.htmlEl[key] != obj[key]) {
        this.htmlEl[key] = obj[key];
      }
    });
    return this;
  }
  data(key, value) {
    if (arguments.length === 1) {
      return this.attr("data-" + key);
    } else if (arguments.length === 2) {
      return this.attr("data-" + key, value);
    }
    return this;
  }
  attr(key, value) {
    var _a, _b;
    if (arguments.length == 1) {
      return (_b = (_a = this.htmlEl).getAttribute) == null ? void 0 : _b.call(_a, key);
    }
    if (this.htmlEl.getAttribute(key) != value) {
      this.htmlEl.setAttribute(key, `${value}`);
    }
    return this;
  }
  attrNS(key, value, namespace = "http://www.w3.org/2000/svg") {
    if (arguments.length == 1) {
      return this.svgEl.getAttributeNS(namespace, key);
    }
    if (this.svgEl.getAttributeNS(namespace, key) != value) {
      this.svgEl.setAttributeNS(namespace, key, value);
    }
    return this;
  }
  attrKeyValue(keyField) {
    return {
      [`${this.htmlEl.getAttribute(keyField)}`]: this.val()
    };
  }
  attrs(...args) {
    return args.map((key) => {
      return this.htmlEl.getAttribute(key);
    });
  }
  styles(...args) {
    return args.map((key) => {
      return this.htmlEl.style[key];
    });
  }
  removeAttr(key) {
    this.htmlEl.removeAttribute(key);
    return this;
  }
  removeStyle(key) {
    this.htmlEl.style.removeProperty(key);
    return this;
  }
  is(checkElement) {
    return this.htmlEl === (checkElement.el || checkElement);
  }
  isTag(tag) {
    return this.htmlEl.tagName.toLowerCase() === tag.toLowerCase();
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
    if (!this.htmlEl)
      return [];
    let pathList = [this];
    let $parentNode = this.parent();
    if (!$parentNode.el)
      return pathList;
    while ($parentNode) {
      pathList.unshift($parentNode);
      $parentNode = $parentNode.parent();
      if (!$parentNode.el)
        break;
    }
    return pathList;
  }
  get $parent() {
    return this.parent();
  }
  parent() {
    return Dom.create(this.htmlEl.parentNode);
  }
  hasParent() {
    return !!this.htmlEl.parentNode;
  }
  removeClass(...args) {
    this.htmlEl.classList.remove(...args);
    return this;
  }
  hasClass(cls) {
    if (!this.htmlEl.classList)
      return false;
    return this.htmlEl.classList.contains(cls);
  }
  addClass(...args) {
    this.htmlEl.classList.add(...args);
    return this;
  }
  onlyOneClass(cls) {
    var parent = this.parent();
    parent.children().forEach((it) => {
      it.removeClass(cls);
    });
    this.addClass(cls);
  }
  toggleClass(cls, isForce) {
    this.htmlEl.classList.toggle(cls, isForce);
    return this;
  }
  html(html) {
    try {
      if (typeof html === "undefined") {
        return this.htmlEl.innerHTML;
      }
      if (typeof html === "string") {
        Object.assign(this.el, { innerHTML: html });
      } else {
        this.empty().append(html);
      }
      return this;
    } catch (e) {
      console.log(e, html);
      return this;
    }
  }
  htmlDiff(fragment) {
    DomDiff(this, fragment);
  }
  updateDiff(html, rootElement = "div") {
    DomDiff(this, Dom.create(rootElement).html(html));
  }
  updateSVGDiff(html, rootElement = "div") {
    DomDiff(this, Dom.create(rootElement).html(`<svg>${html}</svg>`).firstChild.firstChild);
  }
  find(selector) {
    return this.htmlEl.querySelector(selector);
  }
  $(selector) {
    var node = this.find(selector);
    return node ? Dom.create(node) : null;
  }
  findAll(selector) {
    return Array.from(this.htmlEl.querySelectorAll(selector));
  }
  $$(selector) {
    var arr = this.findAll(selector);
    return arr.map((node) => Dom.create(node));
  }
  empty() {
    while (this.htmlEl.firstChild)
      this.htmlEl.removeChild(this.htmlEl.firstChild);
    return this;
  }
  append(el) {
    if (typeof el === "string") {
      this.htmlEl.appendChild(document.createTextNode(el));
    } else {
      this.htmlEl.appendChild(el.el || el);
    }
    return this;
  }
  prepend(el) {
    if (typeof el === "string") {
      this.htmlEl.prepend(document.createTextNode(el));
    } else {
      this.htmlEl.prepend(el.el || el);
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
  createChildrenFragment() {
    const list = this.children();
    var fragment = document.createDocumentFragment();
    list.forEach(($el) => fragment.appendChild($el.el));
    return fragment;
  }
  appendTo(target) {
    var t = target.el ? target.el : target;
    t.appendChild(this.htmlEl);
    return this;
  }
  remove() {
    if (this.htmlEl.parentNode) {
      this.htmlEl.parentNode.removeChild(this.htmlEl);
    }
    return this;
  }
  removeChild(el) {
    this.htmlEl.removeChild(el.el || el);
    return this;
  }
  text(value) {
    if (typeof value === "undefined") {
      return this.htmlEl.textContent;
    } else {
      var tempText = value;
      if (value instanceof Dom) {
        tempText = value.text();
      }
      if (this.htmlEl.textContent !== tempText) {
        this.htmlEl.textContent = tempText;
      }
      return this;
    }
  }
  css(key, value) {
    const el = this.htmlEl;
    if (typeof key === "string" && typeof value !== "undefined") {
      if (key.indexOf("--") === 0 && typeof value !== "undefined") {
        el.style.setProperty(key, value);
      } else {
        el.style[key] = value;
      }
    } else if (typeof key !== "undefined") {
      if (typeof key === "string") {
        return getComputedStyle(el)[key];
      } else {
        Object.entries(key).forEach(([localKey, value2]) => {
          if (localKey.indexOf("--") === 0 && typeof value2 !== "undefined") {
            el.style.setProperty(localKey, value2);
          } else {
            el.style[localKey] = value2;
          }
        });
      }
    }
    return this;
  }
  getComputedStyle(...list) {
    var css = getComputedStyle(this.htmlEl);
    var obj = {};
    list.forEach((it) => {
      obj[it] = css[it];
    });
    return obj;
  }
  getStyleList(...list) {
    const el = this.htmlEl;
    var style = {};
    var len = el.style.length;
    for (var i = 0; i < len; i++) {
      var key = el.style[i];
      style[key] = el.style[key];
    }
    list.forEach((key2) => {
      style[key2] = this.css(key2);
    });
    return style;
  }
  cssText(value) {
    const el = this.htmlEl;
    if (typeof value === "undefined") {
      return el.style.cssText;
    }
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
    return this.htmlEl.getBoundingClientRect();
  }
  bbox() {
    return this.el.getBBox();
  }
  isSVG() {
    return this.htmlEl.tagName.toUpperCase() === "SVG";
  }
  offsetRect() {
    const el = this.htmlEl;
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
      };
    }
    return {
      x: el.offsetLeft,
      y: el.offsetTop,
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
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
    if (this.htmlEl.style.top) {
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
    return this.htmlEl.offsetWidth || this.rect().width;
  }
  contentWidth() {
    return this.width() - this.cssFloat("padding-left") - this.cssFloat("padding-right");
  }
  height() {
    return this.htmlEl.offsetHeight || this.rect().height;
  }
  contentHeight() {
    return this.height() - this.cssFloat("padding-top") - this.cssFloat("padding-bottom");
  }
  val(value) {
    if (typeof value === "undefined") {
      return this.inputEl.value;
    } else if (typeof value !== "undefined") {
      var tempValue = value;
      if (value instanceof Dom) {
        tempValue = value.val();
      } else {
        this.inputEl.value = tempValue;
      }
    }
    return this;
  }
  matches(selector) {
    if (this.htmlEl) {
      if (!this.htmlEl.matches)
        return null;
      if (this.htmlEl.matches(selector)) {
        return this;
      }
      return this.parent().matches(selector);
    }
    return null;
  }
  get value() {
    return this.inputEl.value;
  }
  get files() {
    return this.inputEl.files ? Array.from(this.inputEl.files) : [];
  }
  show(displayType = "block") {
    this.htmlEl.style.display = displayType != "none" ? displayType : "block";
    return this;
  }
  hide() {
    this.htmlEl.style.display = "none";
    return this;
  }
  isHide() {
    return this.htmlEl.style.display === "none";
  }
  isShow() {
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
  scrollIntoView() {
    this.htmlEl.scrollIntoView();
  }
  addScrollLeft(dt) {
    this.htmlEl.scrollLeft += dt;
    return this;
  }
  addScrollTop(dt) {
    this.htmlEl.scrollTop += dt;
    return this;
  }
  setScrollTop(scrollTop) {
    this.htmlEl.scrollTop = scrollTop;
    return this;
  }
  setScrollLeft(scrollLeft) {
    this.htmlEl.scrollLeft = scrollLeft;
    return this;
  }
  scrollTop() {
    if (this.htmlEl === document.body) {
      return Dom.getScrollTop();
    }
    return this.htmlEl.scrollTop;
  }
  scrollLeft() {
    if (this.htmlEl === document.body) {
      return Dom.getScrollLeft();
    }
    return this.htmlEl.scrollLeft;
  }
  scrollHeight() {
    return this.htmlEl.scrollHeight;
  }
  scrollWidth() {
    return this.htmlEl.scrollWidth;
  }
  on(eventName, callback, opt1) {
    this.htmlEl.addEventListener(eventName, callback, opt1);
    return this;
  }
  off(eventName, callback) {
    this.htmlEl.removeEventListener(eventName, callback);
    return this;
  }
  getElement() {
    return this.htmlEl;
  }
  createChild(tag, className = "", attrs = {}, css = {}) {
    let $element = Dom.create(tag, className, attrs);
    $element.css(css);
    this.append($element);
    return $element;
  }
  get firstChild() {
    return Dom.create(this.htmlEl.firstElementChild);
  }
  children() {
    var element = this.htmlEl.firstElementChild;
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
    return this.htmlEl.children.length;
  }
  replace(newElement) {
    if (this.htmlEl.parentNode) {
      this.htmlEl.parentNode.replaceChild(newElement.el || newElement, this.htmlEl);
    }
    return this;
  }
  replaceChild(oldElement, newElement) {
    this.htmlEl.replaceChild(newElement.el || newElement, oldElement.el || oldElement);
    return this;
  }
  checked(isChecked = false) {
    if (arguments.length == 0) {
      return !!this.inputEl.checked;
    }
    this.inputEl.checked = !!isChecked;
    return this;
  }
  click() {
    this.htmlEl.click();
    return this;
  }
  focus() {
    this.htmlEl.focus();
    return this;
  }
  select() {
    if (this.attr("contenteditable") === "true") {
      var range = document.createRange();
      range.selectNodeContents(this.htmlEl);
      var sel = window.getSelection();
      sel == null ? void 0 : sel.removeAllRanges();
      sel == null ? void 0 : sel.addRange(range);
    } else {
      this.inputEl.select();
    }
    return this;
  }
  blur() {
    this.htmlEl.blur();
    return this;
  }
}
class BaseHandler {
  constructor(context, options = {}) {
    __publicField(this, "context");
    __publicField(this, "options");
    this.context = context;
    this.options = options;
  }
  initialize() {
  }
  load() {
  }
  refresh() {
  }
  render() {
  }
  getRef(id) {
    return this.context.getRef(id);
  }
  run() {
  }
  destroy() {
  }
}
const scrollBlockingEvents = {
  "touchstart": true,
  "touchmove": true,
  "mousedown": true,
  "mouseup": true,
  "mousemove": true
};
const eventConverts = {
  "doubletab": "touchend"
};
const customEventNames = {
  "doubletab": true
};
class DomEventHandler extends BaseHandler {
  constructor() {
    super(...arguments);
    __publicField(this, "_domEvents");
    __publicField(this, "_bindings");
    __publicField(this, "doubleTab");
  }
  initialize() {
    this.destroy();
    if (this._domEvents && this.context.notEventRedefine) {
      return;
    }
    if (!this._domEvents) {
      this._domEvents = this.context.filterProps(CHECK_DOM_EVENT_PATTERN);
    }
    this._domEvents.forEach((key) => this.parseDomEvent(key));
  }
  destroy() {
    if (this.context.notEventRedefine)
      ;
    else {
      this.removeEventAll();
    }
  }
  removeEventAll() {
    var _a;
    (_a = this.getBindings()) == null ? void 0 : _a.forEach((obj) => {
      this.removeDomEvent(obj);
    });
    this.initBindings();
  }
  removeDomEvent({ eventName, dom, callback }) {
    if (dom) {
      Event.removeDomEvent(dom, eventName, callback);
    }
  }
  getBindings() {
    if (!this._bindings) {
      this.initBindings();
    }
    return this._bindings;
  }
  addBinding(obj) {
    var _a;
    (_a = this.getBindings()) == null ? void 0 : _a.push(obj);
  }
  initBindings() {
    this._bindings = [];
  }
  matchPath(el, selector) {
    if (el) {
      if (el.matches(selector)) {
        return el;
      }
      return this.matchPath(el.parentElement, selector);
    }
    return null;
  }
  hasDelegate(e, eventObject) {
    return this.matchPath(e.target || e.srcElement, eventObject.delegate);
  }
  makeCallback(eventObject, callback) {
    if (eventObject.delegate) {
      return this.makeDelegateCallback(eventObject, callback);
    } else {
      return this.makeDefaultCallback(eventObject, callback);
    }
  }
  makeDefaultCallback(eventObject, callback) {
    return (e) => {
      var returnValue = this.runEventCallback(e, eventObject, callback);
      if (isNotUndefined(returnValue)) {
        return returnValue;
      }
    };
  }
  makeDelegateCallback(eventObject, callback) {
    return (e) => {
      const delegateTarget = this.hasDelegate(e, eventObject);
      if (delegateTarget) {
        e.$dt = Dom.create(delegateTarget);
        var returnValue = this.runEventCallback(e, eventObject, callback);
        if (isNotUndefined(returnValue)) {
          return returnValue;
        }
      }
    };
  }
  runEventCallback(e, eventObject, callback) {
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
        eventObject.afterMethods.forEach((after) => {
          return context[after.target].call(context, e, after.param);
        });
      }
      return returnValue;
    }
  }
  checkEventType(e, eventObject) {
    const context = this.context;
    var hasKeyCode = true;
    if (eventObject.codes.length) {
      hasKeyCode = (e.code ? eventObject.codes.indexOf(e.code.toLowerCase()) > -1 : false) || (e.key ? eventObject.codes.indexOf(e.key.toLowerCase()) > -1 : false);
    }
    var isAllCheck = true;
    if (eventObject.checkMethodList.length) {
      isAllCheck = eventObject.checkMethodList.every((field) => {
        var fieldValue = context[field];
        if (isFunction(fieldValue) && fieldValue) {
          return fieldValue.call(context, e);
        } else if (isNotUndefined(fieldValue)) {
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
    if (typeof dom === "string" && dom) {
      el = context.refs[dom] || context[dom] || window[dom];
    } else {
      el = context.el || context.$el || context.$root;
    }
    if (el instanceof Dom) {
      return el.getElement();
    }
    return el;
  }
  getRealEventName(eventName) {
    return eventConverts[eventName] || eventName;
  }
  getCustomEventName(eventName) {
    return customEventNames[eventName] ? eventName : "";
  }
  getDefaultEventObject(eventName, checkMethodFilters) {
    const context = this.context;
    let arr = checkMethodFilters;
    const checkMethodList = arr.filter((code) => !!context[code]);
    const [afters, afterMethods] = splitMethodByKeyword(arr, "after");
    const [befores, beforeMethods] = splitMethodByKeyword(arr, "before");
    const [debounces, debounceMethods] = splitMethodByKeyword(arr, "debounce");
    const [delays, delayMethods] = splitMethodByKeyword(arr, "delay");
    const [throttles, throttleMethods] = splitMethodByKeyword(arr, "throttle");
    const [captures] = splitMethodByKeyword(arr, "capture");
    const filteredList = [
      ...checkMethodList,
      ...afters,
      ...befores,
      ...delays,
      ...debounces,
      ...throttles,
      ...captures
    ];
    var codes = arr.filter((code) => filteredList.indexOf(code) === -1).map((code) => code.toLowerCase());
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
  addDomEvent(eventObject, callback) {
    eventObject.callback = this.makeCallback(eventObject, callback);
    this.addBinding(eventObject);
    var options = !!eventObject.captures.length;
    if (scrollBlockingEvents[eventObject.eventName]) {
      options = {
        passive: true,
        capture: options
      };
    }
    if (eventObject == null ? void 0 : eventObject.dom) {
      Event.addDomEvent(eventObject == null ? void 0 : eventObject.dom, eventObject.eventName, eventObject.callback, options);
    }
  }
  makeCustomEventCallback(eventObject, callback) {
    if (eventObject.customEventName === "doubletab") {
      var delay = 300;
      if (eventObject.delayMethods.length) {
        delay = +eventObject.delayMethods[0].target;
      }
      return (...args) => {
        if (!this.doubleTab) {
          this.doubleTab = {
            time: performance.now()
          };
        } else {
          if (performance.now() - this.doubleTab.time < delay) {
            callback(...args);
          }
          this.doubleTab = null;
        }
      };
    }
    return callback;
  }
  bindingDomEvent([eventName, dom, ...delegate], checkMethodFilters, callback) {
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
    callback = this.makeCustomEventCallback(eventObject, callback);
    this.addDomEvent(eventObject, callback);
  }
  getEventNames(eventName) {
    let results = [];
    eventName.split(NAME_SAPARATOR).forEach((e) => {
      var arr = e.split(NAME_SAPARATOR);
      results.push.apply(results, arr);
    });
    return results;
  }
  parseDomEvent(key) {
    const context = this.context;
    let checkMethodFilters = key.split(CHECK_SAPARATOR).map((it) => it.trim()).filter(Boolean);
    var prefix = checkMethodFilters.shift();
    var eventSelectorAndBehave = prefix == null ? void 0 : prefix.split(DOM_EVENT_SAPARATOR)[1];
    var arr = eventSelectorAndBehave == null ? void 0 : eventSelectorAndBehave.split(SAPARATOR);
    if (arr) {
      var eventNames = this.getEventNames(arr[0]);
      var callback = context[key].bind(context);
      for (let i = 0, len = eventNames.length; i < len; i++) {
        arr[0] = eventNames[i];
        this.bindingDomEvent(arr, checkMethodFilters, callback);
      }
    }
  }
}
const convertToPx = (key, value) => {
  if (isNumber(value)) {
    switch (key) {
      case "width":
      case "height":
      case "top":
      case "left":
      case "right":
      case "bottom":
        return value + "px";
    }
  }
  return value;
};
const applyElementAttribute = ($element, key, value) => {
  if (key === "cssText") {
    $element.cssText(value);
    return;
  } else if (key === "style") {
    if (typeof value !== "string") {
      const css = {};
      Object.entries(value).forEach(([key2, value2]) => {
        css[key2] = convertToPx(key2, value2);
      });
      $element.css(value);
    }
    return;
  } else if (key === "class") {
    if (Array.isArray(value)) {
      $element.addClass(...value == null ? void 0 : value.filter(Boolean));
    } else if (isObject(value)) {
      const keys = Object.keys(value);
      for (var i = 0, len = keys.length; i < len; i++) {
        const className = keys[i];
        const hasClass = value[className];
        $element.toggleClass(className, hasClass);
      }
    } else {
      $element.htmlEl.className = value;
    }
    return;
  } else if (key === "callback") {
    if (typeof value === "function") {
      value();
      return;
    }
  }
  if (typeof value === "undefined") {
    $element.removeAttr(key);
  } else {
    if ($element.el.nodeName === "TEXTAREA" && key === "value") {
      $element.text(value);
    } else if (key === "text" || key === "textContent") {
      $element.text(value);
    } else if (key === "innerHTML" || key === "html") {
      $element.html(value);
    } else if (key === "htmlDiff") {
      $element.updateDiff(value);
    } else if (key === "svgDiff") {
      $element.updateSVGDiff(value);
    } else if (key === "value") {
      $element.val(value);
    } else {
      $element.attr(key, value);
    }
  }
};
class BindHandler extends BaseHandler {
  constructor() {
    super(...arguments);
    __publicField(this, "_bindMethods");
  }
  load(...args) {
    this.bindData(...args);
  }
  bindData(...args) {
    var _a;
    if (!this._bindMethods) {
      this._bindMethods = this.context.filterProps(CHECK_BIND_PATTERN);
    }
    const bindList = (_a = this._bindMethods) == null ? void 0 : _a.filter((originalCallbackName) => {
      if (!args.length)
        return true;
      var [callbackName, id] = originalCallbackName.split(CHECK_SAPARATOR);
      var [_, $bind] = callbackName.split(" ");
      return args.indexOf($bind) > -1;
    });
    bindList == null ? void 0 : bindList.forEach(async (callbackName) => {
      const bindMethod = this.context[callbackName];
      var [callbackName, id] = callbackName.split(CHECK_SAPARATOR);
      const refObject = this.getRef(id);
      let refCallback = BIND_CHECK_DEFAULT_FUNCTION;
      if (typeof refObject === "string" && refObject !== "") {
        refCallback = BIND_CHECK_FUNCTION(refObject);
      } else if (typeof refObject === "function") {
        refCallback = refObject;
      }
      const elName = callbackName.split(BIND_SAPARATOR)[1];
      let $element = this.context.refs[elName];
      const isBindCheck = typeof refCallback === "function" && refCallback.call(this.context);
      if ($element && isBindCheck) {
        const results = await bindMethod.call(this.context, ...args);
        if (!results)
          return;
        const keys = Object.keys(results);
        for (var elementKeyIndex = 0, len = keys.length; elementKeyIndex < len; elementKeyIndex++) {
          const key = keys[elementKeyIndex];
          const value = results[key];
          applyElementAttribute($element, key, value);
        }
      }
    });
  }
  destroy() {
    this._bindMethods = void 0;
  }
}
class CallbackHandler extends BaseHandler {
  constructor() {
    super(...arguments);
    __publicField(this, "_callbacks", []);
    __publicField(this, "_bindings");
  }
  initialize() {
    this.destroy();
    if (!this._callbacks) {
      this._callbacks = this.context.filterProps(CHECK_CALLBACK_PATTERN);
    }
    this._callbacks.forEach((key) => this.parseCallback(key));
  }
  destroy() {
    if (this.context.notEventRedefine)
      ;
    else {
      this.removeCallbackAll();
    }
  }
  removeCallbackAll() {
    this.getBindings().forEach((obj) => {
      this.removeCallback(obj);
    });
    this.initBindings();
  }
  removeCallback({ animationFrameId }) {
    cancelAnimationFrame(animationFrameId);
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
  makeCallback(callbackObject, callback) {
    const run = (time) => {
      callback(time);
      callbackObject.requestId = requestAnimationFrame(run);
    };
    return () => {
      callbackObject.requestId = requestAnimationFrame(run);
    };
  }
  getDefaultCallbackObject(callbackName, checkMethodFilters) {
    const context = this.context;
    let arr = checkMethodFilters;
    const checkMethodList = arr.filter((code) => !!context[code]);
    const [afters, afterMethods] = splitMethodByKeyword(arr, "after");
    const [befores, beforeMethods] = splitMethodByKeyword(arr, "before");
    const [debounces, debounceMethods] = splitMethodByKeyword(arr, "debounce");
    const [delays, delayMethods] = splitMethodByKeyword(arr, "delay");
    const [throttles, throttleMethods] = splitMethodByKeyword(arr, "throttle");
    const [captures] = splitMethodByKeyword(arr, "capture");
    [
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
  addCallback(callbackObject, callback) {
    callbackObject.callback = this.makeCallback(callbackObject, callback);
    this.addBinding(callbackObject);
    callbackObject.callback();
  }
  bindingCallback(callbackName, checkMethodFilters, originalCallback) {
    let callbackObject = this.getDefaultCallbackObject(callbackName, checkMethodFilters);
    if (callbackObject.debounceMethods.length) {
      var debounceTime = +callbackObject.debounceMethods[0].target;
      originalCallback = debounce(originalCallback, debounceTime);
    } else if (callbackObject.throttleMethods.length) {
      var throttleTime = +callbackObject.throttleMethods[0].target;
      originalCallback = throttle(originalCallback, throttleTime);
    }
    this.addCallback(callbackObject, originalCallback);
  }
  parseCallback(key) {
    const context = this.context;
    let checkMethodFilters = key.split(CHECK_SAPARATOR).map((it) => it.trim()).filter(Boolean);
    var prefix = checkMethodFilters.shift();
    var callbackName = prefix.split(CALLBACK_SAPARATOR)[1];
    var originalCallback = context[key].bind(context);
    this.bindingCallback(callbackName, checkMethodFilters, originalCallback);
  }
}
const REFERENCE_PROPERTY = "ref";
const TEMP_DIV = Dom.create("div");
const QUERY_PROPERTY = `[${REFERENCE_PROPERTY}]`;
const REF_CLASS = "refclass";
const REF_CLASS_PROPERTY = `[${REF_CLASS}]`;
class EventMachine {
  constructor(opt, props) {
    __publicField(this, "state");
    __publicField(this, "prevState");
    __publicField(this, "children");
    __publicField(this, "id");
    __publicField(this, "__tempVariables");
    __publicField(this, "handlers");
    __publicField(this, "_loadMethods");
    __publicField(this, "__cachedMethodList");
    __publicField(this, "el");
    __publicField(this, "$el");
    __publicField(this, "$root");
    __publicField(this, "refs");
    __publicField(this, "opt");
    __publicField(this, "parent");
    __publicField(this, "props");
    __publicField(this, "source");
    __publicField(this, "sourceName");
    __publicField(this, "childComponents");
    __publicField(this, "_localTimestamp");
    __publicField(this, "_$store");
    this.state = {};
    this.prevState = {};
    this.refs = {};
    this.children = {};
    this._localTimestamp = 0;
    this.id = uuid();
    this.__tempVariables = /* @__PURE__ */ new Map();
    this.handlers = this.initializeHandler();
    this.initializeProperty(opt, props);
    this.initComponents();
  }
  get $store() {
    return this._$store;
  }
  set $store(value) {
    this._$store = value;
  }
  get _timestamp() {
    return this._localTimestamp++;
  }
  get target() {
    var _a;
    return (_a = this.$el) == null ? void 0 : _a.el;
  }
  initializeProperty(opt, props = {}) {
    this.opt = opt || {};
    this.parent = this.opt;
    this.props = props;
    this.source = uuid();
    this.sourceName = this.constructor.name;
  }
  initComponents() {
    this.childComponents = this.components();
  }
  initializeHandler() {
    return [
      new BindHandler(this),
      new DomEventHandler(this),
      new CallbackHandler(this)
    ];
  }
  initState() {
    return {};
  }
  setState(state = {}, isLoad = true) {
    this.prevState = this.state;
    this.state = Object.assign({}, this.state, state);
    if (isLoad) {
      this.load();
    }
  }
  toggleState(key, isLoad = true) {
    this.setState({
      [key]: !this.state[key]
    }, isLoad);
  }
  apply(obj) {
    return spreadVariable(obj);
  }
  _reload(props, $container) {
    if ($container) {
      this.render($container);
    }
    this.props = props;
    this.state = {};
    this.setState(this.initState(), false);
    this.refresh();
  }
  render($container) {
    this.$el = this.parseTemplate(`${this.template()}`);
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
  afterRender() {
  }
  components() {
    return {};
  }
  getRef(...args) {
    const key = args.join("");
    return this.refs[key];
  }
  parseTemplate(html, isLoad = false) {
    if (Array.isArray(html)) {
      html = html.join("");
    }
    html = html.trim();
    const list = TEMP_DIV.html(html).children();
    for (var i = 0, len = list.length; i < len; i++) {
      const $el = list[i];
      var ref = $el.attr(REFERENCE_PROPERTY);
      if (ref) {
        this.refs[ref] = $el;
      }
      var refs = $el.$$(QUERY_PROPERTY);
      var temp = {};
      for (var refsIndex = 0, refsLen = refs.length; refsIndex < refsLen; refsIndex++) {
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
    if (!isLoad && list.length) {
      return list[0];
    }
    return Dom.create(TEMP_DIV.createChildrenFragment());
  }
  parsePropertyInfo($dom) {
    let props = {};
    for (var t of $dom.htmlEl.attributes) {
      if (hasVariable(t.nodeName)) {
        const recoveredValue = getVariable(t.nodeName);
        if (isObject(recoveredValue)) {
          props = Object.assign(props, recoveredValue);
        } else {
          props[t.nodeName] = getVariable(t.nodeValue);
        }
      } else {
        props[t.nodeName] = getVariable(t.nodeValue);
      }
    }
    const content = $dom.html();
    if (content) {
      props.content = content;
      props.contentChildren = this.parseContent(props.content);
    }
    return props;
  }
  parseSourceName(obj) {
    if (obj.parent) {
      return [obj.sourceName, ...this.parseSourceName(obj.parent)];
    }
    return [obj.sourceName];
  }
  getEventMachineComponent(refClassName) {
    var EventMachineComponent = retriveElement(refClassName) || this.childComponents[refClassName];
    return EventMachineComponent;
  }
  createInstanceForComponent(EventMachineComponent, targetElement, props = {}) {
    if (EventMachineComponent.__proto__.name === "ProxyComponent") {
      return new EventMachineComponent({ target: targetElement, props });
    }
    return new EventMachineComponent(this, props);
  }
  renderComponent({ $dom, refName, component, props }) {
    var _a;
    var instance = null;
    if (this.children[refName]) {
      instance = this.children[refName];
      instance.__timestamp = this._localTimestamp;
      instance._reload(props);
    } else {
      instance = this.createInstanceForComponent(component, $dom.$parent.el, props);
      instance.__timestamp = this._localTimestamp;
      this.children[refName || instance.id] = instance;
      if (isFunction(instance.render)) {
        instance.render();
      }
    }
    if (instance.renderTarget) {
      (_a = instance.$el) == null ? void 0 : _a.appendTo(instance.renderTarget);
      $dom.remove();
    } else if (instance.$el) {
      $dom.replace(instance.$el);
    } else {
      $dom.remove();
    }
  }
  parseContent(html, filteredRefClass = []) {
    return Dom.create("div").html(html).children().map(($dom) => {
      return this._getComponentInfo($dom);
    }).filter((it) => filteredRefClass.length === 0 ? true : filteredRefClass.includes(it.refClass));
  }
  _getComponentInfo($dom) {
    const refClass = $dom.attr(REF_CLASS);
    const EventMachineComponent = this.getEventMachineComponent(refClass);
    if (EventMachineComponent) {
      let props = this.parsePropertyInfo($dom);
      let refName = $dom.attr(REFERENCE_PROPERTY);
      return {
        $dom,
        refClass,
        props,
        refName: refName || props.ref,
        component: EventMachineComponent
      };
    } else {
      return {
        notUsed: true,
        $dom
      };
    }
  }
  getComponentInfoList($el) {
    if (!$el)
      return [];
    const children2 = [];
    let targets = $el.$$(REF_CLASS_PROPERTY).filter((it) => {
      return it.path().filter((a) => {
        return a.attr(REF_CLASS);
      }).length === 1;
    });
    targets.forEach(($dom) => {
      children2.push(this._getComponentInfo($dom));
    });
    return children2;
  }
  parseComponent() {
    const $el = this.$el;
    const componentList = this.getComponentInfoList($el);
    componentList.forEach((comp) => {
      if (comp.notUsed) {
        comp.$dom.remove();
      } else {
        this.renderComponent(comp);
      }
    });
    keyEach(this.children, (key, child) => {
      if (child.__timestamp !== this._localTimestamp) {
        child.clean();
      }
    });
  }
  clean() {
    if (this.$el && !this.$el.hasParent()) {
      keyEach(this.children, (key, child) => {
        if (isFunction(child == null ? void 0 : child.clean)) {
          child.clean();
        }
      });
      this.destroy();
      this.$el = null;
      return true;
    }
  }
  refresh() {
    this.load();
  }
  _afterLoad() {
    this.runHandlers("initialize");
    this.bindData();
    this.parseComponent();
  }
  async load(...args) {
    if (!this._loadMethods) {
      this._loadMethods = this.filterProps(CHECK_LOAD_PATTERN);
    }
    const localLoadMethods = this._loadMethods.filter((callbackName) => {
      const elName = callbackName.split(LOAD_SAPARATOR)[1].split(CHECK_SAPARATOR).map((it) => it.trim())[0];
      if (!args.length)
        return true;
      return args.indexOf(elName) > -1;
    });
    await localLoadMethods.forEach(async (callbackName) => {
      let methodName = callbackName.split(LOAD_SAPARATOR)[1];
      var [elName, ...checker] = methodName.split(CHECK_SAPARATOR).map((it) => it.trim());
      checker = checker.map((it) => it.trim());
      const isDomDiff = Boolean(checker.filter((it) => DOMDIFF.includes(it)).length);
      const refTarget = this.refs[elName];
      if (refTarget) {
        var newTemplate = await this[callbackName].call(this, ...args);
        if (Array.isArray(newTemplate)) {
          newTemplate = newTemplate.join("");
        }
        const fragment = this.parseTemplate(newTemplate, true);
        if (isDomDiff) {
          this.refs[elName].htmlDiff(fragment);
        } else {
          this.refs[elName].html(fragment);
        }
      }
    });
    this._afterLoad();
  }
  runHandlers(func = "run", ...args) {
    this.handlers.forEach((h) => h[func](...args));
  }
  bindData(...args) {
    this.runHandlers("load", ...args);
  }
  template() {
    return null;
  }
  eachChildren(callback) {
    if (!isFunction(callback))
      return;
    keyEach(this.children, (_, Component) => {
      callback(Component);
    });
  }
  rerender() {
    var $parent = this.$el.parent();
    this.destroy();
    this.render($parent);
  }
  destroy() {
    this.eachChildren((childComponent) => {
      childComponent.destroy();
    });
    this.runHandlers("destroy");
    if (this.$el) {
      this.$el.remove();
    }
    this.$el = null;
    this.refs = {};
    this.children = {};
  }
  collectProps() {
    if (!this.__cachedMethodList) {
      this.__cachedMethodList = collectProps(this, (name) => {
        return name.indexOf(MAGIC_METHOD) === 0;
      });
    }
    return this.__cachedMethodList;
  }
  filterProps(pattern) {
    return this.collectProps().filter((key) => {
      return key.match(pattern);
    });
  }
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
    return e.metaKey || e.key == "Meta" || e.code.indexOf("Meta") > -1;
  }
  isMouseLeftButton(e) {
    return e.buttons === 1;
  }
  isMouseRightButton(e) {
    return e.buttons === 2;
  }
  hasMouse(e) {
    return e.pointerType === "mouse";
  }
  hasTouch(e) {
    return e.pointerType === "touch";
  }
  hasPen(e) {
    return e.pointerType === "pen";
  }
  preventDefault(e) {
    e.preventDefault();
    return true;
  }
  stopPropagation(e) {
    e.stopPropagation();
    return true;
  }
}
class UIElement extends EventMachine {
  constructor(opt, props = {}) {
    super(opt, props);
    __publicField(this, "__storeInstance");
    __publicField(this, "attributes");
    if (props == null ? void 0 : props.store) {
      this.__storeInstance = props.store;
    } else {
      this.__storeInstance = new BaseStore();
    }
    this.created();
    this.initialize();
    this.initializeStoreEvent();
  }
  setStore(storeInstance) {
    this.__storeInstance = storeInstance;
  }
  get $store() {
    return this.__storeInstance || this.parent.$store;
  }
  created() {
  }
  getRealEventName(e, separator) {
    var startIndex = e.indexOf(separator);
    return e.substr(startIndex < 0 ? 0 : startIndex + separator.length);
  }
  splitMethod(arr, keyword, defaultValue = 0) {
    var [methods, params] = splitMethodByKeyword(arr, keyword);
    return [
      methods.length ? +params[0].target : defaultValue,
      methods,
      params
    ];
  }
  createLocalCallback(event, callback) {
    var newCallback = callback.bind(this);
    newCallback.displayName = `${this.sourceName}.${event}`;
    newCallback.source = this.source;
    return newCallback;
  }
  initializeStoreEvent() {
    this.filterProps(CHECK_SUBSCRIBE_PATTERN).forEach((key) => {
      const events = this.getRealEventName(key, SUBSCRIBE_SAPARATOR);
      const [method, ...methodLine] = events.split(CHECK_SAPARATOR);
      const checkMethodList = methodLine.map((it) => it.trim()).filter((code) => this[code]).map((target) => ({ target }));
      const [debounceSecond, debounceMethods] = this.splitMethod(methodLine, "debounce");
      const [throttleSecond, throttleMethods] = this.splitMethod(methodLine, "throttle");
      const [allTrigger, allTriggerMethods] = this.splitMethod(methodLine, "allTrigger");
      const [selfTrigger, selfTriggerMethods] = this.splitMethod(methodLine, "selfTrigger");
      const [frameTrigger, frameTriggerMethods] = this.splitMethod(methodLine, "frame");
      const [paramsVariable, paramsVariableMethods, params] = this.splitMethod(methodLine, "params");
      let debounce2 = +debounceSecond > 0 ? debounceSecond : 0;
      let throttle2 = +throttleSecond > 0 ? throttleSecond : 0;
      let isAllTrigger = Boolean(allTriggerMethods.length);
      let isSelfTrigger = Boolean(selfTriggerMethods.length);
      let isFrameTrigger = Boolean(frameTriggerMethods.length);
      if (paramsVariableMethods.length) {
        const settings = getVariable(paramsVariable);
        if (isNotUndefined(settings.debounce))
          debounce2 = settings.debounce;
        if (isNotUndefined(settings.throttle))
          throttle2 = settings.throttle;
        if (isNotUndefined(settings.frame))
          isFrameTrigger = settings.frame;
      }
      const originalCallback = this[key];
      events.split(CHECK_SAPARATOR).filter((it) => {
        return checkMethodList.findIndex((a) => a.target === it) === -1 && debounceMethods.indexOf(it) === -1 && allTriggerMethods.indexOf(it) === -1 && selfTriggerMethods.indexOf(it) === -1 && throttleMethods.indexOf(it) === -1 && paramsVariableMethods.indexOf(it) === -1;
      }).map((it) => it.trim()).filter(Boolean).forEach((e) => {
        if (isFunction(this[key])) {
          var callback = this.createLocalCallback(e, originalCallback);
          this.$store.on(e, callback, this, debounce2, throttle2, isAllTrigger, isSelfTrigger, checkMethodList, isFrameTrigger);
        }
      });
    });
  }
  destoryStoreSUBSCRIBE() {
    this.$store.offAll(this);
  }
  destroy() {
    super.destroy();
    this.destoryStoreSUBSCRIBE();
  }
  rerender() {
    super.rerender();
    this.initialize();
    this.initializeStoreEvent();
  }
  emit(messageName, ...args) {
    this.$store.source = this.source;
    this.$store.sourceContext = this;
    this.$store.emit(messageName, ...args);
  }
  nextTick(callback, delay = 0) {
    setTimeout(() => {
      this.$store.nextTick(callback);
    }, delay);
  }
  trigger(messageName, ...args) {
    this.$store.source = this.source;
    this.$store.trigger(messageName, ...args);
  }
  broadcast(messageName, ...args) {
    Object.keys(this.children).forEach((key) => {
      this.children[key].trigger(messageName, ...args);
      this.children[key].broadcast(messageName, ...args);
    });
  }
  on(message, callback, debounceDelay = 0, throttleDelay = 0, enableAllTrigger = false, enableSelfTrigger = false, frame = false) {
    this.$store.on(message, callback, this, debounceDelay, throttleDelay, enableAllTrigger, enableSelfTrigger, [], frame);
  }
  off(message, callback) {
    this.$store.off(message, callback, this);
  }
  subscribe(callback, debounceSecond = 0, throttleSecond = 0) {
    const id = `subscribe.${uuidShort()}`;
    const newCallback = this.createLocalCallback(id, callback);
    this.$store.on(id, newCallback, this, debounceSecond, throttleSecond, false, true);
    return id;
  }
}
const start = (ElementClass, opt = {}) => {
  const $container = Dom.create((opt == null ? void 0 : opt.container) || document.body);
  const app = new ElementClass(opt, __spreadProps(__spreadValues({}, opt), {
    store: opt.store || new BaseStore()
  }));
  app.render($container);
  return app;
};
export { AFTER, ALL_TRIGGER, ALT, ANIMATIONEND, ANIMATIONITERATION, ANIMATIONSTART, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, BACKSPACE, BEFORE, BIND, BIND_CHECK_DEFAULT_FUNCTION, BIND_CHECK_FUNCTION, BIND_SAPARATOR, BLUR, BRACKET_LEFT, BRACKET_RIGHT, BaseStore, CALLBACK, CALLBACK_SAPARATOR, CAPTURE, CHANGE, CHANGEINPUT, CHECKER, CHECK_BIND_PATTERN, CHECK_CALLBACK_PATTERN, CHECK_DOM_EVENT_PATTERN, CHECK_LOAD_PATTERN, CHECK_SAPARATOR, CHECK_SUBSCRIBE_PATTERN, CLICK, COMMAND, CONFIG, CONTEXTMENU, CONTROL, CUSTOM, D1000, DEBOUNCE, DELAY, DELETE, DOMDIFF, DOM_EVENT_SAPARATOR, DOUBLECLICK, DOUBLETAB, DRAG, DRAGEND, DRAGENTER, DRAGEXIT, DRAGLEAVE, DRAGOUT, DRAGOVER, DRAGSTART, DROP, Dom, ENTER, EQUAL, ESCAPE, EVENT, FIT, FOCUS, FOCUSIN, FOCUSOUT, FRAME, IF, INPUT, KEY, KEYDOWN, KEYPRESS, KEYUP, LEFT_BUTTON, LOAD, LOAD_SAPARATOR, MAGIC_METHOD, META, MINUS, MOUSE, MOUSEDOWN, MOUSEENTER, MOUSELEAVE, MOUSEMOVE, MOUSEOUT, MOUSEOVER, MOUSEUP, NAME_SAPARATOR, ON, PARAMS, PASSIVE, PASTE, PEN, PIPE, POINTEREND, POINTERENTER, POINTERMOVE, POINTEROUT, POINTEROVER, POINTERSTART, PREVENT, RAF, RESIZE, RIGHT_BUTTON, SAPARATOR, SCROLL, SELF, SELF_TRIGGER, SHIFT, SPACE, STOP, SUBMIT, SUBSCRIBE, SUBSCRIBE_ALL, SUBSCRIBE_SAPARATOR, SUBSCRIBE_SELF, THROTTLE, TOUCH, TOUCHEND, TOUCHMOVE, TOUCHSTART, TRANSITIONCANCEL, TRANSITIONEND, TRANSITIONRUN, TRANSITIONSTART, UIElement, VARIABLE_SAPARATOR, WHEEL, getRef, getVariable, hasVariable, initializeGroupVariables, makeEventChecker, normalizeWheelEvent, recoverVariable, registAlias, registElement, retriveAlias, retriveElement, spreadVariable, start, variable };
