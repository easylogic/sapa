(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var easylogic = (function (exports) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();



var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};







var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function debounce(callback, delay) {

    var t = undefined;

    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback.apply(undefined, args);
        }, delay || 300);
    };
}

function filterProps(instance) {
    var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

    return Object.getOwnPropertyNames(instance.__proto__).filter(function (key) {
        return key.startsWith(pattern);
    });
}

function collectProps(instance) {

    if (!instance.collectedProps) {
        var p = instance.__proto__;
        var results = [];
        do {
            results.push.apply(results, toConsumableArray(Object.getOwnPropertyNames(p)));
            p = p.__proto__;
        } while (p);

        instance.collectedProps = results;
    }

    return instance.collectedProps;
}

function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxx12-xx-34xx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
}

function uuidShort() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
}

function keyEach(obj, callback) {
    Object.keys(obj).forEach(function (key, index) {
        callback(key, obj[key], index);
    });
}

function keyMap(obj, callback) {
    return Object.keys(obj).map(function (key, index) {
        return callback(key, obj[key], index);
    });
}

function defaultValue(value, defaultValue) {
    return typeof value == 'undefined' ? defaultValue : value;
}

function isUndefined(value) {
    return typeof value == 'undefined' || value == null;
}

function isNotUndefined(value) {
    return isUndefined(value) === false;
}

function isArray(value) {
    return Array.isArray(value);
}

function isBoolean(value) {
    return typeof value == 'boolean';
}

function isString(value) {
    return typeof value == 'string';
}

function isNotString(value) {
    return isString(value) === false;
}

function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && !isArray(value) && value !== null;
}

function isFunction(value) {
    return typeof value == 'function';
}

function isNumber(value) {
    return typeof value == 'number';
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

var short_tag_regexp = /\<(\w*)([^\>]*)\/\>/gim;

var HTML_TAG = {
    'image': true,
    'input': true
};

var html = function html(strings) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    var results = strings.map(function (it, index) {

        var results = args[index] || '';

        if (isFunction(results)) {
            results = results();
        }

        if (!isArray(results)) {
            results = [results];
        }

        results = results.map(function (r) {
            if (isObject(r)) {
                return Object.keys(r).map(function (key) {
                    return key + '="' + r[key] + '"';
                }).join(' ');
            }

            return r;
        }).join('');

        return it + results;
    }).join('');

    results = results.replace(short_tag_regexp, function (match, p1) {
        if (HTML_TAG[p1.toLowerCase()]) {
            return match;
        } else {
            return match.replace('/>', '></' + p1 + '>');
        }
    });

    return results;
};

var Dom = function () {
    function Dom(tag, className, attr) {
        classCallCheck(this, Dom);


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

    createClass(Dom, [{
        key: "attr",
        value: function attr(key, value) {
            if (arguments.length == 1) {
                return this.el.getAttribute(key);
            }

            this.el.setAttribute(key, value);

            return this;
        }
    }, {
        key: "attrs",
        value: function attrs() {
            var _this = this;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return args.map(function (key) {
                return _this.el.getAttribute(key);
            });
        }
    }, {
        key: "removeAttr",
        value: function removeAttr(key) {
            this.el.removeAttribute(key);

            return this;
        }
    }, {
        key: "is",
        value: function is(checkElement) {
            return this.el === (checkElement.el || checkElement);
        }
    }, {
        key: "closest",
        value: function closest(cls) {

            var temp = this;
            var checkCls = false;

            while (!(checkCls = temp.hasClass(cls))) {
                if (temp.el.parentNode) {
                    temp = new Dom(temp.el.parentNode);
                } else {
                    return null;
                }
            }

            if (checkCls) {
                return temp;
            }

            return null;
        }
    }, {
        key: "parent",
        value: function parent() {
            return new Dom(this.el.parentNode);
        }
    }, {
        key: "removeClass",
        value: function removeClass() {
            var _el$classList;

            (_el$classList = this.el.classList).remove.apply(_el$classList, arguments);

            return this;
        }
    }, {
        key: "hasClass",
        value: function hasClass(cls) {
            if (!this.el.classList) return false;
            return this.el.classList.contains(cls);
        }
    }, {
        key: "addClass",
        value: function addClass() {
            var _el$classList2;

            (_el$classList2 = this.el.classList).add.apply(_el$classList2, arguments);

            return this;
        }
    }, {
        key: "toggleClass",
        value: function toggleClass(cls, isForce) {

            this.el.classList.toggle(cls, isForce);

            /*
            if (arguments.length == 2) {
                if (isForce) {
                    this.addClass(cls)
                } else {
                    this.removeClass(cls);
                }
            } else {
                if (this.hasClass(cls)) {
                    this.removeClass(cls);
                } else {
                    this.addClass(cls);
                }
            }
            */
        }
    }, {
        key: "html",
        value: function html$$1(_html) {

            if (isUndefined(_html)) {
                return this.el.innerHTML;
            }

            if (isString(_html)) {
                this.el.innerHTML = _html;
            } else {
                this.empty().append(_html);
            }

            return this;
        }
    }, {
        key: "find",
        value: function find(selector) {
            return this.el.querySelector(selector);
        }
    }, {
        key: "$",
        value: function $(selector) {
            var node = this.find(selector);
            return node ? new Dom(node) : null;
        }
    }, {
        key: "findAll",
        value: function findAll(selector) {
            return this.el.querySelectorAll(selector);
        }
    }, {
        key: "$$",
        value: function $$(selector) {
            return [].concat(toConsumableArray(this.findAll(selector))).map(function (node) {
                return new Dom(node);
            });
        }
    }, {
        key: "empty",
        value: function empty() {
            return this.html('');
        }
    }, {
        key: "append",
        value: function append(el) {

            if (isString(el)) {
                this.el.appendChild(document.createTextNode(el));
            } else {
                this.el.appendChild(el.el || el);
            }

            return this;
        }
    }, {
        key: "appendHTML",
        value: function appendHTML(html$$1) {
            var $dom = new Dom("div").html(html$$1);

            this.append($dom.createChildrenFragment());
        }
    }, {
        key: "createChildrenFragment",
        value: function createChildrenFragment() {
            var list = this.children();

            var fragment = document.createDocumentFragment();
            list.forEach(function ($el) {
                return fragment.appendChild($el.el);
            });

            return fragment;
        }
    }, {
        key: "appendTo",
        value: function appendTo(target) {
            var t = target.el ? target.el : target;

            t.appendChild(this.el);

            return this;
        }
    }, {
        key: "remove",
        value: function remove() {
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }

            return this;
        }
    }, {
        key: "text",
        value: function text(value) {
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

    }, {
        key: "css",
        value: function css(key, value) {
            var _this2 = this;

            if (isNotUndefined(key) && isNotUndefined(value)) {
                this.el.style[key] = value;
            } else if (isNotUndefined(key)) {

                if (isString(key)) {
                    return getComputedStyle(this.el)[key];
                } else {
                    var keys = key || {};

                    keyEach(keys, function (k, value) {
                        _this2.el.style[k] = value;
                    });
                }
            }

            return this;
        }
    }, {
        key: "cssText",
        value: function cssText(value) {
            if (isUndefined(value)) {
                return this.el.style.cssText;
            }

            this.el.style.cssText = value;

            return this;
        }
    }, {
        key: "cssArray",
        value: function cssArray(arr) {

            if (arr[0]) this.el.style[arr[0]] = arr[1];
            if (arr[2]) this.el.style[arr[2]] = arr[3];
            if (arr[4]) this.el.style[arr[4]] = arr[5];
            if (arr[6]) this.el.style[arr[6]] = arr[7];
            if (arr[8]) this.el.style[arr[8]] = arr[9];

            return this;
        }
    }, {
        key: "cssFloat",
        value: function cssFloat(key) {
            return parseFloat(this.css(key));
        }
    }, {
        key: "cssInt",
        value: function cssInt(key) {
            return parseInt(this.css(key));
        }
    }, {
        key: "px",
        value: function px(key, value) {
            return this.css(key, value + 'px');
        }
    }, {
        key: "rect",
        value: function rect() {
            return this.el.getBoundingClientRect();
        }
    }, {
        key: "offset",
        value: function offset() {
            var rect = this.rect();

            var scrollTop = Dom.getScrollTop();
            var scrollLeft = Dom.getScrollLeft();

            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
    }, {
        key: "offsetLeft",
        value: function offsetLeft() {
            return this.offset().left;
        }
    }, {
        key: "offsetTop",
        value: function offsetTop() {
            return this.offset().top;
        }
    }, {
        key: "position",
        value: function position() {

            if (this.el.style.top) {
                return {
                    top: parseFloat(this.css('top')),
                    left: parseFloat(this.css('left'))
                };
            } else {
                return this.rect();
            }
        }
    }, {
        key: "size",
        value: function size() {
            return [this.width(), this.height()];
        }
    }, {
        key: "width",
        value: function width() {
            return this.el.offsetWidth || this.rect().width;
        }
    }, {
        key: "contentWidth",
        value: function contentWidth() {
            return this.width() - this.cssFloat('padding-left') - this.cssFloat('padding-right');
        }
    }, {
        key: "height",
        value: function height() {
            return this.el.offsetHeight || this.rect().height;
        }
    }, {
        key: "contentHeight",
        value: function contentHeight() {
            return this.height() - this.cssFloat('padding-top') - this.cssFloat('padding-bottom');
        }
    }, {
        key: "val",
        value: function val(value) {
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
    }, {
        key: "int",
        value: function int() {
            return parseInt(this.val(), 10);
        }
    }, {
        key: "float",
        value: function float() {
            return parseFloat(this.val());
        }
    }, {
        key: "show",
        value: function show() {
            return this.css('display', 'block');
        }
    }, {
        key: "hide",
        value: function hide() {
            return this.css('display', 'none');
        }
    }, {
        key: "toggle",
        value: function toggle(isForce) {

            var currentHide = this.css('display') == 'none';

            if (arguments.length == 1) {
                currentHide = isForce;
            }

            if (currentHide) {
                return this.show();
            } else {
                return this.hide();
            }
        }
    }, {
        key: "setScrollTop",
        value: function setScrollTop(scrollTop) {
            this.el.scrollTop = scrollTop;
            return this;
        }
    }, {
        key: "setScrollLeft",
        value: function setScrollLeft(scrollLeft) {
            this.el.scrollLeft = scrollLeft;
            return this;
        }
    }, {
        key: "scrollTop",
        value: function scrollTop() {
            if (this.el === document.body) {
                return Dom.getScrollTop();
            }

            return this.el.scrollTop;
        }
    }, {
        key: "scrollLeft",
        value: function scrollLeft() {
            if (this.el === document.body) {
                return Dom.getScrollLeft();
            }

            return this.el.scrollLeft;
        }
    }, {
        key: "scrollHeight",
        value: function scrollHeight() {
            return this.el.scrollHeight;
        }
    }, {
        key: "on",
        value: function on(eventName, callback, opt1, opt2) {
            this.el.addEventListener(eventName, callback, opt1, opt2);

            return this;
        }
    }, {
        key: "off",
        value: function off(eventName, callback) {
            this.el.removeEventListener(eventName, callback);

            return this;
        }
    }, {
        key: "getElement",
        value: function getElement() {
            return this.el;
        }
    }, {
        key: "createChild",
        value: function createChild(tag) {
            var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var css = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var $element = new Dom(tag, className, attrs);
            $element.css(css);

            this.append($element);

            return $element;
        }
    }, {
        key: "firstChild",
        value: function firstChild() {
            return new Dom(this.el.firstElementChild);
        }
    }, {
        key: "children",
        value: function children() {
            var element = this.el.firstElementChild;

            if (!element) {
                return [];
            }

            var results = [];

            do {
                results.push(new Dom(element));
                element = element.nextElementSibling;
            } while (element);

            return results;
        }
    }, {
        key: "childLength",
        value: function childLength() {
            return this.el.children.length;
        }
    }, {
        key: "replace",
        value: function replace(newElement) {

            this.el.parentNode.replaceChild(newElement.el || newElement, this.el);

            return this;
        }
    }, {
        key: "checked",
        value: function checked() {
            var isChecked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


            if (arguments.length == 0) {
                return !!this.el.checked;
            }

            this.el.checked = !!isChecked;

            return this;
        }
    }, {
        key: "focus",
        value: function focus() {
            this.el.focus();

            return this;
        }

        // canvas functions 

    }, {
        key: "context",
        value: function context() {
            var contextType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '2d';


            if (!this._initContext) {
                this._initContext = this.el.getContext(contextType);
            }

            return this._initContext;
        }
    }, {
        key: "resize",
        value: function resize(_ref) {
            var width = _ref.width,
                height = _ref.height;


            // support hi-dpi for retina display 
            this._initContext = null;
            var ctx = this.context();
            var scale = window.devicePixelRatio || 1;

            this.px('width', width);
            this.px('height', height);

            this.el.width = width * scale;
            this.el.height = height * scale;

            ctx.scale(scale, scale);
        }
    }, {
        key: "clear",
        value: function clear() {
            this.context().clearRect(0, 0, this.el.width, this.el.height);
        }
    }, {
        key: "update",
        value: function update(callback) {
            this.clear();
            callback.call(this);
        }
    }, {
        key: "drawOption",
        value: function drawOption() {
            var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var ctx = this.context();

            Object.assign(ctx, option);
        }
    }, {
        key: "drawLine",
        value: function drawLine(x1, y1, x2, y2) {
            var ctx = this.context();

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
        }
    }, {
        key: "drawPath",
        value: function drawPath() {
            var ctx = this.context();

            ctx.beginPath();

            for (var _len2 = arguments.length, path = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                path[_key2] = arguments[_key2];
            }

            path.forEach(function (p, index) {
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
    }, {
        key: "drawCircle",
        value: function drawCircle(cx, cy, r) {
            var ctx = this.context();
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }
    }, {
        key: "drawText",
        value: function drawText(x, y, text) {
            this.context().fillText(text, x, y);
        }
    }], [{
        key: "getScrollTop",
        value: function getScrollTop() {
            return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
        }
    }, {
        key: "getScrollLeft",
        value: function getScrollLeft() {
            return Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft);
        }
    }]);
    return Dom;
}();

var EventChecker = function () {
    function EventChecker(value) {
        var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;
        classCallCheck(this, EventChecker);

        this.value = value;
        this.split = split;
    }

    createClass(EventChecker, [{
        key: 'toString',
        value: function toString() {
            return ' ' + this.split + ' ' + this.value;
        }
    }]);
    return EventChecker;
}();

var EventAfterRunner = function () {
    function EventAfterRunner(value) {
        var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;
        classCallCheck(this, EventAfterRunner);

        this.value = value;
        this.split = split;
    }

    createClass(EventAfterRunner, [{
        key: 'toString',
        value: function toString() {
            return ' ' + this.split + ' after(' + this.value + ')';
        }
    }]);
    return EventAfterRunner;
}();

// event name regular expression
var CHECK_LOAD_PATTERN = /^load (.*)/ig;

var CHECK_CLICK_PATTERN = 'click|dblclick';
var CHECK_MOUSE_PATTERN = 'mouse(down|up|move|over|out|enter|leave)';
var CHECK_POINTER_PATTERN = 'pointer(start|move|end)';
var CHECK_TOUCH_PATTERN = 'touch(start|move|end)';
var CHECK_KEY_PATTERN = 'key(down|up|press)';
var CHECK_DRAGDROP_PATTERN = 'drag|drop|drag(start|over|enter|leave|exit|end)';
var CHECK_CONTEXT_PATTERN = 'contextmenu';
var CHECK_INPUT_PATTERN = 'change|input';
var CHECK_CLIPBOARD_PATTERN = 'paste';
var CHECK_BEHAVIOR_PATTERN = 'resize|scroll|wheel|mousewheel|DOMMouseScroll';

var CHECK_PATTERN_LIST = [CHECK_CLICK_PATTERN, CHECK_MOUSE_PATTERN, CHECK_POINTER_PATTERN, CHECK_TOUCH_PATTERN, CHECK_KEY_PATTERN, CHECK_DRAGDROP_PATTERN, CHECK_CONTEXT_PATTERN, CHECK_INPUT_PATTERN, CHECK_CLIPBOARD_PATTERN, CHECK_BEHAVIOR_PATTERN].join('|');

var CHECK_PATTERN = new RegExp('^(' + CHECK_PATTERN_LIST + ')', "ig");

var WHITE_STRING = ' ';
var NAME_SAPARATOR = ':';
var CHECK_SAPARATOR = '|';
var LOAD_SAPARATOR = 'load ';
var SAPARATOR = WHITE_STRING;

var DOM_EVENT_MAKE = function DOM_EVENT_MAKE() {
    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
    }

    var key = keys.join(NAME_SAPARATOR);
    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return [key].concat(args).join(SAPARATOR);
    };
};

var CUSTOM = DOM_EVENT_MAKE;
var CLICK = DOM_EVENT_MAKE('click');
var DOUBLECLICK = DOM_EVENT_MAKE('dblclick');
var MOUSEDOWN = DOM_EVENT_MAKE('mousedown');
var MOUSEUP = DOM_EVENT_MAKE('mouseup');
var MOUSEMOVE = DOM_EVENT_MAKE('mousemove');
var MOUSEOVER = DOM_EVENT_MAKE('mouseover');
var MOUSEOUT = DOM_EVENT_MAKE('mouseout');
var MOUSEENTER = DOM_EVENT_MAKE('mouseenter');
var MOUSELEAVE = DOM_EVENT_MAKE('mouseleave');
var TOUCHSTART = DOM_EVENT_MAKE('touchstart');
var TOUCHMOVE = DOM_EVENT_MAKE('touchmove');
var TOUCHEND = DOM_EVENT_MAKE('touchend');
var KEYDOWN = DOM_EVENT_MAKE('keydown');
var KEYUP = DOM_EVENT_MAKE('keyup');
var KEYPRESS = DOM_EVENT_MAKE('keypress');
var DRAG = DOM_EVENT_MAKE('drag');
var DRAGSTART = DOM_EVENT_MAKE('dragstart');
var DROP = DOM_EVENT_MAKE('drop');
var DRAGOVER = DOM_EVENT_MAKE('dragover');
var DRAGENTER = DOM_EVENT_MAKE('dragenter');
var DRAGLEAVE = DOM_EVENT_MAKE('dragleave');
var DRAGEXIT = DOM_EVENT_MAKE('dragexit');
var DRAGOUT = DOM_EVENT_MAKE('dragout');
var DRAGEND = DOM_EVENT_MAKE('dragend');
var CONTEXTMENU = DOM_EVENT_MAKE('contextmenu');
var CHANGE = DOM_EVENT_MAKE('change');
var INPUT = DOM_EVENT_MAKE('input');
var PASTE = DOM_EVENT_MAKE('paste');
var RESIZE = DOM_EVENT_MAKE('resize');
var SCROLL = DOM_EVENT_MAKE('scroll');
var SUBMIT = DOM_EVENT_MAKE('submit');
var POINTERSTART = CUSTOM('mousedown', 'touchstart');
var POINTERMOVE = CUSTOM('mousemove', 'touchmove');
var POINTEREND = CUSTOM('mouseup', 'touchend');
var CHANGEINPUT = CUSTOM('change', 'input');
var WHEEL = CUSTOM('wheel', 'mousewheel', 'DOMMouseScroll');

// Predefined CHECKER 
var CHECKER = function CHECKER(value) {
    var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;

    return new EventChecker(value, split);
};

var AFTER = function AFTER(value) {
    var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;

    return new EventAfterRunner(value, split);
};

var IF = CHECKER;

var ARROW_UP = CHECKER('ArrowUp');
var ARROW_DOWN = CHECKER('ArrowDown');
var ARROW_LEFT = CHECKER('ArrowLeft');
var ARROW_RIGHT = CHECKER('ArrowRight');
var ENTER = CHECKER('Enter');
var SPACE = CHECKER('Space');

var ALT = CHECKER('isAltKey');
var SHIFT = CHECKER('isShiftKey');
var META = CHECKER('isMetaKey');
var CONTROL = CHECKER('isCtrlKey');
var SELF = CHECKER('self');
var CAPTURE = CHECKER('capture');
var FIT = CHECKER('fit');
var PASSIVE = CHECKER('passive');

var DEBOUNCE = function DEBOUNCE() {
    var debounce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    return CHECKER('debounce(' + debounce + ')');
};

// after method 
var MOVE = function MOVE() {
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'move';

    return AFTER('bodyMouseMove ' + method);
};
var END = function END() {
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'end';

    return AFTER('bodyMouseUp ' + method);
};

// Predefined LOADER
var LOAD = function LOAD() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '$el';

    return LOAD_SAPARATOR + value;
};

var ev = function ev(e) {
    if (e.touches && e.touches[0]) {
        return e.touches[0];
    }

    return e;
};

var posXY = function posXY(e) {
    var pos = ev(e);
    return {
        x: pos.pageX,
        y: pos.pageY
    };
};

var PREVENT = 'PREVENT';

var GETTER_PREFIX = '*/';
var ACTION_PREFIX = '/';

function GETTER(str) {
    return GETTER_PREFIX + str;
}

function ACTION(str) {
    return ACTION_PREFIX + str;
}

var Module = function () {
    function Module($store) {
        classCallCheck(this, Module);

        this.$store = $store;
        this.loadProps();
        this.initialize();
    }

    createClass(Module, [{
        key: "afterDispatch",
        value: function afterDispatch() {}
    }, {
        key: "initialize",
        value: function initialize() {}
    }, {
        key: "loadProps",
        value: function loadProps() {
            var _this = this;

            filterProps(this, ACTION_PREFIX).forEach(function (key) {
                _this.$store.action(key, _this);
            });

            filterProps(this, GETTER_PREFIX).forEach(function (key) {
                _this.$store.getter(key, _this);
            });
        }
    }]);
    return Module;
}();

var Store = function () {
    function Store(opt) {
        classCallCheck(this, Store);

        this.cachedCallback = {};
        this.callbacks = [];
        this.actions = [];
        this.getters = [];
        this.modules = opt.modules || [];
        this.standalone = {
            getters: {},
            actions: {},
            dispatches: {}
        };

        this.initialize();
    }

    createClass(Store, [{
        key: "initialize",
        value: function initialize() {
            this.initializeModule();
        }
    }, {
        key: "initializeModule",
        value: function initializeModule() {
            var _this = this;

            this.modules.forEach(function (ModuleClass) {
                _this.addModule(ModuleClass);
            });
        }
    }, {
        key: "makeActionCallback",
        value: function makeActionCallback(context, action, actionName) {
            var _this2 = this;

            var func = function func() {
                var _context$action;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return (_context$action = context[action]).call.apply(_context$action, [context, _this2].concat(args));
            };

            func.context = context;
            func.displayName = actionName;

            return func;
        }
    }, {
        key: "action",
        value: function action(_action, context) {
            var _this3 = this;

            var actionName = _action.substr(_action.indexOf(ACTION_PREFIX) + ACTION_PREFIX.length);

            this.actions[actionName] = this.makeActionCallback(context, _action, actionName);

            this.standalone.actions[actionName] = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return _this3.run.apply(_this3, [actionName].concat(args));
            };
            this.standalone.dispatches[actionName] = function () {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                return _this3.dispatch.apply(_this3, [actionName].concat(args));
            };
        }
    }, {
        key: "getter",
        value: function getter(action, context) {
            var _this4 = this;

            var actionName = action.substr(action.indexOf(GETTER_PREFIX) + GETTER_PREFIX.length);

            this.getters[actionName] = this.makeActionCallback(context, action, actionName);

            this.standalone.getters[actionName] = function () {
                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args[_key4] = arguments[_key4];
                }

                return _this4.read.apply(_this4, [actionName].concat(args));
            };
        }
    }, {
        key: "mapGetters",
        value: function mapGetters() {
            var _this5 = this;

            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            return args.map(function (actionName) {
                return _this5.standalone.getters[actionName];
            });
        }
    }, {
        key: "mapActions",
        value: function mapActions() {
            var _this6 = this;

            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
            }

            return args.map(function (actionName) {
                return _this6.standalone.actions[actionName];
            });
        }
    }, {
        key: "mapDispatches",
        value: function mapDispatches() {
            var _this7 = this;

            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                args[_key7] = arguments[_key7];
            }

            return args.map(function (actionName) {
                return _this7.standalone.dispatches[actionName];
            });
        }
    }, {
        key: "dispatch",
        value: function dispatch(action) {
            var actionCallback = this.actions[action];

            if (actionCallback) {
                for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
                    args[_key8 - 1] = arguments[_key8];
                }

                var ret = actionCallback.apply(undefined, args);

                if (ret != PREVENT) {
                    actionCallback.context.afterDispatch();
                }
            } else {
                throw new Error('action : ' + action + ' is not a valid.');
            }
        }
    }, {
        key: "run",
        value: function run(action) {
            var actionCallback = this.actions[action];

            if (actionCallback) {
                for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
                    args[_key9 - 1] = arguments[_key9];
                }

                return actionCallback.apply(undefined, args);
            } else {
                throw new Error('action : ' + action + ' is not a valid.');
            }
        }
    }, {
        key: "read",
        value: function read(action) {
            var getterCallback = this.getters[action];

            if (getterCallback) {
                for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
                    args[_key10 - 1] = arguments[_key10];
                }

                return getterCallback.apply(undefined, args);
            } else {
                throw new Error('getter : ' + action + ' is not a valid.');
            }
        }
    }, {
        key: "addModule",
        value: function addModule(ModuleClass) {
            return new ModuleClass(this);
        }
    }, {
        key: "on",
        value: function on(event, originalCallback, context) {
            var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            var callback = delay > 0 ? debounce(originalCallback, delay) : originalCallback;
            this.callbacks.push({ event: event, callback: callback, context: context, originalCallback: originalCallback });
        }
    }, {
        key: "off",
        value: function off(event, originalCallback) {

            if (arguments.length == 0) {
                this.callbacks = [];
                this.cachedCallback = {};
            } else if (arguments.length == 1) {
                this.callbacks = this.callbacks.filter(function (f) {
                    return f.event != event;
                });
                this.cachedCallback = {};
            } else if (arguments.length == 2) {
                this.callbacks = this.callbacks.filter(function (f) {
                    return !(f.event == event && f.originalCallback == originalCallback);
                });
                this.cachedCallback = {};
            }
        }
    }, {
        key: "emit",
        value: function emit(event) {
            var _this8 = this;

            for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
                args[_key11 - 1] = arguments[_key11];
            }

            if (!this.cachedCallback[event]) {
                this.cachedCallback[event] = this.callbacks.filter(function (f) {
                    return f.event == event;
                });
            }

            this.cachedCallback[event].forEach(function (f) {
                if (f.context.source != _this8.source) {
                    f.callback.apply(f, args);
                }
            });
        }
    }]);
    return Store;
}();

var _templateObject = taggedTemplateLiteral(['', ''], ['', '']);

var REFERENCE_PROPERTY = 'ref';
var TEMP_DIV = new Dom("div");
var QUERY_PROPERTY = '[' + REFERENCE_PROPERTY + ']';

var matchPath = function matchPath(el, selector) {
  if (el) {
    if (el.matches(selector)) {
      return el;
    }
    return matchPath(el.parentElement, selector);
  }
  return null;
};

var hasDelegate = function hasDelegate(e, eventObject) {
  return matchPath(e.target || e.srcElement, eventObject.delegate);
};

var makeCallback = function makeCallback(context, eventObject, callback) {

  if (eventObject.delegate) {
    return makeDelegateCallback(context, eventObject, callback);
  } else {
    return makeDefaultCallback(context, eventObject, callback);
  }
};

var makeDefaultCallback = function makeDefaultCallback(context, eventObject, callback) {
  return function (e) {
    var returnValue = runEventCallback(context, e, eventObject, callback);
    if (!isNotUndefined(returnValue)) return returnValue;
  };
};

var makeDelegateCallback = function makeDelegateCallback(context, eventObject, callback) {
  return function (e) {
    var delegateTarget = hasDelegate(e, eventObject);

    if (delegateTarget) {
      // delegate target 이 있는 경우만 callback 실행 
      e.$delegateTarget = new Dom(delegateTarget);

      var returnValue = runEventCallback(context, e, eventObject, callback);
      if (!isNotUndefined(returnValue)) return returnValue;
    }
  };
};

var runEventCallback = function runEventCallback(context, e, eventObject, callback) {
  e.xy = posXY(e);

  if (checkEventType(context, e, eventObject)) {
    var returnValue = callback(e, e.$delegateTarget, e.xy);

    if (eventObject.afterMethods.length) {
      eventObject.afterMethods.forEach(function (after) {
        return context[after.target].call(context, after.param, e);
      });
    }

    return returnValue;
  }
};

var checkEventType = function checkEventType(context, e, eventObject) {

  // 특정 keycode 를 가지고 있는지 체크 
  // keyup.pagedown  이라고 정의하면 pagedown 키를 눌렀을때만 동작 함 
  var hasKeyCode = true;
  if (eventObject.codes.length) {

    hasKeyCode = (e.code ? eventObject.codes.includes(e.code.toLowerCase()) : false) || (e.key ? eventObject.codes.includes(e.key.toLowerCase()) : false);
  }

  // 체크 메소드들은 모든 메소드를 다 적용해야한다. 
  var isAllCheck = true;
  if (eventObject.checkMethodList.length) {
    isAllCheck = eventObject.checkMethodList.every(function (field) {
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

var getDefaultDomElement = function getDefaultDomElement(context, dom) {
  var el = void 0;

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

var getDefaultEventObject = function getDefaultEventObject(context, eventName, checkMethodFilters) {
  var arr = checkMethodFilters;
  var checkMethodList = arr.filter(function (code) {
    return !!context[code];
  });

  var afters = arr.filter(function (code) {
    return code.indexOf('after(') > -1;
  });

  var afterMethods = afters.map(function (code) {
    var _code$split$1$split$ = code.split('after(')[1].split(')')[0].trim().split(' '),
        _code$split$1$split$2 = slicedToArray(_code$split$1$split$, 2),
        target = _code$split$1$split$2[0],
        param = _code$split$1$split$2[1];

    return { target: target, param: param };
  });

  // TODO: split debounce check code 
  var delay = arr.filter(function (code) {
    if (code.indexOf('debounce(') > -1) {
      return true;
    }
    return false;
  });

  var debounceTime = 0;
  if (delay.length) {
    debounceTime = getDebounceTime(delay[0]);
  }

  // capture 
  var capturing = arr.filter(function (code) {
    return code.indexOf('capture') > -1;
  });
  var useCapture = !!capturing.length;

  arr = arr.filter(function (code) {
    return checkMethodList.includes(code) === false && delay.includes(code) === false && afters.includes(code) === false && capturing.includes(code) === false;
  }).map(function (code) {
    return code.toLowerCase();
  });

  // TODO: split debounce check code     

  return {
    eventName: eventName,
    codes: arr,
    useCapture: useCapture,
    afterMethods: afterMethods,
    debounce: debounceTime,
    checkMethodList: checkMethodList
  };
};

var getDebounceTime = function getDebounceTime(code) {
  var debounceTime = 0;
  if (code.indexOf('debounce(') > -1) {
    debounceTime = +code.replace('debounce(', '').replace(')', '');
  }

  return debounceTime;
};

var addEvent = function addEvent(context, eventObject, callback) {
  eventObject.callback = makeCallback(context, eventObject, callback);
  context.addBinding(eventObject);

  if (eventObject.dom) {
    new Dom(eventObject.dom).on(eventObject.eventName, eventObject.callback, eventObject.useCapture);
  }
};

var bindingEvent = function bindingEvent(context, _ref, checkMethodFilters, callback) {
  var _ref2 = toArray(_ref),
      eventName = _ref2[0],
      dom = _ref2[1],
      delegate = _ref2.slice(2);

  var eventObject = getDefaultEventObject(context, eventName, checkMethodFilters);

  eventObject.dom = getDefaultDomElement(context, dom);
  eventObject.delegate = delegate.join(SAPARATOR);

  if (eventObject.debounce) {
    callback = debounce(callback, eventObject.debounce);
  }

  addEvent(context, eventObject, callback);
};

var getEventNames = function getEventNames(eventName) {
  var results = [];

  eventName.split(NAME_SAPARATOR).forEach(function (e) {
    var arr = e.split(NAME_SAPARATOR);

    results.push.apply(results, toConsumableArray(arr));
  });

  return results;
};

var parseEvent = function parseEvent(context, key) {
  var checkMethodFilters = key.split(CHECK_SAPARATOR).map(function (it) {
    return it.trim();
  });
  var eventSelectorAndBehave = checkMethodFilters.shift();

  var _eventSelectorAndBeha = eventSelectorAndBehave.split(SAPARATOR),
      _eventSelectorAndBeha2 = toArray(_eventSelectorAndBeha),
      eventName = _eventSelectorAndBeha2[0],
      params = _eventSelectorAndBeha2.slice(1);

  var eventNames = getEventNames(eventName);
  var callback = context[key].bind(context);

  eventNames.forEach(function (eventName) {
    bindingEvent(context, [eventName].concat(toConsumableArray(params)), checkMethodFilters, callback);
  });
};

var EventMachine = function () {
  function EventMachine() {
    classCallCheck(this, EventMachine);

    this.refs = {};
    this.children = {};
    this._bindings = [];
    this.childComponents = this.components();
  }

  createClass(EventMachine, [{
    key: 'render',
    value: function render($container) {
      this.$el = this.parseTemplate(html(_templateObject, this.template()));
      this.refs.$el = this.$el;

      if ($container) $container.html(this.$el);

      this.load();

      this.afterRender();
    }
  }, {
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'afterRender',
    value: function afterRender() {}
  }, {
    key: 'components',
    value: function components() {
      return {};
    }
  }, {
    key: 'parseTemplate',
    value: function parseTemplate(html$$1, isLoad) {
      var _this = this;

      if (isArray(html$$1)) {
        html$$1 = html$$1.join('');
      }

      html$$1 = html$$1.trim();

      var list = TEMP_DIV.html(html$$1).children();

      list.forEach(function ($el) {
        // ref element 정리 
        if ($el.attr(REFERENCE_PROPERTY)) {
          _this.refs[$el.attr(REFERENCE_PROPERTY)] = $el;
        }
        var refs = $el.$$(QUERY_PROPERTY);
        refs.forEach(function ($dom) {
          var name = $dom.attr(REFERENCE_PROPERTY);
          _this.refs[name] = $dom;
        });
      });

      if (!isLoad) {
        return list[0];
      }

      return TEMP_DIV.createChildrenFragment();
    }
  }, {
    key: 'parseComponent',
    value: function parseComponent() {
      var _this2 = this;

      var $el = this.$el;
      keyEach(this.childComponents, function (ComponentName, Component) {
        var targets = $el.$$('' + ComponentName.toLowerCase());
        [].concat(toConsumableArray(targets)).forEach(function ($dom) {
          var props = {};

          [].concat(toConsumableArray($dom.el.attributes)).filter(function (t) {
            return [REFERENCE_PROPERTY].indexOf(t.nodeName) < 0;
          }).forEach(function (t) {
            props[t.nodeName] = t.nodeValue;
          });

          var refName = $dom.attr(REFERENCE_PROPERTY) || ComponentName;

          if (refName) {

            if (Component) {

              var instance = new Component(_this2, props);

              if (_this2.children[refName]) {
                refName = instance.id;
              }

              _this2.children[refName] = instance;
              _this2.refs[refName] = instance.$el;

              if (instance) {
                instance.render();

                $dom.replace(instance.$el);
              }
            }
          }
        });
      });
    }
  }, {
    key: 'load',
    value: function load() {
      var _this3 = this;

      if (!this._loadMethods) {
        this._loadMethods = this.filterProps(CHECK_LOAD_PATTERN);
      }

      this._loadMethods.forEach(function (callbackName) {
        var elName = callbackName.split(LOAD_SAPARATOR)[1];
        if (_this3.refs[elName]) {
          var fragment = _this3.parseTemplate(_this3[callbackName].call(_this3), true);
          _this3.refs[elName].html(fragment);
        }
      });

      this.parseComponent();
    }

    // 기본 템플릿 지정 

  }, {
    key: 'template',
    value: function template() {
      var className = this.templateClass();
      var classString = className ? 'class="' + className + '"' : '';

      return '<div ' + classString + '></div>';
    }
  }, {
    key: 'templateClass',
    value: function templateClass() {
      return null;
    }
  }, {
    key: 'eachChildren',
    value: function eachChildren(callback) {
      if (!isFunction(callback)) return;

      keyEach(this.children, function (_, Component) {
        callback(Component);
      });
    }

    /**
     * 이벤트를 초기화한다. 
     */

  }, {
    key: 'initializeEvent',
    value: function initializeEvent() {
      this.initializeEventMachin();

      // 자식 이벤트도 같이 초기화 한다. 
      // 그래서 이 메소드는 부모에서 한번만 불려도 된다. 
      this.eachChildren(function (Component) {
        Component.initializeEvent();
      });
    }

    /**
     * 자원을 해제한다. 
     * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다. 
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.destroyEventMachin();
      // this.refs = {} 

      this.eachChildren(function (Component) {
        Component.destroy();
      });
    }
  }, {
    key: 'destroyEventMachin',
    value: function destroyEventMachin() {
      this.removeEventAll();
    }
  }, {
    key: 'initializeEventMachin',
    value: function initializeEventMachin() {
      var _this4 = this;

      this.filterProps(CHECK_PATTERN).forEach(function (key) {
        return parseEvent(_this4, key);
      });
    }
  }, {
    key: 'filterProps',
    value: function filterProps$$1(pattern) {
      return collectProps(this).filter(function (key) {
        return key.match(pattern);
      });
    }

    /* magic check method  */

  }, {
    key: 'self',
    value: function self(e) {
      return e.$delegateTarget.is(e.target);
    }
  }, {
    key: 'isAltKey',
    value: function isAltKey(e) {
      return e.altKey;
    }
  }, {
    key: 'isCtrlKey',
    value: function isCtrlKey(e) {
      return e.ctrlKey;
    }
  }, {
    key: 'isShiftKey',
    value: function isShiftKey(e) {
      return e.shiftKey;
    }
  }, {
    key: 'isMetaKey',
    value: function isMetaKey(e) {
      return e.metaKey;
    }

    /* magic check method */

  }, {
    key: 'getBindings',
    value: function getBindings() {

      if (!this._bindings) {
        this.initBindings();
      }

      return this._bindings;
    }
  }, {
    key: 'addBinding',
    value: function addBinding(obj) {
      this.getBindings().push(obj);
    }
  }, {
    key: 'initBindings',
    value: function initBindings() {
      this._bindings = [];
    }
  }, {
    key: 'removeEventAll',
    value: function removeEventAll() {
      this.getBindings().forEach(function (obj) {
        if (obj.dom) {
          new Dom(obj.dom).off(obj.eventName, obj.callback);
        }
      });
      this.initBindings();
    }
  }]);
  return EventMachine;
}();

var CHECK_STORE_MULTI_PATTERN = /^ME@/;
var MULTI_PREFIX = 'ME@';
var SPLITTER = '|';

var EVENT = function EVENT() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return MULTI_PREFIX + args.join(SPLITTER);
};

var UIElement = function (_EventMachine) {
    inherits(UIElement, _EventMachine);

    function UIElement(opt, props) {
        classCallCheck(this, UIElement);

        var _this = possibleConstructorReturn(this, (UIElement.__proto__ || Object.getPrototypeOf(UIElement)).call(this, opt));

        _this.opt = opt || {};
        _this.parent = _this.opt;
        _this.props = props || {};
        _this.source = uuid();

        if (opt && opt.$store) {
            _this.$store = opt.$store;
        }

        _this.created();

        _this.initialize();

        _this.initializeStoreEvent();
        return _this;
    }

    createClass(UIElement, [{
        key: "created",
        value: function created() {}
    }, {
        key: "getRealEventName",
        value: function getRealEventName(e) {
            var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PREFIX;

            var startIndex = e.indexOf(s);
            return e.substr(startIndex == 0 ? 0 : startIndex + s.length);
        }

        /**
         * initialize store event 
         * 
         * you can define '@xxx' method(event) in UIElement 
         * 
         * 
         */

    }, {
        key: "initializeStoreEvent",
        value: function initializeStoreEvent() {
            var _this2 = this;

            this.storeEvents = {};

            this.filterProps(CHECK_STORE_MULTI_PATTERN).forEach(function (key) {
                var events = _this2.getRealEventName(key, MULTI_PREFIX);

                events.split(SPLITTER).forEach(function (e) {
                    e = _this2.getRealEventName(e);
                    var callback = _this2[key].bind(_this2);
                    callback.displayName = e;
                    _this2.storeEvents[e] = callback;
                    _this2.$store.on(e, _this2.storeEvents[e], _this2);
                });
            });
        }
    }, {
        key: "destoryStoreEvent",
        value: function destoryStoreEvent() {
            var _this3 = this;

            keyEach(this.storeEvents, function (event, eventValue) {
                _this3.$store.off(event, eventValue);
            });
        }
    }, {
        key: "read",
        value: function read() {
            var _$store;

            return (_$store = this.$store).read.apply(_$store, arguments);
        }
    }, {
        key: "mapGetters",
        value: function mapGetters() {
            var _$store2;

            return (_$store2 = this.$store).mapGetters.apply(_$store2, arguments);
        }
    }, {
        key: "mapActions",
        value: function mapActions() {
            var _$store3;

            return (_$store3 = this.$store).mapActions.apply(_$store3, arguments);
        }
    }, {
        key: "mapDispatches",
        value: function mapDispatches() {
            var _$store4;

            return (_$store4 = this.$store).mapDispatches.apply(_$store4, arguments);
        }
    }, {
        key: "run",
        value: function run() {
            var _$store5;

            return (_$store5 = this.$store).run.apply(_$store5, arguments);
        }
    }, {
        key: "dispatch",
        value: function dispatch() {
            var _$store6;

            this.$store.source = this.source;
            return (_$store6 = this.$store).dispatch.apply(_$store6, arguments);
        }
    }, {
        key: "emit",
        value: function emit() {
            var _$store7;

            this.$store.source = this.source;
            (_$store7 = this.$store).emit.apply(_$store7, arguments);
        }
    }]);
    return UIElement;
}(EventMachine);

var App$1 = function (_UIElement) {
    inherits(App, _UIElement);

    function App() {
        classCallCheck(this, App);
        return possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    createClass(App, [{
        key: "initialize",
        value: function initialize() {
            var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this.$store = opt.store || new Store({
                modules: [].concat(toConsumableArray(this.getModuleList()), toConsumableArray(modules))
            });

            this.$body = new Dom(this.getContainer());
            this.$root = new Dom('div', this.getClassName());

            this.$body.append(this.$root);

            this.render(this.$root);

            // 이벤트 연결 
            this.initializeEvent();

            this.initBodyMoves();
        }
    }, {
        key: "getModuleList",
        value: function getModuleList() {
            return opt.modules || [];
        }
    }, {
        key: "getClassName",
        value: function getClassName() {
            return opt.className || 'csseditor';
        }
    }, {
        key: "getContainer",
        value: function getContainer() {
            return opt.container || document.body;
        }
    }, {
        key: "template",
        value: function template() {
            return "<div>" + opt.template + "</div>";
        }
    }, {
        key: "components",
        value: function components() {
            return opt.components || {};
        }
    }]);
    return App;
}(UIElement);

var start = function start(opt) {
    return new App(opt);
};

exports.start = start;
exports.Dom = Dom;
exports.EventChecker = EventChecker;
exports.EventAfterRunner = EventAfterRunner;
exports.CHECK_LOAD_PATTERN = CHECK_LOAD_PATTERN;
exports.CHECK_PATTERN = CHECK_PATTERN;
exports.WHITE_STRING = WHITE_STRING;
exports.NAME_SAPARATOR = NAME_SAPARATOR;
exports.CHECK_SAPARATOR = CHECK_SAPARATOR;
exports.LOAD_SAPARATOR = LOAD_SAPARATOR;
exports.SAPARATOR = SAPARATOR;
exports.CUSTOM = CUSTOM;
exports.CLICK = CLICK;
exports.DOUBLECLICK = DOUBLECLICK;
exports.MOUSEDOWN = MOUSEDOWN;
exports.MOUSEUP = MOUSEUP;
exports.MOUSEMOVE = MOUSEMOVE;
exports.MOUSEOVER = MOUSEOVER;
exports.MOUSEOUT = MOUSEOUT;
exports.MOUSEENTER = MOUSEENTER;
exports.MOUSELEAVE = MOUSELEAVE;
exports.TOUCHSTART = TOUCHSTART;
exports.TOUCHMOVE = TOUCHMOVE;
exports.TOUCHEND = TOUCHEND;
exports.KEYDOWN = KEYDOWN;
exports.KEYUP = KEYUP;
exports.KEYPRESS = KEYPRESS;
exports.DRAG = DRAG;
exports.DRAGSTART = DRAGSTART;
exports.DROP = DROP;
exports.DRAGOVER = DRAGOVER;
exports.DRAGENTER = DRAGENTER;
exports.DRAGLEAVE = DRAGLEAVE;
exports.DRAGEXIT = DRAGEXIT;
exports.DRAGOUT = DRAGOUT;
exports.DRAGEND = DRAGEND;
exports.CONTEXTMENU = CONTEXTMENU;
exports.CHANGE = CHANGE;
exports.INPUT = INPUT;
exports.PASTE = PASTE;
exports.RESIZE = RESIZE;
exports.SCROLL = SCROLL;
exports.SUBMIT = SUBMIT;
exports.POINTERSTART = POINTERSTART;
exports.POINTERMOVE = POINTERMOVE;
exports.POINTEREND = POINTEREND;
exports.CHANGEINPUT = CHANGEINPUT;
exports.WHEEL = WHEEL;
exports.CHECKER = CHECKER;
exports.AFTER = AFTER;
exports.IF = IF;
exports.ARROW_UP = ARROW_UP;
exports.ARROW_DOWN = ARROW_DOWN;
exports.ARROW_LEFT = ARROW_LEFT;
exports.ARROW_RIGHT = ARROW_RIGHT;
exports.ENTER = ENTER;
exports.SPACE = SPACE;
exports.ALT = ALT;
exports.SHIFT = SHIFT;
exports.META = META;
exports.CONTROL = CONTROL;
exports.SELF = SELF;
exports.CAPTURE = CAPTURE;
exports.FIT = FIT;
exports.PASSIVE = PASSIVE;
exports.DEBOUNCE = DEBOUNCE;
exports.MOVE = MOVE;
exports.END = END;
exports.LOAD = LOAD;
exports.ev = ev;
exports.posXY = posXY;
exports.PREVENT = PREVENT;
exports.GETTER_PREFIX = GETTER_PREFIX;
exports.ACTION_PREFIX = ACTION_PREFIX;
exports.GETTER = GETTER;
exports.ACTION = ACTION;
exports.Store = Store;
exports.debounce = debounce;
exports.filterProps = filterProps;
exports.collectProps = collectProps;
exports.uuid = uuid;
exports.uuidShort = uuidShort;
exports.keyEach = keyEach;
exports.keyMap = keyMap;
exports.defaultValue = defaultValue;
exports.isUndefined = isUndefined;
exports.isNotUndefined = isNotUndefined;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isString = isString;
exports.isNotString = isNotString;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.clone = clone;
exports.html = html;
exports.EVENT = EVENT;
exports.UIElement = UIElement;
exports.App = App$1;

return exports;

}({}));
