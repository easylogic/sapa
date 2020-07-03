"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _func = require("./functions/func");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseStore = /*#__PURE__*/function () {
  function BaseStore() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BaseStore);

    this.callbacks = {};
  }

  _createClass(BaseStore, [{
    key: "getCallbacks",
    value: function getCallbacks(event) {
      if (!this.callbacks[event]) {
        this.callbacks[event] = [];
      }

      return this.callbacks[event];
    }
  }, {
    key: "setCallbacks",
    value: function setCallbacks(event) {
      var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      this.callbacks[event] = list;
    }
  }, {
    key: "on",
    value: function on(event, originalCallback, context) {
      var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var callback = delay > 0 ? (0, _func.debounce)(originalCallback, delay) : originalCallback;
      this.getCallbacks(event).push({
        event: event,
        callback: callback,
        context: context,
        originalCallback: originalCallback
      });
    }
  }, {
    key: "off",
    value: function off(event, originalCallback) {
      if (arguments.length == 1) {
        this.setCallbacks(event);
      } else if (arguments.length == 2) {
        this.setCallbacks(event, this.getCallbacks(event).filter(function (f) {
          return f.originalCallback !== originalCallback;
        }));
      }
    }
  }, {
    key: "offAll",
    value: function offAll(context) {
      var _this = this;

      Object.keys(this.callbacks).forEach(function (event) {
        _this.setCallbacks(event, _this.getCallbacks(event).filter(function (f) {
          return f.context !== context;
        }));
      });
    }
  }, {
    key: "getCachedCallbacks",
    value: function getCachedCallbacks(event) {
      return this.getCallbacks(event);
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(source, event, $2, $3, $4, $5) {
      var _this2 = this;

      setTimeout(function () {
        var list = _this2.getCachedCallbacks(event);

        if (list) {
          list.filter(function (f) {
            return f.originalCallback.source !== source;
          }).forEach(function (f) {
            return f.callback($2, $3, $4, $5);
          });
        }
      }, 0);
    }
  }, {
    key: "triggerMessage",
    value: function triggerMessage(source, event, $2, $3, $4, $5) {
      var _this3 = this;

      setTimeout(function () {
        var list = _this3.getCachedCallbacks(event);

        if (list) {
          list.filter(function (f) {
            return f.originalCallback.source === source;
          }).forEach(function (f) {
            return f.callback($2, $3, $4, $5);
          });
        } else {
          console.warn(event, ' is not valid event');
        }
      }, 0);
    }
  }, {
    key: "emit",
    value: function emit($1, $2, $3, $4, $5) {
      this.sendMessage(this.source, $1, $2, $3, $4, $5);
    }
  }, {
    key: "trigger",
    value: function trigger($1, $2, $3, $4, $5) {
      this.triggerMessage(this.source, $1, $2, $3, $4, $5);
    }
  }]);

  return BaseStore;
}();

exports["default"] = BaseStore;