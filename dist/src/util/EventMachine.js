"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.splitMethodByKeyword = void 0;

var _Event = require("./Event");

var _Dom = _interopRequireDefault(require("./Dom"));

var _func = require("./functions/func");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        ", "\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var REFERENCE_PROPERTY = "ref";

var TEMP_DIV = _Dom["default"].create("div");

var QUERY_PROPERTY = "[".concat(REFERENCE_PROPERTY, "]");
var ATTR_lIST = [REFERENCE_PROPERTY];

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

    if ((0, _func.isNotUndefined)(returnValue)) {
      return returnValue;
    }
  };
};

var makeDelegateCallback = function makeDelegateCallback(context, eventObject, callback) {
  return function (e) {
    var delegateTarget = hasDelegate(e, eventObject);

    if (delegateTarget) {
      e.$delegateTarget = _Dom["default"].create(delegateTarget);
      var returnValue = runEventCallback(context, e, eventObject, callback);

      if ((0, _func.isNotUndefined)(returnValue)) {
        return returnValue;
      }
    }
  };
};

var runEventCallback = function runEventCallback(context, e, eventObject, callback) {
  e.xy = _Event.Event.posXY(e);

  if (eventObject.beforeMethods.length) {
    eventObject.beforeMethods.every(function (before) {
      return context[before.target].call(context, e, before.param);
    });
  }

  if (checkEventType(context, e, eventObject)) {
    var returnValue = callback(e, e.$delegateTarget, e.xy);

    if (eventObject.afterMethods.length) {
      eventObject.afterMethods.forEach(function (after) {
        return context[after.target].call(context, e, after.param);
      });
    }

    return returnValue;
  }
};

var checkEventType = function checkEventType(context, e, eventObject) {
  var hasKeyCode = true;

  if (eventObject.codes.length) {
    hasKeyCode = (e.code ? eventObject.codes.includes(e.code.toLowerCase()) : false) || (e.key ? eventObject.codes.includes(e.key.toLowerCase()) : false);
  }

  var isAllCheck = true;

  if (eventObject.checkMethodList.length) {
    isAllCheck = eventObject.checkMethodList.every(function (field) {
      var fieldValue = context[field];

      if ((0, _func.isFunction)(fieldValue) && fieldValue) {
        // check method
        return fieldValue.call(context, e);
      } else if ((0, _func.isNotUndefined)(fieldValue)) {
        // check field value
        return !!fieldValue;
      }

      return true;
    });
  }

  return hasKeyCode && isAllCheck;
};

var getDefaultDomElement = function getDefaultDomElement(context, dom) {
  var el;

  if (dom) {
    el = context.refs[dom] || context[dom] || window[dom];
  } else {
    el = context.el || context.$el || context.$root;
  }

  if (el instanceof _Dom["default"]) {
    return el.getElement();
  }

  return el;
};

var splitMethodByKeyword = function splitMethodByKeyword(arr, keyword) {
  var filterKeys = arr.filter(function (code) {
    return code.indexOf("".concat(keyword, "(")) > -1;
  });
  var filterMaps = filterKeys.map(function (code) {
    var _code$split$1$split$ = code.split("".concat(keyword, "("))[1].split(")")[0].trim().split(" "),
        _code$split$1$split$2 = _slicedToArray(_code$split$1$split$, 2),
        target = _code$split$1$split$2[0],
        param = _code$split$1$split$2[1];

    return {
      target: target,
      param: param
    };
  });
  return [filterKeys, filterMaps];
};

exports.splitMethodByKeyword = splitMethodByKeyword;

var getDefaultEventObject = function getDefaultEventObject(context, eventName, checkMethodFilters) {
  var arr = checkMethodFilters; // context 에 속한 변수나 메소드 리스트 체크

  var checkMethodList = arr.filter(function (code) {
    return !!context[code];
  }); // 이벤트 정의 시점에 적용 되어야 하는 것들은 모두 method() 화 해서 정의한다.

  var _splitMethodByKeyword = splitMethodByKeyword(arr, "after"),
      _splitMethodByKeyword2 = _slicedToArray(_splitMethodByKeyword, 2),
      afters = _splitMethodByKeyword2[0],
      afterMethods = _splitMethodByKeyword2[1];

  var _splitMethodByKeyword3 = splitMethodByKeyword(arr, "before"),
      _splitMethodByKeyword4 = _slicedToArray(_splitMethodByKeyword3, 2),
      befores = _splitMethodByKeyword4[0],
      beforeMethods = _splitMethodByKeyword4[1];

  var _splitMethodByKeyword5 = splitMethodByKeyword(arr, "debounce"),
      _splitMethodByKeyword6 = _slicedToArray(_splitMethodByKeyword5, 2),
      debounces = _splitMethodByKeyword6[0],
      debounceMethods = _splitMethodByKeyword6[1];

  var _splitMethodByKeyword7 = splitMethodByKeyword(arr, "throttle"),
      _splitMethodByKeyword8 = _slicedToArray(_splitMethodByKeyword7, 2),
      throttles = _splitMethodByKeyword8[0],
      throttleMethods = _splitMethodByKeyword8[1];

  var _splitMethodByKeyword9 = splitMethodByKeyword(arr, "capture"),
      _splitMethodByKeyword10 = _slicedToArray(_splitMethodByKeyword9, 1),
      captures = _splitMethodByKeyword10[0]; // 위의 5개 필터 이외에 있는 코드들은 keycode 로 인식한다.


  var filteredList = [].concat(_toConsumableArray(checkMethodList), _toConsumableArray(afters), _toConsumableArray(befores), _toConsumableArray(debounces), _toConsumableArray(throttles), _toConsumableArray(captures));
  var codes = arr.filter(function (code) {
    return !filteredList.includes(code);
  }).map(function (code) {
    return code.toLowerCase();
  });
  return {
    eventName: eventName,
    codes: codes,
    captures: captures,
    afterMethods: afterMethods,
    beforeMethods: beforeMethods,
    debounceMethods: debounceMethods,
    throttleMethods: throttleMethods,
    checkMethodList: checkMethodList
  };
};

var addEvent = function addEvent(context, eventObject, callback) {
  eventObject.callback = makeCallback(context, eventObject, callback);
  context.addBinding(eventObject);

  _Event.Event.addEvent(eventObject.dom, eventObject.eventName, eventObject.callback, !!eventObject.captures.length);
};

var bindingEvent = function bindingEvent(context, _ref, checkMethodFilters, callback) {
  var _ref2 = _toArray(_ref),
      eventName = _ref2[0],
      dom = _ref2[1],
      delegate = _ref2.slice(2);

  var eventObject = getDefaultEventObject(context, eventName, checkMethodFilters);
  eventObject.dom = getDefaultDomElement(context, dom);
  eventObject.delegate = delegate.join(_Event.SAPARATOR);

  if (eventObject.debounceMethods.length) {
    var debounceTime = +eventObject.debounceMethods[0].target;
    callback = (0, _func.debounce)(callback, debounceTime);
  } else if (eventObject.throttleMethods.length) {
    var throttleTime = +eventObject.throttleMethods[0].target;
    callback = (0, _func.throttle)(callback, throttleTime);
  }

  addEvent(context, eventObject, callback);
};

var getEventNames = function getEventNames(eventName) {
  var results = [];
  eventName.split(_Event.NAME_SAPARATOR).forEach(function (e) {
    return results.push.apply(results, _toConsumableArray(e.split(_Event.NAME_SAPARATOR)));
  });
  return results;
};

var parseEvent = function parseEvent(context, key) {
  var checkMethodFilters = key.split(_Event.CHECK_SAPARATOR).map(function (it) {
    return it.trim();
  });
  var eventSelectorAndBehave = checkMethodFilters.shift();

  var _eventSelectorAndBeha = eventSelectorAndBehave.split(_Event.SAPARATOR),
      _eventSelectorAndBeha2 = _toArray(_eventSelectorAndBeha),
      eventName = _eventSelectorAndBeha2[0],
      params = _eventSelectorAndBeha2.slice(1);

  var eventNames = getEventNames(eventName);
  var callback = context[key].bind(context);
  eventNames.forEach(function (eventName) {
    bindingEvent(context, [eventName].concat(_toConsumableArray(params)), checkMethodFilters, callback);
  });
};

var applyElementAttribute = function applyElementAttribute($element, key, value) {
  if (key === "style") {
    if ((0, _func.isObject)(value)) {
      (0, _func.keyEach)(value, function (sKey, sValue) {
        if (!sValue) {
          $element.removeStyle(sKey);
        } else {
          $element.css(sKey, sValue);
        }
      });
    }

    return;
  } else if (key === "class") {
    if ((0, _func.isArray)(value)) {
      $element.addClass.apply($element, _toConsumableArray(value));
    } else if ((0, _func.isObject)(value)) {
      (0, _func.keyEach)(value, function (k, v) {
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

  if ((0, _func.isUndefined)(value)) {
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

var EventMachine = /*#__PURE__*/function () {
  function EventMachine() {
    _classCallCheck(this, EventMachine);

    this.state = {};
    this.prevState = {};
    this.refs = {};
    this.children = {};
    this._bindings = [];
    this.id = (0, _func.uuid)();
    this.childComponents = this.components();
  }

  _createClass(EventMachine, [{
    key: "initState",
    value: function initState() {
      return {};
    }
  }, {
    key: "setState",
    value: function setState() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var isLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.prevState = this.state;
      this.state = _objectSpread({}, this.state, state);

      if (isLoad) {
        this.load();
      }
    }
  }, {
    key: "_reload",
    value: function _reload(props) {
      this.props = props;
      this.setState(this.initState(), false);
      this.refresh();
    }
  }, {
    key: "render",
    value: function render($container) {
      this.$el = this.parseTemplate((0, _func.html)(_templateObject(), this.template()));
      this.refs.$el = this.$el;
      if ($container) $container.append(this.$el);
      this.load();
      this.parseComponent(false);
      this.afterRender();
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.state = this.initState();
    }
  }, {
    key: "afterRender",
    value: function afterRender() {}
  }, {
    key: "components",
    value: function components() {
      return {};
    }
  }, {
    key: "getRef",
    value: function getRef() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.refs[args.join('')];
    }
  }, {
    key: "parseTemplate",
    value: function parseTemplate(html, isLoad) {
      var _this = this;

      if ((0, _func.isArray)(html)) html = html.join('');
      html = html.trim();
      var list = TEMP_DIV.html(html).children();
      list.forEach(function ($el) {
        // ref element 정리
        var ref = $el.attr(REFERENCE_PROPERTY);

        if (ref) {
          _this.refs[ref] = $el;
        }

        var refs = $el.$$(QUERY_PROPERTY);
        var temp = {};
        refs.forEach(function ($dom) {
          var name = $dom.attr(REFERENCE_PROPERTY);

          if (temp[name]) {
            console.warn("".concat(ref, " is duplicated. - ").concat(_this.sourceName));
          } else {
            temp[name] = true;
          }

          _this.refs[name] = $dom;
        });
      });

      if (!isLoad) {
        return list[0];
      }

      return TEMP_DIV.createChildrenFragment();
    }
  }, {
    key: "childrenIds",
    value: function childrenIds() {
      return (0, _func.keyMap)(this.children, function (key, obj) {
        return obj.id;
      });
    }
  }, {
    key: "parseProperty",
    value: function parseProperty($dom) {
      var props = {}; // parse properties 

      _toConsumableArray($dom.el.attributes).filter(function (t) {
        return ATTR_lIST.indexOf(t.nodeName) < 0;
      }).forEach(function (t) {
        props[t.nodeName] = t.nodeValue;
      }); // property 태그는 속성으로 대체 


      $dom.$$('property').forEach(function ($p) {
        var _$p$attrs = $p.attrs('name', 'value', 'type'),
            _$p$attrs2 = _slicedToArray(_$p$attrs, 3),
            name = _$p$attrs2[0],
            value = _$p$attrs2[1],
            type = _$p$attrs2[2];

        var realValue = value || $p.text(); // JSON 타입이면 JSON.parse 로 객체를 복원해서 넘겨준다. 

        if (type === 'json') {
          realValue = JSON.parse(realValue);
        }

        props[name] = realValue;
      });
      return props;
    }
  }, {
    key: "parseComponent",
    value: function parseComponent() {
      var _this2 = this;

      var $el = this.$el;
      (0, _func.keyEach)(this.childComponents, function (ComponentName, Component) {
        var targets = $el.$$(ComponentName.toLowerCase());
        targets.forEach(function ($dom) {
          var props = _this2.parseProperty($dom);

          var refName = $dom.attr(REFERENCE_PROPERTY);
          var instance = null;

          if (_this2.children[refName]) {
            //  기존의 같은 객체가 있으면 객체를 새로 생성하지 않고 재활용한다. 
            instance = _this2.children[refName];

            instance._reload(props);
          } else {
            instance = new Component(_this2, props);
            _this2.children[refName || instance.id] = instance;
            instance.render();
            instance.initializeEvent();
          }

          $dom.replace(instance.$el);
        });
      });
      (0, _func.keyEach)(this.children, function (key, obj) {
        if (obj && obj.clean()) {
          delete _this2.children[key];
        }
      });
    }
  }, {
    key: "clean",
    value: function clean() {
      if (!this.$el.hasParent()) {
        (0, _func.keyEach)(this.children, function (key, child) {
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

  }, {
    key: "refresh",
    value: function refresh() {
      this.load();
    }
    /**
     * 특정 load 함수를 실행한다.  문자열을 그대로 return 한다. 
     * @param  {...any} args 
     */

  }, {
    key: "loadTemplate",
    value: function loadTemplate() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this[(0, _Event.LOAD)(args.join(''))].call(this);
    }
  }, {
    key: "load",
    value: function load() {
      var _this3 = this;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (!this._loadMethods) {
        this._loadMethods = this.filterProps(_Event.CHECK_LOAD_PATTERN);
      }

      this._loadMethods.filter(function (callbackName) {
        var elName = callbackName.split(_Event.LOAD_SAPARATOR)[1];
        if (!args.length) return true;
        return args.includes(elName);
      }).forEach(function (callbackName) {
        var elName = callbackName.split(_Event.LOAD_SAPARATOR)[1];

        if (_this3.refs[elName]) {
          var _this3$callbackName;

          var newTemplate = (_this3$callbackName = _this3[callbackName]).call.apply(_this3$callbackName, [_this3].concat(args));

          if ((0, _func.isArray)(newTemplate)) {
            newTemplate = newTemplate.join('');
          }

          var fragment = _this3.parseTemplate(newTemplate, true);

          _this3.refs[elName].html(fragment);

          _this3.initializeDomEvent();
        }
      });

      this.bindData();
      this.parseComponent();
    }
  }, {
    key: "bindData",
    value: function bindData() {
      var _this4 = this;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (!this._bindMethods) {
        this._bindMethods = this.filterProps(_Event.CHECK_BIND_PATTERN);
      }

      this._bindMethods.filter(function (originalCallbackName) {
        if (!args.length) return true;

        var _originalCallbackName = originalCallbackName.split(_Event.CHECK_SAPARATOR),
            _originalCallbackName2 = _slicedToArray(_originalCallbackName, 2),
            callbackName = _originalCallbackName2[0],
            id = _originalCallbackName2[1];

        var _callbackName$split = callbackName.split(' '),
            _callbackName$split2 = _slicedToArray(_callbackName$split, 2),
            _ = _callbackName$split2[0],
            $bind = _callbackName$split2[1];

        return args.includes($bind);
      }).forEach(function (callbackName) {
        var bindMethod = _this4[callbackName];

        var _callbackName$split3 = callbackName.split(_Event.CHECK_SAPARATOR),
            _callbackName$split4 = _slicedToArray(_callbackName$split3, 2),
            callbackName = _callbackName$split4[0],
            id = _callbackName$split4[1];

        var refObject = _this4.getRef(id);

        var refCallback = _Event.BIND_CHECK_DEFAULT_FUNCTION;

        if (refObject != '' && (0, _func.isString)(refObject)) {
          refCallback = (0, _Event.BIND_CHECK_FUNCTION)(refObject);
        } else if ((0, _func.isFunction)(refObject)) {
          refCallback = refObject;
        }

        var elName = callbackName.split(_Event.BIND_SAPARATOR)[1];
        var $element = _this4.refs[elName];
        var isBindCheck = (0, _func.isFunction)(refCallback) && refCallback.call(_this4);

        if ($element && isBindCheck) {
          var results = bindMethod.call.apply(bindMethod, [_this4].concat(args));
          if (!results) return;
          (0, _func.keyEach)(results, function (key, value) {
            applyElementAttribute($element, key, value);
          });
        }
      });
    } // 기본 템플릿 지정

  }, {
    key: "template",
    value: function template() {
      var className = this.templateClass();
      var classString = className ? "class=\"".concat(className, "\"") : '';
      return "<div ".concat(classString, "></div>");
    }
  }, {
    key: "templateClass",
    value: function templateClass() {
      return null;
    }
  }, {
    key: "eachChildren",
    value: function eachChildren(callback) {
      if (!(0, _func.isFunction)(callback)) return;
      (0, _func.keyEach)(this.children, function (_, Component) {
        return callback(Component);
      });
    }
    /**
     * 이벤트를 초기화한다.
     */

  }, {
    key: "initializeEvent",
    value: function initializeEvent() {
      this.initializeDomEvent();
      this.eachChildren(function (Component) {
        return Component.initializeEvent();
      });
    }
    /**
     * 자원을 해제한다.
     * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.destroyDomEvent();
      this.eachChildren(function (Component) {
        return Component.destroy();
      });
    }
  }, {
    key: "destroyDomEvent",
    value: function destroyDomEvent() {
      this.removeEventAll();
    }
  }, {
    key: "initializeDomEvent",
    value: function initializeDomEvent() {
      var _this5 = this;

      this.destroyDomEvent();
      this.filterProps(_Event.CHECK_PATTERN).forEach(function (key) {
        return parseEvent(_this5, key);
      });
    }
    /**
     * property 수집하기
     * 상위 클래스의 모든 property 를 수집해서 리턴한다.
     */

  }, {
    key: "collectProps",
    value: function collectProps() {
      var _this6 = this;

      var p = this.__proto__;
      var results = [];

      do {
        var isObject = p instanceof Object;

        if (isObject === false) {
          break;
        }

        var names = Object.getOwnPropertyNames(p).filter(function (name) {
          return (0, _func.isFunction)(_this6[name]);
        });
        results.push.apply(results, _toConsumableArray(names));
        p = p.__proto__;
      } while (p);

      return results;
    }
  }, {
    key: "filterProps",
    value: function filterProps(pattern) {
      return this.collectProps().filter(function (key) {
        return key.match(pattern);
      });
    }
    /* magic check method  */

  }, {
    key: "self",
    value: function self(e) {
      return e && e.$delegateTarget && e.$delegateTarget.is(e.target);
    }
  }, {
    key: "isAltKey",
    value: function isAltKey(e) {
      return e.altKey;
    }
  }, {
    key: "isCtrlKey",
    value: function isCtrlKey(e) {
      return e.ctrlKey;
    }
  }, {
    key: "isShiftKey",
    value: function isShiftKey(e) {
      return e.shiftKey;
    }
  }, {
    key: "isMetaKey",
    value: function isMetaKey(e) {
      return e.metaKey;
    }
    /* magic check method */

    /** before check method */

    /** before check method */

    /* after check method */

  }, {
    key: "preventDefault",
    value: function preventDefault(e) {
      e.preventDefault();
      return true;
    }
  }, {
    key: "stopPropagation",
    value: function stopPropagation(e) {
      e.stopPropagation();
      return true;
    }
  }, {
    key: "bodyMouseMove",
    value: function bodyMouseMove(e, methodName) {
      if (this[methodName]) {
        this.emit('add/body/mousemove', this[methodName], this, e.xy);
      }
    }
  }, {
    key: "bodyMouseUp",
    value: function bodyMouseUp(e, methodName) {
      if (this[methodName]) {
        this.emit('add/body/mouseup', this[methodName], this, e.xy);
      }
    }
    /* after check method */

  }, {
    key: "getBindings",
    value: function getBindings() {
      if (!this._bindings) {
        this.initBindings();
      }

      return this._bindings;
    }
  }, {
    key: "addBinding",
    value: function addBinding(obj) {
      this.getBindings().push(obj);
    }
  }, {
    key: "initBindings",
    value: function initBindings() {
      this._bindings = [];
    }
  }, {
    key: "removeEventAll",
    value: function removeEventAll() {
      var _this7 = this;

      this.getBindings().forEach(function (obj) {
        _this7.removeEvent(obj);
      });
      this.initBindings();
    }
  }, {
    key: "removeEvent",
    value: function removeEvent(_ref3) {
      var eventName = _ref3.eventName,
          dom = _ref3.dom,
          callback = _ref3.callback;

      _Event.Event.removeEvent(dom, eventName, callback);
    }
  }]);

  return EventMachine;
}();

exports["default"] = EventMachine;