"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _func = require("./functions/func");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dom = /*#__PURE__*/function () {
  function Dom(tag, className, attr) {
    _classCallCheck(this, Dom);

    if ((0, _func.isNotString)(tag)) {
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

  _createClass(Dom, [{
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

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return args.map(function (key) {
        return _this.el.getAttribute(key);
      });
    }
  }, {
    key: "styles",
    value: function styles() {
      var _this2 = this;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return args.map(function (key) {
        return _this2.el.style[key];
      });
    }
  }, {
    key: "removeAttr",
    value: function removeAttr(key) {
      this.el.removeAttribute(key);
      return this;
    }
  }, {
    key: "removeStyle",
    value: function removeStyle(key) {
      this.el.style.removeProperty(key);
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
  }, {
    key: "parent",
    value: function parent() {
      return Dom.create(this.el.parentNode);
    }
  }, {
    key: "hasParent",
    value: function hasParent() {
      return !!this.el.parentNode;
    }
  }, {
    key: "removeClass",
    value: function removeClass() {
      var _this$el$classList;

      (_this$el$classList = this.el.classList).remove.apply(_this$el$classList, arguments);

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
      var _this$el$classList2;

      (_this$el$classList2 = this.el.classList).add.apply(_this$el$classList2, arguments);

      return this;
    }
  }, {
    key: "onlyOneClass",
    value: function onlyOneClass(cls) {
      var parent = this.parent();
      var selected = parent.$(".".concat(cls));
      if (selected) selected.removeClass(cls);
      this.addClass(cls);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(cls, isForce) {
      this.el.classList.toggle(cls, isForce);
    }
  }, {
    key: "html",
    value: function html(_html) {
      if ((0, _func.isUndefined)(_html)) {
        return this.el.innerHTML;
      }

      if ((0, _func.isString)(_html)) {
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
      return node ? Dom.create(node) : null;
    }
  }, {
    key: "findAll",
    value: function findAll(selector) {
      return this.el.querySelectorAll(selector);
    }
  }, {
    key: "$$",
    value: function $$(selector) {
      return _toConsumableArray(this.findAll(selector)).map(function (node) {
        return Dom.create(node);
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
      if ((0, _func.isString)(el)) {
        this.el.appendChild(document.createTextNode(el));
      } else {
        this.el.appendChild(el.el || el);
      }

      return this;
    }
  }, {
    key: "appendHTML",
    value: function appendHTML(html) {
      var $dom = Dom.create("div").html(html);
      this.append($dom.createChildrenFragment());
    }
    /**
     * create document fragment with children dom
     */

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
      if ((0, _func.isUndefined)(value)) {
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
      if ((0, _func.isNotUndefined)(key) && (0, _func.isNotUndefined)(value)) {
        this.el.style[key] = value;
      } else if ((0, _func.isNotUndefined)(key)) {
        if ((0, _func.isString)(key)) {
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
  }, {
    key: "getComputedStyle",
    value: function (_getComputedStyle) {
      function getComputedStyle() {
        return _getComputedStyle.apply(this, arguments);
      }

      getComputedStyle.toString = function () {
        return _getComputedStyle.toString();
      };

      return getComputedStyle;
    }(function () {
      var css = getComputedStyle(this.el);
      var obj = {};

      for (var _len3 = arguments.length, list = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        list[_key3] = arguments[_key3];
      }

      list.forEach(function (it) {
        obj[it] = css[it];
      });
      return obj;
    })
  }, {
    key: "getStyleList",
    value: function getStyleList() {
      var _this3 = this;

      var style = {};
      var len = this.el.style.length;

      for (var i = 0; i < len; i++) {
        var key = this.el.style[i];
        style[key] = this.el.style[key];
      }

      for (var _len4 = arguments.length, list = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        list[_key4] = arguments[_key4];
      }

      list.forEach(function (key) {
        style[key] = _this3.css(key);
      });
      return style;
    }
  }, {
    key: "cssText",
    value: function cssText(value) {
      if ((0, _func.isUndefined)(value)) {
        return this.el.style.cssText;
      }

      if (value != this.el.style.cssText) {
        this.el.style.cssText = value;
      }

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
    key: "offsetRect",
    value: function offsetRect() {
      return {
        top: this.el.offsetTop,
        left: this.el.offsetLeft,
        width: this.el.offsetWidth,
        height: this.el.offsetHeight
      };
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
          top: parseFloat(this.css("top")),
          left: parseFloat(this.css("left"))
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
      return this.width() - this.cssFloat("padding-left") - this.cssFloat("padding-right");
    }
  }, {
    key: "height",
    value: function height() {
      return this.el.offsetHeight || this.rect().height;
    }
  }, {
    key: "contentHeight",
    value: function contentHeight() {
      return this.height() - this.cssFloat("padding-top") - this.cssFloat("padding-bottom");
    }
  }, {
    key: "val",
    value: function val(value) {
      var tempValue = value;

      if (value instanceof Dom) {
        tempValue = value.val();
      }

      this.el.value = tempValue;
      return this;
    }
  }, {
    key: "show",
    value: function show() {
      var displayType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "block";
      return this.css("display", displayType != "none" ? displayType : "block");
    }
  }, {
    key: "hide",
    value: function hide() {
      return this.css("display", "none");
    }
  }, {
    key: "toggle",
    value: function toggle(isForce) {
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
  }, {
    key: "scrollIntoView",
    value: function scrollIntoView() {
      this.el.scrollIntoView();
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
      var $element = Dom.create(tag, className, attrs);
      $element.css(css);
      this.append($element);
      return $element;
    }
  }, {
    key: "firstChild",
    value: function firstChild() {
      return Dom.create(this.el.firstElementChild);
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
        results.push(Dom.create(element));
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
  }, {
    key: "select",
    value: function select() {
      this.el.select();
      return this;
    }
  }, {
    key: "blur",
    value: function blur() {
      this.el.blur();
      return this;
    }
  }, {
    key: "select",
    value: function select() {
      this.el.select();
      return this;
    }
  }, {
    key: "value",
    get: function get() {
      return this.el.value;
    }
  }, {
    key: "scrollTop",
    get: function get() {
      if (this.el === document.body) {
        return Dom.getScrollTop();
      }

      return this.el.scrollTop;
    }
  }, {
    key: "scrollLeft",
    get: function get() {
      if (this.el === document.body) {
        return Dom.getScrollLeft();
      }

      return this.el.scrollLeft;
    }
  }, {
    key: "scrollHeight",
    get: function get() {
      return this.el.scrollHeight;
    }
  }, {
    key: "scrollWidth",
    get: function get() {
      return this.el.scrollWidth;
    }
  }], [{
    key: "create",
    value: function create(tag, className, attr) {
      return new Dom(tag, className, attr);
    }
  }, {
    key: "getScrollTop",
    value: function getScrollTop() {
      return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    }
  }, {
    key: "getScrollLeft",
    value: function getScrollLeft() {
      return Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft);
    }
  }, {
    key: "parse",
    value: function parse(html) {
      var parser = DOMParser();
      return parser.parseFromString(html, "text/htmll");
    }
  }]);

  return Dom;
}();

exports["default"] = Dom;