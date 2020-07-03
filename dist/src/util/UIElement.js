"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.EVENT = exports.PIPE = void 0;

var _func = require("./functions/func");

var _EventMachine2 = _interopRequireWildcard(require("./EventMachine"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var REG_STORE_MULTI_PATTERN = /^ME@/;
var MULTI_PREFIX = "ME@";
var SPLITTER = "|";

var PIPE = function PIPE() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.join(SPLITTER);
};

exports.PIPE = PIPE;

var EVENT = function EVENT() {
  return MULTI_PREFIX + PIPE.apply(void 0, arguments);
};

exports.EVENT = EVENT;

var UIElement = /*#__PURE__*/function (_EventMachine) {
  _inherits(UIElement, _EventMachine);

  function UIElement(opt) {
    var _this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, UIElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIElement).call(this, opt));

    _this.initializeProperty(opt, props);

    _this.created();

    _this.initialize();

    _this.initializeStoreEvent();

    return _this;
  }
  /**
   * UIElement instance 에 필요한 기본 속성 설정 
   */


  _createClass(UIElement, [{
    key: "initializeProperty",
    value: function initializeProperty(opt) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.opt = opt || {};
      this.parent = this.opt;
      this.props = props;
      this.source = (0, _func.uuid)();
      this.sourceName = this.constructor.name;
      if (opt && opt.$store) this.$store = opt.$store;
      if (opt && opt.$app) this.$app = opt.$app;
    }
  }, {
    key: "created",
    value: function created() {}
  }, {
    key: "getRealEventName",
    value: function getRealEventName(e) {
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MULTI_PREFIX;
      var startIndex = e.indexOf(s);
      return e.substr(startIndex < 0 ? 0 : startIndex + s.length);
    }
  }, {
    key: "initializeStoreEvent",
    value: function initializeStoreEvent() {
      var _this2 = this;

      this.storeEvents = {};
      this.filterProps(REG_STORE_MULTI_PATTERN).forEach(function (key) {
        var events = _this2.getRealEventName(key, MULTI_PREFIX); // support deboounce for store event 


        var _splitMethodByKeyword = (0, _EventMachine2.splitMethodByKeyword)(events.split(SPLITTER), 'debounce'),
            _splitMethodByKeyword2 = _slicedToArray(_splitMethodByKeyword, 2),
            debounceMethods = _splitMethodByKeyword2[0],
            params = _splitMethodByKeyword2[1];

        var debounceSecond = 0;

        if (debounceMethods.length) {
          debounceSecond = +params[0].target || 0;
        }

        events.split(SPLITTER).filter(function (it) {
          return debounceMethods.includes(it) === false;
        }).map(function (it) {
          return it.trim();
        }).forEach(function (e) {
          var callback = _this2[key].bind(_this2);

          callback.source = _this2.source;
          _this2.storeEvents[e] = callback;

          _this2.$store.on(e, _this2.storeEvents[e], _this2, debounceSecond);
        });
      });
    }
  }, {
    key: "destoryStoreEvent",
    value: function destoryStoreEvent() {
      this.$store.offAll(this);
      this.storeEvents = {};
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(UIElement.prototype), "destroy", this).call(this);

      this.destoryStoreEvent();
    }
  }, {
    key: "emit",
    value: function emit() {
      var _this$$store;

      this.$store.source = this.source;

      (_this$$store = this.$store).emit.apply(_this$$store, arguments);
    }
  }, {
    key: "trigger",
    value: function trigger() {
      var _this$$store2;

      this.$store.source = this.source;

      (_this$$store2 = this.$store).trigger.apply(_this$$store2, arguments);
    }
  }, {
    key: "on",
    value: function on(message, callback) {
      this.$store.on(message, callback);
    }
  }, {
    key: "off",
    value: function off(message, callback) {
      this.$store.off(message, callback);
    }
  }]);

  return UIElement;
}(_EventMachine2["default"]);

var _default = UIElement;
exports["default"] = _default;