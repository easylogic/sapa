"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _Dom = _interopRequireDefault(require("./Dom"));

var _Event = require("./Event");

var _BaseStore = _interopRequireDefault(require("./BaseStore"));

var _UIElement2 = _interopRequireWildcard(require("./UIElement"));

var _func = require("./functions/func");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EMPTY_POS = {
  x: 0,
  y: 0
};
var MOVE_CHECK_MS = 10;

var start = function start(opt) {
  var App = /*#__PURE__*/function (_UIElement) {
    _inherits(App, _UIElement);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, [{
      key: "initialize",
      value: function initialize() {
        this.$store = new _BaseStore["default"]();
        this.$app = this;
        this.$container = _Dom["default"].create(this.getContainer());
        this.$container.addClass(this.getClassName());
        this.render(this.$container); // 이벤트 연결

        this.initializeEvent();
        this.initBodyMoves();
      }
    }, {
      key: "initState",
      value: function initState() {
        return {
          pos: {},
          oldPos: {}
        };
      }
    }, {
      key: "initBodyMoves",
      value: function initBodyMoves() {
        this.moves = new Set();
        this.ends = new Set();
        this.modifyBodyMoveSecond(MOVE_CHECK_MS);
      }
    }, {
      key: "modifyBodyMoveSecond",
      value: function modifyBodyMoveSecond() {
        var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MOVE_CHECK_MS;
        this.funcBodyMoves = (0, _func.debounce)(this.loopBodyMoves.bind(this), ms);
      }
    }, {
      key: "loopBodyMoves",
      value: function loopBodyMoves() {
        var _this$state = this.state,
            oldPos = _this$state.oldPos,
            pos = _this$state.pos;
        var isRealMoved = oldPos.x != pos.x || oldPos.y != pos.y;

        if (isRealMoved && this.moves.size) {
          this.moves.forEach(function (v) {
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
    }, {
      key: "removeBodyMoves",
      value: function removeBodyMoves() {
        var pos = this.state.pos;
        this.ends.forEach(function (v) {
          v.func.call(v.context, pos.x - v.xy.x, pos.y - v.xy.y, 'end');
        });
        this.moves.clear();
        this.ends.clear();
      }
    }, {
      key: (0, _UIElement2.EVENT)('add/body/mousemove'),
      value: function value(func, context, xy) {
        this.moves.add({
          func: func,
          context: context,
          xy: xy
        });
      }
    }, {
      key: (0, _UIElement2.EVENT)('add/body/mouseup'),
      value: function value(func, context, xy) {
        this.ends.add({
          func: func,
          context: context,
          xy: xy
        });
      }
    }, {
      key: "getClassName",
      value: function getClassName() {
        return opt.className || "sapa";
      }
    }, {
      key: "getContainer",
      value: function getContainer() {
        return opt.container || document.body;
      }
    }, {
      key: "template",
      value: function template() {
        return "<div>".concat(opt.template, "</div>");
      }
    }, {
      key: "components",
      value: function components() {
        return opt.components || {};
      }
    }, {
      key: (0, _Event.POINTERMOVE)("document"),
      value: function value(e) {
        var oldPos = this.state.pos || EMPTY_POS;
        var newPos = e.xy || EMPTY_POS;
        this.bodyMoved = !(oldPos.x == newPos.x && oldPos.y == newPos.y);
        this.setState({
          bodyEvent: e,
          pos: newPos,
          oldPos: oldPos
        }, false);

        if (!this.requestId) {
          this.requestId = requestAnimationFrame(this.funcBodyMoves);
        }
      }
    }, {
      key: (0, _Event.POINTEREND)("document") + (0, _Event.DEBOUNCE)(50),
      value: function value(e) {
        var newPos = e.xy || EMPTY_POS;
        this.setState({
          bodyEvent: e,
          pos: newPos
        }, false);
        this.removeBodyMoves();
        this.requestId = null;
      }
    }]);

    return App;
  }(_UIElement2["default"]);

  return new App(opt);
};

exports.start = start;