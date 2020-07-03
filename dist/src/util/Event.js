"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = exports.BIND = exports.LOAD = exports.BIND_CHECK_DEFAULT_FUNCTION = exports.BIND_CHECK_FUNCTION = exports.getRef = exports.createRef = exports.STOP = exports.PREVENT = exports.END = exports.MOVE = exports.CAPTURE = exports.THROTTLE = exports.DEBOUNCE = exports.SELF = exports.CONTROL = exports.META = exports.SHIFT = exports.ALT = exports.SPACE = exports.ENTER = exports.ARROW_RIGHT = exports.ARROW_LEFT = exports.ARROW_DOWN = exports.ARROW_UP = exports.IF = exports.BEFORE = exports.AFTER = exports.CHECKER = exports.WHEEL = exports.CHANGEINPUT = exports.POINTEREND = exports.POINTERMOVE = exports.POINTERSTART = exports.SUBMIT = exports.SCROLL = exports.RESIZE = exports.PASTE = exports.BLUR = exports.FOCUSOUT = exports.FOCUSIN = exports.FOCUS = exports.INPUT = exports.CHANGE = exports.CONTEXTMENU = exports.DRAGEND = exports.DRAGOUT = exports.DRAGEXIT = exports.DRAGLEAVE = exports.DRAGENTER = exports.DRAGOVER = exports.DROP = exports.DRAGSTART = exports.DRAG = exports.KEYPRESS = exports.KEYUP = exports.KEYDOWN = exports.TOUCHEND = exports.TOUCHMOVE = exports.TOUCHSTART = exports.MOUSELEAVE = exports.MOUSEENTER = exports.MOUSEOUT = exports.MOUSEOVER = exports.MOUSEMOVE = exports.MOUSEUP = exports.MOUSEDOWN = exports.DOUBLECLICK = exports.CLICK = exports.CUSTOM = exports.SAPARATOR = exports.BIND_SAPARATOR = exports.LOAD_SAPARATOR = exports.CHECK_SAPARATOR = exports.NAME_SAPARATOR = exports.CHECK_PATTERN = exports.CHECK_BIND_PATTERN = exports.CHECK_LOAD_PATTERN = exports.EventBeforeRunner = exports.EventAfterRunner = exports.EventChecker = void 0;

var _func = require("./functions/func");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventChecker = /*#__PURE__*/function () {
  function EventChecker(value) {
    var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;

    _classCallCheck(this, EventChecker);

    this.value = value;
    this.split = split;
  }

  _createClass(EventChecker, [{
    key: "toString",
    value: function toString() {
      return " ".concat(this.split, " ") + this.value;
    }
  }]);

  return EventChecker;
}();

exports.EventChecker = EventChecker;

var EventAfterRunner = /*#__PURE__*/function () {
  function EventAfterRunner(value) {
    var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;

    _classCallCheck(this, EventAfterRunner);

    this.value = value;
    this.split = split;
  }

  _createClass(EventAfterRunner, [{
    key: "toString",
    value: function toString() {
      return " ".concat(this.split, " after(").concat(this.value, ")");
    }
  }]);

  return EventAfterRunner;
}();

exports.EventAfterRunner = EventAfterRunner;

var EventBeforeRunner = /*#__PURE__*/function () {
  function EventBeforeRunner(value) {
    var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;

    _classCallCheck(this, EventBeforeRunner);

    this.value = value;
    this.split = split;
  }

  _createClass(EventBeforeRunner, [{
    key: "toString",
    value: function toString() {
      return " ".concat(this.split, " before(").concat(this.value, ")");
    }
  }]);

  return EventBeforeRunner;
}(); // event name regular expression


exports.EventBeforeRunner = EventBeforeRunner;
var CHECK_LOAD_PATTERN = /^load (.*)/gi;
exports.CHECK_LOAD_PATTERN = CHECK_LOAD_PATTERN;
var CHECK_BIND_PATTERN = /^bind (.*)/gi;
exports.CHECK_BIND_PATTERN = CHECK_BIND_PATTERN;
var CHECK_CLICK_PATTERN = "click|dblclick";
var CHECK_MOUSE_PATTERN = "mouse(down|up|move|over|out|enter|leave)";
var CHECK_POINTER_PATTERN = "pointer(start|move|end)";
var CHECK_TOUCH_PATTERN = "touch(start|move|end)";
var CHECK_KEY_PATTERN = "key(down|up|press)";
var CHECK_DRAGDROP_PATTERN = "drag|drop|drag(start|over|enter|leave|exit|end)";
var CHECK_CONTEXT_PATTERN = "contextmenu";
var CHECK_INPUT_PATTERN = "change|input|focus|blur|focus(in|out)";
var CHECK_CLIPBOARD_PATTERN = "paste";
var CHECK_BEHAVIOR_PATTERN = "resize|scroll|wheel|mousewheel|DOMMouseScroll";
var CHECK_FORM_PATTERN = "submit";
var CHECK_PATTERN_LIST = [CHECK_CLICK_PATTERN, CHECK_MOUSE_PATTERN, CHECK_POINTER_PATTERN, CHECK_TOUCH_PATTERN, CHECK_KEY_PATTERN, CHECK_DRAGDROP_PATTERN, CHECK_CONTEXT_PATTERN, CHECK_INPUT_PATTERN, CHECK_CLIPBOARD_PATTERN, CHECK_BEHAVIOR_PATTERN, CHECK_FORM_PATTERN].join("|");
var CHECK_PATTERN = new RegExp("^(".concat(CHECK_PATTERN_LIST, "s)"), "ig");
exports.CHECK_PATTERN = CHECK_PATTERN;
var NAME_SAPARATOR = ":";
exports.NAME_SAPARATOR = NAME_SAPARATOR;
var CHECK_SAPARATOR = "|";
exports.CHECK_SAPARATOR = CHECK_SAPARATOR;
var LOAD_SAPARATOR = "load ";
exports.LOAD_SAPARATOR = LOAD_SAPARATOR;
var BIND_SAPARATOR = "bind ";
exports.BIND_SAPARATOR = BIND_SAPARATOR;
var SAPARATOR = ' '; // 임의의 값을 저장하기 위한 구조
// 임의의 값은 하나의 id 로 만들어지고 id 를 조회 할 때  값으로 다시 치환

exports.SAPARATOR = SAPARATOR;
var refManager = {};

var DOM_EVENT_MAKE = function DOM_EVENT_MAKE() {
  for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
    keys[_key] = arguments[_key];
  }

  var key = keys.join(NAME_SAPARATOR);
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return [key].concat(args).join(SAPARATOR);
  };
};

var CUSTOM = DOM_EVENT_MAKE;
exports.CUSTOM = CUSTOM;
var CLICK = DOM_EVENT_MAKE("click");
exports.CLICK = CLICK;
var DOUBLECLICK = DOM_EVENT_MAKE("dblclick");
exports.DOUBLECLICK = DOUBLECLICK;
var MOUSEDOWN = DOM_EVENT_MAKE("mousedown");
exports.MOUSEDOWN = MOUSEDOWN;
var MOUSEUP = DOM_EVENT_MAKE("mouseup");
exports.MOUSEUP = MOUSEUP;
var MOUSEMOVE = DOM_EVENT_MAKE("mousemove");
exports.MOUSEMOVE = MOUSEMOVE;
var MOUSEOVER = DOM_EVENT_MAKE("mouseover");
exports.MOUSEOVER = MOUSEOVER;
var MOUSEOUT = DOM_EVENT_MAKE("mouseout");
exports.MOUSEOUT = MOUSEOUT;
var MOUSEENTER = DOM_EVENT_MAKE("mouseenter");
exports.MOUSEENTER = MOUSEENTER;
var MOUSELEAVE = DOM_EVENT_MAKE("mouseleave");
exports.MOUSELEAVE = MOUSELEAVE;
var TOUCHSTART = DOM_EVENT_MAKE("touchstart");
exports.TOUCHSTART = TOUCHSTART;
var TOUCHMOVE = DOM_EVENT_MAKE("touchmove");
exports.TOUCHMOVE = TOUCHMOVE;
var TOUCHEND = DOM_EVENT_MAKE("touchend");
exports.TOUCHEND = TOUCHEND;
var KEYDOWN = DOM_EVENT_MAKE("keydown");
exports.KEYDOWN = KEYDOWN;
var KEYUP = DOM_EVENT_MAKE("keyup");
exports.KEYUP = KEYUP;
var KEYPRESS = DOM_EVENT_MAKE("keypress");
exports.KEYPRESS = KEYPRESS;
var DRAG = DOM_EVENT_MAKE("drag");
exports.DRAG = DRAG;
var DRAGSTART = DOM_EVENT_MAKE("dragstart");
exports.DRAGSTART = DRAGSTART;
var DROP = DOM_EVENT_MAKE("drop");
exports.DROP = DROP;
var DRAGOVER = DOM_EVENT_MAKE("dragover");
exports.DRAGOVER = DRAGOVER;
var DRAGENTER = DOM_EVENT_MAKE("dragenter");
exports.DRAGENTER = DRAGENTER;
var DRAGLEAVE = DOM_EVENT_MAKE("dragleave");
exports.DRAGLEAVE = DRAGLEAVE;
var DRAGEXIT = DOM_EVENT_MAKE("dragexit");
exports.DRAGEXIT = DRAGEXIT;
var DRAGOUT = DOM_EVENT_MAKE("dragout");
exports.DRAGOUT = DRAGOUT;
var DRAGEND = DOM_EVENT_MAKE("dragend");
exports.DRAGEND = DRAGEND;
var CONTEXTMENU = DOM_EVENT_MAKE("contextmenu");
exports.CONTEXTMENU = CONTEXTMENU;
var CHANGE = DOM_EVENT_MAKE("change");
exports.CHANGE = CHANGE;
var INPUT = DOM_EVENT_MAKE("input");
exports.INPUT = INPUT;
var FOCUS = DOM_EVENT_MAKE("focus");
exports.FOCUS = FOCUS;
var FOCUSIN = DOM_EVENT_MAKE("focusin");
exports.FOCUSIN = FOCUSIN;
var FOCUSOUT = DOM_EVENT_MAKE("focusout");
exports.FOCUSOUT = FOCUSOUT;
var BLUR = DOM_EVENT_MAKE("blur");
exports.BLUR = BLUR;
var PASTE = DOM_EVENT_MAKE("paste");
exports.PASTE = PASTE;
var RESIZE = DOM_EVENT_MAKE("resize");
exports.RESIZE = RESIZE;
var SCROLL = DOM_EVENT_MAKE("scroll");
exports.SCROLL = SCROLL;
var SUBMIT = DOM_EVENT_MAKE("submit");
exports.SUBMIT = SUBMIT;
var POINTERSTART = CUSTOM("mousedown", "touchstart");
exports.POINTERSTART = POINTERSTART;
var POINTERMOVE = CUSTOM("mousemove", "touchmove");
exports.POINTERMOVE = POINTERMOVE;
var POINTEREND = CUSTOM("mouseup", "touchend");
exports.POINTEREND = POINTEREND;
var CHANGEINPUT = CUSTOM("change", "input");
exports.CHANGEINPUT = CHANGEINPUT;
var WHEEL = CUSTOM("wheel", "mousewheel", "DOMMouseScroll"); // Predefined CHECKER

exports.WHEEL = WHEEL;

var CHECKER = function CHECKER(value) {
  var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;
  return new EventChecker(value, split);
};

exports.CHECKER = CHECKER;

var AFTER = function AFTER(value) {
  var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;
  return new EventAfterRunner(value, split);
};

exports.AFTER = AFTER;

var BEFORE = function BEFORE(value) {
  var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHECK_SAPARATOR;
  return new EventBeforeRunner(value, split);
};

exports.BEFORE = BEFORE;
var IF = CHECKER;
exports.IF = IF;
var ARROW_UP = CHECKER('ArrowUp');
exports.ARROW_UP = ARROW_UP;
var ARROW_DOWN = CHECKER('ArrowDown');
exports.ARROW_DOWN = ARROW_DOWN;
var ARROW_LEFT = CHECKER('ArrowLeft');
exports.ARROW_LEFT = ARROW_LEFT;
var ARROW_RIGHT = CHECKER('ArrowRight');
exports.ARROW_RIGHT = ARROW_RIGHT;
var ENTER = CHECKER('Enter');
exports.ENTER = ENTER;
var SPACE = CHECKER('Space');
exports.SPACE = SPACE;
var ALT = CHECKER("isAltKey");
exports.ALT = ALT;
var SHIFT = CHECKER("isShiftKey");
exports.SHIFT = SHIFT;
var META = CHECKER("isMetaKey");
exports.META = META;
var CONTROL = CHECKER("isCtrlKey");
exports.CONTROL = CONTROL;
var SELF = CHECKER("self"); // event config method

exports.SELF = SELF;

var DEBOUNCE = function DEBOUNCE() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return CHECKER("debounce(".concat(t, ")"));
};

exports.DEBOUNCE = DEBOUNCE;

var THROTTLE = function THROTTLE() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return CHECKER("throttle(".concat(t, ")"));
};

exports.THROTTLE = THROTTLE;
var CAPTURE = CHECKER("capture()"); // event config method
// before method
// after method

exports.CAPTURE = CAPTURE;

var MOVE = function MOVE() {
  var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "move";
  return AFTER("bodyMouseMove ".concat(method));
};

exports.MOVE = MOVE;

var END = function END() {
  var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "end";
  return AFTER("bodyMouseUp ".concat(method));
};

exports.END = END;
var PREVENT = AFTER("preventDefault");
exports.PREVENT = PREVENT;
var STOP = AFTER("stopPropagation");
exports.STOP = STOP;

var createRef = function createRef(value) {
  if (value === '') return '';
  var id = (0, _func.uuid)();
  refManager[id] = value;
  return id;
};

exports.createRef = createRef;

var getRef = function getRef(id) {
  return refManager[id] || '';
};

exports.getRef = getRef;

var BIND_CHECK_FUNCTION = function BIND_CHECK_FUNCTION(field) {
  return function () {
    return this.prevState[field] != this.state[field];
  };
};

exports.BIND_CHECK_FUNCTION = BIND_CHECK_FUNCTION;

var BIND_CHECK_DEFAULT_FUNCTION = function BIND_CHECK_DEFAULT_FUNCTION() {
  return true;
}; // Predefined LOADER


exports.BIND_CHECK_DEFAULT_FUNCTION = BIND_CHECK_DEFAULT_FUNCTION;

var LOAD = function LOAD() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "$el";
  return LOAD_SAPARATOR + value;
};

exports.LOAD = LOAD;

var BIND = function BIND() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "$el";
  var checkFieldOrCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return BIND_SAPARATOR + value + (checkFieldOrCallback ? CHECK_SAPARATOR + createRef(checkFieldOrCallback) : '');
};

exports.BIND = BIND;
var Event = {
  addEvent: function addEvent(dom, eventName, callback) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (dom) {
      dom.addEventListener(eventName, callback, useCapture);
    }
  },
  removeEvent: function removeEvent(dom, eventName, callback) {
    if (dom) {
      dom.removeEventListener(eventName, callback);
    }
  },
  pos: function pos(e) {
    if (e.touches && e.touches[0]) {
      return e.touches[0];
    }

    return e;
  },
  posXY: function posXY(e) {
    var pos = this.pos(e);
    return {
      x: pos.pageX,
      y: pos.pageY
    };
  }
};
exports.Event = Event;