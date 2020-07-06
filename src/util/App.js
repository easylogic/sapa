import Dom from "./Dom";
import { POINTERMOVE, POINTEREND, DEBOUNCE, RESIZE } from "./Event";
import BaseStore from "./BaseStore";
import { UIElement, EVENT } from "./UIElement";
import { debounce } from "./functions/func";
import { ADD_BODY_MOUSEMOVE, ADD_BODY_MOUSEUP } from "../types/constants";

const EMPTY_POS = { x: 0, y: 0 };
const DEFAULT_POS = { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
const MOVE_CHECK_MS = 0;

export const start = opt => {
  class App extends UIElement {

    initialize() {

      this.$store = new BaseStore();
      this.$app = this; 

      this.$container = Dom.create(this.getContainer());
      this.$container.addClass(this.getClassName());

      this.render(this.$container);

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
      var {bodyEvent, pos, lastPos} = this.state;

      var localLastPos = lastPos || DEFAULT_POS;
      var isNotEqualLastPos = !(localLastPos.x === pos.x && localLastPos.y === pos.y);

      if (isNotEqualLastPos && this.moves.size) {
        this.moves.forEach(v => {
          var dx = pos.x - v.xy.x;
          var dy = pos.y - v.xy.y;
          if (dx != 0 || dy != 0) {
            v.func.call(v.context, dx, dy, 'move', bodyEvent.pressure);
          }
        });

        this.state.lastPos = pos
      }
      requestAnimationFrame(this.funcBodyMoves);
    }

    removeBodyMoves() {
      var {pos, bodyEvent} = this.state;       
      if (pos) {
        this.ends.forEach(v => {
          v.func.call(v.context, pos.x - v.xy.x, pos.y - v.xy.y, 'end', bodyEvent.pressure);
        });
      }

      this.moves.clear();
      this.ends.clear();
    }

    [EVENT(ADD_BODY_MOUSEMOVE)](func, context, xy) {
      this.moves.add({ func, context, xy });
    }

    [EVENT(ADD_BODY_MOUSEUP)](func, context, xy) {
      this.ends.add({ func, context, xy });
    }

    getClassName() {
      return opt.className || "sapa";
    }

    getContainer() {
      return opt.container || document.body;
    }

    template() {
      return `${opt.template}`
    }

    components() {
      return opt.components || {};
    }

    [POINTERMOVE("document")](e) {
      var oldPos = this.state.pos || EMPTY_POS;      
      if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'SELECT' || e.target.nodeName === 'TEXTAREA') return; 
      var newPos = e.xy || EMPTY_POS;

      this.setState({bodyEvent : e, pos: newPos, oldPos}, false);

      if (!this.requestId) {
        this.requestId = requestAnimationFrame(this.funcBodyMoves);
      }
    }

    [POINTEREND("document")](e) {
      var newPos = e.xy || EMPTY_POS;      
      if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'SELECT' || e.target.nodeName === 'TEXTAREA') return;       
      this.setState({bodyEvent : e, pos: newPos}, false);
      this.removeBodyMoves();
      this.requestId = null;
    }
  }

  return new App(opt);
};
